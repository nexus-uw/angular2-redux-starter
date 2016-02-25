import {Http, URLSearchParams, BaseRequestOptions} from 'angular2/http';

export const SET_API_RANDOM_NUMER = 'SET_API_RANDOM_NUMER';
export const GET_RANDOM_ARI_NUMBER = 'GET_RANDOM_ARI_NUMER';
export const SET_COMBINED_RANDOM_SEED = 'SET_COMBINED_RANDOM_SEED';
export const REQ_PASSWORD_TEXT = 'REQ_PASSWORD_TEXT';
export const API_RANDOM_NUMBER_ERROR = 'API_RANDOM_NUMBER_ERROR';


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


export function setAPIRandomNumber(apiRandomNumber: number) {
  return {
    type: SET_API_RANDOM_NUMER,
    apiRandomNumber: apiRandomNumber
  };
}

export function failedToSetAPIRandomNumber(error: any) {
  return {
    type: API_RANDOM_NUMBER_ERROR,
    error
  };
}

export function setCombinedRandomSeed(combinedSeed: number) {
  return {
    type: SET_COMBINED_RANDOM_SEED,
    combinedSeed: combinedSeed
  };
}

export function getRandomApiNumber() {
  // make API call and then set result
  return dispatch => {

  };
}
