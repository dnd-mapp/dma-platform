import { Component } from '@angular/core';
import { setupTestEnvironment, UsernameInputHarness } from '@dnd-mapp/shared-ui/test';
import { UsernameInputComponent } from './username-input.component';

describe('UsernameInputComponent', () => {
    @Component({
        template: `<dma-username-input />`,
        imports: [UsernameInputComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: UsernameInputHarness,
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
