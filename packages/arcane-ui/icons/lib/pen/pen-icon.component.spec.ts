import { Component } from '@angular/core';
import { PenIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { PenIconComponent } from './pen-icon.component';

describe('PenIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-pen />',
        imports: [PenIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: PenIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
