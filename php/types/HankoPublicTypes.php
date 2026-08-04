<?php
declare(strict_types=1);

// Typed models for the HankoPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CreateUserResponseObject entity data model. */
class CreateUserResponseObject
{
}

/** Credential entity data model. */
class Credential
{
    public ?string $aaguid = null;
    public ?string $attestation_type = null;
    public ?bool $backup_eligible = null;
    public ?bool $backup_state = null;
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $last_used_at = null;
    public ?bool $mfa_only = null;
    public ?string $name = null;
    public ?string $public_key = null;
    public ?array $transport = null;
}

/** Request payload for Credential#list. */
class CredentialListMatch
{
    public ?string $aaguid = null;
    public ?string $attestation_type = null;
    public ?bool $backup_eligible = null;
    public ?bool $backup_state = null;
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $last_used_at = null;
    public ?bool $mfa_only = null;
    public ?string $name = null;
    public ?string $public_key = null;
    public ?array $transport = null;
}

/** CredentialCreationOption entity data model. */
class CredentialCreationOption
{
    public ?string $attestation = null;
    public ?array $authenticator_selection = null;
    public ?string $challenge = null;
    public ?array $pub_key_cred_param = null;
    public ?array $rp = null;
    public ?int $timeout = null;
    public ?array $user = null;
}

/** Request payload for CredentialCreationOption#create. */
class CredentialCreationOptionCreateData
{
    public ?string $attestation = null;
    public ?array $authenticator_selection = null;
    public ?string $challenge = null;
    public ?array $pub_key_cred_param = null;
    public ?array $rp = null;
    public ?int $timeout = null;
    public ?array $user = null;
}

/** CredentialRequestOption entity data model. */
class CredentialRequestOption
{
    public ?array $allow_credential = null;
    public ?string $challenge = null;
    public ?string $rp_id = null;
    public ?int $timeout = null;
    public ?string $user_id = null;
    public ?string $user_verification = null;
}

/** Request payload for CredentialRequestOption#create. */
class CredentialRequestOptionCreateData
{
    public ?array $allow_credential = null;
    public ?string $challenge = null;
    public ?string $rp_id = null;
    public ?int $timeout = null;
    public ?string $user_id = null;
    public ?string $user_verification = null;
}

/** Email entity data model. */
class Email
{
    public string $address;
    public ?string $id = null;
    public mixed $identity = null;
    public ?bool $is_primary = null;
    public ?bool $is_verified = null;
}

/** Request payload for Email#list. */
class EmailListMatch
{
    public ?string $address = null;
    public ?string $id = null;
    public mixed $identity = null;
    public ?bool $is_primary = null;
    public ?bool $is_verified = null;
}

/** Request payload for Email#create. */
class EmailCreateData
{
    public string $address;
    public ?string $id = null;
    public mixed $identity = null;
    public ?bool $is_primary = null;
    public ?bool $is_verified = null;
}

/** Request payload for Email#remove. */
class EmailRemoveMatch
{
    public string $id;
}

/** EmailManagement entity data model. */
class EmailManagement
{
}

/** Request payload for EmailManagement#create. */
class EmailManagementCreateData
{
    public string $id;
}

/** HankoConfiguration entity data model. */
class HankoConfiguration
{
    public ?array $account = null;
    public ?array $email = null;
    public ?array $password = null;
}

/** Request payload for HankoConfiguration#load. */
class HankoConfigurationLoadMatch
{
    public ?array $account = null;
    public ?array $email = null;
    public ?array $password = null;
}

/** JsonWebKeySet entity data model. */
class JsonWebKeySet
{
    public ?string $alg = null;
    public ?string $e = null;
    public ?string $kid = null;
    public ?string $kty = null;
    public ?string $n = null;
    public ?string $use = null;
}

/** Request payload for JsonWebKeySet#list. */
class JsonWebKeySetListMatch
{
    public ?string $alg = null;
    public ?string $e = null;
    public ?string $kid = null;
    public ?string $kty = null;
    public ?string $n = null;
    public ?string $use = null;
}

/** Passcode entity data model. */
class Passcode
{
    public ?string $code = null;
    public ?string $created_at = null;
    public ?string $email_id = null;
    public ?string $id = null;
    public ?int $ttl = null;
    public string $user_id;
}

/** Request payload for Passcode#create. */
class PasscodeCreateData
{
    public ?string $code = null;
    public ?string $created_at = null;
    public ?string $email_id = null;
    public ?string $id = null;
    public ?int $ttl = null;
    public string $user_id;
}

/** Password entity data model. */
class Password
{
    public string $password;
    public string $user_id;
}

/** Request payload for Password#create. */
class PasswordCreateData
{
    public string $password;
    public string $user_id;
}

/** Request payload for Password#update. */
class PasswordUpdateData
{
    public ?string $password = null;
    public ?string $user_id = null;
}

/** Saml entity data model. */
class Saml
{
    public ?array $attribute_map = null;
    public ?string $domain = null;
    public ?bool $enabled = null;
    public ?string $metadata_url = null;
    public ?string $name = null;
    public ?bool $skip_email_verification = null;
}

/** Request payload for Saml#load. */
class SamlLoadMatch
{
    public ?array $attribute_map = null;
    public ?string $domain = null;
    public ?bool $enabled = null;
    public ?string $metadata_url = null;
    public ?string $name = null;
    public ?bool $skip_email_verification = null;
}

/** Request payload for Saml#create. */
class SamlCreateData
{
    public ?array $attribute_map = null;
    public ?string $domain = null;
    public ?bool $enabled = null;
    public ?string $metadata_url = null;
    public ?string $name = null;
    public ?bool $skip_email_verification = null;
}

/** SessionManagement entity data model. */
class SessionManagement
{
    public array $claim;
    public ?string $expiration_time = null;
    public ?string $idle_expires_at = null;
    public ?bool $is_valid = null;
    public string $session_token;
    public ?string $user_id = null;
}

/** Request payload for SessionManagement#load. */
class SessionManagementLoadMatch
{
    public ?array $claim = null;
    public ?string $expiration_time = null;
    public ?string $idle_expires_at = null;
    public ?bool $is_valid = null;
    public ?string $session_token = null;
    public ?string $user_id = null;
}

/** Request payload for SessionManagement#create. */
class SessionManagementCreateData
{
    public array $claim;
    public ?string $expiration_time = null;
    public ?string $idle_expires_at = null;
    public ?bool $is_valid = null;
    public string $session_token;
    public ?string $user_id = null;
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
}

/** Token entity data model. */
class Token
{
    public ?string $value = null;
}

/** Request payload for Token#create. */
class TokenCreateData
{
    public ?string $value = null;
}

/** User entity data model. */
class User
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $email_id = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?bool $has_webauthn_credential = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $username = null;
    public ?bool $verified = null;
    public ?array $webauthn_credential = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public string $id;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $email_id = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?bool $has_webauthn_credential = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $username = null;
    public ?bool $verified = null;
    public ?array $webauthn_credential = null;
}

/** Request payload for User#remove. */
class UserRemoveMatch
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $email_id = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?bool $has_webauthn_credential = null;
    public string $id;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?string $username = null;
    public ?bool $verified = null;
    public ?array $webauthn_credential = null;
}

/** UserManagement entity data model. */
class UserManagement
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

/** Request payload for UserManagement#list. */
class UserManagementListMatch
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

/** Request payload for UserManagement#create. */
class UserManagementCreateData
{
    public ?string $created_at = null;
    public ?array $email = null;
    public ?string $family_name = null;
    public ?string $given_name = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?array $mfa_config = null;
    public ?string $name = null;
    public ?array $passkey = null;
    public ?string $picture = null;
    public ?array $security_key = null;
    public ?string $updated_at = null;
    public ?string $user_id = null;
    public ?array $username = null;
}

/** WebAuthn entity data model. */
class WebAuthn
{
    public ?string $credential_id = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $raw_id = null;
    public ?array $response = null;
    public ?string $type = null;
    public ?string $user_id = null;
}

/** Request payload for WebAuthn#create. */
class WebAuthnCreateData
{
    public ?string $credential_id = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $raw_id = null;
    public ?array $response = null;
    public ?string $type = null;
    public ?string $user_id = null;
}

/** Request payload for WebAuthn#update. */
class WebAuthnUpdateData
{
    public string $id;
    public ?string $credential_id = null;
    public ?string $name = null;
    public ?string $raw_id = null;
    public ?array $response = null;
    public ?string $type = null;
    public ?string $user_id = null;
}

/** Request payload for WebAuthn#remove. */
class WebAuthnRemoveMatch
{
    public string $id;
}

/** WebauthnLogin entity data model. */
class WebauthnLogin
{
    public ?string $credential_id = null;
    public ?string $id = null;
    public ?string $raw_id = null;
    public ?array $response = null;
    public ?string $type = null;
    public ?string $user_id = null;
}

/** Request payload for WebauthnLogin#create. */
class WebauthnLoginCreateData
{
    public ?string $credential_id = null;
    public ?string $id = null;
    public ?string $raw_id = null;
    public ?array $response = null;
    public ?string $type = null;
    public ?string $user_id = null;
}

