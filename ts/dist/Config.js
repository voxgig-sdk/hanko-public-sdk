"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const SecretsFeature_1 = require("./feature/secrets/SecretsFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    secrets: SecretsFeature_1.SecretsFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        version: "0.1.1",
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
        secrets: {
            "options": {
                "active": false,
                "cache": true,
                "exchange": {
                    "active": false,
                    "method": "POST",
                    "path": "auth/token",
                    "refresh": "",
                    "request": "refresh_token",
                    "response": "access_token",
                    "retries": 1,
                    "statuses": [
                        401
                    ]
                },
                "name": "apikey",
                "providers": []
            },
            "optspec": {},
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
                "now": "`$FUNCTION`",
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
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            json_web_key: {},
            organization_management: {},
            saml: {},
            session_management: {},
            status: {},
            third_party: {},
            user_management: {},
        }
    };
    entity = {
        "json_web_key": {
            "fields": [
                {
                    "name": "alg",
                    "title": "Alg",
                    "type": "`$STRING`"
                },
                {
                    "name": "e",
                    "title": "E",
                    "type": "`$STRING`",
                    "format": "base64url"
                },
                {
                    "name": "kid",
                    "title": "Kid",
                    "type": "`$STRING`"
                },
                {
                    "name": "kty",
                    "title": "Kty",
                    "type": "`$STRING`"
                },
                {
                    "name": "n",
                    "title": "N",
                    "type": "`$STRING`",
                    "format": "base64url"
                },
                {
                    "name": "use",
                    "title": "Use",
                    "type": "`$STRING`"
                }
            ],
            "name": "json_web_key",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                ".well-known",
                                "jwks.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.keys`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "organization_management": {
            "fields": [
                {
                    "name": "has_role",
                    "title": "Has Role",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "organization_id",
                    "title": "Organization Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the organization to check",
                    "format": "uuid4"
                },
                {
                    "name": "roles",
                    "title": "Roles",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "IDs or slugs of roles to check for."
                }
            ],
            "name": "organization_management",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/organizations/roles/check",
                            "segments": [
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "lit": "roles"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "organizations",
                                "roles",
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "parts": [
                                "saml",
                                "callback"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "callback"
                            },
                            "body": {
                                "fields": [
                                    {
                                        "name": "RelayState"
                                    },
                                    {
                                        "name": "SAMLResponse"
                                    }
                                ],
                                "kind": "form",
                                "media": "application/x-www-form-urlencoded"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "saml",
                                "metadata"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cert_only",
                                        "orig": "cert_only",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "metadata",
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/octet-stream"
                            }
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
                    "name": "claims",
                    "title": "Claims",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The claims extracted from a JWT."
                },
                {
                    "name": "expiration_time",
                    "title": "Expiration Time",
                    "type": "`$STRING`",
                    "short": "Date-time indicating the expiration of the session.",
                    "deprecated": true,
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the organization",
                    "format": "uuid4"
                },
                {
                    "name": "idle_expires_at",
                    "title": "Idle Expires At",
                    "type": "`$STRING`",
                    "short": "Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time.",
                    "format": "date-time"
                },
                {
                    "name": "is_valid",
                    "title": "Is Valid",
                    "type": "`$BOOLEAN`",
                    "short": "Indicates whether the session is valid or not"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the organization"
                },
                {
                    "name": "organizations",
                    "title": "Organizations",
                    "type": "`$ARRAY`",
                    "short": "The organizations the user belongs to, and the role slugs they hold within each."
                },
                {
                    "name": "roles",
                    "title": "Roles",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "The slugs of the roles the user holds within this organization"
                },
                {
                    "name": "session_token",
                    "title": "Session Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The session token (JWT) to validate",
                    "format": "JWT"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user the session is associated with.",
                    "deprecated": true,
                    "format": "uuid4"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "session_management",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
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
                            "parts": [
                                "sessions",
                                "validate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "sessions",
                                "validate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/",
                            "segments": [],
                            "parts": [],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "raw",
                                "media": "text/html"
                            }
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
                            "parts": [
                                "thirdparty",
                                "callback"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "code",
                                        "orig": "code",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "error",
                                        "orig": "error",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "error_description",
                                        "orig": "error_description",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "state"
                                ]
                            }
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
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "Time of creation of the the user",
                    "format": "date-time"
                },
                {
                    "name": "emails",
                    "title": "Emails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "family_name",
                    "title": "Family Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "given_name",
                    "title": "Given Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user.",
                    "deprecated": true,
                    "format": "uuid4"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "The public and unsafe metadata of a user"
                },
                {
                    "name": "mfa_config",
                    "title": "Mfa Config",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "passkeys",
                    "title": "Passkeys",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "picture",
                    "title": "Picture",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "security_keys",
                    "title": "Security Keys",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "short": "Time of last update of the user",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "short": "The ID of the user",
                    "format": "uuid4"
                },
                {
                    "name": "username",
                    "title": "Username",
                    "type": "`$OBJECT`",
                    "short": "The representation of a username of the user"
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/logout",
                            "segments": [
                                {
                                    "lit": "logout"
                                }
                            ],
                            "parts": [
                                "logout"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/me",
                            "segments": [
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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