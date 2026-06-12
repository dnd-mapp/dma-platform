import { IconSizes } from '@dnd-mapp/arcane-ui/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { IconGalleryComponent } from '../.storybook/icon-gallery/icon-gallery.component';

const meta: Meta<IconGalleryComponent> = {
    title: 'Icons',
    component: IconGalleryComponent,
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(IconSizes),
            description: 'The size of the icons. Omit to let them scale with the surrounding font size (1em).',
        },
    },
};

export default meta;

type Story = StoryObj<IconGalleryComponent>;

export const Gallery: Story = {};
