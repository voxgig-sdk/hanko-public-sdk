

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


describe('CredentialEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Credential()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'credential.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"aaguid","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"attestation_type","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"backup_eligible","req":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"name":"backup_state","req":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"uuid","name":"id","req":false,"type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"last_used_at","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"mfa_only","req":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"publickey","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"transports","req":false,"type":"`$ARRAY`","index$":10}],"id":{"field":"id","name":"id"},"name":"credential","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /webauthn/credentials","json":"{\"operationId\":\"listCredentials\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A list of WebAuthn credentials\",\"example\":[{\"aaguid\":\"01020304-0506-0708-0102-030405060708\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":true,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":false,\"name\":\"iCloud\",\"public_key\":\"pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...\",\"transports\":[\"internal\"]},{\"aaguid\":\"90636e1f-ef82-43bf-bdcf-5255f139d12f\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":false,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"f826013e-e7e3-4366-a6d8-9359effc8cdd\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":true,\"name\":\"Yubikey Bio\",\"public_key\":\"aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...\",\"transports\":[\"usb\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"A list of WebAuthn credentials assigned to the current user\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/webauthn/credentials","segments":[{"lit":"webauthn"},{"lit":"credentials"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"credential","name__orig":"credential","Name":"Credential","name_":"credential","name-":"credential","NAME":"CREDENTIAL","index$":1}, {"active":true,"entity":"credential","key$":"BasicCredentialFlow","kind":"basic","name":"BasicCredentialFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"credential_ref01"}}],"index$":0}]}, 'Credential')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let credential_ref01_data = Object.values(setup.data.existing.credential)[0] as any

    // LIST
    const credential_ref01_ent = client.Credential()
    const credential_ref01_match: any = {}

    const credential_ref01_list = (await credential_ref01_ent.list(credential_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/credential/CredentialTestData.json')

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
    ['credential01','credential02','credential03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_CREDENTIAL_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_CREDENTIAL_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_CREDENTIAL_ENTID']
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
  
