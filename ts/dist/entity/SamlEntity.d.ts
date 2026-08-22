import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Saml, SamlLoadMatch, SamlCreateData } from '../HankoPublicTypes';
declare class SamlEntity extends HankoPublicEntityBase<Saml> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: SamlEntity): SamlEntity;
    load(this: any, reqmatch?: SamlLoadMatch, ctrl?: Control): Promise<SamlEntity>;
    create(this: any, reqdata?: SamlCreateData, ctrl?: Control): Promise<SamlEntity>;
}
export { SamlEntity };
