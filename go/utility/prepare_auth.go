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

func cookieSet(headers map[string]any, value any) {
	kept := []string{}

	if existing, ok := headers[cookieHeader].(string); ok && existing != "" {
		for _, part := range strings.Split(existing, ";") {
			piece := strings.TrimSpace(part)
			if piece == "" || piece == credName ||
				strings.HasPrefix(piece, credName+"=") {
				continue
			}
			kept = append(kept, piece)
		}
	}

	if value != nil {
		valStr, _ := value.(string)
		kept = append(kept, credName+"="+valStr)
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
		cookieSet(headers, nil)
		return spec, nil
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
		cookieSet(headers, nil)
	} else {
		apikeyVal := ""
		if av, ok := apikey.(string); ok {
			apikeyVal = av
		}
		cookieSet(headers, apikeyVal)
	}

	return spec, nil
}
