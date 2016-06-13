import 'rxjs/Rx'; // load the full rxjs

import {Component, OnInit, ViewChild} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {MD_TOOLBAR_DIRECTIVES} from "@angular2-material/toolbar";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from "@angular2-material/sidenav";
import {MD_LIST_DIRECTIVES} from "@angular2-material/list";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";
import {MD_ICON_DIRECTIVES, MdIconRegistry} from "@angular2-material/icon";

import {Todo} from "./model";

import {UserService} from "./user.service";
import {TodoService} from "./todo.service";

import {TodoNewComponent} from "./todo-new.component";
import {TodoListComponent} from "./todo-list.component";

@Component({
    selector: "ucon-todo",
    styles: [`
        [md-fab] {
            position: absolute;
            right: 3%;
            top: 34px;
            z-index: 1;
        }
        .add-fab[disabled][disabled][md-fab] {
            background-color: rgba(220, 220, 220, 1);
        }
    `],
    template: `
        <md-sidenav-layout fullscreen>
            <md-sidenav #sidenav>
                <md-nav-list>
                    <a md-list-item *ngIf="!loggedIn && loginURL" href="{{loginURL}}">
                        <md-icon md-list-icon fontSet="fa" fontIcon="fa-sign-in"></md-icon>
                        <span md-line>Login</span>
                    </a>
                    <a md-list-item *ngIf="loggedIn && logoutURL" href="{{logoutURL}}">
                        <md-icon md-list-icon fontSet="fa" fontIcon="fa-sign-out"></md-icon>
                        <span md-line>Logout</span>
                    </a>
                    <a md-list-item href="https://github.com/vvakame/ucon-todo">
                        <md-icon md-list-icon fontSet="fa" fontIcon="fa-github-alt"></md-icon>
                        <span md-line>GitHub</span>
                    </a>
                </md-nav-list>
            </md-sidenav>

            <md-toolbar color="primary">
                <button md-icon-button (click)="sidenav.open()">
                    <md-icon>menu</md-icon>
                </button>

                Ucon TODO
                <button md-fab class="add-fab" [disabled]="!loggedIn" (click)="formShowing = !formShowing">
                    <md-icon>add</md-icon>
                </button>
            </md-toolbar>

            <div *ngIf="formShowing">
                <todo-new (added)="add($event)"></todo-new>
            </div>

            <div *ngIf="!formShowing && loggedIn">
                <todo-list #todoList></todo-list>
            </div>
        </md-sidenav-layout>
    `,
    directives: [
        ...ROUTER_DIRECTIVES,
        ...MD_TOOLBAR_DIRECTIVES,
        ...MD_BUTTON_DIRECTIVES,
        ...MD_SIDENAV_DIRECTIVES,
        ...MD_LIST_DIRECTIVES,
        ...MD_CARD_DIRECTIVES,
        ...MD_INPUT_DIRECTIVES,
        ...MD_ICON_DIRECTIVES,
        TodoNewComponent,
        TodoListComponent,
    ],
    providers: [
        MdIconRegistry,
        UserService,
        TodoService,
    ],
})
export class AppComponent implements OnInit {

    formShowing: boolean;

    loggedIn: boolean;
    loginURL: string;
    logoutURL: string;

    @ViewChild("sidenav") sidenavView: MdSidenav;
    @ViewChild("todoList") todoListView: TodoListComponent;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        this.userService.welcome().subscribe(resp => {
            this.loggedIn = resp.loggedIn;
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
