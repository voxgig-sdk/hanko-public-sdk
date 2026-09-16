

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HANKO_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('HANKO_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HankoPublicSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HANKO_PUBLIC_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Time of creation of the the user","type":"`$STRING`","index$":0},{"active":true,"format":"email","name":"email","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"The email address of the user","type":"`$STRING`","index$":1},{"active":true,"format":"uuid4","name":"email_id","req":false,"short":"The ID of the newly created email address","type":"`$STRING`","index$":2},{"active":true,"name":"emails","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"family_name","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"given_name","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"has_webauthn_credential","req":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"deprecated":true,"format":"uuid4","name":"id","req":false,"short":"The ID of the user.","type":"`$STRING`","index$":7},{"active":true,"name":"metadata","req":false,"short":"The public and unsafe metadata of a user","type":"`$OBJECT`","index$":8},{"active":true,"name":"mfa_config","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"passkeys","req":false,"type":"`$ARRAY`","index$":11},{"active":true,"format":"uri","name":"picture","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"security_keys","req":false,"type":"`$ARRAY`","index$":13},{"active":true,"format":"date-time","name":"updated_at","req":false,"short":"Time of last update of the user","type":"`$STRING`","index$":14},{"active":true,"name":"user_id","req":false,"short":"The ID of the user","type":"`$STRING`","index$":15},{"active":true,"name":"username","req":false,"short":"The username of the user","type":"`$STRING`","index$":16},{"active":true,"name":"verified","req":false,"type":"`$BOOLEAN`","index$":17},{"active":true,"name":"webauthn_credentials","req":false,"short":"A list of WebAuthn credentials","type":"`$ARRAY`","index$":18}],"id":{"field":"id","name":"id"},"name":"user","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /user","json":"{\"operationId\":\"getUserId\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email_id\":{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"},\"has_webauthn_credential\":{\"type\":\"boolean\"},\"id\":{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"},\"verified\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"User\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":404,\"message\":\"Not found\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Not Found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/user","segments":[{"lit":"user"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /users","json":"{\"operationId\":\"createUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"}},\"required\":[\"email\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the newly created email address\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the newly created user\"}},\"type\":\"object\"}}},\"description\":\"Details about the created user\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"code\":403,\"message\":\"Forbidden\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"409\":{\"content\":{\"application/json\":{\"example\":{\"code\":409,\"message\":\"Conflict\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Conflict\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/users","segments":[{"lit":"users"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c","kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /users/{id}","json":"{\"operationId\":\"listUser\",\"parameters\":[{\"description\":\"ID of the user\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"created_at\":{\"description\":\"Time of creation of the the user\",\"format\":\"date-time\",\"type\":\"string\"},\"emails\":{\"example\":[{\"address\":\"john.doe@example.com\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"is_primary\":false,\"is_verified\":true}],\"items\":{\"properties\":{\"address\":{\"description\":\"The email address\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the email address\"},\"identities\":{\"allOf\":[{\"description\":\"The user's third party connections/identities.\",\"items\":{\"description\":\"Representation of a user's third party connection/identity.\",\"properties\":{\"id\":{\"description\":\"The ID of the user at the provider\",\"type\":\"string\"},\"identity_id\":{\"description\":\"The identity's ID\",\"format\":\"uuid4\",\"type\":\"string\"},\"provider\":{\"description\":\"Contains the display name of the provider, if available. Otherwise contains the provider ID.\\n\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},{\"deprecated\":true},{\"description\":\"Deprecated, use `user.identities` instead.\"}]},\"identity\":{\"allOf\":[{\"description\":\"Representation of a user's third party connection/identity.\",\"properties\":{\"id\":{\"description\":\"The ID of the user at the provider\",\"type\":\"string\"},\"identity_id\":{\"description\":\"The identity's ID\",\"format\":\"uuid4\",\"type\":\"string\"},\"provider\":{\"description\":\"Contains the display name of the provider, if available. Otherwise contains the provider ID.\\n\",\"type\":\"string\"}},\"type\":\"object\"},{\"deprecated\":true},{\"description\":\"Deprecated, use `user.identities` instead.\"}]},\"is_primary\":{\"description\":\"Indicates it's the primary email address.\",\"type\":\"boolean\"},\"is_verified\":{\"description\":\"Indicated the email has been verified.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"family_name\":{\"type\":\"string\"},\"given_name\":{\"type\":\"string\"},\"id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"deprecated\":true,\"description\":\"The ID of the user. Deprecated, use `user_id` instead.\"},\"metadata\":{\"description\":\"The public and unsafe metadata of a user\",\"properties\":{\"public_metadata\":{\"additionalProperties\":true,\"example\":{\"role\":\"admin\"},\"type\":\"object\"},\"unsafe_metadata\":{\"additionalProperties\":true,\"example\":{\"birthday\":\"2025-05-12\"},\"type\":\"object\"}},\"type\":\"object\"},\"mfa_config\":{\"properties\":{\"auth_app_set_up\":{\"type\":\"boolean\"},\"security_key_enabled\":{\"type\":\"boolean\"},\"totp_enabled\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"passkeys\":{\"example\":[{\"aaguid\":\"01020304-0506-0708-0102-030405060708\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":true,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":false,\"name\":\"iCloud\",\"public_key\":\"pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...\",\"transports\":[\"internal\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"picture\":{\"format\":\"uri\",\"type\":\"string\"},\"security_keys\":{\"example\":[{\"aaguid\":\"90636e1f-ef82-43bf-bdcf-5255f139d12f\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":false,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"f826013e-e7e3-4366-a6d8-9359effc8cdd\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":true,\"name\":\"Yubikey Bio\",\"public_key\":\"aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...\",\"transports\":[\"usb\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"updated_at\":{\"description\":\"Time of last update of the user\",\"format\":\"date-time\",\"type\":\"string\"},\"user_id\":{\"allOf\":[{\"example\":\"c339547d-e17d-4ba7-8a1d-b3d5a4d17c1c\",\"format\":\"uuid4\",\"type\":\"string\"}],\"description\":\"The ID of the user\"}},\"type\":\"object\"},{\"properties\":{\"email\":{\"description\":\"The email address of the user\",\"format\":\"email\",\"type\":\"string\"},\"username\":{\"description\":\"The username of the user\",\"type\":\"string\"},\"webauthn_credentials\":{\"description\":\"A list of WebAuthn credentials\",\"example\":[{\"aaguid\":\"01020304-0506-0708-0102-030405060708\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":true,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"5333cc5b-c7c4-48cf-8248-9c184ac72b65\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":false,\"name\":\"iCloud\",\"public_key\":\"pQECYyagASFYIBblARCP_at3cmprjzQN1lJ...\",\"transports\":[\"internal\"]},{\"aaguid\":\"90636e1f-ef82-43bf-bdcf-5255f139d12f\",\"attestation_type\":\"packed\",\"backup_eligible\":true,\"backup_state\":false,\"created_at\":\"2026-02-24T21:40:36.26936Z\",\"id\":\"f826013e-e7e3-4366-a6d8-9359effc8cdd\",\"last_used_at\":\"2026-02-24T21:40:36.26936Z\",\"mfa_only\":true,\"name\":\"Yubikey Bio\",\"public_key\":\"aNMEEyadASFYIBblARCP_at3cmp4gg3zQN1lJ...\",\"transports\":[\"usb\"]}],\"items\":{\"properties\":{\"aaguid\":{\"format\":\"uuid\",\"type\":\"string\"},\"attestation_type\":{\"enum\":[\"none\",\"packed\",\"tpm\",\"android-key\",\"android-safetynet\",\"fido-u2f\",\"apple\"],\"type\":\"string\"},\"backup_eligible\":{\"type\":\"boolean\"},\"backup_state\":{\"type\":\"boolean\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"last_used_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"mfa_only\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"public-key\":{\"type\":\"string\"},\"transports\":{\"items\":{\"enum\":[\"ble\",\"internal\",\"nfc\",\"usb\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}],\"type\":\"object\"}}},\"description\":\"Details for a user retrieved by ID\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":400,\"message\":\"Bad Request\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"code\":403,\"message\":\"Forbidden\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":404,\"message\":\"Not found\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Not Found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/{id}","segments":[{"lit":"users"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{},"contract":{"id":"DELETE /user","json":"{\"operationId\":\"deleteUser\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"The user has been deleted\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"message\":\"Unauthorized\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":500,\"message\":\"Internal Server Error\"},\"schema\":{\"properties\":{\"code\":{\"format\":\"int32\",\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"CookieAuth\":[]},{\"BearerTokenAuth\":[]}],\"securitySchemes\":{\"BearerTokenAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"},\"CookieAuth\":{\"in\":\"cookie\",\"name\":\"hanko\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/user","segments":[{"lit":"user"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":15}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"user_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_dt0"},"match":{"id":"user01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"user_ref01","suffix":"_rm0"},"match":{},"op":"remove","spec":[],"valid":[],"index$":2}]}, 'User')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_ref01_ent = client.User()
    let user_ref01_data = setup.data.new.user['user_ref01']

    user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data()
    assert(null != user_ref01_data.id)


    // LOAD
    const user_ref01_match_dt0: any = {}
    user_ref01_match_dt0.id = user_ref01_data.id
    const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data()
    assert(user_ref01_data_dt0.id === user_ref01_data.id)


    // REMOVE
    const user_ref01_match_rm0: any = { id: user_ref01_data.id }
    await user_ref01_ent.remove(user_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HANKO_PUBLIC_TEST_USER_ENTID': idmap,
    'HANKO_PUBLIC_TEST_LIVE': 'FALSE',
    'HANKO_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'HANKO_PUBLIC_APIKEY': '',
    'HANKO_PUBLIC_SERVER_TENANT_ID': "",
  })

  idmap = env['HANKO_PUBLIC_TEST_USER_ENTID']

  const live = 'TRUE' === env.HANKO_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HANKO_PUBLIC_TEST_USER_ENTID']
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
  
