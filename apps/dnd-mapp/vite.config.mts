/// <reference types='vitest/config' />
import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const reportsDirectory = '../../reports/apps/dnd-mapp';
const isCI = Boolean(process.env['CI']);

export default defineConfig(() => ({
    cacheDir: '../../node_modules/.vite/apps/dnd-mapp',
    plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
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
        name: 'dnd-mapp',
        open: false,
        outputFile: `${reportsDirectory}/index.html`,
        reporters: ['dot', 'html', ...(isCI ? ['github-actions'] : [])],
        root: __dirname,
        setupFiles: ['src/test-setup.ts'],
    },
}));
