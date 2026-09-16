

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"allowCredentials","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"format":"base64url","name":"challenge","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"rpId","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"int64","name":"timeout","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"userVerification","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"user_id","req":false,"short":"The ID of the user on whose behalf WebAuthn login should be performed","type":"`$STRING`","index$":5}],"name":"credential_request_option","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /webauthn/login/initialize","json":"{\"operationId\":\"webauthnLoginInit\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user on whose behalf WebAuthn login should be performed\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"disco\":{\"summary\":\"Discoverable credentials\",\"value\":{\"challenge\":\"qgOI+0KpGnl9NOqaT6dfsYvi96R87LgpErnvePeOgSU=\",\"rpId\":\"localhost\",\"timeout\":60000,\"userVerification\":\"required\"}},\"non-disco\":{\"summary\":\"Non-Discoverable credentials\",\"value\":{\"publicKey\":{\"allowCredentials\":[{\"id\":\"Mepptysj5ZZrTlg0qiLbsZ068OtQMeGVAikVy2n1hvvG...\",\"type\":\"public-key\"}],\"challenge\":\"qgOI+0KpGnl9NOqaT6dfsYvi96R87LgpErnvePeOgSU=\",\"rpId\":\"localhost\",\"timeout\":60000,\"userVerification\":\"required\"}}}},\"schema\":{\"description\":\"Options for assertion generation with the WebAuthn API\",\"externalDocs\":{\"url\":\"https://www.w3.org/TR/webauthn-2/#dictionary-assertion-options\"},\"properties\":{\"publicKey\":{\"properties\":{\"allowCredentials\":{\"items\":{\"properties\":{\"id\":{\"example\":\"Mepptysj5ZZrTlg0qiLbsZ068OtQMeGVAikVy2n1hvvG...\",\"format\":\"base64url\",\"type\":\"string\"},\"type\":{\"enum\":[\"public-key\"],\"example\":\"public-key\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"challenge\":{\"example\":\"qgOI+0KpGnl9NOqaT6dfsYvi96R87LgpErnvePeOgSU=\",\"format\":\"base64url\",\"type\":\"string\"},\"rpId\":{\"example\":\"localhost\",\"type\":\"string\"},\"timeout\":{\"example\":60000,\"format\":\"int64\",\"type\":\"integer\"},\"userVerification\":{\"enum\":[\"required\",\"preferred\",\"discouraged\"],\"example\":\"required\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful initialization\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/webauthn/login/initialize","segments":[{"lit":"webauthn"},{"lit":"login"},{"lit":"initialize"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.publicKey`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"credential_request_option","name__orig":"credential_request_option","Name":"CredentialRequestOption","name_":"credential_request_option","name-":"credential-request-option","NAME":"CREDENTIAL_REQUEST_OPTION","index$":3}, {"active":true,"entity":"credential_request_option","key$":"BasicCredentialRequestOptionFlow","kind":"basic","name":"BasicCredentialRequestOptionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"credential_request_option_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'CredentialRequestOption')
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
  
