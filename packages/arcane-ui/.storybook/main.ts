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
    viteFinal: (config) => ({
        ...config,
        base: process.env['STORYBOOK_BASE_URL'] ?? '/',
    }),
};

export default config;
