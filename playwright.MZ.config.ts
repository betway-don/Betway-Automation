import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/regions/MZ/tests',

  fullyParallel: true,
  timeout: 90000,

  forbidOnly: !!process.env.CI,

  // 👉 Retry ONLY failed tests once
  retries: 1,

  // Workers
  workers: process.env.CI ? 3 : 3,

  // Reports (same as ZA & GH style)
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    [
      'json',
      {
        outputFile: path.resolve(
          __dirname,
          'src/regions/MZ/reports',
          process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json'
        ),
      },
    ],
    [
      'allure-playwright',
      {
        resultsDir: path.resolve(
          __dirname,
          'src/regions/MZ/reports/allure-results'
        ),
      },
    ],
  ],

  use: {
    baseURL: 'https://en.betway.co.mz/sport/soccer',

    // Real browser window size
    viewport: null,
    deviceScaleFactor: undefined,

    launchOptions: {
      args: ['--start-maximized'],
    },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    actionTimeout: 60000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'MZ Region',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
