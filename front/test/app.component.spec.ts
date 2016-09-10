import { TestBed } from "@angular/core/testing";

import { AppComponent } from "../src/app.component";

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
        });
    });

    it('should create the AppComponent', () => {
        return TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance).not.toBeNull();
        });
    });
});
