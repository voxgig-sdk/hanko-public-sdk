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

func TestCreateUserResponseObjectEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CreateUserResponseObject(nil)
		if ent == nil {
			t.Fatal("expected non-nil CreateUserResponseObjectEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := create_user_response_objectBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "create_user_response_object." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_CREATE_USER_RESPONSE_OBJECT_ENTID JSON to run live")
			return
		}
		// Bootstrap entity data from existing test data (no create step in flow).
		createUserResponseObjectRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.create_user_response_object")))
		var createUserResponseObjectRef01Data map[string]any
		if len(createUserResponseObjectRef01DataRaw) > 0 {
			createUserResponseObjectRef01Data = core.ToMapAny(createUserResponseObjectRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = createUserResponseObjectRef01Data

	})
}

func create_user_response_objectBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "create_user_response_object", "CreateUserResponseObjectTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read create_user_response_object test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse create_user_response_object test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"create_user_response_object01", "create_user_response_object02", "create_user_response_object03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HANKO_PUBLIC_TEST_CREATE_USER_RESPONSE_OBJECT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKO_PUBLIC_TEST_CREATE_USER_RESPONSE_OBJECT_ENTID": idmap,
		"HANKO_PUBLIC_TEST_LIVE":      "FALSE",
		"HANKO_PUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKO_PUBLIC_APIKEY":         "",
		"HANKO_PUBLIC_SERVER_TENANT_ID": "",
	})

	idmapResolved := core.ToMapAny(env["HANKO_PUBLIC_TEST_CREATE_USER_RESPONSE_OBJECT_ENTID"])
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
