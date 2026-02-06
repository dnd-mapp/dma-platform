import { Component } from '@angular/core';
import { LogoutButtonHarness } from '@dnd-mapp/auth-ui/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
    @Component({
        template: `<dma-logout-button />`,
        imports: [LogoutButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LogoutButtonHarness,
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
