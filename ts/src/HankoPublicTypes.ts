// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface JsonWebKey {
  alg?: string
  e?: string
  kid?: string
  kty?: string
  n?: string
  use?: string
}

export interface JsonWebKeyListMatch {
  alg?: string
  e?: string
  kid?: string
  kty?: string
  n?: string
  use?: string
}

export interface OrganizationManagement {
  has_role: boolean
  organization_id: string
  roles: any[]
}

export interface OrganizationManagementCreateData {
  organization_id: string
  roles: any[]
}

export interface Saml {
}

export interface SamlLoadMatch {
  cert_only?: boolean
  domain: string

  // Selects a custom action instead of the plain load:
  //   'metadata'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SamlCreateData {

  // Selects a custom action instead of the plain create:
  //   'callback'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SessionManagement {
  claims: Record<string, any>
  expiration_time?: string
  id: string
  idle_expires_at?: string
  is_valid?: boolean
  name: string
  organizations?: any[]
  roles: any[]
  session_token: string
  user_id?: string
}

export interface SessionManagementListMatch {
  claims?: Record<string, any>
  expiration_time?: string
  id?: string
  idle_expires_at?: string
  is_valid?: boolean
  name?: string
  organizations?: any[]
  roles?: any[]
  session_token?: string
  user_id?: string
}

export interface SessionManagementCreateData {
  session_token: string
}

export interface Status {
}

export interface StatusLoadMatch {
}

export interface ThirdParty {
}

export interface ThirdPartyLoadMatch {
  code?: string
  error?: string
  error_description?: string
  state: string
}

export interface UserManagement {
  created_at?: string
  emails?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkeys?: any[]
  picture?: string
  security_keys?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

export interface UserManagementListMatch {
  created_at?: string
  emails?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkeys?: any[]
  picture?: string
  security_keys?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

export interface UserManagementCreateData {
  created_at?: string
  emails?: any[]
  family_name?: string
  given_name?: string
  id?: string
  metadata?: Record<string, any>
  mfa_config?: Record<string, any>
  name?: string
  passkeys?: any[]
  picture?: string
  security_keys?: any[]
  updated_at?: string
  user_id?: string
  username?: Record<string, any>
}

