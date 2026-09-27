# frozen_string_literal: true

# Typed models for the HankoPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Credential entity data model.
#
# @!attribute [rw] aaguid
#   @return [String, nil]
#
# @!attribute [rw] attestation_type
#   @return [String, nil]
#
# @!attribute [rw] backup_eligible
#   @return [Boolean, nil]
#
# @!attribute [rw] backup_state
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_used_at
#   @return [String, nil]
#
# @!attribute [rw] mfa_only
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] publickey
#   @return [String, nil]
#
# @!attribute [rw] transports
#   @return [Array, nil]
Credential = Struct.new(
  :aaguid,
  :attestation_type,
  :backup_eligible,
  :backup_state,
  :created_at,
  :id,
  :last_used_at,
  :mfa_only,
  :name,
  :publickey,
  :transports,
  keyword_init: true
)

# Request payload for Credential#list.
#
# @!attribute [rw] aaguid
#   @return [String, nil]
#
# @!attribute [rw] attestation_type
#   @return [String, nil]
#
# @!attribute [rw] backup_eligible
#   @return [Boolean, nil]
#
# @!attribute [rw] backup_state
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_used_at
#   @return [String, nil]
#
# @!attribute [rw] mfa_only
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] publickey
#   @return [String, nil]
#
# @!attribute [rw] transports
#   @return [Array, nil]
CredentialListMatch = Struct.new(
  :aaguid,
  :attestation_type,
  :backup_eligible,
  :backup_state,
  :created_at,
  :id,
  :last_used_at,
  :mfa_only,
  :name,
  :publickey,
  :transports,
  keyword_init: true
)

# CredentialCreationOption entity data model.
#
# @!attribute [rw] attestation
#   @return [String, nil]
#
# @!attribute [rw] authenticatorSelection
#   @return [Hash, nil]
#
# @!attribute [rw] challenge
#   @return [String, nil]
#
# @!attribute [rw] pubKeyCredParams
#   @return [Array, nil]
#
# @!attribute [rw] rp
#   @return [Hash, nil]
#
# @!attribute [rw] timeout
#   @return [Integer, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
CredentialCreationOption = Struct.new(
  :attestation,
  :authenticatorSelection,
  :challenge,
  :pubKeyCredParams,
  :rp,
  :timeout,
  :user,
  keyword_init: true
)

# Request payload for CredentialCreationOption#create.
#
# @!attribute [rw] attestation
#   @return [String, nil]
#
# @!attribute [rw] authenticatorSelection
#   @return [Hash, nil]
#
# @!attribute [rw] challenge
#   @return [String, nil]
#
# @!attribute [rw] pubKeyCredParams
#   @return [Array, nil]
#
# @!attribute [rw] rp
#   @return [Hash, nil]
#
# @!attribute [rw] timeout
#   @return [Integer, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
CredentialCreationOptionCreateData = Struct.new(
  :attestation,
  :authenticatorSelection,
  :challenge,
  :pubKeyCredParams,
  :rp,
  :timeout,
  :user,
  keyword_init: true
)

# CredentialRequestOption entity data model.
#
# @!attribute [rw] allowCredentials
#   @return [Array, nil]
#
# @!attribute [rw] challenge
#   @return [String, nil]
#
# @!attribute [rw] rpId
#   @return [String, nil]
#
# @!attribute [rw] timeout
#   @return [Integer, nil]
#
# @!attribute [rw] userVerification
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
CredentialRequestOption = Struct.new(
  :allowCredentials,
  :challenge,
  :rpId,
  :timeout,
  :userVerification,
  :user_id,
  keyword_init: true
)

# Request payload for CredentialRequestOption#create.
#
# @!attribute [rw] allowCredentials
#   @return [Array, nil]
#
# @!attribute [rw] challenge
#   @return [String, nil]
#
# @!attribute [rw] rpId
#   @return [String, nil]
#
# @!attribute [rw] timeout
#   @return [Integer, nil]
#
# @!attribute [rw] userVerification
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
CredentialRequestOptionCreateData = Struct.new(
  :allowCredentials,
  :challenge,
  :rpId,
  :timeout,
  :userVerification,
  :user_id,
  keyword_init: true
)

# Email entity data model.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identities
#   @return [Object, nil]
#
# @!attribute [rw] identity
#   @return [Object, nil]
#
# @!attribute [rw] is_primary
#   @return [Boolean, nil]
#
# @!attribute [rw] is_verified
#   @return [Boolean, nil]
Email = Struct.new(
  :address,
  :id,
  :identities,
  :identity,
  :is_primary,
  :is_verified,
  keyword_init: true
)

# Request payload for Email#list.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identities
#   @return [Object, nil]
#
# @!attribute [rw] identity
#   @return [Object, nil]
#
# @!attribute [rw] is_primary
#   @return [Boolean, nil]
#
# @!attribute [rw] is_verified
#   @return [Boolean, nil]
EmailListMatch = Struct.new(
  :address,
  :id,
  :identities,
  :identity,
  :is_primary,
  :is_verified,
  keyword_init: true
)

# Request payload for Email#create.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identities
#   @return [Object, nil]
#
# @!attribute [rw] identity
#   @return [Object, nil]
#
# @!attribute [rw] is_primary
#   @return [Boolean, nil]
#
# @!attribute [rw] is_verified
#   @return [Boolean, nil]
EmailCreateData = Struct.new(
  :address,
  :id,
  :identities,
  :identity,
  :is_primary,
  :is_verified,
  keyword_init: true
)

# Request payload for Email#remove.
#
# @!attribute [rw] id
#   @return [String]
EmailRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# HankoConfiguration entity data model.
#
# @!attribute [rw] account
#   @return [Hash, nil]
#
# @!attribute [rw] emails
#   @return [Hash, nil]
#
# @!attribute [rw] password
#   @return [Hash, nil]
HankoConfiguration = Struct.new(
  :account,
  :emails,
  :password,
  keyword_init: true
)

# Request payload for HankoConfiguration#load.
#
# @!attribute [rw] account
#   @return [Hash, nil]
#
# @!attribute [rw] emails
#   @return [Hash, nil]
#
# @!attribute [rw] password
#   @return [Hash, nil]
HankoConfigurationLoadMatch = Struct.new(
  :account,
  :emails,
  :password,
  keyword_init: true
)

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

# Passcode entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] email_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
Passcode = Struct.new(
  :code,
  :email_id,
  :id,
  :user_id,
  keyword_init: true
)

# Request payload for Passcode#create.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] email_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
PasscodeCreateData = Struct.new(
  :code,
  :email_id,
  :id,
  :user_id,
  keyword_init: true
)

# Password entity data model.
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
Password = Struct.new(
  :password,
  :user_id,
  keyword_init: true
)

# Request payload for Password#create.
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
PasswordCreateData = Struct.new(
  :password,
  :user_id,
  keyword_init: true
)

# Request payload for Password#update.
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
PasswordUpdateData = Struct.new(
  :password,
  :user_id,
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
# @!attribute [rw] amr
#   @return [Array, nil]
#
# @!attribute [rw] audience
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [Hash, nil]
#
# @!attribute [rw] expiration
#   @return [String]
#
# @!attribute [rw] issued_at
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [String, nil]
#
# @!attribute [rw] session_id
#   @return [String]
#
# @!attribute [rw] session_token
#   @return [String]
#
# @!attribute [rw] subject
#   @return [Object]
SessionManagement = Struct.new(
  :amr,
  :audience,
  :email,
  :expiration,
  :issued_at,
  :issuer,
  :session_id,
  :session_token,
  :subject,
  keyword_init: true
)

# Request payload for SessionManagement#load.
#
# @!attribute [rw] amr
#   @return [Array, nil]
#
# @!attribute [rw] audience
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [Hash, nil]
#
# @!attribute [rw] expiration
#   @return [String, nil]
#
# @!attribute [rw] issued_at
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [String, nil]
#
# @!attribute [rw] session_id
#   @return [String, nil]
#
# @!attribute [rw] session_token
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [Object, nil]
SessionManagementLoadMatch = Struct.new(
  :amr,
  :audience,
  :email,
  :expiration,
  :issued_at,
  :issuer,
  :session_id,
  :session_token,
  :subject,
  keyword_init: true
)

# Request payload for SessionManagement#create.
#
# @!attribute [rw] amr
#   @return [Array, nil]
#
# @!attribute [rw] audience
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [Hash, nil]
#
# @!attribute [rw] expiration
#   @return [String]
#
# @!attribute [rw] issued_at
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [String, nil]
#
# @!attribute [rw] session_id
#   @return [String]
#
# @!attribute [rw] session_token
#   @return [String]
#
# @!attribute [rw] subject
#   @return [Object]
SessionManagementCreateData = Struct.new(
  :amr,
  :audience,
  :email,
  :expiration,
  :issued_at,
  :issuer,
  :session_id,
  :session_token,
  :subject,
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

# Token entity data model.
#
# @!attribute [rw] value
#   @return [String, nil]
Token = Struct.new(
  :value,
  keyword_init: true
)

# Request payload for Token#create.
#
# @!attribute [rw] value
#   @return [String, nil]
TokenCreateData = Struct.new(
  :value,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_id
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
# @!attribute [rw] has_webauthn_credential
#   @return [Boolean, nil]
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
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] webauthn_credentials
#   @return [Array, nil]
User = Struct.new(
  :created_at,
  :email,
  :email_id,
  :emails,
  :family_name,
  :given_name,
  :has_webauthn_credential,
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
  :verified,
  :webauthn_credentials,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [String]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_id
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
# @!attribute [rw] has_webauthn_credential
#   @return [Boolean, nil]
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
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] webauthn_credentials
#   @return [Array, nil]
UserCreateData = Struct.new(
  :created_at,
  :email,
  :email_id,
  :emails,
  :family_name,
  :given_name,
  :has_webauthn_credential,
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
  :verified,
  :webauthn_credentials,
  keyword_init: true
)

# Request payload for User#remove.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_id
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
# @!attribute [rw] has_webauthn_credential
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
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
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] webauthn_credentials
#   @return [Array, nil]
UserRemoveMatch = Struct.new(
  :created_at,
  :email,
  :email_id,
  :emails,
  :family_name,
  :given_name,
  :has_webauthn_credential,
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
  :verified,
  :webauthn_credentials,
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

# WebAuthn entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rawId
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
WebAuthn = Struct.new(
  :id,
  :name,
  :rawId,
  :response,
  :type,
  keyword_init: true
)

# Request payload for WebAuthn#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rawId
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
WebAuthnCreateData = Struct.new(
  :id,
  :name,
  :rawId,
  :response,
  :type,
  keyword_init: true
)

# Request payload for WebAuthn#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rawId
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
WebAuthnUpdateData = Struct.new(
  :id,
  :name,
  :rawId,
  :response,
  :type,
  keyword_init: true
)

# Request payload for WebAuthn#remove.
#
# @!attribute [rw] id
#   @return [String]
WebAuthnRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# WebauthnLogin entity data model.
#
# @!attribute [rw] credential_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] rawId
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
WebauthnLogin = Struct.new(
  :credential_id,
  :id,
  :rawId,
  :response,
  :type,
  :user_id,
  keyword_init: true
)

# Request payload for WebauthnLogin#create.
#
# @!attribute [rw] credential_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] rawId
#   @return [String, nil]
#
# @!attribute [rw] response
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
WebauthnLoginCreateData = Struct.new(
  :credential_id,
  :id,
  :rawId,
  :response,
  :type,
  :user_id,
  keyword_init: true
)

