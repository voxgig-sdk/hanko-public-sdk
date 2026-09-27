
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HankoPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HankoPublicSDK.test()
    equal(testsdk instanceof HankoPublicSDK, true,
      'HankoPublicSDK.test() must return a client synchronously')
  })

})
