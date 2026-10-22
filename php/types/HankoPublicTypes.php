<?php
declare(strict_types=1);

// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** JsonWebKey entity data model. */
class JsonWebKey
{
    public ?string $alg = null;
    public ?string $e = null;
    public ?string $kid = null;
    public ?string $kty = null;
    public ?string $n = null;
    public ?string $use = null;
}

/** Request payload for JsonWebKey#list. */
class JsonWebKeyListMatch
{
    public ?string $alg = null;
    public ?string $e = null;
    public ?string $kid = null;
    public ?string $kty = null;
    public ?string $n = null;
    public ?string $use = null;
}

/** OrganizationManagement entity data model. */
class OrganizationManagement
{
    public bool $has_role;
    public string $organization_id;
    public array $roles;
}

/** Request payload for OrganizationManagement#create. */
class OrganizationManagementCreateData
{
    public string $organization_id;
    public array $roles;
}

/** Saml entity data model. */
class Saml
{
}

/** Request payload for Saml#load. */
class SamlLoadMatch
{
    public ?bool $cert_only = null;
    public string $domain;
}

/** Request payload for Saml#create. */
class SamlCreateData
{
}

/** SessionManagement entity data model. */
class SessionManagement
{
    public array $claims;
    public ?string $expiration_time = null;
    public string $id;
    public ?string $idle_expires_at = null;
    public ?bool $is_valid = null;
    public string $name;
    public ?array $organizations = null;
    public array $roles;
    public string $session_token;
    public ?string $user_id = null;
}

/** Request payload for SessionManagement#list. */
class SessionManagementListMatch
{
    public ?array $claims = null;
    public ?string $expiration_time = null;
    public ?string $id = null;
    public ?string $idle_expires_at = null;
    public ?bool $is_valid = null;
    public ?string $name = null;
    public ?array $organizations = null;
    public ?array $roles = null;
    public ?string $session_token = null;
    public ?string $user_id = null;
}

/** Request payload for SessionManagement#create. */
class SessionManagementCreateData
{
    public string $session_token;
}

/** Status entity data model. */
class Status
{
}

/** Request payload for Status#load. */
class StatusLoadMatch
{
}

/** ThirdParty entity data model. */
class ThirdParty
{
}

/** Request payload for ThirdParty#load. */
class ThirdPartyLoadMatch
{
    public ?string $code = null;
    public ?string $error = null;
    public ?string $error_description = null;
    public string $state;
}

/** UserManagement entity data model. */
class UserManagement
{
    public ?string $created_at = null;
    public ?array $emails = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkeys = null;
    public ?string $picture = null;
    public ?array $security_keys = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

/** Request payload for UserManagement#list. */
class UserManagementListMatch
{
    public ?string $created_at = null;
    public ?array $emails = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkeys = null;
    public ?string $picture = null;
    public ?array $security_keys = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

/** Request payload for UserManagement#create. */
class UserManagementCreateData
{
    public ?string $created_at = null;
    public ?array $emails = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkeys = null;
    public ?string $picture = null;
    public ?array $security_keys = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

