import {
Component,
View,
Inject
} from 'angular2/core';
import {Http, RequestOptionsArgs, URLSearchParams} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';

//import {bindActionCreators} from 'redux';

import RandomActions from '../../actions/random';


@Component({
  selector: 'pageTwo',
  directives: [FORM_DIRECTIVES],
  template: `
  <h2> PAGE 2</h2>
  <form [ngFormModel]="group" (ngSubmit)="onSubmit()" novalidate>
    <div>
      <label for="random">Your random value:</label>
      <input type="text" id="text" [ngFormControl]="group.find('random')" [(ngModel)]="random">

      <ul *ngIf="group.find('random').dirty && !group.find('random').valid">
        <li *ngIf="group.hasError('required', 'random')">A random is required</li>
        <li *ngIf="group.hasError('minlength', 'random')">A random value needs to have at least 8 characterss</li>

      </ul>
    </div>

    <p> Current Random Number {{combinedSeed}}</p>

    <button type="submit" [disabled]="!group.valid || calculatingPassword">Register</button>

  </form>
  `
})
export class PageTwo {
  public calculatingPassword: boolean;
  public newValue: number;
  private group: ControlGroup;
  protected unsubscribe: Function;
  protected makeRandomNumberMoreRandom : Function;
  private apiRandomNumber: number;
protected getPassword: Function;
  constructor(private params: RouteParams,
   private builder: FormBuilder,
   private router: Router,
   private RandomActions: RandomActions,
    @Inject('ngRedux') private ngRedux) {


    // this.newValue = parseInt(params.get('seed'), 10) * Math.random();

    this.group = builder.group({ random : [
      '',
      Validators.compose([Validators.required, Validators.minLength(4)])
    ]});

    this.group.find('random').valueChanges.subscribe((value: string) => {
      this.makeRandomNumberMoreRandom(value);
      this.getPassword();
    });
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);

      if (!this.apiRandomNumber) {
        return this.router.navigate(['/PageOne']);
      }
  }
  mapStateToThis (state) {
    return {
      apiRandomNumber : state.random.apiRandomNumber,
      combinedSeed : state.random.combinedSeed,
      calculatingPassword: state.random.calculatingPassword
    };
  }
  mapDispatchToThis = (dispatch) => {
    return {
      makeRandomNumberMoreRandom : (value) => {
        dispatch(this.RandomActions.makeRandomNumberMoreRandom(this.apiRandomNumber, value));
      },
      getPassword : () => {
        this.RandomActions.getPassword(this.apiRandomNumber, dispatch);
      }
    };
  }

  public onSubmit() {

    return this.router.navigate(['/Final']);
  }
}
