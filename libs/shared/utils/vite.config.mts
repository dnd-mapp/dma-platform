/// <reference types='vitest/config' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

const reportsDirectory = '../../../reports/libs/shared/utils';
const isCI = Boolean(process.env['CI']);

export default defineConfig(() => ({
    cacheDir: '../../../node_modules/.vite/libs/shared/utils',
    plugins: [nxViteTsPaths()],
    test: {
        coverage: {
            enabled: true,
            exclude: ['**/index.ts'],
            include: ['src/lib/**/*.ts'],
            provider: 'v8' as const,
            reporter: ['text-summary', 'html'],
            reportsDirectory: `${reportsDirectory}/coverage`,
        },
        environment: 'node',
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'shared-utils',
        open: false,
        outputFile: `${reportsDirectory}/index.html`,
        reporters: ['dot', 'html', ...(isCI ? ['github-actions'] : [])],
        root: __dirname,
    },
}));
