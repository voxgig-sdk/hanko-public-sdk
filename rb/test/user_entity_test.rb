# User entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class UserEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.User(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = HankoPublicConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = HankoPublicSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.User(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = user_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "user." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    user_ref01_ent = client.User(nil)
    user_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.user"), "user_ref01"))

    user_ref01_data_result = user_ref01_ent.create(user_ref01_data, nil)
    user_ref01_data = Helpers.to_map(user_ref01_data_result.respond_to?(:data_get) ? user_ref01_data_result.data_get : user_ref01_data_result)
    assert !user_ref01_data.nil?
    assert !user_ref01_data["id"].nil?

    # LOAD
    user_ref01_match_dt0 = {
      "id" => user_ref01_data["id"],
    }
    user_ref01_data_dt0_loaded = user_ref01_ent.load(user_ref01_match_dt0, nil)
    user_ref01_data_dt0_load_result = Helpers.to_map(user_ref01_data_dt0_loaded.respond_to?(:data_get) ? user_ref01_data_dt0_loaded.data_get : user_ref01_data_dt0_loaded)
    assert !user_ref01_data_dt0_load_result.nil?
    assert_equal user_ref01_data_dt0_load_result["id"], user_ref01_data["id"]

    # REMOVE
    user_ref01_match_rm0 = {
      "id" => user_ref01_data["id"],
    }
    user_ref01_ent.remove(user_ref01_match_rm0, nil)

  end
end

def user_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "user", "UserTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["user01", "user02", "user03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["HANKO_PUBLIC_TEST_USER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKO_PUBLIC_TEST_USER_ENTID" => idmap,
    "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
    "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKO_PUBLIC_APIKEY" => "",
    "HANKO_PUBLIC_SERVER_TENANT_ID" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKO_PUBLIC_TEST_USER_ENTID"])
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
