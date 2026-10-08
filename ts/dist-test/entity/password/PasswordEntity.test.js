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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PasswordEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.Password();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Password().create({ "password": 1, "user_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'password.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "password": { "a": true, "h": "Password", "n": "password", "r": true, "sh": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.", "t": "`$STRING`", "key$": "password", "index$": 0 }, "user_id": { "a": true, "fo": "uuid4", "h": "User Id", "n": "user_id", "r": true, "sh": "The ID of the user to create/set a password for", "t": "`$STRING`", "key$": "user_id", "index$": 1 } }, "name": "password", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["password", "user_id"], "co": { "id": "POST /password/login", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/password/login", "q": { "$action": "login" }, "r": {}, "s": [{ "lit": "password" }, { "lit": "login" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["password", "user_id"], "co": { "id": "PUT /password", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/password", "q": {}, "r": {}, "s": [{ "lit": "password" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "password", "name__orig": "password", "Name": "Password", "name_": "password", "name-": "password", "NAME": "PASSWORD", "index$": 6 }, { "active": true, "entity": "password", "key$": "BasicPasswordFlow", "kind": "basic", "name": "BasicPasswordFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "password_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "password_ref01", "srcdatavar": "password_ref01_data", "suffix": "_up0", "textfield": "password" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-password_ref01" } }], "v": [], "index$": 1 }] }, 'Password', { "POST /password/login": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "user_id": { "description": "The ID of the user to perform a password login for", "allOf": [{ "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }] }, "password": { "description": "The actual password, its `minLength` defaults to 8 but\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nthrough the `password.min_password_length` option.\n", "type": "string", "minLength": 8, "maxLength": 72, "example": "9UnCBEx924a45P7p", "x-ref": "#/components/schemas/Password" } }, "required": ["user_id", "password"] } } } }, "parameters": [] }, "PUT /password": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "user_id": { "description": "The ID of the user to create/set a password for", "allOf": [{ "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }], "key$": "user_id" }, "password": { "description": "The actual password, its `minLength` defaults to 8 but\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nthrough the `password.min_password_length` option.\n", "type": "string", "minLength": 8, "maxLength": 72, "example": "9UnCBEx924a45P7p", "x-ref": "#/components/schemas/Password", "key$": "password" } }, "required": ["user_id", "password"], "index$": 1 } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const password_ref01_ent = client.Password();
        let password_ref01_data = setup.data.new.password['password_ref01'];
        password_ref01_data = (await password_ref01_ent.create(password_ref01_data)).data();
        (0, node_assert_1.default)(null != password_ref01_data);
        // UPDATE
        const password_ref01_data_up0 = {};
        const password_ref01_markdef_up0 = { name: 'password', value: 'Mark01-password_ref01_' + setup.now };
        password_ref01_data_up0[password_ref01_markdef_up0.name] = password_ref01_markdef_up0.value;
        const password_ref01_resdata_up0 = (await password_ref01_ent.update(password_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != password_ref01_resdata_up0);
        (0, node_assert_1.default)(password_ref01_resdata_up0[password_ref01_markdef_up0.name] === password_ref01_markdef_up0.value);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/password/PasswordTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['password01', 'password02', 'password03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_PASSWORD_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_PASSWORD_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_PASSWORD_ENTID'];
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
//# sourceMappingURL=PasswordEntity.test.js.map