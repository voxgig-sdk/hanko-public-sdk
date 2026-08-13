# WebAuthn entity test

import json
import os
import time

import pytest

from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs
from hankopublic_sdk import HankoPublicSDK
from hankopublic_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWebAuthnEntity:

    def test_should_create_instance(self):
        testsdk = HankoPublicSDK.test(None, None)
        ent = testsdk.WebAuthn(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _web_authn_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "web_authn." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        web_authn_ref01_ent = client.WebAuthn(None)
        web_authn_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.web_authn"), "web_authn_ref01"))

        web_authn_ref01_data = helpers.to_map(runner.entity_data(web_authn_ref01_ent.create(web_authn_ref01_data, None)))
        assert web_authn_ref01_data is not None
        assert web_authn_ref01_data["id"] is not None

        # UPDATE
        web_authn_ref01_data_up0_up = {
            "id": web_authn_ref01_data["id"],
        }

        web_authn_ref01_markdef_up0_name = "name"
        web_authn_ref01_markdef_up0_value = "Mark01-web_authn_ref01_" + str(setup["now"])
        web_authn_ref01_data_up0_up[web_authn_ref01_markdef_up0_name] = web_authn_ref01_markdef_up0_value

        web_authn_ref01_resdata_up0 = helpers.to_map(runner.entity_data(web_authn_ref01_ent.update(web_authn_ref01_data_up0_up, None)))
        assert web_authn_ref01_resdata_up0 is not None
        assert web_authn_ref01_resdata_up0["id"] == web_authn_ref01_data_up0_up["id"]
        assert web_authn_ref01_resdata_up0[web_authn_ref01_markdef_up0_name] == web_authn_ref01_markdef_up0_value

        # REMOVE
        web_authn_ref01_match_rm0 = {
            "id": web_authn_ref01_data["id"],
        }
        web_authn_ref01_ent.remove(web_authn_ref01_match_rm0, None)



def _web_authn_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/web_authn/WebAuthnTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HankoPublicSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["web_authn01", "web_authn02", "web_authn03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID": idmap,
        "HANKO_PUBLIC_TEST_LIVE": "FALSE",
        "HANKO_PUBLIC_TEST_EXPLAIN": "FALSE",
        "HANKO_PUBLIC_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HANKO_PUBLIC_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("HANKO_PUBLIC_APIKEY"),
            },
            extra or {},
        ])
        client = HankoPublicSDK(helpers.to_map(merged_opts))

    _live = env.get("HANKO_PUBLIC_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HANKO_PUBLIC_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
