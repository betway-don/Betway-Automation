import test from '@playwright/test';
import { SignUpPage } from '../../../pages/SignUpPage';
import fs from 'fs';
import path from 'path';

// Resolve to project root, regardless of where the script is run

test.describe('Sign Up Page Tests', () => {
    let page: import('@playwright/test').Page;

    test.beforeEach(async ({ browser }) => {
        let context = await browser.newContext();
        page = await context.newPage();
    });

    test('should navigate to the sign up page and click the sign up button', async ({ }, testInfo) => {

        let signUpPage = new SignUpPage(page);
        
        const projectRoot = path.resolve(__dirname, '../../..');
        const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');
        
        await page.screenshot({ path: screenshotDir + '/T1-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Homepage', {
            path: screenshotDir + '/T1-signup.png',
            contentType: 'image/png',
        });
        await signUpPage.goto();
        await signUpPage.clickSignUp();
        // Add assertions here to verify the expected behavior after clicking the sign up button
    });
});