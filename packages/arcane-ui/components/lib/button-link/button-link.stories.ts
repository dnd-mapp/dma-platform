import { ButtonAppearances, ButtonIntents, ButtonSizes } from '@dnd-mapp/arcane-ui/common';
import { ArrowUpRightFromSquareIconComponent, PlusIconComponent, TrashIconComponent } from '@dnd-mapp/arcane-ui/icons';
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonLinkComponent } from './button-link.component';

const meta: Meta<ButtonLinkComponent> = {
    title: 'Components/ButtonLink',
    component: ButtonLinkComponent,
    render: (args) => ({
        props: args,
        template: `
            <a
                dma-button-link
                href="#"
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [fullWidth]="fullWidth"
                [disabled]="disabled"
            >
                Label
            </a>
        `,
    }),
    argTypes: {
        appearance: {
            control: 'select',
            options: Object.values(ButtonAppearances),
            description:
                'Controls the visual style of the link surface. `filled` uses a solid intent-coloured background; `outlined` adds an intent-coloured border with a transparent background; `ghost` has no border or background; `tonal` uses a muted tonal background; `elevated` lifts the link with a drop shadow.',
            table: {
                defaultValue: { summary: 'filled' },
                type: { summary: Object.values(ButtonAppearances).join(' | ') },
            },
        },
        intent: {
            control: 'select',
            options: Object.values(ButtonIntents),
            description:
                'Semantic colour role applied to the link. Use `primary` for the main call-to-action, `danger` for destructive navigation, and `success` for confirmatory navigation.',
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: Object.values(ButtonIntents).join(' | ') },
            },
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSizes),
            description:
                'Controls the height, padding, and font size of the link. `sm` is suited to dense UIs or secondary actions; `md` is the standard size for most contexts; `lg` is for prominent or touch-first interfaces.',
            table: {
                defaultValue: { summary: 'md' },
                type: { summary: Object.values(ButtonSizes).join(' | ') },
            },
        },
        iconOnly: {
            control: false,
            description:
                'When `true`, removes horizontal text padding and forces a 1:1 aspect ratio so the link renders as a square. Use this when the link contains only an icon — always pair it with an accessible label via `aria-label`.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description:
                'When `true`, stretches the link to fill the full width of its containing block. Useful for stacked layouts or mobile-first call-to-action links.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: 'boolean',
            description:
                'When `true`, marks the link as disabled via `aria-disabled` and removes it from the tab order. Navigation is prevented by clearing the `href` attribute on the consuming side.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
    },
};

export default meta;

type Story = StoryObj<ButtonLinkComponent>;

export const Default: Story = {};

export const Disabled: Story = {
    args: { disabled: true },
};

export const IconOnly: Story = {
    args: { iconOnly: true, intent: 'danger' },
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [TrashIconComponent] },
        template: `
            <a
                dma-button-link
                href="#"
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [fullWidth]="fullWidth"
                [disabled]="disabled"
                aria-label="Delete"
            >
                <dma-icon-trash />
            </a>
        `,
    }),
};

export const LeadingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [PlusIconComponent] },
        template: `
            <a
                dma-button-link
                href="#"
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [fullWidth]="fullWidth"
                [disabled]="disabled"
            >
                <dma-icon-plus /> Add item
            </a>
        `,
    }),
};

export const TrailingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [ArrowUpRightFromSquareIconComponent] },
        template: `
            <a
                dma-button-link
                href="#"
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [fullWidth]="fullWidth"
                [disabled]="disabled"
            >
                Open <dma-icon-arrow-up-right-from-square />
            </a>
        `,
    }),
};
