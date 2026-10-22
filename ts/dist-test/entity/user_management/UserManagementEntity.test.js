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
(0, node_test_1.describe)('UserManagementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.UserManagement();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('user_management hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HankoPublicSDK.test(offline).UserManagement().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HankoPublicSDK.test(offline).UserManagement()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.UserManagement().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HankoPublicSDK.test().UserManagement().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.UserManagement().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.UserManagement().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.UserManagement().list({ "created_at": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user_management.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Time of creation of the the user", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "emails": { "a": true, "h": "Emails", "n": "emails", "r": false, "t": "`$ARRAY`", "key$": "emails", "index$": 1 }, "family_name": { "a": true, "h": "Family Name", "n": "family_name", "r": false, "t": "`$STRING`", "key$": "family_name", "index$": 2 }, "given_name": { "a": true, "h": "Given Name", "n": "given_name", "r": false, "t": "`$STRING`", "key$": "given_name", "index$": 3 }, "id": { "a": true, "de": true, "fo": "uuid4", "h": "Id", "n": "id", "r": false, "sh": "The ID of the user.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "The public and unsafe metadata of a user", "t": "`$OBJECT`", "key$": "metadata", "index$": 5 }, "mfa_config": { "a": true, "h": "Mfa Config", "n": "mfa_config", "r": false, "t": "`$OBJECT`", "key$": "mfa_config", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 7 }, "passkeys": { "a": true, "h": "Passkeys", "n": "passkeys", "r": false, "t": "`$ARRAY`", "key$": "passkeys", "index$": 8 }, "picture": { "a": true, "fo": "uri", "h": "Picture", "n": "picture", "r": false, "t": "`$STRING`", "key$": "picture", "index$": 9 }, "security_keys": { "a": true, "h": "Security Keys", "n": "security_keys", "r": false, "t": "`$ARRAY`", "key$": "security_keys", "index$": 10 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Time of last update of the user", "t": "`$STRING`", "key$": "updated_at", "index$": 11 }, "user_id": { "a": true, "fo": "uuid4", "h": "User Id", "n": "user_id", "r": false, "sh": "The ID of the user", "t": "`$STRING`", "key$": "user_id", "index$": 12 }, "username": { "a": true, "h": "Username", "n": "username", "r": false, "sh": "The representation of a username of the user", "t": "`$OBJECT`", "key$": "username", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "user_management", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /logout", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/logout", "q": {}, "r": {}, "s": [{ "lit": "logout" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /me", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/me", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "user_management", "name__orig": "user_management", "Name": "UserManagement", "name_": "user_management", "name-": "user-management", "NAME": "USER_MANAGEMENT", "index$": 6 }, { "active": true, "entity": "user_management", "key$": "BasicUserManagementFlow", "kind": "basic", "name": "BasicUserManagementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "user_management_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "user_management_ref01" } }], "index$": 1 }] }, 'UserManagement', { "POST /logout": { "protocol": "http", "parameters": [] }, "GET /me": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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