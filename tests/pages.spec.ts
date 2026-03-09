import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/about.html',
  '/contact.html',
  '/leader.html',
  '/conductor.html',
  '/charter.html'
];

for (const path of pages) {
  test(`${path} loads`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
  });
}
