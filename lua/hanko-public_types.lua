-- Typed models for the HankoPublic SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CredentialCreationOption
---@field attestation? string
---@field authenticatorSelection? table
---@field challenge? string
---@field pubKeyCredParams? table
---@field rp? table
---@field timeout? number
---@field user? table

---@class CredentialCreationOptionCreateData
---@field attestation? string
---@field authenticatorSelection? table
---@field challenge? string
---@field pubKeyCredParams? table
---@field rp? table
---@field timeout? number
---@field user? table

---@class CredentialRequestOption
---@field allowCredentials? table
---@field challenge? string
---@field rpId? string
---@field timeout? number
---@field userVerification? string
---@field user_id? string

---@class CredentialRequestOptionCreateData
---@field allowCredentials? table
---@field challenge? string
---@field rpId? string
---@field timeout? number
---@field userVerification? string
---@field user_id? string

---@class Email
---@field address string
---@field id? string
---@field identities? any
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailListMatch
---@field address? string
---@field id? string
---@field identities? any
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailCreateData
---@field address string
---@field id? string
---@field identities? any
---@field identity? any
---@field is_primary? boolean
---@field is_verified? boolean

---@class EmailRemoveMatch
---@field id string

---@class HankoConfiguration
---@field account? table
---@field emails? table
---@field password? table

---@class HankoConfigurationLoadMatch
---@field account? table
---@field emails? table
---@field password? table

---@class JsonWebKey
---@field alg? string
---@field e? string
---@field kid? string
---@field kty? string
---@field n? string
---@field use? string

---@class JsonWebKeyListMatch
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

---@class SamlLoadMatch
---@field cert_only? boolean
---@field domain string

---@class SamlCreateData

---@class SessionManagement
---@field claims table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token string
---@field user_id? string

---@class SessionManagementLoadMatch
---@field claims? table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token? string
---@field user_id? string

---@class SessionManagementCreateData
---@field claims table
---@field expiration_time? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field session_token string
---@field user_id? string

---@class Status

---@class StatusLoadMatch

---@class ThirdParty

---@class ThirdPartyLoadMatch
---@field provider string
---@field redirect_to string

---@class Token
---@field user_id? string
---@field value? string

---@class TokenCreateData
---@field user_id? string
---@field value? string

---@class User
---@field created_at? string
---@field email? string
---@field email_id? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credentials? table

---@class UserLoadMatch
---@field id string

---@class UserCreateData
---@field created_at? string
---@field email? string
---@field email_id? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credentials? table

---@class UserRemoveMatch
---@field created_at? string
---@field email? string
---@field email_id? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field has_webauthn_credential? boolean
---@field id string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? string
---@field verified? boolean
---@field webauthn_credentials? table

---@class UserManagement
---@field created_at? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class UserManagementListMatch
---@field created_at? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class UserManagementCreateData
---@field created_at? string
---@field emails? table
---@field family_name? string
---@field given_name? string
---@field id? string
---@field metadata? table
---@field mfa_config? table
---@field name? string
---@field passkeys? table
---@field picture? string
---@field security_keys? table
---@field updated_at? string
---@field user_id? string
---@field username? table

---@class WebAuthn
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field credential_id? string
---@field id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field publickey? string
---@field rawId? string
---@field response? table
---@field transports? table
---@field type? string
---@field user_id? string

---@class WebAuthnListMatch
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field credential_id? string
---@field id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field publickey? string
---@field rawId? string
---@field response? table
---@field transports? table
---@field type? string
---@field user_id? string

---@class WebAuthnCreateData
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field credential_id? string
---@field id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field publickey? string
---@field rawId? string
---@field response? table
---@field transports? table
---@field type? string
---@field user_id? string

---@class WebAuthnUpdateData
---@field id string
---@field aaguid? string
---@field attestation_type? string
---@field backup_eligible? boolean
---@field backup_state? boolean
---@field created_at? string
---@field credential_id? string
---@field last_used_at? string
---@field mfa_only? boolean
---@field name? string
---@field publickey? string
---@field rawId? string
---@field response? table
---@field transports? table
---@field type? string
---@field user_id? string

---@class WebAuthnRemoveMatch
---@field id string

---@class WebauthnLogin
---@field credential_id? string
---@field id? string
---@field rawId? string
---@field response? table
---@field type? string
---@field user_id? string

---@class WebauthnLoginCreateData
---@field credential_id? string
---@field id? string
---@field rawId? string
---@field response? table
---@field type? string
---@field user_id? string

local M = {}

return M
