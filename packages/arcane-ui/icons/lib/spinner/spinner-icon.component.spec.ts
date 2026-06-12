import { Component } from '@angular/core';
import { SpinnerIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { SpinnerIconComponent } from './spinner-icon.component';

describe('SpinnerIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-spinner />',
        imports: [SpinnerIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: SpinnerIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
