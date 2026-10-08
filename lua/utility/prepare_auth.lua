-- HankoPublic SDK utility: prepare_auth

local vs = require("utility.struct.struct")
local helpers = require("core.helpers")

local COOKIE_AUTH = "hanko"
local HEADER_COOKIE = "cookie"
local OPTION_APIKEY = "apikey"
local NOT_FOUND = "__NOTFOUND__"


-- The client's auth.name option, when set, replaces the name the API declares.
local function auth_name(options)
  local name = vs.getpath(options, "auth.name")
  if type(name) == "string" and name ~= "" then
    return name
  end
  return COOKIE_AUTH
end

local function cookie_set(headers, name, value)
  local kept = {}
  local existing = headers[HEADER_COOKIE]

  if type(existing) == "string" then
    kept = helpers.cookie_keep(existing, { [name] = true })
  end

  if value ~= nil then
    kept[#kept + 1] = name .. "=" .. value
  end

  if #kept == 0 then
    headers[HEADER_COOKIE] = nil
  else
    headers[HEADER_COOKIE] = table.concat(kept, "; ")
  end
end


local function prepare_auth_util(ctx)
  local spec = ctx.spec
  if spec == nil then
    return nil, ctx:make_error("auth_no_spec",
      "Expected context spec property to be defined.")
  end

  local headers = spec.headers
  local options = ctx.client:options_map()

  -- Public APIs that need no auth omit the options.auth block entirely.
  if options.auth == nil then
    cookie_set(headers, COOKIE_AUTH, nil)
    return spec, nil
  end

  local name = auth_name(options)

  -- A credential left under the declared name would travel beside the renamed one.
  if name ~= COOKIE_AUTH then
    cookie_set(headers, COOKIE_AUTH, nil)
  end

  local apikey = vs.getprop(options, OPTION_APIKEY, NOT_FOUND)

  if apikey == nil
    or (type(apikey) == "string" and (apikey == NOT_FOUND or apikey == ""))
  then
    cookie_set(headers, name, nil)
  else
    local apikey_val = ""
    if type(apikey) == "string" then
      apikey_val = apikey
    end
    -- The prefix is a header-value convention and has no meaning in a
    -- cookie pair, so it is dropped the way a query placement drops it.
    cookie_set(headers, name, apikey_val)
  end

  return spec, nil
end

return prepare_auth_util
