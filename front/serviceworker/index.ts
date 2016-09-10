import * as toolbox from "sw-toolbox";

import * as cnst from "./const.generated";

toolbox.options.debug = true;
toolbox.options.cache.name = `ucon@${cnst.version}`;

toolbox.precache(cnst.staticFiles);
cnst.staticFiles.forEach(file => toolbox.router.get(file, toolbox.cacheFirst));

toolbox.router.get(/^https:\/\/maxcdn.bootstrapcdn.com\//, toolbox.cacheFirst);
toolbox.router.get(/^https:\/\/fonts.googleapis.com\//, toolbox.cacheFirst);
toolbox.router.get(/^https:\/\/fonts.gstatic.com\//, toolbox.cacheFirst); // referenced by fonts.googleapis.com

toolbox.router.any(/^\/api\/.*/, toolbox.networkFirst);

self.addEventListener("install", _e => {
    console.log("[ServiceWorker] Install");
});

self.addEventListener("activate", _e => {
    console.log("[ServiceWorker] Activate");
});
