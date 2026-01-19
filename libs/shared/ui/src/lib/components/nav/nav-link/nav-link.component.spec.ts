import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavLinkHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { NavLinkComponent } from './nav-link.component';

describe('NavLinkComponent', () => {
    @Component({
        template: `<li dma-nav-link route="/my-route">My route</li>`,
        imports: [NavLinkComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: NavLinkHarness,
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
