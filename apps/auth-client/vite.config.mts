/// <reference types='vitest/config' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const isCI = Boolean(process.env['CI']);
const reportsDirectory = '../../reports/apps/auth-client';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/apps/auth-client',
    plugins: [angular(), nxViteTsPaths()],
    root: __dirname,
    test: {
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
        },
        clearMocks: true,
        coverage: {
            enabled: true,
            include: ['src/**/*.ts'],
            provider: 'v8',
            reporter: [['html', { subdir: '.' }], 'text-summary'],
            reportOnFailure: true,
            reportsDirectory: `${reportsDirectory}/coverage`,
        },
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'auth-client',
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
        uiBase: '/auth-client/',
    },
    worker: {
        plugins: () => [nxViteTsPaths()],
    },
});
