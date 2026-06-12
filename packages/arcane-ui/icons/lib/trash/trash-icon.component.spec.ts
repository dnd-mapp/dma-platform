import { Component } from '@angular/core';
import { TrashIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { TrashIconComponent } from './trash-icon.component';

describe('TrashIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-trash />',
        imports: [TrashIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: TrashIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
