

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


describe('PasscodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Passcode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Passcode().create({"code":1,"user_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'passcode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits","t":"`$STRING`","key$":"code","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time of creation of the passcode","t":"`$STRING`","key$":"created_at","index$":1},"email_id":{"a":true,"fo":"uuid4","h":"Email Id","n":"email_id","r":false,"sh":"The ID of the email address","t":"`$STRING`","key$":"email_id","index$":2},"id":{"a":true,"fo":"uuid4","h":"Id","n":"id","r":false,"sh":"The ID of the passcode","t":"`$STRING`","key$":"id","index$":3},"ttl":{"a":true,"h":"Ttl","n":"ttl","r":false,"sh":"Lifespan of a passcode in seconds","t":"`$INTEGER`","key$":"ttl","index$":4},"user_id":{"a":true,"fo":"uuid4","h":"User Id","n":"user_id","r":true,"sh":"The ID of the user","t":"`$STRING`","key$":"user_id","index$":5}},"id":{"field":"id","name":"id"},"name":"passcode","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["code","id"],"co":{"id":"POST /passcode/login/finalize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/passcode/login/finalize","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"passcode"},{"lit":"login"},{"lit":"finalize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["email_id","user_id"],"co":{"id":"POST /passcode/login/initialize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/passcode/login/initialize","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"passcode"},{"lit":"login"},{"lit":"initialize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"passcode","name__orig":"passcode","Name":"Passcode","name_":"passcode","name-":"passcode","NAME":"PASSCODE","index$":5}, {"active":true,"entity":"passcode","key$":"BasicPasscodeFlow","kind":"basic","name":"BasicPasscodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"passcode_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Passcode', {"POST /passcode/login/finalize":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"The ID of the passcode","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"id"},"code":{"type":"string","minLength":6,"maxLength":6,"description":"The actual passcode from the email sent to the user during initialization,\na string of 6 decimal digits\n","example":"897481","key$":"code"}},"index$":1}}}},"parameters":[]},"POST /passcode/login/initialize":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"user_id":{"description":"The ID of the user","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"user_id"},"email_id":{"description":"The ID of the email address","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"email_id"}},"required":["user_id"],"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const passcode_ref01_ent = client.Passcode()
    let passcode_ref01_data = setup.data.new.passcode['passcode_ref01']

    passcode_ref01_data = (await passcode_ref01_ent.create(passcode_ref01_data)).data()
    assert(null != passcode_ref01_data.id)


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
      '../../../../.sdk/test/entity/passcode/PasscodeTestData.json')

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
    ['passcode01','passcode02','passcode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_PASSCODE_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_PASSCODE_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_PASSCODE_ENTID']
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
  
