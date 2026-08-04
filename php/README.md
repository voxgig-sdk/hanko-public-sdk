# HankoPublic PHP SDK



The PHP SDK for the HankoPublic API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->CreateUserResponseObject()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hanko-public-sdk/releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hankopublic_sdk.php';

$client = new HankoPublicSDK([
    "apikey" => getenv("HANKO_PUBLIC_APIKEY"),
]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $jsonwebkeysets = $client->JsonWebKeySet()->list();
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

Create a mock client for unit testing — no server required:

```php
$client = HankoPublicSDK::test();

// Entity ops return the bare mock record (throws on error).
$jsonwebkeyset = $client->JsonWebKeySet()->list();
print_r($jsonwebkeyset);
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
| `CreateUserResponseObject` | `($data): CreateUserResponseObjectEntity` | Create a CreateUserResponseObject entity instance. |
| `Credential` | `($data): CredentialEntity` | Create a Credential entity instance. |
| `CredentialCreationOption` | `($data): CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `($data): CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `($data): EmailEntity` | Create an Email entity instance. |
| `EmailManagement` | `($data): EmailManagementEntity` | Create an EmailManagement entity instance. |
| `HankoConfiguration` | `($data): HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKeySet` | `($data): JsonWebKeySetEntity` | Create a JsonWebKeySet entity instance. |
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
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

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
| `public_key` |  |
| `transport` |  |

Operations: List.

API path: `/webauthn/credentials`

#### CredentialCreationOption

| Field | Description |
| --- | --- |
| `attestation` |  |
| `authenticator_selection` |  |
| `challenge` |  |
| `pub_key_cred_param` |  |
| `rp` |  |
| `timeout` |  |
| `user` |  |

Operations: Create.

API path: `/webauthn/registration/initialize`

#### CredentialRequestOption

| Field | Description |
| --- | --- |
| `allow_credential` |  |
| `challenge` |  |
| `rp_id` |  |
| `timeout` |  |
| `user_id` |  |
| `user_verification` |  |

Operations: Create.

API path: `/webauthn/login/initialize`

#### Email

| Field | Description |
| --- | --- |
| `address` |  |
| `id` |  |
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
| `email` |  |
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
| `created_at` |  |
| `email_id` |  |
| `id` |  |
| `ttl` |  |
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
| `attribute_map` |  |
| `domain` |  |
| `enabled` |  |
| `metadata_url` |  |
| `name` |  |
| `skip_email_verification` |  |

Operations: Create, Load.

API path: `/saml/callback`

#### SessionManagement

| Field | Description |
| --- | --- |
| `claim` |  |
| `expiration_time` |  |
| `idle_expires_at` |  |
| `is_valid` |  |
| `session_token` |  |
| `user_id` |  |

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
| `family_name` |  |
| `given_name` |  |
| `has_webauthn_credential` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkey` |  |
| `picture` |  |
| `security_key` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |
| `verified` |  |
| `webauthn_credential` |  |

Operations: Create, Load, Remove.

API path: `/user`

#### UserManagement

| Field | Description |
| --- | --- |
| `created_at` |  |
| `email` |  |
| `family_name` |  |
| `given_name` |  |
| `id` |  |
| `metadata` |  |
| `mfa_config` |  |
| `name` |  |
| `passkey` |  |
| `picture` |  |
| `security_key` |  |
| `updated_at` |  |
| `user_id` |  |
| `username` |  |

Operations: Create, List.

API path: `/logout`

#### WebAuthn

| Field | Description |
| --- | --- |
| `credential_id` |  |
| `id` |  |
| `name` |  |
| `raw_id` |  |
| `response` |  |
| `type` |  |
| `user_id` |  |

Operations: Create, Remove, Update.

API path: `/webauthn/registration/finalize`

#### WebauthnLogin

| Field | Description |
| --- | --- |
| `credential_id` |  |
| `id` |  |
| `raw_id` |  |
| `response` |  |
| `type` |  |
| `user_id` |  |

Operations: Create.

API path: `/webauthn/login/finalize`



## Entities


### CreateUserResponseObject

Create an instance: `$create_user_response_object = $client->CreateUserResponseObject();`


### Credential

Create an instance: `$credential = $client->Credential();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `string` |  |
| `attestation_type` | `string` |  |
| `backup_eligible` | `bool` |  |
| `backup_state` | `bool` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `string` |  |
| `mfa_only` | `bool` |  |
| `name` | `string` |  |
| `public_key` | `string` |  |
| `transport` | `array` |  |

#### Example: List

```php
// list() returns an array of Credential records (throws on error).
$credentials = $client->Credential()->list();
```


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
| `authenticator_selection` | `array` |  |
| `challenge` | `string` |  |
| `pub_key_cred_param` | `array` |  |
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
| `allow_credential` | `array` |  |
| `challenge` | `string` |  |
| `rp_id` | `string` |  |
| `timeout` | `int` |  |
| `user_id` | `string` |  |
| `user_verification` | `string` |  |

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
| `address` | `string` |  |
| `id` | `string` |  |
| `identity` | `mixed` |  |
| `is_primary` | `bool` |  |
| `is_verified` | `bool` |  |

#### Example: List

```php
// list() returns an array of Email records (throws on error).
$emails = $client->Email()->list();
```

#### Example: Create

```php
$email = $client->Email()->create([
    "address" => null, // string
]);
```


### EmailManagement

Create an instance: `$email_management = $client->EmailManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$email_management = $client->EmailManagement()->create([
    "id" => null, // string
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
| `account` | `array` |  |
| `email` | `array` |  |
| `password` | `array` |  |

#### Example: Load

```php
// load() returns the bare HankoConfiguration record (throws on error).
$hanko_configuration = $client->HankoConfiguration()->load();
```


### JsonWebKeySet

Create an instance: `$json_web_key_set = $client->JsonWebKeySet();`

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
// list() returns an array of JsonWebKeySet records (throws on error).
$json_web_key_sets = $client->JsonWebKeySet()->list();
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
| `code` | `string` |  |
| `created_at` | `string` |  |
| `email_id` | `string` |  |
| `id` | `string` |  |
| `ttl` | `int` |  |
| `user_id` | `string` |  |

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
| `password` | `string` |  |
| `user_id` | `string` |  |

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

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute_map` | `array` |  |
| `domain` | `string` |  |
| `enabled` | `bool` |  |
| `metadata_url` | `string` |  |
| `name` | `string` |  |
| `skip_email_verification` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Saml record (throws on error).
$saml = $client->Saml()->load();
```

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
| `claim` | `array` |  |
| `expiration_time` | `string` |  |
| `idle_expires_at` | `string` |  |
| `is_valid` | `bool` |  |
| `session_token` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```php
// load() returns the bare SessionManagement record (throws on error).
$session_management = $client->SessionManagement()->load();
```

#### Example: Create

```php
$session_management = $client->SessionManagement()->create([
    "claim" => null, // array
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
// load() returns the bare Status record (throws on error).
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
// load() returns the bare ThirdParty record (throws on error).
$third_party = $client->ThirdParty()->load();
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
| `created_at` | `string` |  |
| `email` | `array` |  |
| `email_id` | `string` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `string` |  |
| `metadata` | `array` |  |
| `mfa_config` | `array` |  |
| `name` | `string` |  |
| `passkey` | `array` |  |
| `picture` | `string` |  |
| `security_key` | `array` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `string` |  |
| `verified` | `bool` |  |
| `webauthn_credential` | `array` |  |

#### Example: Load

```php
// load() returns the bare User record (throws on error).
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
| `created_at` | `string` |  |
| `email` | `array` |  |
| `family_name` | `string` |  |
| `given_name` | `string` |  |
| `id` | `string` |  |
| `metadata` | `array` |  |
| `mfa_config` | `array` |  |
| `name` | `string` |  |
| `passkey` | `array` |  |
| `picture` | `string` |  |
| `security_key` | `array` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `username` | `array` |  |

#### Example: List

```php
// list() returns an array of UserManagement records (throws on error).
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
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `raw_id` | `string` |  |
| `response` | `array` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

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
| `raw_id` | `string` |  |
| `response` | `array` |  |
| `type` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```php
$webauthn_login = $client->WebauthnLogin()->create([
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
$jsonwebkeyset = $client->JsonWebKeySet();
$jsonwebkeyset->list();

// $jsonwebkeyset->data_get() now returns the jsonwebkeyset data from the last list
// $jsonwebkeyset->match_get() returns the last match criteria
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
