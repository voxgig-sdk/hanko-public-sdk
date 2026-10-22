# frozen_string_literal: true

# Typed models for the HankoPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# JsonWebKey entity data model.
#
# @!attribute [rw] alg
#   @return [String, nil]
#
# @!attribute [rw] e
#   @return [String, nil]
#
# @!attribute [rw] kid
#   @return [String, nil]
#
# @!attribute [rw] kty
#   @return [String, nil]
#
# @!attribute [rw] n
#   @return [String, nil]
#
# @!attribute [rw] use
#   @return [String, nil]
JsonWebKey = Struct.new(
  :alg,
  :e,
  :kid,
  :kty,
  :n,
  :use,
  keyword_init: true
)

# Request payload for JsonWebKey#list.
#
# @!attribute [rw] alg
#   @return [String, nil]
#
# @!attribute [rw] e
#   @return [String, nil]
#
# @!attribute [rw] kid
#   @return [String, nil]
#
# @!attribute [rw] kty
#   @return [String, nil]
#
# @!attribute [rw] n
#   @return [String, nil]
#
# @!attribute [rw] use
#   @return [String, nil]
JsonWebKeyListMatch = Struct.new(
  :alg,
  :e,
  :kid,
  :kty,
  :n,
  :use,
  keyword_init: true
)

# OrganizationManagement entity data model.
#
# @!attribute [rw] has_role
#   @return [Boolean]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] roles
#   @return [Array]
OrganizationManagement = Struct.new(
  :has_role,
  :organization_id,
  :roles,
  keyword_init: true
)

# Request payload for OrganizationManagement#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] roles
#   @return [Array]
OrganizationManagementCreateData = Struct.new(
  :organization_id,
  :roles,
  keyword_init: true
)

# Saml entity data model.
class Saml
end

# Request payload for Saml#load.
#
# @!attribute [rw] cert_only
#   @return [Boolean, nil]
#
# @!attribute [rw] domain
#   @return [String]
SamlLoadMatch = Struct.new(
  :cert_only,
  :domain,
  keyword_init: true
)

# Request payload for Saml#create.
class SamlCreateData
end

# SessionManagement entity data model.
#
# @!attribute [rw] claims
#   @return [Hash]
#
# @!attribute [rw] expiration_time
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] idle_expires_at
#   @return [String, nil]
#
# @!attribute [rw] is_valid
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organizations
#   @return [Array, nil]
#
# @!attribute [rw] roles
#   @return [Array]
#
# @!attribute [rw] session_token
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String, nil]
SessionManagement = Struct.new(
  :claims,
  :expiration_time,
  :id,
  :idle_expires_at,
  :is_valid,
  :name,
  :organizations,
  :roles,
  :session_token,
  :user_id,
  keyword_init: true
)

# Request payload for SessionManagement#list.
#
# @!attribute [rw] claims
#   @return [Hash, nil]
#
# @!attribute [rw] expiration_time
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] idle_expires_at
#   @return [String, nil]
#
# @!attribute [rw] is_valid
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organizations
#   @return [Array, nil]
#
# @!attribute [rw] roles
#   @return [Array, nil]
#
# @!attribute [rw] session_token
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
SessionManagementListMatch = Struct.new(
  :claims,
  :expiration_time,
  :id,
  :idle_expires_at,
  :is_valid,
  :name,
  :organizations,
  :roles,
  :session_token,
  :user_id,
  keyword_init: true
)

# Request payload for SessionManagement#create.
#
# @!attribute [rw] session_token
#   @return [String]
SessionManagementCreateData = Struct.new(
  :session_token,
  keyword_init: true
)

# Status entity data model.
class Status
end

# Request payload for Status#load.
class StatusLoadMatch
end

# ThirdParty entity data model.
class ThirdParty
end

# Request payload for ThirdParty#load.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] error_description
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
ThirdPartyLoadMatch = Struct.new(
  :code,
  :error,
  :error_description,
  :state,
  keyword_init: true
)

# UserManagement entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] emails
#   @return [Array, nil]
#
# @!attribute [rw] family_name
#   @return [String, nil]
#
# @!attribute [rw] given_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] mfa_config
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passkeys
#   @return [Array, nil]
#
# @!attribute [rw] picture
#   @return [String, nil]
#
# @!attribute [rw] security_keys
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [Hash, nil]
UserManagement = Struct.new(
  :created_at,
  :emails,
  :family_name,
  :given_name,
  :id,
  :metadata,
  :mfa_config,
  :name,
  :passkeys,
  :picture,
  :security_keys,
  :updated_at,
  :user_id,
  :username,
  keyword_init: true
)

# Request payload for UserManagement#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] emails
#   @return [Array, nil]
#
# @!attribute [rw] family_name
#   @return [String, nil]
#
# @!attribute [rw] given_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] mfa_config
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passkeys
#   @return [Array, nil]
#
# @!attribute [rw] picture
#   @return [String, nil]
#
# @!attribute [rw] security_keys
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [Hash, nil]
UserManagementListMatch = Struct.new(
  :created_at,
  :emails,
  :family_name,
  :given_name,
  :id,
  :metadata,
  :mfa_config,
  :name,
  :passkeys,
  :picture,
  :security_keys,
  :updated_at,
  :user_id,
  :username,
  keyword_init: true
)

# Request payload for UserManagement#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] emails
#   @return [Array, nil]
#
# @!attribute [rw] family_name
#   @return [String, nil]
#
# @!attribute [rw] given_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] mfa_config
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] passkeys
#   @return [Array, nil]
#
# @!attribute [rw] picture
#   @return [String, nil]
#
# @!attribute [rw] security_keys
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [Hash, nil]
UserManagementCreateData = Struct.new(
  :created_at,
  :emails,
  :family_name,
  :given_name,
  :id,
  :metadata,
  :mfa_config,
  :name,
  :passkeys,
  :picture,
  :security_keys,
  :updated_at,
  :user_id,
  :username,
  keyword_init: true
)

