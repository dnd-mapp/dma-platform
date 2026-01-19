import { Component } from '@angular/core';
import { AppTopBarHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { AppTopBarComponent } from './app-top-bar.component';

describe('AppTopBarComponent', () => {
    @Component({
        template: `<dma-app-top-bar></dma-app-top-bar>`,
        imports: [AppTopBarComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: AppTopBarHarness,
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
