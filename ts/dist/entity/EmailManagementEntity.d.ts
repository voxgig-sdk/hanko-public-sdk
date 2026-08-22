import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { EmailManagement, EmailManagementCreateData } from '../HankoPublicTypes';
declare class EmailManagementEntity extends HankoPublicEntityBase<EmailManagement> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: EmailManagementEntity): EmailManagementEntity;
    create(this: any, reqdata?: EmailManagementCreateData, ctrl?: Control): Promise<EmailManagementEntity>;
}
export { EmailManagementEntity };
