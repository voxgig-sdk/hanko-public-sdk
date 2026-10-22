// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hanko-public-sdk/go/core"
)

// JsonWebKey is the typed data model for the json_web_key entity.
type JsonWebKey struct {
}

// JsonWebKeyListMatch is the typed request payload for JsonWebKey.ListTyped.
type JsonWebKeyListMatch struct {
	Alg *string `json:"alg,omitempty"`
	E *string `json:"e,omitempty"`
	Kid *string `json:"kid,omitempty"`
	Kty *string `json:"kty,omitempty"`
	N *string `json:"n,omitempty"`
	Use *string `json:"use,omitempty"`
}

// OrganizationManagement is the typed data model for the organization_management entity.
type OrganizationManagement struct {
}

// OrganizationManagementCreateData is the typed request payload for OrganizationManagement.CreateTyped.
type OrganizationManagementCreateData struct {
	OrganizationId string `json:"organization_id"`
	Roles []any `json:"roles"`
}

// Saml is the typed data model for the saml entity.
type Saml struct {
}

// SamlLoadMatch is the typed request payload for Saml.LoadTyped.
type SamlLoadMatch struct {
	CertOnly *bool `json:"cert_only,omitempty"`
	Domain string `json:"domain"`
}

// SamlCreateData is the typed request payload for Saml.CreateTyped.
type SamlCreateData struct {
}

// SessionManagement is the typed data model for the session_management entity.
type SessionManagement struct {
}

// SessionManagementListMatch is the typed request payload for SessionManagement.ListTyped.
type SessionManagementListMatch struct {
	Claims *map[string]any `json:"claims,omitempty"`
	ExpirationTime *string `json:"expiration_time,omitempty"`
	Id *string `json:"id,omitempty"`
	IdleExpiresAt *string `json:"idle_expires_at,omitempty"`
	IsValid *bool `json:"is_valid,omitempty"`
	Name *string `json:"name,omitempty"`
	Organizations *[]any `json:"organizations,omitempty"`
	Roles *[]any `json:"roles,omitempty"`
	SessionToken *string `json:"session_token,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// SessionManagementCreateData is the typed request payload for SessionManagement.CreateTyped.
type SessionManagementCreateData struct {
	SessionToken string `json:"session_token"`
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
	Code *string `json:"code,omitempty"`
	Error *string `json:"error,omitempty"`
	ErrorDescription *string `json:"error_description,omitempty"`
	State string `json:"state"`
}

// UserManagement is the typed data model for the user_management entity.
type UserManagement struct {
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
