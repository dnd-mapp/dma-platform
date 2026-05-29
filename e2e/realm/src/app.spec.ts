import { expect, test } from '@playwright/test';

test('app loads', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/');
    expect(await page.textContent('p')).toEqual('root works!');
});
