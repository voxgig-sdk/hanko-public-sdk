<?php
declare(strict_types=1);

// HankoPublic SDK utility: prepare_auth

class HankoPublicPrepareAuth
{
    private const COOKIE_AUTH = 'hanko';
    private const HEADER_COOKIE = 'cookie';
    private const OPTION_APIKEY = 'apikey';
    private const NOT_FOUND = '__NOTFOUND__';

    private static function applyCookie(array &$headers, ?string $value): void
    {
        $kept = [];
        $existing = $headers[self::HEADER_COOKIE] ?? '';

        if (is_string($existing) && '' !== $existing) {
            foreach (explode(';', $existing) as $part) {
                $piece = trim($part);
                if ('' === $piece || $piece === self::COOKIE_AUTH
                    || str_starts_with($piece, self::COOKIE_AUTH . '=')) {
                    continue;
                }
                $kept[] = $piece;
            }
        }

        if (null !== $value) {
            $kept[] = self::COOKIE_AUTH . '=' . $value;
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
            self::applyCookie($headers, null);
            return [$spec, null];
        }

        $apikey = \Voxgig\Struct\Struct::getprop($options, self::OPTION_APIKEY, self::NOT_FOUND);

        $missing = (is_string($apikey) && ($apikey === self::NOT_FOUND || $apikey === ''))
            || $apikey === null;

        if ($missing) {
            self::applyCookie($headers, null);
        } else {
            // One `Cookie:` header holds every cookie, separated by '; '.
            self::applyCookie($headers, is_string($apikey) ? $apikey : '');
        }

        return [$spec, null];
    }
}
