import { ButtonAppearances, ButtonIntents, ButtonSizes } from '@dnd-mapp/arcane-ui/common';
import { ArrowUpRightFromSquareIconComponent, PlusIconComponent, TrashIconComponent } from '@dnd-mapp/arcane-ui/icons';
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Components/Button',
    component: ButtonComponent,
    render: (args) => ({
        props: args,
        template: `
            <button
                dma-button
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [loading]="loading"
                [fullWidth]="fullWidth"
            >
                Label
            </button>
        `,
    }),
    argTypes: {
        appearance: {
            control: 'select',
            options: Object.values(ButtonAppearances),
            description:
                'Controls the visual style of the button surface. `filled` uses a solid intent-coloured background; `outlined` adds an intent-coloured border with a transparent background; `ghost` has no border or background; `tonal` uses a muted tonal background; `elevated` lifts the button with a drop shadow.',
            table: {
                defaultValue: { summary: 'filled' },
                type: { summary: Object.values(ButtonAppearances).join(' | ') },
            },
        },
        intent: {
            control: 'select',
            options: Object.values(ButtonIntents),
            description:
                'Semantic colour role applied to the button. Use `primary` for the main call-to-action, `danger` for destructive actions, `warning` for cautionary actions, `success` for confirmations, and `info` for neutral informational actions.',
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: Object.values(ButtonIntents).join(' | ') },
            },
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSizes),
            description:
                'Controls the height, padding, and font size of the button. `sm` is suited to dense UIs or secondary actions; `md` is the standard size for most contexts; `lg` is for prominent or touch-first interfaces.',
            table: {
                defaultValue: { summary: 'md' },
                type: { summary: Object.values(ButtonSizes).join(' | ') },
            },
        },
        iconOnly: {
            control: false,
            description:
                'When `true`, removes horizontal text padding and forces a 1:1 aspect ratio so the button renders as a square. Use this when the button contains only an icon — always pair it with an accessible label via `aria-label`.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
        loading: {
            control: 'boolean',
            description:
                'When `true`, hides the button content and shows a spinner in its place, indicating that an async action is in progress. Pointer events are disabled while loading.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description:
                'When `true`, stretches the button to fill the full width of its containing block. Useful for stacked layouts or mobile-first call-to-action buttons.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
            },
        },
    },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Default: Story = {};

export const IconOnly: Story = {
    args: { iconOnly: true, intent: 'danger' },
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [TrashIconComponent] },
        template: `
            <button
                dma-button
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [loading]="loading"
                [fullWidth]="fullWidth"
            >
                <dma-icon-trash />
            </button>
        `,
    }),
};

export const LeadingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [PlusIconComponent] },
        template: `
            <button
                dma-button
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [loading]="loading"
                [fullWidth]="fullWidth"
            >
                <dma-icon-plus /> Add item
            </button>
        `,
    }),
};

export const TrailingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [ArrowUpRightFromSquareIconComponent] },
        template: `
            <button
                dma-button
                [appearance]="appearance"
                [intent]="intent"
                [size]="size"
                [iconOnly]="iconOnly"
                [loading]="loading"
                [fullWidth]="fullWidth"
            >
                Open <dma-icon-arrow-up-right-from-square />
            </button>
        `,
    }),
};
