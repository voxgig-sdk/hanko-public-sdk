# HankoPublic Golang SDK Reference

Complete API reference for the HankoPublic Golang SDK.


## HankoPublicSDK

### Constructor

```go
func NewHankoPublicSDK(options map[string]any) *HankoPublicSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *HankoPublicSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HankoPublicSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `CreateUserResponseObject(data map[string]any) HankoPublicEntity`

Create a new `CreateUserResponseObject` entity instance. Pass `nil` for no initial data.

#### `Credential(data map[string]any) HankoPublicEntity`

Create a new `Credential` entity instance. Pass `nil` for no initial data.

#### `CredentialCreationOption(data map[string]any) HankoPublicEntity`

Create a new `CredentialCreationOption` entity instance. Pass `nil` for no initial data.

#### `CredentialRequestOption(data map[string]any) HankoPublicEntity`

Create a new `CredentialRequestOption` entity instance. Pass `nil` for no initial data.

#### `Email(data map[string]any) HankoPublicEntity`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `EmailManagement(data map[string]any) HankoPublicEntity`

Create a new `EmailManagement` entity instance. Pass `nil` for no initial data.

#### `HankoConfiguration(data map[string]any) HankoPublicEntity`

Create a new `HankoConfiguration` entity instance. Pass `nil` for no initial data.

#### `JsonWebKeySet(data map[string]any) HankoPublicEntity`

Create a new `JsonWebKeySet` entity instance. Pass `nil` for no initial data.

#### `Passcode(data map[string]any) HankoPublicEntity`

Create a new `Passcode` entity instance. Pass `nil` for no initial data.

#### `Password(data map[string]any) HankoPublicEntity`

Create a new `Password` entity instance. Pass `nil` for no initial data.

#### `Saml(data map[string]any) HankoPublicEntity`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `SessionManagement(data map[string]any) HankoPublicEntity`

Create a new `SessionManagement` entity instance. Pass `nil` for no initial data.

#### `Status(data map[string]any) HankoPublicEntity`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `ThirdParty(data map[string]any) HankoPublicEntity`

Create a new `ThirdParty` entity instance. Pass `nil` for no initial data.

#### `Token(data map[string]any) HankoPublicEntity`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) HankoPublicEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `UserManagement(data map[string]any) HankoPublicEntity`

Create a new `UserManagement` entity instance. Pass `nil` for no initial data.

#### `WebAuthn(data map[string]any) HankoPublicEntity`

Create a new `WebAuthn` entity instance. Pass `nil` for no initial data.

#### `WebauthnLogin(data map[string]any) HankoPublicEntity`

Create a new `WebauthnLogin` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CreateUserResponseObjectEntity

```go
createUserResponseObject := client.CreateUserResponseObject(nil)
fmt.Println(createUserResponseObject.GetName()) // "create_user_response_object"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreateUserResponseObjectEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CredentialEntity

```go
credential := client.Credential(nil)
fmt.Println(credential.GetName()) // "credential"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aaguid` | `string` | No |  |
| `attestation_type` | `string` | No |  |
| `backup_eligible` | `bool` | No |  |
| `backup_state` | `bool` | No |  |
| `created_at` | `string` | No |  |
| `id` | `string` | No |  |
| `last_used_at` | `string` | No |  |
| `mfa_only` | `bool` | No |  |
| `name` | `string` | No |  |
| `publickey` | `string` | No |  |
| `transports` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Credential(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CredentialEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CredentialCreationOptionEntity

```go
credentialCreationOption := client.CredentialCreationOption(nil)
fmt.Println(credentialCreationOption.GetName()) // "credential_creation_option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `string` | No |  |
| `authenticatorSelection` | `map[string]any` | No |  |
| `challenge` | `string` | No |  |
| `pubKeyCredParams` | `[]any` | No |  |
| `rp` | `map[string]any` | No |  |
| `timeout` | `int` | No |  |
| `user` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CredentialCreationOption(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CredentialCreationOptionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CredentialRequestOptionEntity

```go
credentialRequestOption := client.CredentialRequestOption(nil)
fmt.Println(credentialRequestOption.GetName()) // "credential_request_option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowCredentials` | `[]any` | No |  |
| `challenge` | `string` | No |  |
| `rpId` | `string` | No |  |
| `timeout` | `int` | No |  |
| `userVerification` | `string` | No |  |
| `user_id` | `string` | No | The ID of the user on whose behalf WebAuthn login should be performed |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CredentialRequestOption(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CredentialRequestOptionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailEntity

```go
email := client.Email(nil)
fmt.Println(email.GetName()) // "email"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes | The email address |
| `id` | `string` | No | The ID of the email address |
| `identities` | `any` | No |  |
| `identity` | `any` | No |  |
| `is_primary` | `bool` | No | Indicates it's the primary email address. |
| `is_verified` | `bool` | No | Indicated the email has been verified. |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Email(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Email(nil).Create(map[string]any{
    "address": "example_address",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Email(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailManagementEntity

```go
emailManagement := client.EmailManagement(nil)
fmt.Println(emailManagement.GetName()) // "email_management"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.EmailManagement(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HankoConfigurationEntity

```go
hankoConfiguration := client.HankoConfiguration(nil)
fmt.Println(hankoConfiguration.GetName()) // "hanko_configuration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `map[string]any` | No | Controls the behavior regarding user account. |
| `emails` | `map[string]any` | No | Controls the behavior regarding email addresses. |
| `password` | `map[string]any` | No | Configuration options concerning passwords |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.HankoConfiguration(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HankoConfigurationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## JsonWebKeySetEntity

```go
jsonWebKeySet := client.JsonWebKeySet(nil)
fmt.Println(jsonWebKeySet.GetName()) // "json_web_key_set"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.JsonWebKeySet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JsonWebKeySetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PasscodeEntity

```go
passcode := client.Passcode(nil)
fmt.Println(passcode.GetName()) // "passcode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `string` | No | The ID of the email address |
| `id` | `string` | No | The ID of the passcode |
| `user_id` | `string` | Yes | The ID of the user |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Passcode(nil).Create(map[string]any{
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PasscodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PasswordEntity

```go
password := client.Password(nil)
fmt.Println(password.GetName()) // "password"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `string` | Yes | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `string` | Yes | The ID of the user to perform a password login for |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Password(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PasswordEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SamlEntity

```go
saml := client.Saml(nil)
fmt.Println(saml.GetName()) // "saml"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Saml(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Saml(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SessionManagementEntity

```go
sessionManagement := client.SessionManagement(nil)
fmt.Println(sessionManagement.GetName()) // "session_management"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amr` | `[]any` | No | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `[]any` | No | The intended audience of the token. |
| `email` | `map[string]any` | No | Data about the email address associated with the token's subject, if available. |
| `expiration` | `string` | Yes | The timestamp indicating when the token will expire. |
| `issued_at` | `string` | No | The timestamp indicating when the token was issued. |
| `issuer` | `string` | No | The entity that issued the token. |
| `session_id` | `string` | Yes | The unique identifier for the session associated with this token. |
| `session_token` | `string` | Yes | The session token (JWT) to validate |
| `subject` | `any` | Yes | The unique identifier of the token's subject. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SessionManagement(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.SessionManagement(nil).Create(map[string]any{
    "expiration": "example_expiration",
    "session_id": "example_session_id",
    "session_token": "example_session_token",
    "subject": "example_subject",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SessionManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatusEntity

```go
status := client.Status(nil)
fmt.Println(status.GetName()) // "status"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Status(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ThirdPartyEntity

```go
thirdParty := client.ThirdParty(nil)
fmt.Println(thirdParty.GetName()) // "third_party"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ThirdParty(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThirdPartyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TokenEntity

```go
token := client.Token(nil)
fmt.Println(token.GetName()) // "token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `email` | `string` | No | The email address of the user |
| `email_id` | `string` | No | The ID of the newly created email address |
| `emails` | `[]any` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `has_webauthn_credential` | `bool` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `map[string]any` | No | The public and unsafe metadata of a user |
| `mfa_config` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `[]any` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `[]any` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `string` | No | The username of the user |
| `verified` | `bool` | No |  |
| `webauthn_credentials` | `[]any` | No | A list of WebAuthn credentials |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.User(nil).Remove(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserManagementEntity

```go
userManagement := client.UserManagement(nil)
fmt.Println(userManagement.GetName()) // "user_management"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `emails` | `[]any` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `map[string]any` | No | The public and unsafe metadata of a user |
| `mfa_config` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `[]any` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `[]any` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `map[string]any` | No | The representation of a username of the user |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.UserManagement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.UserManagement(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebAuthnEntity

```go
webAuthn := client.WebAuthn(nil)
fmt.Println(webAuthn.GetName()) // "web_authn"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No | A new credential name. |
| `rawId` | `string` | No |  |
| `response` | `map[string]any` | No |  |
| `type` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.WebAuthn(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.WebAuthn(nil).Update(map[string]any{
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.WebAuthn(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebAuthnEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebauthnLoginEntity

```go
webauthnLogin := client.WebauthnLogin(nil)
fmt.Println(webauthnLogin.GetName()) // "webauthn_login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `string` | No |  |
| `id` | `string` | No |  |
| `rawId` | `string` | No |  |
| `response` | `map[string]any` | No |  |
| `type` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.WebauthnLogin(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebauthnLoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewHankoPublicSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

