import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Status, StatusLoadMatch } from '../HankoPublicTypes';
declare class StatusEntity extends HankoPublicEntityBase<Status> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: StatusEntity): StatusEntity;
    load(this: any, reqmatch?: StatusLoadMatch, ctrl?: Control): Promise<StatusEntity>;
}
export { StatusEntity };
