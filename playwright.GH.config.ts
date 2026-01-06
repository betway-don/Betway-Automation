import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/regions/GH/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,
  timeout: 200000,
  reporter: [
    ['html', { outputFolder: 'src/regions/GH/reports/html-report' }],
    ['allure-playwright', { outputFolder: 'src/regions/GH/reports/allure-results' }]
  ],
  use: {
    baseURL: 'https://www.betway.com.gh/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'GH Region',
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
