

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


describe('SessionManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.SessionManagement()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('session_management hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HankoPublicSDK.test(offline).SessionManagement().stream('list')) { }
    }, /offline/)

    for await (const _item of HankoPublicSDK.test(offline).SessionManagement()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.SessionManagement().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HankoPublicSDK.test().SessionManagement().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.SessionManagement().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.SessionManagement().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SessionManagement().list({"expiration_time":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'session_management.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"claims":{"a":true,"h":"Claims","n":"claims","r":true,"sh":"The claims extracted from a JWT.","t":"`$OBJECT`","key$":"claims","index$":0},"expiration_time":{"a":true,"de":true,"fo":"date-time","h":"Expiration Time","n":"expiration_time","r":false,"sh":"Date-time indicating the expiration of the session.","t":"`$STRING`","key$":"expiration_time","index$":1},"id":{"a":true,"fo":"uuid4","h":"Id","n":"id","r":true,"sh":"The ID of the organization","t":"`$STRING`","key$":"id","index$":2},"idle_expires_at":{"a":true,"fo":"date-time","h":"Idle Expires At","n":"idle_expires_at","r":false,"sh":"Timestamp (in UTC) indicating when the session will expire due to inactivity, assuming no further activity occurs before this time.","t":"`$STRING`","key$":"idle_expires_at","index$":3},"is_valid":{"a":true,"h":"Is Valid","n":"is_valid","r":false,"sh":"Indicates whether the session is valid or not","t":"`$BOOLEAN`","key$":"is_valid","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the organization","t":"`$STRING`","key$":"name","index$":5},"organizations":{"a":true,"h":"Organizations","n":"organizations","r":false,"sh":"The organizations the user belongs to, and the role slugs they hold within each.","t":"`$ARRAY`","key$":"organizations","index$":6},"roles":{"a":true,"h":"Roles","n":"roles","r":true,"sh":"The slugs of the roles the user holds within this organization","t":"`$ARRAY`","key$":"roles","index$":7},"session_token":{"a":true,"fo":"JWT","h":"Session Token","n":"session_token","r":true,"sh":"The session token (JWT) to validate","t":"`$STRING`","key$":"session_token","index$":8},"user_id":{"a":true,"de":true,"fo":"uuid4","h":"User Id","n":"user_id","r":false,"sh":"The ID of the user the session is associated with.","t":"`$STRING`","key$":"user_id","index$":9}},"id":{"field":"id","name":"id"},"name":"session_management","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["session_token"],"co":{"id":"POST /sessions/validate","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/sessions/validate","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sessions"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /sessions/validate","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/sessions/validate","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sessions"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"session_management","name__orig":"session_management","Name":"SessionManagement","name_":"session_management","name-":"session-management","NAME":"SESSION_MANAGEMENT","index$":3}, {"active":true,"entity":"session_management","key$":"BasicSessionManagementFlow","kind":"basic","name":"BasicSessionManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"session_management_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"session_management_ref01"}}],"index$":1}]}, 'SessionManagement', {"POST /sessions/validate":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"session_token":{"description":"The session token (JWT) to validate","type":"string","format":"JWT","key$":"session_token"}},"required":["session_token"],"index$":1}}}},"parameters":[]},"GET /sessions/validate":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const session_management_ref01_ent = client.SessionManagement()
    let session_management_ref01_data = setup.data.new.session_management['session_management_ref01']

    session_management_ref01_data = (await session_management_ref01_ent.create(session_management_ref01_data)).data()
    assert(null != session_management_ref01_data.id)


    // LIST
    const session_management_ref01_match: any = {}

    const session_management_ref01_list = (await session_management_ref01_ent.list(session_management_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(session_management_ref01_list, { id: session_management_ref01_data.id })))


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
      '../../../../.sdk/test/entity/session_management/SessionManagementTestData.json')

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
    ['session_management01','session_management02','session_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_SESSION_MANAGEMENT_ENTID']
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
  
