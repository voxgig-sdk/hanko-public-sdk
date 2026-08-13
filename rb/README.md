# HankoPublic Ruby SDK



The Ruby SDK for the HankoPublic API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CreateUserResponseObject` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hanko-public-sdk/releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "HankoPublic_sdk"

client = HankoPublicSDK.new({
  "apikey" => ENV["HANKO_PUBLIC_APIKEY"],
})
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  credentials = client.Credential.list()
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

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
credential = client.Credential.list()
puts credential
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `HankoPublicError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

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
| `publickey` |  |
| `transports` |  |

Operations: List.

API path: `/webauthn/credentials`

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
| `user_id` |  |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `address` |  |
| `id` |  |
| `identities` |  |
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
| `emails` |  |
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
| `email_id` |  |
| `id` |  |
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
| `birthdate` |  |
| `email` |  |
| `email_verified` |  |
| `family_name` |  |
| `gender` |  |
| `given_name` |  |
| `locale` |  |
| `middle_name` |  |
| `name` |  |
| `nickname` |  |
| `phone` |  |
| `phone_verified` |  |
| `picture` |  |
| `preferred_username` |  |
| `profile` |  |
| `updated_at` |  |
| `website` |  |
| `zone_info` |  |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `amr` |  |
| `audience` |  |
| `email` |  |
| `expiration` |  |
| `issued_at` |  |
| `issuer` |  |
| `session_id` |  |
| `session_token` |  |
| `subject` |  |

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
| `emails` |  |
| `family_name` |  |
| `given_name` |  |
| `has_webauthn_credential` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkeys` |  |
| `picture` |  |
| `security_keys` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |
| `verified` |  |
| `webauthn_credentials` |  |

Operations: Create, Load, Remove.

API path: `/user`

#### UserManagement

| Field | Description |
| --- | --- |
| `created_at` |  |
| `emails` |  |
| `family_name` |  |
| `given_name` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkeys` |  |
| `picture` |  |
| `security_keys` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |

Operations: Create, List.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `rawId` |  |
| `response` |  |
| `type` |  |

Operations: Create, Remove, Update.

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


### CreateUserResponseObject

Create an instance: `create_user_response_object = client.CreateUserResponseObject`


### Credential

Create an instance: `credential = client.Credential`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `String` |  |
| `attestation_type` | `String` |  |
| `backup_eligible` | `Boolean` |  |
| `backup_state` | `Boolean` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `last_used_at` | `String` |  |
| `mfa_only` | `Boolean` |  |
| `name` | `String` |  |
| `publickey` | `String` |  |
| `transports` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Credential records (raises on error).
credentials = client.Credential.list
```


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
| `user_id` | `String` |  |

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
| `address` | `String` |  |
| `id` | `String` |  |
| `identities` | `Object` |  |
| `identity` | `Object` |  |
| `is_primary` | `Boolean` |  |
| `is_verified` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of Email records (raises on error).
emails = client.Email.list
```

#### Example: Create

```ruby
email = client.Email.create({
  "address" => "example_address", # String
})
```


### EmailManagement

Create an instance: `email_management = client.EmailManagement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
email_management = client.EmailManagement.create({
  "id" => "example_id", # String
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
| `account` | `Hash` |  |
| `emails` | `Hash` |  |
| `password` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HankoConfiguration record (raises on error).
hanko_configuration = client.HankoConfiguration.load()
```


### JsonWebKeySet

Create an instance: `json_web_key_set = client.JsonWebKeySet`

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
# list returns an Array of JsonWebKeySet records (raises on error).
json_web_key_sets = client.JsonWebKeySet.list
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
| `code` | `String` |  |
| `email_id` | `String` |  |
| `id` | `String` |  |
| `user_id` | `String` |  |

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
| `password` | `String` |  |
| `user_id` | `String` |  |

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

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `birthdate` | `String` |  |
| `email` | `String` |  |
| `email_verified` | `String` |  |
| `family_name` | `String` |  |
| `gender` | `String` |  |
| `given_name` | `String` |  |
| `locale` | `String` |  |
| `middle_name` | `String` |  |
| `name` | `String` |  |
| `nickname` | `String` |  |
| `phone` | `String` |  |
| `phone_verified` | `String` |  |
| `picture` | `String` |  |
| `preferred_username` | `String` |  |
| `profile` | `String` |  |
| `updated_at` | `String` |  |
| `website` | `String` |  |
| `zone_info` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Saml record (raises on error).
saml = client.Saml.load()
```

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
| `amr` | `Array` |  |
| `audience` | `Array` |  |
| `email` | `Hash` |  |
| `expiration` | `String` |  |
| `issued_at` | `String` |  |
| `issuer` | `String` |  |
| `session_id` | `String` |  |
| `session_token` | `String` |  |
| `subject` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SessionManagement record (raises on error).
session_management = client.SessionManagement.load()
```

#### Example: Create

```ruby
session_management = client.SessionManagement.create({
  "expiration" => "example_expiration", # String
  "session_id" => "example_session_id", # String
  "session_token" => "example_session_token", # String
  "subject" => "example_subject", # Object
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
third_party = client.ThirdParty.load()
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
| `created_at` | `String` |  |
| `email` | `String` |  |
| `email_id` | `String` |  |
| `emails` | `Array` |  |
| `family_name` | `String` |  |
| `given_name` | `String` |  |
| `has_webauthn_credential` | `Boolean` |  |
| `id` | `String` |  |
| `metadata` | `Hash` |  |
| `mfa_config` | `Hash` |  |
| `name` | `String` |  |
| `passkeys` | `Array` |  |
| `picture` | `String` |  |
| `security_keys` | `Array` |  |
| `updated_at` | `String` |  |
| `user_id` | `String` |  |
| `username` | `String` |  |
| `verified` | `Boolean` |  |
| `webauthn_credentials` | `Array` |  |

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
| `created_at` | `String` |  |
| `emails` | `Array` |  |
| `family_name` | `String` |  |
| `given_name` | `String` |  |
| `id` | `String` |  |
| `metadata` | `Hash` |  |
| `mfa_config` | `Hash` |  |
| `name` | `String` |  |
| `passkeys` | `Array` |  |
| `picture` | `String` |  |
| `security_keys` | `Array` |  |
| `updated_at` | `String` |  |
| `user_id` | `String` |  |
| `username` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of UserManagement records (raises on error).
user_managements = client.UserManagement.list
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
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `name` | `String` |  |
| `rawId` | `String` |  |
| `response` | `Hash` |  |
| `type` | `String` |  |

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

- **TestFeature**: In-memory mock transport for testing without a live server

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
credential = client.Credential
credential.list()

# credential.data_get now returns the credential data from the last list
# credential.match_get returns the last match criteria
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
