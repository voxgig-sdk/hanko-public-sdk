# WebauthnLogin entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class WebauthnLoginEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.WebauthnLogin(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = webauthn_login_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "webauthn_login." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    webauthn_login_ref01_ent = client.WebauthnLogin(nil)
    webauthn_login_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.webauthn_login"), "webauthn_login_ref01"))

    webauthn_login_ref01_data_result = webauthn_login_ref01_ent.create(webauthn_login_ref01_data, nil)
    webauthn_login_ref01_data = Helpers.to_map(webauthn_login_ref01_data_result.respond_to?(:data_get) ? webauthn_login_ref01_data_result.data_get : webauthn_login_ref01_data_result)
    assert !webauthn_login_ref01_data.nil?
    assert !webauthn_login_ref01_data["id"].nil?

  end
end

def webauthn_login_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "webauthn_login", "WebauthnLoginTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["webauthn_login01", "webauthn_login02", "webauthn_login03"],
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
  entid_env_raw = ENV["HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID" => idmap,
    "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
    "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKO_PUBLIC_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["HANKO_PUBLIC_APIKEY"],
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
