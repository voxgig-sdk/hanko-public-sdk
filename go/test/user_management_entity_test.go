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

func TestUserManagementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.UserManagement(nil)
		if ent == nil {
			t.Fatal("expected non-nil UserManagementEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"user_management": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.UserManagement(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.UserManagement(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := user_managementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "user_management." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		userManagementRef01Ent := client.UserManagement(nil)
		userManagementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "user_management"}, setup.data), "user_management_ref01"))

		userManagementRef01DataResult, err := userManagementRef01Ent.Create(userManagementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		userManagementRef01Data = core.ToMapAny(entityData(userManagementRef01DataResult))
		if userManagementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if userManagementRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		userManagementRef01Match := map[string]any{}

		userManagementRef01ListResult, err := userManagementRef01Ent.List(userManagementRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		userManagementRef01List, userManagementRef01ListOk := userManagementRef01ListResult.([]any)
		if !userManagementRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", userManagementRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(userManagementRef01List), map[string]any{"id": userManagementRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func user_managementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "user_management", "UserManagementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read user_management test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse user_management test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"user_management01", "user_management02", "user_management03"},
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
	entidEnvRaw := os.Getenv("HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID": idmap,
		"HANKO_PUBLIC_TEST_LIVE":      "FALSE",
		"HANKO_PUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKO_PUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HANKO_PUBLIC_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["HANKO_PUBLIC_APIKEY"],
			},
			extra,
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
