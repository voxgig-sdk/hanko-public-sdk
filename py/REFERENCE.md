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

#### `CreateUserResponseObject(data=None)`

Create a new `CreateUserResponseObjectEntity` instance. Pass `None` for no initial data.

#### `Credential(data=None)`

Create a new `CredentialEntity` instance. Pass `None` for no initial data.

#### `CredentialCreationOption(data=None)`

Create a new `CredentialCreationOptionEntity` instance. Pass `None` for no initial data.

#### `CredentialRequestOption(data=None)`

Create a new `CredentialRequestOptionEntity` instance. Pass `None` for no initial data.

#### `Email(data=None)`

Create a new `EmailEntity` instance. Pass `None` for no initial data.

#### `EmailManagement(data=None)`

Create a new `EmailManagementEntity` instance. Pass `None` for no initial data.

#### `HankoConfiguration(data=None)`

Create a new `HankoConfigurationEntity` instance. Pass `None` for no initial data.

#### `JsonWebKeySet(data=None)`

Create a new `JsonWebKeySetEntity` instance. Pass `None` for no initial data.

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

## CreateUserResponseObjectEntity

```python
create_user_response_object = client.CreateUserResponseObject()
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

Create a new `CreateUserResponseObjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CredentialEntity

```python
credential = client.Credential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aaguid` | `str` | No |  |
| `attestation_type` | `str` | No |  |
| `backup_eligible` | `bool` | No |  |
| `backup_state` | `bool` | No |  |
| `created_at` | `str` | No |  |
| `id` | `str` | No |  |
| `last_used_at` | `str` | No |  |
| `mfa_only` | `bool` | No |  |
| `name` | `str` | No |  |
| `publickey` | `str` | No |  |
| `transports` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Credential().list()
for credential in results:
    print(credential)
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

Create a new `CredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `user_id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `address` | `str` | Yes |  |
| `id` | `str` | No |  |
| `identities` | `Any` | No |  |
| `identity` | `Any` | No |  |
| `is_primary` | `bool` | No |  |
| `is_verified` | `bool` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Email().create({
    "address": "example_address",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Email().list()
for email in results:
    print(email)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

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

## EmailManagementEntity

```python
email_management = client.EmailManagement()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EmailManagement().create({
    "id": "example_id",  # str
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

Create a new `EmailManagementEntity` instance with the same options.

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
| `account` | `dict` | No |  |
| `emails` | `dict` | No |  |
| `password` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

## JsonWebKeySetEntity

```python
json_web_key_set = client.JsonWebKeySet()
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.JsonWebKeySet().list()
for json_web_key_set in results:
    print(json_web_key_set)
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

Create a new `JsonWebKeySetEntity` instance with the same options.

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
| `code` | `str` | No |  |
| `email_id` | `str` | No |  |
| `id` | `str` | No |  |
| `user_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `password` | `str` | Yes |  |
| `user_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Password().create({
    "password": "example_password",  # str
    "user_id": "example_user_id",  # str
})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `birthdate` | `str` | No |  |
| `email` | `str` | No |  |
| `email_verified` | `str` | No |  |
| `family_name` | `str` | No |  |
| `gender` | `str` | No |  |
| `given_name` | `str` | No |  |
| `locale` | `str` | No |  |
| `middle_name` | `str` | No |  |
| `name` | `str` | No |  |
| `nickname` | `str` | No |  |
| `phone` | `str` | No |  |
| `phone_verified` | `str` | No |  |
| `picture` | `str` | No |  |
| `preferred_username` | `str` | No |  |
| `profile` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `website` | `str` | No |  |
| `zone_info` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Saml().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Saml().load()
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
| `amr` | `list` | No |  |
| `audience` | `list` | No |  |
| `email` | `dict` | No |  |
| `expiration` | `str` | Yes |  |
| `issued_at` | `str` | No |  |
| `issuer` | `str` | No |  |
| `session_id` | `str` | Yes |  |
| `session_token` | `str` | Yes |  |
| `subject` | `Any` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SessionManagement().create({
    "expiration": "example_expiration",  # str
    "session_id": "example_session_id",  # str
    "session_token": "example_session_token",  # str
    "subject": "example_subject",  # Any
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ThirdParty().load()
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
| `value` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `created_at` | `str` | No |  |
| `email` | `str` | No |  |
| `email_id` | `str` | No |  |
| `emails` | `list` | No |  |
| `family_name` | `str` | No |  |
| `given_name` | `str` | No |  |
| `has_webauthn_credential` | `bool` | No |  |
| `id` | `str` | No |  |
| `metadata` | `dict` | No |  |
| `mfa_config` | `dict` | No |  |
| `name` | `str` | No |  |
| `passkeys` | `list` | No |  |
| `picture` | `str` | No |  |
| `security_keys` | `list` | No |  |
| `updated_at` | `str` | No |  |
| `user_id` | `str` | No |  |
| `username` | `str` | No |  |
| `verified` | `bool` | No |  |
| `webauthn_credentials` | `list` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.User().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

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
| `created_at` | `str` | No |  |
| `emails` | `list` | No |  |
| `family_name` | `str` | No |  |
| `given_name` | `str` | No |  |
| `id` | `str` | No |  |
| `metadata` | `dict` | No |  |
| `mfa_config` | `dict` | No |  |
| `name` | `str` | No |  |
| `passkeys` | `list` | No |  |
| `picture` | `str` | No |  |
| `security_keys` | `list` | No |  |
| `updated_at` | `str` | No |  |
| `user_id` | `str` | No |  |
| `username` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UserManagement().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.UserManagement().list()
for user_management in results:
    print(user_management)
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
| `id` | `str` | No |  |
| `name` | `str` | No |  |
| `rawId` | `str` | No |  |
| `response` | `dict` | No |  |
| `type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.WebAuthn().create({
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.WebAuthn().remove({"id": "id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = HankoPublicSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

