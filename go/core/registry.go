package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewJsonWebKeyEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewOrganizationManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewSamlEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewSessionManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewStatusEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewThirdPartyEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewUserManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

