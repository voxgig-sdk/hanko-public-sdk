import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { HankoConfiguration, HankoConfigurationLoadMatch } from '../HankoPublicTypes';
declare class HankoConfigurationEntity extends HankoPublicEntityBase<HankoConfiguration> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: HankoConfigurationEntity): HankoConfigurationEntity;
    load(this: any, reqmatch?: HankoConfigurationLoadMatch, ctrl?: Control): Promise<HankoConfigurationEntity>;
}
export { HankoConfigurationEntity };
