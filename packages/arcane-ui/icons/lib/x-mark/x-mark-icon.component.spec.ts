import { Component } from '@angular/core';
import { XMarkIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { XMarkIconComponent } from './x-mark-icon.component';

describe('XMarkIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-x-mark />',
        imports: [XMarkIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: XMarkIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
