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
(0, node_test_1.describe)('UserManagementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.UserManagement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user_management.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "created_at", "req": false, "short": "Time of creation of the the user", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "emails", "req": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "family_name", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "given_name", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "deprecated": true, "name": "id", "req": false, "short": "The ID of the user.", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "metadata", "req": false, "short": "The public and unsafe metadata of a user", "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "mfa_config", "req": false, "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "passkeys", "req": false, "type": "`$ARRAY`", "index$": 8 }, { "active": true, "format": "uri", "name": "picture", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "security_keys", "req": false, "type": "`$ARRAY`", "index$": 10 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "short": "Time of last update of the user", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "user_id", "req": false, "short": "The ID of the user", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "username", "req": false, "short": "The representation of a username of the user", "type": "`$OBJECT`", "index$": 13 }], "id": { "field": "id", "name": "id" }, "name": "user_management", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /logout", "json": "{\"operationId\":\"logout\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"The user has been logged out\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/logout", "segments": [{ "lit": "logout" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /me", "json": "{\"operationId\":\"IsUserAuthorized\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"created_at\":{\"description\":\"Time of creation of the the user\",\"format\":\"date-time\",\"type\":\"string\"},\"emails\":{\"example\":[{\"address\":\"john.doe@example.com\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"is_primary\":false,\"is_verified\":true}],\"items\":{\"properties\":{\"address\":{\"description\":\"The email address\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the email address\"},\"identities\":{\"allOf\":[{\"description\":\"The user's third party connections/identities.\",\"items\":{\"description\":\"Representation of a user's third party connection/identity.\",\"properties\":{\"id\":{\"description\":\"The ID of the user at the provider\",\"type\":\"string\"},\"identity_id\":{\"description\":\"The identity's ID\",\"format\":\"uuid4\",\"type\":\"string\"},\"provider\":{\"description\":\"Contains the display name of the provider, if available. Otherwise contains the provider ID.\\n\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},{\"deprecated\":true},{\"description\":\"Deprecated, use `user.identities` instead.\"}]},\"identity\":{\"allOf\":[{\"description\":\"Representation of a user's third party connection/identity.\",\"properties\":{\"id\":{\"description\":\"The ID of the user at the provider\",\"type\":\"string\"},\"identity_id\":{\"description\":\"The identity's ID\",\"format\":\"uuid4\",\"type\":\"string\"},\"provider\":{\"description\":\"Contains the display name of the provider, if available. Otherwise contains the provider ID.\\n\",\"type\":\"string\"}},\"type\":\"object\"},{\"deprecated\":true},{\"description\":\"Deprecated, use `user.identities` instead.\"}]},\"is_primary\":{\"description\":\"Indicates it's the primary email address.\",\"type\":\"boolean\"},\"is_verified\":{\"description\":\"Indicated the email has been verified.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"family_name\":{\"type\":\"string\"},\"given_name\":{\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"deprecated\":true,\"description\":\"The ID of the user. Deprecated, use `user_id` instead.\"},\"metadata\":{\"description\":\"The public and unsafe metadata of a user\",\"properties\":{\"public_metadata\":{\"additionalProperties\":true,\"example\":{\"role\":\"admin\"},\"type\":\"object\"},\"unsafe_metadata\":{\"additionalProperties\":true,\"example\":{\"birthday\":\"2025-05-12\"},\"type\":\"object\"}},\"type\":\"object\"},\"mfa_config\":{\"properties\":{\"auth_app_set_up\":{\"type\":\"boolean\"},\"security_key_enabled\":{\"type\":\"boolean\"},\"totp_enabled\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"passkeys\":{\"example\":[{\"aaguid\":\"01020304-0506-0708-0102-030405060708\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":true,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":false,\"name\":\"iCloud\",\"public_key\":\"pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...\",\"transports\":[\"internal\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"picture\":{\"format\":\"uri\",\"type\":\"string\"},\"security_keys\":{\"example\":[{\"aaguid\":\"90636e1f-ef82-43bf-bdcf-5255f139d12f\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":false,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"f826013e-e7e3-4366-a6d8-9359effc8cdd\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":true,\"name\":\"Yubikey Bio\",\"public_key\":\"aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...\",\"transports\":[\"usb\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"updated_at\":{\"description\":\"Time of last update of the user\",\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user\"}},\"type\":\"object\"},{\"properties\":{\"username\":{\"description\":\"The representation of a username of the user\",\"properties\":{\"created_at\":{\"description\":\"Time of creation of the username\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user\"},\"updated_at\":{\"description\":\"Time of last update of the username\",\"format\":\"date-time\",\"type\":\"string\"},\"username\":{\"description\":\"The username of the user\",\"example\":\"john_doe\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}],\"type\":\"object\"}}},\"description\":\"Details for the current user\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/me", "segments": [{ "lit": "me" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "user_management", "name__orig": "user_management", "Name": "UserManagement", "name_": "user_management", "name-": "user-management", "NAME": "USER_MANAGEMENT", "index$": 16 }, { "active": true, "entity": "user_management", "key$": "BasicUserManagementFlow", "kind": "basic", "name": "BasicUserManagementFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "user_management_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "user_management_ref01" } }], "index$": 1 }] }, 'UserManagement');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const user_management_ref01_ent = client.UserManagement();
        let user_management_ref01_data = setup.data.new.user_management['user_management_ref01'];
        user_management_ref01_data = (await user_management_ref01_ent.create(user_management_ref01_data)).data();
        (0, node_assert_1.default)(null != user_management_ref01_data.id);
        // LIST
        const user_management_ref01_match = {};
        const user_management_ref01_list = (await user_management_ref01_ent.list(user_management_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(user_management_ref01_list, { id: user_management_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user_management/UserManagementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user_management01', 'user_management02', 'user_management03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID'];
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
//# sourceMappingURL=UserManagementEntity.test.js.map