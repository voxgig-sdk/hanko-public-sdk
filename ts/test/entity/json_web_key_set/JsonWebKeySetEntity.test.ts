

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


describe('JsonWebKeySetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.JsonWebKeySet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'json_web_key_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"alg","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"base64url","name":"e","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"kid","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"kty","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"base64url","name":"n","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"use","req":false,"type":"`$STRING`","index$":5}],"name":"json_web_key_set","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /.well-known/jwks.json","json":"{\"operationId\":\"getJwks\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 5\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-5\"},\"properties\":{\"keys\":{\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 5.1\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-5.1\"},\"items\":{\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK)\",\"url\":\"https://datatracker.ietf.org/doc/html/rfc7517\"},\"properties\":{\"alg\":{\"example\":\"RS256\",\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 4.4\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-4.4\"},\"type\":\"string\"},\"e\":{\"example\":\"AQAB\",\"externalDocs\":{\"description\":\"RFC7518 - JSON Web Algorithms (JWA) - Section 6.3.1.2\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2\"},\"format\":\"base64url\",\"type\":\"string\"},\"kid\":{\"example\":\"d6ff37d7-e3d1-4432-ab80-b64faf55ae36\",\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 4.5\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-4.5\"},\"type\":\"string\"},\"kty\":{\"example\":\"RSA\",\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 4.1\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-4.1\"},\"type\":\"string\"},\"n\":{\"example\":\"vPFRUCRoxN3RygdJHR3S5BV-DDLw6n-7oUXtX0nr7Twl...\",\"externalDocs\":{\"description\":\"RFC7518 - JSON Web Algorithms (JWA) - Section 6.3.1.1\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.1\"},\"format\":\"base64url\",\"type\":\"string\"},\"use\":{\"example\":\"sig\",\"externalDocs\":{\"description\":\"RFC7517 - JSON Web Key (JWK) - Section 4.2\",\"url\":\"https://www.rfc-editor.org/rfc/rfc7517#section-4.2\"},\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"JSON Web Key Set\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/.well-known/jwks.json","segments":[{"lit":".well-known"},{"lit":"jwks.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.keys`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"json_web_key_set","name__orig":"json_web_key_set","Name":"JsonWebKeySet","name_":"json_web_key_set","name-":"json-web-key-set","NAME":"JSON_WEB_KEY_SET","index$":7}, {"active":true,"entity":"json_web_key_set","key$":"BasicJsonWebKeySetFlow","kind":"basic","name":"BasicJsonWebKeySetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"json_web_key_set_ref01"}}],"index$":0}]}, 'JsonWebKeySet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let json_web_key_set_ref01_data = Object.values(setup.data.existing.json_web_key_set)[0] as any

    // LIST
    const json_web_key_set_ref01_ent = client.JsonWebKeySet()
    const json_web_key_set_ref01_match: any = {}

    const json_web_key_set_ref01_list = (await json_web_key_set_ref01_ent.list(json_web_key_set_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/json_web_key_set/JsonWebKeySetTestData.json')

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
    ['json_web_key_set01','json_web_key_set02','json_web_key_set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_JSON_WEB_KEY_SET_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_JSON_WEB_KEY_SET_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_JSON_WEB_KEY_SET_ENTID']
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
  
