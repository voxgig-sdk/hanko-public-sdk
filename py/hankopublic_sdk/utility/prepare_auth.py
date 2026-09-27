# HankoPublic SDK utility: prepare_auth

from __future__ import annotations
from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs

COOKIE_HEADER = "cookie"
COOKIE_AUTH = "hanko"
OPTION_APIKEY = "apikey"
NOT_FOUND = "__NOTFOUND__"


def _cookies_without_cred(headers):
    """The cookie header minus our own pair, every other cookie untouched."""
    existing = headers.get(COOKIE_HEADER)
    if not isinstance(existing, str) or existing == "":
        return ""

    kept = []
    for part in existing.split(";"):
        piece = part.strip()
        if piece == "" or piece == COOKIE_AUTH or piece.startswith(COOKIE_AUTH + "="):
            continue
        kept.append(piece)

    return "; ".join(kept)


def _apply_cookie(headers, value):
    """Set (value) or remove (None) our pair, leaving the rest in place.

    Splicing rather than assigning also makes this idempotent: a retried
    request cannot end up with the credential in the header twice.
    """
    rest = _cookies_without_cred(headers)

    if value is None:
        if rest == "":
            headers.pop(COOKIE_HEADER, None)
        else:
            headers[COOKIE_HEADER] = rest
        return

    pair = COOKIE_AUTH + "=" + value
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
        _apply_cookie(headers, None)
        return spec, None

    apikey = vs.getprop(options, OPTION_APIKEY, NOT_FOUND)

    if (
        (isinstance(apikey, str) and apikey == NOT_FOUND)
        or apikey is None
        or apikey == ""
    ):
        _apply_cookie(headers, None)
    else:
        apikey_val = ""
        if isinstance(apikey, str):
            apikey_val = apikey
        # NO PREFIX IN A COOKIE either - a cookie carries a bare
        # `name=value` pair, not a header's scheme-prefixed credential.
        _apply_cookie(headers, apikey_val)

    return spec, None
