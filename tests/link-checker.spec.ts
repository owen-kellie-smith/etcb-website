import { test, expect } from '@playwright/test';


test('internal links and assets are valid', async ({ page }) => {
  const visited = new Set<string>();
  const queue = ['/'];

  while (queue.length) {
    const path = queue.pop()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    expect(response, `No response for ${path}`).not.toBeNull();
    expect(response!.status(), `Bad status for ${path}`).toBeLessThan(400);

    const hrefs = await page.$$eval('a[href], img[src]', els =>
      els.map(el => el.getAttribute(el.tagName === 'IMG' ? 'src' : 'href')).filter(Boolean)
    );

    for (const raw of hrefs as string[]) {
      if (
        raw.startsWith('#') ||
        raw.startsWith('mailto:') ||
        raw.startsWith('tel:') ||
        raw.startsWith('javascript:')
      ) continue;

      const url = new URL(raw, page.url());

      // stay inside this site
      if (url.origin !== new URL(page.url()).origin) continue;

      const next = url.pathname;

      if (next.endsWith('.html') || next === '/') {
        if (!visited.has(next)) queue.push(next);
      } else {
        const asset = await page.request.get(next);
        expect(asset.status(), `Bad asset: ${next}`).toBeLessThan(400);
      }
    }
  }
});
