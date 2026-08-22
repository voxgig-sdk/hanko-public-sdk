import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { CreateUserResponseObject } from '../HankoPublicTypes';
declare class CreateUserResponseObjectEntity extends HankoPublicEntityBase<CreateUserResponseObject> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: CreateUserResponseObjectEntity): CreateUserResponseObjectEntity;
}
export { CreateUserResponseObjectEntity };
