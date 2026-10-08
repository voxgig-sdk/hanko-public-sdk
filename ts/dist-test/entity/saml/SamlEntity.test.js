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
(0, node_test_1.describe)('SamlEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.Saml();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'saml.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "saml", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /saml/callback", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/saml/callback", "q": { "$action": "callback" }, "r": {}, "rb": { "fields": [{ "name": "RelayState" }, { "name": "SAMLResponse" }], "kind": "form", "media": "application/x-www-form-urlencoded" }, "s": [{ "lit": "saml" }, { "lit": "callback" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /saml/metadata", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cert_only", "or": "cert_only", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/saml/metadata", "q": { "$action": "metadata", "exist": ["domain"] }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/octet-stream" }, "s": [{ "lit": "saml" }, { "lit": "metadata" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /saml/provider", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/saml/provider", "q": { "$action": "provider", "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "saml" }, { "lit": "provider" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "saml", "name__orig": "saml", "Name": "Saml", "name_": "saml", "name-": "saml", "NAME": "SAML", "index$": 7 }, { "active": true, "entity": "saml", "key$": "BasicSamlFlow", "kind": "basic", "name": "BasicSamlFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "saml_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "saml_ref01", "srcdatavar": "saml_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-saml_ref01" } }], "unreachable": true }] }, 'Saml', { "POST /saml/callback": { "protocol": "http", "requestBody": { "description": "SAML Identity Provider Response", "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "RelayState": { "type": "string" }, "SAMLResponse": { "type": "string" } } } } } }, "parameters": [] }, "GET /saml/metadata": { "protocol": "http", "parameters": [{ "name": "domain", "in": "query", "description": "Fully qualified domain name to which a SAML service provider is registered", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cert_only", "in": "query", "description": "Toggle to download the SAML service provider public certificate", "schema": { "type": "boolean" }, "index$": 1 }] }, "GET /saml/provider": { "protocol": "http", "parameters": [{ "name": "domain", "in": "query", "description": "Fully qualified domain name for which a SAML service provider is registered", "required": true, "schema": { "type": "string", "format": "hostname" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const saml_ref01_ent = client.Saml();
        let saml_ref01_data = setup.data.new.saml['saml_ref01'];
        saml_ref01_data = (await saml_ref01_ent.create(saml_ref01_data)).data();
        (0, node_assert_1.default)(null != saml_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/saml/SamlTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['saml01', 'saml02', 'saml03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_SAML_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_SAML_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_SAML_ENTID'];
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
//# sourceMappingURL=SamlEntity.test.js.map