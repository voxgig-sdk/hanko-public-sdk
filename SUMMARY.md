# Hanko Public API

> ## Introduction
>
> This is the OpenAPI specification for the [Hanko Public API](https://github.com/teamhanko/hanko/blob/main/backend/README.md#basic-usage).
>
> ## Authentication
>
> The API uses [JSON Web Tokens](https://www.rfc-editor.org/rfc/rfc7519.html) (JWTs) for authentication.
> JWTs are verified using [JSON Web Keys](https://www.rfc-editor.org/rfc/rfc7517) (JWK).
> JWKs can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#all-available-config-options)
> through the `secrets.keys` options. The API also publishes public cryptographic keys as a
> [JWK set](https://www.rfc-editor.org/rfc/rfc7517#section-2) through the `.well-known/jwks.json` endpoint
> to enable clients to verify token signatures.
> JWTs must be provided on requests to protected endpoints using one of the following schemes:
>
> ### CookieAuth
>
> **Security Scheme Type**: `API Key`
>
> **Cookie parameter name**: `hanko`
>
> The JWT must be provided in a Cookie with the name `hanko`.
>
> ### BearerTokenAuth
>
> **Security Scheme Type**: `http`
>
> **HTTP Authorization Scheme**: `Bearer`
>
> **Bearer format**: `JWT`
>
> The JWT must be provided in an HTTP Authorization header with bearer type: `Authorization: Bearer &lt;JWT&gt;`.
>
> ## Cross-Origin Resource Sharing
> Cross-Origin Resource Sharing (CORS) can be currently
> [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#all-available-config-options)
> for public endpoints via the `server.public.cors` options.
>
> ---

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 32 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### CredentialCreationOption

Results: Challenge.

SDK operations: `create`.

### CredentialRequestOption

Results: Successful initialization.

SDK operations: `create`.

Key fields to recognise:

- `user_id`: The ID of the user on whose behalf WebAuthn login should be performed

### Email

Results: Email has been set as primary; Email successfully added; A list of emails assigned to the current user; Email has been deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `address`: The email address
- `id`: The ID of the email address
- `is_primary`: Indicates it&#39;s the primary email address.
- `is_verified`: Indicated the email has been verified.

### HankoConfiguration

Results: Hanko configuration.

SDK operations: `load`.

Key fields to recognise:

- `account`: Controls the behavior regarding user account.
- `emails`: Controls the behavior regarding email addresses.
- `password`: Configuration options concerning passwords

### JsonWebKey

Results: JSON Web Key Set.

SDK operations: `list`.

### Passcode

Results: Successful passcode login finalization; Successful passcode login initialization.

SDK operations: `create`.

Key fields to recognise:

- `code`: The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits
- `created_at`: Time of creation of the passcode
- `email_id`: The ID of the email address
- `id`: The ID of the passcode
- `ttl`: Lifespan of a passcode in seconds

### Password

Results: Successful password login; Successful password update; Successful password creation.

SDK operations: `create`, `update`.

Key fields to recognise:

- `password`: The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.
- `user_id`: The ID of the user to create/set a password for

### Saml

Results: OK.

SDK operations: `create`, `load`.

### SessionManagement

Results: Session validation response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `claims`: The claims extracted from a JWT.
- `expiration_time`: Date-time indicating the expiration of the session. Deprecated, please use `claims.expiration` instead.
- `idle_expires_at`: Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. Only present when idle timeout is configured. The value is capped to the JWT expiration time.
- `is_valid`: Indicates whether the session is valid or not
- `session_token`: The session token (JWT) to validate

### Status

Results: API is running.

SDK operations: `load`.

### ThirdParty

SDK operations: `load`.

### Token

Results: Successful token exchange.

SDK operations: `create`.

Key fields to recognise:

- `user_id`: The ID of the user on whose behalf the token was exchanged.

### User

Results: User; Details about the created user; Details for a user retrieved by ID; The user has been deleted.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `created_at`: Time of creation of the user
- `email`: The email address of the user
- `email_id`: The ID of the newly created email address
- `id`: The ID of the user. Deprecated, use `user_id` instead.
- `metadata`: The public and unsafe metadata of a user

### UserManagement

Results: The user has been logged out; Details for the current user.

SDK operations: `create`, `list`.

Key fields to recognise:

- `created_at`: Time of creation of the user
- `id`: The ID of the user. Deprecated, use `user_id` instead.
- `metadata`: The public and unsafe metadata of a user
- `updated_at`: Time of last update of the user
- `user_id`: The ID of the user

### WebAuthn

Results: Successful registration; A list of WebAuthn credentials assigned to the current user; Credential updated successfully.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `credential_id`: The ID of the created credential
- `name`: A new credential name.
- `user_id`: The ID of the user on whose behalf a credential was created

### WebauthnLogin

Results: Successful login.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| CredentialCreationOption | `create` | `POST /webauthn/registration/initialize` | Required |
| CredentialRequestOption | `create` | `POST /webauthn/login/initialize` | See reference |
| Email | `create` | `POST /emails/{id}/set_primary` | Required |
| Email | `create` | `POST /emails` | Required |
| Email | `list` | `GET /emails` | Required |
| Email | `remove` | `DELETE /emails/{id}` | Required |
| HankoConfiguration | `load` | `GET /.well-known/config` | See reference |
| JsonWebKey | `list` | `GET /.well-known/jwks.json` | See reference |
| Passcode | `create` | `POST /passcode/login/finalize` | See reference |
| Passcode | `create` | `POST /passcode/login/initialize` | See reference |
| Password | `create` | `POST /password/login` | See reference |
| Password | `update` | `PUT /password` | Required |
| Saml | `create` | `POST /saml/callback` | See reference |
| Saml | `load` | `GET /saml/metadata` | See reference |
| Saml | `load` | `GET /saml/provider` | See reference |
| SessionManagement | `create` | `POST /sessions/validate` | See reference |
| SessionManagement | `load` | `GET /sessions/validate` | Required |
| Status | `load` | `GET /` | See reference |
| ThirdParty | `load` | `GET /thirdparty/auth` | See reference |
| ThirdParty | `load` | `GET /thirdparty/callback` | See reference |
| Token | `create` | `POST /token` | See reference |
| User | `create` | `POST /user` | See reference |
| User | `create` | `POST /users` | See reference |
| User | `load` | `GET /users/{id}` | Required |
| User | `remove` | `DELETE /user` | Required |
| UserManagement | `create` | `POST /logout` | Required |
| UserManagement | `list` | `GET /me` | Required |
| WebAuthn | `create` | `POST /webauthn/registration/finalize` | Required |
| WebAuthn | `list` | `GET /webauthn/credentials` | Required |
| WebAuthn | `remove` | `DELETE /webauthn/credentials/{id}` | Required |
| WebAuthn | `update` | `PATCH /webauthn/credentials/{id}` | Required |
| WebauthnLogin | `create` | `POST /webauthn/login/finalize` | See reference |

## Connect to the API

- API server: `https://{tenant_id}.hanko.io`

The default credential is sent in the `hanko` cookie.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hanko-public_list`: List records for an entity. Supported entities: `email`, `json_web_key`, `user_management`, `web_authn`.
- `hanko-public_load`: Load one record for an entity. Supported entities: `hanko_configuration`, `saml`, `session_management`, `status`, `third_party`, `user`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

