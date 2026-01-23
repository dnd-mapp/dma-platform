/// <reference types='vitest/config' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

const isCI = Boolean(process.env['CI']);
const reportsDirectory = '../../../reports/libs/auth/domain';

export default defineConfig({
    cacheDir: '../../../node_modules/.vite/libs/auth/domain',
    plugins: [nxViteTsPaths()],
    root: __dirname,
    test: {
        clearMocks: true,
        coverage: {
            enabled: true,
            include: ['src/**/*.ts'],
            provider: 'v8',
            reporter: [['html', { subdir: '.' }], 'text-summary'],
            reportOnFailure: true,
            reportsDirectory: `${reportsDirectory}/coverage`,
        },
        environment: 'node',
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'auth-domain',
        open: false,
        passWithNoTests: true,
        reporters: [
            'dot',
            ['html', { outputFile: `${reportsDirectory}/index.html` }],
            ...(isCI ? ['github-actions'] : []),
        ],
        setupFiles: ['test/test-setup.ts'],
        sequence: {
            shuffle: true,
        },
        uiBase: '/auth-domain/',
    },
});
