import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Credential, CredentialListMatch } from '../HankoPublicTypes';
declare class CredentialEntity extends HankoPublicEntityBase<Credential> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: CredentialEntity): CredentialEntity;
    list(this: any, reqmatch?: CredentialListMatch, ctrl?: Control): Promise<CredentialEntity[]>;
}
export { CredentialEntity };
