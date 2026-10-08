<?php
declare(strict_types=1);

// WebAuthn entity test

require_once __DIR__ . '/../hankopublic_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WebAuthnEntityTestFailHook extends HankoPublicBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(HankoPublicContext $ctx, array $options): void
    {
    }

    public function PreSpec(HankoPublicContext $ctx): void
    {
        throw new \RuntimeException('web_authn hook failed');
    }

    public function PreUnexpected(HankoPublicContext $ctx): void
    {
        $this->unexpected++;
    }
}

class WebAuthnEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = HankoPublicSDK::test(null, null);
        $ent = $testsdk->WebAuthn(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "web_authn" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = HankoPublicSDK::test($seed, null);
        $seen = iterator_to_array($base->WebAuthn(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = HankoPublicConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = HankoPublicSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->WebAuthn(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(HankoPublicSDK::test($offline, null)->WebAuthn(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(HankoPublicSDK::test($offline, null)->WebAuthn(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = HankoPublicConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = HankoPublicSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->WebAuthn(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(HankoPublicSDK::test(null, null)->WebAuthn(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new WebAuthnEntityTestFailHook();
        $client = new HankoPublicSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->WebAuthn(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->WebAuthn(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = HankoPublicConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new HankoPublicSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('web_authn transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->WebAuthn(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(HankoPublicError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->WebAuthn(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = HankoPublicConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = HankoPublicSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->WebAuthn(null)->list(["aaguid" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = web_authn_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "web_authn." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];

        // CREATE
        $web_authn_ref01_ent = $client->WebAuthn(null);
        $web_authn_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.web_authn"), "web_authn_ref01"));

        $web_authn_ref01_data_result = $web_authn_ref01_ent->create($web_authn_ref01_data, null);
        $web_authn_ref01_data = Helpers::to_map(is_object($web_authn_ref01_data_result) && method_exists($web_authn_ref01_data_result, 'data_get') ? $web_authn_ref01_data_result->data_get() : $web_authn_ref01_data_result);
        $this->assertNotNull($web_authn_ref01_data);
        $this->assertNotNull($web_authn_ref01_data["id"]);

        // LIST
        $web_authn_ref01_match = [];

        $web_authn_ref01_list_result = $web_authn_ref01_ent->list($web_authn_ref01_match, null);
        $this->assertIsArray($web_authn_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($web_authn_ref01_list_result),
            ["id" => $web_authn_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $web_authn_ref01_data_up0_up = [
            "id" => $web_authn_ref01_data["id"],
        ];

        $web_authn_ref01_markdef_up0_name = "aaguid";
        $web_authn_ref01_markdef_up0_value = "Mark01-web_authn_ref01_" . $setup["now"];
        $web_authn_ref01_data_up0_up[$web_authn_ref01_markdef_up0_name] = $web_authn_ref01_markdef_up0_value;

        $web_authn_ref01_resdata_up0_result = $web_authn_ref01_ent->update($web_authn_ref01_data_up0_up, null);
        $web_authn_ref01_resdata_up0 = Helpers::to_map(is_object($web_authn_ref01_resdata_up0_result) && method_exists($web_authn_ref01_resdata_up0_result, 'data_get') ? $web_authn_ref01_resdata_up0_result->data_get() : $web_authn_ref01_resdata_up0_result);
        $this->assertNotNull($web_authn_ref01_resdata_up0);
        $this->assertEquals($web_authn_ref01_resdata_up0["id"], $web_authn_ref01_data_up0_up["id"]);
        $this->assertEquals($web_authn_ref01_resdata_up0[$web_authn_ref01_markdef_up0_name], $web_authn_ref01_markdef_up0_value);

        // REMOVE
        $web_authn_ref01_match_rm0 = [
            "id" => $web_authn_ref01_data["id"],
        ];
        $web_authn_ref01_ent->remove($web_authn_ref01_match_rm0, null);

        // LIST
        $web_authn_ref01_match_rt0 = [];

        $web_authn_ref01_list_rt0_result = $web_authn_ref01_ent->list($web_authn_ref01_match_rt0, null);
        $this->assertIsArray($web_authn_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($web_authn_ref01_list_rt0_result),
            ["id" => $web_authn_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function web_authn_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/web_authn/WebAuthnTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HankoPublicSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["web_authn01", "web_authn02", "web_authn03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID" => $idmap,
        "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
        "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
        "HANKO_PUBLIC_APIKEY" => "",
        "HANKO_PUBLIC_SERVER_TENANT_ID" => '',
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HANKO_PUBLIC_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["HANKO_PUBLIC_APIKEY"],
                "server" => [
                    "tenant_id" => $env["HANKO_PUBLIC_SERVER_TENANT_ID"],
                ],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new HankoPublicSDK(Helpers::to_map($merged_opts) ?? []);
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
