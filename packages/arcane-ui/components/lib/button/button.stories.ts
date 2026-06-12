import { ButtonAppearances, ButtonIntents, ButtonSizes } from '@dnd-mapp/arcane-ui/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Components/Button',
    component: ButtonComponent,
    argTypes: {
        appearance: {
            control: 'select',
            options: Object.values(ButtonAppearances),
            description: 'Visual presentation variant of the button.',
        },
        intent: {
            control: 'select',
            options: Object.values(ButtonIntents),
            description: 'Semantic colour intent applied to the button.',
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSizes),
            description: 'Size of the button.',
        },
        iconOnly: {
            control: 'boolean',
            description: 'Render the button as a square icon-only target.',
        },
        loading: {
            control: 'boolean',
            description: 'Indicates an in-progress action.',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Stretch the button to fill its container.',
        },
    },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Default: Story = {};

export const IconOnly: Story = {
    args: { iconOnly: true },
};

export const Loading: Story = {
    args: { loading: true },
};

export const FullWidth: Story = {
    args: { fullWidth: true },
};
