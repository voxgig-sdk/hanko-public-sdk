# HankoPublic PHP SDK Reference

Complete API reference for the HankoPublic PHP SDK.


## HankoPublicSDK

### Constructor

```php
require_once __DIR__ . '/hankopublic_sdk.php';

$client = new HankoPublicSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HankoPublicSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = HankoPublicSDK::test();
```


### Instance Methods

#### `CreateUserResponseObject($data = null)`

Create a new `CreateUserResponseObjectEntity` instance. Pass `null` for no initial data.

#### `Credential($data = null)`

Create a new `CredentialEntity` instance. Pass `null` for no initial data.

#### `CredentialCreationOption($data = null)`

Create a new `CredentialCreationOptionEntity` instance. Pass `null` for no initial data.

#### `CredentialRequestOption($data = null)`

Create a new `CredentialRequestOptionEntity` instance. Pass `null` for no initial data.

#### `Email($data = null)`

Create a new `EmailEntity` instance. Pass `null` for no initial data.

#### `EmailManagement($data = null)`

Create a new `EmailManagementEntity` instance. Pass `null` for no initial data.

#### `HankoConfiguration($data = null)`

Create a new `HankoConfigurationEntity` instance. Pass `null` for no initial data.

#### `JsonWebKeySet($data = null)`

Create a new `JsonWebKeySetEntity` instance. Pass `null` for no initial data.

#### `Passcode($data = null)`

Create a new `PasscodeEntity` instance. Pass `null` for no initial data.

#### `Password($data = null)`

Create a new `PasswordEntity` instance. Pass `null` for no initial data.

#### `Saml($data = null)`

Create a new `SamlEntity` instance. Pass `null` for no initial data.

#### `SessionManagement($data = null)`

Create a new `SessionManagementEntity` instance. Pass `null` for no initial data.

#### `Status($data = null)`

Create a new `StatusEntity` instance. Pass `null` for no initial data.

#### `ThirdParty($data = null)`

Create a new `ThirdPartyEntity` instance. Pass `null` for no initial data.

#### `Token($data = null)`

Create a new `TokenEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `UserManagement($data = null)`

Create a new `UserManagementEntity` instance. Pass `null` for no initial data.

#### `WebAuthn($data = null)`

Create a new `WebAuthnEntity` instance. Pass `null` for no initial data.

#### `WebauthnLogin($data = null)`

Create a new `WebauthnLoginEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): HankoPublicUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CreateUserResponseObjectEntity

```php
$create_user_response_object = $client->CreateUserResponseObject();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreateUserResponseObjectEntity`

Create a new `CreateUserResponseObjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CredentialEntity

```php
$credential = $client->Credential();
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
| `public_key` | `string` | No |  |
| `transport` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Credential()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CredentialEntity`

Create a new `CredentialEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CredentialCreationOptionEntity

```php
$credential_creation_option = $client->CredentialCreationOption();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `string` | No |  |
| `authenticator_selection` | `array` | No |  |
| `challenge` | `string` | No |  |
| `pub_key_cred_param` | `array` | No |  |
| `rp` | `array` | No |  |
| `timeout` | `int` | No |  |
| `user` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CredentialCreationOption()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CredentialCreationOptionEntity`

Create a new `CredentialCreationOptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CredentialRequestOptionEntity

```php
$credential_request_option = $client->CredentialRequestOption();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allow_credential` | `array` | No |  |
| `challenge` | `string` | No |  |
| `rp_id` | `string` | No |  |
| `timeout` | `int` | No |  |
| `user_id` | `string` | No |  |
| `user_verification` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CredentialRequestOption()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CredentialRequestOptionEntity`

Create a new `CredentialRequestOptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailEntity

```php
$email = $client->Email();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `id` | `string` | No |  |
| `identity` | `mixed` | No |  |
| `is_primary` | `bool` | No |  |
| `is_verified` | `bool` | No |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `address` | Yes | - | - |
| `id` | - | - | - |
| `identity` | - | - | - |
| `is_primary` | - | - | - |
| `is_verified` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Email()->create([
  "address" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Email()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Email()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailEntity`

Create a new `EmailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailManagementEntity

```php
$email_management = $client->EmailManagement();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->EmailManagement()->create([
  "id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailManagementEntity`

Create a new `EmailManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HankoConfigurationEntity

```php
$hanko_configuration = $client->HankoConfiguration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `array` | No |  |
| `email` | `array` | No |  |
| `password` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->HankoConfiguration()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HankoConfigurationEntity`

Create a new `HankoConfigurationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JsonWebKeySetEntity

```php
$json_web_key_set = $client->JsonWebKeySet();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->JsonWebKeySet()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JsonWebKeySetEntity`

Create a new `JsonWebKeySetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PasscodeEntity

```php
$passcode = $client->Passcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No |  |
| `created_at` | `string` | No |  |
| `email_id` | `string` | No |  |
| `id` | `string` | No |  |
| `ttl` | `int` | No |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Passcode()->create([
  "user_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PasscodeEntity`

Create a new `PasscodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PasswordEntity

```php
$password = $client->Password();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Password()->create([
  "password" => null, // string
  "user_id" => null, // string
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Password()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PasswordEntity`

Create a new `PasswordEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SamlEntity

```php
$saml = $client->Saml();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute_map` | `array` | No |  |
| `domain` | `string` | No |  |
| `enabled` | `bool` | No |  |
| `metadata_url` | `string` | No |  |
| `name` | `string` | No |  |
| `skip_email_verification` | `bool` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Saml()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Saml()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SamlEntity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SessionManagementEntity

```php
$session_management = $client->SessionManagement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claim` | `array` | Yes |  |
| `expiration_time` | `string` | No |  |
| `idle_expires_at` | `string` | No |  |
| `is_valid` | `bool` | No |  |
| `session_token` | `string` | Yes |  |
| `user_id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->SessionManagement()->create([
  "claim" => null, // array
  "session_token" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SessionManagement()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SessionManagementEntity`

Create a new `SessionManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatusEntity

```php
$status = $client->Status();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Status()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatusEntity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThirdPartyEntity

```php
$third_party = $client->ThirdParty();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ThirdParty()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThirdPartyEntity`

Create a new `ThirdPartyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TokenEntity

```php
$token = $client->Token();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Token()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TokenEntity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `email` | `array` | No |  |
| `email_id` | `string` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `has_webauthn_credential` | `bool` | No |  |
| `id` | `string` | No |  |
| `metadata` | `array` | No |  |
| `mfa_config` | `array` | No |  |
| `name` | `string` | No |  |
| `passkey` | `array` | No |  |
| `picture` | `string` | No |  |
| `security_key` | `array` | No |  |
| `updated_at` | `string` | No |  |
| `user_id` | `string` | No |  |
| `username` | `string` | No |  |
| `verified` | `bool` | No |  |
| `webauthn_credential` | `array` | No |  |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `email` | - | Yes | - |
| `email_id` | - | - | - |
| `family_name` | - | - | - |
| `given_name` | - | - | - |
| `has_webauthn_credential` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `mfa_config` | - | - | - |
| `name` | - | - | - |
| `passkey` | - | - | - |
| `picture` | - | - | - |
| `security_key` | - | - | - |
| `updated_at` | - | - | - |
| `user_id` | - | - | - |
| `username` | - | - | - |
| `verified` | - | - | - |
| `webauthn_credential` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->User()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->User()->remove(["id" => "user_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserManagementEntity

```php
$user_management = $client->UserManagement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `email` | `array` | No |  |
| `family_name` | `string` | No |  |
| `given_name` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `array` | No |  |
| `mfa_config` | `array` | No |  |
| `name` | `string` | No |  |
| `passkey` | `array` | No |  |
| `picture` | `string` | No |  |
| `security_key` | `array` | No |  |
| `updated_at` | `string` | No |  |
| `user_id` | `string` | No |  |
| `username` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UserManagement()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->UserManagement()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserManagementEntity`

Create a new `UserManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebAuthnEntity

```php
$web_authn = $client->WebAuthn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `raw_id` | `string` | No |  |
| `response` | `array` | No |  |
| `type` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->WebAuthn()->create([
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->WebAuthn()->remove(["id" => "id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->WebAuthn()->update([
  "id" => "id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebAuthnEntity`

Create a new `WebAuthnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebauthnLoginEntity

```php
$webauthn_login = $client->WebauthnLogin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `string` | No |  |
| `id` | `string` | No |  |
| `raw_id` | `string` | No |  |
| `response` | `array` | No |  |
| `type` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->WebauthnLogin()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebauthnLoginEntity`

Create a new `WebauthnLoginEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new HankoPublicSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

