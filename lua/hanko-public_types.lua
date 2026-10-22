-- Typed models for the HankoPublic SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

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

---@class OrganizationManagement
---@field has_role boolean
---@field organization_id string
---@field roles table

---@class OrganizationManagementCreateData
---@field organization_id string
---@field roles table

---@class Saml

---@class SamlLoadMatch
---@field cert_only? boolean
---@field domain string

---@class SamlCreateData

---@class SessionManagement
---@field claims table
---@field expiration_time? string
---@field id string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field name string
---@field organizations? table
---@field roles table
---@field session_token string
---@field user_id? string

---@class SessionManagementListMatch
---@field claims? table
---@field expiration_time? string
---@field id? string
---@field idle_expires_at? string
---@field is_valid? boolean
---@field name? string
---@field organizations? table
---@field roles? table
---@field session_token? string
---@field user_id? string

---@class SessionManagementCreateData
---@field session_token string

---@class Status

---@class StatusLoadMatch

---@class ThirdParty

---@class ThirdPartyLoadMatch
---@field code? string
---@field error? string
---@field error_description? string
---@field state string

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

local M = {}

return M
