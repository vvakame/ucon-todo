declare namespace sw {
    interface ServiceWorkerContainer {
        register(scriptURL: string, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
        getRegistration(clientURL?: string): Promise<ServiceWorkerRegistration>;
        getRegistrations(): Promise<ServiceWorkerRegistration[]>;
    }

    interface RegistrationOptions {
        scope: string;
    }

    interface ServiceWorkerRegistration extends EventTarget {
        scope: string;
        update(): void;
        unregister(): Promise<boolean>;
    }

    interface ServiceWorkerGlobalScope {
        clients: any;
        registration: ServiceWorkerRegistration;

        addEventListener(type: "install", listener: (ev: ExtendableEvent) => any, useCapture?: boolean): void;
        addEventListener(type: "activate", listener: (ev: ExtendableEvent) => any, useCapture?: boolean): void;
        addEventListener(type: "fetch", listener: (ev: FetchEvent) => any, useCapture?: boolean): void;
        addEventListener(type: "message", listener: (ev: ExtendableMessageEvent) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;

        skipWaiting(): Promise<void>;
    }

    interface ExtendableEvent extends Event {
        waitUntil(f: Promise<any>): void;
    }

    interface FetchEvent extends ExtendableEvent {
        request: Request;
        client: any;
        isReload: boolean;
        respondWith(r: Response | Promise<Response>): void;
    }

    interface ExtendableMessageEvent extends Event {
        any: any;
        origin: string;
        lastEventId: string;
        source: any;
        ports: any[];
    }

    interface CacheStorage {
        match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response>;
        has(cacheName: string): Promise<boolean>;
        open(cacheName: string): Promise<Cache>;
        delete(cacheName: string): Promise<boolean>;
        keys(): Promise<string[]>;
    }

    interface CacheQueryOptions {
        ignoreSearch?: boolean;
        ignoreMethod?: boolean;
        ignoreVary?: boolean;
        cacheName: string;
    }

    interface Cache {
        match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response>;
        matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<Response[]>;
        add(request: RequestInfo): Promise<void>;
        addAll(requests: RequestInfo[]): Promise<void>;
        put(request: RequestInfo, response: Response): Promise<void>;
        delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
        keys(request?: RequestInfo, options?: CacheQueryOptions): Promise<Request[]>;
    }
}

// declare var self: sw.ServiceWorkerGlobalScope;
interface Window extends sw.ServiceWorkerGlobalScope {
    addEventListener(type: "install", listener: (ev: sw.ExtendableEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: sw.ExtendableEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "fetch", listener: (ev: sw.FetchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: sw.ExtendableMessageEvent) => any, useCapture?: boolean): void;
}
interface Navigator {
    serviceWorker: sw.ServiceWorkerContainer;
}
declare var caches: sw.CacheStorage;
