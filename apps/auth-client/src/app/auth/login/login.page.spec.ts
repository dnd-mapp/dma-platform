import { Component } from '@angular/core';
import { LoginHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
    @Component({
        template: `<dma-login />`,
        imports: [LoginPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LoginHarness,
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
