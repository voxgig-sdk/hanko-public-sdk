# HankoPublic Lua SDK Reference

Complete API reference for the HankoPublic Lua SDK.


## HankoPublicSDK

### Constructor

```lua
local sdk = require("hanko-public_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `CreateUserResponseObject(data)`

Create a new `CreateUserResponseObject` entity instance. Pass `nil` for no initial data.

#### `Credential(data)`

Create a new `Credential` entity instance. Pass `nil` for no initial data.

#### `CredentialCreationOption(data)`

Create a new `CredentialCreationOption` entity instance. Pass `nil` for no initial data.

#### `CredentialRequestOption(data)`

Create a new `CredentialRequestOption` entity instance. Pass `nil` for no initial data.

#### `Email(data)`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `EmailManagement(data)`

Create a new `EmailManagement` entity instance. Pass `nil` for no initial data.

#### `HankoConfiguration(data)`

Create a new `HankoConfiguration` entity instance. Pass `nil` for no initial data.

#### `JsonWebKeySet(data)`

Create a new `JsonWebKeySet` entity instance. Pass `nil` for no initial data.

#### `Passcode(data)`

Create a new `Passcode` entity instance. Pass `nil` for no initial data.

#### `Password(data)`

Create a new `Password` entity instance. Pass `nil` for no initial data.

#### `Saml(data)`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `SessionManagement(data)`

Create a new `SessionManagement` entity instance. Pass `nil` for no initial data.

#### `Status(data)`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `ThirdParty(data)`

Create a new `ThirdParty` entity instance. Pass `nil` for no initial data.

#### `Token(data)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `UserManagement(data)`

Create a new `UserManagement` entity instance. Pass `nil` for no initial data.

#### `WebAuthn(data)`

Create a new `WebAuthn` entity instance. Pass `nil` for no initial data.

#### `WebauthnLogin(data)`

Create a new `WebauthnLogin` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CreateUserResponseObjectEntity

```lua
local create_user_response_object = client:CreateUserResponseObject(nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateUserResponseObjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CredentialEntity

```lua
local credential = client:Credential(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aaguid` | `string` | No |  |
| `attestation_type` | `string` | No |  |
| `backup_eligible` | `boolean` | No |  |
| `backup_state` | `boolean` | No |  |
| `created_at` | `string` | No |  |
| `id` | `string` | No |  |
| `last_used_at` | `string` | No |  |
| `mfa_only` | `boolean` | No |  |
| `name` | `string` | No |  |
| `publickey` | `string` | No |  |
| `transports` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Credential():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CredentialCreationOptionEntity

```lua
local credential_creation_option = client:CredentialCreationOption(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `string` | No |  |
| `authenticatorSelection` | `table` | No |  |
| `challenge` | `string` | No |  |
| `pubKeyCredParams` | `table` | No |  |
| `rp` | `table` | No |  |
| `timeout` | `number` | No |  |
| `user` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CredentialCreationOption():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialCreationOptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CredentialRequestOptionEntity

```lua
local credential_request_option = client:CredentialRequestOption(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowCredentials` | `table` | No |  |
| `challenge` | `string` | No |  |
| `rpId` | `string` | No |  |
| `timeout` | `number` | No |  |
| `userVerification` | `string` | No |  |
| `user_id` | `string` | No | The ID of the user on whose behalf WebAuthn login should be performed |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CredentialRequestOption():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialRequestOptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailEntity

```lua
local email = client:Email(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes | The email address |
| `id` | `string` | No | The ID of the email address |
| `identities` | `any` | No |  |
| `identity` | `any` | No |  |
| `is_primary` | `boolean` | No | Indicates it's the primary email address. |
| `is_verified` | `boolean` | No | Indicated the email has been verified. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Email():create({
  address = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Email():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Email():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailManagementEntity

```lua
local email_management = client:EmailManagement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:EmailManagement():create({
  id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HankoConfigurationEntity

```lua
local hanko_configuration = client:HankoConfiguration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `table` | No | Controls the behavior regarding user account. |
| `emails` | `table` | No | Controls the behavior regarding email addresses. |
| `password` | `table` | No | Configuration options concerning passwords |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:HankoConfiguration():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HankoConfigurationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JsonWebKeySetEntity

```lua
local json_web_key_set = client:JsonWebKeySet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alg` | `string` | No |  |
| `e` | `string` | No |  |
| `kid` | `string` | No |  |
| `kty` | `string` | No |  |
| `n` | `string` | No |  |
| `use` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:JsonWebKeySet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JsonWebKeySetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PasscodeEntity

```lua
local passcode = client:Passcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `string` | No | The ID of the email address |
| `id` | `string` | No | The ID of the passcode |
| `user_id` | `string` | Yes | The ID of the user |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Passcode():create({
  user_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PasscodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PasswordEntity

```lua
local password = client:Password(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `string` | Yes | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `string` | Yes | The ID of the user to perform a password login for |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Password():create({
  password = --[[ string ]],
  user_id = --[[ string ]],
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Password():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PasswordEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SamlEntity

```lua
local saml = client:Saml(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birthdate` | `string` | No |  |
| `email` | `string` | No |  |
| `email_verified` | `string` | No |  |
| `family_name` | `string` | No |  |
| `gender` | `string` | No |  |
| `given_name` | `string` | No |  |
| `locale` | `string` | No |  |
| `middle_name` | `string` | No |  |
| `name` | `string` | No |  |
| `nickname` | `string` | No |  |
| `phone` | `string` | No |  |
| `phone_verified` | `string` | No |  |
| `picture` | `string` | No |  |
| `preferred_username` | `string` | No |  |
| `profile` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `website` | `string` | No |  |
| `zone_info` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Saml():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Saml():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SessionManagementEntity

```lua
local session_management = client:SessionManagement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amr` | `table` | No | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `table` | No | The intended audience of the token. |
| `email` | `table` | No | Data about the email address associated with the token's subject, if available. |
| `expiration` | `string` | Yes | The timestamp indicating when the token will expire. |
| `issued_at` | `string` | No | The timestamp indicating when the token was issued. |
| `issuer` | `string` | No | The entity that issued the token. |
| `session_id` | `string` | Yes | The unique identifier for the session associated with this token. |
| `session_token` | `string` | Yes | The session token (JWT) to validate |
| `subject` | `any` | Yes | The unique identifier of the token's subject. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:SessionManagement():create({
  expiration = --[[ string ]],
  session_id = --[[ string ]],
  session_token = --[[ string ]],
  subject = --[[ any ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SessionManagement():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SessionManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StatusEntity

```lua
local status = client:Status(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Status():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThirdPartyEntity

```lua
local third_party = client:ThirdParty(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ThirdParty():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThirdPartyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TokenEntity

```lua
local token = client:Token(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Token():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `email` | `string` | No | The email address of the user |
| `email_id` | `string` | No | The ID of the newly created email address |
| `emails` | `table` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `has_webauthn_credential` | `boolean` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `table` | No | The public and unsafe metadata of a user |
| `mfa_config` | `table` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `table` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `table` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `string` | No | The username of the user |
| `verified` | `boolean` | No |  |
| `webauthn_credentials` | `table` | No | A list of WebAuthn credentials |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:User():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load({ id = "user_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:User():remove({ id = "user_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserManagementEntity

```lua
local user_management = client:UserManagement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `emails` | `table` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `table` | No | The public and unsafe metadata of a user |
| `mfa_config` | `table` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `table` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `table` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `table` | No | The representation of a username of the user |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:UserManagement():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:UserManagement():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebAuthnEntity

```lua
local web_authn = client:WebAuthn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No | A new credential name. |
| `rawId` | `string` | No |  |
| `response` | `table` | No |  |
| `type` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:WebAuthn():create({
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:WebAuthn():remove({ id = "id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:WebAuthn():update({
  id = "id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebAuthnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebauthnLoginEntity

```lua
local webauthn_login = client:WebauthnLogin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `string` | No |  |
| `id` | `string` | No |  |
| `rawId` | `string` | No |  |
| `response` | `table` | No |  |
| `type` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:WebauthnLogin():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebauthnLoginEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

