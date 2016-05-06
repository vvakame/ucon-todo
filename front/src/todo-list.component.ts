import {Component, OnInit} from "angular2/core";

import {Todo} from "./model";
import {UserService} from "./user.service";
import {TodoService} from "./todo.service";

@Component({
    selector: 'todo-list',
    template: `
    <div *ngIf="!loggedIn">
        <a href="{{loginURL}}">Login</a>
    </div>
    
    <form (ngSubmit)="doSubmit()">
        <div>
            <label for="text">Text</label>
            <div>
                <input type="text" [(ngModel)]="data.text" placeholder="Buy milk" required>
            </div>
        </div>

        <div>
            <button
                type="submit"
                [disabled]="!data.text">
                Submit
            </button>
        </div>
    </form>

    <table>
        <thead>
            <tr>
                <th>Text</th>
                <th>Done</th>
                <th>Created at</th>
                <th>Check</th>
            </tr>
        </thead>
        <tbody *ngFor="#todo of todoList">
            <tr>
                <td>
                    {{todo.text}}
                </td>
                <td>
                    <span *ngIf="todo.done">✅</span>
                </td>
                <td>
                    {{todo.createdAt}}
                </td>
                <td>
                    <button (click)="done(todo)">Done</button>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    providers: [UserService, TodoService],
})
export class TodoListComponent implements OnInit {

    loggedIn: boolean;
    loginURL: string;
    logoutURL: string;

    todoList: Todo[];
    todoCursor: string;

    data: Todo;

    constructor(public userService: UserService, public todoService: TodoService) {
    }

    ngOnInit() {
        this.todoList = [];
        this.data = {};

        this.userService.welcome().subscribe(resp => {
            this.loggedIn = resp.loggedIn;
            this.loginURL = resp.loginURL;
            this.logoutURL = resp.logoutURL;

            this.fetchTodoList();
        });
    }

    fetchTodoList() {
        if (!this.loggedIn) {
            return;
        }

        this.todoService.list({ limit: 10, cursor: this.todoCursor }).subscribe(resp => {
            this.todoCursor = resp.cursor;
            this.todoList = resp.list;

            if (this.todoCursor) {
                this.fetchTodoList();
            }
        });
    }

    doSubmit() {
        this.todoService.insert(this.data)
            .subscribe(
            todo => {
                this.todoList.push(todo);
                this.data = {};
            },
            err => { }
            );
    }

    done(todo: Todo) {
        todo.done = true;
        this.todoService.update(todo)
            .subscribe(
            newTodo => {
                todo.updatedAt = newTodo.updatedAt;
                todo.done = newTodo.done;
            },
            err => { }
            );
    }
}
