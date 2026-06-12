import { Component } from '@angular/core';
import { ArrowUpRightFromSquareIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ArrowUpRightFromSquareIconComponent } from './arrow-up-right-from-square-icon.component';

describe('ArrowUpRightFromSquareIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-arrow-up-right-from-square />',
        imports: [ArrowUpRightFromSquareIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ArrowUpRightFromSquareIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
