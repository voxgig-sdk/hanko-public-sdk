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
(0, node_test_1.describe)('EmailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.Email();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('email hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HankoPublicSDK.test(offline).Email().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HankoPublicSDK.test(offline).Email()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Email().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HankoPublicSDK.test().Email().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Email().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Email().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Email().list({ "address": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "fo": "email", "h": "Address", "n": "address", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The email address", "t": "`$STRING`", "key$": "address", "index$": 0 }, "id": { "a": true, "fo": "uuid4", "h": "Id", "n": "id", "r": false, "sh": "The ID of the email address", "t": "`$STRING`", "key$": "id", "index$": 1 }, "identities": { "a": true, "h": "Identities", "n": "identities", "r": false, "t": "`$ANY`", "key$": "identities", "index$": 2 }, "identity": { "a": true, "h": "Identity", "n": "identity", "r": false, "t": "`$ANY`", "key$": "identity", "index$": 3 }, "is_primary": { "a": true, "h": "Is Primary", "n": "is_primary", "r": false, "sh": "Indicates it's the primary email address.", "t": "`$BOOLEAN`", "key$": "is_primary", "index$": 4 }, "is_verified": { "a": true, "h": "Is Verified", "n": "is_verified", "r": false, "sh": "Indicated the email has been verified.", "t": "`$BOOLEAN`", "key$": "is_verified", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "email", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /emails/{id}/set_primary", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/emails/{id}/set_primary", "q": { "$action": "set_primary", "exist": ["id"] }, "r": {}, "s": [{ "lit": "emails" }, { "var": "id" }, { "lit": "set_primary" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["address"], "co": { "id": "POST /emails", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/emails", "q": {}, "r": {}, "s": [{ "lit": "emails" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /emails", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/emails", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "emails" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /emails/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/emails/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "emails" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "email", "name__orig": "email", "Name": "Email", "name_": "email", "name-": "email", "NAME": "EMAIL", "index$": 2 }, { "active": true, "entity": "email", "key$": "BasicEmailFlow", "kind": "basic", "name": "BasicEmailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "email_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "email_ref01", "suffix": "_rm0" }, "m": { "id": "email01" }, "o": "remove", "s": [], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "email_ref01" } }], "index$": 3 }] }, 'Email', { "POST /emails/{id}/set_primary": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "ID of the email address", "required": true, "schema": { "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }, "index$": 0 }] }, "POST /emails": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "address": { "type": "string", "format": "email", "key$": "address" } }, "required": ["address"], "index$": 1 } } } }, "parameters": [] }, "GET /emails": { "protocol": "http", "parameters": [] }, "DELETE /emails/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "ID of the email address", "required": true, "schema": { "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const email_ref01_ent = client.Email();
        let email_ref01_data = setup.data.new.email['email_ref01'];
        email_ref01_data = (await email_ref01_ent.create(email_ref01_data)).data();
        (0, node_assert_1.default)(null != email_ref01_data.id);
        // LIST
        const email_ref01_match = {};
        const email_ref01_list = (await email_ref01_ent.list(email_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(email_ref01_list, { id: email_ref01_data.id })));
        // REMOVE
        const email_ref01_match_rm0 = { id: email_ref01_data.id };
        await email_ref01_ent.remove(email_ref01_match_rm0);
        // LIST
        const email_ref01_match_rt0 = {};
        const email_ref01_list_rt0 = (await email_ref01_ent.list(email_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(email_ref01_list_rt0, { id: email_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email/EmailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email01', 'email02', 'email03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_EMAIL_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_EMAIL_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_EMAIL_ENTID'];
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
//# sourceMappingURL=EmailEntity.test.js.map