import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

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
