import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch, UserCreateData, UserRemoveMatch } from '../HankoPublicTypes';
declare class UserEntity extends HankoPublicEntityBase<User> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
    create(this: any, reqdata?: UserCreateData, ctrl?: Control): Promise<UserEntity>;
    remove(this: any, reqmatch?: UserRemoveMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
