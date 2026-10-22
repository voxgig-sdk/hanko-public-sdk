# HankoPublic Lua SDK



The Lua SDK for the HankoPublic API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:JsonWebKey()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hanko-public-sdk/tags)),
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

### 2. List jsonwebkey records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local jsonwebkeys, err = client:JsonWebKey():list()
if err then error(err) end

for _, item in ipairs(jsonwebkeys) do
  for k, val in pairs(item:data_get()) do print(k, val) end
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local jsonwebkeys, err = client:JsonWebKey():list()
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

local result, err = client:JsonWebKey():list()
-- result is an array of entities, one per mock record; err is set on failure
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
| `JsonWebKey` | `(data) -> JsonWebKeyEntity` | Create a JsonWebKey entity instance. |
| `OrganizationManagement` | `(data) -> OrganizationManagementEntity` | Create an OrganizationManagement entity instance. |
| `Saml` | `(data) -> SamlEntity` | Create a Saml entity instance. |
| `SessionManagement` | `(data) -> SessionManagementEntity` | Create a SessionManagement entity instance. |
| `Status` | `(data) -> StatusEntity` | Create a Status entity instance. |
| `ThirdParty` | `(data) -> ThirdPartyEntity` | Create a ThirdParty entity instance. |
| `UserManagement` | `(data) -> UserManagementEntity` | Create an UserManagement entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local saml, err = client:Saml():load({ domain = "example" })
    if err then error(err) end
    -- saml is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### JsonWebKey

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

#### OrganizationManagement

| Field | Description |
| --- | --- |
| `has_role` |  |
| `organization_id` | The ID of the organization to check |
| `roles` | IDs or slugs of roles to check for. |

Operations: Create.

API path: `/organizations/roles/check`

#### Saml

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `claims` | The claims extracted from a JWT. |
| `expiration_time` | Date-time indicating the expiration of the session. |
| `id` | The ID of the organization |
| `idle_expires_at` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | Indicates whether the session is valid or not |
| `name` | The name of the organization |
| `organizations` | The organizations the user belongs to, and the role slugs they hold within each. |
| `roles` | The slugs of the roles the user holds within this organization |
| `session_token` | The session token (JWT) to validate |
| `user_id` | The ID of the user the session is associated with. |

Operations: Create, List.

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

#### UserManagement

| Field | Description |
| --- | --- |
| `created_at` | Time of creation of the the user |
| `emails` |  |
| `family_name` |  |
| `given_name` |  |
| `id` | The ID of the user. |
| `metadata` | The public and unsafe metadata of a user |
| `mfa_config` |  |
| `name` |  |
| `passkeys` |  |
| `picture` |  |
| `security_keys` |  |
| `updated_at` | Time of last update of the user |
| `user_id` | The ID of the user |
| `username` | The representation of a username of the user |

Operations: Create, List.

API path: `/logout`



## Entities


### JsonWebKey

Create an instance: `local json_web_key = client:JsonWebKey(nil)`

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
local json_web_keys, err = client:JsonWebKey():list()
```


### OrganizationManagement

Create an instance: `local organization_management = client:OrganizationManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `has_role` | `boolean` |  |
| `organization_id` | `string` | The ID of the organization to check |
| `roles` | `table` | IDs or slugs of roles to check for. |

#### Example: Create

```lua
local organization_management, err = client:OrganizationManagement():create({
  organization_id = "example_organization_id", -- string
  roles = {}, -- table
})
```


### Saml

Create an instance: `local saml = client:Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local saml, err = client:Saml():load({ domain = "domain" })
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
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `table` | The claims extracted from a JWT. |
| `expiration_time` | `string` | Date-time indicating the expiration of the session. |
| `id` | `string` | The ID of the organization |
| `idle_expires_at` | `string` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | `boolean` | Indicates whether the session is valid or not |
| `name` | `string` | The name of the organization |
| `organizations` | `table` | The organizations the user belongs to, and the role slugs they hold within each. |
| `roles` | `table` | The slugs of the roles the user holds within this organization |
| `session_token` | `string` | The session token (JWT) to validate |
| `user_id` | `string` | The ID of the user the session is associated with. |

#### Example: List

```lua
local session_managements, err = client:SessionManagement():list()
```

#### Example: Create

```lua
local session_management, err = client:SessionManagement():create({
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
local third_party, err = client:ThirdParty():load({ state = "state" })
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
| `created_at` | `string` | Time of creation of the the user |
| `emails` | `table` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `table` | The public and unsafe metadata of a user |
| `mfa_config` | `table` |  |
| `name` | `string` |  |
| `passkeys` | `table` |  |
| `picture` | `string` |  |
| `security_keys` | `table` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `table` | The representation of a username of the user |

#### Example: List

```lua
local user_managements, err = client:UserManagement():list()
```

#### Example: Create

```lua
local user_management, err = client:UserManagement():create({
})
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
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
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
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

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
├── schema.lua               -- Generated option + entity specs
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
local jsonwebkey = client:JsonWebKey()
jsonwebkey:list()

-- jsonwebkey:data_get() now returns the jsonwebkey data from the last list
-- jsonwebkey:match_get() returns the last match criteria
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
