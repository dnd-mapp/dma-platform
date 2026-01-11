import { Component } from '@angular/core';
import { ProfileHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared/ui/test';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
    @Component({
        template: `<dma-profile />`,
        imports: [ProfilePage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ProfileHarness,
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
