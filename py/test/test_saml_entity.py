# Saml entity test

import json
import os
import time

import pytest

from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs
from hankopublic_sdk import HankoPublicSDK
from hankopublic_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestSamlEntity:

    def test_should_create_instance(self):
        testsdk = HankoPublicSDK.test(None, None)
        ent = testsdk.Saml(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _saml_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "saml." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HANKO_PUBLIC_TEST_SAML_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        saml_ref01_ent = client.Saml(None)
        saml_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.saml"), "saml_ref01"))

        saml_ref01_data = helpers.to_map(runner.entity_data(saml_ref01_ent.create(saml_ref01_data, None)))
        assert saml_ref01_data is not None

        # LOAD
        saml_ref01_match_dt0 = {}
        saml_ref01_data_dt0_loaded = saml_ref01_ent.load(saml_ref01_match_dt0, None)
        assert saml_ref01_data_dt0_loaded is not None



def _saml_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/saml/SamlTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HankoPublicSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["saml01", "saml02", "saml03"],
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
        "HANKO_PUBLIC_TEST_SAML_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HANKO_PUBLIC_TEST_SAML_ENTID": idmap,
        "HANKO_PUBLIC_TEST_LIVE": "FALSE",
        "HANKO_PUBLIC_TEST_EXPLAIN": "FALSE",
        "HANKO_PUBLIC_APIKEY": "",
        "HANKO_PUBLIC_SERVER_TENANT_ID": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HANKO_PUBLIC_TEST_SAML_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HANKO_PUBLIC_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("HANKO_PUBLIC_APIKEY"),
                "server": {
                    "tenant_id": env.get("HANKO_PUBLIC_SERVER_TENANT_ID"),
                },
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
