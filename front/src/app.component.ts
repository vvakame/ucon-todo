import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

import 'rxjs/Rx'; // load the full rxjs

import {TodoListComponent} from "./todo-list.component";

@Component({
    selector: 'ucon-todo',
    template: `
        <h1>ucon todo</h1>

        <main>
            <todo-list></todo-list>
        </main>
    `,
    directives: [ROUTER_DIRECTIVES, TodoListComponent],
})
export class AppComponent {
}
