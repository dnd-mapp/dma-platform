import { Component } from '@angular/core';
import { NotFoundHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
    @Component({
        template: `<dma-not-found />`,
        imports: [NotFoundPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: NotFoundHarness,
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
