

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


describe('HankoConfigurationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.HankoConfiguration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'hanko_configuration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"account","req":false,"short":"Controls the behavior regarding user account.","type":"`$OBJECT`","index$":0},{"active":true,"name":"emails","req":false,"short":"Controls the behavior regarding email addresses.","type":"`$OBJECT`","index$":1},{"active":true,"name":"password","req":false,"short":"Configuration options concerning passwords","type":"`$OBJECT`","index$":2}],"name":"hanko_configuration","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /.well-known/config","json":"{\"operationId\":\"getConfig\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Public backend configuration options\",\"externalDocs\":{\"description\":\"Hanko Configuration\",\"url\":\"https://github.com/teamhanko/hanko/blob/main/backend/docs/Config.md\"},\"properties\":{\"account\":{\"description\":\"Controls the behavior regarding user account.\",\"properties\":{\"allow_deletion\":{\"description\":\"Indicates the user account can be deleted by the current user.\",\"type\":\"boolean\"},\"allow_signup\":{\"description\":\"Indicates users are able to create new accounts.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"emails\":{\"description\":\"Controls the behavior regarding email addresses.\",\"properties\":{\"require_verification\":{\"description\":\"Require email verification after account registration and prevent signing in with unverified email addresses. Also, email addresses can only be marked as primary when they have been verified before.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"password\":{\"description\":\"Configuration options concerning passwords\",\"properties\":{\"enabled\":{\"description\":\"Indicates whether passwords are enabled or not\",\"type\":\"boolean\"},\"min_password_length\":{\"description\":\"Describes the minimum password length\",\"example\":8,\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Hanko configuration\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/.well-known/config","segments":[{"lit":".well-known"},{"lit":"config"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"hanko_configuration","name__orig":"hanko_configuration","Name":"HankoConfiguration","name_":"hanko_configuration","name-":"hanko-configuration","NAME":"HANKO_CONFIGURATION","index$":6}, {"active":true,"entity":"hanko_configuration","key$":"BasicHankoConfigurationFlow","kind":"basic","name":"BasicHankoConfigurationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"hanko_configuration_ref01","srcdatavar":"hanko_configuration_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-hanko_configuration_ref01"}}],"index$":0}]}, 'HankoConfiguration')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let hanko_configuration_ref01_data = Object.values(setup.data.existing.hanko_configuration)[0] as any

    // LOAD
    const hanko_configuration_ref01_ent = client.HankoConfiguration()
    const hanko_configuration_ref01_match_dt0: any = {}
    const hanko_configuration_ref01_data_dt0 = (await hanko_configuration_ref01_ent.load(hanko_configuration_ref01_match_dt0)).data()
    assert(null != hanko_configuration_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/hanko_configuration/HankoConfigurationTestData.json')

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
    ['hanko_configuration01','hanko_configuration02','hanko_configuration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_HANKO_CONFIGURATION_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_HANKO_CONFIGURATION_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_HANKO_CONFIGURATION_ENTID']
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
  
