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
			"secrets": map[string]any{
				"options": map[string]any{
					"active": false,
					"cache": true,
					"exchange": map[string]any{
						"active": false,
						"method": "POST",
						"path": "auth/token",
						"refresh": "",
						"request": "refresh_token",
						"response": "access_token",
						"retries": 1,
						"statuses": []any{
							401,
						},
					},
					"name": "apikey",
					"providers": []any{},
				},
				"optspec": map[string]any{},
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
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"json_web_key": map[string]any{},
				"organization_management": map[string]any{},
				"saml": map[string]any{},
				"session_management": map[string]any{},
				"status": map[string]any{},
				"third_party": map[string]any{},
				"user_management": map[string]any{},
			},
		},
		"entity": map[string]any{
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
			"organization_management": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "has_role",
						"title": "Has Role",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "organization_id",
						"title": "Organization Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of the organization to check",
						"format": "uuid4",
					},
					map[string]any{
						"name": "roles",
						"title": "Roles",
						"type": "`$ARRAY`",
						"req": true,
						"short": "IDs or slugs of roles to check for.",
					},
				},
				"name": "organization_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organizations/roles/check",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"lit": "roles",
									},
									map[string]any{
										"lit": "check",
									},
								},
								"parts": []any{
									"organizations",
									"roles",
									"check",
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
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The ID of the organization",
						"format": "uuid4",
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
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the organization",
					},
					map[string]any{
						"name": "organizations",
						"title": "Organizations",
						"type": "`$ARRAY`",
						"short": "The organizations the user belongs to, and the role slugs they hold within each.",
					},
					map[string]any{
						"name": "roles",
						"title": "Roles",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The slugs of the roles the user holds within this organization",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
					"list": map[string]any{
						"input": "data",
						"name": "list",
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
	case "secrets":
		if NewSecretsFeatureFunc != nil {
			return NewSecretsFeatureFunc()
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
