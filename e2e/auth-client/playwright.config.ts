import { workspaceRoot } from '@nx/devkit';
import { defineConfig, devices, ReporterDescription } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4300';
const isCI = Boolean(process.env['CI']);

const reporterDir = '../../reports/e2e/auth-client';

let reporters: ReporterDescription[] = [['dot'], ['html', { outputFolder: reporterDir }]];

if (isCI) {
    reporters = [...reporters, ['github']];
}

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    forbidOnly: !isCI,
    fullyParallel: true,
    outputDir: reporterDir,
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
    reporter: reporters,
    retries: isCI ? 2 : 0,
    testDir: './src',
    use: {
        baseURL,
        trace: 'on-first-retry',
    },
    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'pnpm exec nx serve auth-client -c http',
        url: 'http://localhost:4300',
        reuseExistingServer: true,
        cwd: workspaceRoot,
    },
    workers: isCI ? 1 : undefined,
});
