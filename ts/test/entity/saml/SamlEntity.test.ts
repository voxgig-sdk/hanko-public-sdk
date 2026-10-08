

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


describe('SamlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.Saml()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'saml.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"saml","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /saml/callback","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/saml/callback","q":{"$action":"callback"},"r":{},"rb":{"fields":[{"name":"RelayState"},{"name":"SAMLResponse"}],"kind":"form","media":"application/x-www-form-urlencoded"},"s":[{"lit":"saml"},{"lit":"callback"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /saml/metadata","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cert_only","or":"cert_only","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/saml/metadata","q":{"$action":"metadata","exist":["domain"]},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/octet-stream"},"s":[{"lit":"saml"},{"lit":"metadata"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /saml/provider","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/saml/provider","q":{"$action":"provider","exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"saml"},{"lit":"provider"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"saml","name__orig":"saml","Name":"Saml","name_":"saml","name-":"saml","NAME":"SAML","index$":7}, {"active":true,"entity":"saml","key$":"BasicSamlFlow","kind":"basic","name":"BasicSamlFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"saml_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"ref":"saml_ref01","srcdatavar":"saml_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-saml_ref01"}}],"unreachable":true}]}, 'Saml', {"POST /saml/callback":{"protocol":"http","requestBody":{"description":"SAML Identity Provider Response","content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"RelayState":{"type":"string"},"SAMLResponse":{"type":"string"}}}}}},"parameters":[]},"GET /saml/metadata":{"protocol":"http","parameters":[{"name":"domain","in":"query","description":"Fully qualified domain name to which a SAML service provider is registered","required":true,"schema":{"type":"string"},"index$":0},{"name":"cert_only","in":"query","description":"Toggle to download the SAML service provider public certificate","schema":{"type":"boolean"},"index$":1}]},"GET /saml/provider":{"protocol":"http","parameters":[{"name":"domain","in":"query","description":"Fully qualified domain name for which a SAML service provider is registered","required":true,"schema":{"type":"string","format":"hostname"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const saml_ref01_ent = client.Saml()
    let saml_ref01_data = setup.data.new.saml['saml_ref01']

    saml_ref01_data = (await saml_ref01_ent.create(saml_ref01_data)).data()
    assert(null != saml_ref01_data)


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
      '../../../../.sdk/test/entity/saml/SamlTestData.json')

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
    ['saml01','saml02','saml03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_SAML_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_SAML_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_SAML_ENTID']
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
  
