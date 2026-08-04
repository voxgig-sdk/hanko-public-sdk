<?php
declare(strict_types=1);

// HankoPublic SDK utility: result_headers

class HankoPublicResultHeaders
{
    public static function call(HankoPublicContext $ctx): ?HankoPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
