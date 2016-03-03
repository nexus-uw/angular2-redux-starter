import {Injectable} from 'angular2/core';

import {Http, URLSearchParams, BaseRequestOptions} from 'angular2/http';
import {RandomService} from '../services/random.service';



export const SET_API_RANDOM_NUMER = 'SET_API_RANDOM_NUMER';
export const GET_RANDOM_ARI_NUMBER = 'GET_RANDOM_ARI_NUMER';
export const SET_COMBINED_RANDOM_SEED = 'SET_COMBINED_RANDOM_SEED';
export const REQ_PASSWORD_TEXT = 'REQ_PASSWORD_TEXT';
export const API_RANDOM_NUMBER_ERROR = 'API_RANDOM_NUMBER_ERROR';
export const SET_PASSWORD = 'SET_PASSWORD';
export const START_CALCULATING_PASSWORD = 'START_CALCULATING_PASSWORD';


// import {MockBackend} from 'angular2/http/testing';
// var injector = Injector.resolveAndCreate([
//   BaseRequestOptions,
//   MockBackend,
//   provide(Http, {useFactory:
//       function(backend, defaultOptions) {
//         return new Http(backend, defaultOptions);
//       },
//       deps: [MockBackend, BaseRequestOptions]})
// ]);
// var http = injector.get(Http);
@Injectable()
export  default class RandomActions {
  constructor(private randomAPI: RandomService) {

  }
  public setApiNumber(x: number) {
    return {
      type: SET_API_RANDOM_NUMER,
      apiRandomNumber: x
    };
  }

  public getRandomApiNumber(dispatch: Function) {
    this.randomAPI.getRandomApiNumber()
      .then((num) => dispatch(setAPIRandomNumber(num)))
      .catch((err) => dispatch(failedToSetAPIRandomNumber(err)))
  }

  public makeRandomNumberMoreRandom(seed: number, text: string) {
    return setCombinedRandomSeed(this.randomAPI.makeRandomNumberMoreRandom(seed, text));
  }

  public getPassword(seed: number, dispatch: Function) {
    dispatch(startCalculatingPassword());
    this.randomAPI.getPassword(seed)
      .then((pass) => dispatch(setPassword(pass)))
      .catch((err) => dispatch(failedToSetAPIRandomNumber(err)))
  }
}

function setAPIRandomNumber(apiRandomNumber: number) {
  return {
    type: SET_API_RANDOM_NUMER,
    apiRandomNumber: apiRandomNumber
  };
}

function failedToSetAPIRandomNumber(error: any) {
  return {
    type: API_RANDOM_NUMBER_ERROR,
    error
  };
}

function setCombinedRandomSeed(combinedSeed: number) {
  return {
    type: SET_COMBINED_RANDOM_SEED,
    combinedSeed: combinedSeed
  };
}

function startCalculatingPassword(){
  return {
    type: START_CALCULATING_PASSWORD
  }
}

function setPassword(password: string) {
  return {
    type: SET_PASSWORD,
    password
  };
}
