import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import RandomActions from '../../actions/random';
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
  public apiError: string;
  /**
   * @param  {Http} privatehttp
   * @param  {Router} privaterouter
   */
  constructor(private router: Router, @Inject('ngRedux') private ngRedux, private RandomActions: RandomActions) {
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  private mapStateToThis (state) {
    return {
      apiRandomNumber : state.random.apiRandomNumber
    };
  };

  // needs to be an arrow function so that 'this' is the PageOne Class
  private mapDispatchToThis = (dispatch: Function) => {
    // dont use redux magic bind for async actions
    return {getRandomApiNumber : () => this.RandomActions.getRandomApiNumber(dispatch)};
  };

  /**
   */
  public goToNextPage() {
    return this.router.navigate(['/PageTwo']);
  };
}
