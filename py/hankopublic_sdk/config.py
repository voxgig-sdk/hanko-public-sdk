# HankoPublic SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HankoPublic",
            "slug": "hanko-public",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{tenant_id}.hanko.io",
            "server": {
                "tenant_id": "",
            },
            "auth": {
                "prefix": "",
                "in": "cookie",
                "name": "hanko",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "credential": {},
                "credential_creation_option": {},
                "credential_request_option": {},
                "email": {},
                "hanko_configuration": {},
                "json_web_key": {},
                "passcode": {},
                "password": {},
                "saml": {},
                "session_management": {},
                "status": {},
                "third_party": {},
                "token": {},
                "user": {},
                "user_management": {},
                "web_authn": {},
                "webauthn_login": {},
            },
        },
        "entity": {
      "credential": {
        "fields": [
          {
            "name": "aaguid",
            "title": "Aaguid",
            "type": "`$STRING`",
            "format": "uuid",
          },
          {
            "name": "attestation_type",
            "title": "Attestation Type",
            "type": "`$STRING`",
          },
          {
            "name": "backup_eligible",
            "title": "Backup Eligible",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "backup_state",
            "title": "Backup State",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "format": "uuid",
          },
          {
            "name": "last_used_at",
            "title": "Last Used At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "mfa_only",
            "title": "Mfa Only",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "publickey",
            "title": "Publickey",
            "type": "`$STRING`",
          },
          {
            "name": "transports",
            "title": "Transports",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "credential",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/webauthn/credentials",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "credentials",
                  },
                ],
                "parts": [
                  "webauthn",
                  "credentials",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "credential_creation_option": {
        "fields": [
          {
            "name": "attestation",
            "title": "Attestation",
            "type": "`$STRING`",
          },
          {
            "name": "authenticatorSelection",
            "title": "Authenticator Selection",
            "type": "`$OBJECT`",
          },
          {
            "name": "challenge",
            "title": "Challenge",
            "type": "`$STRING`",
            "format": "base64url",
          },
          {
            "name": "pubKeyCredParams",
            "title": "Pub Key Cred Params",
            "type": "`$ARRAY`",
          },
          {
            "name": "rp",
            "title": "Rp",
            "type": "`$OBJECT`",
          },
          {
            "name": "timeout",
            "title": "Timeout",
            "type": "`$INTEGER`",
            "format": "int64",
          },
          {
            "name": "user",
            "title": "User",
            "type": "`$OBJECT`",
          },
        ],
        "name": "credential_creation_option",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/webauthn/registration/initialize",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "registration",
                  },
                  {
                    "lit": "initialize",
                  },
                ],
                "parts": [
                  "webauthn",
                  "registration",
                  "initialize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.publicKey`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "credential_request_option": {
        "fields": [
          {
            "name": "allowCredentials",
            "title": "Allow Credentials",
            "type": "`$ARRAY`",
          },
          {
            "name": "challenge",
            "title": "Challenge",
            "type": "`$STRING`",
            "format": "base64url",
          },
          {
            "name": "rpId",
            "title": "Rp Id",
            "type": "`$STRING`",
          },
          {
            "name": "timeout",
            "title": "Timeout",
            "type": "`$INTEGER`",
            "format": "int64",
          },
          {
            "name": "userVerification",
            "title": "User Verification",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "short": "The ID of the user on whose behalf WebAuthn login should be performed",
          },
        ],
        "name": "credential_request_option",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/webauthn/login/initialize",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "login",
                  },
                  {
                    "lit": "initialize",
                  },
                ],
                "parts": [
                  "webauthn",
                  "login",
                  "initialize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.publicKey`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "short": "The email address",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The ID of the email address",
          },
          {
            "name": "identities",
            "title": "Identities",
            "type": "`$ANY`",
          },
          {
            "name": "identity",
            "title": "Identity",
            "type": "`$ANY`",
          },
          {
            "name": "is_primary",
            "title": "Is Primary",
            "type": "`$BOOLEAN`",
            "short": "Indicates it's the primary email address.",
          },
          {
            "name": "is_verified",
            "title": "Is Verified",
            "type": "`$BOOLEAN`",
            "short": "Indicated the email has been verified.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "email",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/emails/{id}/set_primary",
                "segments": [
                  {
                    "lit": "emails",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "set_primary",
                  },
                ],
                "parts": [
                  "emails",
                  "{id}",
                  "set_primary",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                    },
                  ],
                },
                "select": {
                  "$action": "set_primary",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/emails",
                "segments": [
                  {
                    "lit": "emails",
                  },
                ],
                "parts": [
                  "emails",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/emails",
                "segments": [
                  {
                    "lit": "emails",
                  },
                ],
                "parts": [
                  "emails",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/emails/{id}",
                "segments": [
                  {
                    "lit": "emails",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "emails",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "hanko_configuration": {
        "fields": [
          {
            "name": "account",
            "title": "Account",
            "type": "`$OBJECT`",
            "short": "Controls the behavior regarding user account.",
          },
          {
            "name": "emails",
            "title": "Emails",
            "type": "`$OBJECT`",
            "short": "Controls the behavior regarding email addresses.",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$OBJECT`",
            "short": "Configuration options concerning passwords",
          },
        ],
        "name": "hanko_configuration",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/.well-known/config",
                "segments": [
                  {
                    "lit": ".well-known",
                  },
                  {
                    "lit": "config",
                  },
                ],
                "parts": [
                  ".well-known",
                  "config",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "json_web_key": {
        "fields": [
          {
            "name": "alg",
            "title": "Alg",
            "type": "`$STRING`",
          },
          {
            "name": "e",
            "title": "E",
            "type": "`$STRING`",
            "format": "base64url",
          },
          {
            "name": "kid",
            "title": "Kid",
            "type": "`$STRING`",
          },
          {
            "name": "kty",
            "title": "Kty",
            "type": "`$STRING`",
          },
          {
            "name": "n",
            "title": "N",
            "type": "`$STRING`",
            "format": "base64url",
          },
          {
            "name": "use",
            "title": "Use",
            "type": "`$STRING`",
          },
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
                    "lit": ".well-known",
                  },
                  {
                    "lit": "jwks.json",
                  },
                ],
                "parts": [
                  ".well-known",
                  "jwks.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.keys`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "passcode": {
        "fields": [
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "short": "The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits",
          },
          {
            "name": "email_id",
            "title": "Email Id",
            "type": "`$STRING`",
            "short": "The ID of the email address",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The ID of the passcode",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The ID of the user",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "passcode",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/passcode/login/finalize",
                "segments": [
                  {
                    "lit": "passcode",
                  },
                  {
                    "lit": "login",
                  },
                  {
                    "lit": "finalize",
                  },
                ],
                "parts": [
                  "passcode",
                  "login",
                  "finalize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.id`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/passcode/login/initialize",
                "segments": [
                  {
                    "lit": "passcode",
                  },
                  {
                    "lit": "login",
                  },
                  {
                    "lit": "initialize",
                  },
                ],
                "parts": [
                  "passcode",
                  "login",
                  "initialize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.id`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "password": {
        "fields": [
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The ID of the user to create/set a password for",
          },
        ],
        "name": "password",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/password/login",
                "segments": [
                  {
                    "lit": "password",
                  },
                  {
                    "lit": "login",
                  },
                ],
                "parts": [
                  "password",
                  "login",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "password": "`reqdata`",
                  },
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "login",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/password",
                "segments": [
                  {
                    "lit": "password",
                  },
                ],
                "parts": [
                  "password",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "password": "`reqdata`",
                  },
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "saml",
                  },
                  {
                    "lit": "callback",
                  },
                ],
                "parts": [
                  "saml",
                  "callback",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "callback",
                },
              },
            ],
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
                    "lit": "saml",
                  },
                  {
                    "lit": "metadata",
                  },
                ],
                "parts": [
                  "saml",
                  "metadata",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cert_only",
                      "orig": "cert_only",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "metadata",
                  "exist": [
                    "cert_only",
                    "domain",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/saml/provider",
                "segments": [
                  {
                    "lit": "saml",
                  },
                  {
                    "lit": "provider",
                  },
                ],
                "parts": [
                  "saml",
                  "provider",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.attribute_map`",
                },
                "args": {
                  "query": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "provider",
                  "exist": [
                    "domain",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "session_management": {
        "fields": [
          {
            "name": "amr",
            "title": "Amr",
            "type": "`$ARRAY`",
            "short": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.",
          },
          {
            "name": "audience",
            "title": "Audience",
            "type": "`$ARRAY`",
            "short": "The intended audience of the token.",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$OBJECT`",
            "short": "Data about the email address associated with the token's subject, if available.",
          },
          {
            "name": "expiration",
            "title": "Expiration",
            "type": "`$STRING`",
            "req": True,
            "short": "The timestamp indicating when the token will expire.",
            "format": "date-time",
          },
          {
            "name": "issued_at",
            "title": "Issued At",
            "type": "`$STRING`",
            "short": "The timestamp indicating when the token was issued.",
            "format": "date-time",
          },
          {
            "name": "issuer",
            "title": "Issuer",
            "type": "`$STRING`",
            "short": "The entity that issued the token.",
          },
          {
            "name": "session_id",
            "title": "Session Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier for the session associated with this token.",
          },
          {
            "name": "session_token",
            "title": "Session Token",
            "type": "`$STRING`",
            "req": True,
            "short": "The session token (JWT) to validate",
            "format": "JWT",
          },
          {
            "name": "subject",
            "title": "Subject",
            "type": "`$ANY`",
            "req": True,
            "short": "The unique identifier of the token's subject.",
          },
        ],
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
                    "lit": "sessions",
                  },
                  {
                    "lit": "validate",
                  },
                ],
                "parts": [
                  "sessions",
                  "validate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.claims`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/sessions/validate",
                "segments": [
                  {
                    "lit": "sessions",
                  },
                  {
                    "lit": "validate",
                  },
                ],
                "parts": [
                  "sessions",
                  "validate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.claims`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "thirdparty",
                  },
                  {
                    "lit": "callback",
                  },
                ],
                "parts": [
                  "thirdparty",
                  "callback",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "code",
                      "orig": "code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "error",
                      "orig": "error",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "error_description",
                      "orig": "error_description",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "code",
                    "error",
                    "error_description",
                    "state",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/thirdparty/auth",
                "segments": [
                  {
                    "lit": "thirdparty",
                  },
                  {
                    "lit": "auth",
                  },
                ],
                "parts": [
                  "thirdparty",
                  "auth",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "redirect_to",
                      "orig": "redirect_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "provider",
                    "redirect_to",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "token": {
        "fields": [
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "format": "base64url",
          },
        ],
        "name": "token",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/token",
                "segments": [
                  {
                    "lit": "token",
                  },
                ],
                "parts": [
                  "token",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user_id`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Time of creation of the the user",
            "format": "date-time",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The email address of the user",
            "format": "email",
          },
          {
            "name": "email_id",
            "title": "Email Id",
            "type": "`$STRING`",
            "short": "The ID of the newly created email address",
            "format": "uuid4",
          },
          {
            "name": "emails",
            "title": "Emails",
            "type": "`$ARRAY`",
          },
          {
            "name": "family_name",
            "title": "Family Name",
            "type": "`$STRING`",
          },
          {
            "name": "given_name",
            "title": "Given Name",
            "type": "`$STRING`",
          },
          {
            "name": "has_webauthn_credential",
            "title": "Has Webauthn Credential",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The ID of the user.",
            "deprecated": True,
            "format": "uuid4",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "The public and unsafe metadata of a user",
          },
          {
            "name": "mfa_config",
            "title": "Mfa Config",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "passkeys",
            "title": "Passkeys",
            "type": "`$ARRAY`",
          },
          {
            "name": "picture",
            "title": "Picture",
            "type": "`$STRING`",
            "format": "uri",
          },
          {
            "name": "security_keys",
            "title": "Security Keys",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Time of last update of the user",
            "format": "date-time",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "short": "The ID of the user",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "short": "The username of the user",
          },
          {
            "name": "verified",
            "title": "Verified",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "webauthn_credentials",
            "title": "Webauthn Credentials",
            "type": "`$ARRAY`",
            "short": "A list of WebAuthn credentials",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "user",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/user",
                "segments": [
                  {
                    "lit": "user",
                  },
                ],
                "parts": [
                  "user",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/users",
                "segments": [
                  {
                    "lit": "users",
                  },
                ],
                "parts": [
                  "users",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/user",
                "segments": [
                  {
                    "lit": "user",
                  },
                ],
                "parts": [
                  "user",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user_management": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Time of creation of the the user",
            "format": "date-time",
          },
          {
            "name": "emails",
            "title": "Emails",
            "type": "`$ARRAY`",
          },
          {
            "name": "family_name",
            "title": "Family Name",
            "type": "`$STRING`",
          },
          {
            "name": "given_name",
            "title": "Given Name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "The ID of the user.",
            "deprecated": True,
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "The public and unsafe metadata of a user",
          },
          {
            "name": "mfa_config",
            "title": "Mfa Config",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "passkeys",
            "title": "Passkeys",
            "type": "`$ARRAY`",
          },
          {
            "name": "picture",
            "title": "Picture",
            "type": "`$STRING`",
            "format": "uri",
          },
          {
            "name": "security_keys",
            "title": "Security Keys",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Time of last update of the user",
            "format": "date-time",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "short": "The ID of the user",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$OBJECT`",
            "short": "The representation of a username of the user",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "logout",
                  },
                ],
                "parts": [
                  "logout",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "me",
                  },
                ],
                "parts": [
                  "me",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "web_authn": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "A new credential name.",
          },
          {
            "name": "rawId",
            "title": "Raw Id",
            "type": "`$STRING`",
          },
          {
            "name": "response",
            "title": "Response",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "web_authn",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/webauthn/registration/finalize",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "registration",
                  },
                  {
                    "lit": "finalize",
                  },
                ],
                "parts": [
                  "webauthn",
                  "registration",
                  "finalize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user_id`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/webauthn/credentials/{id}",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "credentials",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "webauthn",
                  "credentials",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/webauthn/credentials/{id}",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "credentials",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "webauthn",
                  "credentials",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "webauthn_login": {
        "fields": [
          {
            "name": "credential_id",
            "title": "Credential Id",
            "type": "`$STRING`",
            "format": "base64url",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "rawId",
            "title": "Raw Id",
            "type": "`$STRING`",
          },
          {
            "name": "response",
            "title": "Response",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "format": "uuid4",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "webauthn_login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/webauthn/login/finalize",
                "segments": [
                  {
                    "lit": "webauthn",
                  },
                  {
                    "lit": "login",
                  },
                  {
                    "lit": "finalize",
                  },
                ],
                "parts": [
                  "webauthn",
                  "login",
                  "finalize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
