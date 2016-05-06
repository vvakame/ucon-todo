import "reflect-metadata";

require('zone.js/dist/zone'); // import "zone.js";

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";

import {AppComponent} from "./app.component";
import {environment} from "./environment";

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
]);
