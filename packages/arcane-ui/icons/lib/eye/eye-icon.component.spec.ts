import { Component } from '@angular/core';
import { EyeIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { EyeIconComponent } from './eye-icon.component';

describe('EyeIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-eye />',
        imports: [EyeIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: EyeIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
