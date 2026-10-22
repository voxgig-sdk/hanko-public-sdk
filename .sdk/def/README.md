# API Definition

`hanko-public-openapi.yaml` is Hanko's Public API specification, copied from
`openapi-public.yaml` in https://github.com/teamhanko/docs at commit dba418b (fetched 2026-10-22).

Spec version 3.0.4: 9 paths, 10 operations. The 22 deprecated operations still in the previous copy
(1.2.0) were removed upstream on 2026-08-12, and `POST /organizations/roles/check` was added on 2026-10-05.

One edit, which changes no meaning: `BearerTokenAuth` is listed before `CookieAuth`, both in
`components.securitySchemes` and in the security alternatives of the four operations that declare
them. OpenAPI gives no meaning to the order of alternatives, but the generator builds the SDK around
the first scheme listed, and a server-side SDK sends a bearer token rather than a browser cookie.

