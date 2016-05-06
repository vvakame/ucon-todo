import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from "angular2/testing";

import { AppComponent } from '../src/app.component';

beforeEachProviders(() => [AppComponent]);

describe('AppComponent', () => {
    it('should create the AppComponent',
        inject([AppComponent], (app: AppComponent) => {
            expect(app).toBeTruthy();
        }));
});
