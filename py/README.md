# HankoPublic Python SDK



The Python SDK for the HankoPublic API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CreateUserResponseObject()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hanko-public-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from hankopublic_sdk import HankoPublicSDK

client = HankoPublicSDK({
    "apikey": os.environ.get("HANKO_PUBLIC_APIKEY"),
})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    jsonwebkeysets = client.JsonWebKeySet().list()
    print(jsonwebkeysets)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HankoPublicSDK.test()

# Entity ops return the bare record and raise on error.
jsonwebkeyset = client.JsonWebKeySet().list()
# jsonwebkeyset contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HankoPublicSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### HankoPublicSDK

```python
from hankopublic_sdk import HankoPublicSDK

client = HankoPublicSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HankoPublicSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HankoPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `create_user_response_object = client.CreateUserResponseObject()`


### Credential

Create an instance: `credential = client.Credential()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aaguid` | `str` |  |
| `attestation_type` | `str` |  |
| `backup_eligible` | `bool` |  |
| `backup_state` | `bool` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `last_used_at` | `str` |  |
| `mfa_only` | `bool` |  |
| `name` | `str` |  |
| `public_key` | `str` |  |
| `transport` | `list` |  |

#### Example: List

```python
credentials = client.Credential().list()
```


### CredentialCreationOption

Create an instance: `credential_creation_option = client.CredentialCreationOption()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attestation` | `str` |  |
| `authenticator_selection` | `dict` |  |
| `challenge` | `str` |  |
| `pub_key_cred_param` | `list` |  |
| `rp` | `dict` |  |
| `timeout` | `int` |  |
| `user` | `dict` |  |

#### Example: Create

```python
credential_creation_option = client.CredentialCreationOption().create({
})
```


### CredentialRequestOption

Create an instance: `credential_request_option = client.CredentialRequestOption()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allow_credential` | `list` |  |
| `challenge` | `str` |  |
| `rp_id` | `str` |  |
| `timeout` | `int` |  |
| `user_id` | `str` |  |
| `user_verification` | `str` |  |

#### Example: Create

```python
credential_request_option = client.CredentialRequestOption().create({
})
```


### Email

Create an instance: `email = client.Email()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `id` | `str` |  |
| `identity` | `Any` |  |
| `is_primary` | `bool` |  |
| `is_verified` | `bool` |  |

#### Example: List

```python
emails = client.Email().list()
```

#### Example: Create

```python
email = client.Email().create({
    "address": "example_address",  # str
})
```


### EmailManagement

Create an instance: `email_management = client.EmailManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
email_management = client.EmailManagement().create({
    "id": "example_id",  # str
})
```


### HankoConfiguration

Create an instance: `hanko_configuration = client.HankoConfiguration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `dict` |  |
| `email` | `dict` |  |
| `password` | `dict` |  |

#### Example: Load

```python
hanko_configuration = client.HankoConfiguration().load()
```


### JsonWebKeySet

Create an instance: `json_web_key_set = client.JsonWebKeySet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alg` | `str` |  |
| `e` | `str` |  |
| `kid` | `str` |  |
| `kty` | `str` |  |
| `n` | `str` |  |
| `use` | `str` |  |

#### Example: List

```python
json_web_key_sets = client.JsonWebKeySet().list()
```


### Passcode

Create an instance: `passcode = client.Passcode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `created_at` | `str` |  |
| `email_id` | `str` |  |
| `id` | `str` |  |
| `ttl` | `int` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
passcode = client.Passcode().create({
    "user_id": "example_user_id",  # str
})
```


### Password

Create an instance: `password = client.Password()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `str` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
password = client.Password().create({
    "password": "example_password",  # str
    "user_id": "example_user_id",  # str
})
```


### Saml

Create an instance: `saml = client.Saml()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute_map` | `dict` |  |
| `domain` | `str` |  |
| `enabled` | `bool` |  |
| `metadata_url` | `str` |  |
| `name` | `str` |  |
| `skip_email_verification` | `bool` |  |

#### Example: Load

```python
saml = client.Saml().load()
```

#### Example: Create

```python
saml = client.Saml().create({
})
```


### SessionManagement

Create an instance: `session_management = client.SessionManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claim` | `dict` |  |
| `expiration_time` | `str` |  |
| `idle_expires_at` | `str` |  |
| `is_valid` | `bool` |  |
| `session_token` | `str` |  |
| `user_id` | `str` |  |

#### Example: Load

```python
session_management = client.SessionManagement().load()
```

#### Example: Create

```python
session_management = client.SessionManagement().create({
    "claim": {},  # dict
    "session_token": "example_session_token",  # str
})
```


### Status

Create an instance: `status = client.Status()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
status = client.Status().load()
```


### ThirdParty

Create an instance: `third_party = client.ThirdParty()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
third_party = client.ThirdParty().load()
```


### Token

Create an instance: `token = client.Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `value` | `str` |  |

#### Example: Create

```python
token = client.Token().create({
})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `email` | `list` |  |
| `email_id` | `str` |  |
| `family_name` | `str` |  |
| `given_name` | `str` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `str` |  |
| `metadata` | `dict` |  |
| `mfa_config` | `dict` |  |
| `name` | `str` |  |
| `passkey` | `list` |  |
| `picture` | `str` |  |
| `security_key` | `list` |  |
| `updated_at` | `str` |  |
| `user_id` | `str` |  |
| `username` | `str` |  |
| `verified` | `bool` |  |
| `webauthn_credential` | `list` |  |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```

#### Example: Create

```python
user = client.User().create({
})
```


### UserManagement

Create an instance: `user_management = client.UserManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `email` | `list` |  |
| `family_name` | `str` |  |
| `given_name` | `str` |  |
| `id` | `str` |  |
| `metadata` | `dict` |  |
| `mfa_config` | `dict` |  |
| `name` | `str` |  |
| `passkey` | `list` |  |
| `picture` | `str` |  |
| `security_key` | `list` |  |
| `updated_at` | `str` |  |
| `user_id` | `str` |  |
| `username` | `dict` |  |

#### Example: List

```python
user_managements = client.UserManagement().list()
```

#### Example: Create

```python
user_management = client.UserManagement().create({
})
```


### WebAuthn

Create an instance: `web_authn = client.WebAuthn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `raw_id` | `str` |  |
| `response` | `dict` |  |
| `type` | `str` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
web_authn = client.WebAuthn().create({
})
```


### WebauthnLogin

Create an instance: `webauthn_login = client.WebauthnLogin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_id` | `str` |  |
| `id` | `str` |  |
| `raw_id` | `str` |  |
| `response` | `dict` |  |
| `type` | `str` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
webauthn_login = client.WebauthnLogin().create({
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── hankopublic_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`hankopublic_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
jsonwebkeyset = client.JsonWebKeySet()
jsonwebkeyset.list()

# jsonwebkeyset.data_get() now returns the jsonwebkeyset data from the last list
# jsonwebkeyset.match_get() returns the last match criteria
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
