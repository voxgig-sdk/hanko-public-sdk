

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


describe('OrganizationManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.OrganizationManagement()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HankoPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrganizationManagement().create({"organization_id":1,"roles":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_management.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"has_role":{"a":true,"h":"Has Role","n":"has_role","r":true,"t":"`$BOOLEAN`","key$":"has_role","index$":0},"organization_id":{"a":true,"fo":"uuid4","h":"Organization Id","n":"organization_id","r":true,"sh":"The ID of the organization to check","t":"`$STRING`","key$":"organization_id","index$":1},"roles":{"a":true,"h":"Roles","n":"roles","r":true,"sh":"IDs or slugs of roles to check for.","t":"`$ARRAY`","key$":"roles","index$":2}},"name":"organization_management","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["organization_id","roles"],"co":{"id":"POST /organizations/roles/check","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/organizations/roles/check","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"organizations"},{"lit":"roles"},{"lit":"check"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"organization_management","name__orig":"organization_management","Name":"OrganizationManagement","name_":"organization_management","name-":"organization-management","NAME":"ORGANIZATION_MANAGEMENT","index$":1}, {"active":true,"entity":"organization_management","key$":"BasicOrganizationManagementFlow","kind":"basic","name":"BasicOrganizationManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_management_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'OrganizationManagement', {"POST /organizations/roles/check":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"organization_id":{"description":"The ID of the organization to check","allOf":[{"type":"string","format":"uuid4","example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","x-ref":"#/components/schemas/UUID4"}],"key$":"organization_id"},"roles":{"description":"IDs or slugs of roles to check for. The check succeeds if the user holds at least one\nof the listed roles (OR semantics).\n","type":"array","items":{"type":"string"},"minItems":1,"key$":"roles"}},"required":["organization_id","roles"],"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_management_ref01_ent = client.OrganizationManagement()
    let organization_management_ref01_data = setup.data.new.organization_management['organization_management_ref01']

    organization_management_ref01_data = (await organization_management_ref01_ent.create(organization_management_ref01_data)).data()
    assert(null != organization_management_ref01_data)


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
      '../../../../.sdk/test/entity/organization_management/OrganizationManagementTestData.json')

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
    ['organization_management01','organization_management02','organization_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_ORGANIZATION_MANAGEMENT_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_ORGANIZATION_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_ORGANIZATION_MANAGEMENT_ENTID']
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
  
