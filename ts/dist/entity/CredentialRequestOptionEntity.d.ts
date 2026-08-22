import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { CredentialRequestOption, CredentialRequestOptionCreateData } from '../HankoPublicTypes';
declare class CredentialRequestOptionEntity extends HankoPublicEntityBase<CredentialRequestOption> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: CredentialRequestOptionEntity): CredentialRequestOptionEntity;
    create(this: any, reqdata?: CredentialRequestOptionCreateData, ctrl?: Control): Promise<CredentialRequestOptionEntity>;
}
export { CredentialRequestOptionEntity };
