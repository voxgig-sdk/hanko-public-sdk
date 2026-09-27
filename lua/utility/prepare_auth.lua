-- HankoPublic SDK utility: prepare_auth

local vs = require("utility.struct.struct")

local COOKIE_AUTH = "hanko"
local HEADER_COOKIE = "cookie"
local OPTION_APIKEY = "apikey"
local NOT_FOUND = "__NOTFOUND__"

local function cookie_set(headers, value)
  local kept = {}
  local existing = headers[HEADER_COOKIE]

  if type(existing) == "string" then
    for pair in string.gmatch(existing, "[^;]+") do
      local one = string.match(pair, "^%s*(.-)%s*$")
      if one ~= "" and string.match(one, "^[^=]*") ~= COOKIE_AUTH then
        kept[#kept + 1] = one
      end
    end
  end

  if value ~= nil then
    kept[#kept + 1] = COOKIE_AUTH .. "=" .. value
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
    cookie_set(headers, nil)
    return spec, nil
  end

  local apikey = vs.getprop(options, OPTION_APIKEY, NOT_FOUND)

  if apikey == nil
    or (type(apikey) == "string" and (apikey == NOT_FOUND or apikey == ""))
  then
    cookie_set(headers, nil)
  else
    local apikey_val = ""
    if type(apikey) == "string" then
      apikey_val = apikey
    end
    -- The prefix is a header-value convention and has no meaning in a
    -- cookie pair, so it is dropped the way a query placement drops it.
    cookie_set(headers, apikey_val)
  end

  return spec, nil
end

return prepare_auth_util
