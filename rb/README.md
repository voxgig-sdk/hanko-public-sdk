# HankoPublic Ruby SDK



The Ruby SDK for the HankoPublic API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CredentialCreationOption` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hanko-public-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/hanko-public-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-hanko-public-sdk", path: "./hanko-public-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key as the `hanko` cookie.

### 1. Create a client

```ruby
require_relative "HankoPublic_sdk"

client = HankoPublicSDK.new({
  "apikey" => ENV["HANKO_PUBLIC_APIKEY"],
})
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created CredentialCreationOption record.
created = client.CredentialCreationOption.create({ "attestation" => "example_attestation", "authenticatorSelection" => {} })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  jsonwebkeys = client.JsonWebKey.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = HankoPublicSDK.test

# list returns an Array of JsonWebKey entities, one per mock record (raises on
# error); data_get reads each record.
jsonwebkeys = client.JsonWebKey.list()
jsonwebkeys.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = HankoPublicSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### HankoPublicSDK

```ruby
require_relative "HankoPublic_sdk"
client = HankoPublicSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = HankoPublicSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HankoPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `CredentialCreationOption` | `(data) -> CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `(data) -> CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `(data) -> EmailEntity` | Create an Email entity instance. |
| `HankoConfiguration` | `(data) -> HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKey` | `(data) -> JsonWebKeyEntity` | Create a JsonWebKey entity instance. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`HankoPublicError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### CredentialCreationOption

| Field | Description |
| --- | --- |
| `attestation` |  |
| `authenticatorSelection` |  |
| `challenge` |  |
| `pubKeyCredParams` |  |
| `rp` |  |
| `timeout` |  |
| `user` |  |

Operations: Create.

API path: `/webauthn/registration/initialize`

#### CredentialRequestOption

| Field | Description |
| --- | --- |
| `allowCredentials` |  |
| `challenge` |  |
| `rpId` |  |
| `timeout` |  |
| `userVerification` |  |
| `user_id` | The ID of the user on whose behalf WebAuthn login should be performed |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `address` | The email address |
| `id` | The ID of the email address |
| `identities` |  |
| `identity` |  |
| `is_primary` | Indicates it's the primary email address. |
| `is_verified` | Indicated the email has been verified. |

Operations: Create, List, Remove.

API path: `/emails/{id}/set_primary`

#### HankoConfiguration

| Field | Description |
| --- | --- |
| `account` | Controls the behavior regarding user account. |
| `emails` | Controls the behavior regarding email addresses. |
| `password` | Configuration options concerning passwords |

Operations: Load.

API path: `/.well-known/config`

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

#### Passcode

| Field | Description |
| --- | --- |
| `code` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `created_at` | Time of creation of the passcode |
| `email_id` | The ID of the email address |
| `id` | The ID of the passcode |
| `ttl` | Lifespan of a passcode in seconds |
| `user_id` | The ID of the user |

Operations: Create.

API path: `/passcode/login/finalize`

#### Password

| Field | Description |
| --- | --- |
| `password` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | The ID of the user to create/set a password for |

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
| `claims` | The claims extracted from a JWT. |
| `expiration_time` | Date-time indicating the expiration of the session. |
| `idle_expires_at` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | Indicates whether the session is valid or not |
| `session_token` | The session token (JWT) to validate |
| `user_id` | The ID of the user the session is associated with. |

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
| `user_id` | The ID of the user on whose behalf the token was exchanged. |
| `value` |  |

Operations: Create.

API path: `/token`

#### User

| Field | Description |
| --- | --- |
| `created_at` | Time of creation of the the user |
| `email` | The email address of the user |
| `email_id` | The ID of the newly created email address |
| `emails` |  |
| `family_name` |  |
| `given_name` |  |
| `has_webauthn_credential` |  |
| `id` | The ID of the user. |
| `metadata` | The public and unsafe metadata of a user |
| `mfa_config` |  |
| `name` |  |
| `passkeys` |  |
| `picture` |  |
| `security_keys` |  |
| `updated_at` | Time of last update of the user |
| `user_id` | The ID of the user |
| `username` | The username of the user |
| `verified` |  |
| `webauthn_credentials` | A list of WebAuthn credentials |

Operations: Create, Load, Remove.

API path: `/user`

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

#### WebAuthn

| Field | Description |
| --- | --- |
| `aaguid` |  |
| `attestation_type` |  |
| `backup_eligible` |  |
| `backup_state` |  |
| `created_at` |  |
| `credential_id` | The ID of the created credential |
| `id` |  |
| `last_used_at` |  |
| `mfa_only` |  |
| `name` | A new credential name. |
| `publickey` |  |
| `rawId` |  |
| `response` |  |
| `transports` |  |
| `type` |  |
| `user_id` | The ID of the user on whose behalf a credential was created |

Operations: Create, List, Remove, Update.

API path: `/webauthn/registration/finalize`

#### WebauthnLogin

| Field | Description |
| --- | --- |
| `credential_id` |  |
| `id` |  |
| `rawId` |  |
| `response` |  |
| `type` |  |
| `user_id` |  |

Operations: Create.

API path: `/webauthn/login/finalize`



## Entities


### CredentialCreationOption

Create an instance: `credential_creation_option = client.CredentialCreationOption`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `String` |  |
| `authenticatorSelection` | `Hash` |  |
| `challenge` | `String` |  |
| `pubKeyCredParams` | `Array` |  |
| `rp` | `Hash` |  |
| `timeout` | `Integer` |  |
| `user` | `Hash` |  |

#### Example: Create

```ruby
credential_creation_option = client.CredentialCreationOption.create({
})
```


### CredentialRequestOption

Create an instance: `credential_request_option = client.CredentialRequestOption`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowCredentials` | `Array` |  |
| `challenge` | `String` |  |
| `rpId` | `String` |  |
| `timeout` | `Integer` |  |
| `userVerification` | `String` |  |
| `user_id` | `String` | The ID of the user on whose behalf WebAuthn login should be performed |

#### Example: Create

```ruby
credential_request_option = client.CredentialRequestOption.create({
})
```


### Email

Create an instance: `email = client.Email`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` | The email address |
| `id` | `String` | The ID of the email address |
| `identities` | `Object` |  |
| `identity` | `Object` |  |
| `is_primary` | `Boolean` | Indicates it's the primary email address. |
| `is_verified` | `Boolean` | Indicated the email has been verified. |

#### Example: List

```ruby
# list returns an Array of Email entities, one per record (raises on error).
emails = client.Email.list
emails.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
email = client.Email.create({
  "address" => "example_address", # String
})
```


### HankoConfiguration

Create an instance: `hanko_configuration = client.HankoConfiguration`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `Hash` | Controls the behavior regarding user account. |
| `emails` | `Hash` | Controls the behavior regarding email addresses. |
| `password` | `Hash` | Configuration options concerning passwords |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HankoConfiguration record (raises on error).
hanko_configuration = client.HankoConfiguration.load()
```


### JsonWebKey

Create an instance: `json_web_key = client.JsonWebKey`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alg` | `String` |  |
| `e` | `String` |  |
| `kid` | `String` |  |
| `kty` | `String` |  |
| `n` | `String` |  |
| `use` | `String` |  |

#### Example: List

```ruby
# list returns an Array of JsonWebKey entities, one per record (raises on error).
json_web_keys = client.JsonWebKey.list
json_web_keys.each { |item| puts item.data_get }
```


### Passcode

Create an instance: `passcode = client.Passcode`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `created_at` | `String` | Time of creation of the passcode |
| `email_id` | `String` | The ID of the email address |
| `id` | `String` | The ID of the passcode |
| `ttl` | `Integer` | Lifespan of a passcode in seconds |
| `user_id` | `String` | The ID of the user |

#### Example: Create

```ruby
passcode = client.Passcode.create({
  "user_id" => "example_user_id", # String
})
```


### Password

Create an instance: `password = client.Password`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `String` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `String` | The ID of the user to create/set a password for |

#### Example: Create

```ruby
password = client.Password.create({
  "password" => "example_password", # String
  "user_id" => "example_user_id", # String
})
```


### Saml

Create an instance: `saml = client.Saml`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Create

```ruby
saml = client.Saml.create({
})
```


### SessionManagement

Create an instance: `session_management = client.SessionManagement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `Hash` | The claims extracted from a JWT. |
| `expiration_time` | `String` | Date-time indicating the expiration of the session. |
| `idle_expires_at` | `String` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | `Boolean` | Indicates whether the session is valid or not |
| `session_token` | `String` | The session token (JWT) to validate |
| `user_id` | `String` | The ID of the user the session is associated with. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SessionManagement record (raises on error).
session_management = client.SessionManagement.load()
```

#### Example: Create

```ruby
session_management = client.SessionManagement.create({
  "claims" => {}, # Hash
  "session_token" => "example_session_token", # String
})
```


### Status

Create an instance: `status = client.Status`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Status record (raises on error).
status = client.Status.load()
```


### ThirdParty

Create an instance: `third_party = client.ThirdParty`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ThirdParty record (raises on error).
third_party = client.ThirdParty.load({ "provider" => "provider", "redirect_to" => "redirect_to" })
```


### Token

Create an instance: `token = client.Token`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `user_id` | `String` | The ID of the user on whose behalf the token was exchanged. |
| `value` | `String` |  |

#### Example: Create

```ruby
token = client.Token.create({
})
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Time of creation of the the user |
| `email` | `String` | The email address of the user |
| `email_id` | `String` | The ID of the newly created email address |
| `emails` | `Array` |  |
| `family_name` | `String` |  |
| `given_name` | `String` |  |
| `has_webauthn_credential` | `Boolean` |  |
| `id` | `String` | The ID of the user. |
| `metadata` | `Hash` | The public and unsafe metadata of a user |
| `mfa_config` | `Hash` |  |
| `name` | `String` |  |
| `passkeys` | `Array` |  |
| `picture` | `String` |  |
| `security_keys` | `Array` |  |
| `updated_at` | `String` | Time of last update of the user |
| `user_id` | `String` | The ID of the user |
| `username` | `String` | The username of the user |
| `verified` | `Boolean` |  |
| `webauthn_credentials` | `Array` | A list of WebAuthn credentials |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the User record (raises on error).
user = client.User.load({ "id" => "user_id" })
```

#### Example: Create

```ruby
user = client.User.create({
})
```


### UserManagement

Create an instance: `user_management = client.UserManagement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Time of creation of the the user |
| `emails` | `Array` |  |
| `family_name` | `String` |  |
| `given_name` | `String` |  |
| `id` | `String` | The ID of the user. |
| `metadata` | `Hash` | The public and unsafe metadata of a user |
| `mfa_config` | `Hash` |  |
| `name` | `String` |  |
| `passkeys` | `Array` |  |
| `picture` | `String` |  |
| `security_keys` | `Array` |  |
| `updated_at` | `String` | Time of last update of the user |
| `user_id` | `String` | The ID of the user |
| `username` | `Hash` | The representation of a username of the user |

#### Example: List

```ruby
# list returns an Array of UserManagement entities, one per record (raises on error).
user_managements = client.UserManagement.list
user_managements.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
user_management = client.UserManagement.create({
})
```


### WebAuthn

Create an instance: `web_authn = client.WebAuthn`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `String` |  |
| `attestation_type` | `String` |  |
| `backup_eligible` | `Boolean` |  |
| `backup_state` | `Boolean` |  |
| `created_at` | `String` |  |
| `credential_id` | `String` | The ID of the created credential |
| `id` | `String` |  |
| `last_used_at` | `String` |  |
| `mfa_only` | `Boolean` |  |
| `name` | `String` | A new credential name. |
| `publickey` | `String` |  |
| `rawId` | `String` |  |
| `response` | `Hash` |  |
| `transports` | `Array` |  |
| `type` | `String` |  |
| `user_id` | `String` | The ID of the user on whose behalf a credential was created |

#### Example: List

```ruby
# list returns an Array of WebAuthn entities, one per record (raises on error).
web_authns = client.WebAuthn.list
web_authns.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
web_authn = client.WebAuthn.create({
})
```


### WebauthnLogin

Create an instance: `webauthn_login = client.WebauthnLogin`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `String` |  |
| `id` | `String` |  |
| `rawId` | `String` |  |
| `response` | `Hash` |  |
| `type` | `String` |  |
| `user_id` | `String` |  |

#### Example: Create

```ruby
webauthn_login = client.WebauthnLogin.create({
})
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── HankoPublic_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`HankoPublic_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
jsonwebkey = client.JsonWebKey
jsonwebkey.list()

# jsonwebkey.data_get now returns the jsonwebkey data from the last list
# jsonwebkey.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
