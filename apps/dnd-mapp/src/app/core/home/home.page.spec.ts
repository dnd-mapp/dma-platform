import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { setupMockHandlers } from '@dnd-mapp/auth-ui/test';
import { HomeHarness } from '@dnd-mapp/dnd-mapp/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { HomePage } from './home.page';

describe('HomePage', () => {
    @Component({
        template: `<dma-home />`,
        imports: [HomePage],
    })
    class TestComponent {}

    async function setupTest() {
        await setupMockHandlers();

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: HomeHarness,
            providers: [
                provideRouter([]),
                provideHttp(serverErrorInterceptor, authInterceptor),
                provideAuthServerService(),
            ],
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
