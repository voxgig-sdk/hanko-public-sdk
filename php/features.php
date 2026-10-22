<?php
declare(strict_types=1);

// HankoPublic SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/DebugFeature.php';
require_once __DIR__ . '/feature/IdempotencyFeature.php';
require_once __DIR__ . '/feature/MetricsFeature.php';
require_once __DIR__ . '/feature/PagingFeature.php';
require_once __DIR__ . '/feature/RatelimitFeature.php';
require_once __DIR__ . '/feature/RetryFeature.php';
require_once __DIR__ . '/feature/SecretsFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';
require_once __DIR__ . '/feature/TimeoutFeature.php';


class HankoPublicFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HankoPublicBaseFeature();
            case "debug":
                return new HankoPublicDebugFeature();
            case "idempotency":
                return new HankoPublicIdempotencyFeature();
            case "metrics":
                return new HankoPublicMetricsFeature();
            case "paging":
                return new HankoPublicPagingFeature();
            case "ratelimit":
                return new HankoPublicRatelimitFeature();
            case "retry":
                return new HankoPublicRetryFeature();
            case "secrets":
                return new HankoPublicSecretsFeature();
            case "test":
                return new HankoPublicTestFeature();
            case "timeout":
                return new HankoPublicTimeoutFeature();
            default:
                return new HankoPublicBaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "debug":
            case "idempotency":
            case "metrics":
            case "paging":
            case "ratelimit":
            case "retry":
            case "secrets":
            case "test":
            case "timeout":
                return true;
            default:
                return false;
        }
    }
}
