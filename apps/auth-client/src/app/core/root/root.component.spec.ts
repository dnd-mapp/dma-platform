import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RootHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { appRoutes } from '../config';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: RootHarness,
            providers: [provideRouter(appRoutes)],
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
