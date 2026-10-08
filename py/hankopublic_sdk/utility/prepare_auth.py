# HankoPublic SDK utility: prepare_auth

from __future__ import annotations
from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs
from hankopublic_sdk.utility.prepare_headers import cookie_keep

COOKIE_HEADER = "cookie"
COOKIE_AUTH = "hanko"
OPTION_APIKEY = "apikey"
NOT_FOUND = "__NOTFOUND__"


def _auth_name(options):
    name = vs.getpath(options, "auth.name")
    if isinstance(name, str) and name != "":
        return name
    return COOKIE_AUTH


def _cookies_without_cred(headers, name):
    """The cookie header minus the named pair, every other cookie untouched."""
    existing = headers.get(COOKIE_HEADER)
    if not isinstance(existing, str) or existing == "":
        return ""

    return "; ".join(cookie_keep(existing, [name]))


def _apply_cookie(headers, name, value):
    """Set (value) or remove (None) the named pair, leaving the rest in place.

    Splicing rather than assigning also makes this idempotent: a retried
    request cannot end up with the credential in the header twice.
    """
    rest = _cookies_without_cred(headers, name)

    if value is None:
        if rest == "":
            headers.pop(COOKIE_HEADER, None)
        else:
            headers[COOKIE_HEADER] = rest
        return

    pair = name + "=" + value
    headers[COOKIE_HEADER] = rest + "; " + pair if rest else pair


def prepare_auth_util(ctx):
    spec = ctx.spec
    if spec is None:
        return None, ctx.make_error("auth_no_spec",
            "Expected context spec property to be defined.")

    headers = spec.headers
    options = ctx.client.options_map()

    # Public APIs that need no auth omit the options.auth block entirely.
    if options.get("auth") is None:
        _apply_cookie(headers, COOKIE_AUTH, None)
        return spec, None

    name = _auth_name(options)

    # A credential left under the declared name would travel beside the renamed one.
    if name != COOKIE_AUTH:
        _apply_cookie(headers, COOKIE_AUTH, None)

    apikey = vs.getprop(options, OPTION_APIKEY, NOT_FOUND)

    if (
        (isinstance(apikey, str) and apikey == NOT_FOUND)
        or apikey is None
        or apikey == ""
    ):
        _apply_cookie(headers, name, None)
    else:
        apikey_val = ""
        if isinstance(apikey, str):
            apikey_val = apikey
        # NO PREFIX IN A COOKIE either - a cookie carries a bare
        # `name=value` pair, not a header's scheme-prefixed credential.
        _apply_cookie(headers, name, apikey_val)

    return spec, None
