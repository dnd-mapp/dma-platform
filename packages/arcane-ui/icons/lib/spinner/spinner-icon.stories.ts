import { IconSizes } from '@dnd-mapp/arcane-ui/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerIconComponent } from './spinner-icon.component';

const meta: Meta<SpinnerIconComponent> = {
    title: 'Icons/Spinner',
    component: SpinnerIconComponent,
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(IconSizes),
            description: 'The size of the icon. Omit to let it scale with the surrounding font size (1em).',
        },
    },
};

export default meta;

type Story = StoryObj<SpinnerIconComponent>;

export const Default: Story = {};

export const WithSize: Story = {
    args: { size: 'md' },
};
