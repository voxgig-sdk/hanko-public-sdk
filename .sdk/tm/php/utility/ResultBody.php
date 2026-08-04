<?php
declare(strict_types=1);

// HankoPublic SDK utility: result_body

class HankoPublicResultBody
{
    public static function call(HankoPublicContext $ctx): ?HankoPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
