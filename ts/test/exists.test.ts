
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HankoPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HankoPublicSDK.test()
    equal(null !== testsdk, true)
  })

})
