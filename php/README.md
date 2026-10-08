# HankoPublic PHP SDK



The PHP SDK for the HankoPublic API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->CredentialCreationOption()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hanko-public-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/hanko-public-sdk
composer config repositories.hanko-public-sdk path ./hanko-public-sdk/php
composer require voxgig-sdk/hanko-public-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key as the `hanko` cookie.

### 1. Create a client

```php
<?php
require_once 'hankopublic_sdk.php';

$client = new HankoPublicSDK([
    "apikey" => getenv("HANKO_PUBLIC_APIKEY"),
]);
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created CredentialCreationOption record.
$created = $client->CredentialCreationOption()->create(["attestation" => "example_attestation", "authenticatorSelection" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $jsonwebkeys = $client->JsonWebKey()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = HankoPublicSDK::test([
    "entity" => ["user" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$user = $client->User()->load(["id" => "test01"]);
print_r($user->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new HankoPublicSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HANKO_PUBLIC_TEST_LIVE=TRUE
HANKO_PUBLIC_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### HankoPublicSDK

```php
require_once 'hankopublic_sdk.php';
$client = new HankoPublicSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = HankoPublicSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### HankoPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CredentialCreationOption` | `($data): CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `($data): CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `($data): EmailEntity` | Create an Email entity instance. |
| `HankoConfiguration` | `($data): HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKey` | `($data): JsonWebKeyEntity` | Create a JsonWebKey entity instance. |
| `Passcode` | `($data): PasscodeEntity` | Create a Passcode entity instance. |
| `Password` | `($data): PasswordEntity` | Create a Password entity instance. |
| `Saml` | `($data): SamlEntity` | Create a Saml entity instance. |
| `SessionManagement` | `($data): SessionManagementEntity` | Create a SessionManagement entity instance. |
| `Status` | `($data): StatusEntity` | Create a Status entity instance. |
| `ThirdParty` | `($data): ThirdPartyEntity` | Create a ThirdParty entity instance. |
| `Token` | `($data): TokenEntity` | Create a Token entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |
| `UserManagement` | `($data): UserManagementEntity` | Create an UserManagement entity instance. |
| `WebAuthn` | `($data): WebAuthnEntity` | Create a WebAuthn entity instance. |
| `WebauthnLogin` | `($data): WebauthnLoginEntity` | Create a WebauthnLogin entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `update` | `($reqdata, $ctrl): mixed` | Update an existing entity, and return it. |
| `remove` | `($reqmatch, $ctrl): mixed` | Remove an entity, and return it marked as deleted. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$credential_creation_option = $client->CredentialCreationOption();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `string` |  |
| `authenticatorSelection` | `array` |  |
| `challenge` | `string` |  |
| `pubKeyCredParams` | `array` |  |
| `rp` | `array` |  |
| `timeout` | `int` |  |
| `user` | `array` |  |

#### Example: Create

```php
$credential_creation_option = $client->CredentialCreationOption()->create([
]);
```


### CredentialRequestOption

Create an instance: `$credential_request_option = $client->CredentialRequestOption();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowCredentials` | `array` |  |
| `challenge` | `string` |  |
| `rpId` | `string` |  |
| `timeout` | `int` |  |
| `userVerification` | `string` |  |
| `user_id` | `string` | The ID of the user on whose behalf WebAuthn login should be performed |

#### Example: Create

```php
$credential_request_option = $client->CredentialRequestOption()->create([
]);
```


### Email

Create an instance: `$email = $client->Email();`

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
| `identities` | `mixed` |  |
| `identity` | `mixed` |  |
| `is_primary` | `bool` | Indicates it's the primary email address. |
| `is_verified` | `bool` | Indicated the email has been verified. |

#### Example: List

```php
// list() returns an array of Email entities, one per record (throws on error).
$emails = $client->Email()->list();
```

#### Example: Create

```php
$email = $client->Email()->create([
    "address" => null, // string
]);
```


### HankoConfiguration

Create an instance: `$hanko_configuration = $client->HankoConfiguration();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `array` | Controls the behavior regarding user account. |
| `emails` | `array` | Controls the behavior regarding email addresses. |
| `password` | `array` | Configuration options concerning passwords |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HankoConfiguration record (throws on error).
$hanko_configuration = $client->HankoConfiguration()->load();
```


### JsonWebKey

Create an instance: `$json_web_key = $client->JsonWebKey();`

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

```php
// list() returns an array of JsonWebKey entities, one per record (throws on error).
$json_web_keys = $client->JsonWebKey()->list();
```


### Passcode

Create an instance: `$passcode = $client->Passcode();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `created_at` | `string` | Time of creation of the passcode |
| `email_id` | `string` | The ID of the email address |
| `id` | `string` | The ID of the passcode |
| `ttl` | `int` | Lifespan of a passcode in seconds |
| `user_id` | `string` | The ID of the user |

#### Example: Create

```php
$passcode = $client->Passcode()->create([
    "user_id" => null, // string
]);
```


### Password

Create an instance: `$password = $client->Password();`

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

```php
$password = $client->Password()->create([
    "password" => null, // string
    "user_id" => null, // string
]);
```


### Saml

Create an instance: `$saml = $client->Saml();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Create

```php
$saml = $client->Saml()->create([
]);
```


### SessionManagement

Create an instance: `$session_management = $client->SessionManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `array` | The claims extracted from a JWT. |
| `expiration_time` | `string` | Date-time indicating the expiration of the session. |
| `idle_expires_at` | `string` | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | `bool` | Indicates whether the session is valid or not |
| `session_token` | `string` | The session token (JWT) to validate |
| `user_id` | `string` | The ID of the user the session is associated with. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SessionManagement record (throws on error).
$session_management = $client->SessionManagement()->load();
```

#### Example: Create

```php
$session_management = $client->SessionManagement()->create([
    "claims" => null, // array
    "session_token" => null, // string
]);
```


### Status

Create an instance: `$status = $client->Status();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Status record (throws on error).
$status = $client->Status()->load();
```


### ThirdParty

Create an instance: `$third_party = $client->ThirdParty();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ThirdParty record (throws on error).
$third_party = $client->ThirdParty()->load(["provider" => "provider", "redirect_to" => "redirect_to"]);
```


### Token

Create an instance: `$token = $client->Token();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `user_id` | `string` | The ID of the user on whose behalf the token was exchanged. |
| `value` | `string` |  |

#### Example: Create

```php
$token = $client->Token()->create([
]);
```


### User

Create an instance: `$user = $client->User();`

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
| `emails` | `array` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `array` | The public and unsafe metadata of a user |
| `mfa_config` | `array` |  |
| `name` | `string` |  |
| `passkeys` | `array` |  |
| `picture` | `string` |  |
| `security_keys` | `array` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `string` | The username of the user |
| `verified` | `bool` |  |
| `webauthn_credentials` | `array` | A list of WebAuthn credentials |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load(["id" => "user_id"]);
```

#### Example: Create

```php
$user = $client->User()->create([
]);
```


### UserManagement

Create an instance: `$user_management = $client->UserManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time of creation of the the user |
| `emails` | `array` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` | The ID of the user. |
| `metadata` | `array` | The public and unsafe metadata of a user |
| `mfa_config` | `array` |  |
| `name` | `string` |  |
| `passkeys` | `array` |  |
| `picture` | `string` |  |
| `security_keys` | `array` |  |
| `updated_at` | `string` | Time of last update of the user |
| `user_id` | `string` | The ID of the user |
| `username` | `array` | The representation of a username of the user |

#### Example: List

```php
// list() returns an array of UserManagement entities, one per record (throws on error).
$user_managements = $client->UserManagement()->list();
```

#### Example: Create

```php
$user_management = $client->UserManagement()->create([
]);
```


### WebAuthn

Create an instance: `$web_authn = $client->WebAuthn();`

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
| `aaguid` | `string` |  |
| `attestation_type` | `string` |  |
| `backup_eligible` | `bool` |  |
| `backup_state` | `bool` |  |
| `created_at` | `string` |  |
| `credential_id` | `string` | The ID of the created credential |
| `id` | `string` |  |
| `last_used_at` | `string` |  |
| `mfa_only` | `bool` |  |
| `name` | `string` | A new credential name. |
| `publickey` | `string` |  |
| `rawId` | `string` |  |
| `response` | `array` |  |
| `transports` | `array` |  |
| `type` | `string` |  |
| `user_id` | `string` | The ID of the user on whose behalf a credential was created |

#### Example: List

```php
// list() returns an array of WebAuthn entities, one per record (throws on error).
$web_authns = $client->WebAuthn()->list();
```

#### Example: Create

```php
$web_authn = $client->WebAuthn()->create([
]);
```


### WebauthnLogin

Create an instance: `$webauthn_login = $client->WebauthnLogin();`

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
| `response` | `array` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```php
$webauthn_login = $client->WebauthnLogin()->create([
]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hankopublic_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hankopublic_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$jsonwebkey = $client->JsonWebKey();
$jsonwebkey->list();

// $jsonwebkey->data_get() now returns the jsonwebkey data from the last list
// $jsonwebkey->match_get() returns the last match criteria
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
