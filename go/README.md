# HankoPublic Golang SDK



The Golang SDK for the HankoPublic API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CredentialCreationOption(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hanko-public-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/hanko-public-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hanko-public-sdk/go=../hanko-public-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key as the `hanko` cookie.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/hanko-public-sdk/go"
)

func main() {
    client := sdk.NewHankoPublicSDK(map[string]any{
        "apikey": os.Getenv("HANKO_PUBLIC_APIKEY"),
    "server": map[string]any{
        "tenant_id": "<tenant_id>",
    },
    })

    // Create a credentialCreationOption.
    created, err := client.CredentialCreationOption(nil).Create(map[string]any{"attestation": "example_attestation", "authenticatorSelection": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
jsonwebkeys, err := client.JsonWebKey(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = jsonwebkeys
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

jsonWebKeys, err := client.JsonWebKey(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range jsonWebKeys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `CredentialCreationOption` | `(data map[string]any) HankoPublicEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `(data map[string]any) HankoPublicEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `(data map[string]any) HankoPublicEntity` | Create an Email entity instance. |
| `HankoConfiguration` | `(data map[string]any) HankoPublicEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKey` | `(data map[string]any) HankoPublicEntity` | Create a JsonWebKey entity instance. |
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
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    credentialCreationOption, err := client.CredentialCreationOption(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // credentialCreationOption is the entity; credentialCreationOption.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CredentialCreationOption

| Field | Description |
| --- | --- |
| `"attestation"` |  |
| `"authenticatorSelection"` |  |
| `"challenge"` |  |
| `"pubKeyCredParams"` |  |
| `"rp"` |  |
| `"timeout"` |  |
| `"user"` |  |

Operations: Create.

API path: `/webauthn/registration/initialize`

#### CredentialRequestOption

| Field | Description |
| --- | --- |
| `"allowCredentials"` |  |
| `"challenge"` |  |
| `"rpId"` |  |
| `"timeout"` |  |
| `"userVerification"` |  |
| `"user_id"` | The ID of the user on whose behalf WebAuthn login should be performed |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `"address"` | The email address |
| `"id"` | The ID of the email address |
| `"identities"` |  |
| `"identity"` |  |
| `"is_primary"` | Indicates it's the primary email address. |
| `"is_verified"` | Indicated the email has been verified. |

Operations: Create, List, Remove.

API path: `/emails/{id}/set_primary`

#### HankoConfiguration

| Field | Description |
| --- | --- |
| `"account"` | Controls the behavior regarding user account. |
| `"emails"` | Controls the behavior regarding email addresses. |
| `"password"` | Configuration options concerning passwords |

Operations: Load.

API path: `/.well-known/config`

#### JsonWebKey

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
| `"code"` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `"created_at"` | Time of creation of the passcode |
| `"email_id"` | The ID of the email address |
| `"id"` | The ID of the passcode |
| `"ttl"` | Lifespan of a passcode in seconds |
| `"user_id"` | The ID of the user |

Operations: Create.

API path: `/passcode/login/finalize`

#### Password

| Field | Description |
| --- | --- |
| `"password"` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `"user_id"` | The ID of the user to create/set a password for |

Operations: Create, Update.

API path: `/password/login`

#### Saml

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `"claims"` | The claims extracted from a JWT. |
| `"expiration_time"` | Date-time indicating the expiration of the session. |
| `"idle_expires_at"` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `"is_valid"` | Indicates whether the session is valid or not |
| `"session_token"` | The session token (JWT) to validate |
| `"user_id"` | The ID of the user the session is associated with. |

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

API path: `/thirdparty/auth`

#### Token

| Field | Description |
| --- | --- |
| `"user_id"` | The ID of the user on whose behalf the token was exchanged. |
| `"value"` |  |

Operations: Create.

API path: `/token`

#### User

| Field | Description |
| --- | --- |
| `"created_at"` | Time of creation of the the user |
| `"email"` | The email address of the user |
| `"email_id"` | The ID of the newly created email address |
| `"emails"` |  |
| `"family_name"` |  |
| `"given_name"` |  |
| `"has_webauthn_credential"` |  |
| `"id"` | The ID of the user. |
| `"metadata"` | The public and unsafe metadata of a user |
| `"mfa_config"` |  |
| `"name"` |  |
| `"passkeys"` |  |
| `"picture"` |  |
| `"security_keys"` |  |
| `"updated_at"` | Time of last update of the user |
| `"user_id"` | The ID of the user |
| `"username"` | The username of the user |
| `"verified"` |  |
| `"webauthn_credentials"` | A list of WebAuthn credentials |

Operations: Create, Load, Remove.

API path: `/user`

#### UserManagement

| Field | Description |
| --- | --- |
| `"created_at"` | Time of creation of the the user |
| `"emails"` |  |
| `"family_name"` |  |
| `"given_name"` |  |
| `"id"` | The ID of the user. |
| `"metadata"` | The public and unsafe metadata of a user |
| `"mfa_config"` |  |
| `"name"` |  |
| `"passkeys"` |  |
| `"picture"` |  |
| `"security_keys"` |  |
| `"updated_at"` | Time of last update of the user |
| `"user_id"` | The ID of the user |
| `"username"` | The representation of a username of the user |

Operations: Create, List.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `"aaguid"` |  |
| `"attestation_type"` |  |
| `"backup_eligible"` |  |
| `"backup_state"` |  |
| `"created_at"` |  |
| `"credential_id"` | The ID of the created credential |
| `"id"` |  |
| `"last_used_at"` |  |
| `"mfa_only"` |  |
| `"name"` | A new credential name. |
| `"publickey"` |  |
| `"rawId"` |  |
| `"response"` |  |
| `"transports"` |  |
| `"type"` |  |
| `"user_id"` | The ID of the user on whose behalf a credential was created |

Operations: Create, List, Remove, Update.

API path: `/webauthn/registration/finalize`

#### WebauthnLogin

| Field | Description |
| --- | --- |
| `"credential_id"` |  |
| `"id"` |  |
| `"rawId"` |  |
| `"response"` |  |
| `"type"` |  |
| `"user_id"` |  |

Operations: Create.

API path: `/webauthn/login/finalize`



## Entities


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
| `authenticatorSelection` | `map[string]any` |  |
| `challenge` | `string` |  |
| `pubKeyCredParams` | `[]any` |  |
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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `allowCredentials` | `[]any` |  |
| `challenge` | `string` |  |
| `rpId` | `string` |  |
| `timeout` | `int` |  |
| `userVerification` | `string` |  |
| `user_id` | `string` | The ID of the user on whose behalf WebAuthn login should be performed |

#### Example: Create

```go
result, err := client.CredentialRequestOption(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `address` | `string` | The email address |
| `id` | `string` | The ID of the email address |
| `identities` | `any` |  |
| `identity` | `any` |  |
| `is_primary` | `bool` | Indicates it's the primary email address. |
| `is_verified` | `bool` | Indicated the email has been verified. |

#### Example: List

```go
emails, err := client.Email(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range emails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Email(nil).Create(map[string]any{
    "address": "example_address",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `account` | `map[string]any` | Controls the behavior regarding user account. |
| `emails` | `map[string]any` | Controls the behavior regarding email addresses. |
| `password` | `map[string]any` | Configuration options concerning passwords |

#### Example: Load

```go
hankoConfiguration, err := client.HankoConfiguration(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(hankoConfiguration.(sdk.Entity).Data()) // the loaded entity's record
```


### JsonWebKey

Create an instance: `jsonWebKey := client.JsonWebKey(nil)`

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
jsonWebKeys, err := client.JsonWebKey(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range jsonWebKeys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `code` | `string` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `created_at` | `string` | Time of creation of the passcode |
| `email_id` | `string` | The ID of the email address |
| `id` | `string` | The ID of the passcode |
| `ttl` | `int` | Lifespan of a passcode in seconds |
| `user_id` | `string` | The ID of the user |

#### Example: Create

```go
result, err := client.Passcode(nil).Create(map[string]any{
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `password` | `string` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `string` | The ID of the user to create/set a password for |

#### Example: Create

```go
result, err := client.Password(nil).Create(map[string]any{
    "password": "example_password",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Saml

Create an instance: `saml := client.Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Saml(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `claims` | `map[string]any` | The claims extracted from a JWT. |
| `expiration_time` | `string` | Date-time indicating the expiration of the session. |
| `idle_expires_at` | `string` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | `bool` | Indicates whether the session is valid or not |
| `session_token` | `string` | The session token (JWT) to validate |
| `user_id` | `string` | The ID of the user the session is associated with. |

#### Example: Load

```go
sessionManagement, err := client.SessionManagement(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(sessionManagement.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SessionManagement(nil).Create(map[string]any{
    "claims": map[string]any{},
    "session_token": "example_session_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
fmt.Println(status.(sdk.Entity).Data()) // the loaded entity's record
```


### ThirdParty

Create an instance: `thirdParty := client.ThirdParty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
thirdParty, err := client.ThirdParty(nil).Load(map[string]any{"provider": "provider", "redirect_to": "redirect_to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(thirdParty.(sdk.Entity).Data()) // the loaded entity's record
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
| `user_id` | `string` | The ID of the user on whose behalf the token was exchanged. |
| `value` | `string` |  |

#### Example: Create

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `created_at` | `string` | Time of creation of the the user |
| `email` | `string` | The email address of the user |
| `email_id` | `string` | The ID of the newly created email address |
| `emails` | `[]any` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `map[string]any` | The public and unsafe metadata of a user |
| `mfa_config` | `map[string]any` |  |
| `name` | `string` |  |
| `passkeys` | `[]any` |  |
| `picture` | `string` |  |
| `security_keys` | `[]any` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `string` | The username of the user |
| `verified` | `bool` |  |
| `webauthn_credentials` | `[]any` | A list of WebAuthn credentials |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `created_at` | `string` | Time of creation of the the user |
| `emails` | `[]any` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `map[string]any` | The public and unsafe metadata of a user |
| `mfa_config` | `map[string]any` |  |
| `name` | `string` |  |
| `passkeys` | `[]any` |  |
| `picture` | `string` |  |
| `security_keys` | `[]any` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `map[string]any` | The representation of a username of the user |

#### Example: List

```go
userManagements, err := client.UserManagement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range userManagements.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.UserManagement(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WebAuthn

Create an instance: `webAuthn := client.WebAuthn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `string` |  |
| `attestation_type` | `string` |  |
| `backup_eligible` | `bool` |  |
| `backup_state` | `bool` |  |
| `created_at` | `string` |  |
| `credential_id` | `string` | The ID of the created credential |
| `id` | `string` |  |
| `last_used_at` | `string` |  |
| `mfa_only` | `bool` |  |
| `name` | `string` | A new credential name. |
| `publickey` | `string` |  |
| `rawId` | `string` |  |
| `response` | `map[string]any` |  |
| `transports` | `[]any` |  |
| `type` | `string` |  |
| `user_id` | `string` | The ID of the user on whose behalf a credential was created |

#### Example: List

```go
webAuthns, err := client.WebAuthn(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range webAuthns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.WebAuthn(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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
| `rawId` | `string` |  |
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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

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
jsonwebkey := client.JsonWebKey(nil)
jsonwebkey.List(nil, nil)

// jsonwebkey.Data() now returns the jsonwebkey data from the last list
// jsonwebkey.Match() returns the last match criteria
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
