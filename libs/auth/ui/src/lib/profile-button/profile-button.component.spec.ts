import { Component } from '@angular/core';
import { ProfileButtonHarness } from '@dnd-mapp/auth-ui/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { ProfileButtonComponent } from './profile-button.component';

describe('ProfileButtonComponent', () => {
    @Component({
        template: `<dma-profile-button />`,
        imports: [ProfileButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ProfileButtonHarness,
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
