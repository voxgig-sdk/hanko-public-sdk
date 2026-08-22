import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { CredentialCreationOption, CredentialCreationOptionCreateData } from '../HankoPublicTypes';
declare class CredentialCreationOptionEntity extends HankoPublicEntityBase<CredentialCreationOption> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: CredentialCreationOptionEntity): CredentialCreationOptionEntity;
    create(this: any, reqdata?: CredentialCreationOptionCreateData, ctrl?: Control): Promise<CredentialCreationOptionEntity>;
}
export { CredentialCreationOptionEntity };
