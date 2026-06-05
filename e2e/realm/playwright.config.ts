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
        baseURL: isCI ? 'https://localhost' : 'http://localhost:4000',
        trace: 'on-first-retry',
        ...(isCI ? { ignoreHTTPSErrors: true } : {}),
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    ...(isCI
        ? { workers: 1 }
        : {
              webServer: {
                  command: 'pnpm --filter @dnd-mapp/realm start',
                  url: 'http://localhost:4000',
                  reuseExistingServer: true,
              },
          }),
});
