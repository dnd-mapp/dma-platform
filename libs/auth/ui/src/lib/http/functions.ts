import { inject, provideAppInitializer } from '@angular/core';
import { AuthServerService } from './auth-server.service';

export function provideAuthServerService() {
    return provideAppInitializer(() => {
        const authServerService = inject(AuthServerService);
        return authServerService.initialize();
    });
}
