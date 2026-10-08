"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "credential_creation_option",
        "accessor": "CredentialCreationOption",
        "op": "create",
        "method": "POST",
        "path": "/webauthn/registration/initialize",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "publicKey": {
                "rp": {
                    "name": "Hanko Authentication Service",
                    "id": "localhost"
                },
                "user": {
                    "id": "pPQT9rwJRD7gVncsnCDNyN",
                    "name": "user@example.com",
                    "displayName": "user@example.com"
                },
                "challenge": "7qmkJUXR0dOFnsW48evX3qKdCzlGjvvqAAvMDN+KTN0=",
                "pubKeyCredParams": [
                    {
                        "type": "public-key",
                        "alg": -7
                    }
                ],
                "timeout": 60000,
                "authenticatorSelection": {
                    "authenticatorAttachment": "platform",
                    "requireResidentKey": true,
                    "residentKey": "preferred",
                    "userVerification": "required"
                },
                "attestation": "none"
            }
        },
        "idField": "id"
    },
    {
        "entity": "credential_request_option",
        "accessor": "CredentialRequestOption",
        "op": "create",
        "method": "POST",
        "path": "/webauthn/login/initialize",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "publicKey": {
                "challenge": "qgOI+0KpGnl9NOqaT6dfsYvi96R87LgpErnvePeOgSU=",
                "timeout": 60000,
                "rpId": "localhost",
                "allowCredentials": [
                    {
                        "type": "public-key",
                        "id": "Mepptysj5ZZrTlg0qiLbsZ068OtQMeGVAikVy2n1hvvG..."
                    }
                ],
                "userVerification": "required"
            }
        },
        "idField": "id"
    },
    {
        "entity": "email",
        "accessor": "Email",
        "op": "create",
        "method": "POST",
        "path": "/emails/{id}/set_primary",
        "action": "set_primary",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 201,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "email",
        "accessor": "Email",
        "op": "create",
        "method": "POST",
        "path": "/emails",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 201,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "email",
        "accessor": "Email",
        "op": "list",
        "method": "GET",
        "path": "/emails",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                "address": "john.doe@example.com",
                "is_verified": true,
                "is_primary": false
            }
        ],
        "idField": "id"
    },
    {
        "entity": "email",
        "accessor": "Email",
        "op": "remove",
        "method": "DELETE",
        "path": "/emails/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 201,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "hanko_configuration",
        "accessor": "HankoConfiguration",
        "op": "load",
        "method": "GET",
        "path": "/.well-known/config",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "emails": {
                "require_verification": true
            },
            "password": {
                "enabled": true,
                "min_password_length": 8
            },
            "account": {
                "allow_deletion": true,
                "allow_signup": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "json_web_key",
        "accessor": "JsonWebKey",
        "op": "list",
        "method": "GET",
        "path": "/.well-known/jwks.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "keys": [
                {
                    "alg": "RS256",
                    "e": "AQAB",
                    "kid": "d6ff37d7-e3d1-4432-ab80-b64faf55ae36",
                    "kty": "RSA",
                    "n": "vPFRUCRoxN3RygdJHR3S5BV-DDLw6n-7oUXtX0nr7Twl...",
                    "use": "sig"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "password",
        "accessor": "Password",
        "op": "create",
        "method": "POST",
        "path": "/password/login",
        "action": "login",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "password",
        "accessor": "Password",
        "op": "update",
        "method": "PUT",
        "path": "/password",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "create",
        "method": "POST",
        "path": "/saml/callback",
        "action": "callback",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "load",
        "method": "GET",
        "path": "/saml/metadata",
        "action": "metadata",
        "args": [],
        "select": {
            "domain": "v1",
            "cert_only": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/octet-stream"
        ],
        "query": [
            "domain",
            "cert_only"
        ],
        "queryArgs": [
            {
                "name": "cert_only",
                "wire": "cert_only"
            },
            {
                "name": "domain",
                "wire": "domain"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "load",
        "method": "GET",
        "path": "/saml/provider",
        "action": "provider",
        "args": [],
        "select": {
            "domain": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "domain"
        ],
        "queryArgs": [
            {
                "name": "domain",
                "wire": "domain"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "enabled": true,
            "name": "MySamlProvier",
            "domain": "text.example",
            "metadata_url": "http://idp-metadata.url",
            "skip_email_verification": true,
            "attribute_map": {
                "name": "x",
                "family_name": "x",
                "given_name": "x",
                "middle_name": "x",
                "nickname": "x",
                "preferred_username": "x",
                "profile": "x",
                "picture": "x",
                "website": "x",
                "gender": "x",
                "birthdate": "x",
                "zone_info": "x",
                "locale": "x",
                "updated_at": "x",
                "email": "x",
                "email_verified": "x",
                "phone": "x",
                "phone_verified": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "session_management",
        "accessor": "SessionManagement",
        "op": "create",
        "method": "POST",
        "path": "/sessions/validate",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "is_valid": true,
            "expiration_time": "2026-01-01T00:00:00Z",
            "user_id": "x",
            "claims": {
                "subject": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                "issued_at": "2026-01-01T00:00:00Z",
                "expiration": "2026-01-01T00:00:00Z",
                "audience": [
                    "x"
                ],
                "issuer": "x",
                "email": {
                    "address": "x",
                    "is_primary": true,
                    "is_verified": true
                },
                "session_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                "amr": [
                    "pwd"
                ]
            },
            "idle_expires_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "session_management",
        "accessor": "SessionManagement",
        "op": "load",
        "method": "GET",
        "path": "/sessions/validate",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "is_valid": true,
            "expiration_time": "2026-01-01T00:00:00Z",
            "user_id": "x",
            "claims": {
                "subject": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                "issued_at": "2026-01-01T00:00:00Z",
                "expiration": "2026-01-01T00:00:00Z",
                "audience": [
                    "x"
                ],
                "issuer": "x",
                "email": {
                    "address": "x",
                    "is_primary": true,
                    "is_verified": true
                },
                "session_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                "amr": [
                    "pwd"
                ]
            },
            "idle_expires_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "status",
        "accessor": "Status",
        "op": "load",
        "method": "GET",
        "path": "/",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/html"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "third_party",
        "accessor": "ThirdParty",
        "op": "load",
        "method": "GET",
        "path": "/thirdparty/auth",
        "args": [],
        "select": {
            "provider": "v1",
            "redirect_to": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "provider",
            "redirect_to"
        ],
        "queryArgs": [
            {
                "name": "provider",
                "wire": "provider"
            },
            {
                "name": "redirect_to",
                "wire": "redirect_to"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "third_party",
        "accessor": "ThirdParty",
        "op": "load",
        "method": "GET",
        "path": "/thirdparty/callback",
        "args": [],
        "select": {
            "state": "v1",
            "code": "v1",
            "error": "v1",
            "error_description": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "code",
            "state",
            "error",
            "error_description"
        ],
        "queryArgs": [
            {
                "name": "code",
                "wire": "code"
            },
            {
                "name": "error",
                "wire": "error"
            },
            {
                "name": "error_description",
                "wire": "error_description"
            },
            {
                "name": "state",
                "wire": "state"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "token",
        "accessor": "Token",
        "op": "create",
        "method": "POST",
        "path": "/token",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "user_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/users/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
            "user_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
            "emails": [
                {
                    "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                    "address": "john.doe@example.com",
                    "is_verified": true,
                    "is_primary": false
                }
            ],
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "passkeys": [
                {
                    "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                    "name": "iCloud",
                    "public_key": "pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "01020304-0506-0708-0102-030405060708",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "internal"
                    ],
                    "backup_eligible": true,
                    "backup_state": true,
                    "mfa_only": false
                }
            ],
            "security_keys": [
                {
                    "id": "f826013e-e7e3-4366-a6d8-9359effc8cdd",
                    "name": "Yubikey Bio",
                    "public_key": "aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "90636e1f-ef82-43bf-bdcf-5255f139d12f",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "usb"
                    ],
                    "backup_eligible": true,
                    "backup_state": false,
                    "mfa_only": true
                }
            ],
            "metadata": {
                "public_metadata": {
                    "role": "admin"
                },
                "unsafe_metadata": {
                    "birthday": "2025-05-12"
                }
            },
            "name": "x",
            "given_name": "x",
            "family_name": "x",
            "picture": "x",
            "mfa_config": {
                "auth_app_set_up": true,
                "totp_enabled": true,
                "security_key_enabled": true
            },
            "email": "x",
            "username": "x",
            "webauthn_credentials": [
                {
                    "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                    "name": "iCloud",
                    "public_key": "pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "01020304-0506-0708-0102-030405060708",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "internal"
                    ],
                    "backup_eligible": true,
                    "backup_state": true,
                    "mfa_only": false
                },
                {
                    "id": "f826013e-e7e3-4366-a6d8-9359effc8cdd",
                    "name": "Yubikey Bio",
                    "public_key": "aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "90636e1f-ef82-43bf-bdcf-5255f139d12f",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "usb"
                    ],
                    "backup_eligible": true,
                    "backup_state": false,
                    "mfa_only": true
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "remove",
        "method": "DELETE",
        "path": "/user",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "user_management",
        "accessor": "UserManagement",
        "op": "create",
        "method": "POST",
        "path": "/logout",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "user_management",
        "accessor": "UserManagement",
        "op": "list",
        "method": "GET",
        "path": "/me",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
            "user_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
            "emails": [
                {
                    "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                    "address": "john.doe@example.com",
                    "is_verified": true,
                    "is_primary": false
                }
            ],
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "passkeys": [
                {
                    "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                    "name": "iCloud",
                    "public_key": "pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "01020304-0506-0708-0102-030405060708",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "internal"
                    ],
                    "backup_eligible": true,
                    "backup_state": true,
                    "mfa_only": false
                }
            ],
            "security_keys": [
                {
                    "id": "f826013e-e7e3-4366-a6d8-9359effc8cdd",
                    "name": "Yubikey Bio",
                    "public_key": "aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...",
                    "attestation_type": "packed",
                    "aaguid": "90636e1f-ef82-43bf-bdcf-5255f139d12f",
                    "last_used_at": "2026-02-24T21:40:36.26936Z",
                    "created_at": "2026-02-24T21:40:36.26936Z",
                    "transports": [
                        "usb"
                    ],
                    "backup_eligible": true,
                    "backup_state": false,
                    "mfa_only": true
                }
            ],
            "metadata": {
                "public_metadata": {
                    "role": "admin"
                },
                "unsafe_metadata": {
                    "birthday": "2025-05-12"
                }
            },
            "name": "x",
            "given_name": "x",
            "family_name": "x",
            "picture": "x",
            "mfa_config": {
                "auth_app_set_up": true,
                "totp_enabled": true,
                "security_key_enabled": true
            },
            "username": {
                "id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "username": "john_doe"
            }
        },
        "idField": "id"
    },
    {
        "entity": "web_authn",
        "accessor": "WebAuthn",
        "op": "create",
        "method": "POST",
        "path": "/webauthn/registration/finalize",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "credential_id": "x",
            "user_id": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
        },
        "idField": "id"
    },
    {
        "entity": "web_authn",
        "accessor": "WebAuthn",
        "op": "list",
        "method": "GET",
        "path": "/webauthn/credentials",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "5333cc5b-c7c4-48cf-8248-9c184ac72b65",
                "name": "iCloud",
                "public_key": "pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...",
                "attestation_type": "packed",
                "aaguid": "01020304-0506-0708-0102-030405060708",
                "last_used_at": "2026-02-24T21:40:36.26936Z",
                "created_at": "2026-02-24T21:40:36.26936Z",
                "transports": [
                    "internal"
                ],
                "backup_eligible": true,
                "backup_state": true,
                "mfa_only": false
            },
            {
                "id": "f826013e-e7e3-4366-a6d8-9359effc8cdd",
                "name": "Yubikey Bio",
                "public_key": "aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...",
                "attestation_type": "packed",
                "aaguid": "90636e1f-ef82-43bf-bdcf-5255f139d12f",
                "last_used_at": "2026-02-24T21:40:36.26936Z",
                "created_at": "2026-02-24T21:40:36.26936Z",
                "transports": [
                    "usb"
                ],
                "backup_eligible": true,
                "backup_state": false,
                "mfa_only": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "web_authn",
        "accessor": "WebAuthn",
        "op": "remove",
        "method": "DELETE",
        "path": "/webauthn/credentials/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 201,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "web_authn",
        "accessor": "WebAuthn",
        "op": "update",
        "method": "PATCH",
        "path": "/webauthn/credentials/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "cookie",
                    "name": "hanko"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "webauthn_login",
        "accessor": "WebauthnLogin",
        "op": "create",
        "method": "POST",
        "path": "/webauthn/login/finalize",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "credential_id": "x",
            "user_id": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map