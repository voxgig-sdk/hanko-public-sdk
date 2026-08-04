# Password entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class PasswordEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.Password(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = password_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "password." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HANKOPUBLIC_TEST_PASSWORD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    password_ref01_ent = client.Password(nil)
    password_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.password"), "password_ref01"))

    password_ref01_data_result = password_ref01_ent.create(password_ref01_data, nil)
    password_ref01_data = Helpers.to_map(password_ref01_data_result)
    assert !password_ref01_data.nil?

    # UPDATE
    password_ref01_data_up0_up = {
    }

    password_ref01_markdef_up0_name = "password"
    password_ref01_markdef_up0_value = "Mark01-password_ref01_#{setup[:now]}"
    password_ref01_data_up0_up[password_ref01_markdef_up0_name] = password_ref01_markdef_up0_value

    password_ref01_resdata_up0_result = password_ref01_ent.update(password_ref01_data_up0_up, nil)
    password_ref01_resdata_up0 = Helpers.to_map(password_ref01_resdata_up0_result)
    assert !password_ref01_resdata_up0.nil?
    assert_equal password_ref01_resdata_up0[password_ref01_markdef_up0_name], password_ref01_markdef_up0_value

  end
end

def password_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "password", "PasswordTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["password01", "password02", "password03"],
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
  entid_env_raw = ENV["HANKOPUBLIC_TEST_PASSWORD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKOPUBLIC_TEST_PASSWORD_ENTID" => idmap,
    "HANKOPUBLIC_TEST_LIVE" => "FALSE",
    "HANKOPUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKOPUBLIC_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKOPUBLIC_TEST_PASSWORD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HANKOPUBLIC_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["HANKOPUBLIC_APIKEY"],
      },
      extra || {},
    ])
    client = HankoPublicSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HANKOPUBLIC_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HANKOPUBLIC_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
