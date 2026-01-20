import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    async function setupTest() {
        await setupTestEnvironment();

        return {
            service: TestBed.inject(AuthService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
