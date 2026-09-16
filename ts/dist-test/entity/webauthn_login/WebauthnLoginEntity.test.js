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
(0, node_test_1.describe)('WebauthnLoginEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.WebauthnLogin();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'webauthn_login.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "base64url", "name": "credential_id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "rawId", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "response", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "uuid4", "name": "user_id", "req": false, "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "webauthn_login", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /webauthn/login/finalize", "json": "{\"operationId\":\"webauthnLoginFinal\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"WebAuthn API response to a navigator.credentials.get() call\",\"properties\":{\"id\":{\"example\":\"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...\",\"type\":\"string\"},\"rawId\":{\"example\":\"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...\",\"type\":\"string\"},\"response\":{\"properties\":{\"authenticatorData\":{\"example\":\"SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MF...\",\"format\":\"base64url\",\"type\":\"string\"},\"clientDataJson\":{\"example\":\"eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdl...\",\"format\":\"base64url\",\"type\":\"string\"},\"signature\":{\"example\":\"MEQCIHe2RXqh6dyZw1LNXgeTTxljCV_qK2ydQjp02CiF...\",\"format\":\"base64url\",\"type\":\"string\"},\"userHandle\":{\"example\":\"rpe_EkgaSEeZG0TwzZyZJw\",\"format\":\"base64url\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"public-key\"],\"example\":\"public-key\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response after a successful login with webauthn\",\"properties\":{\"credential_id\":{\"format\":\"base64url\",\"type\":\"string\"},\"user_id\":{\"format\":\"uuid4\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful login\",\"headers\":{\"Set-Cookie\":{\"description\":\"Contains the JSON Web Token (JWT) that must be provided to protected endpoints.\\nCookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\\n\",\"schema\":{\"description\":\"Value `<JWT>` is a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)\",\"example\":\"hanko=<JWT>; Path=/; HttpOnly\",\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"schema\":{\"description\":\"Enable via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"externalDocs\":{\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config\"},\"format\":\"JWT\",\"type\":\"string\"}},\"X-Session-Lifetime\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"schema\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"type\":\"number\"}}}},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/webauthn/login/finalize", "segments": [{ "lit": "webauthn" }, { "lit": "login" }, { "lit": "finalize" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "webauthn_login", "name__orig": "webauthn_login", "Name": "WebauthnLogin", "name_": "webauthn_login", "name-": "webauthn-login", "NAME": "WEBAUTHN_LOGIN", "index$": 18 }, { "active": true, "entity": "webauthn_login", "key$": "BasicWebauthnLoginFlow", "kind": "basic", "name": "BasicWebauthnLoginFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "webauthn_login_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'WebauthnLogin');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const webauthn_login_ref01_ent = client.WebauthnLogin();
        let webauthn_login_ref01_data = setup.data.new.webauthn_login['webauthn_login_ref01'];
        webauthn_login_ref01_data = (await webauthn_login_ref01_ent.create(webauthn_login_ref01_data)).data();
        (0, node_assert_1.default)(null != webauthn_login_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/webauthn_login/WebauthnLoginTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['webauthn_login01', 'webauthn_login02', 'webauthn_login03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID'];
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
//# sourceMappingURL=WebauthnLoginEntity.test.js.map