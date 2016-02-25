import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Http, RequestOptionsArgs, URLSearchParams} from 'angular2/http';
import {Router} from 'angular2/router';
import {bindActionCreators} from 'redux';

import {setAPIRandomNumber} from '../../actions/random';
@Component({
  selector: 'pageOne'
})

@View({
  template: `
  <div>
    <h2>PAGE ONE</h2>
    <button (click)="getRandomApiNumber()">Get A random Number</button>
    <p *ngIf="apiRandomNumber" >our random number: {{apiRandomNumber}}</p>
    <p *ngIf="apiError" style="color:red"> error: {{apiError}}</p>
    <button [disabled]="!apiRandomNumber || apiError"  (click)="goToNextPage()">goToNextPage</button>
  </div>
  `
})
export class PageOne {
  public apiRandomNumber: number;
  protected unsubscribe: Function;
  protected setAPIRandomNumber: Function;
  public apiError:any;
  /**
   * @param  {Http} privatehttp
   * @param  {Router} privaterouter
   */
  constructor(private http: Http, private router: Router, @Inject('ngRedux') private ngRedux) {
  }

  ngOnInit() {

    this.unsubscribe = this.ngRedux.connect(
      null,
      this.mapDispatchToThis)(this);
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators({ setAPIRandomNumber: setAPIRandomNumber }, dispatch);
  }


  /**
   */
  public getRandomApiNumber() {
    const BASE = 10;
    const searchParams = new URLSearchParams();
    searchParams.set('num', '1');
    searchParams.set('base', BASE.toString());
    searchParams.set('format', 'plain');
    searchParams.set('min', '1');
    searchParams.set('max', '100000000');
    searchParams.set('col', '1');

    this.http.get('https://www.random.org/integers/', { search: searchParams })
      .subscribe(
      (data) => {this.apiRandomNumber = parseInt(data.text(), BASE); this.apiError = null; },
      (err) => console.error('API ERROR', err)
      );
  }

  /**
   */
  public goToNextPage() {
    this.setAPIRandomNumber(this.apiRandomNumber);
    return this.router.navigate(['/PageTwo']);
  };
}
