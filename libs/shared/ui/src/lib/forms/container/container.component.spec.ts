import { Component } from '@angular/core';
import { ContainerHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
    @Component({
        template: `<dma-container />`,
        imports: [ContainerComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ContainerHarness,
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
