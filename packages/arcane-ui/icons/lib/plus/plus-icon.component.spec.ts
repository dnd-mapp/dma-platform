import { Component } from '@angular/core';
import { PlusIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { PlusIconComponent } from './plus-icon.component';

describe('PlusIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-plus />',
        imports: [PlusIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: PlusIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
