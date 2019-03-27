/**
 * Copyright (c) 2016 shogogg <shogo@studofly.net>
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
import { Deferred } from '../index'

describe('Deferred', () => {

  let deferred: Deferred<string>

  beforeEach(() => {
    deferred = new Deferred<string>()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be a function', () => {
    expect(typeof Deferred).toBe('function')
  })

  it('should returns Deferred instance when called with new', () => {
    expect(new Deferred()).toBeInstanceOf(Deferred)
  })

  describe('.resolve', () => {

    it('should be a function', () => {
      expect(typeof deferred.resolve).toBe('function')
    })

    it('should returns void', () => {
      expect(deferred.resolve()).toBe(undefined)
    })

    it('should resolve the promise using given value', async () => {
      deferred.resolve('Chai Maxx')
      expect(await deferred.promise).toBe('Chai Maxx')
    })

    it('should be bound to the Deferred instance', async () => {
      let resolve = deferred.resolve
      resolve('Chai Maxx ZERO')
      expect(await deferred.promise).toBe('Chai Maxx ZERO')
    })

    it('should be mock function when using jest.spyOn', () => {
      const mock = jest.spyOn(deferred, 'resolve')
      deferred.resolve('DECORATION')
      expect(mock).toBeCalledWith('DECORATION')
    })

  })

  describe('.reject', () => {

    it('should be a function', () => {
      expect(typeof deferred.reject).toBe('function')
    })

    it('should returns void', () => {
      deferred.promise.catch(() => {})
      expect(deferred.reject()).toBe(undefined)
    })

    it('should reject the promise with the reason', async () => {
      let reason: any
      try {
        deferred.reject('CONTRADICTION')
        await deferred.promise
      } catch (thrown) {
        reason = thrown
      }
      expect(reason).toBe('CONTRADICTION')
    })

    it('should be bound to the Deferred instance', async () => {
      let reason: any
      try {
        let reject = deferred.reject
        reject('Yum-Yum!')
        await deferred.promise
      } catch (thrown) {
        reason = thrown
      }
      expect(reason).toBe('Yum-Yum!')
    })

    it('should be mock function when using jest.spyOn', () => {
      const mock = jest.spyOn(deferred, 'reject')
      deferred.promise.catch(() => {})
      deferred.reject('GODSPEED')
      expect(mock).toBeCalledWith('GODSPEED')
    })

  })

  describe('.promise', () => {

    it('should be an instance of Promise', () => {
      expect(deferred.promise).toBeInstanceOf(Promise)
    })

    it('should be resolved with a value when `.resolve()` is called with the value', async () => {
      deferred.resolve('Momoiro Clover Z')
      await deferred.promise.then((value: string) => {
        expect(value).toBe('Momoiro Clover Z')
      })
    })

    it('should be rejected with a reason when `.reject()` is called with the reason', async () => {
      deferred.reject('Some Error')
      await deferred.promise.catch((reason: string) => {
        expect(reason).toBe('Some Error')
      })
    })

  })

})
