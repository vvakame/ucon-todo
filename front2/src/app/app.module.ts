import 'rxjs/add/operator/map';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoNewComponent } from './todo-new/todo-new.component';

import { UserService } from './user.service';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    TodoNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    MaterialModule,
  ],
  providers: [
    UserService,
    TodoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
