import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoginButtonHarness, setupMockHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { authInterceptor, provideAuthServerService } from '../http';
import { LoginButtonComponent } from './login-button.component';

describe('LoginButtonComponent', () => {
    @Component({
        template: `<dma-login-button />`,
        imports: [LoginButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        await setupMockHandlers();

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

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
