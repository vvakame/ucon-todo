import { Component, OnInit } from '@angular/core';

import { Todo } from '../model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];
  todoCursor: string;

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.todoList = [];

    this.fetchTodoList();
  }

  fetchTodoList() {
    this.todoService.list({ limit: 10, cursor: this.todoCursor }).subscribe(resp => {
      this.todoCursor = resp.cursor || '';
      this.todoList = resp.list || [];

      if (this.todoCursor) {
        this.fetchTodoList();
      }
    });
  }

  add(todo: Todo) {
    this.todoList.push(todo);
  }
}
