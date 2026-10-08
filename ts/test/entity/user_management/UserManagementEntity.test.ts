

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HankoPublicSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('UserManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.UserManagement()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('user_management hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HankoPublicSDK.test(offline).UserManagement().stream('list')) { }
    }, /offline/)

    for await (const _item of HankoPublicSDK.test(offline).UserManagement()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.UserManagement().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HankoPublicSDK.test().UserManagement().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.UserManagement().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.UserManagement().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UserManagement().list({"created_at":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user_management.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time of creation of the the user","t":"`$STRING`","key$":"created_at","index$":0},"emails":{"a":true,"h":"Emails","n":"emails","r":false,"t":"`$ARRAY`","key$":"emails","index$":1},"family_name":{"a":true,"h":"Family Name","n":"family_name","r":false,"t":"`$STRING`","key$":"family_name","index$":2},"given_name":{"a":true,"h":"Given Name","n":"given_name","r":false,"t":"`$STRING`","key$":"given_name","index$":3},"id":{"a":true,"de":true,"fo":"uuid4","h":"Id","n":"id","r":false,"sh":"The ID of the user.","t":"`$STRING`","key$":"id","index$":4},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"The public and unsafe metadata of a user","t":"`$OBJECT`","key$":"metadata","index$":5},"mfa_config":{"a":true,"h":"Mfa Config","n":"mfa_config","r":false,"t":"`$OBJECT`","key$":"mfa_config","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":7},"passkeys":{"a":true,"h":"Passkeys","n":"passkeys","r":false,"t":"`$ARRAY`","key$":"passkeys","index$":8},"picture":{"a":true,"fo":"uri","h":"Picture","n":"picture","r":false,"t":"`$STRING`","key$":"picture","index$":9},"security_keys":{"a":true,"h":"Security Keys","n":"security_keys","r":false,"t":"`$ARRAY`","key$":"security_keys","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Time of last update of the user","t":"`$STRING`","key$":"updated_at","index$":11},"user_id":{"a":true,"fo":"uuid4","h":"User Id","n":"user_id","r":false,"sh":"The ID of the user","t":"`$STRING`","key$":"user_id","index$":12},"username":{"a":true,"h":"Username","n":"username","r":false,"sh":"The representation of a username of the user","t":"`$OBJECT`","key$":"username","index$":13}},"id":{"field":"id","name":"id"},"name":"user_management","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /logout","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/logout","q":{},"r":{},"s":[{"lit":"logout"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /me","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/me","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"me"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user_management","name__orig":"user_management","Name":"UserManagement","name_":"user_management","name-":"user-management","NAME":"USER_MANAGEMENT","index$":13}, {"active":true,"entity":"user_management","key$":"BasicUserManagementFlow","kind":"basic","name":"BasicUserManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_management_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_management_ref01"}}],"index$":1}]}, 'UserManagement', {"POST /logout":{"protocol":"http","parameters":[]},"GET /me":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_management_ref01_ent = client.UserManagement()
    let user_management_ref01_data = setup.data.new.user_management['user_management_ref01']

    user_management_ref01_data = (await user_management_ref01_ent.create(user_management_ref01_data)).data()
    assert(null != user_management_ref01_data.id)


    // LIST
    const user_management_ref01_match: any = {}

    const user_management_ref01_list = (await user_management_ref01_ent.list(user_management_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(user_management_ref01_list, { id: user_management_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user_management/UserManagementTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HankoPublicSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['user_management01','user_management02','user_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_USER_MANAGEMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HankoPublicSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HANKO_PUBLIC_APIKEY,
        server: {
          tenant_id: env.HANKO_PUBLIC_SERVER_TENANT_ID,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HANKO_PUBLIC_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
