import { Component } from '@angular/core';
import { PasswordInputHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
    @Component({
        template: `<dma-password-input />`,
        imports: [PasswordInputComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: PasswordInputHarness,
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
