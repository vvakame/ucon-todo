import { provideRouter, RouterConfig } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes: RouterConfig = [
    { path: '', component: AppComponent, terminal: true },
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
