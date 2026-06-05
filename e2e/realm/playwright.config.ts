import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
    testDir: '.',
    fullyParallel: true,
    forbidOnly: isCI,
    outputDir: './reports/test-results',
    retries: isCI ? 2 : 0,
    reporter: [['html', { outputFolder: './reports/html' }], ...(isCI ? [['github'] as const] : [])],
    use: {
        baseURL: 'http://localhost:4000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'pnpm --filter @dnd-mapp/realm start',
        url: 'http://localhost:4000',
        reuseExistingServer: !isCI,
    },
    ...(isCI ? { workers: 1 } : {}),
});
