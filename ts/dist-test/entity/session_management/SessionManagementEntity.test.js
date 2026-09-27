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
(0, node_test_1.describe)('SessionManagementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HANKO_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HankoPublicSDK.test();
        const ent = testsdk.SessionManagement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'session_management.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amr": { "a": true, "h": "Amr", "n": "amr", "r": false, "sh": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.", "t": "`$ARRAY`", "key$": "amr", "index$": 0 }, "audience": { "a": true, "h": "Audience", "n": "audience", "r": false, "sh": "The intended audience of the token.", "t": "`$ARRAY`", "key$": "audience", "index$": 1 }, "email": { "a": true, "h": "Email", "n": "email", "r": false, "sh": "Data about the email address associated with the token's subject, if available.", "t": "`$OBJECT`", "key$": "email", "index$": 2 }, "expiration": { "a": true, "fo": "date-time", "h": "Expiration", "n": "expiration", "r": true, "sh": "The timestamp indicating when the token will expire.", "t": "`$STRING`", "key$": "expiration", "index$": 3 }, "issued_at": { "a": true, "fo": "date-time", "h": "Issued At", "n": "issued_at", "r": false, "sh": "The timestamp indicating when the token was issued.", "t": "`$STRING`", "key$": "issued_at", "index$": 4 }, "issuer": { "a": true, "h": "Issuer", "n": "issuer", "r": false, "sh": "The entity that issued the token.", "t": "`$STRING`", "key$": "issuer", "index$": 5 }, "session_id": { "a": true, "h": "Session Id", "n": "session_id", "r": true, "sh": "The unique identifier for the session associated with this token.", "t": "`$STRING`", "key$": "session_id", "index$": 6 }, "session_token": { "a": true, "fo": "JWT", "h": "Session Token", "n": "session_token", "r": true, "sh": "The session token (JWT) to validate", "t": "`$STRING`", "key$": "session_token", "index$": 7 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": true, "sh": "The unique identifier of the token's subject.", "t": "`$ANY`", "key$": "subject", "index$": 8 } }, "name": "session_management", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /sessions/validate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/sessions/validate", "q": {}, "r": {}, "s": [{ "lit": "sessions" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body.claims`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /sessions/validate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/sessions/validate", "q": {}, "r": {}, "s": [{ "lit": "sessions" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body.claims`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "session_management", "name__orig": "session_management", "Name": "SessionManagement", "name_": "session_management", "name-": "session-management", "NAME": "SESSION_MANAGEMENT", "index$": 9 }, { "active": true, "entity": "session_management", "key$": "BasicSessionManagementFlow", "kind": "basic", "name": "BasicSessionManagementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "session_management_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "session_management_ref01", "srcdatavar": "session_management_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-session_management_ref01" } }], "index$": 1 }] }, 'SessionManagement', { "POST /sessions/validate": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "session_token": { "description": "The session token (JWT) to validate", "type": "string", "format": "JWT", "key$": "session_token" } }, "required": ["session_token"], "index$": 1 } } } }, "parameters": [] }, "GET /sessions/validate": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const session_management_ref01_ent = client.SessionManagement();
        let session_management_ref01_data = setup.data.new.session_management['session_management_ref01'];
        session_management_ref01_data = (await session_management_ref01_ent.create(session_management_ref01_data)).data();
        (0, node_assert_1.default)(null != session_management_ref01_data);
        // LOAD
        const session_management_ref01_match_dt0 = {};
        const session_management_ref01_data_dt0 = (await session_management_ref01_ent.load(session_management_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != session_management_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/session_management/SessionManagementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HankoPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['session_management01', 'session_management02', 'session_management03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID': idmap,
        'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
        'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
        'HANKO_PUBLIC_APIKEY': '',
        'HANKO_PUBLIC_SERVER_TENANT_ID': "",
    });
    idmap = env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID'];
    const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID'];
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
//# sourceMappingURL=SessionManagementEntity.test.js.map