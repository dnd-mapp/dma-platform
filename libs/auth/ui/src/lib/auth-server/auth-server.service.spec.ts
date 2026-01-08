import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { setupTestEnvironment } from '@dnd-mapp/shared/ui/test';
import { AuthServerService } from './auth-server.service';

describe('AuthServerService', () => {
    async function setupTest() {
        await setupTestEnvironment({
            providers: [provideHttpClient()],
        });

        return {
            service: TestBed.inject(AuthServerService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
