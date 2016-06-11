import {Component, OnInit, Output, EventEmitter} from "@angular/core";

import {MD_TOOLBAR_DIRECTIVES} from "@angular2-material/toolbar";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";

import {Todo} from "./model";
import {UserService} from "./user.service";
import {TodoService} from "./todo.service";

@Component({
    selector: 'todo-new',
    styles: [`
        md-input {
            width: 100%;
        }
    `],
    template: `
    <md-card>
        <md-card-title>
            Add your TODO
        </md-card-title>
        <md-card-content>
            <form (ngSubmit)="doSubmit()">
                <md-input [(ngModel)]="data.text" placeholder="What plan do you have?" required>
                </md-input>

                <md-card-actions align="end">
                    <button md-raised-button
                        color="accent"
                        type="submit"
                        [disabled]="!data.text">
                        Submit
                    </button>
                </md-card-actions>
            </form>
        </md-card-content>
    </md-card>
    `,
    directives: [
        ...MD_TOOLBAR_DIRECTIVES,
        ...MD_BUTTON_DIRECTIVES,
        ...MD_CARD_DIRECTIVES,
        ...MD_INPUT_DIRECTIVES,
    ],
    providers: [UserService, TodoService],
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
            err => { }
            );
    }
}
