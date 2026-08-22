import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { WebAuthn, WebAuthnCreateData, WebAuthnUpdateData, WebAuthnRemoveMatch } from '../HankoPublicTypes';
declare class WebAuthnEntity extends HankoPublicEntityBase<WebAuthn> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: WebAuthnEntity): WebAuthnEntity;
    create(this: any, reqdata?: WebAuthnCreateData, ctrl?: Control): Promise<WebAuthnEntity>;
    update(this: any, reqdata?: WebAuthnUpdateData, ctrl?: Control): Promise<WebAuthnEntity>;
    remove(this: any, reqmatch?: WebAuthnRemoveMatch, ctrl?: Control): Promise<WebAuthnEntity>;
}
export { WebAuthnEntity };
