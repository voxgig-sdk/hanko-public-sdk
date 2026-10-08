

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


describe('WebAuthnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.WebAuthn()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('web_authn hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HankoPublicSDK.test(offline).WebAuthn().stream('list')) { }
    }, /offline/)

    for await (const _item of HankoPublicSDK.test(offline).WebAuthn()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HankoPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.WebAuthn().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HankoPublicSDK.test().WebAuthn().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HankoPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.WebAuthn().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.WebAuthn().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WebAuthn().list({"aaguid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'web_authn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aaguid":{"a":true,"fo":"uuid","h":"Aaguid","n":"aaguid","r":false,"t":"`$STRING`","key$":"aaguid","index$":0},"attestation_type":{"a":true,"h":"Attestation Type","n":"attestation_type","r":false,"t":"`$STRING`","key$":"attestation_type","index$":1},"backup_eligible":{"a":true,"h":"Backup Eligible","n":"backup_eligible","r":false,"t":"`$BOOLEAN`","key$":"backup_eligible","index$":2},"backup_state":{"a":true,"h":"Backup State","n":"backup_state","r":false,"t":"`$BOOLEAN`","key$":"backup_state","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":4},"credential_id":{"a":true,"fo":"base64","h":"Credential Id","n":"credential_id","r":false,"sh":"The ID of the created credential","t":"`$STRING`","key$":"credential_id","index$":5},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":6},"last_used_at":{"a":true,"fo":"date-time","h":"Last Used At","n":"last_used_at","r":false,"t":"`$STRING`","key$":"last_used_at","index$":7},"mfa_only":{"a":true,"h":"Mfa Only","n":"mfa_only","r":false,"t":"`$BOOLEAN`","key$":"mfa_only","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"A new credential name.","t":"`$STRING`","key$":"name","index$":9},"publickey":{"a":true,"h":"Publickey","n":"publickey","r":false,"t":"`$STRING`","key$":"publickey","index$":10},"rawId":{"a":true,"h":"Raw Id","n":"rawId","r":false,"t":"`$STRING`","key$":"rawId","index$":11},"response":{"a":true,"h":"Response","n":"response","r":false,"t":"`$OBJECT`","key$":"response","index$":12},"transports":{"a":true,"h":"Transports","n":"transports","r":false,"t":"`$ARRAY`","key$":"transports","index$":13},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":14},"user_id":{"a":true,"fo":"uuid4","h":"User Id","n":"user_id","r":false,"sh":"The ID of the user on whose behalf a credential was created","t":"`$STRING`","key$":"user_id","index$":15}},"id":{"field":"id","name":"id"},"name":"web_authn","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["id","rawId","response","type"],"co":{"id":"POST /webauthn/registration/finalize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/webauthn/registration/finalize","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webauthn"},{"lit":"registration"},{"lit":"finalize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /webauthn/credentials","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/webauthn/credentials","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webauthn"},{"lit":"credentials"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /webauthn/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/webauthn/credentials/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"webauthn"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["name"],"co":{"id":"PATCH /webauthn/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/webauthn/credentials/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"webauthn"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"web_authn","name__orig":"web_authn","Name":"WebAuthn","name_":"web_authn","name-":"web-authn","NAME":"WEB_AUTHN","index$":14}, {"active":true,"entity":"web_authn","key$":"BasicWebAuthnFlow","kind":"basic","name":"BasicWebAuthnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"web_authn_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"web_authn_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"web_authn_ref01","srcdatavar":"web_authn_ref01_data","suffix":"_up0","textfield":"aaguid"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-web_authn_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"web_authn_ref01","suffix":"_rm0"},"m":{"id":"web_authn01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"web_authn_ref01"}}],"index$":4}]}, 'WebAuthn', {"POST /webauthn/registration/finalize":{"protocol":"http","requestBody":{"description":"Challenge response","content":{"application/json":{"schema":{"description":"WebAuthn API response to a navigator.credentials.create() call","type":"object","properties":{"id":{"type":"string","example":"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...","key$":"id"},"rawId":{"type":"string","example":"_18q6IjW09tiM4NSbsZjocUtGx00Muv5mN6LZCelCMDD...","key$":"rawId"},"type":{"type":"string","enum":["public-key"],"example":"public-key","key$":"type"},"response":{"type":"object","properties":{"clientDataJson":{"type":"string","format":"base64url","example":"eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdl..."},"attestationObject":{"type":"string","format":"base64url","example":"o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjfSZYN..."},"transports":{"type":"array","items":{"type":"string","enum":[],"example":"internal"}}},"key$":"response"}},"x-ref":"#/components/schemas/PublicKeyCredentialAttestationResponse","index$":1}}}},"parameters":[]},"GET /webauthn/credentials":{"protocol":"http","parameters":[]},"DELETE /webauthn/credentials/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"ID of the WebAuthn credential","required":true,"schema":{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"},"index$":0}]},"PATCH /webauthn/credentials/{id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"description":"A new credential name. Has no technical meaning, only serves as an identification aid for the user.","type":"string","key$":"name"}},"index$":1}}}},"parameters":[{"name":"id","in":"path","description":"ID of the WebAuthn credential","required":true,"schema":{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const web_authn_ref01_ent = client.WebAuthn()
    let web_authn_ref01_data = setup.data.new.web_authn['web_authn_ref01']

    web_authn_ref01_data = (await web_authn_ref01_ent.create(web_authn_ref01_data)).data()
    assert(null != web_authn_ref01_data.id)


    // LIST
    const web_authn_ref01_match: any = {}

    const web_authn_ref01_list = (await web_authn_ref01_ent.list(web_authn_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(web_authn_ref01_list, { id: web_authn_ref01_data.id })))


    // UPDATE
    const web_authn_ref01_data_up0: any = {}
    web_authn_ref01_data_up0.id = web_authn_ref01_data.id

    const web_authn_ref01_markdef_up0 = { name: 'aaguid', value: 'Mark01-web_authn_ref01_' + setup.now }
    ;(web_authn_ref01_data_up0 as any)[web_authn_ref01_markdef_up0.name] = web_authn_ref01_markdef_up0.value

    const web_authn_ref01_resdata_up0 = (await web_authn_ref01_ent.update(web_authn_ref01_data_up0)).data()
    assert(web_authn_ref01_resdata_up0.id === web_authn_ref01_data_up0.id)

    assert((web_authn_ref01_resdata_up0 as any)[web_authn_ref01_markdef_up0.name] === web_authn_ref01_markdef_up0.value)


    // REMOVE
    const web_authn_ref01_match_rm0: any = { id: web_authn_ref01_data.id }
    await web_authn_ref01_ent.remove(web_authn_ref01_match_rm0)
  

    // LIST
    const web_authn_ref01_match_rt0: any = {}

    const web_authn_ref01_list_rt0 = (await web_authn_ref01_ent.list(web_authn_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(web_authn_ref01_list_rt0, { id: web_authn_ref01_data.id })))


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
      '../../../../.sdk/test/entity/web_authn/WebAuthnTestData.json')

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
    ['web_authn01','web_authn02','web_authn03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID']
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
  
