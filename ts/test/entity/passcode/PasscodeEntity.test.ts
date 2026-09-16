

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


describe('PasscodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Passcode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'passcode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"The actual passcode from the email sent to the user during initialization, a string of 6 decimal digits","type":"`$STRING`","index$":0},{"active":true,"name":"email_id","req":false,"short":"The ID of the email address","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"The ID of the passcode","type":"`$STRING`","index$":2},{"active":true,"name":"user_id","req":true,"short":"The ID of the user","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"passcode","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /passcode/login/finalize","json":"{\"operationId\":\"passcodeFinal\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"The actual passcode from the email sent to the user during initialization,\\na string of 6 decimal digits\\n\",\"example\":\"897481\",\"maxLength\":6,\"minLength\":6,\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the passcode\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Representation of a passcode\",\"properties\":{\"created_at\":{\"description\":\"Time of creation of the passcode\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the passcode\"},\"ttl\":{\"description\":\"Lifespan of a passcode in seconds\",\"example\":300,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful passcode login finalization\",\"headers\":{\"Set-Cookie\":{\"description\":\"Contains the JSON Web Token (JWT) that must be provided to protected endpoints.\\nCookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\\n\",\"schema\":{\"description\":\"Value `<JWT>` is a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)\",\"example\":\"hanko=<JWT>; Path=/; HttpOnly\",\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"schema\":{\"description\":\"Enable via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"externalDocs\":{\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config\"},\"format\":\"JWT\",\"type\":\"string\"}},\"X-Session-Lifetime\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"schema\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"type\":\"number\"}}}},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"code\":403,\"message\":\"Forbidden\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"408\":{\"content\":{\"application/json\":{\"example\":{\"code\":408,\"message\":\"Request Timeout\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Request Timeout\"},\"410\":{\"content\":{\"application/json\":{\"example\":{\"code\":410,\"message\":\"Gone\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Gone\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/passcode/login/finalize","segments":[{"lit":"passcode"},{"lit":"login"},{"lit":"finalize"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.id`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /passcode/login/initialize","json":"{\"operationId\":\"passcodeInit\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the email address\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user\"}},\"required\":[\"user_id\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Representation of a passcode\",\"properties\":{\"created_at\":{\"description\":\"Time of creation of the passcode\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the passcode\"},\"ttl\":{\"description\":\"Lifespan of a passcode in seconds\",\"example\":300,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful passcode login initialization\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/passcode/login/initialize","segments":[{"lit":"passcode"},{"lit":"login"},{"lit":"initialize"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.id`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"passcode","name__orig":"passcode","Name":"Passcode","name_":"passcode","name-":"passcode","NAME":"PASSCODE","index$":8}, {"active":true,"entity":"passcode","key$":"BasicPasscodeFlow","kind":"basic","name":"BasicPasscodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"passcode_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Passcode')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const passcode_ref01_ent = client.Passcode()
    let passcode_ref01_data = setup.data.new.passcode['passcode_ref01']

    passcode_ref01_data = (await passcode_ref01_ent.create(passcode_ref01_data)).data()
    assert(null != passcode_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/passcode/PasscodeTestData.json')

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
    ['passcode01','passcode02','passcode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_PASSCODE_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_PASSCODE_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_PASSCODE_ENTID']
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
  
