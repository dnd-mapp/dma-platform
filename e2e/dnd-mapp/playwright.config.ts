import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices, ReporterDescription } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

const outputDir = '../../reports/e2e/dnd-mapp';

const isCI = Boolean(process.env['CI']);

let reporters: ReporterDescription[] = [['dot'], ['html', { outputFolder: outputDir }]];

if (isCI) {
    reporters = [...reporters, ['github']];
}

export default defineConfig({
    ...nxE2EPreset(__filename, { testDir: './src' }),
    use: {
        baseURL: baseURL,
        trace: 'on-first-retry',
    },
    outputDir: outputDir,
    reporter: [...reporters],
    webServer: {
        command: 'pnpm exec nx serve dnd-mapp -c http',
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
