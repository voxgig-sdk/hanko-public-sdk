# HankoPublic Ruby SDK Reference

Complete API reference for the HankoPublic Ruby SDK.


## HankoPublicSDK

### Constructor

```ruby
require_relative 'HankoPublic_sdk'

client = HankoPublicSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HankoPublicSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = HankoPublicSDK.test
```


### Instance Methods

#### `CreateUserResponseObject(data = nil)`

Create a new `CreateUserResponseObject` entity instance. Pass `nil` for no initial data.

#### `Credential(data = nil)`

Create a new `Credential` entity instance. Pass `nil` for no initial data.

#### `CredentialCreationOption(data = nil)`

Create a new `CredentialCreationOption` entity instance. Pass `nil` for no initial data.

#### `CredentialRequestOption(data = nil)`

Create a new `CredentialRequestOption` entity instance. Pass `nil` for no initial data.

#### `Email(data = nil)`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `EmailManagement(data = nil)`

Create a new `EmailManagement` entity instance. Pass `nil` for no initial data.

#### `HankoConfiguration(data = nil)`

Create a new `HankoConfiguration` entity instance. Pass `nil` for no initial data.

#### `JsonWebKeySet(data = nil)`

Create a new `JsonWebKeySet` entity instance. Pass `nil` for no initial data.

#### `Passcode(data = nil)`

Create a new `Passcode` entity instance. Pass `nil` for no initial data.

#### `Password(data = nil)`

Create a new `Password` entity instance. Pass `nil` for no initial data.

#### `Saml(data = nil)`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `SessionManagement(data = nil)`

Create a new `SessionManagement` entity instance. Pass `nil` for no initial data.

#### `Status(data = nil)`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `ThirdParty(data = nil)`

Create a new `ThirdParty` entity instance. Pass `nil` for no initial data.

#### `Token(data = nil)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `UserManagement(data = nil)`

Create a new `UserManagement` entity instance. Pass `nil` for no initial data.

#### `WebAuthn(data = nil)`

Create a new `WebAuthn` entity instance. Pass `nil` for no initial data.

#### `WebauthnLogin(data = nil)`

Create a new `WebauthnLogin` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CreateUserResponseObjectEntity

```ruby
create_user_response_object = client.CreateUserResponseObject
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreateUserResponseObjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CredentialEntity

```ruby
credential = client.Credential
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aaguid` | `String` | No |  |
| `attestation_type` | `String` | No |  |
| `backup_eligible` | `Boolean` | No |  |
| `backup_state` | `Boolean` | No |  |
| `created_at` | `String` | No |  |
| `id` | `String` | No |  |
| `last_used_at` | `String` | No |  |
| `mfa_only` | `Boolean` | No |  |
| `name` | `String` | No |  |
| `publickey` | `String` | No |  |
| `transports` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Credential.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CredentialEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CredentialCreationOptionEntity

```ruby
credential_creation_option = client.CredentialCreationOption
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `String` | No |  |
| `authenticatorSelection` | `Hash` | No |  |
| `challenge` | `String` | No |  |
| `pubKeyCredParams` | `Array` | No |  |
| `rp` | `Hash` | No |  |
| `timeout` | `Integer` | No |  |
| `user` | `Hash` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CredentialCreationOption.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CredentialCreationOptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CredentialRequestOptionEntity

```ruby
credential_request_option = client.CredentialRequestOption
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowCredentials` | `Array` | No |  |
| `challenge` | `String` | No |  |
| `rpId` | `String` | No |  |
| `timeout` | `Integer` | No |  |
| `userVerification` | `String` | No |  |
| `user_id` | `String` | No | The ID of the user on whose behalf WebAuthn login should be performed |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CredentialRequestOption.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CredentialRequestOptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailEntity

```ruby
email = client.Email
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | Yes | The email address |
| `id` | `String` | No | The ID of the email address |
| `identities` | `Object` | No |  |
| `identity` | `Object` | No |  |
| `is_primary` | `Boolean` | No | Indicates it's the primary email address. |
| `is_verified` | `Boolean` | No | Indicated the email has been verified. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `address` | Yes | - | - |
| `id` | - | - | - |
| `identities` | - | - | - |
| `identity` | - | - | - |
| `is_primary` | - | - | - |
| `is_verified` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Email.create({
  "address" => "example_address", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Email.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Email.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailManagementEntity

```ruby
email_management = client.EmailManagement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.EmailManagement.create({
  "id" => "example_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailManagementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HankoConfigurationEntity

```ruby
hanko_configuration = client.HankoConfiguration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `Hash` | No | Controls the behavior regarding user account. |
| `emails` | `Hash` | No | Controls the behavior regarding email addresses. |
| `password` | `Hash` | No | Configuration options concerning passwords |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.HankoConfiguration.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HankoConfigurationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JsonWebKeySetEntity

```ruby
json_web_key_set = client.JsonWebKeySet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alg` | `String` | No |  |
| `e` | `String` | No |  |
| `kid` | `String` | No |  |
| `kty` | `String` | No |  |
| `n` | `String` | No |  |
| `use` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.JsonWebKeySet.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JsonWebKeySetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PasscodeEntity

```ruby
passcode = client.Passcode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | No | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `String` | No | The ID of the email address |
| `id` | `String` | No | The ID of the passcode |
| `user_id` | `String` | Yes | The ID of the user |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Passcode.create({
  "user_id" => "example_user_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PasscodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PasswordEntity

```ruby
password = client.Password
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `String` | Yes | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `String` | Yes | The ID of the user to perform a password login for |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Password.create({
  "password" => "example_password", # String
  "user_id" => "example_user_id", # String
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Password.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PasswordEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SamlEntity

```ruby
saml = client.Saml
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birthdate` | `String` | No |  |
| `email` | `String` | No |  |
| `email_verified` | `String` | No |  |
| `family_name` | `String` | No |  |
| `gender` | `String` | No |  |
| `given_name` | `String` | No |  |
| `locale` | `String` | No |  |
| `middle_name` | `String` | No |  |
| `name` | `String` | No |  |
| `nickname` | `String` | No |  |
| `phone` | `String` | No |  |
| `phone_verified` | `String` | No |  |
| `picture` | `String` | No |  |
| `preferred_username` | `String` | No |  |
| `profile` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `website` | `String` | No |  |
| `zone_info` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Saml.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Saml.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SessionManagementEntity

```ruby
session_management = client.SessionManagement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amr` | `Array` | No | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `Array` | No | The intended audience of the token. |
| `email` | `Hash` | No | Data about the email address associated with the token's subject, if available. |
| `expiration` | `String` | Yes | The timestamp indicating when the token will expire. |
| `issued_at` | `String` | No | The timestamp indicating when the token was issued. |
| `issuer` | `String` | No | The entity that issued the token. |
| `session_id` | `String` | Yes | The unique identifier for the session associated with this token. |
| `session_token` | `String` | Yes | The session token (JWT) to validate |
| `subject` | `Object` | Yes | The unique identifier of the token's subject. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.SessionManagement.create({
  "expiration" => "example_expiration", # String
  "session_id" => "example_session_id", # String
  "session_token" => "example_session_token", # String
  "subject" => "example_subject", # Object
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SessionManagement.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SessionManagementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatusEntity

```ruby
status = client.Status
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Status.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThirdPartyEntity

```ruby
third_party = client.ThirdParty
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ThirdParty.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThirdPartyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TokenEntity

```ruby
token = client.Token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Token.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | Time of creation of the the user |
| `email` | `String` | No | The email address of the user |
| `email_id` | `String` | No | The ID of the newly created email address |
| `emails` | `Array` | No |  |
| `family_name` | `String` | No |  |
| `given_name` | `String` | No |  |
| `has_webauthn_credential` | `Boolean` | No |  |
| `id` | `String` | No | The ID of the user. |
| `metadata` | `Hash` | No | The public and unsafe metadata of a user |
| `mfa_config` | `Hash` | No |  |
| `name` | `String` | No |  |
| `passkeys` | `Array` | No |  |
| `picture` | `String` | No |  |
| `security_keys` | `Array` | No |  |
| `updated_at` | `String` | No | Time of last update of the user |
| `user_id` | `String` | No | The ID of the user |
| `username` | `String` | No | The username of the user |
| `verified` | `Boolean` | No |  |
| `webauthn_credentials` | `Array` | No | A list of WebAuthn credentials |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `email` | - | Yes | - |
| `email_id` | - | - | - |
| `emails` | - | - | - |
| `family_name` | - | - | - |
| `given_name` | - | - | - |
| `has_webauthn_credential` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `mfa_config` | - | - | - |
| `name` | - | - | - |
| `passkeys` | - | - | - |
| `picture` | - | - | - |
| `security_keys` | - | - | - |
| `updated_at` | - | - | - |
| `user_id` | - | - | - |
| `username` | - | - | - |
| `verified` | - | - | - |
| `webauthn_credentials` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.User.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.User.load({ "id" => "user_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.User.remove({ "id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserManagementEntity

```ruby
user_management = client.UserManagement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | Time of creation of the the user |
| `emails` | `Array` | No |  |
| `family_name` | `String` | No |  |
| `given_name` | `String` | No |  |
| `id` | `String` | No | The ID of the user. |
| `metadata` | `Hash` | No | The public and unsafe metadata of a user |
| `mfa_config` | `Hash` | No |  |
| `name` | `String` | No |  |
| `passkeys` | `Array` | No |  |
| `picture` | `String` | No |  |
| `security_keys` | `Array` | No |  |
| `updated_at` | `String` | No | Time of last update of the user |
| `user_id` | `String` | No | The ID of the user |
| `username` | `Hash` | No | The representation of a username of the user |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.UserManagement.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.UserManagement.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserManagementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebAuthnEntity

```ruby
web_authn = client.WebAuthn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `name` | `String` | No | A new credential name. |
| `rawId` | `String` | No |  |
| `response` | `Hash` | No |  |
| `type` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.WebAuthn.create({
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.WebAuthn.remove({ "id" => "id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.WebAuthn.update({
  "id" => "id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebAuthnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebauthnLoginEntity

```ruby
webauthn_login = client.WebauthnLogin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `String` | No |  |
| `id` | `String` | No |  |
| `rawId` | `String` | No |  |
| `response` | `Hash` | No |  |
| `type` | `String` | No |  |
| `user_id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.WebauthnLogin.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebauthnLoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = HankoPublicSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

