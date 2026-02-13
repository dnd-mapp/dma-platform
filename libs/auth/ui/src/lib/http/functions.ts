import { inject, provideAppInitializer } from '@angular/core';
import { ConfigService } from '@dnd-mapp/shared-ui';
import { tap } from 'rxjs';
import { AuthServerService } from './auth-server.service';

export function provideAuthServerService() {
    return provideAppInitializer(() => {
        const configService = inject(ConfigService);
        const authServerService = inject(AuthServerService);

        return configService.initialize().pipe(tap(() => authServerService.initialize()));
    });
}
