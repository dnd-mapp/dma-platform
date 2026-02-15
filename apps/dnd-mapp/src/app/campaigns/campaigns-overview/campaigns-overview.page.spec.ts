import { Component } from '@angular/core';
import { CampaignsOverviewHarness } from '@dnd-mapp/dnd-mapp/test';
import { setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { CampaignsOverviewPage } from './campaigns-overview.page';

describe('CampaignsOverviewPage', () => {
    @Component({
        template: `<dma-campaigns-overview />`,
        imports: [CampaignsOverviewPage],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: CampaignsOverviewHarness,
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
