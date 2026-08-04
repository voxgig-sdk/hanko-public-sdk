
import { inspect } from 'node:util'

import { HankoPublicEntityBase } from '../HankoPublicEntityBase'

import type {
  HankoPublicSDK,
} from '../HankoPublicSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  CreateUserResponseObject,
} from '../HankoPublicTypes'

// TODO: needs Entity superclass
class CreateUserResponseObjectEntity extends HankoPublicEntityBase<CreateUserResponseObject> {

  constructor(client: HankoPublicSDK, entopts: any) {
    super(client, entopts)
    this.name = 'create_user_response_object'
    this.name_ = 'create_user_response_object'
    this.Name = 'CreateUserResponseObject'
  }


  make(this: CreateUserResponseObjectEntity) {
    return new CreateUserResponseObjectEntity(this._client, this.entopts())
  }







}


export {
  CreateUserResponseObjectEntity
}
