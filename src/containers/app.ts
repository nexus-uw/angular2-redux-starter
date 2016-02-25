import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {bindActionCreators} from 'redux';
import {PageOne} from '../components/page-one/page-one';
import {PageTwo} from '../components/page-two/page-two';
import {Landing} from '../components/landing/landing';
import {Final} from '../components/final/final';
import * as CounterActions from '../actions/counter';

@Component({
  selector: 'root'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>CURRENT STATE: {{currentState}}</div>
    <div style="border: 1px solid black">
      <router-outlet></router-outlet>
    </div>
  `
})
@RouteConfig([
  {path: '/landing', as: 'Landing', useAsDefault: true, component: Landing},
  {path: '/pageOne', as: 'PageOne', useAsDefault: false, component: PageOne},
  {path: '/pageTwo', as: 'PageTwo', useAsDefault: false, component: PageTwo},
  {path: '/final', as: 'Final', useAsDefault: false, component: Final}
  ])
export default class App implements OnDestroy, OnInit {
  public currentState: string;
  protected unsubscribe: Function;

  constructor( @Inject('ngRedux') private ngRedux, private router: Router) {
    router.subscribe((onNext) => this.currentState = onNext);
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      counter: state.counter
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
  }
}
