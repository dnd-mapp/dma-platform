import { Component } from '@angular/core';
import { TopAppBarHarness, setupTestEnvironment } from '@dnd-mapp/shared/ui/test';
import { TopAppBarComponent } from './top-app-bar.component';

describe('TopAppBarComponent', () => {
    @Component({
        template: `<dma-top-app-bar />`,
        imports: [TopAppBarComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: TopAppBarHarness,
        });

        return {
            harness: harness!,
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
