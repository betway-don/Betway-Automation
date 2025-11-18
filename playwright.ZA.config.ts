// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './src/regions/ZA/tests',
//   fullyParallel: true,
//   timeout: 26000000,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 6 : 6,
//   reporter: [
//     ['html', { outputFolder: 'src/regions/ZA/reports/html-report' }],
//     ['allure-playwright', { outputFolder: 'src/regions/ZA/reports/allure-results' }]
//   ],
//   use: {
//     //  storageState: 'src/regions/ZA/tests/modules/betslip/auth.json',
//     baseURL: 'http://za.example.com', // Set region-specific baseURL if needed
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//     // Store screenshots in region/module folders manually in test code if needed
//   },
//   projects: [
//     {
//       name:'Google Chrome',
//       use: { ...devices['Desktop Chrome'] },
//     }
//     // {
//     //   name: 'chromium',
//     //   use: { ...devices['Desktop Chrome'] },
//     // },
//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },
//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },
//   ],
// });
import { defineConfig, devices } from '@playwright/test';
 
 
export default defineConfig({
  testDir: './src/regions/ZA/tests',
  fullyParallel: true,
  timeout: 200000,  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 5 : 5,
  reporter: [
    ['html', { outputFolder: 'src/regions/ZA/reports/html-report',open: 'never' }],
    ['allure-playwright', { outputFolder: 'src/regions/ZA/reports/allure-results' }]
  ],
  use: {
    baseURL: 'https://new.betway.co.za/',
    viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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
 
