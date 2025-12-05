import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/regions/MZ/tests',
    fullyParallel: true,
    timeout: 200000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 3 : 3,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']
        // ['allure-playwright', { outputFolder: 'src/regions/MZ/reports/allure-results' }]
    ],
    use: {
        baseURL: 'https://en.betway.co.mz/sport/soccer',
        viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
        launchOptions: {
            args: ['--start-maximized'],
        },
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
