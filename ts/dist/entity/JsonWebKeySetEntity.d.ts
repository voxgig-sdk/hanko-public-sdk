import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { JsonWebKeySet, JsonWebKeySetListMatch } from '../HankoPublicTypes';
declare class JsonWebKeySetEntity extends HankoPublicEntityBase<JsonWebKeySet> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: JsonWebKeySetEntity): JsonWebKeySetEntity;
    list(this: any, reqmatch?: JsonWebKeySetListMatch, ctrl?: Control): Promise<JsonWebKeySetEntity[]>;
}
export { JsonWebKeySetEntity };
