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
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'saml.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "saml", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /saml/callback", "json": "{\"operationId\":\"post-saml-callback\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"RelayState\":{\"type\":\"string\"},\"SAMLResponse\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"SAML Identity Provider Response\"},\"responses\":{\"302\":{\"description\":\"Found\",\"headers\":{\"Set-Cookie\":{\"description\":\"Contains the JSON Web Token (JWT) that must be provided to protected endpoints.Cookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\",\"schema\":{\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`for purposes of cross-domain communication between client and Hanko API.\",\"schema\":{\"type\":\"string\"}}}},\"307\":{\"description\":\"Temporary Redirect\",\"headers\":{\"Location\":{\"description\":\"On error, redirect to the `saml.default_redirect_url` set in the backend-configuration. Error details are provided in the location URL in the form of `error` and `error_description`query params.\",\"schema\":{\"type\":\"string\"}}}}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/saml/callback", "segments": [{ "lit": "saml" }, { "lit": "callback" }], "select": { "$action": "callback" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "cert_only", "orig": "cert_only", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "kind": "query", "name": "domain", "orig": "domain", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /saml/metadata", "json": "{\"operationId\":\"get-saml-metadata\",\"parameters\":[{\"description\":\"Fully qualified domain name to which a SAML service provider is registered\",\"in\":\"query\",\"name\":\"domain\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Toggle to download the SAML service provider public certificate\",\"in\":\"query\",\"name\":\"cert_only\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/octet-stream\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"404\":{\"description\":\"Not found\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/saml/metadata", "segments": [{ "lit": "saml" }, { "lit": "metadata" }], "select": { "$action": "metadata", "exist": ["cert_only", "domain"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "domain", "orig": "domain", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /saml/provider", "json": "{\"operationId\":\"get-saml-provider\",\"parameters\":[{\"description\":\"Fully qualified domain name for which a SAML service provider is registered\",\"in\":\"query\",\"name\":\"domain\",\"required\":true,\"schema\":{\"format\":\"hostname\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"attribute_map\":{\"additionalProperties\":false,\"properties\":{\"birthdate\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"email_verified\":{\"type\":\"string\"},\"family_name\":{\"type\":\"string\"},\"gender\":{\"type\":\"string\"},\"given_name\":{\"type\":\"string\"},\"locale\":{\"type\":\"string\"},\"middle_name\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"nickname\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"phone_verified\":{\"type\":\"string\"},\"picture\":{\"type\":\"string\"},\"preferred_username\":{\"type\":\"string\"},\"profile\":{\"type\":\"string\"},\"updated_at\":{\"type\":\"string\"},\"website\":{\"type\":\"string\"},\"zone_info\":{\"type\":\"string\"}},\"type\":\"object\"},\"domain\":{\"example\":\"text.example\",\"format\":\"hostname\",\"readOnly\":true,\"type\":\"string\"},\"enabled\":{\"default\":true,\"readOnly\":true,\"type\":\"boolean\"},\"metadata_url\":{\"example\":\"http://idp-metadata.url\",\"format\":\"uri\",\"readOnly\":true,\"type\":\"string\"},\"name\":{\"example\":\"MySamlProvier\",\"readOnly\":true,\"type\":\"string\"},\"skip_email_verification\":{\"default\":false,\"readOnly\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"404\":{\"description\":\"Not Found\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/saml/provider", "segments": [{ "lit": "saml" }, { "lit": "provider" }], "select": { "$action": "provider", "exist": ["domain"] }, "transform": { "req": "`reqdata`", "res": "`body.attribute_map`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "saml", "name__orig": "saml", "Name": "Saml", "name_": "saml", "name-": "saml", "NAME": "SAML", "index$": 10 }, { "active": true, "entity": "saml", "key$": "BasicSamlFlow", "kind": "basic", "name": "BasicSamlFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "saml_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "saml_ref01", "srcdatavar": "saml_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-saml_ref01" } }], "index$": 1 }] }, 'Saml');
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
        // LOAD
        const saml_ref01_match_dt0 = {};
        const saml_ref01_data_dt0 = (await saml_ref01_ent.load(saml_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != saml_ref01_data_dt0);
    });
});
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