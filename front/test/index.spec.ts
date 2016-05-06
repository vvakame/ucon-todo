import "reflect-metadata";

require("zone.js/dist/zone"); // import "zone.js";

// for PhantomJS
require("es6-shim");
(window as any).Symbol = (window as any).Symbol || {};

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import {BrowserDomAdapter} from "angular2/platform/browser";
import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from "angular2/platform/testing/browser";
import {setBaseTestProviders} from "angular2/testing";

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);
BrowserDomAdapter.makeCurrent();

import "./app.component.spec";
import "./todo.service.spec";
