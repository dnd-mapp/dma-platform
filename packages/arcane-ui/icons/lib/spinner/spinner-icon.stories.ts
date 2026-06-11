import type { Meta, StoryObj } from '@storybook/angular';
import { DmaSpinnerIconComponent } from './spinner-icon.component';

const meta: Meta<DmaSpinnerIconComponent> = {
    title: 'Icons/Spinner',
    component: DmaSpinnerIconComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'The size of the icon. Omit to let it scale with the surrounding font size (1em).',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
    },
};

export default meta;

type Story = StoryObj<DmaSpinnerIconComponent>;

export const Default: Story = {};

export const WithSize: Story = {
    args: { size: 'md' },
};
