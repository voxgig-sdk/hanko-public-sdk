package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/hanko-public-sdk/go/utility/struct"
)

type HankoPublicSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewHankoPublicSDK(options map[string]any) *HankoPublicSDK {
	sdk := &HankoPublicSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *HankoPublicSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *HankoPublicSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *HankoPublicSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *HankoPublicSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *HankoPublicSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *HankoPublicSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *HankoPublicSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("HankoPublicSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *HankoPublicSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *HankoPublicSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath([]any{"data", "errors"}, res).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("HankoPublicSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// CreateUserResponseObject returns a CreateUserResponseObject entity bound to this client.
// Idiomatic usage: client.CreateUserResponseObject(nil).List(nil, nil) or
// client.CreateUserResponseObject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) CreateUserResponseObject(data map[string]any) HankoPublicEntity {
	return NewCreateUserResponseObjectEntityFunc(sdk, data)
}


// Credential returns a Credential entity bound to this client.
// Idiomatic usage: client.Credential(nil).List(nil, nil) or
// client.Credential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Credential(data map[string]any) HankoPublicEntity {
	return NewCredentialEntityFunc(sdk, data)
}


// CredentialCreationOption returns a CredentialCreationOption entity bound to this client.
// Idiomatic usage: client.CredentialCreationOption(nil).List(nil, nil) or
// client.CredentialCreationOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) CredentialCreationOption(data map[string]any) HankoPublicEntity {
	return NewCredentialCreationOptionEntityFunc(sdk, data)
}


// CredentialRequestOption returns a CredentialRequestOption entity bound to this client.
// Idiomatic usage: client.CredentialRequestOption(nil).List(nil, nil) or
// client.CredentialRequestOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) CredentialRequestOption(data map[string]any) HankoPublicEntity {
	return NewCredentialRequestOptionEntityFunc(sdk, data)
}


// Email returns a Email entity bound to this client.
// Idiomatic usage: client.Email(nil).List(nil, nil) or
// client.Email(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Email(data map[string]any) HankoPublicEntity {
	return NewEmailEntityFunc(sdk, data)
}


// EmailManagement returns a EmailManagement entity bound to this client.
// Idiomatic usage: client.EmailManagement(nil).List(nil, nil) or
// client.EmailManagement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) EmailManagement(data map[string]any) HankoPublicEntity {
	return NewEmailManagementEntityFunc(sdk, data)
}


// HankoConfiguration returns a HankoConfiguration entity bound to this client.
// Idiomatic usage: client.HankoConfiguration(nil).List(nil, nil) or
// client.HankoConfiguration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) HankoConfiguration(data map[string]any) HankoPublicEntity {
	return NewHankoConfigurationEntityFunc(sdk, data)
}


// JsonWebKeySet returns a JsonWebKeySet entity bound to this client.
// Idiomatic usage: client.JsonWebKeySet(nil).List(nil, nil) or
// client.JsonWebKeySet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) JsonWebKeySet(data map[string]any) HankoPublicEntity {
	return NewJsonWebKeySetEntityFunc(sdk, data)
}


// Passcode returns a Passcode entity bound to this client.
// Idiomatic usage: client.Passcode(nil).List(nil, nil) or
// client.Passcode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Passcode(data map[string]any) HankoPublicEntity {
	return NewPasscodeEntityFunc(sdk, data)
}


// Password returns a Password entity bound to this client.
// Idiomatic usage: client.Password(nil).List(nil, nil) or
// client.Password(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Password(data map[string]any) HankoPublicEntity {
	return NewPasswordEntityFunc(sdk, data)
}


// Saml returns a Saml entity bound to this client.
// Idiomatic usage: client.Saml(nil).List(nil, nil) or
// client.Saml(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Saml(data map[string]any) HankoPublicEntity {
	return NewSamlEntityFunc(sdk, data)
}


// SessionManagement returns a SessionManagement entity bound to this client.
// Idiomatic usage: client.SessionManagement(nil).List(nil, nil) or
// client.SessionManagement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) SessionManagement(data map[string]any) HankoPublicEntity {
	return NewSessionManagementEntityFunc(sdk, data)
}


// Status returns a Status entity bound to this client.
// Idiomatic usage: client.Status(nil).List(nil, nil) or
// client.Status(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Status(data map[string]any) HankoPublicEntity {
	return NewStatusEntityFunc(sdk, data)
}


// ThirdParty returns a ThirdParty entity bound to this client.
// Idiomatic usage: client.ThirdParty(nil).List(nil, nil) or
// client.ThirdParty(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) ThirdParty(data map[string]any) HankoPublicEntity {
	return NewThirdPartyEntityFunc(sdk, data)
}


// Token returns a Token entity bound to this client.
// Idiomatic usage: client.Token(nil).List(nil, nil) or
// client.Token(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) Token(data map[string]any) HankoPublicEntity {
	return NewTokenEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) User(data map[string]any) HankoPublicEntity {
	return NewUserEntityFunc(sdk, data)
}


// UserManagement returns a UserManagement entity bound to this client.
// Idiomatic usage: client.UserManagement(nil).List(nil, nil) or
// client.UserManagement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) UserManagement(data map[string]any) HankoPublicEntity {
	return NewUserManagementEntityFunc(sdk, data)
}


// WebAuthn returns a WebAuthn entity bound to this client.
// Idiomatic usage: client.WebAuthn(nil).List(nil, nil) or
// client.WebAuthn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) WebAuthn(data map[string]any) HankoPublicEntity {
	return NewWebAuthnEntityFunc(sdk, data)
}


// WebauthnLogin returns a WebauthnLogin entity bound to this client.
// Idiomatic usage: client.WebauthnLogin(nil).List(nil, nil) or
// client.WebauthnLogin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *HankoPublicSDK) WebauthnLogin(data map[string]any) HankoPublicEntity {
	return NewWebauthnLoginEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *HankoPublicSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewHankoPublicSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
