import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Email, EmailListMatch, EmailCreateData, EmailRemoveMatch } from '../HankoPublicTypes';
declare class EmailEntity extends HankoPublicEntityBase<Email> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    list(this: any, reqmatch?: EmailListMatch, ctrl?: Control): Promise<EmailEntity[]>;
    create(this: any, reqdata?: EmailCreateData, ctrl?: Control): Promise<EmailEntity>;
    remove(this: any, reqmatch?: EmailRemoveMatch, ctrl?: Control): Promise<EmailEntity>;
}
export { EmailEntity };
