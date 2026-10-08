export interface CredentialCreationOption {
    attestation?: string;
    authenticatorSelection?: Record<string, any>;
    challenge?: string;
    pubKeyCredParams?: any[];
    rp?: Record<string, any>;
    timeout?: number;
    user?: Record<string, any>;
}
export interface CredentialCreationOptionCreateData {
    attestation?: string;
    authenticatorSelection?: Record<string, any>;
    challenge?: string;
    pubKeyCredParams?: any[];
    rp?: Record<string, any>;
    timeout?: number;
    user?: Record<string, any>;
}
export interface CredentialRequestOption {
    allowCredentials?: any[];
    challenge?: string;
    rpId?: string;
    timeout?: number;
    userVerification?: string;
    user_id?: string;
}
export interface CredentialRequestOptionCreateData {
    allowCredentials?: any[];
    challenge?: string;
    rpId?: string;
    timeout?: number;
    userVerification?: string;
    user_id?: string;
}
export interface Email {
    address: string;
    id?: string;
    identities?: any;
    identity?: any;
    is_primary?: boolean;
    is_verified?: boolean;
}
export interface EmailListMatch {
    address?: string;
    id?: string;
    identities?: any;
    identity?: any;
    is_primary?: boolean;
    is_verified?: boolean;
}
export interface EmailCreateData {
    address: string;
    id?: string;
    identities?: any;
    identity?: any;
    is_primary?: boolean;
    is_verified?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface EmailRemoveMatch {
    id: string;
}
export interface HankoConfiguration {
    account?: Record<string, any>;
    emails?: Record<string, any>;
    password?: Record<string, any>;
}
export interface HankoConfigurationLoadMatch {
    account?: Record<string, any>;
    emails?: Record<string, any>;
    password?: Record<string, any>;
}
export interface JsonWebKey {
    alg?: string;
    e?: string;
    kid?: string;
    kty?: string;
    n?: string;
    use?: string;
}
export interface JsonWebKeyListMatch {
    alg?: string;
    e?: string;
    kid?: string;
    kty?: string;
    n?: string;
    use?: string;
}
export interface Passcode {
    code?: string;
    created_at?: string;
    email_id?: string;
    id?: string;
    ttl?: number;
    user_id: string;
}
export interface PasscodeCreateData {
    code?: string;
    created_at?: string;
    email_id?: string;
    id?: string;
    ttl?: number;
    user_id: string;
}
export interface Password {
    password: string;
    user_id: string;
}
export interface PasswordCreateData {
    password: string;
    user_id: string;
    $action?: string;
    [action: string]: any;
}
export interface PasswordUpdateData {
    password?: string;
    user_id?: string;
}
export interface Saml {
}
export interface SamlLoadMatch {
    cert_only?: boolean;
    domain: string;
    $action?: string;
    [action: string]: any;
}
export interface SamlCreateData {
    $action?: string;
    [action: string]: any;
}
export interface SessionManagement {
    claims: Record<string, any>;
    expiration_time?: string;
    idle_expires_at?: string;
    is_valid?: boolean;
    session_token: string;
    user_id?: string;
}
export interface SessionManagementLoadMatch {
    claims?: Record<string, any>;
    expiration_time?: string;
    idle_expires_at?: string;
    is_valid?: boolean;
    session_token?: string;
    user_id?: string;
}
export interface SessionManagementCreateData {
    claims: Record<string, any>;
    expiration_time?: string;
    idle_expires_at?: string;
    is_valid?: boolean;
    session_token: string;
    user_id?: string;
}
export interface Status {
}
export interface StatusLoadMatch {
}
export interface ThirdParty {
}
export interface ThirdPartyLoadMatch {
    provider: string;
    redirect_to: string;
}
export interface Token {
    user_id?: string;
    value?: string;
}
export interface TokenCreateData {
    user_id?: string;
    value?: string;
}
export interface User {
    created_at?: string;
    email?: string;
    email_id?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    has_webauthn_credential?: boolean;
    id?: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: string;
    verified?: boolean;
    webauthn_credentials?: any[];
}
export interface UserLoadMatch {
    id: string;
}
export interface UserCreateData {
    created_at?: string;
    email?: string;
    email_id?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    has_webauthn_credential?: boolean;
    id?: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: string;
    verified?: boolean;
    webauthn_credentials?: any[];
}
export interface UserRemoveMatch {
    created_at?: string;
    email?: string;
    email_id?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    has_webauthn_credential?: boolean;
    id: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: string;
    verified?: boolean;
    webauthn_credentials?: any[];
}
export interface UserManagement {
    created_at?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    id?: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: Record<string, any>;
}
export interface UserManagementListMatch {
    created_at?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    id?: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: Record<string, any>;
}
export interface UserManagementCreateData {
    created_at?: string;
    emails?: any[];
    family_name?: string;
    given_name?: string;
    id?: string;
    metadata?: Record<string, any>;
    mfa_config?: Record<string, any>;
    name?: string;
    passkeys?: any[];
    picture?: string;
    security_keys?: any[];
    updated_at?: string;
    user_id?: string;
    username?: Record<string, any>;
}
export interface WebAuthn {
    aaguid?: string;
    attestation_type?: string;
    backup_eligible?: boolean;
    backup_state?: boolean;
    created_at?: string;
    credential_id?: string;
    id?: string;
    last_used_at?: string;
    mfa_only?: boolean;
    name?: string;
    publickey?: string;
    rawId?: string;
    response?: Record<string, any>;
    transports?: any[];
    type?: string;
    user_id?: string;
}
export interface WebAuthnListMatch {
    aaguid?: string;
    attestation_type?: string;
    backup_eligible?: boolean;
    backup_state?: boolean;
    created_at?: string;
    credential_id?: string;
    id?: string;
    last_used_at?: string;
    mfa_only?: boolean;
    name?: string;
    publickey?: string;
    rawId?: string;
    response?: Record<string, any>;
    transports?: any[];
    type?: string;
    user_id?: string;
}
export interface WebAuthnCreateData {
    aaguid?: string;
    attestation_type?: string;
    backup_eligible?: boolean;
    backup_state?: boolean;
    created_at?: string;
    credential_id?: string;
    id?: string;
    last_used_at?: string;
    mfa_only?: boolean;
    name?: string;
    publickey?: string;
    rawId?: string;
    response?: Record<string, any>;
    transports?: any[];
    type?: string;
    user_id?: string;
}
export interface WebAuthnUpdateData {
    id: string;
    aaguid?: string;
    attestation_type?: string;
    backup_eligible?: boolean;
    backup_state?: boolean;
    created_at?: string;
    credential_id?: string;
    last_used_at?: string;
    mfa_only?: boolean;
    name?: string;
    publickey?: string;
    rawId?: string;
    response?: Record<string, any>;
    transports?: any[];
    type?: string;
    user_id?: string;
}
export interface WebAuthnRemoveMatch {
    id: string;
}
export interface WebauthnLogin {
    credential_id?: string;
    id?: string;
    rawId?: string;
    response?: Record<string, any>;
    type?: string;
    user_id?: string;
}
export interface WebauthnLoginCreateData {
    credential_id?: string;
    id?: string;
    rawId?: string;
    response?: Record<string, any>;
    type?: string;
    user_id?: string;
}
