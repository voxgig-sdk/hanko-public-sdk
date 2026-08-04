// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CreateUserResponseObject {
}

export interface Credential {
  aaguid?: string
  attestation_type?: string
  backup_eligible?: boolean
  backup_state?: boolean
  created_at?: string
  id?: string
  last_used_at?: string
  mfa_only?: boolean
  name?: string
  public_key?: string
  transport?: any[]
}

export interface CredentialListMatch {
  aaguid?: string
  attestation_type?: string
  backup_eligible?: boolean
  backup_state?: boolean
  created_at?: string
  id?: string
  last_used_at?: string
  mfa_only?: boolean
  name?: string
  public_key?: string
  transport?: any[]
}

export interface CredentialCreationOption {
  attestation?: string
  authenticator_selection?: Record<string, any>
  challenge?: string
  pub_key_cred_param?: any[]
  rp?: Record<string, any>
  timeout?: number
  user?: Record<string, any>
}

export interface CredentialCreationOptionCreateData {
  attestation?: string
  authenticator_selection?: Record<string, any>
  challenge?: string
  pub_key_cred_param?: any[]
  rp?: Record<string, any>
  timeout?: number
  user?: Record<string, any>
}

export interface CredentialRequestOption {
  allow_credential?: any[]
  challenge?: string
  rp_id?: string
  timeout?: number
  user_id?: string
  user_verification?: string
}

export interface CredentialRequestOptionCreateData {
  allow_credential?: any[]
  challenge?: string
  rp_id?: string
  timeout?: number
  user_id?: string
  user_verification?: string
}

export interface Email {
  address: string
  id?: string
  identity?: any
  is_primary?: boolean
  is_verified?: boolean
}

export interface EmailListMatch {
  address?: string
  id?: string
  identity?: any
  is_primary?: boolean
  is_verified?: boolean
}

export interface EmailCreateData {
  address: string
  id?: string
  identity?: any
  is_primary?: boolean
  is_verified?: boolean
}

export interface EmailRemoveMatch {
  id: string
}

export interface EmailManagement {
}

export interface EmailManagementCreateData {
  id: string
}

export interface HankoConfiguration {
  account?: Record<string, any>
  email?: Record<string, any>
  password?: Record<string, any>
}

export interface HankoConfigurationLoadMatch {
  account?: Record<string, any>
  email?: Record<string, any>
  password?: Record<string, any>
}

export interface JsonWebKeySet {
  alg?: string
  e?: string
  kid?: string
  kty?: string
  n?: string
  use?: string
}

export interface JsonWebKeySetListMatch {
  alg?: string
  e?: string
  kid?: string
  kty?: string
  n?: string
  use?: string
}

export interface Passcode {
  code?: string
  created_at?: string
  email_id?: string
  id?: string
  ttl?: number
  user_id: string
}

export interface PasscodeCreateData {
  code?: string
  created_at?: string
  email_id?: string
  id?: string
  ttl?: number
  user_id: string
}

export interface Password {
  password: string
  user_id: string
}

export interface PasswordCreateData {
  password: string
  user_id: string
}

export interface PasswordUpdateData {
  password?: string
  user_id?: string
}

export interface Saml {
  attribute_map?: Record<string, any>
  domain?: string
  enabled?: boolean
  metadata_url?: string
  name?: string
  skip_email_verification?: boolean
}

export interface SamlLoadMatch {
  attribute_map?: Record<string, any>
  domain?: string
  enabled?: boolean
  metadata_url?: string
  name?: string
  skip_email_verification?: boolean
}

export interface SamlCreateData {
  attribute_map?: Record<string, any>
  domain?: string
  enabled?: boolean
  metadata_url?: string
  name?: string
  skip_email_verification?: boolean
}

export interface SessionManagement {
  claim: Record<string, any>
  expiration_time?: string
  idle_expires_at?: string
  is_valid?: boolean
  session_token: string
  user_id?: string
}

export interface SessionManagementLoadMatch {
  claim?: Record<string, any>
  expiration_time?: string
  idle_expires_at?: string
  is_valid?: boolean
  session_token?: string
  user_id?: string
}

export interface SessionManagementCreateData {
  claim: Record<string, any>
  expiration_time?: string
  idle_expires_at?: string
  is_valid?: boolean
  session_token: string
  user_id?: string
}

export interface Status {
}

export interface StatusLoadMatch {
}

export interface ThirdParty {
}

export interface ThirdPartyLoadMatch {
}

export interface Token {
  value?: string
}

export interface TokenCreateData {
  value?: string
}

export interface User {
  created_at?: string
  email?: any[]
  email_id?: string
  family_name?: string
  given_name?: string
  has_webauthn_credential?: boolean
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: string
  verified?: boolean
  webauthn_credential?: any[]
}

export interface UserLoadMatch {
  id: string
}

export interface UserCreateData {
  created_at?: string
  email?: any[]
  email_id?: string
  family_name?: string
  given_name?: string
  has_webauthn_credential?: boolean
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: string
  verified?: boolean
  webauthn_credential?: any[]
}

export interface UserRemoveMatch {
  created_at?: string
  email?: any[]
  email_id?: string
  family_name?: string
  given_name?: string
  has_webauthn_credential?: boolean
  id: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: string
  verified?: boolean
  webauthn_credential?: any[]
}

export interface UserManagement {
  created_at?: string
  email?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

export interface UserManagementListMatch {
  created_at?: string
  email?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

export interface UserManagementCreateData {
  created_at?: string
  email?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkey?: any[]
  picture?: string
  security_key?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

export interface WebAuthn {
  credential_id?: string
  id?: string
  name?: string
  raw_id?: string
  response?: Record<string, any>
  type?: string
  user_id?: string
}

export interface WebAuthnCreateData {
  credential_id?: string
  id?: string
  name?: string
  raw_id?: string
  response?: Record<string, any>
  type?: string
  user_id?: string
}

export interface WebAuthnUpdateData {
  id: string
  credential_id?: string
  name?: string
  raw_id?: string
  response?: Record<string, any>
  type?: string
  user_id?: string
}

export interface WebAuthnRemoveMatch {
  id: string
}

export interface WebauthnLogin {
  credential_id?: string
  id?: string
  raw_id?: string
  response?: Record<string, any>
  type?: string
  user_id?: string
}

export interface WebauthnLoginCreateData {
  credential_id?: string
  id?: string
  raw_id?: string
  response?: Record<string, any>
  type?: string
  user_id?: string
}

