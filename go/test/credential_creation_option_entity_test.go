package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hanko-public-sdk/go"
	"github.com/voxgig-sdk/hanko-public-sdk/go/core"

	vs "github.com/voxgig-sdk/hanko-public-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const credential_creation_optionEntityLiveStrict = true


func TestCredentialCreationOptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CredentialCreationOption(nil)
		if ent == nil {
			t.Fatal("expected non-nil CredentialCreationOptionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CredentialCreationOption(nil).Create(map[string]any{"attestation": 1}, nil)
		if sdkerr, ok := err.(*core.HankoPublicError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := credential_creation_optionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "credential_creation_option." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client

		// CREATE
		credentialCreationOptionRef01Ent := client.CredentialCreationOption(nil)
		credentialCreationOptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "credential_creation_option"}), "credential_creation_option_ref01"))

		credentialCreationOptionRef01DataResult, err := credentialCreationOptionRef01Ent.Create(credentialCreationOptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		credentialCreationOptionRef01Data = core.ToMapAny(entityData(credentialCreationOptionRef01DataResult))
		if credentialCreationOptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func credential_creation_optionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "credential_creation_option", "CredentialCreationOptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read credential_creation_option test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse credential_creation_option test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"credential_creation_option01", "credential_creation_option02", "credential_creation_option03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID": idmap,
		"HANKO_PUBLIC_TEST_LIVE":      "FALSE",
		"HANKO_PUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKO_PUBLIC_APIKEY":         "",
		"HANKO_PUBLIC_SERVER_TENANT_ID": "",
	})

	idmapResolved := core.ToMapAny(env["HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["HANKO_PUBLIC_APIKEY"],
				"server": map[string]any{
					"tenant_id": env["HANKO_PUBLIC_SERVER_TENANT_ID"],
				},
			},
			extraOpts,
		})
		client = sdk.NewHankoPublicSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HANKO_PUBLIC_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
