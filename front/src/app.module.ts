import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
// import { RouterModule } from "@angular/router";

import { MdCoreModule } from "@angular2-material/core";
import { MdButtonModule } from "@angular2-material/button";
import { MdCardModule } from "@angular2-material/card";
import { MdIconModule } from "@angular2-material/icon";
import { MdInputModule } from "@angular2-material/input";
import { MdListModule } from "@angular2-material/list";
import { MdSidenavModule } from "@angular2-material/sidenav";
import { MdToolbarModule } from "@angular2-material/toolbar";

// import { appRoutes } from "./router";
import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo.component";
import { TodoNewComponent } from "./todo-new.component";
import { TodoListComponent } from "./todo-list.component";
import { UserService } from "./user.service";
import { TodoService } from "./todo.service";

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent, TodoNewComponent, TodoListComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        // RouterModule.forRoot(appRoutes),
        MdCoreModule, MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdListModule, MdSidenavModule, MdToolbarModule,
    ],
    providers: [
        UserService,
        TodoService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [AppComponent],
})
export class AppModule { }
