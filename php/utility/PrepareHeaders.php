<?php
declare(strict_types=1);

// HankoPublic SDK utility: prepare_headers

class HankoPublicPrepareHeaders
{
    public static function call(HankoPublicContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
