import { Component } from '@angular/core';
import { ForgotPasswordHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { ForgotPasswordPage } from './forgot-password.page';

describe('SignUpPage', () => {
    @Component({
        template: `<dma-forgot-password />`,
        imports: [ForgotPasswordPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ForgotPasswordHarness,
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
