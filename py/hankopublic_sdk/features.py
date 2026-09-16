# HankoPublic SDK feature factory

from hankopublic_sdk.feature.base_feature import HankoPublicBaseFeature
from hankopublic_sdk.feature.debug_feature import HankoPublicDebugFeature
from hankopublic_sdk.feature.idempotency_feature import HankoPublicIdempotencyFeature
from hankopublic_sdk.feature.metrics_feature import HankoPublicMetricsFeature
from hankopublic_sdk.feature.paging_feature import HankoPublicPagingFeature
from hankopublic_sdk.feature.ratelimit_feature import HankoPublicRatelimitFeature
from hankopublic_sdk.feature.retry_feature import HankoPublicRetryFeature
from hankopublic_sdk.feature.test_feature import HankoPublicTestFeature
from hankopublic_sdk.feature.timeout_feature import HankoPublicTimeoutFeature


_FEATURES = {
    "base": lambda: HankoPublicBaseFeature(),
    "debug": lambda: HankoPublicDebugFeature(),
    "idempotency": lambda: HankoPublicIdempotencyFeature(),
    "metrics": lambda: HankoPublicMetricsFeature(),
    "paging": lambda: HankoPublicPagingFeature(),
    "ratelimit": lambda: HankoPublicRatelimitFeature(),
    "retry": lambda: HankoPublicRetryFeature(),
    "test": lambda: HankoPublicTestFeature(),
    "timeout": lambda: HankoPublicTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
