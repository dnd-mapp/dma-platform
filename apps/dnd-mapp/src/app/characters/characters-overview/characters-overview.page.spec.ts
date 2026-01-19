import { Component } from '@angular/core';
import { CharactersOverviewHarness } from '@dnd-mapp/dnd-mapp/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { CharactersOverviewPage } from './characters-overview.page';

describe('CharactersOverviewPage', () => {
    @Component({
        template: `<dma-characters-overview />`,
        imports: [CharactersOverviewPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: CharactersOverviewHarness,
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
