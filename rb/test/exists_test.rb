# HankoPublic SDK exists test

require "minitest/autorun"
require_relative "../HankoPublic_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HankoPublicSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
