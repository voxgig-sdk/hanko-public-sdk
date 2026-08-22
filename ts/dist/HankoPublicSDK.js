"use strict";
// HankoPublic Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.HankoPublicSDK = exports.HankoPublicEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const CreateUserResponseObjectEntity_1 = require("./entity/CreateUserResponseObjectEntity");
const CredentialEntity_1 = require("./entity/CredentialEntity");
const CredentialCreationOptionEntity_1 = require("./entity/CredentialCreationOptionEntity");
const CredentialRequestOptionEntity_1 = require("./entity/CredentialRequestOptionEntity");
const EmailEntity_1 = require("./entity/EmailEntity");
const EmailManagementEntity_1 = require("./entity/EmailManagementEntity");
const HankoConfigurationEntity_1 = require("./entity/HankoConfigurationEntity");
const JsonWebKeySetEntity_1 = require("./entity/JsonWebKeySetEntity");
const PasscodeEntity_1 = require("./entity/PasscodeEntity");
const PasswordEntity_1 = require("./entity/PasswordEntity");
const SamlEntity_1 = require("./entity/SamlEntity");
const SessionManagementEntity_1 = require("./entity/SessionManagementEntity");
const StatusEntity_1 = require("./entity/StatusEntity");
const ThirdPartyEntity_1 = require("./entity/ThirdPartyEntity");
const TokenEntity_1 = require("./entity/TokenEntity");
const UserEntity_1 = require("./entity/UserEntity");
const UserManagementEntity_1 = require("./entity/UserManagementEntity");
const WebAuthnEntity_1 = require("./entity/WebAuthnEntity");
const WebauthnLoginEntity_1 = require("./entity/WebauthnLoginEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const HankoPublicEntityBase_1 = require("./HankoPublicEntityBase");
Object.defineProperty(exports, "HankoPublicEntityBase", { enumerable: true, get: function () { return HankoPublicEntityBase_1.HankoPublicEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class HankoPublicSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('HankoPublicSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('HankoPublicSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('HankoPublicSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.CreateUserResponseObject().list()` / `client.CreateUserResponseObject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateUserResponseObject(entopts) {
        const self = this;
        return new CreateUserResponseObjectEntity_1.CreateUserResponseObjectEntity(self, entopts);
    }
    // Entity access: `client.Credential().list()` / `client.Credential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Credential(entopts) {
        const self = this;
        return new CredentialEntity_1.CredentialEntity(self, entopts);
    }
    // Entity access: `client.CredentialCreationOption().list()` / `client.CredentialCreationOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CredentialCreationOption(entopts) {
        const self = this;
        return new CredentialCreationOptionEntity_1.CredentialCreationOptionEntity(self, entopts);
    }
    // Entity access: `client.CredentialRequestOption().list()` / `client.CredentialRequestOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CredentialRequestOption(entopts) {
        const self = this;
        return new CredentialRequestOptionEntity_1.CredentialRequestOptionEntity(self, entopts);
    }
    // Entity access: `client.Email().list()` / `client.Email().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Email(entopts) {
        const self = this;
        return new EmailEntity_1.EmailEntity(self, entopts);
    }
    // Entity access: `client.EmailManagement().list()` / `client.EmailManagement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailManagement(entopts) {
        const self = this;
        return new EmailManagementEntity_1.EmailManagementEntity(self, entopts);
    }
    // Entity access: `client.HankoConfiguration().list()` / `client.HankoConfiguration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HankoConfiguration(entopts) {
        const self = this;
        return new HankoConfigurationEntity_1.HankoConfigurationEntity(self, entopts);
    }
    // Entity access: `client.JsonWebKeySet().list()` / `client.JsonWebKeySet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JsonWebKeySet(entopts) {
        const self = this;
        return new JsonWebKeySetEntity_1.JsonWebKeySetEntity(self, entopts);
    }
    // Entity access: `client.Passcode().list()` / `client.Passcode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Passcode(entopts) {
        const self = this;
        return new PasscodeEntity_1.PasscodeEntity(self, entopts);
    }
    // Entity access: `client.Password().list()` / `client.Password().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Password(entopts) {
        const self = this;
        return new PasswordEntity_1.PasswordEntity(self, entopts);
    }
    // Entity access: `client.Saml().list()` / `client.Saml().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Saml(entopts) {
        const self = this;
        return new SamlEntity_1.SamlEntity(self, entopts);
    }
    // Entity access: `client.SessionManagement().list()` / `client.SessionManagement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SessionManagement(entopts) {
        const self = this;
        return new SessionManagementEntity_1.SessionManagementEntity(self, entopts);
    }
    // Entity access: `client.Status().list()` / `client.Status().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Status(entopts) {
        const self = this;
        return new StatusEntity_1.StatusEntity(self, entopts);
    }
    // Entity access: `client.ThirdParty().list()` / `client.ThirdParty().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ThirdParty(entopts) {
        const self = this;
        return new ThirdPartyEntity_1.ThirdPartyEntity(self, entopts);
    }
    // Entity access: `client.Token().list()` / `client.Token().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Token(entopts) {
        const self = this;
        return new TokenEntity_1.TokenEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.UserManagement().list()` / `client.UserManagement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserManagement(entopts) {
        const self = this;
        return new UserManagementEntity_1.UserManagementEntity(self, entopts);
    }
    // Entity access: `client.WebAuthn().list()` / `client.WebAuthn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebAuthn(entopts) {
        const self = this;
        return new WebAuthnEntity_1.WebAuthnEntity(self, entopts);
    }
    // Entity access: `client.WebauthnLogin().list()` / `client.WebauthnLogin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebauthnLogin(entopts) {
        const self = this;
        return new WebauthnLoginEntity_1.WebauthnLoginEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new HankoPublicSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return HankoPublicSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'HankoPublic' };
    }
    toString() {
        return 'HankoPublic ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.HankoPublicSDK = HankoPublicSDK;
const SDK = HankoPublicSDK;
exports.SDK = SDK;
//# sourceMappingURL=HankoPublicSDK.js.map