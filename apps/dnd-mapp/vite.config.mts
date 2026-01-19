/// <reference types='vitest/config' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const reportsDirectory = '../../reports/apps/dnd-mapp';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/apps/dnd-mapp',
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
        name: 'dnd-mapp',
        open: false,
        passWithNoTests: true,
        reporters: [
            'dot',
        ],
        setupFiles: ['test/test-setup.ts'],
        sequence: {
            shuffle: true,
        },
        uiBase: '/dnd-mapp/',
    },
});
