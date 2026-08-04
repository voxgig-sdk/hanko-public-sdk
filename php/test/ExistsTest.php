<?php
declare(strict_types=1);

// HankoPublic SDK exists test

require_once __DIR__ . '/../hankopublic_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = HankoPublicSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
