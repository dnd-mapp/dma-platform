import { Component } from '@angular/core';
import { DropdownAnchorHarness, setupTestEnvironment } from '@dnd-mapp/shared-ui/test';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';

describe('DropdownAnchorDirective', () => {
    @Component({
        template: `
            <div [dmaDropdownAnchor]="dropdownMenu">Anchor</div>
            <ng-template #dropdownMenu>Dropdown Menu</ng-template>
        `,
        imports: [DropdownAnchorDirective],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: DropdownAnchorHarness,
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
