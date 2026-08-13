
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { HankoPublicSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('WebAuthnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.WebAuthn()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'update', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'web_authn.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const web_authn_ref01_ent = client.WebAuthn()
    let web_authn_ref01_data = setup.data.new.web_authn['web_authn_ref01']

    web_authn_ref01_data = (await web_authn_ref01_ent.create(web_authn_ref01_data)).data()
    assert(null != web_authn_ref01_data.id)


    // UPDATE
    const web_authn_ref01_data_up0: any = {}
    web_authn_ref01_data_up0.id = web_authn_ref01_data.id

    const web_authn_ref01_markdef_up0 = { name: 'name', value: 'Mark01-web_authn_ref01_' + setup.now }
    ;(web_authn_ref01_data_up0 as any)[web_authn_ref01_markdef_up0.name] = web_authn_ref01_markdef_up0.value

    const web_authn_ref01_resdata_up0 = (await web_authn_ref01_ent.update(web_authn_ref01_data_up0)).data()
    assert(web_authn_ref01_resdata_up0.id === web_authn_ref01_data_up0.id)

    assert((web_authn_ref01_resdata_up0 as any)[web_authn_ref01_markdef_up0.name] === web_authn_ref01_markdef_up0.value)


    // REMOVE
    const web_authn_ref01_match_rm0: any = { id: web_authn_ref01_data.id }
    await web_authn_ref01_ent.remove(web_authn_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/web_authn/WebAuthnTestData.json')

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
    ['web_authn01','web_authn02','web_authn03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': 'NONE',
  })

  idmap = env['HANKO_PUBLIC_TEST_WEB_AUTHN_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  if (live) {
    client = new HankoPublicSDK(merge([
      {
        apikey: env.HANKO_PUBLIC_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
