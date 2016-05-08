import {Observable} from "rxjs";

import { Injectable } from "@angular/core";
import {Http, Response} from "@angular/http";

import {UserWelcomeResponse} from "./model";

@Injectable()
export class UserService {

    constructor(public http: Http) { }

    welcome(): Observable<UserWelcomeResponse> {
        return this.http.get(`/api/user/welcome`)
            .map((res: Response) => res.json());
    }
}
