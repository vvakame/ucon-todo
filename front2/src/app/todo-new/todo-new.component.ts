import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Todo } from '../model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.css']
})
export class TodoNewComponent implements OnInit {

  data: Todo;

  @Output() added = new EventEmitter<Todo>();

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.data = {};
  }

  doSubmit() {
    this.todoService.insert(this.data)
      .subscribe(
      todo => {
        this.added.emit(todo);
        this.data = {};
      },
      _err => { }
      );
  }
}
