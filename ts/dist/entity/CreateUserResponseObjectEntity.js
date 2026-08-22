"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResponseObjectEntity = void 0;
const HankoPublicEntityBase_1 = require("../HankoPublicEntityBase");
// TODO: needs Entity superclass
class CreateUserResponseObjectEntity extends HankoPublicEntityBase_1.HankoPublicEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'create_user_response_object';
        this.name_ = 'create_user_response_object';
        this.Name = 'CreateUserResponseObject';
    }
    make() {
        return new CreateUserResponseObjectEntity(this._client, this.entopts());
    }
}
exports.CreateUserResponseObjectEntity = CreateUserResponseObjectEntity;
//# sourceMappingURL=CreateUserResponseObjectEntity.js.map