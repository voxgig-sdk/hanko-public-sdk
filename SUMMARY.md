# Hanko Public API

> ## Introduction
>
> This is the OpenAPI specification for the [Hanko Public API](https://github.com/teamhanko/hanko/blob/main/backend/README.md#start-the-public-api).
>
> ## Authentication
>
> The API uses [JSON Web Tokens](https://www.rfc-editor.org/rfc/rfc7519.html) (JWTs) for authentication.
> JWTs are verified using [JSON Web Keys](https://www.rfc-editor.org/rfc/rfc7517) (JWK).
> JWKs can be [configured](https://github.com/teamhanko/hanko/wiki/config)
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
> [configured](https://github.com/teamhanko/hanko/wiki/config)
> for public endpoints via the `server.public.cors` options.
>
> ---

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 10 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [JsonWebKey](docs/api/json_web_key.html)

Results: JSON Web Key Set.

SDK operations: `list`.

### [OrganizationManagement](docs/api/organization_management.html)

Results: Role check result.

SDK operations: `create`.

Key fields to recognise:

- `organization_id`: The ID of the organization to check
- `roles`: IDs or slugs of roles to check for.

### [Saml](docs/api/saml.html)

Results: OK.

SDK operations: `create`, `load`.

### [SessionManagement](docs/api/session_management.html)

Results: Session validation response.

SDK operations: `create`, `list`.

Key fields to recognise:

- `claims`: The claims extracted from a JWT.
- `expiration_time`: Date-time indicating the expiration of the session. Deprecated, please use `claims.expiration` instead.
- `id`: The ID of the organization
- `idle_expires_at`: Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time. Only present when idle timeout is configured. The value is capped to the JWT expiration time.
- `is_valid`: Indicates whether the session is valid or not

### [Status](docs/api/status.html)

Results: API is running.

SDK operations: `load`.

### [ThirdParty](docs/api/third_party.html)

SDK operations: `load`.

### [UserManagement](docs/api/user_management.html)

Results: The user has been logged out; Details for the current user.

SDK operations: `create`, `list`.

Key fields to recognise:

- `created_at`: Time of creation of the user
- `id`: The ID of the user. Deprecated, use `user_id` instead.
- `metadata`: The public and unsafe metadata of a user
- `updated_at`: Time of last update of the user
- `user_id`: The ID of the user

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [JsonWebKey](docs/api/json_web_key.html) | `list` | `GET /.well-known/jwks.json` | See reference |
| [OrganizationManagement](docs/api/organization_management.html) | `create` | `POST /organizations/roles/check` | Required |
| [Saml](docs/api/saml.html) | `create` | `POST /saml/callback` | See reference |
| [Saml](docs/api/saml.html) | `load` | `GET /saml/metadata` | See reference |
| [SessionManagement](docs/api/session_management.html) | `create` | `POST /sessions/validate` | See reference |
| [SessionManagement](docs/api/session_management.html) | `list` | `GET /sessions/validate` | Required |
| [Status](docs/api/status.html) | `load` | `GET /` | See reference |
| [ThirdParty](docs/api/third_party.html) | `load` | `GET /thirdparty/callback` | See reference |
| [UserManagement](docs/api/user_management.html) | `create` | `POST /logout` | Required |
| [UserManagement](docs/api/user_management.html) | `list` | `GET /me` | Required |

## Connect to the API

- API server: `https://{tenant_id}.hanko.io`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

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
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hanko-public_list`: List records for an entity. Supported entities: `json_web_key`, `session_management`, `user_management`.
- `hanko-public_load`: Load one record for an entity. Supported entities: `saml`, `status`, `third_party`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`secrets`](docs/features/secrets.html): Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

