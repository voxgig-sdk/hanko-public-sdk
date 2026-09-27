

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


describe('WebauthnLoginEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.WebauthnLogin()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webauthn_login.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credential_id":{"a":true,"fo":"base64url","h":"Credential Id","n":"credential_id","r":false,"t":"`$STRING`","key$":"credential_id","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"rawId":{"a":true,"h":"Raw Id","n":"rawId","r":false,"t":"`$STRING`","key$":"rawId","index$":2},"response":{"a":true,"h":"Response","n":"response","r":false,"t":"`$OBJECT`","key$":"response","index$":3},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":4},"user_id":{"a":true,"fo":"uuid4","h":"User Id","n":"user_id","r":false,"t":"`$STRING`","key$":"user_id","index$":5}},"id":{"field":"id","name":"id"},"name":"webauthn_login","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /webauthn/login/finalize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/webauthn/login/finalize","q":{},"r":{},"s":[{"lit":"webauthn"},{"lit":"login"},{"lit":"finalize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"webauthn_login","name__orig":"webauthn_login","Name":"WebauthnLogin","name_":"webauthn_login","name-":"webauthn-login","NAME":"WEBAUTHN_LOGIN","index$":16}, {"active":true,"entity":"webauthn_login","key$":"BasicWebauthnLoginFlow","kind":"basic","name":"BasicWebauthnLoginFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webauthn_login_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'WebauthnLogin', {"POST /webauthn/login/finalize":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"WebAuthn API response to a navigator.credentials.get() call","type":"object","properties":{"id":{"type":"string","example":"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...","key$":"id"},"rawId":{"type":"string","example":"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...","key$":"rawId"},"type":{"type":"string","enum":["public-key"],"example":"public-key","key$":"type"},"response":{"type":"object","properties":{"clientDataJson":{"type":"string","format":"base64url","example":"eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdl..."},"authenticatorData":{"type":"string","format":"base64url","example":"SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MF..."},"signature":{"type":"string","format":"base64url","example":"MEQCIHe2RXqh6dyZw1LNXgeTTxljCV_qK2ydQjp02CiF..."},"userHandle":{"type":"string","format":"base64url","example":"rpe_EkgaSEeZG0TwzZyZJw"}},"key$":"response"}},"x-ref":"#/components/schemas/PublicKeyCredentialAssertionResponse","index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webauthn_login_ref01_ent = client.WebauthnLogin()
    let webauthn_login_ref01_data = setup.data.new.webauthn_login['webauthn_login_ref01']

    webauthn_login_ref01_data = (await webauthn_login_ref01_ent.create(webauthn_login_ref01_data)).data()
    assert(null != webauthn_login_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webauthn_login/WebauthnLoginTestData.json')

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
    ['webauthn_login01','webauthn_login02','webauthn_login03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_WEBAUTHN_LOGIN_ENTID']
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
  
