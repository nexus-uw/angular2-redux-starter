import {Component, View, Inject, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import configureStore from './store/configure-store';
import App from './containers/app';

const provider = require('ng2-redux').provider;
const store = configureStore();
declare let __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
}

bootstrap(App, [ provider(store), ROUTER_PROVIDERS,
 provide(LocationStrategy, {useClass: HashLocationStrategy}),HTTP_PROVIDERS ]);
