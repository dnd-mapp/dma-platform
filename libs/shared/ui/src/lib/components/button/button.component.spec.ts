import { Component } from '@angular/core';
import { ButtonHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        template: `<button type="button" dma-button>My button</button>`,
        imports: [ButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ButtonHarness,
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
