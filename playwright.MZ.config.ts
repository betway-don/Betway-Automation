import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
<<<<<<< HEAD
    testDir: './src/regions/MZ/tests',
    fullyParallel: true,
    timeout: 200000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 5 : 5,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']
        // ['allure-playwright', { outputFolder: 'src/regions/MZ/reports/allure-results' }]
=======
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
>>>>>>> a372caf0bd573bd275c0bff4f27fe5b3d864cb00
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
