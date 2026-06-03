import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            screenshotFailures: false,
        },
        clearMocks: true,
        coverage: {
            enabled: true,
            exclude: ['main.ts', '**/config/*.ts', '**/test/**/*'],
            provider: 'v8',
            reporter: ['text-summary', 'html', 'cobertura'],
            reportOnFailure: true,
            reportsDirectory: 'coverage/',
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        globals: true,
        name: 'realm',
        open: false,
        reporters: ['dot', ['html', { outputFile: 'reports/index.html' }], ...(isCI ? ['github-actions'] : [])],
        root: import.meta.dirname,
        sequence: {
            shuffle: true,
        },
        uiBase: '/realm/',
    },
});
