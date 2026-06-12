import { Component, signal } from '@angular/core';
import { type IconSize, IconSizes } from '@dnd-mapp/arcane-ui/common';
import { BaseIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { IconDirective } from './icon.directive';

@Component({
    selector: 'dma-test-icon',
    template: '',
    hostDirectives: [{ directive: IconDirective, inputs: ['size'] }],
})
class TestIconComponent {}

@Component({
    selector: 'dma-test',
    template: '<dma-test-icon [size]="size()" />',
    imports: [TestIconComponent],
})
class TestWrapperComponent {
    public readonly size = signal<IconSize | undefined>(undefined);
}

class IconDirectiveHarness extends BaseIconHarness {
    static hostSelector = 'dma-test-icon';
}

describe('IconDirective', () => {
    async function setupTest() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestWrapperComponent,
            harness: IconDirectiveHarness,
        });

        return {
            testComponent: fixture!.componentInstance,
            harness: harness!,
        };
    }

    it('host has aria-hidden set to "true"', async () => {
        const { harness } = await setupTest();
        expect(await harness.isAriaHidden()).toBe(true);
    });

    it('no size class is applied by default', async () => {
        const { harness } = await setupTest();

        for (const size of Object.values(IconSizes)) {
            expect(await harness.hasSize(size)).toBe(false);
        }
    });

    it.each(Object.values(IconSizes))('size "%s" applies the correct class to the host', async (size) => {
        const { harness, testComponent } = await setupTest();
        testComponent.size.set(size);

        expect(await harness.hasSize(size)).toBe(true);
    });
});
