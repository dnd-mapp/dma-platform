import { expect, test } from '@playwright/test';

const isCI = !!process.env.CI;

test.describe('cache headers', () => {
    test('index.html is served with no-cache headers', async ({ request }) => {
        test.skip(!isCI, 'nginx cache headers are only present in the Docker stack');
        const response = await request.get('/index.html');
        expect(response.headers()['cache-control']).toBe('no-cache, no-store, must-revalidate');
    });

    test('config.json is served with no-cache headers', async ({ request }) => {
        test.skip(!isCI, 'nginx cache headers are only present in the Docker stack');
        const response = await request.get('/config.json');
        expect(response.headers()['cache-control']).toBe('no-cache, no-store, must-revalidate');
    });

    test('hashed JS and CSS assets are served with immutable cache headers', async ({ page }) => {
        test.skip(!isCI, 'nginx cache headers are only present in the Docker stack');

        const assetResponses: import('@playwright/test').Response[] = [];
        page.on('response', (resp) => {
            if (/\.(js|css)(\?|$)/.test(resp.url())) assetResponses.push(resp);
        });

        await page.goto('/');

        expect(assetResponses.length).toBeGreaterThan(0);
        for (const resp of assetResponses) {
            expect(resp.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
        }
    });
});
