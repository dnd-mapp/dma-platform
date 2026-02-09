import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    async function setupTest() {
        await setupTestEnvironment();

        return {
            service: TestBed.inject(NotificationService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
