import { test, expect } from '@playwright/test';

const hashPages = [
  { path: '/',            hash: '',           label: 'latest'    },
  { path: '/#about',      hash: '#about',     label: 'about'     },
  { path: '/#contact',    hash: '#contact',   label: 'contact'   },
  { path: '/#membership',    hash: '#membership',   label: 'membership'   },
];

for (const { path, label } of hashPages) {
  test(`${label} page loads via hash route`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
//    await expect(page.locator('#main-content')).not.toBeEmpty();
  });
}


