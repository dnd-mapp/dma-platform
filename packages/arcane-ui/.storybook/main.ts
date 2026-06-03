import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    stories: ['../**/*.mdx', '../**/*.stories.ts'],
    addons: [],
    framework: {
        name: '@storybook/angular',
        options: {
            builder: {
                name: '@storybook/builder-vite',
            },
        },
    },
};

export default config;
