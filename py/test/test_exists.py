# HankoPublic SDK exists test

import pytest
from hankopublic_sdk import HankoPublicSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HankoPublicSDK.test(None, None)
        assert testsdk is not None
