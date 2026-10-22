import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { SessionManagement, SessionManagementListMatch, SessionManagementCreateData } from '../HankoPublicTypes';
declare class SessionManagementEntity extends HankoPublicEntityBase<SessionManagement> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: SessionManagementEntity): SessionManagementEntity;
    list(this: any, reqmatch?: SessionManagementListMatch, ctrl?: Control): Promise<SessionManagementEntity[]>;
    create(this: any, reqdata?: SessionManagementCreateData, ctrl?: Control): Promise<SessionManagementEntity>;
}
export { SessionManagementEntity };
