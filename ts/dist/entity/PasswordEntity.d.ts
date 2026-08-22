import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Password, PasswordCreateData, PasswordUpdateData } from '../HankoPublicTypes';
declare class PasswordEntity extends HankoPublicEntityBase<Password> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: PasswordEntity): PasswordEntity;
    create(this: any, reqdata?: PasswordCreateData, ctrl?: Control): Promise<PasswordEntity>;
    update(this: any, reqdata?: PasswordUpdateData, ctrl?: Control): Promise<PasswordEntity>;
}
export { PasswordEntity };
