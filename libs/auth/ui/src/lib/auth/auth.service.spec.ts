import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { authServerHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { clientHandlers, getMockServiceWorker, setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    async function setupTest() {
        const msw = getMockServiceWorker();
        msw.resetHandlers(...clientHandlers, ...authServerHandlers);

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

    test('should be created', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
