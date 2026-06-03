import type { Meta, StoryObj } from '@storybook/angular';
import { DummyComponent } from './dummy.component';

const meta: Meta<DummyComponent> = {
    title: 'Components/Dummy',
    component: DummyComponent,
};

export default meta;

type Story = StoryObj<DummyComponent>;

export const Default: Story = {
    args: {
        label: 'Hello from Storybook',
    },
};
