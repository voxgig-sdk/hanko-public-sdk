"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ThirdPartyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.ThirdParty();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'third_party.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "third_party", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "code", "orig": "code", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "error", "orig": "error", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "error_description", "orig": "error_description", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "state", "orig": "state", "reqd": true, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /thirdparty/callback", "json": "{\"operationId\":\"thirdPartyCallback\",\"parameters\":[{\"description\":\"The authorization code that can be exchanged for an access token and to retrieve user provider data\\n\",\"in\":\"query\",\"name\":\"code\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The state\",\"in\":\"query\",\"name\":\"state\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"An error returned from the third party provider\\n\",\"in\":\"query\",\"name\":\"error\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The description of the error that occurred (if any)\",\"in\":\"query\",\"name\":\"error_description\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"307\":{\"description\":\"Redirect to requested redirect URL or to configured site redirect URL\",\"headers\":{\"Location\":{\"description\":\"Redirect to the URL requested via `redirect_to` query parameter during third party\\nprovider login via [`/auth`](#tag/Third-Party/operation/thirdPartyAuth) endpoint on success. On error,\\nredirect to the `third_party.error_redirect_url` set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config).\\nError details are provided in the location URL in the form of `error` and `error_description`\\nquery params.\\n\",\"schema\":{\"type\":\"string\"}},\"Set-Cookie\":{\"description\":\"Present only on successful callback. Contains the JSON Web Token (JWT) that must be provided to protected endpoints.\\nCookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\\n\",\"schema\":{\"description\":\"Value `<JWT>` is a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)\",\"example\":\"hanko=<JWT>; Path=/; HttpOnly\",\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only on successful callback and when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"schema\":{\"description\":\"Enable via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"externalDocs\":{\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config\"},\"format\":\"JWT\",\"type\":\"string\"}}}}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/thirdparty/callback", "segments": [{ "lit": "thirdparty" }, { "lit": "callback" }], "select": { "exist": ["code", "error", "error_description", "state"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "provider", "orig": "provider", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "redirect_to", "orig": "redirect_to", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /thirdparty/auth", "json": "{\"operationId\":\"thirdPartyAuth\",\"parameters\":[{\"description\":\"The name of the third party provider to log in with. Only providers enabled in the\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nvia the `thirdparty.providers` option can be used. Requesting an unsupported provider results in a\\nredirect with error details in the location query.\\n\",\"in\":\"query\",\"name\":\"provider\",\"required\":true,\"schema\":{\"enum\":[\"google\",\"github\"],\"type\":\"string\"}},{\"description\":\"Base64url encoded string representing the URL the\\n[`/callback`](#tag/Third-Party/operation/thirdPartyCallback) eventually redirects to after successful login\\nwith the third party provider. It must match one of the allowed redirect URLs set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nthrough the `third_party.allowed_redirect_urls`.\\n\",\"in\":\"query\",\"name\":\"redirect_to\",\"required\":true,\"schema\":{\"format\":\"base64url\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"307\":{\"description\":\"Redirect to third party provider\",\"headers\":{\"Location\":{\"description\":\"Redirect to the third party provider on success. On error, redirects to the `Referer`. If `Referer` is\\nnot present, redirects to the `third_party.error_redirect_url` set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config).\\nError details are provided in the location URL in the form of `error` and `error_description`\\nquery params.\\n\",\"schema\":{\"type\":\"string\"}}}}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/thirdparty/auth", "segments": [{ "lit": "thirdparty" }, { "lit": "auth" }], "select": { "exist": ["provider", "redirect_to"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "third_party", "name__orig": "third_party", "Name": "ThirdParty", "name_": "third_party", "name-": "third-party", "NAME": "THIRD_PARTY", "index$": 13 }, { "active": true, "entity": "third_party", "key$": "BasicThirdPartyFlow", "kind": "basic", "name": "BasicThirdPartyFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "third_party_ref01", "srcdatavar": "third_party_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-third_party_ref01" } }], "index$": 0 }] }, 'ThirdParty');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let third_party_ref01_data = Object.values(setup.data.existing.third_party)[0];
        // LOAD
        const third_party_ref01_ent = client.ThirdParty();
        const third_party_ref01_match_dt0 = {};
        const third_party_ref01_data_dt0 = (await third_party_ref01_ent.load(third_party_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != third_party_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/third_party/ThirdPartyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['third_party01', 'third_party02', 'third_party03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HankoPublicSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.HANKO_PUBLIC_APIKEY,
                server: {
                    tenant_id: env.HANKO_PUBLIC_SERVER_TENANT_ID,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HANKO_PUBLIC_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ThirdPartyEntity.test.js.map