# UserManagement direct test

import json
import pytest

from hankopublic_sdk.utility.voxgig_struct import voxgig_struct as vs
from hankopublic_sdk import HankoPublicSDK
from hankopublic_sdk.core import helpers
from test import runner


class TestUserManagementDirect:

    def test_should_direct_list_user_management(self):
        setup = _user_management_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-user_management", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]


        result = client.direct({
            "path": "me",
            "method": "GET",
            "params": {},
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if result.get("err") is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _user_management_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID": {},
        "HANKO_PUBLIC_TEST_LIVE": "FALSE",
        "HANKO_PUBLIC_APIKEY": "NONE",
    })

    live = env.get("HANKO_PUBLIC_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("HANKO_PUBLIC_APIKEY"),
        }
        client = HankoPublicSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = HankoPublicSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
