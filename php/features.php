<?php
declare(strict_types=1);

// HankoPublic SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HankoPublicFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HankoPublicBaseFeature();
            case "test":
                return new HankoPublicTestFeature();
            default:
                return new HankoPublicBaseFeature();
        }
    }
}
