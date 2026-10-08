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
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://{tenant_id}.hanko.io",
			"server": map[string]any{
				"tenant_id": "",
			},
			"auth": map[string]any{
				"prefix": "",
				"in": "cookie",
				"name": "hanko",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"credential_creation_option": map[string]any{},
				"credential_request_option": map[string]any{},
				"email": map[string]any{},
				"hanko_configuration": map[string]any{},
				"json_web_key": map[string]any{},
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
			"credential_creation_option": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attestation",
						"title": "Attestation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authenticatorSelection",
						"title": "Authenticator Selection",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "challenge",
						"title": "Challenge",
						"type": "`$STRING`",
						"format": "base64url",
					},
					map[string]any{
						"name": "pubKeyCredParams",
						"title": "Pub Key Cred Params",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rp",
						"title": "Rp",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timeout",
						"title": "Timeout",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "user",
						"title": "User",
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
								"parts": []any{
									"webauthn",
									"registration",
									"initialize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.publicKey`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Allow Credentials",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "challenge",
						"title": "Challenge",
						"type": "`$STRING`",
						"format": "base64url",
					},
					map[string]any{
						"name": "rpId",
						"title": "Rp Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeout",
						"title": "Timeout",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "userVerification",
						"title": "User Verification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user on whose behalf WebAuthn login should be performed",
						"format": "uuid4",
					},
				},
				"name": "credential_request_option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webauthn",
									"login",
									"initialize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.publicKey`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The email address",
						"format": "email",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The ID of the email address",
						"format": "uuid4",
					},
					map[string]any{
						"name": "identities",
						"title": "Identities",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "identity",
						"title": "Identity",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "is_primary",
						"title": "Is Primary",
						"type": "`$BOOLEAN`",
						"short": "Indicates it's the primary email address.",
					},
					map[string]any{
						"name": "is_verified",
						"title": "Is Verified",
						"type": "`$BOOLEAN`",
						"short": "Indicated the email has been verified.",
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
								"parts": []any{
									"emails",
									"{id}",
									"set_primary",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
										},
									},
								},
								"select": map[string]any{
									"$action": "set_primary",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/emails",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
								},
								"parts": []any{
									"emails",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/emails",
								"segments": []any{
									map[string]any{
										"lit": "emails",
									},
								},
								"parts": []any{
									"emails",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"emails",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Account",
						"type": "`$OBJECT`",
						"short": "Controls the behavior regarding user account.",
					},
					map[string]any{
						"name": "emails",
						"title": "Emails",
						"type": "`$OBJECT`",
						"short": "Controls the behavior regarding email addresses.",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$OBJECT`",
						"short": "Configuration options concerning passwords",
					},
				},
				"name": "hanko_configuration",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									".well-known",
									"config",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"json_web_key": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alg",
						"title": "Alg",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "e",
						"title": "E",
						"type": "`$STRING`",
						"format": "base64url",
					},
					map[string]any{
						"name": "kid",
						"title": "Kid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kty",
						"title": "Kty",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "n",
						"title": "N",
						"type": "`$STRING`",
						"format": "base64url",
					},
					map[string]any{
						"name": "use",
						"title": "Use",
						"type": "`$STRING`",
					},
				},
				"name": "json_web_key",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									".well-known",
									"jwks.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.keys`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Code",
						"type": "`$STRING`",
						"short": "The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Time of creation of the passcode",
						"format": "date-time",
					},
					map[string]any{
						"name": "email_id",
						"title": "Email Id",
						"type": "`$STRING`",
						"short": "The ID of the email address",
						"format": "uuid4",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The ID of the passcode",
						"format": "uuid4",
					},
					map[string]any{
						"name": "ttl",
						"title": "Ttl",
						"type": "`$INTEGER`",
						"short": "Lifespan of a passcode in seconds",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of the user",
						"format": "uuid4",
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
								"parts": []any{
									"passcode",
									"login",
									"finalize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
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
								"parts": []any{
									"passcode",
									"login",
									"initialize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of the user to create/set a password for",
						"format": "uuid4",
					},
				},
				"name": "password",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"password",
									"login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "login",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/password",
								"segments": []any{
									map[string]any{
										"lit": "password",
									},
								},
								"parts": []any{
									"password",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"saml": map[string]any{
				"fields": []any{},
				"name": "saml",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"saml",
									"callback",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "callback",
								},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "RelayState",
										},
										map[string]any{
											"name": "SAMLResponse",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"saml",
									"metadata",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cert_only",
											"orig": "cert_only",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "metadata",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"binary": true,
									"kind": "raw",
									"media": "application/octet-stream",
								},
							},
							map[string]any{
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
								"parts": []any{
									"saml",
									"provider",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "provider",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "claims",
						"title": "Claims",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The claims extracted from a JWT.",
					},
					map[string]any{
						"name": "expiration_time",
						"title": "Expiration Time",
						"type": "`$STRING`",
						"short": "Date-time indicating the expiration of the session.",
						"deprecated": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "idle_expires_at",
						"title": "Idle Expires At",
						"type": "`$STRING`",
						"short": "Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time.",
						"format": "date-time",
					},
					map[string]any{
						"name": "is_valid",
						"title": "Is Valid",
						"type": "`$BOOLEAN`",
						"short": "Indicates whether the session is valid or not",
					},
					map[string]any{
						"name": "session_token",
						"title": "Session Token",
						"type": "`$STRING`",
						"req": true,
						"short": "The session token (JWT) to validate",
						"format": "JWT",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user the session is associated with.",
						"deprecated": true,
						"format": "uuid4",
					},
				},
				"name": "session_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"sessions",
									"validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"sessions",
									"validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/html",
								},
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
								"parts": []any{
									"thirdparty",
									"auth",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "provider",
											"orig": "provider",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "redirect_to",
											"orig": "redirect_to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"provider",
										"redirect_to",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"thirdparty",
									"callback",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "code",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "error",
											"orig": "error",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "error_description",
											"orig": "error_description",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"state",
									},
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
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user on whose behalf the token was exchanged.",
						"format": "uuid4",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"format": "base64url",
					},
				},
				"name": "token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/token",
								"segments": []any{
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"token",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Time of creation of the the user",
						"format": "date-time",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The email address of the user",
						"format": "email",
					},
					map[string]any{
						"name": "email_id",
						"title": "Email Id",
						"type": "`$STRING`",
						"short": "The ID of the newly created email address",
						"format": "uuid4",
					},
					map[string]any{
						"name": "emails",
						"title": "Emails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "family_name",
						"title": "Family Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "given_name",
						"title": "Given Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_webauthn_credential",
						"title": "Has Webauthn Credential",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The ID of the user.",
						"deprecated": true,
						"format": "uuid4",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "The public and unsafe metadata of a user",
					},
					map[string]any{
						"name": "mfa_config",
						"title": "Mfa Config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passkeys",
						"title": "Passkeys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "picture",
						"title": "Picture",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "security_keys",
						"title": "Security Keys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Time of last update of the user",
						"format": "date-time",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user",
						"format": "uuid4",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"short": "The username of the user",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "webauthn_credentials",
						"title": "Webauthn Credentials",
						"type": "`$ARRAY`",
						"short": "A list of WebAuthn credentials",
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
								"kind": "http",
								"method": "POST",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
								},
								"parts": []any{
									"users",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Time of creation of the the user",
						"format": "date-time",
					},
					map[string]any{
						"name": "emails",
						"title": "Emails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "family_name",
						"title": "Family Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "given_name",
						"title": "Given Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The ID of the user.",
						"deprecated": true,
						"format": "uuid4",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "The public and unsafe metadata of a user",
					},
					map[string]any{
						"name": "mfa_config",
						"title": "Mfa Config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "passkeys",
						"title": "Passkeys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "picture",
						"title": "Picture",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "security_keys",
						"title": "Security Keys",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Time of last update of the user",
						"format": "date-time",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user",
						"format": "uuid4",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$OBJECT`",
						"short": "The representation of a username of the user",
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
								"kind": "http",
								"method": "POST",
								"orig": "/logout",
								"segments": []any{
									map[string]any{
										"lit": "logout",
									},
								},
								"parts": []any{
									"logout",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/me",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "aaguid",
						"title": "Aaguid",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "attestation_type",
						"title": "Attestation Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "backup_eligible",
						"title": "Backup Eligible",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "backup_state",
						"title": "Backup State",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "credential_id",
						"title": "Credential Id",
						"type": "`$STRING`",
						"short": "The ID of the created credential",
						"format": "base64",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"format": "uuid",
					},
					map[string]any{
						"name": "last_used_at",
						"title": "Last Used At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "mfa_only",
						"title": "Mfa Only",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "A new credential name.",
					},
					map[string]any{
						"name": "publickey",
						"title": "Publickey",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawId",
						"title": "Raw Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response",
						"title": "Response",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "transports",
						"title": "Transports",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "The ID of the user on whose behalf a credential was created",
						"format": "uuid4",
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
								"parts": []any{
									"webauthn",
									"registration",
									"finalize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webauthn",
									"credentials",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webauthn",
									"credentials",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webauthn",
									"credentials",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "credential_id",
						"title": "Credential Id",
						"type": "`$STRING`",
						"format": "base64url",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rawId",
						"title": "Raw Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response",
						"title": "Response",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"format": "uuid4",
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
								"parts": []any{
									"webauthn",
									"login",
									"finalize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
