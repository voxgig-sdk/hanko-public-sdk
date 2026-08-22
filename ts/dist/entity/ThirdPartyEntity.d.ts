import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { ThirdParty, ThirdPartyLoadMatch } from '../HankoPublicTypes';
declare class ThirdPartyEntity extends HankoPublicEntityBase<ThirdParty> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: ThirdPartyEntity): ThirdPartyEntity;
    load(this: any, reqmatch?: ThirdPartyLoadMatch, ctrl?: Control): Promise<ThirdPartyEntity>;
}
export { ThirdPartyEntity };
