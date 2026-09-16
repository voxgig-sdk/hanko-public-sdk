# HankoPublic TypeScript SDK



The TypeScript SDK for the HankoPublic API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CreateUserResponseObject()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hanko-public-sdk/releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { HankoPublicSDK } from '@voxgig-sdk/hanko-public'

const client = new HankoPublicSDK({
  apikey: process.env.HANKO_PUBLIC_APIKEY,
  // Required: this API's server URL is templated on these.
  server: {
    tenant_id: '<tenant_id>',
  },
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const emails = await client.Email().list()
  console.log(emails)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = HankoPublicSDK.test()

const email = await client.Email().list()
// email is the entity, populated with mock response data
// — call email.data() for the record itself
console.log(email)
```

You can also use the instance method:

```ts
const client = new HankoPublicSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Email()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new HankoPublicSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### HankoPublicSDK

#### Constructor

```ts
new HankoPublicSDK(options?: {
  apikey?: string
  server?: { tenant_id: string }
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `server` | `object` | **Required.** Values for the server-URL variables: `tenant_id`. The API base URL is a template over them. |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CreateUserResponseObject(data?)` | `CreateUserResponseObjectEntity` | Create a CreateUserResponseObject entity instance. |
| `Credential(data?)` | `CredentialEntity` | Create a Credential entity instance. |
| `CredentialCreationOption(data?)` | `CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption(data?)` | `CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email(data?)` | `EmailEntity` | Create an Email entity instance. |
| `EmailManagement(data?)` | `EmailManagementEntity` | Create an EmailManagement entity instance. |
| `HankoConfiguration(data?)` | `HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKeySet(data?)` | `JsonWebKeySetEntity` | Create a JsonWebKeySet entity instance. |
| `Passcode(data?)` | `PasscodeEntity` | Create a Passcode entity instance. |
| `Password(data?)` | `PasswordEntity` | Create a Password entity instance. |
| `Saml(data?)` | `SamlEntity` | Create a Saml entity instance. |
| `SessionManagement(data?)` | `SessionManagementEntity` | Create a SessionManagement entity instance. |
| `Status(data?)` | `StatusEntity` | Create a Status entity instance. |
| `ThirdParty(data?)` | `ThirdPartyEntity` | Create a ThirdParty entity instance. |
| `Token(data?)` | `TokenEntity` | Create a Token entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `UserManagement(data?)` | `UserManagementEntity` | Create an UserManagement entity instance. |
| `WebAuthn(data?)` | `WebAuthnEntity` | Create a WebAuthn entity instance. |
| `WebauthnLogin(data?)` | `WebauthnLoginEntity` | Create a WebauthnLogin entity instance. |
| `tester(testopts?, sdkopts?)` | `HankoPublicSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HankoPublicSDK.test(testopts?, sdkopts?)` | `HankoPublicSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): HankoPublicSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

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

Operations: create.

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

Operations: create.

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

Operations: create, list, remove.

API path: `/emails`

#### EmailManagement

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/emails/{id}/set_primary`

#### HankoConfiguration

| Field | Description |
| --- | --- |
| `account` | Controls the behavior regarding user account. |
| `emails` | Controls the behavior regarding email addresses. |
| `password` | Configuration options concerning passwords |

Operations: load.

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

Operations: list.

API path: `/.well-known/jwks.json`

#### Passcode

| Field | Description |
| --- | --- |
| `code` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | The ID of the email address |
| `id` | The ID of the passcode |
| `user_id` | The ID of the user |

Operations: create.

API path: `/passcode/login/finalize`

#### Password

| Field | Description |
| --- | --- |
| `password` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | The ID of the user to create/set a password for |

Operations: create, update.

API path: `/password/login`

#### Saml

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `amr` | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | The intended audience of the token. |
| `email` | Data about the email address associated with the token's subject, if available. |
| `expiration` | The timestamp indicating when the token will expire. |
| `issued_at` | The timestamp indicating when the token was issued. |
| `issuer` | The entity that issued the token. |
| `session_id` | The unique identifier for the session associated with this token. |
| `session_token` | The session token (JWT) to validate |
| `subject` | The unique identifier of the token's subject. |

Operations: create, load.

API path: `/sessions/validate`

#### Status

| Field | Description |
| --- | --- |

Operations: load.

API path: `/`

#### ThirdParty

| Field | Description |
| --- | --- |

Operations: load.

API path: `/thirdparty/callback`

#### Token

| Field | Description |
| --- | --- |
| `value` |  |

Operations: create.

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

Operations: create, load, remove.

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

Operations: create, list.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `id` |  |
| `name` | A new credential name. |
| `rawId` |  |
| `response` |  |
| `type` |  |

Operations: create, remove, update.

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

Operations: create.

API path: `/webauthn/login/finalize`



## Entities


### CreateUserResponseObject

Create an instance: `const create_user_response_object = client.CreateUserResponseObject()`


### Credential

Create an instance: `const credential = client.Credential()`

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
| `publickey` | `string` |  |
| `transports` | `any[]` |  |

#### Example: List

```ts
const credentials = await client.Credential().list()
```


### CredentialCreationOption

Create an instance: `const credential_creation_option = client.CredentialCreationOption()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `string` |  |
| `authenticatorSelection` | `Record<string, any>` |  |
| `challenge` | `string` |  |
| `pubKeyCredParams` | `any[]` |  |
| `rp` | `Record<string, any>` |  |
| `timeout` | `number` |  |
| `user` | `Record<string, any>` |  |

#### Example: Create

```ts
const credential_creation_option = await client.CredentialCreationOption().create({
})
```


### CredentialRequestOption

Create an instance: `const credential_request_option = client.CredentialRequestOption()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowCredentials` | `any[]` |  |
| `challenge` | `string` |  |
| `rpId` | `string` |  |
| `timeout` | `number` |  |
| `userVerification` | `string` |  |
| `user_id` | `string` | The ID of the user on whose behalf WebAuthn login should be performed |

#### Example: Create

```ts
const credential_request_option = await client.CredentialRequestOption().create({
})
```


### Email

Create an instance: `const email = client.Email()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | The email address |
| `id` | `string` | The ID of the email address |
| `identities` | `any` |  |
| `identity` | `any` |  |
| `is_primary` | `boolean` | Indicates it's the primary email address. |
| `is_verified` | `boolean` | Indicated the email has been verified. |

#### Example: List

```ts
const emails = await client.Email().list()
```

#### Example: Create

```ts
const email = await client.Email().create({
  address: 'example_address',
})
```


### EmailManagement

Create an instance: `const email_management = client.EmailManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```ts
const email_management = await client.EmailManagement().create({
  id: 'example_id',
})
```


### HankoConfiguration

Create an instance: `const hanko_configuration = client.HankoConfiguration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `Record<string, any>` | Controls the behavior regarding user account. |
| `emails` | `Record<string, any>` | Controls the behavior regarding email addresses. |
| `password` | `Record<string, any>` | Configuration options concerning passwords |

#### Example: Load

```ts
const hanko_configuration = await client.HankoConfiguration().load()
```


### JsonWebKeySet

Create an instance: `const json_web_key_set = client.JsonWebKeySet()`

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

```ts
const json_web_key_sets = await client.JsonWebKeySet().list()
```


### Passcode

Create an instance: `const passcode = client.Passcode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `string` | The ID of the email address |
| `id` | `string` | The ID of the passcode |
| `user_id` | `string` | The ID of the user |

#### Example: Create

```ts
const passcode = await client.Passcode().create({
  user_id: 'example_user_id',
})
```


### Password

Create an instance: `const password = client.Password()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `string` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `string` | The ID of the user to create/set a password for |

#### Example: Create

```ts
const password = await client.Password().create({
  password: 'example_password',
  user_id: 'example_user_id',
})
```


### Saml

Create an instance: `const saml = client.Saml()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const saml = await client.Saml().load({ domain: 'domain' })
```

#### Example: Create

```ts
const saml = await client.Saml().create({
})
```


### SessionManagement

Create an instance: `const session_management = client.SessionManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amr` | `any[]` | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `any[]` | The intended audience of the token. |
| `email` | `Record<string, any>` | Data about the email address associated with the token's subject, if available. |
| `expiration` | `string` | The timestamp indicating when the token will expire. |
| `issued_at` | `string` | The timestamp indicating when the token was issued. |
| `issuer` | `string` | The entity that issued the token. |
| `session_id` | `string` | The unique identifier for the session associated with this token. |
| `session_token` | `string` | The session token (JWT) to validate |
| `subject` | `any` | The unique identifier of the token's subject. |

#### Example: Load

```ts
const session_management = await client.SessionManagement().load()
```

#### Example: Create

```ts
const session_management = await client.SessionManagement().create({
  expiration: 'example_expiration',
  session_id: 'example_session_id',
  session_token: 'example_session_token',
  subject: 'example_subject',
})
```


### Status

Create an instance: `const status = client.Status()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const status = await client.Status().load()
```


### ThirdParty

Create an instance: `const third_party = client.ThirdParty()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const third_party = await client.ThirdParty().load({ state: 'state' })
```


### Token

Create an instance: `const token = client.Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `value` | `string` |  |

#### Example: Create

```ts
const token = await client.Token().create({
})
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time of creation of the the user |
| `email` | `string` | The email address of the user |
| `email_id` | `string` | The ID of the newly created email address |
| `emails` | `any[]` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `boolean` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `Record<string, any>` | The public and unsafe metadata of a user |
| `mfa_config` | `Record<string, any>` |  |
| `name` | `string` |  |
| `passkeys` | `any[]` |  |
| `picture` | `string` |  |
| `security_keys` | `any[]` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `string` | The username of the user |
| `verified` | `boolean` |  |
| `webauthn_credentials` | `any[]` | A list of WebAuthn credentials |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```

#### Example: Create

```ts
const user = await client.User().create({
})
```


### UserManagement

Create an instance: `const user_management = client.UserManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time of creation of the the user |
| `emails` | `any[]` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `Record<string, any>` | The public and unsafe metadata of a user |
| `mfa_config` | `Record<string, any>` |  |
| `name` | `string` |  |
| `passkeys` | `any[]` |  |
| `picture` | `string` |  |
| `security_keys` | `any[]` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `Record<string, any>` | The representation of a username of the user |

#### Example: List

```ts
const user_managements = await client.UserManagement().list()
```

#### Example: Create

```ts
const user_management = await client.UserManagement().create({
})
```


### WebAuthn

Create an instance: `const web_authn = client.WebAuthn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` | A new credential name. |
| `rawId` | `string` |  |
| `response` | `Record<string, any>` |  |
| `type` | `string` |  |

#### Example: Create

```ts
const web_authn = await client.WebAuthn().create({
})
```


### WebauthnLogin

Create an instance: `const webauthn_login = client.WebauthnLogin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `rawId` | `string` |  |
| `response` | `Record<string, any>` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```ts
const webauthn_login = await client.WebauthnLogin().create({
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
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

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

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
hanko-public/
├── src/
│   ├── HankoPublicSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HankoPublicSDK } from '@voxgig-sdk/hanko-public'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const email = client.Email()
await email.list()

// email.data() now returns the email data from the last `list`
// email.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
