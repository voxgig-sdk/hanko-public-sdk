# HankoPublic SDK utility: make_context
require_relative '../core/context'
module HankoPublicUtilities
  MakeContext = ->(ctxmap, basectx) {
    HankoPublicContext.new(ctxmap, basectx)
  }
end
