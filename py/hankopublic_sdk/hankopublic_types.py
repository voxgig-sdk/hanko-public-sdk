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
    publickey: str
    transports: list


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
    publickey: str
    transports: list


class CredentialCreationOption(TypedDict, total=False):
    attestation: str
    authenticatorSelection: dict
    challenge: str
    pubKeyCredParams: list
    rp: dict
    timeout: int
    user: dict


class CredentialCreationOptionCreateData(TypedDict, total=False):
    attestation: str
    authenticatorSelection: dict
    challenge: str
    pubKeyCredParams: list
    rp: dict
    timeout: int
    user: dict


class CredentialRequestOption(TypedDict, total=False):
    allowCredentials: list
    challenge: str
    rpId: str
    timeout: int
    userVerification: str
    user_id: str


class CredentialRequestOptionCreateData(TypedDict, total=False):
    allowCredentials: list
    challenge: str
    rpId: str
    timeout: int
    userVerification: str
    user_id: str


class EmailRequired(TypedDict):
    address: str


class Email(EmailRequired, total=False):
    id: str
    identities: Any
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailListMatch(TypedDict, total=False):
    address: str
    id: str
    identities: Any
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailCreateDataRequired(TypedDict):
    address: str


class EmailCreateData(EmailCreateDataRequired, total=False):
    id: str
    identities: Any
    identity: Any
    is_primary: bool
    is_verified: bool


class EmailRemoveMatch(TypedDict):
    id: str


class EmailManagement(TypedDict, total=False):
    id: str


class EmailManagementCreateData(TypedDict):
    id: str


class HankoConfiguration(TypedDict, total=False):
    account: dict
    emails: dict
    password: dict


class HankoConfigurationLoadMatch(TypedDict, total=False):
    account: dict
    emails: dict
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
    email_id: str
    id: str


class PasscodeCreateDataRequired(TypedDict):
    user_id: str


class PasscodeCreateData(PasscodeCreateDataRequired, total=False):
    code: str
    email_id: str
    id: str


class Password(TypedDict):
    password: str
    user_id: str


class PasswordCreateData(TypedDict):
    password: str
    user_id: str


class PasswordUpdateData(TypedDict, total=False):
    password: str
    user_id: str


class Saml(TypedDict):
    pass


class SamlLoadMatchRequired(TypedDict):
    domain: str


class SamlLoadMatch(SamlLoadMatchRequired, total=False):
    cert_only: bool


class SamlCreateData(TypedDict):
    pass


class SessionManagementRequired(TypedDict):
    expiration: str
    session_id: str
    session_token: str
    subject: Any


class SessionManagement(SessionManagementRequired, total=False):
    amr: list
    audience: list
    email: dict
    issued_at: str
    issuer: str


class SessionManagementLoadMatch(TypedDict, total=False):
    amr: list
    audience: list
    email: dict
    expiration: str
    issued_at: str
    issuer: str
    session_id: str
    session_token: str
    subject: Any


class SessionManagementCreateDataRequired(TypedDict):
    expiration: str
    session_id: str
    session_token: str
    subject: Any


class SessionManagementCreateData(SessionManagementCreateDataRequired, total=False):
    amr: list
    audience: list
    email: dict
    issued_at: str
    issuer: str


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


class Token(TypedDict, total=False):
    value: str


class TokenCreateData(TypedDict, total=False):
    value: str


class User(TypedDict, total=False):
    created_at: str
    email: str
    email_id: str
    emails: list
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credentials: list


class UserLoadMatch(TypedDict):
    id: str


class UserCreateData(TypedDict, total=False):
    created_at: str
    email: str
    email_id: str
    emails: list
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    id: str
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credentials: list


class UserRemoveMatchRequired(TypedDict):
    id: str


class UserRemoveMatch(UserRemoveMatchRequired, total=False):
    created_at: str
    email: str
    email_id: str
    emails: list
    family_name: str
    given_name: str
    has_webauthn_credential: bool
    metadata: dict
    mfa_config: dict
    name: str
    passkeys: list
    picture: str
    security_keys: list
    updated_at: str
    user_id: str
    username: str
    verified: bool
    webauthn_credentials: list


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


class WebAuthn(TypedDict, total=False):
    id: str
    name: str
    rawId: str
    response: dict
    type: str


class WebAuthnCreateData(TypedDict, total=False):
    id: str
    name: str
    rawId: str
    response: dict
    type: str


class WebAuthnUpdateDataRequired(TypedDict):
    id: str


class WebAuthnUpdateData(WebAuthnUpdateDataRequired, total=False):
    name: str
    rawId: str
    response: dict
    type: str


class WebAuthnRemoveMatch(TypedDict):
    id: str


class WebauthnLogin(TypedDict, total=False):
    credential_id: str
    id: str
    rawId: str
    response: dict
    type: str
    user_id: str


class WebauthnLoginCreateData(TypedDict, total=False):
    credential_id: str
    id: str
    rawId: str
    response: dict
    type: str
    user_id: str
