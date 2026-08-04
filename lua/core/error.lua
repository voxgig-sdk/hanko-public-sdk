-- HankoPublic SDK error

local HankoPublicError = {}
HankoPublicError.__index = HankoPublicError


function HankoPublicError.new(code, msg, ctx)
  local self = setmetatable({}, HankoPublicError)
  self.is_sdk_error = true
  self.sdk = "HankoPublic"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HankoPublicError:error()
  return self.msg
end


function HankoPublicError:__tostring()
  return self.msg
end


return HankoPublicError
