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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const web_authnEntityLiveStrict = true


type web_authnFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *web_authnFailHook) PreSpec(ctx *sdk.Context) {
	panic("web_authn hook failed")
}

func (f *web_authnFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestWebAuthnEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WebAuthn(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebAuthnEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"web_authn": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.WebAuthn(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
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
			for si := range streamSdk.WebAuthn(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).WebAuthn(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).WebAuthn(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.WebAuthn(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.HankoPublicError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).WebAuthn(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &web_authnFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.WebAuthn(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.WebAuthn(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.WebAuthn(nil).List(map[string]any{"aaguid": 1}, nil)
		if sdkerr, ok := err.(*core.HankoPublicError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := web_authnBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "web_authn." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client

		// CREATE
		webAuthnRef01Ent := client.WebAuthn(nil)
		webAuthnRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "web_authn"}), "web_authn_ref01"))

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

		// LIST
		webAuthnRef01Match := map[string]any{}

		webAuthnRef01ListResult, err := webAuthnRef01Ent.List(webAuthnRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		webAuthnRef01List, webAuthnRef01ListOk := webAuthnRef01ListResult.([]any)
		if !webAuthnRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", webAuthnRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(webAuthnRef01List), map[string]any{"id": webAuthnRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		webAuthnRef01DataUp0Up := map[string]any{
			"id": webAuthnRef01Data["id"],
		}

		webAuthnRef01MarkdefUp0Name := "aaguid"
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

		// LIST
		webAuthnRef01MatchRt0 := map[string]any{}

		webAuthnRef01ListRt0Result, err := webAuthnRef01Ent.List(webAuthnRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		webAuthnRef01ListRt0, webAuthnRef01ListRt0Ok := webAuthnRef01ListRt0Result.([]any)
		if !webAuthnRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", webAuthnRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(webAuthnRef01ListRt0), map[string]any{"id": webAuthnRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
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
	idmap, _ := vs.Transform(
		[]any{"web_authn01", "web_authn02", "web_authn03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID": idmap,
		"HANKO_PUBLIC_TEST_LIVE":      "FALSE",
		"HANKO_PUBLIC_TEST_EXPLAIN":   "FALSE",
		"HANKO_PUBLIC_APIKEY":         "",
		"HANKO_PUBLIC_SERVER_TENANT_ID": "",
	})

	idmapResolved := core.ToMapAny(env["HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"])
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
