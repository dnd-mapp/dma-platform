import { Component } from '@angular/core';
import { EyeSlashIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { EyeSlashIconComponent } from './eye-slash-icon.component';

describe('EyeSlashIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-eye-slash />',
        imports: [EyeSlashIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: EyeSlashIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
