

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HankoPublicSDK, BaseFeature, stdutil } from '../../..'

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time of creation of the the user","t":"`$STRING`","key$":"created_at","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The email address of the user","t":"`$STRING`","key$":"email","index$":1},"email_id":{"a":true,"fo":"uuid4","h":"Email Id","n":"email_id","r":false,"sh":"The ID of the newly created email address","t":"`$STRING`","key$":"email_id","index$":2},"emails":{"a":true,"h":"Emails","n":"emails","r":false,"t":"`$ARRAY`","key$":"emails","index$":3},"family_name":{"a":true,"h":"Family Name","n":"family_name","r":false,"t":"`$STRING`","key$":"family_name","index$":4},"given_name":{"a":true,"h":"Given Name","n":"given_name","r":false,"t":"`$STRING`","key$":"given_name","index$":5},"has_webauthn_credential":{"a":true,"h":"Has Webauthn Credential","n":"has_webauthn_credential","r":false,"t":"`$BOOLEAN`","key$":"has_webauthn_credential","index$":6},"id":{"a":true,"de":true,"fo":"uuid4","h":"Id","n":"id","r":false,"sh":"The ID of the user.","t":"`$STRING`","key$":"id","index$":7},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"The public and unsafe metadata of a user","t":"`$OBJECT`","key$":"metadata","index$":8},"mfa_config":{"a":true,"h":"Mfa Config","n":"mfa_config","r":false,"t":"`$OBJECT`","key$":"mfa_config","index$":9},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":10},"passkeys":{"a":true,"h":"Passkeys","n":"passkeys","r":false,"t":"`$ARRAY`","key$":"passkeys","index$":11},"picture":{"a":true,"fo":"uri","h":"Picture","n":"picture","r":false,"t":"`$STRING`","key$":"picture","index$":12},"security_keys":{"a":true,"h":"Security Keys","n":"security_keys","r":false,"t":"`$ARRAY`","key$":"security_keys","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Time of last update of the user","t":"`$STRING`","key$":"updated_at","index$":14},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"The ID of the user","t":"`$STRING`","key$":"user_id","index$":15},"username":{"a":true,"h":"Username","n":"username","r":false,"sh":"The username of the user","t":"`$STRING`","key$":"username","index$":16},"verified":{"a":true,"h":"Verified","n":"verified","r":false,"t":"`$BOOLEAN`","key$":"verified","index$":17},"webauthn_credentials":{"a":true,"h":"Webauthn Credentials","n":"webauthn_credentials","r":false,"sh":"A list of WebAuthn credentials","t":"`$ARRAY`","key$":"webauthn_credentials","index$":18}},"id":{"field":"id","name":"id"},"name":"user","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /user","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/user","q":{},"r":{},"s":[{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /users","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/users","q":{},"r":{},"s":[{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /users/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/users/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /user","source":"openapi3","version":2},"g":{},"k":"http","m":"DELETE","o":"/user","q":{},"r":{},"s":[{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":13}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_dt0"},"m":{"id":"user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"user_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":2}]}, 'User', {"POST /user":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email","key$":"email"}},"index$":1}}}},"parameters":[]},"POST /users":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email","key$":"email"}},"required":["email"],"index$":1}}}},"parameters":[]},"GET /users/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"ID of the user","required":true,"schema":{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"},"index$":0}]},"DELETE /user":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_ref01_ent = client.User()
    let user_ref01_data = setup.data.new.user['user_ref01']

    user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data()
    assert(null != user_ref01_data.id)


    // LOAD
    const user_ref01_match_dt0: any = {}
    user_ref01_match_dt0.id = user_ref01_data.id
    const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data()
    assert(user_ref01_data_dt0.id === user_ref01_data.id)


    // REMOVE
    const user_ref01_match_rm0: any = { id: user_ref01_data.id }
    await user_ref01_ent.remove(user_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_USER_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_USER_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_USER_ENTID']
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
  
