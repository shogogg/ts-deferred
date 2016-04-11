/**
 * Copyright (c) 2016 shogogg <shogo@studofly.net>
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
import * as assert from "power-assert";
import {Deferred} from "../deferred";

describe('Deferred', () => {

  let deferred: Deferred<string>;

  beforeEach(() => {
    deferred = new Deferred<string>();
  });

  it('should be a function', () => {
    assert(typeof Deferred === 'function');
  });

  it('should returns Deferred instance when called with new', () => {
    assert(new Deferred() instanceof Deferred);
  });

  describe('.resolve', () => {

    it('should be a function', () => {
      assert(typeof deferred.resolve === 'function');
    });

    it('should returns void', () => {
      assert(deferred.resolve() === undefined);
    });

    it('should resolve the promise using given value', () => {
      deferred.resolve('Chai Maxx');
      return deferred.promise.then((value: string) => {
        assert(value === 'Chai Maxx');
      });
    });

  });

  describe('.reject', () => {

    it('should be a function', () => {
      assert(typeof deferred.reject === 'function');
    });

    it('should returns void', () => {
      assert(deferred.reject() === undefined);
    });

    it('should reject the promise with the reason', () => {
      deferred.reject('CONTRADICTION');
      return deferred.promise.catch((reason: string) => {
        assert(reason === 'CONTRADICTION');
      });
    });

  });

  describe('.promise', () => {

    it('should be an instance of Promise', () => {
      assert(deferred.promise instanceof Promise);
    });

    it('should be resolved with a value when `.resolve()` is called with the value', () => {
      deferred.resolve('Momoiro Clover Z');
      return deferred.promise.then((value: string) => {
        assert(value === 'Momoiro Clover Z');
      });
    });

    it('should be rejected with a reason when `.reject()` is called with the reason', () => {
      deferred.reject('Some Error');
      return deferred.promise.catch((reason: string) => {
        assert(reason, 'Some Error');
      });
    });

  });

});
