

import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from  'angular2/http';

export interface IRandomService {
  getRandomApiNumber: () => Promise<number>;
  makeRandomNumberMoreRandom: (number, string) => number;
  getPassword: (number) => Promise<string>;
}
@Injectable()
export class RandomService implements IRandomService {
  constructor(private _http: Http) { }

  public getRandomApiNumber() {
    const BASE = 10;
    const searchParams = new URLSearchParams();
    searchParams.set('num', '1');
    searchParams.set('base', '10');
    searchParams.set('format', 'plain');
    searchParams.set('min', '1');
    searchParams.set('max', '100000000');
    searchParams.set('col', '1');

    return this._http.get('https://www.random.org/integers/', { search: searchParams })
      .toPromise()
      .then((res) => parseInt(res.text(), 10));

  }


  public makeRandomNumberMoreRandom(seed: number, inputText: string) {
    return seed
      * Math.random()
      * parseInt(inputText ? inputText.toLowerCase() : Math.random().toString(), 32);
  }

  public getPassword(seed: number) {
    const searchParams = new URLSearchParams()
    searchParams.set('num', '5');
    searchParams.set('format', 'plain');
    searchParams.set('len', '4');
    searchParams.set('unique', 'on');
    searchParams.set('upperalpha', 'on');
    searchParams.set('loweralpha', 'on');
    searchParams.set('digits', 'on');
    searchParams.set('rnd', seed.toString());
    searchParams.set('col', '1');

    return this._http.get('https://www.random.org/strings/', { search: searchParams })
      .toPromise()
      .then((val) => val.text().replace('\n', '').replace(' ', ''));
  }
}
