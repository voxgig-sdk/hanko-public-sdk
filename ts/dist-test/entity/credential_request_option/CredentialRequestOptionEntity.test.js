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
(0, node_test_1.describe)('CredentialRequestOptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.CredentialRequestOption();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CredentialRequestOption().create({ "challenge": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credential_request_option.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allowCredentials": { "a": true, "h": "Allow Credentials", "n": "allowCredentials", "r": false, "t": "`$ARRAY`", "key$": "allowCredentials", "index$": 0 }, "challenge": { "a": true, "fo": "base64url", "h": "Challenge", "n": "challenge", "r": false, "t": "`$STRING`", "key$": "challenge", "index$": 1 }, "rpId": { "a": true, "h": "Rp Id", "n": "rpId", "r": false, "t": "`$STRING`", "key$": "rpId", "index$": 2 }, "timeout": { "a": true, "fo": "int64", "h": "Timeout", "n": "timeout", "r": false, "t": "`$INTEGER`", "key$": "timeout", "index$": 3 }, "userVerification": { "a": true, "h": "User Verification", "n": "userVerification", "r": false, "t": "`$STRING`", "key$": "userVerification", "index$": 4 }, "user_id": { "a": true, "fo": "uuid4", "h": "User Id", "n": "user_id", "r": false, "sh": "The ID of the user on whose behalf WebAuthn login should be performed", "t": "`$STRING`", "key$": "user_id", "index$": 5 } }, "name": "credential_request_option", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["user_id"], "co": { "id": "POST /webauthn/login/initialize", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/webauthn/login/initialize", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "webauthn" }, { "lit": "login" }, { "lit": "initialize" }], "t": { "req": "`reqdata`", "res": "`body.publicKey`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "credential_request_option", "name__orig": "credential_request_option", "Name": "CredentialRequestOption", "name_": "credential_request_option", "name-": "credential-request-option", "NAME": "CREDENTIAL_REQUEST_OPTION", "index$": 1 }, { "active": true, "entity": "credential_request_option", "key$": "BasicCredentialRequestOptionFlow", "kind": "basic", "name": "BasicCredentialRequestOptionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "credential_request_option_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CredentialRequestOption', { "POST /webauthn/login/initialize": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "user_id": { "description": "The ID of the user on whose behalf WebAuthn login should be performed", "allOf": [{ "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }], "key$": "user_id" } }, "index$": 1 } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const credential_request_option_ref01_ent = client.CredentialRequestOption();
        let credential_request_option_ref01_data = setup.data.new.credential_request_option['credential_request_option_ref01'];
        credential_request_option_ref01_data = (await credential_request_option_ref01_ent.create(credential_request_option_ref01_data)).data();
        (0, node_assert_1.default)(null != credential_request_option_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credential_request_option/CredentialRequestOptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credential_request_option01', 'credential_request_option02', 'credential_request_option03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID'];
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
//# sourceMappingURL=CredentialRequestOptionEntity.test.js.map