import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'desktop-chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-webkit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'iphone-13',
      use: {
        ...devices['iPhone 13'],
      },
    }
  ],

  webServer: {
    command: 'npm start',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
