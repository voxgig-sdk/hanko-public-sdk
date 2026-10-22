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
(0, node_test_1.describe)('JsonWebKeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.JsonWebKey();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('json_web_key hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HankoPublicSDK.test(offline).JsonWebKey().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HankoPublicSDK.test(offline).JsonWebKey()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.JsonWebKey().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HankoPublicSDK.test().JsonWebKey().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.JsonWebKey().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.JsonWebKey().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.JsonWebKey().list({ "alg": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'json_web_key.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alg": { "a": true, "h": "Alg", "n": "alg", "r": false, "t": "`$STRING`", "key$": "alg", "index$": 0 }, "e": { "a": true, "fo": "base64url", "h": "E", "n": "e", "r": false, "t": "`$STRING`", "key$": "e", "index$": 1 }, "kid": { "a": true, "h": "Kid", "n": "kid", "r": false, "t": "`$STRING`", "key$": "kid", "index$": 2 }, "kty": { "a": true, "h": "Kty", "n": "kty", "r": false, "t": "`$STRING`", "key$": "kty", "index$": 3 }, "n": { "a": true, "fo": "base64url", "h": "N", "n": "n", "r": false, "t": "`$STRING`", "key$": "n", "index$": 4 }, "use": { "a": true, "h": "Use", "n": "use", "r": false, "t": "`$STRING`", "key$": "use", "index$": 5 } }, "name": "json_web_key", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /.well-known/jwks.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/.well-known/jwks.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": ".well-known" }, { "lit": "jwks.json" }], "t": { "req": "`reqdata`", "res": "`body.keys`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "json_web_key", "name__orig": "json_web_key", "Name": "JsonWebKey", "name_": "json_web_key", "name-": "json-web-key", "NAME": "JSON_WEB_KEY", "index$": 0 }, { "active": true, "entity": "json_web_key", "key$": "BasicJsonWebKeyFlow", "kind": "basic", "name": "BasicJsonWebKeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "json_web_key_ref01" } }], "index$": 0 }] }, 'JsonWebKey', { "GET /.well-known/jwks.json": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let json_web_key_ref01_data = Object.values(setup.data.existing.json_web_key)[0];
        // LIST
        const json_web_key_ref01_ent = client.JsonWebKey();
        const json_web_key_ref01_match = {};
        const json_web_key_ref01_list = (await json_web_key_ref01_ent.list(json_web_key_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/json_web_key/JsonWebKeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['json_web_key01', 'json_web_key02', 'json_web_key03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID'];
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
//# sourceMappingURL=JsonWebKeyEntity.test.js.map