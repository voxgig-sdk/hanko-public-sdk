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
---@field publickey? string
---@field transports? table

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
---@field publickey? string
---@field transports? table

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

---@class EmailManagement
---@field id? string

---@class EmailManagementCreateData
---@field id string

---@class HankoConfiguration
---@field account? table
---@field emails? table
---@field password? table

---@class HankoConfigurationLoadMatch
---@field account? table
---@field emails? table
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
---@field email_id? string
---@field id? string
---@field user_id string

---@class PasscodeCreateData
---@field code? string
---@field email_id? string
---@field id? string
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
---@field birthdate? string
---@field email? string
---@field email_verified? string
---@field family_name? string
---@field gender? string
---@field given_name? string
---@field locale? string
---@field middle_name? string
---@field name? string
---@field nickname? string
---@field phone? string
---@field phone_verified? string
---@field picture? string
---@field preferred_username? string
---@field profile? string
---@field updated_at? string
---@field website? string
---@field zone_info? string

---@class SamlLoadMatch
---@field cert_only? boolean
---@field domain string

---@class SamlCreateData
---@field birthdate? string
---@field email? string
---@field email_verified? string
---@field family_name? string
---@field gender? string
---@field given_name? string
---@field locale? string
---@field middle_name? string
---@field name? string
---@field nickname? string
---@field phone? string
---@field phone_verified? string
---@field picture? string
---@field preferred_username? string
---@field profile? string
---@field updated_at? string
---@field website? string
---@field zone_info? string

---@class SessionManagement
---@field amr? table
---@field audience? table
---@field email? table
---@field expiration string
---@field issued_at? string
---@field issuer? string
---@field session_id string
---@field session_token string
---@field subject any

---@class SessionManagementLoadMatch
---@field amr? table
---@field audience? table
---@field email? table
---@field expiration? string
---@field issued_at? string
---@field issuer? string
---@field session_id? string
---@field session_token? string
---@field subject? any

---@class SessionManagementCreateData
---@field amr? table
---@field audience? table
---@field email? table
---@field expiration string
---@field issued_at? string
---@field issuer? string
---@field session_id string
---@field session_token string
---@field subject any

---@class Status

---@class StatusLoadMatch

---@class ThirdParty

---@class ThirdPartyLoadMatch
---@field code? string
---@field error? string
---@field error_description? string
---@field state string

---@class Token
---@field value? string

---@class TokenCreateData
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
---@field id? string
---@field name? string
---@field rawId? string
---@field response? table
---@field type? string

---@class WebAuthnCreateData
---@field id? string
---@field name? string
---@field rawId? string
---@field response? table
---@field type? string

---@class WebAuthnUpdateData
---@field id string
---@field name? string
---@field rawId? string
---@field response? table
---@field type? string

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
