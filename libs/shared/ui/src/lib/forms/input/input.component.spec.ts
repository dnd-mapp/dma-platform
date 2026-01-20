import { Component } from '@angular/core';
import { InputHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    @Component({
        template: `<dma-input inputId="my-input" label="My input" />`,
        imports: [InputComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: InputHarness,
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
