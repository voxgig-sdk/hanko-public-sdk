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
(0, node_test_1.describe)('CredentialCreationOptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.CredentialCreationOption();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credential_creation_option.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "attestation", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "authenticatorSelection", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "format": "base64url", "name": "challenge", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "pubKeyCredParams", "req": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "rp", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "format": "int64", "name": "timeout", "req": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "user", "req": false, "type": "`$OBJECT`", "index$": 6 }], "name": "credential_creation_option", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /webauthn/registration/initialize", "json": "{\"operationId\":\"webauthnRegInit\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Options for credential creation with the WebAuthn API\",\"externalDocs\":{\"url\":\"https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions\"},\"properties\":{\"publicKey\":{\"properties\":{\"attestation\":{\"enum\":[\"none\",\"indirect\",\"direct\",\"enterprise\"],\"example\":\"none\",\"type\":\"string\"},\"authenticatorSelection\":{\"properties\":{\"authenticatorAttachment\":{\"enum\":[\"platform\",\"cross-platform\"],\"example\":\"platform\",\"type\":\"string\"},\"requireResidentKey\":{\"example\":true,\"type\":\"boolean\"},\"residentKey\":{\"enum\":[\"discouraged\",\"preferred\",\"required\"],\"example\":\"preferred\",\"type\":\"string\"},\"userVerification\":{\"enum\":[\"discouraged\",\"preferred\",\"required\"],\"example\":\"required\",\"type\":\"string\"}},\"type\":\"object\"},\"challenge\":{\"example\":\"7qmkJUXR0dOFnsW48evX3qKdCzlGjvvqAAvMDN+KTN0=\",\"format\":\"base64url\",\"type\":\"string\"},\"pubKeyCredParams\":{\"example\":[{\"alg\":-7,\"type\":\"public-key\"}],\"items\":{\"properties\":{\"alg\":{\"type\":\"number\"},\"type\":{\"enum\":[\"public-key\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"rp\":{\"properties\":{\"id\":{\"example\":\"localhost\",\"type\":\"string\"},\"name\":{\"example\":\"Hanko Authentication Service\",\"type\":\"string\"}},\"type\":\"object\"},\"timeout\":{\"example\":60000,\"format\":\"int64\",\"type\":\"integer\"},\"user\":{\"properties\":{\"displayName\":{\"example\":\"user@example.com\",\"type\":\"string\"},\"id\":{\"example\":\"pPQT9rwJRD7gVncsnCDNyN\",\"type\":\"string\"},\"name\":{\"example\":\"user@example.com\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Challenge\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"422\":{\"content\":{\"application/json\":{\"example\":{\"code\":422,\"message\":\"Unprocessable Entity\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unprocessable Entity\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/webauthn/registration/initialize", "segments": [{ "lit": "webauthn" }, { "lit": "registration" }, { "lit": "initialize" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.publicKey`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "credential_creation_option", "name__orig": "credential_creation_option", "Name": "CredentialCreationOption", "name_": "credential_creation_option", "name-": "credential-creation-option", "NAME": "CREDENTIAL_CREATION_OPTION", "index$": 2 }, { "active": true, "entity": "credential_creation_option", "key$": "BasicCredentialCreationOptionFlow", "kind": "basic", "name": "BasicCredentialCreationOptionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "credential_creation_option_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'CredentialCreationOption');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const credential_creation_option_ref01_ent = client.CredentialCreationOption();
        let credential_creation_option_ref01_data = setup.data.new.credential_creation_option['credential_creation_option_ref01'];
        credential_creation_option_ref01_data = (await credential_creation_option_ref01_ent.create(credential_creation_option_ref01_data)).data();
        (0, node_assert_1.default)(null != credential_creation_option_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credential_creation_option/CredentialCreationOptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credential_creation_option01', 'credential_creation_option02', 'credential_creation_option03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID'];
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
//# sourceMappingURL=CredentialCreationOptionEntity.test.js.map