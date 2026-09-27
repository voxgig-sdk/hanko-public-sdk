

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


describe('CredentialRequestOptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.CredentialRequestOption()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'credential_request_option.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allowCredentials":{"a":true,"h":"Allow Credentials","n":"allowCredentials","r":false,"t":"`$ARRAY`","key$":"allowCredentials","index$":0},"challenge":{"a":true,"fo":"base64url","h":"Challenge","n":"challenge","r":false,"t":"`$STRING`","key$":"challenge","index$":1},"rpId":{"a":true,"h":"Rp Id","n":"rpId","r":false,"t":"`$STRING`","key$":"rpId","index$":2},"timeout":{"a":true,"fo":"int64","h":"Timeout","n":"timeout","r":false,"t":"`$INTEGER`","key$":"timeout","index$":3},"userVerification":{"a":true,"h":"User Verification","n":"userVerification","r":false,"t":"`$STRING`","key$":"userVerification","index$":4},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"The ID of the user on whose behalf WebAuthn login should be performed","t":"`$STRING`","key$":"user_id","index$":5}},"name":"credential_request_option","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /webauthn/login/initialize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/webauthn/login/initialize","q":{},"r":{},"s":[{"lit":"webauthn"},{"lit":"login"},{"lit":"initialize"}],"t":{"req":"`reqdata`","res":"`body.publicKey`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"credential_request_option","name__orig":"credential_request_option","Name":"CredentialRequestOption","name_":"credential_request_option","name-":"credential-request-option","NAME":"CREDENTIAL_REQUEST_OPTION","index$":2}, {"active":true,"entity":"credential_request_option","key$":"BasicCredentialRequestOptionFlow","kind":"basic","name":"BasicCredentialRequestOptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"credential_request_option_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CredentialRequestOption', {"POST /webauthn/login/initialize":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"user_id":{"description":"The ID of the user on whose behalf WebAuthn login should be performed","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"user_id"}},"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const credential_request_option_ref01_ent = client.CredentialRequestOption()
    let credential_request_option_ref01_data = setup.data.new.credential_request_option['credential_request_option_ref01']

    credential_request_option_ref01_data = (await credential_request_option_ref01_ent.create(credential_request_option_ref01_data)).data()
    assert(null != credential_request_option_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/credential_request_option/CredentialRequestOptionTestData.json')

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
    ['credential_request_option01','credential_request_option02','credential_request_option03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_CREDENTIAL_REQUEST_OPTION_ENTID']
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
  
