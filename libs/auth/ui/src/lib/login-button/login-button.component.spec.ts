import { Component } from '@angular/core';
import { LoginButtonHarness } from '@dnd-mapp/auth-ui/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { LoginButtonComponent } from './login-button.component';

describe('LoginButtonComponent', () => {
    @Component({
        template: `<dma-login-button />`,
        imports: [LoginButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LoginButtonHarness,
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
