import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from "@angular/core/testing";

import {HTTP_PROVIDERS} from "@angular/http";

import {UserService} from "../src/user.service";
import { AppComponent } from "../src/app.component";

beforeEachProviders(() => [
    ...HTTP_PROVIDERS,
    UserService,
    AppComponent,
]);

describe('AppComponent', () => {
    it('should create the AppComponent',
        inject([AppComponent], (app: AppComponent) => {
            expect(app).toBeTruthy();
        }));
});
