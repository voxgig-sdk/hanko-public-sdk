package voxgighankopublicsdk

import (
	"github.com/voxgig-sdk/hanko-public-sdk/go/core"
	"github.com/voxgig-sdk/hanko-public-sdk/go/entity"
	"github.com/voxgig-sdk/hanko-public-sdk/go/feature"
	_ "github.com/voxgig-sdk/hanko-public-sdk/go/utility"
)

// Type aliases preserve external API.
type HankoPublicSDK = core.HankoPublicSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HankoPublicEntity = core.HankoPublicEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HankoPublicError = core.HankoPublicError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCredentialEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewCredentialEntity(client, entopts)
	}
	core.NewCredentialCreationOptionEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewCredentialCreationOptionEntity(client, entopts)
	}
	core.NewCredentialRequestOptionEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewCredentialRequestOptionEntity(client, entopts)
	}
	core.NewEmailEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewEmailEntity(client, entopts)
	}
	core.NewHankoConfigurationEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewHankoConfigurationEntity(client, entopts)
	}
	core.NewJsonWebKeyEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewJsonWebKeyEntity(client, entopts)
	}
	core.NewPasscodeEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewPasscodeEntity(client, entopts)
	}
	core.NewPasswordEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewPasswordEntity(client, entopts)
	}
	core.NewSamlEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewSamlEntity(client, entopts)
	}
	core.NewSessionManagementEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewSessionManagementEntity(client, entopts)
	}
	core.NewStatusEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewStatusEntity(client, entopts)
	}
	core.NewThirdPartyEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewThirdPartyEntity(client, entopts)
	}
	core.NewTokenEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewTokenEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewUserManagementEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewUserManagementEntity(client, entopts)
	}
	core.NewWebAuthnEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewWebAuthnEntity(client, entopts)
	}
	core.NewWebauthnLoginEntityFunc = func(client *core.HankoPublicSDK, entopts map[string]any) core.HankoPublicEntity {
		return entity.NewWebauthnLoginEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHankoPublicSDK = core.NewHankoPublicSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHankoPublicSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HankoPublicSDK  { return NewHankoPublicSDK(nil) }
func Test() *HankoPublicSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
