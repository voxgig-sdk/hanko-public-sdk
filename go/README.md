# HankoPublic Golang SDK



The Golang SDK for the HankoPublic API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CreateUserResponseObject(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hanko-public-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hanko-public-sdk/go=../hanko-public-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "os"
    sdk "github.com/voxgig-sdk/hanko-public-sdk/go"
)

func main() {
    client := sdk.NewHankoPublicSDK(map[string]any{
        "apikey": os.Getenv("HANKO_PUBLIC_APIKEY"),
    })

    _ = client
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
jsonwebkeysets, err := client.JsonWebKeySet(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = jsonwebkeysets
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

jsonWebKeySet, err := client.JsonWebKeySet(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(jsonWebKeySet) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHankoPublicSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HANKO_PUBLIC_TEST_LIVE=TRUE
HANKO_PUBLIC_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewHankoPublicSDK

```go
func NewHankoPublicSDK(options map[string]any) *HankoPublicSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HankoPublicSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HankoPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CreateUserResponseObject` | `(data map[string]any) HankoPublicEntity` | Create a CreateUserResponseObject entity instance. |
| `Credential` | `(data map[string]any) HankoPublicEntity` | Create a Credential entity instance. |
| `CredentialCreationOption` | `(data map[string]any) HankoPublicEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `(data map[string]any) HankoPublicEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `(data map[string]any) HankoPublicEntity` | Create an Email entity instance. |
| `EmailManagement` | `(data map[string]any) HankoPublicEntity` | Create an EmailManagement entity instance. |
| `HankoConfiguration` | `(data map[string]any) HankoPublicEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKeySet` | `(data map[string]any) HankoPublicEntity` | Create a JsonWebKeySet entity instance. |
| `Passcode` | `(data map[string]any) HankoPublicEntity` | Create a Passcode entity instance. |
| `Password` | `(data map[string]any) HankoPublicEntity` | Create a Password entity instance. |
| `Saml` | `(data map[string]any) HankoPublicEntity` | Create a Saml entity instance. |
| `SessionManagement` | `(data map[string]any) HankoPublicEntity` | Create a SessionManagement entity instance. |
| `Status` | `(data map[string]any) HankoPublicEntity` | Create a Status entity instance. |
| `ThirdParty` | `(data map[string]any) HankoPublicEntity` | Create a ThirdParty entity instance. |
| `Token` | `(data map[string]any) HankoPublicEntity` | Create a Token entity instance. |
| `User` | `(data map[string]any) HankoPublicEntity` | Create an User entity instance. |
| `UserManagement` | `(data map[string]any) HankoPublicEntity` | Create an UserManagement entity instance. |
| `WebAuthn` | `(data map[string]any) HankoPublicEntity` | Create a WebAuthn entity instance. |
| `WebauthnLogin` | `(data map[string]any) HankoPublicEntity` | Create a WebauthnLogin entity instance. |

### Entity interface (HankoPublicEntity)

All entities implement the `HankoPublicEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    credential, err := client.Credential(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // credential is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CreateUserResponseObject

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Credential

| Field | Description |
| --- | --- |
| `"aaguid"` |  |
| `"attestation_type"` |  |
| `"backup_eligible"` |  |
| `"backup_state"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"last_used_at"` |  |
| `"mfa_only"` |  |
| `"name"` |  |
| `"public_key"` |  |
| `"transport"` |  |

Operations: List.

API path: `/webauthn/credentials`

#### CredentialCreationOption

| Field | Description |
| --- | --- |
| `"attestation"` |  |
| `"authenticator_selection"` |  |
| `"challenge"` |  |
| `"pub_key_cred_param"` |  |
| `"rp"` |  |
| `"timeout"` |  |
| `"user"` |  |

Operations: Create.

API path: `/webauthn/registration/initialize`

#### CredentialRequestOption

| Field | Description |
| --- | --- |
| `"allow_credential"` |  |
| `"challenge"` |  |
| `"rp_id"` |  |
| `"timeout"` |  |
| `"user_id"` |  |
| `"user_verification"` |  |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"id"` |  |
| `"identity"` |  |
| `"is_primary"` |  |
| `"is_verified"` |  |

Operations: Create, List, Remove.

API path: `/emails`

#### EmailManagement

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/emails/{id}/set_primary`

#### HankoConfiguration

| Field | Description |
| --- | --- |
| `"account"` |  |
| `"email"` |  |
| `"password"` |  |

Operations: Load.

API path: `/.well-known/config`

#### JsonWebKeySet

| Field | Description |
| --- | --- |
| `"alg"` |  |
| `"e"` |  |
| `"kid"` |  |
| `"kty"` |  |
| `"n"` |  |
| `"use"` |  |

Operations: List.

API path: `/.well-known/jwks.json`

#### Passcode

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"created_at"` |  |
| `"email_id"` |  |
| `"id"` |  |
| `"ttl"` |  |
| `"user_id"` |  |

Operations: Create.

API path: `/passcode/login/finalize`

#### Password

| Field | Description |
| --- | --- |
| `"password"` |  |
| `"user_id"` |  |

Operations: Create, Update.

API path: `/password/login`

#### Saml

| Field | Description |
| --- | --- |
| `"attribute_map"` |  |
| `"domain"` |  |
| `"enabled"` |  |
| `"metadata_url"` |  |
| `"name"` |  |
| `"skip_email_verification"` |  |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `"claim"` |  |
| `"expiration_time"` |  |
| `"idle_expires_at"` |  |
| `"is_valid"` |  |
| `"session_token"` |  |
| `"user_id"` |  |

Operations: Create, Load.

API path: `/sessions/validate`

#### Status

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/`

#### ThirdParty

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/thirdparty/callback`

#### Token

| Field | Description |
| --- | --- |
| `"value"` |  |

Operations: Create.

API path: `/token`

#### User

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"email"` |  |
| `"email_id"` |  |
| `"family_name"` |  |
| `"given_name"` |  |
| `"has_webauthn_credential"` |  |
| `"id"` |  |
| `"metadata"` |  |
| `"mfa_config"` |  |
| `"name"` |  |
| `"passkey"` |  |
| `"picture"` |  |
| `"security_key"` |  |
| `"updated_at"` |  |
| `"user_id"` |  |
| `"username"` |  |
| `"verified"` |  |
| `"webauthn_credential"` |  |

Operations: Create, Load, Remove.

API path: `/user`

#### UserManagement

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"email"` |  |
| `"family_name"` |  |
| `"given_name"` |  |
| `"id"` |  |
| `"metadata"` |  |
| `"mfa_config"` |  |
| `"name"` |  |
| `"passkey"` |  |
| `"picture"` |  |
| `"security_key"` |  |
| `"updated_at"` |  |
| `"user_id"` |  |
| `"username"` |  |

Operations: Create, List.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `"credential_id"` |  |
| `"id"` |  |
| `"name"` |  |
| `"raw_id"` |  |
| `"response"` |  |
| `"type"` |  |
| `"user_id"` |  |

Operations: Create, Remove, Update.

API path: `/webauthn/registration/finalize`

#### WebauthnLogin

| Field | Description |
| --- | --- |
| `"credential_id"` |  |
| `"id"` |  |
| `"raw_id"` |  |
| `"response"` |  |
| `"type"` |  |
| `"user_id"` |  |

Operations: Create.

API path: `/webauthn/login/finalize`



## Entities


### CreateUserResponseObject

Create an instance: `createUserResponseObject := client.CreateUserResponseObject(nil)`


### Credential

Create an instance: `credential := client.Credential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `string` |  |
| `attestation_type` | `string` |  |
| `backup_eligible` | `bool` |  |
| `backup_state` | `bool` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `string` |  |
| `mfa_only` | `bool` |  |
| `name` | `string` |  |
| `public_key` | `string` |  |
| `transport` | `[]any` |  |

#### Example: List

```go
credentials, err := client.Credential(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(credentials) // the array of records
```


### CredentialCreationOption

Create an instance: `credentialCreationOption := client.CredentialCreationOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `string` |  |
| `authenticator_selection` | `map[string]any` |  |
| `challenge` | `string` |  |
| `pub_key_cred_param` | `[]any` |  |
| `rp` | `map[string]any` |  |
| `timeout` | `int` |  |
| `user` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.CredentialCreationOption(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CredentialRequestOption

Create an instance: `credentialRequestOption := client.CredentialRequestOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allow_credential` | `[]any` |  |
| `challenge` | `string` |  |
| `rp_id` | `string` |  |
| `timeout` | `int` |  |
| `user_id` | `string` |  |
| `user_verification` | `string` |  |

#### Example: Create

```go
result, err := client.CredentialRequestOption(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Email

Create an instance: `email := client.Email(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `id` | `string` |  |
| `identity` | `any` |  |
| `is_primary` | `bool` |  |
| `is_verified` | `bool` |  |

#### Example: List

```go
emails, err := client.Email(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(emails) // the array of records
```

#### Example: Create

```go
result, err := client.Email(nil).Create(map[string]any{
    "address": "example_address",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### EmailManagement

Create an instance: `emailManagement := client.EmailManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.EmailManagement(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### HankoConfiguration

Create an instance: `hankoConfiguration := client.HankoConfiguration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `map[string]any` |  |
| `email` | `map[string]any` |  |
| `password` | `map[string]any` |  |

#### Example: Load

```go
hankoConfiguration, err := client.HankoConfiguration(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(hankoConfiguration) // the loaded record
```


### JsonWebKeySet

Create an instance: `jsonWebKeySet := client.JsonWebKeySet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alg` | `string` |  |
| `e` | `string` |  |
| `kid` | `string` |  |
| `kty` | `string` |  |
| `n` | `string` |  |
| `use` | `string` |  |

#### Example: List

```go
jsonWebKeySets, err := client.JsonWebKeySet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(jsonWebKeySets) // the array of records
```


### Passcode

Create an instance: `passcode := client.Passcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `created_at` | `string` |  |
| `email_id` | `string` |  |
| `id` | `string` |  |
| `ttl` | `int` |  |
| `user_id` | `string` |  |

#### Example: Create

```go
result, err := client.Passcode(nil).Create(map[string]any{
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Password

Create an instance: `password := client.Password(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```go
result, err := client.Password(nil).Create(map[string]any{
    "password": "example_password",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Saml

Create an instance: `saml := client.Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute_map` | `map[string]any` |  |
| `domain` | `string` |  |
| `enabled` | `bool` |  |
| `metadata_url` | `string` |  |
| `name` | `string` |  |
| `skip_email_verification` | `bool` |  |

#### Example: Load

```go
saml, err := client.Saml(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(saml) // the loaded record
```

#### Example: Create

```go
result, err := client.Saml(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### SessionManagement

Create an instance: `sessionManagement := client.SessionManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claim` | `map[string]any` |  |
| `expiration_time` | `string` |  |
| `idle_expires_at` | `string` |  |
| `is_valid` | `bool` |  |
| `session_token` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```go
sessionManagement, err := client.SessionManagement(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(sessionManagement) // the loaded record
```

#### Example: Create

```go
result, err := client.SessionManagement(nil).Create(map[string]any{
    "claim": map[string]any{},
    "session_token": "example_session_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Status

Create an instance: `status := client.Status(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
status, err := client.Status(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(status) // the loaded record
```


### ThirdParty

Create an instance: `thirdParty := client.ThirdParty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
thirdParty, err := client.ThirdParty(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(thirdParty) // the loaded record
```


### Token

Create an instance: `token := client.Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `value` | `string` |  |

#### Example: Create

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `[]any` |  |
| `email_id` | `string` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` |  |
| `mfa_config` | `map[string]any` |  |
| `name` | `string` |  |
| `passkey` | `[]any` |  |
| `picture` | `string` |  |
| `security_key` | `[]any` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `string` |  |
| `verified` | `bool` |  |
| `webauthn_credential` | `[]any` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```

#### Example: Create

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UserManagement

Create an instance: `userManagement := client.UserManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `[]any` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` |  |
| `mfa_config` | `map[string]any` |  |
| `name` | `string` |  |
| `passkey` | `[]any` |  |
| `picture` | `string` |  |
| `security_key` | `[]any` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `map[string]any` |  |

#### Example: List

```go
userManagements, err := client.UserManagement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userManagements) // the array of records
```

#### Example: Create

```go
result, err := client.UserManagement(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### WebAuthn

Create an instance: `webAuthn := client.WebAuthn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `raw_id` | `string` |  |
| `response` | `map[string]any` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```go
result, err := client.WebAuthn(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### WebauthnLogin

Create an instance: `webauthnLogin := client.WebauthnLogin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `raw_id` | `string` |  |
| `response` | `map[string]any` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```go
result, err := client.WebauthnLogin(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/hanko-public-sdk/go/
├── hanko-public.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hanko-public-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
jsonwebkeyset := client.JsonWebKeySet(nil)
jsonwebkeyset.List(nil, nil)

// jsonwebkeyset.Data() now returns the jsonwebkeyset data from the last list
// jsonwebkeyset.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
