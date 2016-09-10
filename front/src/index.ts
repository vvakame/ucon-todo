import "reflect-metadata";

require('zone.js/dist/zone'); // import "zone.js";

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from "@angular/http";

import {APP_ROUTER_PROVIDER} from "./router";
import {AppComponent} from "./app.component";
import {environment} from "./environment";

if (environment.production) {
    enableProdMode();
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDER,
])
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
