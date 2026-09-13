package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HankoPublic",
			"slug": "hanko-public",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://{tenant_id}.hanko.io",
			"server": map[string]any{
				"tenant_id": "",
			},
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"create_user_response_object": map[string]any{},
				"credential": map[string]any{},
				"credential_creation_option": map[string]any{},
				"credential_request_option": map[string]any{},
				"email": map[string]any{},
				"email_management": map[string]any{},
				"hanko_configuration": map[string]any{},
				"json_web_key_set": map[string]any{},
				"passcode": map[string]any{},
				"password": map[string]any{},
				"saml": map[string]any{},
				"session_management": map[string]any{},
				"status": map[string]any{},
				"third_party": map[string]any{},
				"token": map[string]any{},
				"user": map[string]any{},
				"user_management": map[string]any{},
				"web_authn": map[string]any{},
				"webauthn_login": map[string]any{},
			},
		},
		"entity": map[string]any{
			"create_user_response_object": map[string]any{
				"fields": []any{},
				"name": "create_user_response_object",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credential": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "uuid",
						"name": "aaguid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "attestation_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "backup_eligible",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "backup_state",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "last_used_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mfa_only",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "publickey",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transports",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "credential",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/webauthn/credentials",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "credentials",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webauthn",
									"credentials",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credential_creation_option": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attestation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authenticatorSelection",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "base64url",
						"name": "challenge",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pubKeyCredParams",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rp",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "int64",
						"name": "timeout",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
				},
				"name": "credential_creation_option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webauthn/registration/initialize",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "registration",
									},
									map[string]any{
										"lit": "initialize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.publicKey`",
								},
								"parts": []any{
									"webauthn",
									"registration",
									"initialize",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credential_request_option": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "allowCredentials",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "base64url",
						"name": "challenge",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rpId",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int64",
						"name": "timeout",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "userVerification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"short": "The ID of the user on whose behalf WebAuthn login should be performed",
						"type": "`$STRING`",
					},
				},
				"name": "credential_request_option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webauthn/login/initialize",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "login",
									},
									map[string]any{
										"lit": "initialize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.publicKey`",
								},
								"parts": []any{
									"webauthn",
									"login",
									"initialize",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "email",
						"name": "address",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "The email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identities",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "identity",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "is_primary",
						"short": "Indicates it's the primary email address.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_verified",
						"short": "Indicated the email has been verified.",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "email",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/emails",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"emails",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/emails",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"emails",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/emails/{id}",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"emails",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_management": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "email_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/emails/{id}/set_primary",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "set_primary",
									},
								},
								"select": map[string]any{
									"$action": "set_primary",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"emails",
									"{id}",
									"set_primary",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hanko_configuration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account",
						"short": "Controls the behavior regarding user account.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "emails",
						"short": "Controls the behavior regarding email addresses.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "password",
						"short": "Configuration options concerning passwords",
						"type": "`$OBJECT`",
					},
				},
				"name": "hanko_configuration",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/.well-known/config",
								"segments": []any{
									map[string]any{
										"lit": ".well-known",
									},
									map[string]any{
										"lit": "config",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									".well-known",
									"config",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"json_web_key_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alg",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "base64url",
						"name": "e",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kty",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "base64url",
						"name": "n",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "use",
						"type": "`$STRING`",
					},
				},
				"name": "json_web_key_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/.well-known/jwks.json",
								"segments": []any{
									map[string]any{
										"lit": ".well-known",
									},
									map[string]any{
										"lit": "jwks.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.keys`",
								},
								"parts": []any{
									".well-known",
									"jwks.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"passcode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"short": "The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email_id",
						"short": "The ID of the email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the passcode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"req": true,
						"short": "The ID of the user",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "passcode",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/passcode/login/finalize",
								"segments": []any{
									map[string]any{
										"lit": "passcode",
									},
									map[string]any{
										"lit": "login",
									},
									map[string]any{
										"lit": "finalize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.id`",
								},
								"parts": []any{
									"passcode",
									"login",
									"finalize",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/passcode/login/initialize",
								"segments": []any{
									map[string]any{
										"lit": "passcode",
									},
									map[string]any{
										"lit": "login",
									},
									map[string]any{
										"lit": "initialize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.id`",
								},
								"parts": []any{
									"passcode",
									"login",
									"initialize",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"password": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "password",
						"req": true,
						"short": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"req": true,
						"short": "The ID of the user to perform a password login for",
						"type": "`$STRING`",
					},
				},
				"name": "password",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/password/login",
								"segments": []any{
									map[string]any{
										"lit": "password",
									},
									map[string]any{
										"lit": "login",
									},
								},
								"select": map[string]any{
									"$action": "login",
								},
								"transform": map[string]any{
									"req": map[string]any{
										"password": "`reqdata`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"password",
									"login",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "PUT",
								"orig": "/password",
								"segments": []any{
									map[string]any{
										"lit": "password",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"password": "`reqdata`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"password",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"saml": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "birthdate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email_verified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "family_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "given_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "middle_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nickname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone_verified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "picture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "preferred_username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "profile",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zone_info",
						"type": "`$STRING`",
					},
				},
				"name": "saml",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/saml/callback",
								"segments": []any{
									map[string]any{
										"lit": "saml",
									},
									map[string]any{
										"lit": "callback",
									},
								},
								"select": map[string]any{
									"$action": "callback",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"saml",
									"callback",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cert_only",
											"orig": "cert_only",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/saml/metadata",
								"segments": []any{
									map[string]any{
										"lit": "saml",
									},
									map[string]any{
										"lit": "metadata",
									},
								},
								"select": map[string]any{
									"$action": "metadata",
									"exist": []any{
										"cert_only",
										"domain",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"saml",
									"metadata",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/saml/provider",
								"segments": []any{
									map[string]any{
										"lit": "saml",
									},
									map[string]any{
										"lit": "provider",
									},
								},
								"select": map[string]any{
									"$action": "provider",
									"exist": []any{
										"domain",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.attribute_map`",
								},
								"parts": []any{
									"saml",
									"provider",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"session_management": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amr",
						"short": "Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "audience",
						"short": "The intended audience of the token.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "email",
						"short": "Data about the email address associated with the token's subject, if available.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiration",
						"req": true,
						"short": "The timestamp indicating when the token will expire.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "issued_at",
						"short": "The timestamp indicating when the token was issued.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issuer",
						"short": "The entity that issued the token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "session_id",
						"req": true,
						"short": "The unique identifier for the session associated with this token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "JWT",
						"name": "session_token",
						"req": true,
						"short": "The session token (JWT) to validate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"req": true,
						"short": "The unique identifier of the token's subject.",
						"type": "`$ANY`",
					},
				},
				"name": "session_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/sessions/validate",
								"segments": []any{
									map[string]any{
										"lit": "sessions",
									},
									map[string]any{
										"lit": "validate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.claims`",
								},
								"parts": []any{
									"sessions",
									"validate",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/sessions/validate",
								"segments": []any{
									map[string]any{
										"lit": "sessions",
									},
									map[string]any{
										"lit": "validate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.claims`",
								},
								"parts": []any{
									"sessions",
									"validate",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"status": map[string]any{
				"fields": []any{},
				"name": "status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"third_party": map[string]any{
				"fields": []any{},
				"name": "third_party",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "code",
											"orig": "code",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "error",
											"orig": "error",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "error_description",
											"orig": "error_description",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/thirdparty/callback",
								"segments": []any{
									map[string]any{
										"lit": "thirdparty",
									},
									map[string]any{
										"lit": "callback",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"code",
										"error",
										"error_description",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"thirdparty",
									"callback",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "provider",
											"orig": "provider",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "redirect_to",
											"orig": "redirect_to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/thirdparty/auth",
								"segments": []any{
									map[string]any{
										"lit": "thirdparty",
									},
									map[string]any{
										"lit": "auth",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"provider",
										"redirect_to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"thirdparty",
									"auth",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"token": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "base64url",
						"name": "value",
						"type": "`$STRING`",
					},
				},
				"name": "token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/token",
								"segments": []any{
									map[string]any{
										"lit": "token",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user_id`",
								},
								"parts": []any{
									"token",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Time of creation of the the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The email address of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid4",
						"name": "email_id",
						"short": "The ID of the newly created email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "emails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "family_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "given_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_webauthn_credential",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"deprecated": true,
						"format": "uuid4",
						"name": "id",
						"short": "The ID of the user.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"short": "The public and unsafe metadata of a user",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mfa_config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passkeys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "picture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "security_keys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"short": "Time of last update of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"short": "The ID of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"short": "The username of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "webauthn_credentials",
						"short": "A list of WebAuthn credentials",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"user",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/users",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{id}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "DELETE",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"user",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_management": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Time of creation of the the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "emails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "family_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "given_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"deprecated": true,
						"name": "id",
						"short": "The ID of the user.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"short": "The public and unsafe metadata of a user",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mfa_config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passkeys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "picture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "security_keys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"short": "Time of last update of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"short": "The ID of the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"short": "The representation of a username of the user",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/logout",
								"segments": []any{
									map[string]any{
										"lit": "logout",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"logout",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/me",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"web_authn": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "A new credential name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "web_authn",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webauthn/registration/finalize",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "registration",
									},
									map[string]any{
										"lit": "finalize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user_id`",
								},
								"parts": []any{
									"webauthn",
									"registration",
									"finalize",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/webauthn/credentials/{id}",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "credentials",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webauthn",
									"credentials",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/webauthn/credentials/{id}",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "credentials",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webauthn",
									"credentials",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webauthn_login": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "base64url",
						"name": "credential_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid4",
						"name": "user_id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webauthn_login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webauthn/login/finalize",
								"segments": []any{
									map[string]any{
										"lit": "webauthn",
									},
									map[string]any{
										"lit": "login",
									},
									map[string]any{
										"lit": "finalize",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webauthn",
									"login",
									"finalize",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
