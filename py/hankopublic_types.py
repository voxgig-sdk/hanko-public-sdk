# Typed models for the HankoPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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


class CreateUserResponseObject(TypedDict):
    pass


class Credential(TypedDict, total=False):
    aaguid: str
    attestation_type: str
    backup_eligible: bool
    backup_state: bool
    created_at: str
    id: str
    last_used_at: str
    mfa_only: bool
    name: str
    public_key: str
    transport: list


class CredentialListMatch(TypedDict, total=False):
    aaguid: str
    attestation_type: str
    backup_eligible: bool
    backup_state: bool
    created_at: str
    id: str
    last_used_at: str
    mfa_only: bool
    name: str
    public_key: str
    transport: list


class CredentialCreationOption(TypedDict, total=False):
    attestation: str
    authenticator_selection: dict
    challenge: str
    pub_key_cred_param: list
    rp: dict
    timeout: int
    user: dict


class CredentialCreationOptionCreateData(TypedDict, total=False):
    attestation: str
    authenticator_selection: dict
    challenge: str
    pub_key_cred_param: list
    rp: dict
    timeout: int
    user: dict


class CredentialRequestOption(TypedDict, total=False):
    allow_credential: list
    challenge: str
    rp_id: str
    timeout: int
    user_id: str
    user_verification: str


class CredentialRequestOptionCreateData(TypedDict, total=False):
    allow_credential: list
    challenge: str
    rp_id: str
    timeout: int
    user_id: str
    user_verification: str


class EmailRequired(TypedDict):
    address: str


class Email(EmailRequired, total=False):
    id: str
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailListMatch(TypedDict, total=False):
    address: str
    id: str
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailCreateDataRequired(TypedDict):
    address: str


class EmailCreateData(EmailCreateDataRequired, total=False):
    id: str
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailRemoveMatch(TypedDict):
    id: str


class EmailManagement(TypedDict):
    pass


class EmailManagementCreateData(TypedDict):
    id: str


class HankoConfiguration(TypedDict, total=False):
    account: dict
    email: dict
    password: dict


class HankoConfigurationLoadMatch(TypedDict, total=False):
    account: dict
    email: dict
    password: dict


class JsonWebKeySet(TypedDict, total=False):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


class JsonWebKeySetListMatch(TypedDict, total=False):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


class PasscodeRequired(TypedDict):
    user_id: str


class Passcode(PasscodeRequired, total=False):
    code: str
    created_at: str
    email_id: str
    id: str
    ttl: int


class PasscodeCreateDataRequired(TypedDict):
    user_id: str


class PasscodeCreateData(PasscodeCreateDataRequired, total=False):
    code: str
    created_at: str
    email_id: str
    id: str
    ttl: int


class Password(TypedDict):
    password: str
    user_id: str


class PasswordCreateData(TypedDict):
    password: str
    user_id: str


class PasswordUpdateData(TypedDict, total=False):
    password: str
    user_id: str


class Saml(TypedDict, total=False):
    attribute_map: dict
    domain: str
    enabled: bool
    metadata_url: str
    name: str
    skip_email_verification: bool


class SamlLoadMatch(TypedDict, total=False):
    attribute_map: dict
    domain: str
    enabled: bool
    metadata_url: str
    name: str
    skip_email_verification: bool


class SamlCreateData(TypedDict, total=False):
    attribute_map: dict
    domain: str
    enabled: bool
    metadata_url: str
    name: str
    skip_email_verification: bool


class SessionManagementRequired(TypedDict):
    claim: dict
    session_token: str


class SessionManagement(SessionManagementRequired, total=False):
    expiration_time: str
    idle_expires_at: str
    is_valid: bool
    user_id: str


class SessionManagementLoadMatch(TypedDict, total=False):
    claim: dict
    expiration_time: str
    idle_expires_at: str
    is_valid: bool
    session_token: str
    user_id: str


class SessionManagementCreateDataRequired(TypedDict):
    claim: dict
    session_token: str


class SessionManagementCreateData(SessionManagementCreateDataRequired, total=False):
    expiration_time: str
    idle_expires_at: str
    is_valid: bool
    user_id: str


class Status(TypedDict):
    pass


class StatusLoadMatch(TypedDict):
    pass


class ThirdParty(TypedDict):
    pass


class ThirdPartyLoadMatch(TypedDict):
    pass


class Token(TypedDict, total=False):
    value: str


class TokenCreateData(TypedDict, total=False):
    value: str


class User(TypedDict, total=False):
    created_at: str
    email: list
    email_id: str
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credential: list


class UserLoadMatch(TypedDict):
    id: str


class UserCreateData(TypedDict, total=False):
    created_at: str
    email: list
    email_id: str
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credential: list


class UserRemoveMatchRequired(TypedDict):
    id: str


class UserRemoveMatch(UserRemoveMatchRequired, total=False):
    created_at: str
    email: list
    email_id: str
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credential: list


class UserManagement(TypedDict, total=False):
    created_at: str
    email: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: dict


class UserManagementListMatch(TypedDict, total=False):
    created_at: str
    email: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: dict


class UserManagementCreateData(TypedDict, total=False):
    created_at: str
    email: list
    family_name: str
    given_name: str
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkey: list
    picture: str
    security_key: list
    updated_at: str
    user_id: str
    username: dict


class WebAuthn(TypedDict, total=False):
    credential_id: str
    id: str
    name: str
    raw_id: str
    response: dict
    type: str
    user_id: str


class WebAuthnCreateData(TypedDict, total=False):
    credential_id: str
    id: str
    name: str
    raw_id: str
    response: dict
    type: str
    user_id: str


class WebAuthnUpdateDataRequired(TypedDict):
    id: str


class WebAuthnUpdateData(WebAuthnUpdateDataRequired, total=False):
    credential_id: str
    name: str
    raw_id: str
    response: dict
    type: str
    user_id: str


class WebAuthnRemoveMatch(TypedDict):
    id: str


class WebauthnLogin(TypedDict, total=False):
    credential_id: str
    id: str
    raw_id: str
    response: dict
    type: str
    user_id: str


class WebauthnLoginCreateData(TypedDict, total=False):
    credential_id: str
    id: str
    raw_id: str
    response: dict
    type: str
    user_id: str
