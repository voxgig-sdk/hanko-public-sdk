

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


describe('PasswordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Password()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'password.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"password","req":true,"short":"The actual password, its `minLength` defaults to 8 but can be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) through the `password.min_password_length` option.","type":"`$STRING`","index$":0},{"active":true,"name":"user_id","req":true,"short":"The ID of the user to create/set a password for","type":"`$STRING`","index$":1}],"name":"password","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /password/login","json":"{\"operationId\":\"passwordLogin\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"password\":{\"description\":\"The actual password, its `minLength` defaults to 8 but\\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nthrough the `password.min_password_length` option.\\n\",\"example\":\"9UnCBEx924a45P7p\",\"maxLength\":72,\"minLength\":8,\"type\":\"string\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user to perform a password login for\"}},\"required\":[\"user_id\",\"password\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"description\":\"Successful password login\",\"headers\":{\"Set-Cookie\":{\"description\":\"Contains the JSON Web Token (JWT) that must be provided to protected endpoints.\\nCookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\\n\",\"schema\":{\"description\":\"Value `<JWT>` is a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)\",\"example\":\"hanko=<JWT>; Path=/; HttpOnly\",\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"schema\":{\"description\":\"Enable via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"externalDocs\":{\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config\"},\"format\":\"JWT\",\"type\":\"string\"}},\"X-Session-Lifetime\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"schema\":{\"description\":\"Contains the seconds until the session expires.\\n\",\"type\":\"number\"}}}},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":404,\"message\":\"Not found\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Not Found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/password/login","segments":[{"lit":"password"},{"lit":"login"}],"select":{"$action":"login"},"transform":{"req":{"password":"`reqdata`"},"res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{},"contract":{"id":"PUT /password","json":"{\"operationId\":\"password\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"password\":{\"description\":\"The actual password, its `minLength` defaults to 8 but\\ncan be [configured](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nthrough the `password.min_password_length` option.\\n\",\"example\":\"9UnCBEx924a45P7p\",\"maxLength\":72,\"minLength\":8,\"type\":\"string\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user to create/set a password for\"}},\"required\":[\"user_id\",\"password\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"description\":\"Successful password update\"},\"201\":{\"description\":\"Successful password creation\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"code\":403,\"message\":\"Forbidden\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":404,\"message\":\"Not found\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Not Found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/password","segments":[{"lit":"password"}],"select":{},"transform":{"req":{"password":"`reqdata`"},"res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"password","name__orig":"password","Name":"Password","name_":"password","name-":"password","NAME":"PASSWORD","index$":9}, {"active":true,"entity":"password","key$":"BasicPasswordFlow","kind":"basic","name":"BasicPasswordFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"password_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"password_ref01","srcdatavar":"password_ref01_data","suffix":"_up0","textfield":"password"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-password_ref01"}}],"valid":[],"index$":1}]}, 'Password')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const password_ref01_ent = client.Password()
    let password_ref01_data = setup.data.new.password['password_ref01']

    password_ref01_data = (await password_ref01_ent.create(password_ref01_data)).data()
    assert(null != password_ref01_data)


    // UPDATE
    const password_ref01_data_up0: any = {}

    const password_ref01_markdef_up0 = { name: 'password', value: 'Mark01-password_ref01_' + setup.now }
    ;(password_ref01_data_up0 as any)[password_ref01_markdef_up0.name] = password_ref01_markdef_up0.value

    const password_ref01_resdata_up0 = (await password_ref01_ent.update(password_ref01_data_up0)).data()
    assert(null != password_ref01_resdata_up0)

    assert((password_ref01_resdata_up0 as any)[password_ref01_markdef_up0.name] === password_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/password/PasswordTestData.json')

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
    ['password01','password02','password03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_PASSWORD_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_PASSWORD_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_PASSWORD_ENTID']
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
  
