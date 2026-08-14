# HankoPublic SDK configuration

module HankoPublicConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "HankoPublic",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://{tenant_id}.hanko.io",
        "server" => {
          "tenant_id" => "",
        },
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "create_user_response_object" => {},
          "credential" => {},
          "credential_creation_option" => {},
          "credential_request_option" => {},
          "email" => {},
          "email_management" => {},
          "hanko_configuration" => {},
          "json_web_key_set" => {},
          "passcode" => {},
          "password" => {},
          "saml" => {},
          "session_management" => {},
          "status" => {},
          "third_party" => {},
          "token" => {},
          "user" => {},
          "user_management" => {},
          "web_authn" => {},
          "webauthn_login" => {},
        },
      },
      "entity" => {
        "create_user_response_object" => {
          "fields" => [],
          "name" => "create_user_response_object",
          "op" => {},
          "relations" => {
            "ancestors" => [],
          },
        },
        "credential" => {
          "fields" => [
            {
              "name" => "aaguid",
              "type" => "`$STRING`",
            },
            {
              "name" => "attestation_type",
              "type" => "`$STRING`",
            },
            {
              "name" => "backup_eligible",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "backup_state",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "last_used_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "mfa_only",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "publickey",
              "type" => "`$STRING`",
            },
            {
              "name" => "transports",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "credential",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/webauthn/credentials",
                  "parts" => [
                    "webauthn",
                    "credentials",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "credential_creation_option" => {
          "fields" => [
            {
              "name" => "attestation",
              "type" => "`$STRING`",
            },
            {
              "name" => "authenticatorSelection",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "challenge",
              "type" => "`$STRING`",
            },
            {
              "name" => "pubKeyCredParams",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "rp",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "timeout",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "user",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "credential_creation_option",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/webauthn/registration/initialize",
                  "parts" => [
                    "webauthn",
                    "registration",
                    "initialize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.publicKey`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "credential_request_option" => {
          "fields" => [
            {
              "name" => "allowCredentials",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "challenge",
              "type" => "`$STRING`",
            },
            {
              "name" => "rpId",
              "type" => "`$STRING`",
            },
            {
              "name" => "timeout",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "userVerification",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "type" => "`$STRING`",
            },
          ],
          "name" => "credential_request_option",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/webauthn/login/initialize",
                  "parts" => [
                    "webauthn",
                    "login",
                    "initialize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.publicKey`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email" => {
          "fields" => [
            {
              "name" => "address",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "identities",
              "type" => "`$ANY`",
            },
            {
              "name" => "identity",
              "type" => "`$ANY`",
            },
            {
              "name" => "is_primary",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_verified",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "email",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/emails",
                  "parts" => [
                    "emails",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/emails",
                  "parts" => [
                    "emails",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/emails/{id}",
                  "parts" => [
                    "emails",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email_management" => {
          "fields" => [],
          "name" => "email_management",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/emails/{id}/set_primary",
                  "parts" => [
                    "emails",
                    "{id}",
                    "set_primary",
                  ],
                  "select" => {
                    "$action" => "set_primary",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "hanko_configuration" => {
          "fields" => [
            {
              "name" => "account",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "emails",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "password",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "hanko_configuration",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/.well-known/config",
                  "parts" => [
                    ".well-known",
                    "config",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "json_web_key_set" => {
          "fields" => [
            {
              "name" => "alg",
              "type" => "`$STRING`",
            },
            {
              "name" => "e",
              "type" => "`$STRING`",
            },
            {
              "name" => "kid",
              "type" => "`$STRING`",
            },
            {
              "name" => "kty",
              "type" => "`$STRING`",
            },
            {
              "name" => "n",
              "type" => "`$STRING`",
            },
            {
              "name" => "use",
              "type" => "`$STRING`",
            },
          ],
          "name" => "json_web_key_set",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/.well-known/jwks.json",
                  "parts" => [
                    ".well-known",
                    "jwks.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.keys`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "passcode" => {
          "fields" => [
            {
              "name" => "code",
              "type" => "`$STRING`",
            },
            {
              "name" => "email_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "passcode",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/passcode/login/finalize",
                  "parts" => [
                    "passcode",
                    "login",
                    "finalize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.id`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/passcode/login/initialize",
                  "parts" => [
                    "passcode",
                    "login",
                    "initialize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.id`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "password" => {
          "fields" => [
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "password",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/password/login",
                  "parts" => [
                    "password",
                    "login",
                  ],
                  "select" => {
                    "$action" => "login",
                  },
                  "transform" => {
                    "req" => {
                      "password" => "`reqdata`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/password",
                  "parts" => [
                    "password",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "password" => "`reqdata`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "saml" => {
          "fields" => [
            {
              "name" => "birthdate",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "email_verified",
              "type" => "`$STRING`",
            },
            {
              "name" => "family_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "gender",
              "type" => "`$STRING`",
            },
            {
              "name" => "given_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "locale",
              "type" => "`$STRING`",
            },
            {
              "name" => "middle_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nickname",
              "type" => "`$STRING`",
            },
            {
              "name" => "phone",
              "type" => "`$STRING`",
            },
            {
              "name" => "phone_verified",
              "type" => "`$STRING`",
            },
            {
              "name" => "picture",
              "type" => "`$STRING`",
            },
            {
              "name" => "preferred_username",
              "type" => "`$STRING`",
            },
            {
              "name" => "profile",
              "type" => "`$STRING`",
            },
            {
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "website",
              "type" => "`$STRING`",
            },
            {
              "name" => "zone_info",
              "type" => "`$STRING`",
            },
          ],
          "name" => "saml",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/saml/callback",
                  "parts" => [
                    "saml",
                    "callback",
                  ],
                  "select" => {
                    "$action" => "callback",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cert_only",
                        "orig" => "cert_only",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "domain",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/saml/metadata",
                  "parts" => [
                    "saml",
                    "metadata",
                  ],
                  "select" => {
                    "$action" => "metadata",
                    "exist" => [
                      "cert_only",
                      "domain",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "domain",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/saml/provider",
                  "parts" => [
                    "saml",
                    "provider",
                  ],
                  "select" => {
                    "$action" => "provider",
                    "exist" => [
                      "domain",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.attribute_map`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "session_management" => {
          "fields" => [
            {
              "name" => "amr",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "audience",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "email",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "expiration",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "issued_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "issuer",
              "type" => "`$STRING`",
            },
            {
              "name" => "session_id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "session_token",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "req" => true,
              "type" => "`$ANY`",
            },
          ],
          "name" => "session_management",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/sessions/validate",
                  "parts" => [
                    "sessions",
                    "validate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.claims`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sessions/validate",
                  "parts" => [
                    "sessions",
                    "validate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.claims`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "status" => {
          "fields" => [],
          "name" => "status",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "third_party" => {
          "fields" => [],
          "name" => "third_party",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "code",
                        "orig" => "code",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "error",
                        "orig" => "error",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "error_description",
                        "orig" => "error_description",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/thirdparty/callback",
                  "parts" => [
                    "thirdparty",
                    "callback",
                  ],
                  "select" => {
                    "exist" => [
                      "code",
                      "error",
                      "error_description",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "provider",
                        "orig" => "provider",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "redirect_to",
                        "orig" => "redirect_to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/thirdparty/auth",
                  "parts" => [
                    "thirdparty",
                    "auth",
                  ],
                  "select" => {
                    "exist" => [
                      "provider",
                      "redirect_to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "token" => {
          "fields" => [
            {
              "name" => "value",
              "type" => "`$STRING`",
            },
          ],
          "name" => "token",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/token",
                  "parts" => [
                    "token",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user_id`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
            {
              "name" => "email_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "emails",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "family_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "given_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "has_webauthn_credential",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mfa_config",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "passkeys",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "picture",
              "type" => "`$STRING`",
            },
            {
              "name" => "security_keys",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "username",
              "type" => "`$STRING`",
            },
            {
              "name" => "verified",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "webauthn_credentials",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "user",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/user",
                  "parts" => [
                    "user",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/users",
                  "parts" => [
                    "users",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/users/{id}",
                  "parts" => [
                    "users",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/user",
                  "parts" => [
                    "user",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user_management" => {
          "fields" => [
            {
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "emails",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "family_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "given_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mfa_config",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "passkeys",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "picture",
              "type" => "`$STRING`",
            },
            {
              "name" => "security_keys",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "username",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "user_management",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/logout",
                  "parts" => [
                    "logout",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/me",
                  "parts" => [
                    "me",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "web_authn" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawId",
              "type" => "`$STRING`",
            },
            {
              "name" => "response",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "web_authn",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/webauthn/registration/finalize",
                  "parts" => [
                    "webauthn",
                    "registration",
                    "finalize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user_id`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/webauthn/credentials/{id}",
                  "parts" => [
                    "webauthn",
                    "credentials",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/webauthn/credentials/{id}",
                  "parts" => [
                    "webauthn",
                    "credentials",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "webauthn_login" => {
          "fields" => [
            {
              "name" => "credential_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "rawId",
              "type" => "`$STRING`",
            },
            {
              "name" => "response",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_id",
              "type" => "`$STRING`",
            },
          ],
          "name" => "webauthn_login",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/webauthn/login/finalize",
                  "parts" => [
                    "webauthn",
                    "login",
                    "finalize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    HankoPublicFeatures.make_feature(name)
  end
end
