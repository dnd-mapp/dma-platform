import { defineConfig } from 'vitest/config';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
    test: {
        clearMocks: true,
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text-summary', 'html', 'cobertura'],
            reportOnFailure: true,
            reportsDirectory: 'coverage/',
        },
        environment: 'node',
        globals: true,
        name: 'release-script',
        open: false,
        passWithNoTests: true,
        reporters: ['dot', ['html', { outputFile: 'reports/index.html' }], ...(isCI ? ['github-actions'] : [])],
        root: import.meta.dirname,
    },
});
