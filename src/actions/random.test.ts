import 'reflect-metadata';

import {mockStore} from '../tests.helpers';
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './counter';
import RandomActions from './random';
import {RandomService} from '../services/Random.Service';

import {describe, expect, it, xit, inject, beforeEachProviders} from 'angular2/testing';

import {provide} from 'angular2/core';


describe('random actions', () => {
  class RandomServiceMock {
    setApiNumber(){}
    getRandomApiNumber(){}
    makeRandomNumberMoreRandom(){}
    getPassword(){}
  }
   beforeEachProviders(() => [
      provide(RandomService, { useClass: RandomServiceMock }),
      RandomActions
    ]);
  it('should fuckingwork', inject([RandomActions], (randomActions: RandomActions ) => {
    console.log('not fucked');
    chai.expect(randomActions.setApiNumber(11).apiRandomNumber).to.equal(11)
  }))
})
