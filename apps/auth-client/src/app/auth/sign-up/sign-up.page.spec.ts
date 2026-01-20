import { Component } from '@angular/core';
import { SignUpHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { SignUpPage } from './sign-up.page';

describe('SignUpPage', () => {
    @Component({
        template: `<dma-sign-up />`,
        imports: [SignUpPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: SignUpHarness,
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
