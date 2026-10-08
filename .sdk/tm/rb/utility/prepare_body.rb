# HankoPublic SDK utility: prepare_body
require_relative 'media'
module HankoPublicUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HankoPublicUtilities.raw_body(ctx.reqdata) if HankoPublicUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
