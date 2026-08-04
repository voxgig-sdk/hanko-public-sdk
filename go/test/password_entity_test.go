package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestPasswordEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Password(nil)
		if ent == nil {
			t.Fatal("expected non-nil PasswordEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := passwordBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "password." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HANKOPUBLIC_TEST_PASSWORD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		passwordRef01Ent := client.Password(nil)
		passwordRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "password"}, setup.data), "password_ref01"))

		passwordRef01DataResult, err := passwordRef01Ent.Create(passwordRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		passwordRef01Data = core.ToMapAny(passwordRef01DataResult)
		if passwordRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		passwordRef01DataUp0Up := map[string]any{
		}

		passwordRef01MarkdefUp0Name := "password"
		passwordRef01MarkdefUp0Value := fmt.Sprintf("Mark01-password_ref01_%d", setup.now)
		passwordRef01DataUp0Up[passwordRef01MarkdefUp0Name] = passwordRef01MarkdefUp0Value

		passwordRef01ResdataUp0Result, err := passwordRef01Ent.Update(passwordRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		passwordRef01ResdataUp0 := core.ToMapAny(passwordRef01ResdataUp0Result)
		if passwordRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if passwordRef01ResdataUp0[passwordRef01MarkdefUp0Name] != passwordRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", passwordRef01MarkdefUp0Name, passwordRef01ResdataUp0[passwordRef01MarkdefUp0Name])
		}

	})
}

func passwordBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "password", "PasswordTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read password test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse password test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"password01", "password02", "password03"},
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
	entidEnvRaw := os.Getenv("HANKOPUBLIC_TEST_PASSWORD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKOPUBLIC_TEST_PASSWORD_ENTID": idmap,
		"HANKOPUBLIC_TEST_LIVE":      "FALSE",
		"HANKOPUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKOPUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HANKOPUBLIC_TEST_PASSWORD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HANKOPUBLIC_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["HANKOPUBLIC_APIKEY"],
			},
			extra,
		})
		client = sdk.NewHankoPublicSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HANKOPUBLIC_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HANKOPUBLIC_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
