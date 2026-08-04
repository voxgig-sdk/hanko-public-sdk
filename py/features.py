# HankoPublic SDK feature factory

from feature.base_feature import HankoPublicBaseFeature
from feature.test_feature import HankoPublicTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HankoPublicBaseFeature(),
        "test": lambda: HankoPublicTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
