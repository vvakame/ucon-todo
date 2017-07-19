import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  @Input() data: Todo;

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
  }


  notYet() {
    this._changeState(false);
  }

  done() {
    this._changeState(true);
  }

  /** @internal */
  _changeState(done: boolean) {
    this.data.done = done;
    this.todoService.update(this.data)
      .subscribe(
      newTodo => {
        this.data.updatedAt = newTodo.updatedAt;
        this.data.done = newTodo.done;
      },
      _err => { }
      );
  }
}
