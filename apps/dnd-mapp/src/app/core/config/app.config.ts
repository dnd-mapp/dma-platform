import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from '@dnd-mapp/auth-ui';
import { provideClientConfig } from '@dnd-mapp/shared-ui';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideClientConfig(),
    ],
};
