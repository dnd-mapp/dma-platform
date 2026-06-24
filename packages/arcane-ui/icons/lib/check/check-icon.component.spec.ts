import { Component } from '@angular/core';
import { CheckIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { CheckIconComponent } from './check-icon.component';

describe('CheckIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-check />',
        imports: [CheckIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: CheckIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
