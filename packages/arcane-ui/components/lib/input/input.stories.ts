import { InputTypes } from '@dnd-mapp/arcane-ui/common';
import { EyeIconComponent, PenIconComponent } from '@dnd-mapp/arcane-ui/icons';
import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
    title: 'Components/Input',
    component: InputComponent,
    render: (args) => ({
        props: args,
        template: `
            <dma-input
                [inputId]="inputId"
                [label]="label"
                [type]="type"
                [required]="required"
                [placeholder]="placeholder"
                [autocomplete]="autocomplete"
                [readonly]="readonly"
                [disabled]="disabled"
                [status]="status"
                [helperText]="helperText"
                [errorMessage]="errorMessage"
            />
        `,
    }),
    args: {
        inputId: 'example',
        label: 'Label',
    },
    argTypes: {
        inputId: {
            control: 'text',
            description: 'ID applied to the native input; used to associate the label and derive ARIA description IDs.',
            table: { type: { summary: 'string' } },
        },
        label: {
            control: 'text',
            description: 'Visible label rendered above the input.',
            table: { type: { summary: 'string' } },
        },
        type: {
            control: 'select',
            options: Object.values(InputTypes),
            description: 'HTML `type` attribute forwarded to the native input.',
            table: {
                defaultValue: { summary: 'text' },
                type: { summary: Object.values(InputTypes).join(' | ') },
            },
        },
        required: {
            control: 'boolean',
            description: 'When `true`, sets `aria-required` on the native input.',
            table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text forwarded to the native input.',
            table: { type: { summary: 'string' } },
        },
        autocomplete: {
            control: 'text',
            description: 'Autocomplete hint forwarded to the native input.',
            table: { type: { summary: 'string' } },
        },
        readonly: {
            control: 'boolean',
            description: 'When `true`, the input value cannot be edited by the user.',
            table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
        },
        disabled: {
            control: 'boolean',
            description: 'When `true`, disables the input and applies a reduced-opacity appearance.',
            table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
        },
        status: {
            control: 'select',
            options: ['default', 'success', 'error'],
            description:
                'Explicit validation state. When omitted, status is derived from an associated Angular form control.',
            table: { defaultValue: { summary: 'default' }, type: { summary: 'default | success | error' } },
        },
        helperText: {
            control: 'text',
            description: 'Supporting text rendered below the input.',
            table: { type: { summary: 'string' } },
        },
        errorMessage: {
            control: 'text',
            description: 'Error text rendered below the input when status is `error`.',
            table: { type: { summary: 'string' } },
        },
    },
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {};

export const WithHelperText: Story = {
    args: {
        placeholder: 'e.g. Frodo Baggins',
        helperText: 'Enter the name as it appears on your character sheet.',
    },
};

export const ErrorState: Story = {
    args: {
        status: 'error',
        errorMessage: 'This field is required.',
    },
};

export const SuccessState: Story = {
    args: {
        status: 'success',
    },
};

export const WithLeadingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [PenIconComponent] },
        template: `
            <dma-input
                [inputId]="inputId"
                [label]="label"
                [placeholder]="placeholder"
            >
                <dma-icon-pen dmaInputLeadingIcon />
            </dma-input>
        `,
    }),
    args: {
        inputId: 'character-name',
        label: 'Character name',
        placeholder: 'e.g. Frodo Baggins',
    },
};

export const WithTrailingIcon: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [EyeIconComponent] },
        template: `
            <dma-input
                [inputId]="inputId"
                [label]="label"
                [placeholder]="placeholder"
            >
                <dma-icon-eye dmaInputTrailingIcon />
            </dma-input>
        `,
    }),
    args: {
        inputId: 'secret',
        label: 'Secret word',
        placeholder: 'Enter a secret',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Cannot edit',
    },
};
