import test from '@playwright/test';
import { SignUpPage } from '../../../pages/SignUpPage';

test.describe('Sign Up Page Tests', () => {
    let page: import('@playwright/test').Page;
    
    test.beforeEach(async ({ browser }) => {
        let context = await browser.newContext();
        page = await context.newPage();
    });
    
    test('should navigate to the sign up page and click the sign up button', async ({ }, testInfo) => {
        
        let signUpPage = new SignUpPage(page);
        await signUpPage.goto();

        await signUpPage.clickSignUp();
        
        await page.screenshot({ path: 'screenshots/T1-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T1-signup.png';
        await testInfo.attach('Sign Up Homepage', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        // Add assertions here to verify the expected behavior after clicking the sign up button
    });
});