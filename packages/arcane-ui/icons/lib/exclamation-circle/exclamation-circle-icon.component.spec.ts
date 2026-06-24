import { Component } from '@angular/core';
import { ExclamationCircleIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ExclamationCircleIconComponent } from './exclamation-circle-icon.component';

describe('ExclamationCircleIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-exclamation-circle />',
        imports: [ExclamationCircleIconComponent],
    })
    class TestComponent {}

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ExclamationCircleIconHarness,
        });
        expect(await harness!.hasSvg()).toBe(true);
    });
});
