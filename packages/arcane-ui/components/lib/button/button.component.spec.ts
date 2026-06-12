import { Component, signal } from '@angular/core';
import {
    ButtonAppearances,
    ButtonIntents,
    ButtonSizes,
    DEFAULT_BUTTON_APPEARANCE,
    DEFAULT_BUTTON_INTENT,
    DEFAULT_BUTTON_SIZE,
    type ButtonAppearance,
    type ButtonIntent,
    type ButtonSize,
} from '@dnd-mapp/arcane-ui/common';
import { ButtonHarness } from '@dnd-mapp/arcane-ui/components/testing';
import { setupTestEnvironment } from '@dnd-mapp/arcane-ui/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        selector: 'dma-test',
        template: `
            <button
                dma-button
                [appearance]="appearance()"
                [intent]="intent()"
                [size]="size()"
                [iconOnly]="iconOnly()"
                [loading]="loading()"
                [fullWidth]="fullWidth()"
                [disabled]="disabled()"
            >
                Click
            </button>
        `,
        imports: [ButtonComponent],
    })
    class TestComponent {
        public readonly appearance = signal<ButtonAppearance | ''>('filled');
        public readonly intent = signal<ButtonIntent | ''>('primary');
        public readonly size = signal<ButtonSize | ''>('md');
        public readonly iconOnly = signal(false);
        public readonly loading = signal(false);
        public readonly fullWidth = signal(false);
        public readonly disabled = signal(false);
    }

    async function setupTest() {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: ButtonHarness,
        });

        return {
            component: fixture!.componentInstance,
            harness: harness!,
        };
    }

    describe('appearance', () => {
        it.each(Object.values(ButtonAppearances))(
            'appearance "%s" applies the correct class to the host',
            async (appearance) => {
                const { component, harness } = await setupTest();
                component.appearance.set(appearance);

                expect(await harness.hasAppearance(appearance)).toBe(true);

                for (const other of Object.values(ButtonAppearances).filter((a) => a !== appearance)) {
                    expect(await harness.hasAppearance(other)).toBe(false);
                }
            },
        );

        it('falls back to the default appearance for unrecognised values', async () => {
            const { component, harness } = await setupTest();
            component.appearance.set('');

            expect(await harness.hasAppearance(DEFAULT_BUTTON_APPEARANCE)).toBe(true);
        });
    });

    describe('intent', () => {
        it.each(Object.values(ButtonIntents))('intent "%s" applies the correct class to the host', async (intent) => {
            const { component, harness } = await setupTest();
            component.intent.set(intent);

            expect(await harness.hasIntent(intent)).toBe(true);

            for (const other of Object.values(ButtonIntents).filter((i) => i !== intent)) {
                expect(await harness.hasIntent(other)).toBe(false);
            }
        });

        it('falls back to the default intent for unrecognised values', async () => {
            const { component, harness } = await setupTest();
            component.intent.set('');

            expect(await harness.hasIntent(DEFAULT_BUTTON_INTENT)).toBe(true);
        });
    });

    describe('size', () => {
        it.each(Object.values(ButtonSizes))('size "%s" applies the correct class to the host', async (size) => {
            const { component, harness } = await setupTest();
            component.size.set(size);

            expect(await harness.hasSize(size)).toBe(true);

            for (const other of Object.values(ButtonSizes).filter((s) => s !== size)) {
                expect(await harness.hasSize(other)).toBe(false);
            }
        });

        it('falls back to the default size for unrecognised values', async () => {
            const { component, harness } = await setupTest();
            component.size.set('');

            expect(await harness.hasSize(DEFAULT_BUTTON_SIZE)).toBe(true);
        });
    });

    describe('iconOnly', () => {
        it('does not have the icon-only class by default', async () => {
            const { harness } = await setupTest();
            expect(await harness.isIconOnly()).toBe(false);
        });

        it('applies the icon-only class when set to true', async () => {
            const { component, harness } = await setupTest();
            component.iconOnly.set(true);

            expect(await harness.isIconOnly()).toBe(true);
        });
    });

    describe('loading', () => {
        it('does not have the loading class by default', async () => {
            const { harness } = await setupTest();
            expect(await harness.isLoading()).toBe(false);
        });

        it('applies the loading class when set to true', async () => {
            const { component, harness } = await setupTest();
            component.loading.set(true);

            expect(await harness.isLoading()).toBe(true);
        });
    });

    describe('fullWidth', () => {
        it('does not have the full-width class by default', async () => {
            const { harness } = await setupTest();
            expect(await harness.isFullWidth()).toBe(false);
        });

        it('applies the full-width class when set to true', async () => {
            const { component, harness } = await setupTest();
            component.fullWidth.set(true);

            expect(await harness.isFullWidth()).toBe(true);
        });
    });

    describe('disabled', () => {
        it('is not disabled by default', async () => {
            const { harness } = await setupTest();
            expect(await harness.isDisabled()).toBe(false);
        });

        it('is disabled when the disabled attribute is set', async () => {
            const { component, harness } = await setupTest();
            component.disabled.set(true);

            expect(await harness.isDisabled()).toBe(true);
        });
    });
});
