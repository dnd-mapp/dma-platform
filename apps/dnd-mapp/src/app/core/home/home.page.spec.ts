import { Component } from '@angular/core';
import { HomeHarness } from '@dnd-mapp/dnd-mapp/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { HomePage } from './home.page';

describe('HomePage', () => {
    @Component({
        template: `<dma-home />`,
        imports: [HomePage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: HomeHarness,
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
