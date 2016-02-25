import {
Component,
View,
Inject
} from 'angular2/core';
import {Http, RequestOptionsArgs, URLSearchParams} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';

import {bindActionCreators} from 'redux';

import {setCombinedRandomSeed} from '../../actions/random';


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

    <p> Current Random Number {{newValue}}</p>

    <button type="submit" [disabled]="!group.valid">Register</button>

  </form>
  `
})
export class PageTwo {
  public loading: boolean;
  public newValue: number;
  private group: ControlGroup;
  protected unsubscribe: Function;
  protected setCombinedRandomSeed : Function;
  private apiRandomNumber: number;

  constructor(private params: RouteParams,
   builder: FormBuilder,
   private router: Router,
    @Inject('ngRedux') private ngRedux) {


    // this.newValue = parseInt(params.get('seed'), 10) * Math.random();

    this.group = builder.group({ random : [
      '',
      Validators.compose([Validators.required, Validators.minLength(4)])
    ]});

    this.group.find('random').valueChanges.subscribe((value: string) => {
      this.newValue = this.apiRandomNumber
      * Math.random()
      * parseInt(value ? value.toLowerCase() : Math.random().toString(), 32);
    });
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);

      if (!this.apiRandomNumber) {
        console.debug('SHould goback to first page to get rando number')
        return this.router.navigate(['/PageOne']);
      }
  }
  mapStateToThis (state) {
    return {
      apiRandomNumber : state.random.apiRandomNumber
    };
  }
  mapDispatchToThis(dispatch) {
    return bindActionCreators({
      setCombinedRandomSeed : setCombinedRandomSeed
     }, dispatch);
  }

  public onSubmit() {
    this.setCombinedRandomSeed(this.group.find('random').value);
    return this.router.navigate(['/Final']);
  }
}
