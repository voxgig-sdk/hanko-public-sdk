// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hanko-public-sdk/go/core"
)

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
	Publickey *string `json:"publickey,omitempty"`
	Transports *[]any `json:"transports,omitempty"`
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
	Publickey *string `json:"publickey,omitempty"`
	Transports *[]any `json:"transports,omitempty"`
}

// CredentialCreationOption is the typed data model for the credential_creation_option entity.
type CredentialCreationOption struct {
	Attestation *string `json:"attestation,omitempty"`
	AuthenticatorSelection *map[string]any `json:"authenticatorSelection,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	PubKeyCredParams *[]any `json:"pubKeyCredParams,omitempty"`
	Rp *map[string]any `json:"rp,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// CredentialCreationOptionCreateData is the typed request payload for CredentialCreationOption.CreateTyped.
type CredentialCreationOptionCreateData struct {
	Attestation *string `json:"attestation,omitempty"`
	AuthenticatorSelection *map[string]any `json:"authenticatorSelection,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	PubKeyCredParams *[]any `json:"pubKeyCredParams,omitempty"`
	Rp *map[string]any `json:"rp,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// CredentialRequestOption is the typed data model for the credential_request_option entity.
type CredentialRequestOption struct {
	AllowCredentials *[]any `json:"allowCredentials,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	RpId *string `json:"rpId,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	UserVerification *string `json:"userVerification,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// CredentialRequestOptionCreateData is the typed request payload for CredentialRequestOption.CreateTyped.
type CredentialRequestOptionCreateData struct {
	AllowCredentials *[]any `json:"allowCredentials,omitempty"`
	Challenge *string `json:"challenge,omitempty"`
	RpId *string `json:"rpId,omitempty"`
	Timeout *int `json:"timeout,omitempty"`
	UserVerification *string `json:"userVerification,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// Email is the typed data model for the email entity.
type Email struct {
	Address string `json:"address"`
	Id *string `json:"id,omitempty"`
	Identities *any `json:"identities,omitempty"`
	Identity *any `json:"identity,omitempty"`
	IsPrimary *bool `json:"is_primary,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
}

// EmailListMatch is the typed request payload for Email.ListTyped.
type EmailListMatch struct {
	Address *string `json:"address,omitempty"`
	Id *string `json:"id,omitempty"`
	Identities *any `json:"identities,omitempty"`
	Identity *any `json:"identity,omitempty"`
	IsPrimary *bool `json:"is_primary,omitempty"`
	IsVerified *bool `json:"is_verified,omitempty"`
}

// EmailCreateData is the typed request payload for Email.CreateTyped.
type EmailCreateData struct {
	Address string `json:"address"`
	Id *string `json:"id,omitempty"`
	Identities *any `json:"identities,omitempty"`
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
	Id *string `json:"id,omitempty"`
}

// EmailManagementCreateData is the typed request payload for EmailManagement.CreateTyped.
type EmailManagementCreateData struct {
	Id string `json:"id"`
}

// HankoConfiguration is the typed data model for the hanko_configuration entity.
type HankoConfiguration struct {
	Account *map[string]any `json:"account,omitempty"`
	Emails *map[string]any `json:"emails,omitempty"`
	Password *map[string]any `json:"password,omitempty"`
}

// HankoConfigurationLoadMatch is the typed request payload for HankoConfiguration.LoadTyped.
type HankoConfigurationLoadMatch struct {
	Account *map[string]any `json:"account,omitempty"`
	Emails *map[string]any `json:"emails,omitempty"`
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
	EmailId *string `json:"email_id,omitempty"`
	Id *string `json:"id,omitempty"`
	UserId string `json:"user_id"`
}

// PasscodeCreateData is the typed request payload for Passcode.CreateTyped.
type PasscodeCreateData struct {
	Code *string `json:"code,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Id *string `json:"id,omitempty"`
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
	Birthdate *string `json:"birthdate,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *string `json:"email_verified,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	Gender *string `json:"gender,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Locale *string `json:"locale,omitempty"`
	MiddleName *string `json:"middle_name,omitempty"`
	Name *string `json:"name,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	Phone *string `json:"phone,omitempty"`
	PhoneVerified *string `json:"phone_verified,omitempty"`
	Picture *string `json:"picture,omitempty"`
	PreferredUsername *string `json:"preferred_username,omitempty"`
	Profile *string `json:"profile,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Website *string `json:"website,omitempty"`
	ZoneInfo *string `json:"zone_info,omitempty"`
}

// SamlLoadMatch is the typed request payload for Saml.LoadTyped.
type SamlLoadMatch struct {
	Birthdate *string `json:"birthdate,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *string `json:"email_verified,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	Gender *string `json:"gender,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Locale *string `json:"locale,omitempty"`
	MiddleName *string `json:"middle_name,omitempty"`
	Name *string `json:"name,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	Phone *string `json:"phone,omitempty"`
	PhoneVerified *string `json:"phone_verified,omitempty"`
	Picture *string `json:"picture,omitempty"`
	PreferredUsername *string `json:"preferred_username,omitempty"`
	Profile *string `json:"profile,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Website *string `json:"website,omitempty"`
	ZoneInfo *string `json:"zone_info,omitempty"`
}

// SamlCreateData is the typed request payload for Saml.CreateTyped.
type SamlCreateData struct {
	Birthdate *string `json:"birthdate,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *string `json:"email_verified,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	Gender *string `json:"gender,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Locale *string `json:"locale,omitempty"`
	MiddleName *string `json:"middle_name,omitempty"`
	Name *string `json:"name,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	Phone *string `json:"phone,omitempty"`
	PhoneVerified *string `json:"phone_verified,omitempty"`
	Picture *string `json:"picture,omitempty"`
	PreferredUsername *string `json:"preferred_username,omitempty"`
	Profile *string `json:"profile,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Website *string `json:"website,omitempty"`
	ZoneInfo *string `json:"zone_info,omitempty"`
}

// SessionManagement is the typed data model for the session_management entity.
type SessionManagement struct {
	Amr *[]any `json:"amr,omitempty"`
	Audience *[]any `json:"audience,omitempty"`
	Email *map[string]any `json:"email,omitempty"`
	Expiration string `json:"expiration"`
	IssuedAt *string `json:"issued_at,omitempty"`
	Issuer *string `json:"issuer,omitempty"`
	SessionId string `json:"session_id"`
	SessionToken string `json:"session_token"`
	Subject any `json:"subject"`
}

// SessionManagementLoadMatch is the typed request payload for SessionManagement.LoadTyped.
type SessionManagementLoadMatch struct {
	Amr *[]any `json:"amr,omitempty"`
	Audience *[]any `json:"audience,omitempty"`
	Email *map[string]any `json:"email,omitempty"`
	Expiration *string `json:"expiration,omitempty"`
	IssuedAt *string `json:"issued_at,omitempty"`
	Issuer *string `json:"issuer,omitempty"`
	SessionId *string `json:"session_id,omitempty"`
	SessionToken *string `json:"session_token,omitempty"`
	Subject *any `json:"subject,omitempty"`
}

// SessionManagementCreateData is the typed request payload for SessionManagement.CreateTyped.
type SessionManagementCreateData struct {
	Amr *[]any `json:"amr,omitempty"`
	Audience *[]any `json:"audience,omitempty"`
	Email *map[string]any `json:"email,omitempty"`
	Expiration string `json:"expiration"`
	IssuedAt *string `json:"issued_at,omitempty"`
	Issuer *string `json:"issuer,omitempty"`
	SessionId string `json:"session_id"`
	SessionToken string `json:"session_token"`
	Subject any `json:"subject"`
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
	Email *string `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredentials *[]any `json:"webauthn_credentials,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id string `json:"id"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredentials *[]any `json:"webauthn_credentials,omitempty"`
}

// UserRemoveMatch is the typed request payload for User.RemoveTyped.
type UserRemoveMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailId *string `json:"email_id,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	HasWebauthnCredential *bool `json:"has_webauthn_credential,omitempty"`
	Id string `json:"id"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	WebauthnCredentials *[]any `json:"webauthn_credentials,omitempty"`
}

// UserManagement is the typed data model for the user_management entity.
type UserManagement struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// UserManagementListMatch is the typed request payload for UserManagement.ListTyped.
type UserManagementListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// UserManagementCreateData is the typed request payload for UserManagement.CreateTyped.
type UserManagementCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Emails *[]any `json:"emails,omitempty"`
	FamilyName *string `json:"family_name,omitempty"`
	GivenName *string `json:"given_name,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MfaConfig *map[string]any `json:"mfa_config,omitempty"`
	Name *string `json:"name,omitempty"`
	Passkeys *[]any `json:"passkeys,omitempty"`
	Picture *string `json:"picture,omitempty"`
	SecurityKeys *[]any `json:"security_keys,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Username *map[string]any `json:"username,omitempty"`
}

// WebAuthn is the typed data model for the web_authn entity.
type WebAuthn struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"rawId,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
}

// WebAuthnCreateData is the typed request payload for WebAuthn.CreateTyped.
type WebAuthnCreateData struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"rawId,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
}

// WebAuthnUpdateData is the typed request payload for WebAuthn.UpdateTyped.
type WebAuthnUpdateData struct {
	Id string `json:"id"`
	Name *string `json:"name,omitempty"`
	RawId *string `json:"rawId,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
}

// WebAuthnRemoveMatch is the typed request payload for WebAuthn.RemoveTyped.
type WebAuthnRemoveMatch struct {
	Id string `json:"id"`
}

// WebauthnLogin is the typed data model for the webauthn_login entity.
type WebauthnLogin struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	RawId *string `json:"rawId,omitempty"`
	Response *map[string]any `json:"response,omitempty"`
	Type *string `json:"type,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// WebauthnLoginCreateData is the typed request payload for WebauthnLogin.CreateTyped.
type WebauthnLoginCreateData struct {
	CredentialId *string `json:"credential_id,omitempty"`
	Id *string `json:"id,omitempty"`
	RawId *string `json:"rawId,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
