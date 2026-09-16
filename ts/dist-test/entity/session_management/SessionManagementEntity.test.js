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
(0, node_test_1.describe)('SessionManagementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.SessionManagement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'session_management.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "amr", "req": false, "short": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "audience", "req": false, "short": "The intended audience of the token.", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "email", "req": false, "short": "Data about the email address associated with the token's subject, if available.", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "format": "date-time", "name": "expiration", "req": true, "short": "The timestamp indicating when the token will expire.", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "date-time", "name": "issued_at", "req": false, "short": "The timestamp indicating when the token was issued.", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "issuer", "req": false, "short": "The entity that issued the token.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "session_id", "req": true, "short": "The unique identifier for the session associated with this token.", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "JWT", "name": "session_token", "req": true, "short": "The session token (JWT) to validate", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "subject", "req": true, "short": "The unique identifier of the token's subject.", "type": "`$ANY`", "index$": 8 }], "name": "session_management", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /sessions/validate", "json": "{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"session_token\":{\"description\":\"The session token (JWT) to validate\",\"format\":\"JWT\",\"type\":\"string\"}},\"required\":[\"session_token\"]}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"claims\":{\"description\":\"The claims extracted from a JWT.\",\"properties\":{\"amr\":{\"description\":\"Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.\",\"items\":{\"description\":\"- `pwd` => password\\n- `passkey` => passkey\\n- `otp` => email passcode\\n- `ext:<provider>` => thirdparty provider, where <provider> is the internal provider ID, e.g. `ext:microsoft`\\n- `totp` => 2FA authenticator app\\n- `security_key` => 2FA security key\\n\",\"enum\":[\"pwd\",\"passkey\",\"otp\",\"ext:<provider>\",\"totp\",\"security_key\"],\"type\":\"string\"},\"type\":\"array\"},\"audience\":{\"description\":\"The intended audience of the token.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"email\":{\"description\":\"Data about the email address associated with the token's subject, if available.\",\"properties\":{\"address\":{\"description\":\"The actual email address.\",\"format\":\"email\",\"type\":\"string\"},\"is_primary\":{\"description\":\"Indicates whether the email address is the primary address.\",\"type\":\"boolean\"},\"is_verified\":{\"description\":\"Indicates whether the email address is verified.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"expiration\":{\"description\":\"The timestamp indicating when the token will expire.\",\"format\":\"date-time\",\"type\":\"string\"},\"issued_at\":{\"description\":\"The timestamp indicating when the token was issued.\",\"format\":\"date-time\",\"type\":\"string\"},\"issuer\":{\"description\":\"The entity that issued the token.\",\"type\":\"string\"},\"session_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The unique identifier for the session associated with this token.\"},\"subject\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The unique identifier of the token's subject.\"}},\"required\":[\"subject\",\"expiration\",\"session_id\"],\"type\":\"object\"},\"expiration_time\":{\"deprecated\":true,\"description\":\"Date-time indicating the expiration of the session. Deprecated, please use `claims.expiration` instead.\",\"format\":\"date-time\",\"type\":\"string\"},\"idle_expires_at\":{\"description\":\"Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time.\\nOnly present when idle timeout is configured. The value is capped to the JWT expiration time.\\n\",\"format\":\"date-time\",\"type\":\"string\"},\"is_valid\":{\"description\":\"Indicates whether the session is valid or not\",\"type\":\"boolean\"},\"user_id\":{\"deprecated\":true,\"description\":\"The ID of the user the session is associated with. Deprecated, please use `claims.subject` instead.\",\"format\":\"uuid4\",\"type\":\"string\"}},\"required\":[\"isValid\"]}}},\"description\":\"Session validation response\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/sessions/validate", "segments": [{ "lit": "sessions" }, { "lit": "validate" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.claims`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /sessions/validate", "json": "{\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"claims\":{\"description\":\"The claims extracted from a JWT.\",\"properties\":{\"amr\":{\"description\":\"Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.\",\"items\":{\"description\":\"- `pwd` => password\\n- `passkey` => passkey\\n- `otp` => email passcode\\n- `ext:<provider>` => thirdparty provider, where <provider> is the internal provider ID, e.g. `ext:microsoft`\\n- `totp` => 2FA authenticator app\\n- `security_key` => 2FA security key\\n\",\"enum\":[\"pwd\",\"passkey\",\"otp\",\"ext:<provider>\",\"totp\",\"security_key\"],\"type\":\"string\"},\"type\":\"array\"},\"audience\":{\"description\":\"The intended audience of the token.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"email\":{\"description\":\"Data about the email address associated with the token's subject, if available.\",\"properties\":{\"address\":{\"description\":\"The actual email address.\",\"format\":\"email\",\"type\":\"string\"},\"is_primary\":{\"description\":\"Indicates whether the email address is the primary address.\",\"type\":\"boolean\"},\"is_verified\":{\"description\":\"Indicates whether the email address is verified.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"expiration\":{\"description\":\"The timestamp indicating when the token will expire.\",\"format\":\"date-time\",\"type\":\"string\"},\"issued_at\":{\"description\":\"The timestamp indicating when the token was issued.\",\"format\":\"date-time\",\"type\":\"string\"},\"issuer\":{\"description\":\"The entity that issued the token.\",\"type\":\"string\"},\"session_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The unique identifier for the session associated with this token.\"},\"subject\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The unique identifier of the token's subject.\"}},\"required\":[\"subject\",\"expiration\",\"session_id\"],\"type\":\"object\"},\"expiration_time\":{\"deprecated\":true,\"description\":\"Date-time indicating the expiration of the session. Deprecated, please use `claims.expiration` instead.\",\"format\":\"date-time\",\"type\":\"string\"},\"idle_expires_at\":{\"description\":\"Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time.\\nOnly present when idle timeout is configured. The value is capped to the JWT expiration time.\\n\",\"format\":\"date-time\",\"type\":\"string\"},\"is_valid\":{\"description\":\"Indicates whether the session is valid or not\",\"type\":\"boolean\"},\"user_id\":{\"deprecated\":true,\"description\":\"The ID of the user the session is associated with. Deprecated, please use `claims.subject` instead.\",\"format\":\"uuid4\",\"type\":\"string\"}},\"required\":[\"isValid\"]}}},\"description\":\"Session validation response\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sessions/validate", "segments": [{ "lit": "sessions" }, { "lit": "validate" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.claims`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "session_management", "name__orig": "session_management", "Name": "SessionManagement", "name_": "session_management", "name-": "session-management", "NAME": "SESSION_MANAGEMENT", "index$": 11 }, { "active": true, "entity": "session_management", "key$": "BasicSessionManagementFlow", "kind": "basic", "name": "BasicSessionManagementFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "session_management_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "session_management_ref01", "srcdatavar": "session_management_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-session_management_ref01" } }], "index$": 1 }] }, 'SessionManagement');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const session_management_ref01_ent = client.SessionManagement();
        let session_management_ref01_data = setup.data.new.session_management['session_management_ref01'];
        session_management_ref01_data = (await session_management_ref01_ent.create(session_management_ref01_data)).data();
        (0, node_assert_1.default)(null != session_management_ref01_data);
        // LOAD
        const session_management_ref01_match_dt0 = {};
        const session_management_ref01_data_dt0 = (await session_management_ref01_ent.load(session_management_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != session_management_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/session_management/SessionManagementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['session_management01', 'session_management02', 'session_management03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID'];
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
//# sourceMappingURL=SessionManagementEntity.test.js.map