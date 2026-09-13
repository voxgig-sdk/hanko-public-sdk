# ThirdParty entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class ThirdPartyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.ThirdParty(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = third_party_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "third_party." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    third_party_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.third_party")))
    third_party_ref01_data = nil
    if third_party_ref01_data_raw.length > 0
      third_party_ref01_data = Helpers.to_map(third_party_ref01_data_raw[0][1])
    end

    # LOAD
    third_party_ref01_ent = client.ThirdParty(nil)
    third_party_ref01_match_dt0 = {}
    third_party_ref01_data_dt0_loaded = third_party_ref01_ent.load(third_party_ref01_match_dt0, nil)
    assert !third_party_ref01_data_dt0_loaded.nil?

  end
end

def third_party_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "third_party", "ThirdPartyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["third_party01", "third_party02", "third_party03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID" => idmap,
    "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
    "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKO_PUBLIC_APIKEY" => "",
    "HANKO_PUBLIC_SERVER_TENANT_ID" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["HANKO_PUBLIC_APIKEY"],
        "server" => {
          "tenant_id" => env["HANKO_PUBLIC_SERVER_TENANT_ID"],
        },
      },
      extra || {},
    ])
    client = HankoPublicSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HANKO_PUBLIC_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
