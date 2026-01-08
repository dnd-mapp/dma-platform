/// <reference types='vitest/config' />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const reportsDirectory = '../../reports/apps/admin-client';
const isCI = Boolean(process.env['CI']);

export default defineConfig(() => ({
    cacheDir: '../../node_modules/.vite/apps/admin-client',
    plugins: [angular(), nxViteTsPaths()],
    test: {
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' as const }],
            provider: playwright(),
        },
        coverage: {
            enabled: true,
            exclude: ['**/index.ts'],
            include: ['src/app/**/*.ts'],
            provider: 'v8' as const,
            reportsDirectory: `${reportsDirectory}/coverage`,
            reporter: ['text-summary', 'html'],
        },
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'admin-client',
        open: false,
        outputFile: `${reportsDirectory}/index.html`,
        reporters: ['dot', 'html', ...(isCI ? ['github-actions'] : [])],
        root: __dirname,
        setupFiles: ['test/test-setup.ts'],
    },
}));
