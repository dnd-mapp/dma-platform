import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AnchorHarness, setupTestEnvironment } from '@dnd-mapp/shared/ui/test';
import { AnchorComponent } from './anchor.component';

describe('AnchorComponent', () => {
    @Component({
        template: `<dma-anchor route="/my-route" label="My label" />`,
        imports: [AnchorComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: AnchorHarness,
            providers: [provideRouter([])],
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
