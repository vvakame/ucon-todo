import "reflect-metadata";

import "zone.js/dist/zone"; // import "zone.js";
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';

// for PhantomJS
import "es6-shim";
(window as any).Symbol = (window as any).Symbol || {};

import 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);

import "./app.component.spec";
import "./todo.service.spec";
import "./user.service.spec";
