import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { UserManagement, UserManagementListMatch, UserManagementCreateData } from '../HankoPublicTypes';
declare class UserManagementEntity extends HankoPublicEntityBase<UserManagement> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: UserManagementEntity): UserManagementEntity;
    list(this: any, reqmatch?: UserManagementListMatch, ctrl?: Control): Promise<UserManagementEntity[]>;
    create(this: any, reqdata?: UserManagementCreateData, ctrl?: Control): Promise<UserManagementEntity>;
}
export { UserManagementEntity };
