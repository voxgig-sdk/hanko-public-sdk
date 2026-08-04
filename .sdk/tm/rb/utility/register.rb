# HankoPublic SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HankoPublicUtility.registrar = ->(u) {
  u.clean = HankoPublicUtilities::Clean
  u.done = HankoPublicUtilities::Done
  u.make_error = HankoPublicUtilities::MakeError
  u.feature_add = HankoPublicUtilities::FeatureAdd
  u.feature_hook = HankoPublicUtilities::FeatureHook
  u.feature_init = HankoPublicUtilities::FeatureInit
  u.fetcher = HankoPublicUtilities::Fetcher
  u.make_fetch_def = HankoPublicUtilities::MakeFetchDef
  u.make_context = HankoPublicUtilities::MakeContext
  u.make_options = HankoPublicUtilities::MakeOptions
  u.make_request = HankoPublicUtilities::MakeRequest
  u.make_response = HankoPublicUtilities::MakeResponse
  u.make_result = HankoPublicUtilities::MakeResult
  u.make_point = HankoPublicUtilities::MakePoint
  u.make_spec = HankoPublicUtilities::MakeSpec
  u.make_url = HankoPublicUtilities::MakeUrl
  u.param = HankoPublicUtilities::Param
  u.prepare_auth = HankoPublicUtilities::PrepareAuth
  u.prepare_body = HankoPublicUtilities::PrepareBody
  u.prepare_headers = HankoPublicUtilities::PrepareHeaders
  u.prepare_method = HankoPublicUtilities::PrepareMethod
  u.prepare_params = HankoPublicUtilities::PrepareParams
  u.prepare_path = HankoPublicUtilities::PreparePath
  u.prepare_query = HankoPublicUtilities::PrepareQuery
  u.result_basic = HankoPublicUtilities::ResultBasic
  u.result_body = HankoPublicUtilities::ResultBody
  u.result_headers = HankoPublicUtilities::ResultHeaders
  u.transform_request = HankoPublicUtilities::TransformRequest
  u.transform_response = HankoPublicUtilities::TransformResponse
}
