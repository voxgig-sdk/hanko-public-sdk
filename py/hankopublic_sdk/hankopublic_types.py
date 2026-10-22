# Typed models for the HankoPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class JsonWebKey(TypedDict, total=False):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


class JsonWebKeyListMatch(TypedDict, total=False):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


class OrganizationManagement(TypedDict):
    has_role: bool
    organization_id: str
    roles: list


class OrganizationManagementCreateData(TypedDict):
    organization_id: str
    roles: list


class Saml(TypedDict):
    pass


class SamlLoadMatchRequired(TypedDict):
    domain: str


class SamlLoadMatch(SamlLoadMatchRequired, total=False):
    cert_only: bool


class SamlCreateData(TypedDict):
    pass


class SessionManagementRequired(TypedDict):
    claims: dict
    id: str
    name: str
    roles: list
    session_token: str


class SessionManagement(SessionManagementRequired, total=False):
    expiration_time: str
    idle_expires_at: str
    is_valid: bool
    organizations: list
    user_id: str


class SessionManagementListMatch(TypedDict, total=False):
    claims: dict
    expiration_time: str
    id: str
    idle_expires_at: str
    is_valid: bool
    name: str
    organizations: list
    roles: list
    session_token: str
    user_id: str


class SessionManagementCreateData(TypedDict):
    session_token: str


class Status(TypedDict):
    pass


class StatusLoadMatch(TypedDict):
    pass


class ThirdParty(TypedDict):
    pass


class ThirdPartyLoadMatchRequired(TypedDict):
    state: str


class ThirdPartyLoadMatch(ThirdPartyLoadMatchRequired, total=False):
    code: str
    error: str
    error_description: str


class UserManagement(TypedDict, total=False):
    created_at: str
    emails: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: dict


class UserManagementListMatch(TypedDict, total=False):
    created_at: str
    emails: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: dict


class UserManagementCreateData(TypedDict, total=False):
    created_at: str
    emails: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: dict
