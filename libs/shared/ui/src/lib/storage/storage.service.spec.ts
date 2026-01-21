import { TestBed } from '@angular/core/testing';

import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    async function setupTest() {
        await setupTestEnvironment();

        return {
            service: TestBed.inject(StorageService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
