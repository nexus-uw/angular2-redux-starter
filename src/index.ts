import {Component, View, Inject, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';

import 'rxjs/add/operator/toPromise';


import {RandomService} from './services/random.service';
import configureStore from './store/configure-store';
import RandomActions from './actions/random';
import App from './containers/app';


const provider = require('ng2-redux').provider;
const store = configureStore();
declare let __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(App, [
  provider(store),
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  HTTP_PROVIDERS,
  RandomService,
  RandomActions
   ]);
