# HankoPublic SDK feature factory

from hankopublic_sdk.feature.base_feature import HankoPublicBaseFeature
from hankopublic_sdk.feature.test_feature import HankoPublicTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HankoPublicBaseFeature(),
        "test": lambda: HankoPublicTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
