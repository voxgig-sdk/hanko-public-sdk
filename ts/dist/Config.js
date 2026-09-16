"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'HankoPublic',
        slug: "hanko-public",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://{tenant_id}.hanko.io",
        server: {
            "tenant_id": "",
        },
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            create_user_response_object: {},
            credential: {},
            credential_creation_option: {},
            credential_request_option: {},
            email: {},
            email_management: {},
            hanko_configuration: {},
            json_web_key_set: {},
            passcode: {},
            password: {},
            saml: {},
            session_management: {},
            status: {},
            third_party: {},
            token: {},
            user: {},
            user_management: {},
            web_authn: {},
            webauthn_login: {},
        }
    };
    entity = {
        "create_user_response_object": {
            "fields": [],
            "name": "create_user_response_object",
            "op": {},
            "relations": {
                "ancestors": []
            }
        },
        "credential": {
            "fields": [
                {
                    "format": "uuid",
                    "name": "aaguid",
                    "type": "`$STRING`"
                },
                {
                    "name": "attestation_type",
                    "type": "`$STRING`"
                },
                {
                    "name": "backup_eligible",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "backup_state",
                    "type": "`$BOOLEAN`"
                },
                {
                    "format": "date-time",
                    "name": "created_at",
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid",
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "last_used_at",
                    "type": "`$STRING`"
                },
                {
                    "name": "mfa_only",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "publickey",
                    "type": "`$STRING`"
                },
                {
                    "name": "transports",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "credential",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/webauthn/credentials",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "credentials"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "webauthn",
                                "credentials"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "credential_creation_option": {
            "fields": [
                {
                    "name": "attestation",
                    "type": "`$STRING`"
                },
                {
                    "name": "authenticatorSelection",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "base64url",
                    "name": "challenge",
                    "type": "`$STRING`"
                },
                {
                    "name": "pubKeyCredParams",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "rp",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "int64",
                    "name": "timeout",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "user",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "credential_creation_option",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webauthn/registration/initialize",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "registration"
                                },
                                {
                                    "lit": "initialize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.publicKey`"
                            },
                            "parts": [
                                "webauthn",
                                "registration",
                                "initialize"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "credential_request_option": {
            "fields": [
                {
                    "name": "allowCredentials",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "base64url",
                    "name": "challenge",
                    "type": "`$STRING`"
                },
                {
                    "name": "rpId",
                    "type": "`$STRING`"
                },
                {
                    "format": "int64",
                    "name": "timeout",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "userVerification",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "short": "The ID of the user on whose behalf WebAuthn login should be performed",
                    "type": "`$STRING`"
                }
            ],
            "name": "credential_request_option",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webauthn/login/initialize",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "login"
                                },
                                {
                                    "lit": "initialize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.publicKey`"
                            },
                            "parts": [
                                "webauthn",
                                "login",
                                "initialize"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email": {
            "fields": [
                {
                    "format": "email",
                    "name": "address",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "short": "The email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "The ID of the email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "identities",
                    "type": "`$ANY`"
                },
                {
                    "name": "identity",
                    "type": "`$ANY`"
                },
                {
                    "name": "is_primary",
                    "short": "Indicates it's the primary email address.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "is_verified",
                    "short": "Indicated the email has been verified.",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "email",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/emails",
                            "segments": [
                                {
                                    "lit": "emails"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "emails"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/emails",
                            "segments": [
                                {
                                    "lit": "emails"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "emails"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/emails/{id}",
                            "segments": [
                                {
                                    "lit": "emails"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "emails",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email_management": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "email_management",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/emails/{id}/set_primary",
                            "segments": [
                                {
                                    "lit": "emails"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "set_primary"
                                }
                            ],
                            "select": {
                                "$action": "set_primary",
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "emails",
                                "{id}",
                                "set_primary"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "hanko_configuration": {
            "fields": [
                {
                    "name": "account",
                    "short": "Controls the behavior regarding user account.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "emails",
                    "short": "Controls the behavior regarding email addresses.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "password",
                    "short": "Configuration options concerning passwords",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "hanko_configuration",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/.well-known/config",
                            "segments": [
                                {
                                    "lit": ".well-known"
                                },
                                {
                                    "lit": "config"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                ".well-known",
                                "config"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "json_web_key_set": {
            "fields": [
                {
                    "name": "alg",
                    "type": "`$STRING`"
                },
                {
                    "format": "base64url",
                    "name": "e",
                    "type": "`$STRING`"
                },
                {
                    "name": "kid",
                    "type": "`$STRING`"
                },
                {
                    "name": "kty",
                    "type": "`$STRING`"
                },
                {
                    "format": "base64url",
                    "name": "n",
                    "type": "`$STRING`"
                },
                {
                    "name": "use",
                    "type": "`$STRING`"
                }
            ],
            "name": "json_web_key_set",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/.well-known/jwks.json",
                            "segments": [
                                {
                                    "lit": ".well-known"
                                },
                                {
                                    "lit": "jwks.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.keys`"
                            },
                            "parts": [
                                ".well-known",
                                "jwks.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "passcode": {
            "fields": [
                {
                    "name": "code",
                    "short": "The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits",
                    "type": "`$STRING`"
                },
                {
                    "name": "email_id",
                    "short": "The ID of the email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "The ID of the passcode",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "req": true,
                    "short": "The ID of the user",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "passcode",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/passcode/login/finalize",
                            "segments": [
                                {
                                    "lit": "passcode"
                                },
                                {
                                    "lit": "login"
                                },
                                {
                                    "lit": "finalize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.id`"
                            },
                            "parts": [
                                "passcode",
                                "login",
                                "finalize"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/passcode/login/initialize",
                            "segments": [
                                {
                                    "lit": "passcode"
                                },
                                {
                                    "lit": "login"
                                },
                                {
                                    "lit": "initialize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.id`"
                            },
                            "parts": [
                                "passcode",
                                "login",
                                "initialize"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "password": {
            "fields": [
                {
                    "name": "password",
                    "req": true,
                    "short": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "req": true,
                    "short": "The ID of the user to create/set a password for",
                    "type": "`$STRING`"
                }
            ],
            "name": "password",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/password/login",
                            "segments": [
                                {
                                    "lit": "password"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "select": {
                                "$action": "login"
                            },
                            "transform": {
                                "req": {
                                    "password": "`reqdata`"
                                },
                                "res": "`body`"
                            },
                            "parts": [
                                "password",
                                "login"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/password",
                            "segments": [
                                {
                                    "lit": "password"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": {
                                    "password": "`reqdata`"
                                },
                                "res": "`body`"
                            },
                            "parts": [
                                "password"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "saml": {
            "fields": [],
            "name": "saml",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/saml/callback",
                            "segments": [
                                {
                                    "lit": "saml"
                                },
                                {
                                    "lit": "callback"
                                }
                            ],
                            "select": {
                                "$action": "callback"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "saml",
                                "callback"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cert_only",
                                        "orig": "cert_only",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "domain",
                                        "orig": "domain",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/saml/metadata",
                            "segments": [
                                {
                                    "lit": "saml"
                                },
                                {
                                    "lit": "metadata"
                                }
                            ],
                            "select": {
                                "$action": "metadata",
                                "exist": [
                                    "cert_only",
                                    "domain"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "saml",
                                "metadata"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "domain",
                                        "orig": "domain",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/saml/provider",
                            "segments": [
                                {
                                    "lit": "saml"
                                },
                                {
                                    "lit": "provider"
                                }
                            ],
                            "select": {
                                "$action": "provider",
                                "exist": [
                                    "domain"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.attribute_map`"
                            },
                            "parts": [
                                "saml",
                                "provider"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "session_management": {
            "fields": [
                {
                    "name": "amr",
                    "short": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "audience",
                    "short": "The intended audience of the token.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "email",
                    "short": "Data about the email address associated with the token's subject, if available.",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "date-time",
                    "name": "expiration",
                    "req": true,
                    "short": "The timestamp indicating when the token will expire.",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "issued_at",
                    "short": "The timestamp indicating when the token was issued.",
                    "type": "`$STRING`"
                },
                {
                    "name": "issuer",
                    "short": "The entity that issued the token.",
                    "type": "`$STRING`"
                },
                {
                    "name": "session_id",
                    "req": true,
                    "short": "The unique identifier for the session associated with this token.",
                    "type": "`$STRING`"
                },
                {
                    "format": "JWT",
                    "name": "session_token",
                    "req": true,
                    "short": "The session token (JWT) to validate",
                    "type": "`$STRING`"
                },
                {
                    "name": "subject",
                    "req": true,
                    "short": "The unique identifier of the token's subject.",
                    "type": "`$ANY`"
                }
            ],
            "name": "session_management",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/sessions/validate",
                            "segments": [
                                {
                                    "lit": "sessions"
                                },
                                {
                                    "lit": "validate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.claims`"
                            },
                            "parts": [
                                "sessions",
                                "validate"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sessions/validate",
                            "segments": [
                                {
                                    "lit": "sessions"
                                },
                                {
                                    "lit": "validate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.claims`"
                            },
                            "parts": [
                                "sessions",
                                "validate"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "status": {
            "fields": [],
            "name": "status",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/",
                            "segments": [],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": []
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "third_party": {
            "fields": [],
            "name": "third_party",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "code",
                                        "orig": "code",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "error",
                                        "orig": "error",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "error_description",
                                        "orig": "error_description",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/thirdparty/callback",
                            "segments": [
                                {
                                    "lit": "thirdparty"
                                },
                                {
                                    "lit": "callback"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "code",
                                    "error",
                                    "error_description",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "thirdparty",
                                "callback"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "provider",
                                        "orig": "provider",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "redirect_to",
                                        "orig": "redirect_to",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/thirdparty/auth",
                            "segments": [
                                {
                                    "lit": "thirdparty"
                                },
                                {
                                    "lit": "auth"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "provider",
                                    "redirect_to"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "thirdparty",
                                "auth"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "token": {
            "fields": [
                {
                    "format": "base64url",
                    "name": "value",
                    "type": "`$STRING`"
                }
            ],
            "name": "token",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/token",
                            "segments": [
                                {
                                    "lit": "token"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.user_id`"
                            },
                            "parts": [
                                "token"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "created_at",
                    "short": "Time of creation of the the user",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The email address of the user",
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid4",
                    "name": "email_id",
                    "short": "The ID of the newly created email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "emails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "family_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "given_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "has_webauthn_credential",
                    "type": "`$BOOLEAN`"
                },
                {
                    "deprecated": true,
                    "format": "uuid4",
                    "name": "id",
                    "short": "The ID of the user.",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "short": "The public and unsafe metadata of a user",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "mfa_config",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "passkeys",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "uri",
                    "name": "picture",
                    "type": "`$STRING`"
                },
                {
                    "name": "security_keys",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "date-time",
                    "name": "updated_at",
                    "short": "Time of last update of the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "short": "The ID of the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "username",
                    "short": "The username of the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "verified",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "webauthn_credentials",
                    "short": "A list of WebAuthn credentials",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "user",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/user",
                            "segments": [
                                {
                                    "lit": "user"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "user"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/users",
                            "segments": [
                                {
                                    "lit": "users"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users/{id}",
                            "segments": [
                                {
                                    "lit": "users"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/user",
                            "segments": [
                                {
                                    "lit": "user"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "user"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user_management": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "created_at",
                    "short": "Time of creation of the the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "emails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "family_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "given_name",
                    "type": "`$STRING`"
                },
                {
                    "deprecated": true,
                    "name": "id",
                    "short": "The ID of the user.",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "short": "The public and unsafe metadata of a user",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "mfa_config",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "passkeys",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "uri",
                    "name": "picture",
                    "type": "`$STRING`"
                },
                {
                    "name": "security_keys",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "date-time",
                    "name": "updated_at",
                    "short": "Time of last update of the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "short": "The ID of the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "username",
                    "short": "The representation of a username of the user",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "user_management",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/logout",
                            "segments": [
                                {
                                    "lit": "logout"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "logout"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/me",
                            "segments": [
                                {
                                    "lit": "me"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "me"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "web_authn": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "A new credential name.",
                    "type": "`$STRING`"
                },
                {
                    "name": "rawId",
                    "type": "`$STRING`"
                },
                {
                    "name": "response",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "web_authn",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webauthn/registration/finalize",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "registration"
                                },
                                {
                                    "lit": "finalize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.user_id`"
                            },
                            "parts": [
                                "webauthn",
                                "registration",
                                "finalize"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/webauthn/credentials/{id}",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "credentials"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "webauthn",
                                "credentials",
                                "{id}"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/webauthn/credentials/{id}",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "credentials"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "webauthn",
                                "credentials",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "webauthn_login": {
            "fields": [
                {
                    "format": "base64url",
                    "name": "credential_id",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "rawId",
                    "type": "`$STRING`"
                },
                {
                    "name": "response",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid4",
                    "name": "user_id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "webauthn_login",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webauthn/login/finalize",
                            "segments": [
                                {
                                    "lit": "webauthn"
                                },
                                {
                                    "lit": "login"
                                },
                                {
                                    "lit": "finalize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "webauthn",
                                "login",
                                "finalize"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map