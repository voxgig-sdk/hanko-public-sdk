# HankoPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HankoPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      HankoPublicBaseFeature.new
    when "debug"
      HankoPublicDebugFeature.new
    when "idempotency"
      HankoPublicIdempotencyFeature.new
    when "metrics"
      HankoPublicMetricsFeature.new
    when "paging"
      HankoPublicPagingFeature.new
    when "ratelimit"
      HankoPublicRatelimitFeature.new
    when "retry"
      HankoPublicRetryFeature.new
    when "test"
      HankoPublicTestFeature.new
    when "timeout"
      HankoPublicTimeoutFeature.new
    else
      HankoPublicBaseFeature.new
    end
  end
end
