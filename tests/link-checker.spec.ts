import { test, expect } from '@playwright/test';

test('internal html links are not broken', async ({ page }) => {
  const visited = new Set<string>();
  const queue = ['/'];

  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);

    const hrefs = await page.locator('a[href]').evaluateAll(links =>
      links.map(a => a.getAttribute('href')).filter(Boolean)
    );

    for (const href of hrefs as string[]) {
      if (
        href.startsWith('/') ||
        href.endsWith('.html')
      ) {
        if (!href.startsWith('http') && !href.startsWith('#') && !visited.has(href)) {
          queue.push(href.startsWith('/') ? href : `/${href}`);
        }
      }
    }
  }
});
