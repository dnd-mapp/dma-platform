import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { authServerHandlers, LoginButtonHarness } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { clientHandlers, getMockServiceWorker, setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { LoginButtonComponent } from './login-button.component';

describe('LoginButtonComponent', () => {
    @Component({
        template: `<dma-login-button />`,
        imports: [LoginButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const msw = getMockServiceWorker();
        msw.use(...clientHandlers, ...authServerHandlers);

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LoginButtonHarness,
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
