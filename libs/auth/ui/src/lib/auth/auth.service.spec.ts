import { TestBed } from '@angular/core/testing';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { AuthService } from './auth.service';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { ApplicationInitStatus } from '@angular/core';

describe('AuthService', () => {
    async function setupTest() {
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
