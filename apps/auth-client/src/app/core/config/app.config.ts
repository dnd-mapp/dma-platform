import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientConfig, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideClientConfig(),
        provideHttpClient(withFetch(), withInterceptors([serverErrorInterceptor])),
    ],
};
