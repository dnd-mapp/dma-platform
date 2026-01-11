import { Component } from '@angular/core';
import { ResetPasswordHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared/ui/test';
import { ResetPasswordPage } from './reset-password.page';

describe('ResetPasswordPage', () => {
    @Component({
        template: `<dma-reset-password />`,
        imports: [ResetPasswordPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ResetPasswordHarness,
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
