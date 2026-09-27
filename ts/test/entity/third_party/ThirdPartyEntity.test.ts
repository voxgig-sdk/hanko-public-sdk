

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


describe('ThirdPartyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.ThirdParty()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'third_party.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"third_party","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /thirdparty/callback","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"code","or":"code","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"error","or":"error","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"error_description","or":"error_description","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/thirdparty/callback","q":{"exist":["code","error","error_description","state"]},"r":{},"s":[{"lit":"thirdparty"},{"lit":"callback"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /thirdparty/auth","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"provider","or":"provider","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"redirect_to","or":"redirect_to","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/thirdparty/auth","q":{"exist":["provider","redirect_to"]},"r":{},"s":[{"lit":"thirdparty"},{"lit":"auth"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"third_party","name__orig":"third_party","Name":"ThirdParty","name_":"third_party","name-":"third-party","NAME":"THIRD_PARTY","index$":11}, {"active":true,"entity":"third_party","key$":"BasicThirdPartyFlow","kind":"basic","name":"BasicThirdPartyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"third_party_ref01","srcdatavar":"third_party_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-third_party_ref01"}}],"index$":0}]}, 'ThirdParty', {"GET /thirdparty/callback":{"protocol":"http","parameters":[{"in":"query","name":"code","schema":{"type":"string"},"description":"The authorization code that can be exchanged for an access token and to retrieve user provider data\n","index$":0},{"in":"query","name":"state","required":true,"schema":{"type":"string"},"description":"The state","index$":1},{"in":"query","name":"error","schema":{"type":"string"},"description":"An error returned from the third party provider\n","index$":2},{"in":"query","name":"error_description","schema":{"type":"string"},"description":"The description of the error that occurred (if any)","index$":3}]},"GET /thirdparty/auth":{"protocol":"http","parameters":[{"in":"query","name":"provider","required":true,"schema":{"type":"string","enum":["google","github"]},"description":"The name of the third party provider to log in with. Only providers enabled in the\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nvia the `thirdparty.providers` option can be used. Requesting an unsupported provider results in a\nredirect with error details in the location query.\n","index$":0},{"in":"query","name":"redirect_to","required":true,"schema":{"type":"string","format":"base64url"},"description":"Base64url encoded string representing the URL the\n[`/callback`](#tag/Third-Party/operation/thirdPartyCallback) eventually redirects to after successful login\nwith the third party provider. It must match one of the allowed redirect URLs set in the backend\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\nthrough the `third_party.allowed_redirect_urls`.\n","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let third_party_ref01_data = Object.values(setup.data.existing.third_party)[0] as any

    // LOAD
    const third_party_ref01_ent = client.ThirdParty()
    const third_party_ref01_match_dt0: any = {}
    const third_party_ref01_data_dt0 = (await third_party_ref01_ent.load(third_party_ref01_match_dt0)).data()
    assert(null != third_party_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/third_party/ThirdPartyTestData.json')

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
    ['third_party01','third_party02','third_party03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_THIRD_PARTY_ENTID']
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
  
