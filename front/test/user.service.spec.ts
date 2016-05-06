import {
    describe,
    expect,
    beforeEach,
    it,
} from "angular2/testing";

import {provide, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {UserService} from "../src/user.service";

describe("UserService", () => {
    let injector: Injector;
    let mockBackend: MockBackend;
    let backend: MockBackend;
    let httpService: Http;
    let service: UserService;

    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            HTTP_PROVIDERS,
            MockBackend,
            provide(XHRBackend, { useClass: MockBackend }),
            UserService
        ]);

        mockBackend = injector.get(MockBackend);
        backend = injector.get(XHRBackend);
        httpService = injector.get(Http);
        service = injector.get(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should fetch user data", () => {
        backend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    loggedIn: true,
                    loginURL: "/_ah/login",
                    logoutURL: "/_ah/logout",
                }
            })));
        });

        service.welcome().subscribe(resp => {
            expect(resp.loggedIn).toBeTruthy();
        });
    });
});
