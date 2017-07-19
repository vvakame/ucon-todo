import { Component, OnInit, ViewChild } from '@angular/core';

import { MdSidenav, MdIconRegistry } from '@angular/material';

import { Todo } from './model';

import { UserService } from './user.service';
import { TodoService } from './todo.service';

import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  formShowing: boolean;

  loggedIn: boolean;
  loginURL: string | undefined;
  logoutURL: string | undefined;

  @ViewChild('sidenav') sidenavView: MdSidenav;
  @ViewChild('todoList') todoListView: TodoListComponent;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.welcome().subscribe(resp => {
      this.loggedIn = !!resp.loggedIn;
      this.loginURL = resp.loginURL;
      this.logoutURL = resp.logoutURL;

      if (!resp.loggedIn) {
        this.sidenavView.open();
      }
    });
  }

  add(todo: Todo) {
    this.formShowing = false;
    // wait for *ngIf switching
    setTimeout(() => {
      this.todoListView.add(todo);
    }, 0);
  }
}
