# HankoPublic Lua SDK



The Lua SDK for the HankoPublic API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:CreateUserResponseObject()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("hanko-public_sdk")

local client = sdk.new({
  apikey = os.getenv("HANKO_PUBLIC_APIKEY"),
})
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local jsonwebkeysets, err = client:JsonWebKeySet():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:JsonWebKeySet():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### HankoPublicSDK

```lua
local sdk = require("hanko-public_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HankoPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `CreateUserResponseObject` | `(data) -> CreateUserResponseObjectEntity` | Create a CreateUserResponseObject entity instance. |
| `Credential` | `(data) -> CredentialEntity` | Create a Credential entity instance. |
| `CredentialCreationOption` | `(data) -> CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `(data) -> CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `(data) -> EmailEntity` | Create an Email entity instance. |
| `EmailManagement` | `(data) -> EmailManagementEntity` | Create an EmailManagement entity instance. |
| `HankoConfiguration` | `(data) -> HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKeySet` | `(data) -> JsonWebKeySetEntity` | Create a JsonWebKeySet entity instance. |
| `Passcode` | `(data) -> PasscodeEntity` | Create a Passcode entity instance. |
| `Password` | `(data) -> PasswordEntity` | Create a Password entity instance. |
| `Saml` | `(data) -> SamlEntity` | Create a Saml entity instance. |
| `SessionManagement` | `(data) -> SessionManagementEntity` | Create a SessionManagement entity instance. |
| `Status` | `(data) -> StatusEntity` | Create a Status entity instance. |
| `ThirdParty` | `(data) -> ThirdPartyEntity` | Create a ThirdParty entity instance. |
| `Token` | `(data) -> TokenEntity` | Create a Token entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `UserManagement` | `(data) -> UserManagementEntity` | Create an UserManagement entity instance. |
| `WebAuthn` | `(data) -> WebAuthnEntity` | Create a WebAuthn entity instance. |
| `WebauthnLogin` | `(data) -> WebauthnLoginEntity` | Create a WebauthnLogin entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local create_user_response_object, err = client:CreateUserResponseObject():load()
    if err then error(err) end
    -- create_user_response_object is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### CreateUserResponseObject

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Credential

| Field | Description |
| --- | --- |
| `aaguid` |  |
| `attestation_type` |  |
| `backup_eligible` |  |
| `backup_state` |  |
| `created_at` |  |
| `id` |  |
| `last_used_at` |  |
| `mfa_only` |  |
| `name` |  |
| `public_key` |  |
| `transport` |  |

Operations: List.

API path: `/webauthn/credentials`

#### CredentialCreationOption

| Field | Description |
| --- | --- |
| `attestation` |  |
| `authenticator_selection` |  |
| `challenge` |  |
| `pub_key_cred_param` |  |
| `rp` |  |
| `timeout` |  |
| `user` |  |

Operations: Create.

API path: `/webauthn/registration/initialize`

#### CredentialRequestOption

| Field | Description |
| --- | --- |
| `allow_credential` |  |
| `challenge` |  |
| `rp_id` |  |
| `timeout` |  |
| `user_id` |  |
| `user_verification` |  |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `address` |  |
| `id` |  |
| `identity` |  |
| `is_primary` |  |
| `is_verified` |  |

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
| `account` |  |
| `email` |  |
| `password` |  |

Operations: Load.

API path: `/.well-known/config`

#### JsonWebKeySet

| Field | Description |
| --- | --- |
| `alg` |  |
| `e` |  |
| `kid` |  |
| `kty` |  |
| `n` |  |
| `use` |  |

Operations: List.

API path: `/.well-known/jwks.json`

#### Passcode

| Field | Description |
| --- | --- |
| `code` |  |
| `created_at` |  |
| `email_id` |  |
| `id` |  |
| `ttl` |  |
| `user_id` |  |

Operations: Create.

API path: `/passcode/login/finalize`

#### Password

| Field | Description |
| --- | --- |
| `password` |  |
| `user_id` |  |

Operations: Create, Update.

API path: `/password/login`

#### Saml

| Field | Description |
| --- | --- |
| `attribute_map` |  |
| `domain` |  |
| `enabled` |  |
| `metadata_url` |  |
| `name` |  |
| `skip_email_verification` |  |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `claim` |  |
| `expiration_time` |  |
| `idle_expires_at` |  |
| `is_valid` |  |
| `session_token` |  |
| `user_id` |  |

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
| `value` |  |

Operations: Create.

API path: `/token`

#### User

| Field | Description |
| --- | --- |
| `created_at` |  |
| `email` |  |
| `email_id` |  |
| `family_name` |  |
| `given_name` |  |
| `has_webauthn_credential` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkey` |  |
| `picture` |  |
| `security_key` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |
| `verified` |  |
| `webauthn_credential` |  |

Operations: Create, Load, Remove.

API path: `/user`

#### UserManagement

| Field | Description |
| --- | --- |
| `created_at` |  |
| `email` |  |
| `family_name` |  |
| `given_name` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkey` |  |
| `picture` |  |
| `security_key` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |

Operations: Create, List.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `credential_id` |  |
| `id` |  |
| `name` |  |
| `raw_id` |  |
| `response` |  |
| `type` |  |
| `user_id` |  |

Operations: Create, Remove, Update.

API path: `/webauthn/registration/finalize`

#### WebauthnLogin

| Field | Description |
| --- | --- |
| `credential_id` |  |
| `id` |  |
| `raw_id` |  |
| `response` |  |
| `type` |  |
| `user_id` |  |

Operations: Create.

API path: `/webauthn/login/finalize`



## Entities


### CreateUserResponseObject

Create an instance: `local create_user_response_object = client:CreateUserResponseObject(nil)`


### Credential

Create an instance: `local credential = client:Credential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `string` |  |
| `attestation_type` | `string` |  |
| `backup_eligible` | `boolean` |  |
| `backup_state` | `boolean` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `string` |  |
| `mfa_only` | `boolean` |  |
| `name` | `string` |  |
| `public_key` | `string` |  |
| `transport` | `table` |  |

#### Example: List

```lua
local credentials, err = client:Credential():list()
```


### CredentialCreationOption

Create an instance: `local credential_creation_option = client:CredentialCreationOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `string` |  |
| `authenticator_selection` | `table` |  |
| `challenge` | `string` |  |
| `pub_key_cred_param` | `table` |  |
| `rp` | `table` |  |
| `timeout` | `number` |  |
| `user` | `table` |  |

#### Example: Create

```lua
local credential_creation_option, err = client:CredentialCreationOption():create({
})
```


### CredentialRequestOption

Create an instance: `local credential_request_option = client:CredentialRequestOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allow_credential` | `table` |  |
| `challenge` | `string` |  |
| `rp_id` | `string` |  |
| `timeout` | `number` |  |
| `user_id` | `string` |  |
| `user_verification` | `string` |  |

#### Example: Create

```lua
local credential_request_option, err = client:CredentialRequestOption():create({
})
```


### Email

Create an instance: `local email = client:Email(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `id` | `string` |  |
| `identity` | `any` |  |
| `is_primary` | `boolean` |  |
| `is_verified` | `boolean` |  |

#### Example: List

```lua
local emails, err = client:Email():list()
```

#### Example: Create

```lua
local email, err = client:Email():create({
  address = "example_address", -- string
})
```


### EmailManagement

Create an instance: `local email_management = client:EmailManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local email_management, err = client:EmailManagement():create({
  id = "example_id", -- string
})
```


### HankoConfiguration

Create an instance: `local hanko_configuration = client:HankoConfiguration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `table` |  |
| `email` | `table` |  |
| `password` | `table` |  |

#### Example: Load

```lua
local hanko_configuration, err = client:HankoConfiguration():load()
```


### JsonWebKeySet

Create an instance: `local json_web_key_set = client:JsonWebKeySet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```lua
local json_web_key_sets, err = client:JsonWebKeySet():list()
```


### Passcode

Create an instance: `local passcode = client:Passcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `created_at` | `string` |  |
| `email_id` | `string` |  |
| `id` | `string` |  |
| `ttl` | `number` |  |
| `user_id` | `string` |  |

#### Example: Create

```lua
local passcode, err = client:Passcode():create({
  user_id = "example_user_id", -- string
})
```


### Password

Create an instance: `local password = client:Password(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```lua
local password, err = client:Password():create({
  password = "example_password", -- string
  user_id = "example_user_id", -- string
})
```


### Saml

Create an instance: `local saml = client:Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute_map` | `table` |  |
| `domain` | `string` |  |
| `enabled` | `boolean` |  |
| `metadata_url` | `string` |  |
| `name` | `string` |  |
| `skip_email_verification` | `boolean` |  |

#### Example: Load

```lua
local saml, err = client:Saml():load()
```

#### Example: Create

```lua
local saml, err = client:Saml():create({
})
```


### SessionManagement

Create an instance: `local session_management = client:SessionManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claim` | `table` |  |
| `expiration_time` | `string` |  |
| `idle_expires_at` | `string` |  |
| `is_valid` | `boolean` |  |
| `session_token` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```lua
local session_management, err = client:SessionManagement():load()
```

#### Example: Create

```lua
local session_management, err = client:SessionManagement():create({
  claim = {}, -- table
  session_token = "example_session_token", -- string
})
```


### Status

Create an instance: `local status = client:Status(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local status, err = client:Status():load()
```


### ThirdParty

Create an instance: `local third_party = client:ThirdParty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local third_party, err = client:ThirdParty():load()
```


### Token

Create an instance: `local token = client:Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `value` | `string` |  |

#### Example: Create

```lua
local token, err = client:Token():create({
})
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `table` |  |
| `email_id` | `string` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `boolean` |  |
| `id` | `string` |  |
| `metadata` | `table` |  |
| `mfa_config` | `table` |  |
| `name` | `string` |  |
| `passkey` | `table` |  |
| `picture` | `string` |  |
| `security_key` | `table` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `string` |  |
| `verified` | `boolean` |  |
| `webauthn_credential` | `table` |  |

#### Example: Load

```lua
local user, err = client:User():load({ id = "user_id" })
```

#### Example: Create

```lua
local user, err = client:User():create({
})
```


### UserManagement

Create an instance: `local user_management = client:UserManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `email` | `table` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` |  |
| `metadata` | `table` |  |
| `mfa_config` | `table` |  |
| `name` | `string` |  |
| `passkey` | `table` |  |
| `picture` | `string` |  |
| `security_key` | `table` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `table` |  |

#### Example: List

```lua
local user_managements, err = client:UserManagement():list()
```

#### Example: Create

```lua
local user_management, err = client:UserManagement():create({
})
```


### WebAuthn

Create an instance: `local web_authn = client:WebAuthn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `raw_id` | `string` |  |
| `response` | `table` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```lua
local web_authn, err = client:WebAuthn():create({
})
```


### WebauthnLogin

Create an instance: `local webauthn_login = client:WebauthnLogin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `raw_id` | `string` |  |
| `response` | `table` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```lua
local webauthn_login, err = client:WebauthnLogin():create({
})
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── hanko-public_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`hanko-public_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local jsonwebkeyset = client:JsonWebKeySet()
jsonwebkeyset:list()

-- jsonwebkeyset:data_get() now returns the jsonwebkeyset data from the last list
-- jsonwebkeyset:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
