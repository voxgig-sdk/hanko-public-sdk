

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


describe('EmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Email()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('email hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HankoPublicSDK.test(offline).Email().stream('list')) { }
    }, /offline/)

    for await (const _item of HankoPublicSDK.test(offline).Email()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Email().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HankoPublicSDK.test().Email().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Email().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Email().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Email().list({"address":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"fo":"email","h":"Address","n":"address","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email address","t":"`$STRING`","key$":"address","index$":0},"id":{"a":true,"fo":"uuid4","h":"Id","n":"id","r":false,"sh":"The ID of the email address","t":"`$STRING`","key$":"id","index$":1},"identities":{"a":true,"h":"Identities","n":"identities","r":false,"t":"`$ANY`","key$":"identities","index$":2},"identity":{"a":true,"h":"Identity","n":"identity","r":false,"t":"`$ANY`","key$":"identity","index$":3},"is_primary":{"a":true,"h":"Is Primary","n":"is_primary","r":false,"sh":"Indicates it's the primary email address.","t":"`$BOOLEAN`","key$":"is_primary","index$":4},"is_verified":{"a":true,"h":"Is Verified","n":"is_verified","r":false,"sh":"Indicated the email has been verified.","t":"`$BOOLEAN`","key$":"is_verified","index$":5}},"id":{"field":"id","name":"id"},"name":"email","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /emails/{id}/set_primary","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/emails/{id}/set_primary","q":{"$action":"set_primary","exist":["id"]},"r":{},"s":[{"lit":"emails"},{"var":"id"},{"lit":"set_primary"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["address"],"co":{"id":"POST /emails","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/emails","q":{},"r":{},"s":[{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /emails","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/emails","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /emails/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/emails/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"emails"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"email","name__orig":"email","Name":"Email","name_":"email","name-":"email","NAME":"EMAIL","index$":2}, {"active":true,"entity":"email","key$":"BasicEmailFlow","kind":"basic","name":"BasicEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"email_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"email_ref01","suffix":"_rm0"},"m":{"id":"email01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"email_ref01"}}],"index$":3}]}, 'Email', {"POST /emails/{id}/set_primary":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"ID of the email address","required":true,"schema":{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"},"index$":0}]},"POST /emails":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"address":{"type":"string","format":"email","key$":"address"}},"required":["address"],"index$":1}}}},"parameters":[]},"GET /emails":{"protocol":"http","parameters":[]},"DELETE /emails/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"ID of the email address","required":true,"schema":{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_ref01_ent = client.Email()
    let email_ref01_data = setup.data.new.email['email_ref01']

    email_ref01_data = (await email_ref01_ent.create(email_ref01_data)).data()
    assert(null != email_ref01_data.id)


    // LIST
    const email_ref01_match: any = {}

    const email_ref01_list = (await email_ref01_ent.list(email_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(email_ref01_list, { id: email_ref01_data.id })))


    // REMOVE
    const email_ref01_match_rm0: any = { id: email_ref01_data.id }
    await email_ref01_ent.remove(email_ref01_match_rm0)
  

    // LIST
    const email_ref01_match_rt0: any = {}

    const email_ref01_list_rt0 = (await email_ref01_ent.list(email_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(email_ref01_list_rt0, { id: email_ref01_data.id })))


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
      '../../../../.sdk/test/entity/email/EmailTestData.json')

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
    ['email01','email02','email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_EMAIL_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_EMAIL_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_EMAIL_ENTID']
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
  
