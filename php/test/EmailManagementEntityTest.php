<?php
declare(strict_types=1);

// EmailManagement entity test

require_once __DIR__ . '/../hankopublic_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EmailManagementEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HankoPublicSDK::test(null, null);
        $ent = $testsdk->EmailManagement(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = email_management_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "email_management." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_EMAIL_MANAGEMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $email_management_ref01_ent = $client->EmailManagement(null);
        $email_management_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.email_management"), "email_management_ref01"));

        $email_management_ref01_data_result = $email_management_ref01_ent->create($email_management_ref01_data, null);
        $email_management_ref01_data = Helpers::to_map(is_object($email_management_ref01_data_result) && method_exists($email_management_ref01_data_result, 'data_get') ? $email_management_ref01_data_result->data_get() : $email_management_ref01_data_result);
        $this->assertNotNull($email_management_ref01_data);

    }
}

function email_management_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/email_management/EmailManagementTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HankoPublicSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["email_management01", "email_management02", "email_management03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HANKO_PUBLIC_TEST_EMAIL_MANAGEMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HANKO_PUBLIC_TEST_EMAIL_MANAGEMENT_ENTID" => $idmap,
        "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
        "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
        "HANKO_PUBLIC_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HANKO_PUBLIC_TEST_EMAIL_MANAGEMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HANKO_PUBLIC_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HANKO_PUBLIC_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new HankoPublicSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HANKO_PUBLIC_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HANKO_PUBLIC_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
