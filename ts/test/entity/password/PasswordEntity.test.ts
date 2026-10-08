

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


describe('PasswordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Password()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Password().create({"password":1,"user_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'password.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"password":{"a":true,"h":"Password","n":"password","r":true,"sh":"The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.","t":"`$STRING`","key$":"password","index$":0},"user_id":{"a":true,"fo":"uuid4","h":"User Id","n":"user_id","r":true,"sh":"The ID of the user to create/set a password for","t":"`$STRING`","key$":"user_id","index$":1}},"name":"password","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["password","user_id"],"co":{"id":"POST /password/login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/password/login","q":{"$action":"login"},"r":{},"s":[{"lit":"password"},{"lit":"login"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["password","user_id"],"co":{"id":"PUT /password","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/password","q":{},"r":{},"s":[{"lit":"password"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"password","name__orig":"password","Name":"Password","name_":"password","name-":"password","NAME":"PASSWORD","index$":6}, {"active":true,"entity":"password","key$":"BasicPasswordFlow","kind":"basic","name":"BasicPasswordFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"password_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"password_ref01","srcdatavar":"password_ref01_data","suffix":"_up0","textfield":"password"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-password_ref01"}}],"v":[],"index$":1}]}, 'Password', {"POST /password/login":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"user_id":{"description":"The ID of the user to perform a password login for","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}]},"password":{"description":"The actual password, its `minLength` defaults to 8 but\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nthrough the `password.min_password_length` option.\n","type":"string","minLength":8,"maxLength":72,"example":"9UnCBEx924a45P7p","x-ref":"#/components/schemas/Password"}},"required":["user_id","password"]}}}},"parameters":[]},"PUT /password":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"user_id":{"description":"The ID of the user to create/set a password for","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"user_id"},"password":{"description":"The actual password, its `minLength` defaults to 8 but\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nthrough the `password.min_password_length` option.\n","type":"string","minLength":8,"maxLength":72,"example":"9UnCBEx924a45P7p","x-ref":"#/components/schemas/Password","key$":"password"}},"required":["user_id","password"],"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const password_ref01_ent = client.Password()
    let password_ref01_data = setup.data.new.password['password_ref01']

    password_ref01_data = (await password_ref01_ent.create(password_ref01_data)).data()
    assert(null != password_ref01_data)


    // UPDATE
    const password_ref01_data_up0: any = {}

    const password_ref01_markdef_up0 = { name: 'password', value: 'Mark01-password_ref01_' + setup.now }
    ;(password_ref01_data_up0 as any)[password_ref01_markdef_up0.name] = password_ref01_markdef_up0.value

    const password_ref01_resdata_up0 = (await password_ref01_ent.update(password_ref01_data_up0)).data()
    assert(null != password_ref01_resdata_up0)

    assert((password_ref01_resdata_up0 as any)[password_ref01_markdef_up0.name] === password_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/password/PasswordTestData.json')

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
    ['password01','password02','password03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_PASSWORD_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_PASSWORD_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_PASSWORD_ENTID']
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
  
