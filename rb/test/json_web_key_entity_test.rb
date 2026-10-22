# JsonWebKey entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class JsonWebKeyEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.JsonWebKey(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "json_web_key" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = HankoPublicSDK.test(seed, nil).JsonWebKey(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "json_web_key" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = HankoPublicSDK.test(seed, nil)
    seen = base.JsonWebKey(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = HankoPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = HankoPublicSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.JsonWebKey(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < HankoPublicBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "json_web_key hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      HankoPublicSDK.test(offline, nil).JsonWebKey(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    HankoPublicSDK.test(offline, nil).JsonWebKey(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = HankoPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = HankoPublicSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.JsonWebKey(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    HankoPublicSDK.test(nil, nil).JsonWebKey(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = HankoPublicSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.JsonWebKey(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.JsonWebKey(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = HankoPublicConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = HankoPublicSDK.test({ "entity" => { "json_web_key" => { "v1" => {  } } } }, opts).JsonWebKey(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      HankoPublicSDK.test({ "entity" => { "json_web_key" => { "v1" => { "alg" => 1 } } } }, opts).JsonWebKey(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = HankoPublicConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = HankoPublicSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.JsonWebKey(nil).list({ "alg" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = json_web_key_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "json_web_key." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    json_web_key_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.json_web_key")))
    json_web_key_ref01_data = nil
    if json_web_key_ref01_data_raw.length > 0
      json_web_key_ref01_data = Helpers.to_map(json_web_key_ref01_data_raw[0][1])
    end

    # LIST
    json_web_key_ref01_ent = client.JsonWebKey(nil)
    json_web_key_ref01_match = {}

    json_web_key_ref01_list_result = json_web_key_ref01_ent.list(json_web_key_ref01_match, nil)
    assert json_web_key_ref01_list_result.is_a?(Array)

  end
end

def json_web_key_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "json_web_key", "JsonWebKeyTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["json_web_key01", "json_web_key02", "json_web_key03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID" => idmap,
    "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
    "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKO_PUBLIC_APIKEY" => "",
    "HANKO_PUBLIC_SERVER_TENANT_ID" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKO_PUBLIC_TEST_JSON_WEB_KEY_ENTID"])
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
