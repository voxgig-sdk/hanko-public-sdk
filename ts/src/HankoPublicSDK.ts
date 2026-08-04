// HankoPublic Ts SDK

import { CreateUserResponseObjectEntity } from './entity/CreateUserResponseObjectEntity'
import { CredentialEntity } from './entity/CredentialEntity'
import { CredentialCreationOptionEntity } from './entity/CredentialCreationOptionEntity'
import { CredentialRequestOptionEntity } from './entity/CredentialRequestOptionEntity'
import { EmailEntity } from './entity/EmailEntity'
import { EmailManagementEntity } from './entity/EmailManagementEntity'
import { HankoConfigurationEntity } from './entity/HankoConfigurationEntity'
import { JsonWebKeySetEntity } from './entity/JsonWebKeySetEntity'
import { PasscodeEntity } from './entity/PasscodeEntity'
import { PasswordEntity } from './entity/PasswordEntity'
import { SamlEntity } from './entity/SamlEntity'
import { SessionManagementEntity } from './entity/SessionManagementEntity'
import { StatusEntity } from './entity/StatusEntity'
import { ThirdPartyEntity } from './entity/ThirdPartyEntity'
import { TokenEntity } from './entity/TokenEntity'
import { UserEntity } from './entity/UserEntity'
import { UserManagementEntity } from './entity/UserManagementEntity'
import { WebAuthnEntity } from './entity/WebAuthnEntity'
import { WebauthnLoginEntity } from './entity/WebauthnLoginEntity'

export type * from './HankoPublicTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { HankoPublicEntityBase } from './HankoPublicEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class HankoPublicSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.CreateUserResponseObject().list()` / `client.CreateUserResponseObject().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateUserResponseObject(entopts?: Record<string, any>) {
    const self = this
    return new CreateUserResponseObjectEntity(self, entopts)
  }


  // Entity access: `client.Credential().list()` / `client.Credential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Credential(entopts?: Record<string, any>) {
    const self = this
    return new CredentialEntity(self, entopts)
  }


  // Entity access: `client.CredentialCreationOption().list()` / `client.CredentialCreationOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CredentialCreationOption(entopts?: Record<string, any>) {
    const self = this
    return new CredentialCreationOptionEntity(self, entopts)
  }


  // Entity access: `client.CredentialRequestOption().list()` / `client.CredentialRequestOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CredentialRequestOption(entopts?: Record<string, any>) {
    const self = this
    return new CredentialRequestOptionEntity(self, entopts)
  }


  // Entity access: `client.Email().list()` / `client.Email().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Email(entopts?: Record<string, any>) {
    const self = this
    return new EmailEntity(self, entopts)
  }


  // Entity access: `client.EmailManagement().list()` / `client.EmailManagement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailManagement(entopts?: Record<string, any>) {
    const self = this
    return new EmailManagementEntity(self, entopts)
  }


  // Entity access: `client.HankoConfiguration().list()` / `client.HankoConfiguration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HankoConfiguration(entopts?: Record<string, any>) {
    const self = this
    return new HankoConfigurationEntity(self, entopts)
  }


  // Entity access: `client.JsonWebKeySet().list()` / `client.JsonWebKeySet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  JsonWebKeySet(entopts?: Record<string, any>) {
    const self = this
    return new JsonWebKeySetEntity(self, entopts)
  }


  // Entity access: `client.Passcode().list()` / `client.Passcode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Passcode(entopts?: Record<string, any>) {
    const self = this
    return new PasscodeEntity(self, entopts)
  }


  // Entity access: `client.Password().list()` / `client.Password().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Password(entopts?: Record<string, any>) {
    const self = this
    return new PasswordEntity(self, entopts)
  }


  // Entity access: `client.Saml().list()` / `client.Saml().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Saml(entopts?: Record<string, any>) {
    const self = this
    return new SamlEntity(self, entopts)
  }


  // Entity access: `client.SessionManagement().list()` / `client.SessionManagement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SessionManagement(entopts?: Record<string, any>) {
    const self = this
    return new SessionManagementEntity(self, entopts)
  }


  // Entity access: `client.Status().list()` / `client.Status().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Status(entopts?: Record<string, any>) {
    const self = this
    return new StatusEntity(self, entopts)
  }


  // Entity access: `client.ThirdParty().list()` / `client.ThirdParty().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ThirdParty(entopts?: Record<string, any>) {
    const self = this
    return new ThirdPartyEntity(self, entopts)
  }


  // Entity access: `client.Token().list()` / `client.Token().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Token(entopts?: Record<string, any>) {
    const self = this
    return new TokenEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }


  // Entity access: `client.UserManagement().list()` / `client.UserManagement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserManagement(entopts?: Record<string, any>) {
    const self = this
    return new UserManagementEntity(self, entopts)
  }


  // Entity access: `client.WebAuthn().list()` / `client.WebAuthn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebAuthn(entopts?: Record<string, any>) {
    const self = this
    return new WebAuthnEntity(self, entopts)
  }


  // Entity access: `client.WebauthnLogin().list()` / `client.WebauthnLogin().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebauthnLogin(entopts?: Record<string, any>) {
    const self = this
    return new WebauthnLoginEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new HankoPublicSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return HankoPublicSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'HankoPublic' }
  }

  toString() {
    return 'HankoPublic ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = HankoPublicSDK


export {
  stdutil,
  config,

  BaseFeature,
  HankoPublicEntityBase,

  HankoPublicSDK,
  SDK,
}


