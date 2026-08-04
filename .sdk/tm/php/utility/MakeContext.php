<?php
declare(strict_types=1);

// HankoPublic SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HankoPublicMakeContext
{
    public static function call(array $ctxmap, ?HankoPublicContext $basectx): HankoPublicContext
    {
        return new HankoPublicContext($ctxmap, $basectx);
    }
}
