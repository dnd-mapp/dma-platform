import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4400';

export default defineConfig({
    ...nxE2EPreset(__filename, { testDir: './src' }),
    use: {
        baseURL: baseURL,
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'pnpm exec nx serve admin-client -c http',
        url: baseURL,
        reuseExistingServer: true,
        cwd: workspaceRoot,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
