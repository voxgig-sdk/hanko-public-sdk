<?php
declare(strict_types=1);

// HankoPublic SDK utility: prepare_body

class HankoPublicPrepareBody
{
    public static function call(HankoPublicContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
