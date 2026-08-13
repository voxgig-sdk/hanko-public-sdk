-- HankoPublic SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("hanko-public_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local HankoPublicSDK = {}
HankoPublicSDK.__index = HankoPublicSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

HankoPublicSDK._make_feature = _make_feature


function HankoPublicSDK.new(options)
  local self = setmetatable({}, HankoPublicSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: test


  return self
end


function HankoPublicSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function HankoPublicSDK:get_utility()
  return Utility.copy(self._utility)
end


function HankoPublicSDK:get_root_ctx()
  return self._rootctx
end


function HankoPublicSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function HankoPublicSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function HankoPublicSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function HankoPublicSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "HankoPublicSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function HankoPublicSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function HankoPublicSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "HankoPublicSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:CreateUserResponseObject():list() / client:CreateUserResponseObject():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:CreateUserResponseObject(data)
  local EntityMod = require("entity.create_user_response_object_entity")
  if data == nil then
    if self._create_user_response_object == nil then
      self._create_user_response_object = EntityMod.new(self, nil)
    end
    return self._create_user_response_object
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Credential():list() / client:Credential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Credential(data)
  local EntityMod = require("entity.credential_entity")
  if data == nil then
    if self._credential == nil then
      self._credential = EntityMod.new(self, nil)
    end
    return self._credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CredentialCreationOption():list() / client:CredentialCreationOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:CredentialCreationOption(data)
  local EntityMod = require("entity.credential_creation_option_entity")
  if data == nil then
    if self._credential_creation_option == nil then
      self._credential_creation_option = EntityMod.new(self, nil)
    end
    return self._credential_creation_option
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CredentialRequestOption():list() / client:CredentialRequestOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:CredentialRequestOption(data)
  local EntityMod = require("entity.credential_request_option_entity")
  if data == nil then
    if self._credential_request_option == nil then
      self._credential_request_option = EntityMod.new(self, nil)
    end
    return self._credential_request_option
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Email():list() / client:Email():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Email(data)
  local EntityMod = require("entity.email_entity")
  if data == nil then
    if self._email == nil then
      self._email = EntityMod.new(self, nil)
    end
    return self._email
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailManagement():list() / client:EmailManagement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:EmailManagement(data)
  local EntityMod = require("entity.email_management_entity")
  if data == nil then
    if self._email_management == nil then
      self._email_management = EntityMod.new(self, nil)
    end
    return self._email_management
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HankoConfiguration():list() / client:HankoConfiguration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:HankoConfiguration(data)
  local EntityMod = require("entity.hanko_configuration_entity")
  if data == nil then
    if self._hanko_configuration == nil then
      self._hanko_configuration = EntityMod.new(self, nil)
    end
    return self._hanko_configuration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:JsonWebKeySet():list() / client:JsonWebKeySet():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:JsonWebKeySet(data)
  local EntityMod = require("entity.json_web_key_set_entity")
  if data == nil then
    if self._json_web_key_set == nil then
      self._json_web_key_set = EntityMod.new(self, nil)
    end
    return self._json_web_key_set
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Passcode():list() / client:Passcode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Passcode(data)
  local EntityMod = require("entity.passcode_entity")
  if data == nil then
    if self._passcode == nil then
      self._passcode = EntityMod.new(self, nil)
    end
    return self._passcode
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Password():list() / client:Password():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Password(data)
  local EntityMod = require("entity.password_entity")
  if data == nil then
    if self._password == nil then
      self._password = EntityMod.new(self, nil)
    end
    return self._password
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Saml():list() / client:Saml():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Saml(data)
  local EntityMod = require("entity.saml_entity")
  if data == nil then
    if self._saml == nil then
      self._saml = EntityMod.new(self, nil)
    end
    return self._saml
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SessionManagement():list() / client:SessionManagement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:SessionManagement(data)
  local EntityMod = require("entity.session_management_entity")
  if data == nil then
    if self._session_management == nil then
      self._session_management = EntityMod.new(self, nil)
    end
    return self._session_management
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Status():list() / client:Status():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Status(data)
  local EntityMod = require("entity.status_entity")
  if data == nil then
    if self._status == nil then
      self._status = EntityMod.new(self, nil)
    end
    return self._status
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ThirdParty():list() / client:ThirdParty():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:ThirdParty(data)
  local EntityMod = require("entity.third_party_entity")
  if data == nil then
    if self._third_party == nil then
      self._third_party = EntityMod.new(self, nil)
    end
    return self._third_party
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Token():list() / client:Token():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:Token(data)
  local EntityMod = require("entity.token_entity")
  if data == nil then
    if self._token == nil then
      self._token = EntityMod.new(self, nil)
    end
    return self._token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:User():list() / client:User():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:User(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserManagement():list() / client:UserManagement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:UserManagement(data)
  local EntityMod = require("entity.user_management_entity")
  if data == nil then
    if self._user_management == nil then
      self._user_management = EntityMod.new(self, nil)
    end
    return self._user_management
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebAuthn():list() / client:WebAuthn():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:WebAuthn(data)
  local EntityMod = require("entity.web_authn_entity")
  if data == nil then
    if self._web_authn == nil then
      self._web_authn = EntityMod.new(self, nil)
    end
    return self._web_authn
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebauthnLogin():list() / client:WebauthnLogin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function HankoPublicSDK:WebauthnLogin(data)
  local EntityMod = require("entity.webauthn_login_entity")
  if data == nil then
    if self._webauthn_login == nil then
      self._webauthn_login = EntityMod.new(self, nil)
    end
    return self._webauthn_login
  end
  return EntityMod.new(self, data)
end




function HankoPublicSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = HankoPublicSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return HankoPublicSDK
