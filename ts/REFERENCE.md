# HankoPublic TypeScript SDK Reference

Complete API reference for the HankoPublic TypeScript SDK.


## HankoPublicSDK

### Constructor

```ts
new HankoPublicSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HankoPublicSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HankoPublicSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HankoPublicSDK` instance in test mode.


### Instance Methods

#### `CreateUserResponseObject(data?: object)`

Create a new `CreateUserResponseObject` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateUserResponseObjectEntity` instance.

#### `Credential(data?: object)`

Create a new `Credential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CredentialEntity` instance.

#### `CredentialCreationOption(data?: object)`

Create a new `CredentialCreationOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CredentialCreationOptionEntity` instance.

#### `CredentialRequestOption(data?: object)`

Create a new `CredentialRequestOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CredentialRequestOptionEntity` instance.

#### `Email(data?: object)`

Create a new `Email` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailEntity` instance.

#### `EmailManagement(data?: object)`

Create a new `EmailManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailManagementEntity` instance.

#### `HankoConfiguration(data?: object)`

Create a new `HankoConfiguration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HankoConfigurationEntity` instance.

#### `JsonWebKeySet(data?: object)`

Create a new `JsonWebKeySet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JsonWebKeySetEntity` instance.

#### `Passcode(data?: object)`

Create a new `Passcode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PasscodeEntity` instance.

#### `Password(data?: object)`

Create a new `Password` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PasswordEntity` instance.

#### `Saml(data?: object)`

Create a new `Saml` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SamlEntity` instance.

#### `SessionManagement(data?: object)`

Create a new `SessionManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SessionManagementEntity` instance.

#### `Status(data?: object)`

Create a new `Status` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatusEntity` instance.

#### `ThirdParty(data?: object)`

Create a new `ThirdParty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThirdPartyEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `UserManagement(data?: object)`

Create a new `UserManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserManagementEntity` instance.

#### `WebAuthn(data?: object)`

Create a new `WebAuthn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebAuthnEntity` instance.

#### `WebauthnLogin(data?: object)`

Create a new `WebauthnLogin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebauthnLoginEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HankoPublicSDK.test()`.

**Returns:** `HankoPublicSDK` instance in test mode.


---

## CreateUserResponseObjectEntity

```ts
const create_user_response_object = client.CreateUserResponseObject()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateUserResponseObjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CredentialEntity

```ts
const credential = client.Credential()
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
| `transports` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Credential().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CredentialCreationOptionEntity

```ts
const credential_creation_option = client.CredentialCreationOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `string` | No |  |
| `authenticatorSelection` | `Record<string, any>` | No |  |
| `challenge` | `string` | No |  |
| `pubKeyCredParams` | `any[]` | No |  |
| `rp` | `Record<string, any>` | No |  |
| `timeout` | `number` | No |  |
| `user` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CredentialCreationOption().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CredentialCreationOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CredentialRequestOptionEntity

```ts
const credential_request_option = client.CredentialRequestOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowCredentials` | `any[]` | No |  |
| `challenge` | `string` | No |  |
| `rpId` | `string` | No |  |
| `timeout` | `number` | No |  |
| `userVerification` | `string` | No |  |
| `user_id` | `string` | No | The ID of the user on whose behalf WebAuthn login should be performed |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CredentialRequestOption().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CredentialRequestOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailEntity

```ts
const email = client.Email()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Email().create({
  address: 'example_address',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Email().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Email().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailManagementEntity

```ts
const email_management = client.EmailManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `set_primary` | `/emails/{id}/set_primary` | `client.EmailManagement().create({ $action: 'set_primary', ... })` |

An action returns that action's OWN response, which is not necessarily a
EmailManagement record — check the API definition for its shape.

```ts
const result = await client.EmailManagement().create({
  $action: 'set_primary',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EmailManagement().create({
  id: 'example_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HankoConfigurationEntity

```ts
const hanko_configuration = client.HankoConfiguration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `Record<string, any>` | No | Controls the behavior regarding user account. |
| `emails` | `Record<string, any>` | No | Controls the behavior regarding email addresses. |
| `password` | `Record<string, any>` | No | Configuration options concerning passwords |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.HankoConfiguration().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HankoConfigurationEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JsonWebKeySetEntity

```ts
const json_web_key_set = client.JsonWebKeySet()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.JsonWebKeySet().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JsonWebKeySetEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PasscodeEntity

```ts
const passcode = client.Passcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `string` | No | The ID of the email address |
| `id` | `string` | No | The ID of the passcode |
| `user_id` | `string` | Yes | The ID of the user |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Passcode().create({
  user_id: 'example_user_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PasscodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PasswordEntity

```ts
const password = client.Password()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `string` | Yes | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `string` | Yes | The ID of the user to perform a password login for |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `login` | `/password/login` | `client.Password().create({ $action: 'login', ... })` |

An action returns that action's OWN response, which is not necessarily a
Password record — check the API definition for its shape.

```ts
const result = await client.Password().create({
  $action: 'login',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Password().create({
  password: 'example_password',
  user_id: 'example_user_id',
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Password().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PasswordEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SamlEntity

```ts
const saml = client.Saml()
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `callback` | `/saml/callback` | `client.Saml().create({ $action: 'callback', ... })` |
| `metadata` | `/saml/metadata` | `client.Saml().load({ $action: 'metadata', ... })` |
| `provider` | `/saml/provider` | `client.Saml().load({ $action: 'provider', ... })` |

An action returns that action's OWN response, which is not necessarily a
Saml record — check the API definition for its shape.

```ts
const result = await client.Saml().create({
  $action: 'callback',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Saml().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Saml().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SamlEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SessionManagementEntity

```ts
const session_management = client.SessionManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amr` | `any[]` | No | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `any[]` | No | The intended audience of the token. |
| `email` | `Record<string, any>` | No | Data about the email address associated with the token's subject, if available. |
| `expiration` | `string` | Yes | The timestamp indicating when the token will expire. |
| `issued_at` | `string` | No | The timestamp indicating when the token was issued. |
| `issuer` | `string` | No | The entity that issued the token. |
| `session_id` | `string` | Yes | The unique identifier for the session associated with this token. |
| `session_token` | `string` | Yes | The session token (JWT) to validate |
| `subject` | `any` | Yes | The unique identifier of the token's subject. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SessionManagement().create({
  expiration: 'example_expiration',
  session_id: 'example_session_id',
  session_token: 'example_session_token',
  subject: 'example_subject',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SessionManagement().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SessionManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatusEntity

```ts
const status = client.Status()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Status().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThirdPartyEntity

```ts
const third_party = client.ThirdParty()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ThirdParty().load({ state: 'state' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThirdPartyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Token().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `email` | `string` | No | The email address of the user |
| `email_id` | `string` | No | The ID of the newly created email address |
| `emails` | `any[]` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `has_webauthn_credential` | `boolean` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `Record<string, any>` | No | The public and unsafe metadata of a user |
| `mfa_config` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `any[]` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `any[]` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `string` | No | The username of the user |
| `verified` | `boolean` | No |  |
| `webauthn_credentials` | `any[]` | No | A list of WebAuthn credentials |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.User().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load({ id: 'user_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.User().remove({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserManagementEntity

```ts
const user_management = client.UserManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time of creation of the the user |
| `emails` | `any[]` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `id` | `string` | No | The ID of the user. |
| `metadata` | `Record<string, any>` | No | The public and unsafe metadata of a user |
| `mfa_config` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `passkeys` | `any[]` | No |  |
| `picture` | `string` | No |  |
| `security_keys` | `any[]` | No |  |
| `updated_at` | `string` | No | Time of last update of the user |
| `user_id` | `string` | No | The ID of the user |
| `username` | `Record<string, any>` | No | The representation of a username of the user |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UserManagement().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.UserManagement().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebAuthnEntity

```ts
const web_authn = client.WebAuthn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No | A new credential name. |
| `rawId` | `string` | No |  |
| `response` | `Record<string, any>` | No |  |
| `type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.WebAuthn().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.WebAuthn().remove({ id: 'id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.WebAuthn().update({
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebAuthnEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebauthnLoginEntity

```ts
const webauthn_login = client.WebauthnLogin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `string` | No |  |
| `id` | `string` | No |  |
| `rawId` | `string` | No |  |
| `response` | `Record<string, any>` | No |  |
| `type` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.WebauthnLogin().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebauthnLoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `HankoPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new HankoPublicSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

