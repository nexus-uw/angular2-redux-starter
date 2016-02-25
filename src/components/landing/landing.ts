import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
  selector: 'landing'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <h1> Welcome the world's greatest angular 2 app </h1>
  <h6> it will show off how absoluting awesome everything is</h6>
  <a [routerLink]="['PageOne']"> go to page 1</a>
  `
})
export class Landing {
}
