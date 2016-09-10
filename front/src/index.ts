import "reflect-metadata";

import 'zone.js/dist/zone'; // import "zone.js";

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";
import { environment } from "./environment";

if (environment.production) {
    enableProdMode();
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
