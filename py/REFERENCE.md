# HankoPublic Python SDK Reference

Complete API reference for the HankoPublic Python SDK.


## HankoPublicSDK

### Constructor

```python
from hankopublic_sdk import HankoPublicSDK

client = HankoPublicSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HankoPublicSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HankoPublicSDK.test()
```


### Instance Methods

#### `CredentialCreationOption(data=None)`

Create a new `CredentialCreationOptionEntity` instance. Pass `None` for no initial data.

#### `CredentialRequestOption(data=None)`

Create a new `CredentialRequestOptionEntity` instance. Pass `None` for no initial data.

#### `Email(data=None)`

Create a new `EmailEntity` instance. Pass `None` for no initial data.

#### `HankoConfiguration(data=None)`

Create a new `HankoConfigurationEntity` instance. Pass `None` for no initial data.

#### `JsonWebKey(data=None)`

Create a new `JsonWebKeyEntity` instance. Pass `None` for no initial data.

#### `Passcode(data=None)`

Create a new `PasscodeEntity` instance. Pass `None` for no initial data.

#### `Password(data=None)`

Create a new `PasswordEntity` instance. Pass `None` for no initial data.

#### `Saml(data=None)`

Create a new `SamlEntity` instance. Pass `None` for no initial data.

#### `SessionManagement(data=None)`

Create a new `SessionManagementEntity` instance. Pass `None` for no initial data.

#### `Status(data=None)`

Create a new `StatusEntity` instance. Pass `None` for no initial data.

#### `ThirdParty(data=None)`

Create a new `ThirdPartyEntity` instance. Pass `None` for no initial data.

#### `Token(data=None)`

Create a new `TokenEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `UserManagement(data=None)`

Create a new `UserManagementEntity` instance. Pass `None` for no initial data.

#### `WebAuthn(data=None)`

Create a new `WebAuthnEntity` instance. Pass `None` for no initial data.

#### `WebauthnLogin(data=None)`

Create a new `WebauthnLoginEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CredentialCreationOptionEntity

```python
credential_creation_option = client.CredentialCreationOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attestation` | `str` | No |  |
| `authenticatorSelection` | `dict` | No |  |
| `challenge` | `str` | No |  |
| `pubKeyCredParams` | `list` | No |  |
| `rp` | `dict` | No |  |
| `timeout` | `int` | No |  |
| `user` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> CredentialCreationOptionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CredentialCreationOption().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialCreationOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CredentialRequestOptionEntity

```python
credential_request_option = client.CredentialRequestOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowCredentials` | `list` | No |  |
| `challenge` | `str` | No |  |
| `rpId` | `str` | No |  |
| `timeout` | `int` | No |  |
| `userVerification` | `str` | No |  |
| `user_id` | `str` | No | The ID of the user on whose behalf WebAuthn login should be performed |

### Operations

#### `create(reqdata, ctrl=None) -> CredentialRequestOptionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CredentialRequestOption().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialRequestOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailEntity

```python
email = client.Email()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes | The email address |
| `id` | `str` | No | The ID of the email address |
| `identities` | `Any` | No |  |
| `identity` | `Any` | No |  |
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

#### `create(reqdata, ctrl=None) -> EmailEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Email().create({
    "address": "example_address",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EmailEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Email().list()
for email in results:
    print(email.data_get())
```

#### `remove(reqmatch, ctrl=None) -> EmailEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Email().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HankoConfigurationEntity

```python
hanko_configuration = client.HankoConfiguration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `dict` | No | Controls the behavior regarding user account. |
| `emails` | `dict` | No | Controls the behavior regarding email addresses. |
| `password` | `dict` | No | Configuration options concerning passwords |

### Operations

#### `load(reqmatch, ctrl=None) -> HankoConfigurationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HankoConfiguration().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HankoConfigurationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JsonWebKeyEntity

```python
json_web_key = client.JsonWebKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alg` | `str` | No |  |
| `e` | `str` | No |  |
| `kid` | `str` | No |  |
| `kty` | `str` | No |  |
| `n` | `str` | No |  |
| `use` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[JsonWebKeyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.JsonWebKey().list()
for json_web_key in results:
    print(json_web_key.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JsonWebKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PasscodeEntity

```python
passcode = client.Passcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits |
| `created_at` | `str` | No | Time of creation of the passcode |
| `email_id` | `str` | No | The ID of the email address |
| `id` | `str` | No | The ID of the passcode |
| `ttl` | `int` | No | Lifespan of a passcode in seconds |
| `user_id` | `str` | Yes | The ID of the user |

### Operations

#### `create(reqdata, ctrl=None) -> PasscodeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Passcode().create({
    "user_id": "example_user_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PasscodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PasswordEntity

```python
password = client.Password()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `str` | Yes | The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option. |
| `user_id` | `str` | Yes | The ID of the user to create/set a password for |

### Operations

#### `create(reqdata, ctrl=None) -> PasswordEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Password().create({
    "password": "example_password",  # str
    "user_id": "example_user_id",  # str
})
```

#### `update(reqdata, ctrl=None) -> PasswordEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Password().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PasswordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SamlEntity

```python
saml = client.Saml()
```

### Operations

#### `create(reqdata, ctrl=None) -> SamlEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Saml().create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl=None) -> SamlEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SamlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SessionManagementEntity

```python
session_management = client.SessionManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `dict` | Yes | The claims extracted from a JWT. |
| `expiration_time` | `str` | No | Date-time indicating the expiration of the session. |
| `idle_expires_at` | `str` | No | Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. |
| `is_valid` | `bool` | No | Indicates whether the session is valid or not |
| `session_token` | `str` | Yes | The session token (JWT) to validate |
| `user_id` | `str` | No | The ID of the user the session is associated with. |

### Operations

#### `create(reqdata, ctrl=None) -> SessionManagementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.SessionManagement().create({
    "claims": {},  # dict
    "session_token": "example_session_token",  # str
})
```

#### `load(reqmatch, ctrl=None) -> SessionManagementEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SessionManagement().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SessionManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatusEntity

```python
status = client.Status()
```

### Operations

#### `load(reqmatch, ctrl=None) -> StatusEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Status().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThirdPartyEntity

```python
third_party = client.ThirdParty()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ThirdPartyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ThirdParty().load({"provider": "provider", "redirect_to": "redirect_to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThirdPartyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TokenEntity

```python
token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | `str` | No | The ID of the user on whose behalf the token was exchanged. |
| `value` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> TokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Token().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Time of creation of the the user |
| `email` | `str` | No | The email address of the user |
| `email_id` | `str` | No | The ID of the newly created email address |
| `emails` | `list` | No |  |
| `family_name` | `str` | No |  |
| `given_name` | `str` | No |  |
| `has_webauthn_credential` | `bool` | No |  |
| `id` | `str` | No | The ID of the user. |
| `metadata` | `dict` | No | The public and unsafe metadata of a user |
| `mfa_config` | `dict` | No |  |
| `name` | `str` | No |  |
| `passkeys` | `list` | No |  |
| `picture` | `str` | No |  |
| `security_keys` | `list` | No |  |
| `updated_at` | `str` | No | Time of last update of the user |
| `user_id` | `str` | No | The ID of the user |
| `username` | `str` | No | The username of the user |
| `verified` | `bool` | No |  |
| `webauthn_credentials` | `list` | No | A list of WebAuthn credentials |

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

#### `create(reqdata, ctrl=None) -> UserEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.User().create({
})
```

#### `load(reqmatch, ctrl=None) -> UserEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> UserEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.User().remove({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserManagementEntity

```python
user_management = client.UserManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Time of creation of the the user |
| `emails` | `list` | No |  |
| `family_name` | `str` | No |  |
| `given_name` | `str` | No |  |
| `id` | `str` | No | The ID of the user. |
| `metadata` | `dict` | No | The public and unsafe metadata of a user |
| `mfa_config` | `dict` | No |  |
| `name` | `str` | No |  |
| `passkeys` | `list` | No |  |
| `picture` | `str` | No |  |
| `security_keys` | `list` | No |  |
| `updated_at` | `str` | No | Time of last update of the user |
| `user_id` | `str` | No | The ID of the user |
| `username` | `dict` | No | The representation of a username of the user |

### Operations

#### `create(reqdata, ctrl=None) -> UserManagementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.UserManagement().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[UserManagementEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UserManagement().list()
for user_management in results:
    print(user_management.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebAuthnEntity

```python
web_authn = client.WebAuthn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aaguid` | `str` | No |  |
| `attestation_type` | `str` | No |  |
| `backup_eligible` | `bool` | No |  |
| `backup_state` | `bool` | No |  |
| `created_at` | `str` | No |  |
| `credential_id` | `str` | No | The ID of the created credential |
| `id` | `str` | No |  |
| `last_used_at` | `str` | No |  |
| `mfa_only` | `bool` | No |  |
| `name` | `str` | No | A new credential name. |
| `publickey` | `str` | No |  |
| `rawId` | `str` | No |  |
| `response` | `dict` | No |  |
| `transports` | `list` | No |  |
| `type` | `str` | No |  |
| `user_id` | `str` | No | The ID of the user on whose behalf a credential was created |

### Operations

#### `create(reqdata, ctrl=None) -> WebAuthnEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WebAuthn().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WebAuthnEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.WebAuthn().list()
for web_authn in results:
    print(web_authn.data_get())
```

#### `remove(reqmatch, ctrl=None) -> WebAuthnEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.WebAuthn().remove({"id": "id"})
```

#### `update(reqdata, ctrl=None) -> WebAuthnEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.WebAuthn().update({
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebAuthnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebauthnLoginEntity

```python
webauthn_login = client.WebauthnLogin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_id` | `str` | No |  |
| `id` | `str` | No |  |
| `rawId` | `str` | No |  |
| `response` | `dict` | No |  |
| `type` | `str` | No |  |
| `user_id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> WebauthnLoginEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WebauthnLogin().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebauthnLoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = HankoPublicSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

