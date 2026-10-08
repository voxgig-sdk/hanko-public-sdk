# WebAuthn entity test

require "minitest/autorun"
require "json"
require_relative "../HankoPublic_sdk"
require_relative "runner"

class WebAuthnEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = HankoPublicSDK.test(nil, nil)
    ent = testsdk.WebAuthn(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "web_authn" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = HankoPublicSDK.test(seed, nil).WebAuthn(nil).list(nil, nil)
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
        "web_authn" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = HankoPublicSDK.test(seed, nil)
    seen = base.WebAuthn(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = HankoPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = HankoPublicSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.WebAuthn(nil).stream("list", nil, nil).each do |item|
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
      raise "web_authn hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      HankoPublicSDK.test(offline, nil).WebAuthn(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    HankoPublicSDK.test(offline, nil).WebAuthn(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = HankoPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = HankoPublicSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.WebAuthn(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    HankoPublicSDK.test(nil, nil).WebAuthn(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = HankoPublicSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.WebAuthn(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.WebAuthn(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = HankoPublicConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = HankoPublicSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.WebAuthn(nil).list({ "aaguid" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = web_authn_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "web_authn." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    web_authn_ref01_ent = client.WebAuthn(nil)
    web_authn_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.web_authn"), "web_authn_ref01"))

    web_authn_ref01_data_result = web_authn_ref01_ent.create(web_authn_ref01_data, nil)
    web_authn_ref01_data = Helpers.to_map(web_authn_ref01_data_result.respond_to?(:data_get) ? web_authn_ref01_data_result.data_get : web_authn_ref01_data_result)
    assert !web_authn_ref01_data.nil?
    assert !web_authn_ref01_data["id"].nil?

    # LIST
    web_authn_ref01_match = {}

    web_authn_ref01_list_result = web_authn_ref01_ent.list(web_authn_ref01_match, nil)
    assert web_authn_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(web_authn_ref01_list_result),
      { "id" => web_authn_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    web_authn_ref01_data_up0_up = {
      "id" => web_authn_ref01_data["id"],
    }

    web_authn_ref01_markdef_up0_name = "aaguid"
    web_authn_ref01_markdef_up0_value = "Mark01-web_authn_ref01_#{setup[:now]}"
    web_authn_ref01_data_up0_up[web_authn_ref01_markdef_up0_name] = web_authn_ref01_markdef_up0_value

    web_authn_ref01_resdata_up0_result = web_authn_ref01_ent.update(web_authn_ref01_data_up0_up, nil)
    web_authn_ref01_resdata_up0 = Helpers.to_map(web_authn_ref01_resdata_up0_result.respond_to?(:data_get) ? web_authn_ref01_resdata_up0_result.data_get : web_authn_ref01_resdata_up0_result)
    assert !web_authn_ref01_resdata_up0.nil?
    assert_equal web_authn_ref01_resdata_up0["id"], web_authn_ref01_data_up0_up["id"]
    assert_equal web_authn_ref01_resdata_up0[web_authn_ref01_markdef_up0_name], web_authn_ref01_markdef_up0_value

    # REMOVE
    web_authn_ref01_match_rm0 = {
      "id" => web_authn_ref01_data["id"],
    }
    web_authn_ref01_ent.remove(web_authn_ref01_match_rm0, nil)

    # LIST
    web_authn_ref01_match_rt0 = {}

    web_authn_ref01_list_rt0_result = web_authn_ref01_ent.list(web_authn_ref01_match_rt0, nil)
    assert web_authn_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(web_authn_ref01_list_rt0_result),
      { "id" => web_authn_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def web_authn_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "web_authn", "WebAuthnTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HankoPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["web_authn01", "web_authn02", "web_authn03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID" => idmap,
    "HANKO_PUBLIC_TEST_LIVE" => "FALSE",
    "HANKO_PUBLIC_TEST_EXPLAIN" => "FALSE",
    "HANKO_PUBLIC_APIKEY" => "",
    "HANKO_PUBLIC_SERVER_TENANT_ID" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"])
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
