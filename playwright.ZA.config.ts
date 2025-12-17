import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/regions/ZA/tests',
  fullyParallel: true,
  timeout: 200000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 3,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json' }]
  ],
  use: {
    baseURL: 'https://new.betway.co.za/',
    viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    actionTimeout: 120000,      // any single action (click, fill, etc.) will fail after 2 min
    navigationTimeout: 120000,  // navigation waits will fail after 2 min
  },

  projects: [
    {
      name: 'ZA Region',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      }
    },
  ],
});

