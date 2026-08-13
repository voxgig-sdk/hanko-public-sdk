-- WebauthnLogin entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hanko-public_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("WebauthnLoginEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:WebauthnLogin(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = webauthn_login_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "webauthn_login." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local webauthn_login_ref01_ent = client:WebauthnLogin(nil)
    local webauthn_login_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.webauthn_login"), "webauthn_login_ref01"))

    local webauthn_login_ref01_data_result, err = webauthn_login_ref01_ent:create(webauthn_login_ref01_data, nil)
    assert.is_nil(err)
    webauthn_login_ref01_data = helpers.to_map(type(webauthn_login_ref01_data_result) == 'table' and webauthn_login_ref01_data_result.data_get and webauthn_login_ref01_data_result:data_get() or webauthn_login_ref01_data_result)
    assert.is_not_nil(webauthn_login_ref01_data)
    assert.is_not_nil(webauthn_login_ref01_data["id"])

  end)
end)

function webauthn_login_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/webauthn_login/WebauthnLoginTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read webauthn_login test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "webauthn_login01", "webauthn_login02", "webauthn_login03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID"] = idmap,
    ["HANKO_PUBLIC_TEST_LIVE"] = "FALSE",
    ["HANKO_PUBLIC_TEST_EXPLAIN"] = "FALSE",
    ["HANKO_PUBLIC_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["HANKO_PUBLIC_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HANKO_PUBLIC_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
