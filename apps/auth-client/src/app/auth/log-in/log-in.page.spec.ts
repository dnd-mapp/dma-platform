import { Component } from '@angular/core';
import { LogInHarness } from '@dnd-mapp/auth-client/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { LogInPage } from './log-in.page';

describe('LogInPage', () => {
    @Component({
        template: `<dma-log-in />`,
        imports: [LogInPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: LogInHarness,
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
