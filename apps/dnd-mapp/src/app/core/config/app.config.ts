import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideHttp(serverErrorInterceptor, authInterceptor),
        provideAuthServerService(),
    ],
};
