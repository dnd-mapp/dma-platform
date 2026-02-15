import { ApplicationInitStatus, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { authInterceptor, provideAuthServerService } from '@dnd-mapp/auth-ui';
import { authServerHandlers } from '@dnd-mapp/auth-ui/test';
import { RootHarness } from '@dnd-mapp/dnd-mapp/test';
import { provideHttp, serverErrorInterceptor } from '@dnd-mapp/shared-ui';
import { clientHandlers, getMockServiceWorker, setupTestEnvironment, test } from '@dnd-mapp/shared-ui/test';
import { appRoutes } from '../config';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const msw = getMockServiceWorker();
        msw.resetHandlers(...clientHandlers, ...authServerHandlers);

        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: RootHarness,
            providers: [
                provideRouter(appRoutes),
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
