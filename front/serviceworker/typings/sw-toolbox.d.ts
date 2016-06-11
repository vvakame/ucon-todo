declare module "sw-toolbox" {
    export * from "sw-toolbox/lib/strategies";
    import * as _router from "sw-toolbox/lib/router";
    import * as _options from "sw-toolbox/lib/options";

    export var router: typeof _router;
    export var options: typeof _options;
    export function cache(url: any, options: any): any;
    export function uncache(url: any, options: any): any;
    export function precache(items: any): void;
}

declare module "sw-toolbox/lib/strategies" {
    interface Strategy {
        (request: any, values: any, options: any): Promise<any>;
    }

    var networkOnly: Strategy;
    var networkFirst: Strategy;
    var cacheOnly: Strategy;
    var cacheFirst: Strategy;
    var fastest: Strategy;
}

declare module "sw-toolbox/lib/route" {
    import {Strategy} from "sw-toolbox/lib/strategies";

    class Route {
        keys: { name: string; }[];
        regexp: RegExp;
        method: string;
        options: any;
        handler: Strategy;

        constructor(method: string, path: string | RegExp, handler: any, options?: any)
        makeHandler(url: string): Strategy;
    }
    namespace Route { }

    export = Route;
}

declare module "sw-toolbox/lib/router" {
    import {Strategy} from "sw-toolbox/lib/strategies";
    import * as Route from "sw-toolbox/lib/route";

    class Router {
        routers: Map<string | typeof RegExp, Map<string, Map<string, Route>>>;
        default: any;

        get(path: string | RegExp, handler: any, options?: any): void;
        post(path: string | RegExp, handler: any, options?: any): void;
        put(path: string | RegExp, handler: any, options?: any): void;
        delete(path: string | RegExp, handler: any, options?: any): void;
        head(path: string | RegExp, handler: any, options?: any): void;
        any(path: string | RegExp, handler: any, options?: any): void;

        add(method: string, path: string | RegExp, handler: any, options?: any): void;

        matchMethod(method: string, url: string): Strategy;
        match(request: any, url: string): Strategy;
    }

    var _: Router;
    export = _;
}

declare module "sw-toolbox/lib/options" {
    var cache: {
        name: string;
        maxAgeSeconds: number;
        maxEntries: number;
    };
    var debug: boolean;
    var networkTimeoutSeconds: number;
    var preCacheItems: any[];
    var successResponses: RegExp;
}
