
import { Context } from './Context'


class HankoPublicError extends Error {

  isHankoPublicError = true

  sdk = 'HankoPublic'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  HankoPublicError
}

