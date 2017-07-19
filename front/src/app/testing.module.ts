import 'rxjs/add/operator/map';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from './material.module';

import { UserService } from './user.service';
import { TodoService } from './todo.service';

@NgModule({
  imports: [
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    RouterTestingModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    RouterTestingModule,
  ],
  providers: [
    MockBackend,
    { provide: XHRBackend, useExisting: MockBackend },

    UserService,
    TodoService,
  ],
})
export class BaseTestingModule {
}
