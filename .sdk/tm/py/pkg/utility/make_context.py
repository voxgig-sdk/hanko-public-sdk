# HankoPublic SDK utility: make_context

from projectname_sdk.core.context import HankoPublicContext


def make_context_util(ctxmap, basectx):
    return HankoPublicContext(ctxmap, basectx)
