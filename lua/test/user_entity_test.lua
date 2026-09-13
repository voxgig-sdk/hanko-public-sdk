-- User entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hanko-public_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("UserEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:User(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = user_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "user." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_USER_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local user_ref01_ent = client:User(nil)
    local user_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.user"), "user_ref01"))

    local user_ref01_data_result, err = user_ref01_ent:create(user_ref01_data, nil)
    assert.is_nil(err)
    user_ref01_data = helpers.to_map(type(user_ref01_data_result) == 'table' and user_ref01_data_result.data_get and user_ref01_data_result:data_get() or user_ref01_data_result)
    assert.is_not_nil(user_ref01_data)
    assert.is_not_nil(user_ref01_data["id"])

    -- LOAD
    local user_ref01_match_dt0 = {
      id = user_ref01_data["id"],
    }
    local user_ref01_data_dt0_loaded, err = user_ref01_ent:load(user_ref01_match_dt0, nil)
    assert.is_nil(err)
    local user_ref01_data_dt0_load_result = helpers.to_map(type(user_ref01_data_dt0_loaded) == 'table' and user_ref01_data_dt0_loaded.data_get and user_ref01_data_dt0_loaded:data_get() or user_ref01_data_dt0_loaded)
    assert.is_not_nil(user_ref01_data_dt0_load_result)
    assert.are.equal(user_ref01_data_dt0_load_result["id"], user_ref01_data["id"])

    -- REMOVE
    local user_ref01_match_rm0 = {
      id = user_ref01_data["id"],
    }
    local _, err = user_ref01_ent:remove(user_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function user_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/user/UserTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read user test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "user01", "user02", "user03" },
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
  local entid_env_raw = os.getenv("HANKO_PUBLIC_TEST_USER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HANKO_PUBLIC_TEST_USER_ENTID"] = idmap,
    ["HANKO_PUBLIC_TEST_LIVE"] = "FALSE",
    ["HANKO_PUBLIC_TEST_EXPLAIN"] = "FALSE",
    ["HANKO_PUBLIC_APIKEY"] = "",
    ["HANKO_PUBLIC_SERVER_TENANT_ID"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HANKO_PUBLIC_TEST_USER_ENTID"])
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
