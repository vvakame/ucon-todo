import {Observable} from "rxjs";

import { Injectable } from "angular2/core";
import {Http, Response, Headers, URLSearchParams} from "angular2/http";

import {Todo, TodoListResp} from "./model";

@Injectable()
export class TodoService {

    constructor(public http: Http) { }

    get(id: string): Observable<Todo> {
        return this.http.get(`/api/todo/${id}`).map((res: Response) => res.json() as Todo);
    }

    list(req: { limit?: number; offset?: number; cursor?: string } = { limit: 10 }): Observable<TodoListResp> {
        let params = new URLSearchParams();
        req = req || { limit: 10 };
        if (req.limit) {
            params.set("limit", `${req.limit}`);
        }
        if (req.offset) {
            params.set("offset", `${req.offset}`);
        }
        if (req.cursor) {
            params.set("cursor", `${req.cursor}`);
        }

        return this.http.get("/api/todo", { search: params }).map(res => res.json() as TodoListResp);
    }

    insert(todo: Todo): Observable<Todo> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(`/api/todo`, JSON.stringify(todo), { headers: headers })
            .map(res => res.json() as Todo);
    }

    update(todo: Todo): Observable<Todo> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.put(`/api/todo/${todo.id}`, JSON.stringify(todo), { headers: headers })
            .map(res => res.json() as Todo);
    }

    delete(todo: Todo): Observable<Todo> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.delete(`/api/todo/${todo.id}`).map(res => res.json() as Todo);
    }
}
