# HankoPublic Python SDK



The Python SDK for the HankoPublic API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Credential()` — each
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
    "server": {
        "tenant_id": "<tenant_id>",
    },
})
```

### 2. List credential records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    credentials = client.Credential().list()
    for credential in credentials:
        print(credential)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    jsonwebkeys = client.JsonWebKey().list()
    print(jsonwebkeys)
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
jsonwebkey = client.JsonWebKey().list()
# jsonwebkey contains the mock response record
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
| `Credential` | `(data) -> CredentialEntity` | Create a Credential entity instance. |
| `CredentialCreationOption` | `(data) -> CredentialCreationOptionEntity` | Create a CredentialCreationOption entity instance. |
| `CredentialRequestOption` | `(data) -> CredentialRequestOptionEntity` | Create a CredentialRequestOption entity instance. |
| `Email` | `(data) -> EmailEntity` | Create an Email entity instance. |
| `HankoConfiguration` | `(data) -> HankoConfigurationEntity` | Create a HankoConfiguration entity instance. |
| `JsonWebKey` | `(data) -> JsonWebKeyEntity` | Create a JsonWebKey entity instance. |
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

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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
| `email_id` | The ID of the email address |
| `id` | The ID of the passcode |
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
| `amr` | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | The intended audience of the token. |
| `email` | Data about the email address associated with the token's subject, if available. |
| `expiration` | The timestamp indicating when the token will expire. |
| `issued_at` | The timestamp indicating when the token was issued. |
| `issuer` | The entity that issued the token. |
| `session_id` | The unique identifier for the session associated with this token. |
| `session_token` | The session token (JWT) to validate |
| `subject` | The unique identifier of the token's subject. |

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
| `id` |  |
| `name` | A new credential name. |
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
| `publickey` | `str` |  |
| `transports` | `list` |  |

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
| `authenticatorSelection` | `dict` |  |
| `challenge` | `str` |  |
| `pubKeyCredParams` | `list` |  |
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
| `allowCredentials` | `list` |  |
| `challenge` | `str` |  |
| `rpId` | `str` |  |
| `timeout` | `int` |  |
| `userVerification` | `str` |  |
| `user_id` | `str` | The ID of the user on whose behalf WebAuthn login should be performed |

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
| `address` | `str` | The email address |
| `id` | `str` | The ID of the email address |
| `identities` | `Any` |  |
| `identity` | `Any` |  |
| `is_primary` | `bool` | Indicates it's the primary email address. |
| `is_verified` | `bool` | Indicated the email has been verified. |

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


### HankoConfiguration

Create an instance: `hanko_configuration = client.HankoConfiguration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `dict` | Controls the behavior regarding user account. |
| `emails` | `dict` | Controls the behavior regarding email addresses. |
| `password` | `dict` | Configuration options concerning passwords |

#### Example: Load

```python
hanko_configuration = client.HankoConfiguration().load()
```


### JsonWebKey

Create an instance: `json_web_key = client.JsonWebKey()`

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
json_web_keys = client.JsonWebKey().list()
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
| `code` | `str` | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `email_id` | `str` | The ID of the email address |
| `id` | `str` | The ID of the passcode |
| `user_id` | `str` | The ID of the user |

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
| `password` | `str` | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `str` | The ID of the user to create/set a password for |

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

#### Example: Load

```python
saml = client.Saml().load({"domain": "domain"})
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
| `amr` | `list` | Authentication Method References, JSON array of strings that are identifiers for authentication methods used in the authentication. |
| `audience` | `list` | The intended audience of the token. |
| `email` | `dict` | Data about the email address associated with the token's subject, if available. |
| `expiration` | `str` | The timestamp indicating when the token will expire. |
| `issued_at` | `str` | The timestamp indicating when the token was issued. |
| `issuer` | `str` | The entity that issued the token. |
| `session_id` | `str` | The unique identifier for the session associated with this token. |
| `session_token` | `str` | The session token (JWT) to validate |
| `subject` | `Any` | The unique identifier of the token's subject. |

#### Example: Load

```python
session_management = client.SessionManagement().load()
```

#### Example: Create

```python
session_management = client.SessionManagement().create({
    "expiration": "example_expiration",  # str
    "session_id": "example_session_id",  # str
    "session_token": "example_session_token",  # str
    "subject": "example_subject",  # Any
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
third_party = client.ThirdParty().load({"state": "state"})
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
| `created_at` | `str` | Time of creation of the the user |
| `email` | `str` | The email address of the user |
| `email_id` | `str` | The ID of the newly created email address |
| `emails` | `list` |  |
| `family_name` | `str` |  |
| `given_name` | `str` |  |
| `has_webauthn_credential` | `bool` |  |
| `id` | `str` | The ID of the user. |
| `metadata` | `dict` | The public and unsafe metadata of a user |
| `mfa_config` | `dict` |  |
| `name` | `str` |  |
| `passkeys` | `list` |  |
| `picture` | `str` |  |
| `security_keys` | `list` |  |
| `updated_at` | `str` | Time of last update of the user |
| `user_id` | `str` | The ID of the user |
| `username` | `str` | The username of the user |
| `verified` | `bool` |  |
| `webauthn_credentials` | `list` | A list of WebAuthn credentials |

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
| `created_at` | `str` | Time of creation of the the user |
| `emails` | `list` |  |
| `family_name` | `str` |  |
| `given_name` | `str` |  |
| `id` | `str` | The ID of the user. |
| `metadata` | `dict` | The public and unsafe metadata of a user |
| `mfa_config` | `dict` |  |
| `name` | `str` |  |
| `passkeys` | `list` |  |
| `picture` | `str` |  |
| `security_keys` | `list` |  |
| `updated_at` | `str` | Time of last update of the user |
| `user_id` | `str` | The ID of the user |
| `username` | `dict` | The representation of a username of the user |

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
| `id` | `str` |  |
| `name` | `str` | A new credential name. |
| `rawId` | `str` |  |
| `response` | `dict` |  |
| `type` | `str` |  |

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
| `rawId` | `str` |  |
| `response` | `dict` |  |
| `type` | `str` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
webauthn_login = client.WebauthnLogin().create({
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

Features are the extension mechanism. A feature is a Python class
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
├── schema.py                    -- Generated option + entity specs
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
jsonwebkey = client.JsonWebKey()
jsonwebkey.list()

# jsonwebkey.data_get() now returns the jsonwebkey data from the last list
# jsonwebkey.match_get() returns the last match criteria
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
