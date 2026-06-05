import type { StorybookConfig } from '@storybook/angular';
import type { StorybookConfigVite } from '@storybook/builder-vite';

const config: StorybookConfig & StorybookConfigVite = {
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
