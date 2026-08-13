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

func TestWebAuthnEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WebAuthn(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebAuthnEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := web_authnBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "web_authn." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		webAuthnRef01Ent := client.WebAuthn(nil)
		webAuthnRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "web_authn"}, setup.data), "web_authn_ref01"))

		webAuthnRef01DataResult, err := webAuthnRef01Ent.Create(webAuthnRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		webAuthnRef01Data = core.ToMapAny(entityData(webAuthnRef01DataResult))
		if webAuthnRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if webAuthnRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		webAuthnRef01DataUp0Up := map[string]any{
			"id": webAuthnRef01Data["id"],
		}

		webAuthnRef01MarkdefUp0Name := "name"
		webAuthnRef01MarkdefUp0Value := fmt.Sprintf("Mark01-web_authn_ref01_%d", setup.now)
		webAuthnRef01DataUp0Up[webAuthnRef01MarkdefUp0Name] = webAuthnRef01MarkdefUp0Value

		webAuthnRef01ResdataUp0Result, err := webAuthnRef01Ent.Update(webAuthnRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		webAuthnRef01ResdataUp0 := core.ToMapAny(entityData(webAuthnRef01ResdataUp0Result))
		if webAuthnRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if webAuthnRef01ResdataUp0["id"] != webAuthnRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if webAuthnRef01ResdataUp0[webAuthnRef01MarkdefUp0Name] != webAuthnRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", webAuthnRef01MarkdefUp0Name, webAuthnRef01ResdataUp0[webAuthnRef01MarkdefUp0Name])
		}

		// REMOVE
		webAuthnRef01MatchRm0 := map[string]any{
			"id": webAuthnRef01Data["id"],
		}
		_, err = webAuthnRef01Ent.Remove(webAuthnRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func web_authnBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "web_authn", "WebAuthnTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read web_authn test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse web_authn test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"web_authn01", "web_authn02", "web_authn03"},
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
	entidEnvRaw := os.Getenv("HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID": idmap,
		"HANKO_PUBLIC_TEST_LIVE":      "FALSE",
		"HANKO_PUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKO_PUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"])
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
