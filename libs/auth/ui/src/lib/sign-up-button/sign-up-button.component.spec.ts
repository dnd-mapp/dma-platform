import { Component } from '@angular/core';
import { SignUpButtonComponent } from '@dnd-mapp/auth-ui';
import { SignUpButtonHarness } from '@dnd-mapp/auth-ui/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';

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
