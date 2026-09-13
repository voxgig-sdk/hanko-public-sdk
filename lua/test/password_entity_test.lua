-- Password entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hanko-public_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("PasswordEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Password(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = password_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "password." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_PASSWORD_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local password_ref01_ent = client:Password(nil)
    local password_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.password"), "password_ref01"))

    local password_ref01_data_result, err = password_ref01_ent:create(password_ref01_data, nil)
    assert.is_nil(err)
    password_ref01_data = helpers.to_map(type(password_ref01_data_result) == 'table' and password_ref01_data_result.data_get and password_ref01_data_result:data_get() or password_ref01_data_result)
    assert.is_not_nil(password_ref01_data)

    -- UPDATE
    local password_ref01_data_up0_up = {
    }

    local password_ref01_markdef_up0_name = "password"
    local password_ref01_markdef_up0_value = "Mark01-password_ref01_" .. tostring(setup.now)
    password_ref01_data_up0_up[password_ref01_markdef_up0_name] = password_ref01_markdef_up0_value

    local password_ref01_resdata_up0_result, err = password_ref01_ent:update(password_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local password_ref01_resdata_up0 = helpers.to_map(type(password_ref01_resdata_up0_result) == 'table' and password_ref01_resdata_up0_result.data_get and password_ref01_resdata_up0_result:data_get() or password_ref01_resdata_up0_result)
    assert.is_not_nil(password_ref01_resdata_up0)
    assert.are.equal(password_ref01_resdata_up0[password_ref01_markdef_up0_name], password_ref01_markdef_up0_value)

  end)
end)

function password_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/password/PasswordTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read password test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "password01", "password02", "password03" },
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
  local entid_env_raw = os.getenv("HANKO_PUBLIC_TEST_PASSWORD_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HANKO_PUBLIC_TEST_PASSWORD_ENTID"] = idmap,
    ["HANKO_PUBLIC_TEST_LIVE"] = "FALSE",
    ["HANKO_PUBLIC_TEST_EXPLAIN"] = "FALSE",
    ["HANKO_PUBLIC_APIKEY"] = "",
    ["HANKO_PUBLIC_SERVER_TENANT_ID"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HANKO_PUBLIC_TEST_PASSWORD_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["HANKO_PUBLIC_APIKEY"],
        server = {
          ["tenant_id"] = env["HANKO_PUBLIC_SERVER_TENANT_ID"],
        },
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
