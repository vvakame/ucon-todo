import {Component, OnInit} from "@angular/core";

import {Todo} from "./model";
import {UserService} from "./user.service";
import {TodoService} from "./todo.service";

import {TodoComponent} from "./todo.component";
import {TodoNewComponent} from "./todo-new.component";

@Component({
    selector: 'todo-list',
    styles: [`
        .card-container {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 8px;
        }

        todo {
            width: 100%;
            padding: 8px 8px 0px 8px;
        }
    `],
    template: `
    <div class="card-container">
        <todo
            *ngFor="let todo of todoList"
            [data]="todo">
        </todo>
    </div>
    `,
    directives: [
        TodoComponent,
        TodoNewComponent,
    ],
    providers: [UserService, TodoService],
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
            this.todoCursor = resp.cursor;
            this.todoList = resp.list;

            if (this.todoCursor) {
                this.fetchTodoList();
            }
        });
    }

    add(todo: Todo) {
        this.todoList.push(todo);
    }
}
