<?php
declare(strict_types=1);

// HankoPublic SDK utility: prepare_auth

require_once __DIR__ . '/PrepareHeaders.php';

class HankoPublicPrepareAuth
{
    private const COOKIE_AUTH = 'hanko';
    private const HEADER_COOKIE = 'cookie';
    private const OPTION_APIKEY = 'apikey';
    private const NOT_FOUND = '__NOTFOUND__';

    // The client's auth.name option, when set, replaces the name the API declares.
    private static function authName(array $options): string
    {
        $name = \Voxgig\Struct\Struct::getpath($options, 'auth.name');
        return is_string($name) && '' !== $name ? $name : self::COOKIE_AUTH;
    }

    private static function applyCookie(array &$headers, string $name, ?string $value): void
    {
        $existing = $headers[self::HEADER_COOKIE] ?? '';
        $kept = is_string($existing) ? HankoPublicPrepareHeaders::cookieKeep($existing, [$name]) : [];

        if (null !== $value) {
            $kept[] = $name . '=' . $value;
        }

        if ([] === $kept) {
            unset($headers[self::HEADER_COOKIE]);
        } else {
            $headers[self::HEADER_COOKIE] = implode('; ', $kept);
        }
    }

    public static function call(HankoPublicContext $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('auth_no_spec', 'Expected context spec property to be defined.')];
        }

        $headers = &$spec->headers;
        $options = $ctx->client->options_map();

        // Public APIs that need no auth omit the options.auth block entirely.
        if (!isset($options['auth']) || $options['auth'] === null) {
            self::applyCookie($headers, self::COOKIE_AUTH, null);
            return [$spec, null];
        }

        $name = self::authName($options);

        // A credential left under the declared name would travel beside the renamed one.
        if ($name !== self::COOKIE_AUTH) {
            self::applyCookie($headers, self::COOKIE_AUTH, null);
        }

        $apikey = \Voxgig\Struct\Struct::getprop($options, self::OPTION_APIKEY, self::NOT_FOUND);

        $missing = (is_string($apikey) && ($apikey === self::NOT_FOUND || $apikey === ''))
            || $apikey === null;

        if ($missing) {
            self::applyCookie($headers, $name, null);
        } else {
            // One `Cookie:` header holds every cookie, separated by '; '.
            self::applyCookie($headers, $name, is_string($apikey) ? $apikey : '');
        }

        return [$spec, null];
    }
}
