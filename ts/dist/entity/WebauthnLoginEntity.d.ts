import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { WebauthnLogin, WebauthnLoginCreateData } from '../HankoPublicTypes';
declare class WebauthnLoginEntity extends HankoPublicEntityBase<WebauthnLogin> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: WebauthnLoginEntity): WebauthnLoginEntity;
    create(this: any, reqdata?: WebauthnLoginCreateData, ctrl?: Control): Promise<WebauthnLoginEntity>;
}
export { WebauthnLoginEntity };
