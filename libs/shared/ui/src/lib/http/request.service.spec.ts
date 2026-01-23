import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { RequestService } from './request.service';

describe('RequestService', () => {
    async function setupTest() {
        await setupTestEnvironment({
            providers: [provideHttpClient()],
        });

        return {
            service: TestBed.inject(RequestService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeTruthy();
    });
});
