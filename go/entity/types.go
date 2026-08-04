// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CreateUserResponseObject is the typed data model for the create_user_response_object entity.
type CreateUserResponseObject struct {
}

// Credential is the typed data model for the credential entity.
type Credential struct {
	Aaguid *string `json:"aaguid,omitempty"`
	AttestationType *string `json:"attestation_type,omitempty"`
	BackupEligible *bool `json:"backup_eligible,omitempty"`
	BackupState *bool `json:"backup_state,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUsedAt *string `json:"last_used_at,omitempty"`
	MfaOnly *bool `json:"mfa_only,omitempty"`
	Name *string `json:"name,omitempty"`
	PublicKey *string `json:"public_key,omitempty"`
	Transport *[]any `json:"transport,omitempty"`
}

// CredentialListMatch is the typed request payload for Credential.ListTyped.
type CredentialListMatch struct {
	Aaguid *string `json:"aaguid,omitempty"`
	AttestationType *string `json:"attestation_type,omitempty"`
	BackupEligible *bool `json:"backup_eligible,omitempty"`
	BackupState *bool `json:"backup_state,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUsedAt *string `json:"last_used_at,omitempty"`
	MfaOnly *bool `json:"mfa_only,omitempty"`
	Name *string `json:"name,omitempty"`
	PublicKey *string `json:"public_key,omitempty"`
	Transport *[]any `json:"transport,omitempty"`
}

// CredentialCreationOption is the typed data model for the credential_creation_option entity.
type CredentialCreationOption struct {
	Attestation *string `json:"attestation,omitempty"`
	AuthenticatorSelection *map[string]any `json:"authenticator_selection,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	PubKeyCredParam *[]any `json:"pub_key_cred_param,omitempty"`
	Rp *map[string]any `json:"rp,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// CredentialCreationOptionCreateData is the typed request payload for CredentialCreationOption.CreateTyped.
type CredentialCreationOptionCreateData struct {
	Attestation *string `json:"attestation,omitempty"`
	AuthenticatorSelection *map[string]any `json:"authenticator_selection,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	PubKeyCredParam *[]any `json:"pub_key_cred_param,omitempty"`
	Rp *map[string]any `json:"rp,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// CredentialRequestOption is the typed data model for the credential_request_option entity.
type CredentialRequestOption struct {
	AllowCredential *[]any `json:"allow_credential,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	RpId *string `json:"rp_id,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	UserVerification *string `json:"user_verification,omitempty"`
}

// CredentialRequestOptionCreateData is the typed request payload for CredentialRequestOption.CreateTyped.
type CredentialRequestOptionCreateData struct {
	AllowCredential *[]any `json:"allow_credential,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	RpId *string `json:"rp_id,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	UserVerification *string `json:"user_verification,omitempty"`
}

// Email is the typed data model for the email entity.
type Email struct {
	Address string `json:"address"`
	Id *string `json:"id,omitempty"`
	Identity *any `json:"identity,omitempty"`
	IsPrimary *bool `json:"is_primary,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
}

// EmailListMatch is the typed request payload for Email.ListTyped.
type EmailListMatch struct {
	Address *string `json:"address,omitempty"`
	Id *string `json:"id,omitempty"`
	Identity *any `json:"identity,omitempty"`
	IsPrimary *bool `json:"is_primary,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
}

// EmailCreateData is the typed request payload for Email.CreateTyped.
type EmailCreateData struct {
	Address string `json:"address"`
	Id *string `json:"id,omitempty"`
	Identity *any `json:"identity,omitempty"`
	IsPrimary *bool `json:"is_primary,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
}

// EmailRemoveMatch is the typed request payload for Email.RemoveTyped.
type EmailRemoveMatch struct {
	Id string `json:"id"`
}

// EmailManagement is the typed data model for the email_management entity.
type EmailManagement struct {
}

// EmailManagementCreateData is the typed request payload for EmailManagement.CreateTyped.
type EmailManagementCreateData struct {
	Id string `json:"id"`
}

// HankoConfiguration is the typed data model for the hanko_configuration entity.
type HankoConfiguration struct {
	Account *map[string]any `json:"account,omitempty"`
	Email *map[string]any `json:"email,omitempty"`
	Password *map[string]any `json:"password,omitempty"`
}

// HankoConfigurationLoadMatch is the typed request payload for HankoConfiguration.LoadTyped.
type HankoConfigurationLoadMatch struct {
	Account *map[string]any `json:"account,omitempty"`
	Email *map[string]any `json:"email,omitempty"`
	Password *map[string]any `json:"password,omitempty"`
}

// JsonWebKeySet is the typed data model for the json_web_key_set entity.
type JsonWebKeySet struct {
	Alg *string `json:"alg,omitempty"`
	E *string `json:"e,omitempty"`
	Kid *string `json:"kid,omitempty"`
	Kty *string `json:"kty,omitempty"`
	N *string `json:"n,omitempty"`
	Use *string `json:"use,omitempty"`
}

// JsonWebKeySetListMatch is the typed request payload for JsonWebKeySet.ListTyped.
type JsonWebKeySetListMatch struct {
	Alg *string `json:"alg,omitempty"`
	E *string `json:"e,omitempty"`
	Kid *string `json:"kid,omitempty"`
	Kty *string `json:"kty,omitempty"`
	N *string `json:"n,omitempty"`
	Use *string `json:"use,omitempty"`
}

// Passcode is the typed data model for the passcode entity.
type Passcode struct {
	Code *string `json:"code,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Ttl *int `json:"ttl,omitempty"`
	UserId string `json:"user_id"`
}

// PasscodeCreateData is the typed request payload for Passcode.CreateTyped.
type PasscodeCreateData struct {
	Code *string `json:"code,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Ttl *int `json:"ttl,omitempty"`
	UserId string `json:"user_id"`
}

// Password is the typed data model for the password entity.
type Password struct {
	Password string `json:"password"`
	UserId string `json:"user_id"`
}

// PasswordCreateData is the typed request payload for Password.CreateTyped.
type PasswordCreateData struct {
	Password string `json:"password"`
	UserId string `json:"user_id"`
}

// PasswordUpdateData is the typed request payload for Password.UpdateTyped.
type PasswordUpdateData struct {
	Password *string `json:"password,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// Saml is the typed data model for the saml entity.
type Saml struct {
	AttributeMap *map[string]any `json:"attribute_map,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	MetadataUrl *string `json:"metadata_url,omitempty"`
	Name *string `json:"name,omitempty"`
	SkipEmailVerification *bool `json:"skip_email_verification,omitempty"`
}

// SamlLoadMatch is the typed request payload for Saml.LoadTyped.
type SamlLoadMatch struct {
	AttributeMap *map[string]any `json:"attribute_map,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	MetadataUrl *string `json:"metadata_url,omitempty"`
	Name *string `json:"name,omitempty"`
	SkipEmailVerification *bool `json:"skip_email_verification,omitempty"`
}

// SamlCreateData is the typed request payload for Saml.CreateTyped.
type SamlCreateData struct {
	AttributeMap *map[string]any `json:"attribute_map,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Enabled *bool `json:"enabled,omitempty"`
	MetadataUrl *string `json:"metadata_url,omitempty"`
	Name *string `json:"name,omitempty"`
	SkipEmailVerification *bool `json:"skip_email_verification,omitempty"`
}

// SessionManagement is the typed data model for the session_management entity.
type SessionManagement struct {
	Claim map[string]any `json:"claim"`
	ExpirationTime *string `json:"expiration_time,omitempty"`
	IdleExpiresAt *string `json:"idle_expires_at,omitempty"`
	IsValid *bool `json:"is_valid,omitempty"`
	SessionToken string `json:"session_token"`
	UserId *string `json:"user_id,omitempty"`
}

// SessionManagementLoadMatch is the typed request payload for SessionManagement.LoadTyped.
type SessionManagementLoadMatch struct {
	Claim *map[string]any `json:"claim,omitempty"`
	ExpirationTime *string `json:"expiration_time,omitempty"`
	IdleExpiresAt *string `json:"idle_expires_at,omitempty"`
	IsValid *bool `json:"is_valid,omitempty"`
	SessionToken *string `json:"session_token,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// SessionManagementCreateData is the typed request payload for SessionManagement.CreateTyped.
type SessionManagementCreateData struct {
	Claim map[string]any `json:"claim"`
	ExpirationTime *string `json:"expiration_time,omitempty"`
	IdleExpiresAt *string `json:"idle_expires_at,omitempty"`
	IsValid *bool `json:"is_valid,omitempty"`
	SessionToken string `json:"session_token"`
	UserId *string `json:"user_id,omitempty"`
}

// Status is the typed data model for the status entity.
type Status struct {
}

// StatusLoadMatch is the typed request payload for Status.LoadTyped.
type StatusLoadMatch struct {
}

// ThirdParty is the typed data model for the third_party entity.
type ThirdParty struct {
}

// ThirdPartyLoadMatch is the typed request payload for ThirdParty.LoadTyped.
type ThirdPartyLoadMatch struct {
}

// Token is the typed data model for the token entity.
type Token struct {
	Value *string `json:"value,omitempty"`
}

// TokenCreateData is the typed request payload for Token.CreateTyped.
type TokenCreateData struct {
	Value *string `json:"value,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredential *[]any `json:"webauthn_credential,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id string `json:"id"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredential *[]any `json:"webauthn_credential,omitempty"`
}

// UserRemoveMatch is the typed request payload for User.RemoveTyped.
type UserRemoveMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id string `json:"id"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredential *[]any `json:"webauthn_credential,omitempty"`
}

// UserManagement is the typed data model for the user_management entity.
type UserManagement struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// UserManagementListMatch is the typed request payload for UserManagement.ListTyped.
type UserManagementListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// UserManagementCreateData is the typed request payload for UserManagement.CreateTyped.
type UserManagementCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *[]any `json:"email,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkey *[]any `json:"passkey,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKey *[]any `json:"security_key,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// WebAuthn is the typed data model for the web_authn entity.
type WebAuthn struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"raw_id,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WebAuthnCreateData is the typed request payload for WebAuthn.CreateTyped.
type WebAuthnCreateData struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"raw_id,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WebAuthnUpdateData is the typed request payload for WebAuthn.UpdateTyped.
type WebAuthnUpdateData struct {
	Id string `json:"id"`
	CredentialId *string `json:"credential_id,omitempty"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"raw_id,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WebAuthnRemoveMatch is the typed request payload for WebAuthn.RemoveTyped.
type WebAuthnRemoveMatch struct {
	Id string `json:"id"`
}

// WebauthnLogin is the typed data model for the webauthn_login entity.
type WebauthnLogin struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	RawId *string `json:"raw_id,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WebauthnLoginCreateData is the typed request payload for WebauthnLogin.CreateTyped.
type WebauthnLoginCreateData struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	RawId *string `json:"raw_id,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
