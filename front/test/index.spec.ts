import "reflect-metadata";

require("zone.js/dist/zone"); // import "zone.js";

// for PhantomJS
require("es6-shim");
(window as any).Symbol = (window as any).Symbol || {};

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from "@angular/platform-browser/testing";
import {setBaseTestProviders} from "@angular/core/testing";

setBaseTestProviders(TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS);

import "./app.component.spec";
import "./todo.service.spec";
