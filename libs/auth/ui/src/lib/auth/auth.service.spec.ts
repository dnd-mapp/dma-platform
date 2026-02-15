import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupMockHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { authInterceptor, provideAuthServerService } from '../http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    async function setupTest() {
        await setupMockHandlers();

        await setupTestEnvironment({
            providers: [provideHttp(serverErrorInterceptor, authInterceptor), provideAuthServerService()],
            afterConfig: async () => {
                await TestBed.inject(ApplicationInitStatus).donePromise;
            },
        });

        return {
            service: TestBed.inject(AuthService),
        };
    }

    it('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
