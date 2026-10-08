package utility

import (
	"strings"

	vs "github.com/voxgig-sdk/hanko-public-sdk/go/utility/struct"

	"github.com/voxgig-sdk/hanko-public-sdk/go/core"
)

const credName = "hanko"
const cookieHeader = "cookie"
const optionApikey = "apikey"
const notFound = "__NOTFOUND__"

// The client's auth.name option, when set, replaces the name the API declares.
func authName(options map[string]any) string {
	if name, ok := vs.GetPath(options, []any{"auth", "name"}).(string); ok && name != "" {
		return name
	}
	return credName
}

func cookieSet(headers map[string]any, name string, value any) {
	kept := []string{}

	if existing, ok := headers[cookieHeader].(string); ok && existing != "" {
		kept = cookieKeep(existing, map[string]bool{name: true})
	}

	if value != nil {
		valStr, _ := value.(string)
		kept = append(kept, name+"="+valStr)
	}

	if len(kept) == 0 {
		delete(headers, cookieHeader)
	} else {
		headers[cookieHeader] = strings.Join(kept, "; ")
	}
}

func prepareAuthUtil(ctx *core.Context) (*core.Spec, error) {
	spec := ctx.Spec
	if spec == nil {
		return nil, ctx.MakeError("auth_no_spec",
			"Expected context spec property to be defined.")
	}

	headers := spec.Headers
	options := ctx.Client.OptionsMap()

	// Public APIs that need no auth omit the options.auth block entirely.
	if options["auth"] == nil {
		cookieSet(headers, credName, nil)
		return spec, nil
	}

	name := authName(options)

	// A credential left under the declared name would travel beside the renamed one.
	if name != credName {
		cookieSet(headers, credName, nil)
	}

	apikey := vs.GetProp(options, optionApikey, notFound)

	skip := false
	if apikey == nil {
		skip = true
	} else if apikeyStr, ok := apikey.(string); ok &&
		(apikeyStr == notFound || apikeyStr == "") {
		skip = true
	}

	if skip {
		cookieSet(headers, name, nil)
	} else {
		apikeyVal := ""
		if av, ok := apikey.(string); ok {
			apikeyVal = av
		}
		cookieSet(headers, name, apikeyVal)
	}

	return spec, nil
}
