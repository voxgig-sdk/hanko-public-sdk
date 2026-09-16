

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"third_party","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"code","orig":"code","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"error","orig":"error","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"error_description","orig":"error_description","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"state","orig":"state","reqd":true,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /thirdparty/callback","json":"{\"operationId\":\"thirdPartyCallback\",\"parameters\":[{\"description\":\"The authorization code that can be exchanged for an access token and to retrieve user provider data\\n\",\"in\":\"query\",\"name\":\"code\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The state\",\"in\":\"query\",\"name\":\"state\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"An error returned from the third party provider\\n\",\"in\":\"query\",\"name\":\"error\",\"schema\":{\"type\":\"string\"}},{\"description\":\"The description of the error that occurred (if any)\",\"in\":\"query\",\"name\":\"error_description\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"307\":{\"description\":\"Redirect to requested redirect URL or to configured site redirect URL\",\"headers\":{\"Location\":{\"description\":\"Redirect to the URL requested via `redirect_to` query parameter during third party\\nprovider login via [`/auth`](#tag/Third-Party/operation/thirdPartyAuth) endpoint on success. On error,\\nredirect to the `third_party.error_redirect_url` set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config).\\nError details are provided in the location URL in the form of `error` and `error_description`\\nquery params.\\n\",\"schema\":{\"type\":\"string\"}},\"Set-Cookie\":{\"description\":\"Present only on successful callback. Contains the JSON Web Token (JWT) that must be provided to protected endpoints.\\nCookie attributes (e.g. domain) can be set via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.cookie`.\\n\",\"schema\":{\"description\":\"Value `<JWT>` is a [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)\",\"example\":\"hanko=<JWT>; Path=/; HttpOnly\",\"type\":\"string\"}},\"X-Auth-Token\":{\"description\":\"Present only on successful callback and when enabled via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"schema\":{\"description\":\"Enable via [configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config) option `session.enable_auth_token_header`\\nfor purposes of cross-domain communication between client and Hanko API.\\n\",\"externalDocs\":{\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config\"},\"format\":\"JWT\",\"type\":\"string\"}}}}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/thirdparty/callback","segments":[{"lit":"thirdparty"},{"lit":"callback"}],"select":{"exist":["code","error","error_description","state"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"provider","orig":"provider","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"redirect_to","orig":"redirect_to","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /thirdparty/auth","json":"{\"operationId\":\"thirdPartyAuth\",\"parameters\":[{\"description\":\"The name of the third party provider to log in with. Only providers enabled in the\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nvia the `thirdparty.providers` option can be used. Requesting an unsupported provider results in a\\nredirect with error details in the location query.\\n\",\"in\":\"query\",\"name\":\"provider\",\"required\":true,\"schema\":{\"enum\":[\"google\",\"github\"],\"type\":\"string\"}},{\"description\":\"Base64url encoded string representing the URL the\\n[`/callback`](#tag/Third-Party/operation/thirdPartyCallback) eventually redirects to after successful login\\nwith the third party provider. It must match one of the allowed redirect URLs set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config)\\nthrough the `third_party.allowed_redirect_urls`.\\n\",\"in\":\"query\",\"name\":\"redirect_to\",\"required\":true,\"schema\":{\"format\":\"base64url\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"307\":{\"description\":\"Redirect to third party provider\",\"headers\":{\"Location\":{\"description\":\"Redirect to the third party provider on success. On error, redirects to the `Referer`. If `Referer` is\\nnot present, redirects to the `third_party.error_redirect_url` set in the backend\\n[configuration](https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md#hanko-backend-config).\\nError details are provided in the location URL in the form of `error` and `error_description`\\nquery params.\\n\",\"schema\":{\"type\":\"string\"}}}}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/thirdparty/auth","segments":[{"lit":"thirdparty"},{"lit":"auth"}],"select":{"exist":["provider","redirect_to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"third_party","name__orig":"third_party","Name":"ThirdParty","name_":"third_party","name-":"third-party","NAME":"THIRD_PARTY","index$":13}, {"active":true,"entity":"third_party","key$":"BasicThirdPartyFlow","kind":"basic","name":"BasicThirdPartyFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"third_party_ref01","srcdatavar":"third_party_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-third_party_ref01"}}],"index$":0}]}, 'ThirdParty')
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
  
