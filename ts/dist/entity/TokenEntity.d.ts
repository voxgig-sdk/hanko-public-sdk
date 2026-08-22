import { HankoPublicEntityBase } from '../HankoPublicEntityBase';
import type { HankoPublicSDK } from '../HankoPublicSDK';
import type { Control } from '../types';
import type { Token, TokenCreateData } from '../HankoPublicTypes';
declare class TokenEntity extends HankoPublicEntityBase<Token> {
    constructor(client: HankoPublicSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    create(this: any, reqdata?: TokenCreateData, ctrl?: Control): Promise<TokenEntity>;
}
export { TokenEntity };
