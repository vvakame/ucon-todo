import {
    describe,
    expect,
    beforeEach,
    it,
} from "angular2/testing";

import {provide, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {TodoService} from "../src/todo.service";

describe("TodoService", () => {
    let injector: Injector;
    let mockBackend: MockBackend;
    let backend: MockBackend;
    let httpService: Http;
    let service: TodoService;

    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            HTTP_PROVIDERS,
            MockBackend,
            provide(XHRBackend, { useClass: MockBackend }),
            TodoService
        ]);

        mockBackend = injector.get(MockBackend);
        backend = injector.get(XHRBackend);
        httpService = injector.get(Http);
        service = injector.get(TodoService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should fetch todo data", () => {
        backend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    list: [
                        { "text": "Buy milk" },
                        { "text": "Pay tax" },
                    ],
                    cursor: "2"
                }
            })));
        });

        service.list({ limit: 5 }).subscribe(resp => {
            expect(resp.list[0].text).toBe("Buy milk");
            expect(resp.list[1].text).toBe("Pay tax");

            expect(resp.cursor).toBe("2");
        });
    });
});
