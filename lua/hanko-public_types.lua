-- Typed models for the HankoPublic SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CreateUserResponseObject

---@class Credential
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field public_key? string
---@field transport? table

---@class CredentialListMatch
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field public_key? string
---@field transport? table

---@class CredentialCreationOption
---@field attestation? string
---@field authenticator_selection? table
---@field challenge? string
---@field pub_key_cred_param? table
---@field rp? table
---@field timeout? number
---@field user? table

---@class CredentialCreationOptionCreateData
---@field attestation? string
---@field authenticator_selection? table
---@field challenge? string
---@field pub_key_cred_param? table
---@field rp? table
---@field timeout? number
---@field user? table

---@class CredentialRequestOption
---@field allow_credential? table
---@field challenge? string
---@field rp_id? string
---@field timeout? number
---@field user_id? string
---@field user_verification? string

---@class CredentialRequestOptionCreateData
---@field allow_credential? table
---@field challenge? string
---@field rp_id? string
---@field timeout? number
---@field user_id? string
---@field user_verification? string

---@class Email
---@field address string
---@field id? string
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailListMatch
---@field address? string
---@field id? string
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailCreateData
---@field address string
---@field id? string
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailRemoveMatch
---@field id string

---@class EmailManagement

---@class EmailManagementCreateData
---@field id string

---@class HankoConfiguration
---@field account? table
---@field email? table
---@field password? table

---@class HankoConfigurationLoadMatch
---@field account? table
---@field email? table
---@field password? table

---@class JsonWebKeySet
---@field alg? string
---@field e? string
---@field kid? string
---@field kty? string
---@field n? string
---@field use? string

---@class JsonWebKeySetListMatch
---@field alg? string
---@field e? string
---@field kid? string
---@field kty? string
---@field n? string
---@field use? string

---@class Passcode
---@field code? string
---@field created_at? string
---@field email_id? string
---@field id? string
---@field ttl? number
---@field user_id string

---@class PasscodeCreateData
---@field code? string
---@field created_at? string
---@field email_id? string
---@field id? string
---@field ttl? number
---@field user_id string

---@class Password
---@field password string
---@field user_id string

---@class PasswordCreateData
---@field password string
---@field user_id string

---@class PasswordUpdateData
---@field password? string
---@field user_id? string

---@class Saml
---@field attribute_map? table
---@field domain? string
---@field enabled? boolean
---@field metadata_url? string
---@field name? string
---@field skip_email_verification? boolean

---@class SamlLoadMatch
---@field attribute_map? table
---@field domain? string
---@field enabled? boolean
---@field metadata_url? string
---@field name? string
---@field skip_email_verification? boolean

---@class SamlCreateData
---@field attribute_map? table
---@field domain? string
---@field enabled? boolean
---@field metadata_url? string
---@field name? string
---@field skip_email_verification? boolean

---@class SessionManagement
---@field claim table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token string
---@field user_id? string

---@class SessionManagementLoadMatch
---@field claim? table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token? string
---@field user_id? string

---@class SessionManagementCreateData
---@field claim table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token string
---@field user_id? string

---@class Status

---@class StatusLoadMatch

---@class ThirdParty

---@class ThirdPartyLoadMatch

---@class Token
---@field value? string

---@class TokenCreateData
---@field value? string

---@class User
---@field created_at? string
---@field email? table
---@field email_id? string
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credential? table

---@class UserLoadMatch
---@field id string

---@class UserCreateData
---@field created_at? string
---@field email? table
---@field email_id? string
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credential? table

---@class UserRemoveMatch
---@field created_at? string
---@field email? table
---@field email_id? string
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credential? table

---@class UserManagement
---@field created_at? string
---@field email? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class UserManagementListMatch
---@field created_at? string
---@field email? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class UserManagementCreateData
---@field created_at? string
---@field email? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkey? table
---@field picture? string
---@field security_key? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class WebAuthn
---@field credential_id? string
---@field id? string
---@field name? string
---@field raw_id? string
---@field response? table
---@field type? string
---@field user_id? string

---@class WebAuthnCreateData
---@field credential_id? string
---@field id? string
---@field name? string
---@field raw_id? string
---@field response? table
---@field type? string
---@field user_id? string

---@class WebAuthnUpdateData
---@field id string
---@field credential_id? string
---@field name? string
---@field raw_id? string
---@field response? table
---@field type? string
---@field user_id? string

---@class WebAuthnRemoveMatch
---@field id string

---@class WebauthnLogin
---@field credential_id? string
---@field id? string
---@field raw_id? string
---@field response? table
---@field type? string
---@field user_id? string

---@class WebauthnLoginCreateData
---@field credential_id? string
---@field id? string
---@field raw_id? string
---@field response? table
---@field type? string
---@field user_id? string

local M = {}

return M
