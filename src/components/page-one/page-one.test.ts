import 'reflect-metadata';
import {Router} from 'angular2/router';
import {provide} from 'angular2/core';
import {describe, expect, it, xit, inject, beforeEachProviders} from 'angular2/testing';
import {PageOne} from './page-one';

  class RouterMock {
    navigate(route) {
      return route;
    }
  }
  describe('Page1', () => {
    beforeEachProviders(() => [
      provide(Router, { useClass: RouterMock }),
      PageOne
    ]);
    it('should goto page two', inject([PageOne], (pageOne: PageOne) => {
      return pageOne.goToNextPage()
        .then((res) => chai.expect(res).to.equal('/PageTwo'));
    }));
  });
