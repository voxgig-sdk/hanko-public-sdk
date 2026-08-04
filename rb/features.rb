# HankoPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HankoPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      HankoPublicBaseFeature.new
    when "test"
      HankoPublicTestFeature.new
    else
      HankoPublicBaseFeature.new
    end
  end
end
