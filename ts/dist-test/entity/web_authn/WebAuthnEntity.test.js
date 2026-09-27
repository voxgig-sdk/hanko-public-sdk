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
(0, node_test_1.describe)('WebAuthnEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.WebAuthn();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'web_authn.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "A new credential name.", "t": "`$STRING`", "key$": "name", "index$": 1 }, "rawId": { "a": true, "h": "Raw Id", "n": "rawId", "r": false, "t": "`$STRING`", "key$": "rawId", "index$": 2 }, "response": { "a": true, "h": "Response", "n": "response", "r": false, "t": "`$OBJECT`", "key$": "response", "index$": 3 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "web_authn", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /webauthn/registration/finalize", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/webauthn/registration/finalize", "q": {}, "r": {}, "s": [{ "lit": "webauthn" }, { "lit": "registration" }, { "lit": "finalize" }], "t": { "req": "`reqdata`", "res": "`body.user_id`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /webauthn/credentials/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/webauthn/credentials/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "webauthn" }, { "lit": "credentials" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /webauthn/credentials/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/webauthn/credentials/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "webauthn" }, { "lit": "credentials" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "web_authn", "name__orig": "web_authn", "Name": "WebAuthn", "name_": "web_authn", "name-": "web-authn", "NAME": "WEB_AUTHN", "index$": 15 }, { "active": true, "entity": "web_authn", "key$": "BasicWebAuthnFlow", "kind": "basic", "name": "BasicWebAuthnFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "web_authn_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "web_authn_ref01", "srcdatavar": "web_authn_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-web_authn_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "web_authn_ref01", "suffix": "_rm0" }, "m": { "id": "web_authn01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'WebAuthn', { "POST /webauthn/registration/finalize": { "protocol": "http", "requestBody": { "description": "Challenge response", "content": { "application/json": { "schema": { "description": "WebAuthn API response to a navigator.credentials.create() call", "type": "object", "properties": { "id": { "type": "string", "example": "_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...", "key$": "id" }, "rawId": { "type": "string", "example": "_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...", "key$": "rawId" }, "type": { "type": "string", "enum": ["public-key"], "example": "public-key", "key$": "type" }, "response": { "type": "object", "properties": { "clientDataJson": { "type": "string", "format": "base64url", "example": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdl..." }, "attestationObject": { "type": "string", "format": "base64url", "example": "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjfSZYN..." }, "transports": { "type": "array", "items": { "type": "string", "enum": [], "example": "internal" } } }, "key$": "response" } }, "x-ref": "#/components/schemas/PublicKeyCredentialAttestationResponse", "index$": 1 } } } }, "parameters": [] }, "DELETE /webauthn/credentials/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "ID of the WebAuthn credential", "required": true, "schema": { "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }, "index$": 0 }] }, "PATCH /webauthn/credentials/{id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "description": "A new credential name. Has no technical meaning, only serves as an identification aid for the user.", "type": "string", "key$": "name" } }, "index$": 1 } } } }, "parameters": [{ "name": "id", "in": "path", "description": "ID of the WebAuthn credential", "required": true, "schema": { "type": "string", "format": "uuid4", "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c", "x-ref": "#/components/schemas/UUID4" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const web_authn_ref01_ent = client.WebAuthn();
        let web_authn_ref01_data = setup.data.new.web_authn['web_authn_ref01'];
        web_authn_ref01_data = (await web_authn_ref01_ent.create(web_authn_ref01_data)).data();
        (0, node_assert_1.default)(null != web_authn_ref01_data.id);
        // UPDATE
        const web_authn_ref01_data_up0 = {};
        web_authn_ref01_data_up0.id = web_authn_ref01_data.id;
        const web_authn_ref01_markdef_up0 = { name: 'name', value: 'Mark01-web_authn_ref01_' + setup.now };
        web_authn_ref01_data_up0[web_authn_ref01_markdef_up0.name] = web_authn_ref01_markdef_up0.value;
        const web_authn_ref01_resdata_up0 = (await web_authn_ref01_ent.update(web_authn_ref01_data_up0)).data();
        (0, node_assert_1.default)(web_authn_ref01_resdata_up0.id === web_authn_ref01_data_up0.id);
        (0, node_assert_1.default)(web_authn_ref01_resdata_up0[web_authn_ref01_markdef_up0.name] === web_authn_ref01_markdef_up0.value);
        // REMOVE
        const web_authn_ref01_match_rm0 = { id: web_authn_ref01_data.id };
        await web_authn_ref01_ent.remove(web_authn_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/web_authn/WebAuthnTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['web_authn01', 'web_authn02', 'web_authn03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID'];
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
//# sourceMappingURL=WebAuthnEntity.test.js.map