

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


describe('CredentialCreationOptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.CredentialCreationOption()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'credential_creation_option.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attestation":{"a":true,"h":"Attestation","n":"attestation","r":false,"t":"`$STRING`","key$":"attestation","index$":0},"authenticatorSelection":{"a":true,"h":"Authenticator Selection","n":"authenticatorSelection","r":false,"t":"`$OBJECT`","key$":"authenticatorSelection","index$":1},"challenge":{"a":true,"fo":"base64url","h":"Challenge","n":"challenge","r":false,"t":"`$STRING`","key$":"challenge","index$":2},"pubKeyCredParams":{"a":true,"h":"Pub Key Cred Params","n":"pubKeyCredParams","r":false,"t":"`$ARRAY`","key$":"pubKeyCredParams","index$":3},"rp":{"a":true,"h":"Rp","n":"rp","r":false,"t":"`$OBJECT`","key$":"rp","index$":4},"timeout":{"a":true,"fo":"int64","h":"Timeout","n":"timeout","r":false,"t":"`$INTEGER`","key$":"timeout","index$":5},"user":{"a":true,"h":"User","n":"user","r":false,"t":"`$OBJECT`","key$":"user","index$":6}},"name":"credential_creation_option","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /webauthn/registration/initialize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/webauthn/registration/initialize","q":{},"r":{},"s":[{"lit":"webauthn"},{"lit":"registration"},{"lit":"initialize"}],"t":{"req":"`reqdata`","res":"`body.publicKey`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"credential_creation_option","name__orig":"credential_creation_option","Name":"CredentialCreationOption","name_":"credential_creation_option","name-":"credential-creation-option","NAME":"CREDENTIAL_CREATION_OPTION","index$":1}, {"active":true,"entity":"credential_creation_option","key$":"BasicCredentialCreationOptionFlow","kind":"basic","name":"BasicCredentialCreationOptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"credential_creation_option_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CredentialCreationOption', {"POST /webauthn/registration/initialize":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const credential_creation_option_ref01_ent = client.CredentialCreationOption()
    let credential_creation_option_ref01_data = setup.data.new.credential_creation_option['credential_creation_option_ref01']

    credential_creation_option_ref01_data = (await credential_creation_option_ref01_ent.create(credential_creation_option_ref01_data)).data()
    assert(null != credential_creation_option_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/credential_creation_option/CredentialCreationOptionTestData.json')

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
    ['credential_creation_option01','credential_creation_option02','credential_creation_option03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_CREDENTIAL_CREATION_OPTION_ENTID']
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
  
