package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCreateUserResponseObjectEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewCredentialEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewCredentialCreationOptionEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewCredentialRequestOptionEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewEmailEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewEmailManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewHankoConfigurationEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewJsonWebKeySetEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewPasscodeEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewPasswordEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewSamlEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewSessionManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewStatusEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewThirdPartyEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewTokenEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewUserEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewUserManagementEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewWebAuthnEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

var NewWebauthnLoginEntityFunc func(client *HankoPublicSDK, entopts map[string]any) HankoPublicEntity

