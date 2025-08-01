import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/regions/GH/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'src/regions/GH/reports/html-report' }],
    ['allure-playwright', { outputFolder: 'src/regions/GH/reports/allure-results' }]
  ],
  use: {
    // baseURL: 'http://gh.example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
