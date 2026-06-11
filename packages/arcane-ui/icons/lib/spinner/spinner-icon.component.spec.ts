import { Component, signal } from '@angular/core';
import { type IconSize, IconSizes } from '@dnd-mapp/arcane-ui/common';
import { SpinnerIconHarness } from '@dnd-mapp/arcane-ui/icons/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { SpinnerIconComponent } from './spinner-icon.component';

describe('SpinnerIconComponent', () => {
    @Component({
        selector: 'dma-test',
        template: '<dma-icon-spinner [size]="size()" />',
        imports: [SpinnerIconComponent],
    })
    class TestComponent {
        public readonly size = signal<IconSize | undefined>(undefined);
    }

    async function setupTest() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: SpinnerIconHarness,
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

    it('SVG element is present in rendered output', async () => {
        const { harness } = await setupTest();
        expect(await harness.hasSvg()).toBe(true);
    });
});
