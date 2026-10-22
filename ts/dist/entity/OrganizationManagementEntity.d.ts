import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { OrganizationManagement, OrganizationManagementCreateData } from '../HankoPublicTypes';
declare class OrganizationManagementEntity extends HankoPublicEntityBase<OrganizationManagement> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: OrganizationManagementEntity): OrganizationManagementEntity;
    create(this: any, reqdata?: OrganizationManagementCreateData, ctrl?: Control): Promise<OrganizationManagementEntity>;
}
export { OrganizationManagementEntity };
