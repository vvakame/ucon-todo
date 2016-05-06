import {Observable} from "rxjs";

import { Injectable } from "angular2/core";
import {Http, Response} from "angular2/http";

import {UserWelcomeResponse} from "./model";

@Injectable()
export class UserService {

    constructor(public http: Http) { }

    welcome(): Observable<UserWelcomeResponse> {
        return this.http.get(`/api/user/welcome`)
            .map((res: Response) => res.json());
    }
}
