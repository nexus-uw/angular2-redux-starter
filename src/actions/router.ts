import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

export const SET_API_RANDOM_NUMER = 'SET_API_RANDOM_NUMER';


// why store url state in redux? allows to later inject middleware
// to controll going b/w pages
@Injectable()
export default class RouterActions {
  constructor(private router: Router) {

  }

  public getPassword(seed: number, dispatch: Function) {
  }
}

