import { provideHttpClient, withFetch } from '@angular/common/http';
import { type ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideConfig } from '@dnd-mapp/arcane-ui/config';
import { routes } from './app.routes';
import { type RealmConfig } from './realm-config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        ...provideConfig<RealmConfig>('/config.json'),
    ],
};
