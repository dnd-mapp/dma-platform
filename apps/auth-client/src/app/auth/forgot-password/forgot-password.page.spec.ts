import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ForgotPasswordHarness } from '@dnd-mapp/auth-client/test';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { authServerHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { clientHandlers, getMockServiceWorker, setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { ForgotPasswordPage } from './forgot-password.page';

describe('SignUpPage', () => {
    @Component({
        template: `<dma-forgot-password />`,
        imports: [ForgotPasswordPage],
    })
    class TestComponent {}

    async function setupTest() {
        const msw = getMockServiceWorker();
        msw.use(...clientHandlers, ...authServerHandlers);

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ForgotPasswordHarness,
            providers: [provideHttp(serverErrorInterceptor, authInterceptor), provideAuthServerService()],
            afterConfig: async () => {
                await TestBed.inject(ApplicationInitStatus).donePromise;
            },
        });

        return {
            harness: harness,
        };
    }

    test('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
