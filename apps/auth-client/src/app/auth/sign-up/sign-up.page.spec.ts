import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SignUpHarness } from '@dnd-mapp/auth-client/test';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { setupMockHandlers } from '@dnd-mapp/auth-ui/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { SignUpPage } from './sign-up.page';

describe('SignUpPage', () => {
    @Component({
        template: `<dma-sign-up />`,
        imports: [SignUpPage],
    })
    class TestComponent {}

    async function setupTest() {
        await setupMockHandlers();

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: SignUpHarness,
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
