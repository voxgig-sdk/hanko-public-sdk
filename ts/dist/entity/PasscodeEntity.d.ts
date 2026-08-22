import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Passcode, PasscodeCreateData } from '../HankoPublicTypes';
declare class PasscodeEntity extends HankoPublicEntityBase<Passcode> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: PasscodeEntity): PasscodeEntity;
    create(this: any, reqdata?: PasscodeCreateData, ctrl?: Control): Promise<PasscodeEntity>;
}
export { PasscodeEntity };
