import { Component } from '@angular/core';
import { SignUpButtonHarness } from '@dnd-mapp/auth-ui/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { SignUpButtonComponent } from './sign-up-button.component';

describe('SignUpButtonComponent', () => {
    @Component({
        template: `<dma-sign-up-button />`,
        imports: [SignUpButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: SignUpButtonHarness,
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
