import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { JsonWebKey, JsonWebKeyListMatch } from '../HankoPublicTypes';
declare class JsonWebKeyEntity extends HankoPublicEntityBase<JsonWebKey> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: JsonWebKeyEntity): JsonWebKeyEntity;
    list(this: any, reqmatch?: JsonWebKeyListMatch, ctrl?: Control): Promise<JsonWebKeyEntity[]>;
}
export { JsonWebKeyEntity };
