# Password entity test

import json
import os
import time

import pytest

from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs
from hankopublic_sdk import HankoPublicSDK
from hankopublic_sdk.core import helpers
from hankopublic_sdk.config import shared_config
from hankopublic_sdk.feature.base_feature import HankoPublicBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestPasswordEntity:

    def test_should_create_instance(self):
        testsdk = HankoPublicSDK.test(None, None)
        ent = testsdk.Password(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = HankoPublicSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Password(None).create({"password": 1, "user_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _password_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "password." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        password_ref01_ent = client.Password(None)
        password_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.password"), "password_ref01"))

        password_ref01_data = helpers.to_map(runner.entity_data(password_ref01_ent.create(password_ref01_data, None)))
        assert password_ref01_data is not None

        # UPDATE
        password_ref01_data_up0_up = {
        }

        password_ref01_markdef_up0_name = "password"
        password_ref01_markdef_up0_value = "Mark01-password_ref01_" + str(setup["now"])
        password_ref01_data_up0_up[password_ref01_markdef_up0_name] = password_ref01_markdef_up0_value

        password_ref01_resdata_up0 = helpers.to_map(runner.entity_data(password_ref01_ent.update(password_ref01_data_up0_up, None)))
        assert password_ref01_resdata_up0 is not None
        assert password_ref01_resdata_up0[password_ref01_markdef_up0_name] == password_ref01_markdef_up0_value



def _password_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/password/PasswordTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HankoPublicSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["password01", "password02", "password03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "HANKO_PUBLIC_TEST_PASSWORD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HANKO_PUBLIC_TEST_PASSWORD_ENTID": idmap,
        "HANKO_PUBLIC_TEST_LIVE": "FALSE",
        "HANKO_PUBLIC_TEST_EXPLAIN": "FALSE",
        "HANKO_PUBLIC_APIKEY": "",
        "HANKO_PUBLIC_SERVER_TENANT_ID": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HANKO_PUBLIC_TEST_PASSWORD_ENTID"))
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
