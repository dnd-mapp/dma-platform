import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavBrandHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NavBrandComponent } from './nav-brand.component';

describe('NavBrandComponent', () => {
    @Component({
        template: `<dma-nav-brand appName="My app" />`,
        imports: [NavBrandComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: NavBrandHarness,
            providers: [provideRouter([])],
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
