import {Component, Input} from "@angular/core";

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

import {Todo} from "./model";
import {TodoService} from "./todo.service";

@Component({
    selector: 'todo',
    template: `
        <md-card>
            <md-card-title-group>
                <md-card-title>
                    <span *ngIf="data.done">✅</span>
                    {{data.text}}
                </md-card-title>
                <md-card-subtitle>{{data.createdAt}}</md-card-subtitle>
            </md-card-title-group>

            <button md-button (click)="notYet()">NOT YET</button>
            <button md-button (click)="done()">DONE</button>
        </md-card>
    `,
    directives: [
        ...MD_CARD_DIRECTIVES,
        ...MD_BUTTON_DIRECTIVES,
    ],
})
export class TodoComponent {

    @Input() data: Todo;

    constructor(public todoService: TodoService) {
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
            err => { }
            );
    }
}
