# HankoPublic SDK configuration


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
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://{tenant_id}.hanko.io",
            "server": {
                "tenant_id": "",
            },
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "create_user_response_object": {},
                "credential": {},
                "credential_creation_option": {},
                "credential_request_option": {},
                "email": {},
                "email_management": {},
                "hanko_configuration": {},
                "json_web_key_set": {},
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
      "create_user_response_object": {
        "fields": [],
        "name": "create_user_response_object",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "credential": {
        "fields": [
          {
            "name": "aaguid",
            "type": "`$STRING`",
          },
          {
            "name": "attestation_type",
            "type": "`$STRING`",
          },
          {
            "name": "backup_eligible",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "backup_state",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "last_used_at",
            "type": "`$STRING`",
          },
          {
            "name": "mfa_only",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "publickey",
            "type": "`$STRING`",
          },
          {
            "name": "transports",
            "type": "`$ARRAY`",
          },
        ],
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
                "parts": [
                  "webauthn",
                  "credentials",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "authenticatorSelection",
            "type": "`$OBJECT`",
          },
          {
            "name": "challenge",
            "type": "`$STRING`",
          },
          {
            "name": "pubKeyCredParams",
            "type": "`$ARRAY`",
          },
          {
            "name": "rp",
            "type": "`$OBJECT`",
          },
          {
            "name": "timeout",
            "type": "`$INTEGER`",
          },
          {
            "name": "user",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/webauthn/registration/initialize",
                "parts": [
                  "webauthn",
                  "registration",
                  "initialize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.publicKey`",
                },
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
            "type": "`$ARRAY`",
          },
          {
            "name": "challenge",
            "type": "`$STRING`",
          },
          {
            "name": "rpId",
            "type": "`$STRING`",
          },
          {
            "name": "timeout",
            "type": "`$INTEGER`",
          },
          {
            "name": "userVerification",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "short": "The ID of the user on whose behalf WebAuthn login should be performed",
            "type": "`$STRING`",
          },
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
                "parts": [
                  "webauthn",
                  "login",
                  "initialize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.publicKey`",
                },
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
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "The email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the email address",
            "type": "`$STRING`",
          },
          {
            "name": "identities",
            "type": "`$ANY`",
          },
          {
            "name": "identity",
            "type": "`$ANY`",
          },
          {
            "name": "is_primary",
            "short": "Indicates it's the primary email address.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_verified",
            "short": "Indicated the email has been verified.",
            "type": "`$BOOLEAN`",
          },
        ],
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
                "parts": [
                  "emails",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "emails",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/emails/{id}",
                "parts": [
                  "emails",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_management": {
        "fields": [],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/emails/{id}/set_primary",
                "parts": [
                  "emails",
                  "{id}",
                  "set_primary",
                ],
                "select": {
                  "$action": "set_primary",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "short": "Controls the behavior regarding user account.",
            "type": "`$OBJECT`",
          },
          {
            "name": "emails",
            "short": "Controls the behavior regarding email addresses.",
            "type": "`$OBJECT`",
          },
          {
            "name": "password",
            "short": "Configuration options concerning passwords",
            "type": "`$OBJECT`",
          },
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
                "parts": [
                  ".well-known",
                  "config",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "json_web_key_set": {
        "fields": [
          {
            "name": "alg",
            "type": "`$STRING`",
          },
          {
            "name": "e",
            "type": "`$STRING`",
          },
          {
            "name": "kid",
            "type": "`$STRING`",
          },
          {
            "name": "kty",
            "type": "`$STRING`",
          },
          {
            "name": "n",
            "type": "`$STRING`",
          },
          {
            "name": "use",
            "type": "`$STRING`",
          },
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
                "parts": [
                  ".well-known",
                  "jwks.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.keys`",
                },
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
            "short": "The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits",
            "type": "`$STRING`",
          },
          {
            "name": "email_id",
            "short": "The ID of the email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the passcode",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "req": True,
            "short": "The ID of the user",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "passcode",
                  "login",
                  "finalize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.id`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/passcode/login/initialize",
                "parts": [
                  "passcode",
                  "login",
                  "initialize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.id`",
                },
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
            "req": True,
            "short": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "req": True,
            "short": "The ID of the user to perform a password login for",
            "type": "`$STRING`",
          },
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
                "parts": [
                  "password",
                  "login",
                ],
                "select": {
                  "$action": "login",
                },
                "transform": {
                  "req": {
                    "password": "`reqdata`",
                  },
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "password",
                ],
                "select": {},
                "transform": {
                  "req": {
                    "password": "`reqdata`",
                  },
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "saml": {
        "fields": [
          {
            "name": "birthdate",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "email_verified",
            "type": "`$STRING`",
          },
          {
            "name": "family_name",
            "type": "`$STRING`",
          },
          {
            "name": "gender",
            "type": "`$STRING`",
          },
          {
            "name": "given_name",
            "type": "`$STRING`",
          },
          {
            "name": "locale",
            "type": "`$STRING`",
          },
          {
            "name": "middle_name",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "nickname",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "phone_verified",
            "type": "`$STRING`",
          },
          {
            "name": "picture",
            "type": "`$STRING`",
          },
          {
            "name": "preferred_username",
            "type": "`$STRING`",
          },
          {
            "name": "profile",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "website",
            "type": "`$STRING`",
          },
          {
            "name": "zone_info",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "saml",
                  "callback",
                ],
                "select": {
                  "$action": "callback",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "domain",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/saml/metadata",
                "parts": [
                  "saml",
                  "metadata",
                ],
                "select": {
                  "$action": "metadata",
                  "exist": [
                    "cert_only",
                    "domain",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "domain",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/saml/provider",
                "parts": [
                  "saml",
                  "provider",
                ],
                "select": {
                  "$action": "provider",
                  "exist": [
                    "domain",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.attribute_map`",
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
            "short": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.",
            "type": "`$ARRAY`",
          },
          {
            "name": "audience",
            "short": "The intended audience of the token.",
            "type": "`$ARRAY`",
          },
          {
            "name": "email",
            "short": "Data about the email address associated with the token's subject, if available.",
            "type": "`$OBJECT`",
          },
          {
            "name": "expiration",
            "req": True,
            "short": "The timestamp indicating when the token will expire.",
            "type": "`$STRING`",
          },
          {
            "name": "issued_at",
            "short": "The timestamp indicating when the token was issued.",
            "type": "`$STRING`",
          },
          {
            "name": "issuer",
            "short": "The entity that issued the token.",
            "type": "`$STRING`",
          },
          {
            "name": "session_id",
            "req": True,
            "short": "The unique identifier for the session associated with this token.",
            "type": "`$STRING`",
          },
          {
            "name": "session_token",
            "req": True,
            "short": "The session token (JWT) to validate",
            "type": "`$STRING`",
          },
          {
            "name": "subject",
            "req": True,
            "short": "The unique identifier of the token's subject.",
            "type": "`$ANY`",
          },
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
                "parts": [
                  "sessions",
                  "validate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.claims`",
                },
              },
            ],
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
                "parts": [
                  "sessions",
                  "validate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.claims`",
                },
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "code",
                      "orig": "code",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "error",
                      "orig": "error",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "error_description",
                      "orig": "error_description",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "state",
                      "orig": "state",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/thirdparty/callback",
                "parts": [
                  "thirdparty",
                  "callback",
                ],
                "select": {
                  "exist": [
                    "code",
                    "error",
                    "error_description",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "provider",
                      "orig": "provider",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "redirect_to",
                      "orig": "redirect_to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/thirdparty/auth",
                "parts": [
                  "thirdparty",
                  "auth",
                ],
                "select": {
                  "exist": [
                    "provider",
                    "redirect_to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
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
                "parts": [
                  "token",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user_id`",
                },
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
            "short": "Time of creation of the the user",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The email address of the user",
            "type": "`$STRING`",
          },
          {
            "name": "email_id",
            "short": "The ID of the newly created email address",
            "type": "`$STRING`",
          },
          {
            "name": "emails",
            "type": "`$ARRAY`",
          },
          {
            "name": "family_name",
            "type": "`$STRING`",
          },
          {
            "name": "given_name",
            "type": "`$STRING`",
          },
          {
            "name": "has_webauthn_credential",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "short": "The ID of the user.",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "short": "The public and unsafe metadata of a user",
            "type": "`$OBJECT`",
          },
          {
            "name": "mfa_config",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "passkeys",
            "type": "`$ARRAY`",
          },
          {
            "name": "picture",
            "type": "`$STRING`",
          },
          {
            "name": "security_keys",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "short": "Time of last update of the user",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "short": "The ID of the user",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "short": "The username of the user",
            "type": "`$STRING`",
          },
          {
            "name": "verified",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "webauthn_credentials",
            "short": "A list of WebAuthn credentials",
            "type": "`$ARRAY`",
          },
        ],
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
                "parts": [
                  "user",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/users",
                "parts": [
                  "users",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{id}",
                "parts": [
                  "users",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "user",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "short": "Time of creation of the the user",
            "type": "`$STRING`",
          },
          {
            "name": "emails",
            "type": "`$ARRAY`",
          },
          {
            "name": "family_name",
            "type": "`$STRING`",
          },
          {
            "name": "given_name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the user.",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "short": "The public and unsafe metadata of a user",
            "type": "`$OBJECT`",
          },
          {
            "name": "mfa_config",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "passkeys",
            "type": "`$ARRAY`",
          },
          {
            "name": "picture",
            "type": "`$STRING`",
          },
          {
            "name": "security_keys",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "short": "Time of last update of the user",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "short": "The ID of the user",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "short": "The representation of a username of the user",
            "type": "`$OBJECT`",
          },
        ],
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
                "parts": [
                  "logout",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "A new credential name.",
            "type": "`$STRING`",
          },
          {
            "name": "rawId",
            "type": "`$STRING`",
          },
          {
            "name": "response",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "webauthn",
                  "registration",
                  "finalize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user_id`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/webauthn/credentials/{id}",
                "parts": [
                  "webauthn",
                  "credentials",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/webauthn/credentials/{id}",
                "parts": [
                  "webauthn",
                  "credentials",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "rawId",
            "type": "`$STRING`",
          },
          {
            "name": "response",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "webauthn",
                  "login",
                  "finalize",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
