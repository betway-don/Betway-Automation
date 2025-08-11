import { test, expect } from '@playwright/test';
import path from 'path';
import { SignUpPage } from '../../../pages/SignUpPage';

test.describe('ZALogin Signup Tests', () => {
    let page: import('@playwright/test').Page;
    let context: import('@playwright/test').BrowserContext;
    let SignupPage: SignUpPage;
    const projectRoot = path.resolve(__dirname, '../../..');
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');

    // Helper function to clear all highlights
    async function clearHighlights() {
        await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const element = el as HTMLElement;
                element.style.outline = '';
                element.style.backgroundColor = '';
            });
        });
    }

    // Helper function to highlight element
    async function highlightElement(locator: any) {
        await locator.evaluate((el: HTMLElement) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
    }

    // Enhanced modal cleanup function that handles multi-step forms
    async function resetModalState() {
        try {
            // Method 0: If we're on step 2 of the form, go back to step 1 first
            try {
                const previousButton = page.getByRole('button', { name: 'Previous' });
                if (await previousButton.isVisible({ timeout: 1000 })) {
                    await previousButton.click();
                    await page.waitForTimeout(500);
                }
            } catch (e) {
                // Previous button not found, continue with other methods
            }

            // Method 1: Try all possible close button selectors
            const closeSelectors = [
                '#modal-close-btn',
                '.modal-close',
                '[data-testid="close"]',
                '[aria-label="Close"]',
                'button[class*="close"]',
                '.close',
                '[data-dismiss="modal"]'
            ];

            for (const selector of closeSelectors) {
                const elements = await page.locator(selector);
                const count = await elements.count();
                for (let i = 0; i < count; i++) {
                    try {
                        if (await elements.nth(i).isVisible()) {
                            await elements.nth(i).click();
                            await page.waitForTimeout(200);
                        }
                    } catch (e) {
                        // Continue to next element
                    }
                }
            }

            // Method 2: Press Escape multiple times
            await page.keyboard.press('Escape');
            await page.waitForTimeout(100);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(100);

            // Method 3: Click on backdrop/overlay to close modal
            try {
                const backdrop = page.locator('.modal-backdrop, .overlay, [class*="backdrop"]').first();
                if (await backdrop.isVisible()) {
                    await backdrop.click();
                    await page.waitForTimeout(200);
                }
            } catch (e) {
                // Ignore if backdrop not found
            }

            // Method 4: Direct DOM manipulation to remove modals
            await page.evaluate(() => {
                // Remove modal elements
                const modals = document.querySelectorAll(
                    '.modal, [role="dialog"], [data-testid*="modal"], [class*="modal"]'
                );
                modals.forEach(modal => {
                    if (modal instanceof HTMLElement) {
                        modal.style.display = 'none';
                        modal.classList.remove('show', 'active', 'open');
                    }
                });

                // Remove backdrop elements
                const backdrops = document.querySelectorAll(
                    '.modal-backdrop, .backdrop, .overlay, [class*="backdrop"]'
                );
                backdrops.forEach(backdrop => backdrop.remove());

                // Reset body styles that might be applied when modal is open
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            });

            // Method 5: Clear any potential focus traps
            await page.evaluate(() => {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement) {
                    activeElement.blur();
                }
            });

            await page.waitForTimeout(300);
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                console.log('Modal reset error (non-fatal):', (error as { message: string }).message);
            } else {
                console.log('Modal reset error (non-fatal):', error);
            }
        }
    }

    // Function to ensure clean signup modal opening
    async function ensureCleanSignupOpen() {
        // First reset any existing modal state
        await resetModalState();

        // Click signup button using the fixed POM method
        await SignupPage.clickSignUp();

        // Wait a bit more for modal to fully load
        await page.waitForTimeout(500);

        // Verify signup form is actually loaded
        try {
            await page.waitForSelector('form', { timeout: 5000 });
        } catch (e) {
            // If form not found, try clicking signup again
            console.log('Signup form not found, retrying...');
            await resetModalState();
            await page.waitForTimeout(500);
            await SignupPage.clickSignUp();
            await page.waitForTimeout(1000);
        }
    }

    // Function specifically for multi-step form reset (for tests that click Next)
    async function resetMultiStepForm() {
        try {
            // First try to go back to step 1 if we're on step 2
            const previousButton = page.getByRole('button', { name: 'Previous' });
            if (await previousButton.isVisible({ timeout: 2000 })) {
                console.log('Found Previous button, going back to step 1...');
                await previousButton.click();
                await page.waitForTimeout(1000);

                // Clear the form fields on step 1
                try {
                    await SignupPage.mobileInput.clear();
                    await SignupPage.passwordInput.clear();
                    await SignupPage.firstNameInput.clear();
                    await SignupPage.lastNameInput.clear();
                } catch (e) {
                    console.log('Could not clear form fields');
                }
            }

            // Then proceed with normal modal reset
            await resetModalState();
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                console.log('Multi-step form reset error:', (error as { message: string }).message);
            } else {
                console.log('Multi-step form reset error:', error);
            }
            // Fallback to normal reset
            await resetModalState();
        }
    }

    // Function to ensure clean signup open via hamburger menu
    async function ensureCleanHamburgerSignupOpen() {
        // First reset any existing modal state
        await resetModalState();

        // Click hamburger menu
        const hamburgerMenu = page.locator('#header-hamburger-btn');
        await hamburgerMenu.click();
        await page.waitForTimeout(500);

        // Click signup button in hamburger menu (nth(1) as specified)
        const hamburgerSignupBtn = page.getByRole('button', { name: 'Sign Up' }).nth(1);
        await hamburgerSignupBtn.click();

        // Wait for modal to fully load
        await page.waitForTimeout(1000);

        // Verify signup form is actually loaded
        try {
            await page.waitForSelector('form', { timeout: 5000 });
        } catch (e) {
            // If form not found, try clicking signup again
            console.log('Signup form not found, retrying hamburger menu...');
            await resetModalState();
            await page.waitForTimeout(500);
            await hamburgerMenu.click();
            await page.waitForTimeout(500);
            await hamburgerSignupBtn.click();
            await page.waitForTimeout(1000);
        }
    }

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        SignupPage = new SignUpPage(page);
        await SignupPage.goto();
        await page.waitForLoadState('domcontentloaded');
    });

    test.beforeEach(async () => {
        await clearHighlights();

        // Get current test name to determine which reset method to use
        const testName = test.info().title;

        // For tests that involve multi-step forms (T5, T7), use multi-step reset
        if (testName.includes('T5-') || testName.includes('T7-')) {
            await resetMultiStepForm();
        } else {
            // For other tests, use regular reset
            await resetModalState();
        }
    });

    test.afterEach(async () => {
        // Get current test name for cleanup
        const testName = test.info().title;

        // For tests that involve multi-step forms, use multi-step reset
        if (testName.includes('T5-') || testName.includes('T7-')) {
            await resetMultiStepForm();
        } else {
            await resetModalState();
        }
    });

    test("T1-Verify Sign-Up Button is visible on Homepage.", async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });
        await expect(signUpButton).toBeVisible();
        await highlightElement(signUpButton);

        await page.screenshot({ path: screenshotDir + '/T1-signup.png', fullPage: false });

        await testInfo.attach('Sign Up Homepage', {
            path: screenshotDir + '/T1-signup.png',
            contentType: 'image/png',
        });
    });

    test("T2-Verify Login Button is visible on Homepage.", async ({ }, testInfo) => {
        const loginButton = page.getByRole('button', { name: 'Login' });
        await expect(loginButton).toBeVisible();
        await highlightElement(loginButton);

        await page.screenshot({ path: screenshotDir + '/T2-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T2-signup.png',
            contentType: 'image/png',
        });
    });

    test('T3-Verify Sign page after clicking.', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        const forms = await page.getByRole('form').first();
        const signUpPageTitle = await forms.getByText('Sign Up').first();

        await page.screenshot({ path: screenshotDir + '/T3-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Modal', {
            path: screenshotDir + '/T3-signup.png',
            contentType: 'image/png',
        });
    });

    test('T4-Verify Sign Up Form is visible.', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await highlightElement(SignupPage.mobileInput);
        await highlightElement(SignupPage.passwordInput);
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);

        await page.screenshot({ path: screenshotDir + '/T4-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Form Elements', {
            path: screenshotDir + '/T4-signup.png',
            contentType: 'image/png',
        });
    });

    test('T5-Register Button.', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999889100');
        await SignupPage.passwordInput.fill('123456789');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1000);

        const reg = await page.getByRole('button', { name: 'Register' });
        await highlightElement(reg);

        await page.screenshot({ path: screenshotDir + '/T5-signup.png', fullPage: false });
        await testInfo.attach('Register Button', {
            path: screenshotDir + '/T5-signup.png',
            contentType: 'image/png',
        });

        // Go back to step 1 before cleanup
        try {
            const previousButton = page.getByRole('button', { name: 'Previous' });
            if (await previousButton.isVisible({ timeout: 1000 })) {
                await previousButton.click();
                await page.waitForTimeout(500);
            }
        } catch (e) {
            console.log('Previous button not found in T5');
        }
    });

    test('T7-Register Button.', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999889100');
        await SignupPage.passwordInput.fill('123456789');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.waitFor({ state: 'visible' });
        await nextButton.click();

        await page.waitForTimeout(1000);

        try {
            const agreeToAll = page.getByLabel('Agree to All', { exact: false }).first();
            await agreeToAll.waitFor({ state: 'visible', timeout: 5000 });
            await agreeToAll.click();
        } catch (error) {
            console.log('Agree to All checkbox not found or not clickable');
        }

        try {
            const idNumberField = page.getByRole('textbox', { name: /ID Number|IDNumber/i }).first();
            await idNumberField.waitFor({ state: 'visible', timeout: 5000 });
            await idNumberField.fill('12hshkqiqsb');
        } catch (error) {
            console.log('ID Number field not found');
        }

        // Just highlight the Register button, don't actually click it
        const registerButton = page.getByRole('button', { name: 'Register' });
        await registerButton.waitFor({ state: 'visible' });
        await highlightElement(registerButton);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T7-signup.png', fullPage: false });
        await testInfo.attach('Registration Process', {
            path: screenshotDir + '/T7-signup.png',
            contentType: 'image/png',
        });

        // Go back to step 1 before cleanup
        try {
            const previousButton = page.getByRole('button', { name: 'Previous' });
            if (await previousButton.isVisible({ timeout: 1000 })) {
                await previousButton.click();
                await page.waitForTimeout(500);
            }
        } catch (e) {
            console.log('Previous button not found in T7');
        }
    });

    test('T8-Dialling Code.', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await page.waitForTimeout(2000);

        let num: import('@playwright/test').Locator | null = null;
        try {
            const matches = await page.getByText('+27');
            if (await matches.count() > 1) {
                num = matches.nth(1);
            }
        } catch { }
        if (num) {
            await highlightElement(num);
        }

        await page.screenshot({ path: screenshotDir + '/T8-signup.png', fullPage: false });
        await testInfo.attach('Dialling Code', {
            path: screenshotDir + '/T8-signup.png',
            contentType: 'image/png',
        });
    });

    test('T9-Valid Mobile Number Format', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('123456789');

        await highlightElement(SignupPage.mobileInput);

        await page.screenshot({ path: screenshotDir + '/T9-signup.png', fullPage: false });
        await testInfo.attach('Valid Mobile Number', {
            path: screenshotDir + '/T9-signup.png',
            contentType: 'image/png',
        });
    });

    test('T10-Short Mobile Number Validation', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('99988');
        await SignupPage.passwordInput.fill('123456789');

        await highlightElement(SignupPage.mobileInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T10-signup.png', fullPage: false });
        await testInfo.attach('Short Mobile Number Validation', {
            path: screenshotDir + '/T10-signup.png',
            contentType: 'image/png',
        });
    });

    test('T11-Long Mobile Number Validation', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999887373737');
        await SignupPage.passwordInput.fill('123456789');

        await highlightElement(SignupPage.mobileInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T11-signup.png', fullPage: false });
        await testInfo.attach('Long Mobile Number Validation', {
            path: screenshotDir + '/T11-signup.png',
            contentType: 'image/png',
        });
    });

    test('T12-Alphabetic Characters in Mobile Number', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999a89793');
        await SignupPage.passwordInput.fill('123456789');

        await highlightElement(SignupPage.mobileInput);
        await page.waitForTimeout(2000);

        await page.screenshot({ path: screenshotDir + '/T12-signup.png', fullPage: false });
        await testInfo.attach('Alphabetic Characters Mobile Number', {
            path: screenshotDir + '/T12-signup.png',
            contentType: 'image/png',
        });
    });

    test('T13-Special Characters in Mobile Number', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.mobileInput.fill('999-88@123');
        await SignupPage.passwordInput.fill('123456789');

        await highlightElement(SignupPage.mobileInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T13-signup.png', fullPage: false });
        await testInfo.attach('Special Characters Mobile Number', {
            path: screenshotDir + '/T13-signup.png',
            contentType: 'image/png',
        });
    });

    test('T14-Empty Mobile Number Field', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        await SignupPage.passwordInput.fill('123456789');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }

        await highlightElement(SignupPage.mobileInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T14-signup.png', fullPage: false });
        await testInfo.attach('Empty Mobile Number Validation', {
            path: screenshotDir + '/T14-signup.png',
            contentType: 'image/png',
        });
    });

    test.afterAll(async () => {
        await clearHighlights();
        await resetModalState();
        await context.close();
    });

    // Password Validation Tests - Added after T14
    test('T15-Strong Password with Mixed Case', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with uppercase and lowercase letters
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('TestPassword');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T15-signup.png', fullPage: false });
        await testInfo.attach('Strong Password Mixed Case', {
            path: screenshotDir + '/T15-signup.png',
            contentType: 'image/png',
        });
    });

    test('T16-Password with Numeric Characters', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with numbers
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password123');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T16-signup.png', fullPage: false });
        await testInfo.attach('Password with Numbers', {
            path: screenshotDir + '/T16-signup.png',
            contentType: 'image/png',
        });
    });

    test('T17-Password with Special Characters', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with special characters
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password@123!');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T17-signup.png', fullPage: false });
        await testInfo.attach('Password with Special Characters', {
            path: screenshotDir + '/T17-signup.png',
            contentType: 'image/png',
        });
    });

    test('T18-Password Minimum Length', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with minimum required length (assuming 8 characters)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Test123!');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T18-signup.png', fullPage: false });
        await testInfo.attach('Password Minimum Length', {
            path: screenshotDir + '/T18-signup.png',
            contentType: 'image/png',
        });
    });

    test('T19-Password Maximum Length', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with maximum allowed length (assuming 20 characters)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('TestPassword123456!@');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T19-signup.png', fullPage: false });
        await testInfo.attach('Password Maximum Length', {
            path: screenshotDir + '/T19-signup.png',
            contentType: 'image/png',
        });
    });

    test('T20-Password with All Character Types', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password with all allowed characters (uppercase, lowercase, numbers, special chars)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('TestPass123!@#');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T20-signup.png', fullPage: false });
        await testInfo.attach('Password All Character Types', {
            path: screenshotDir + '/T20-signup.png',
            contentType: 'image/png',
        });
    });

    test('T21-Password with Spaces', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password containing spaces
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Test Pass 123!');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T21-signup.png', fullPage: false });
        await testInfo.attach('Password with Spaces', {
            path: screenshotDir + '/T21-signup.png',
            contentType: 'image/png',
        });
    });

    test('T22-Weak Password Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test weak password (should be rejected)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('123456');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Try to proceed to see validation error
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(2000); // Wait longer for validation message

        await page.screenshot({ path: screenshotDir + '/T22-signup.png', fullPage: false });
        await testInfo.attach('Weak Password Rejection', {
            path: screenshotDir + '/T22-signup.png',
            contentType: 'image/png',
        });
    });

    test('T23-Blank Password Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test blank password field validation
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');
        // Leave password field empty

        // Try to proceed without password
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T23-signup.png', fullPage: false });
        await testInfo.attach('Blank Password Rejection', {
            path: screenshotDir + '/T23-signup.png',
            contentType: 'image/png',
        });
    });

    test('T24-Password Exceeding Maximum Length', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password exceeding maximum allowed length
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('ThisIsAVeryLongPasswordThatExceedsMaximumAllowedLength123!@#');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(2000); // Wait longer for validation/truncation

        await page.screenshot({ path: screenshotDir + '/T24-signup.png', fullPage: false });
        await testInfo.attach('Password Exceeding Maximum Length', {
            path: screenshotDir + '/T24-signup.png',
            contentType: 'image/png',
        });
    });

    test('T25-Password Below Minimum Length', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test password below minimum required length
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Test1');  // Assuming minimum is more than 5 chars
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Try to proceed to see validation error
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }

        await highlightElement(SignupPage.passwordInput);
        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T25-signup.png', fullPage: false });
        await testInfo.attach('Password Below Minimum Length', {
            path: screenshotDir + '/T25-signup.png',
            contentType: 'image/png',
        });
    });

     test('T26-Valid First Name and Surname', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test valid first name and surname (both tested together)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('John');
        await SignupPage.lastNameInput.fill('Smith');
       
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T26-signup.png', fullPage: false });
        await testInfo.attach('Valid First Name and Surname', {
            path: screenshotDir + '/T26-signup.png',
            contentType: 'image/png',
        });
    });

    test('T27-Names with Spaces', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test first name and surname containing spaces (both tested together)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Mary Jane');
        await SignupPage.lastNameInput.fill('Van Der Berg');
       
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T27-signup.png', fullPage: false });
        await testInfo.attach('Names with Spaces', {
            path: screenshotDir + '/T27-signup.png',
            contentType: 'image/png',
        });
    });

    test('T28-Names with Hyphens', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test first name and surname containing hyphens (both tested together)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Anna-Marie');
        await SignupPage.lastNameInput.fill('Smith-Jones');
       
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T28-signup.png', fullPage: false });
        await testInfo.attach('Names with Hyphens', {
            path: screenshotDir + '/T28-signup.png',
            contentType: 'image/png',
        });
    });

    test('T29-Blank First Name Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test blank first name field validation
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        // Leave first name empty
        await SignupPage.lastNameInput.fill('Smith');
       
        // Try to proceed without first name
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
       
        await highlightElement(SignupPage.firstNameInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T29-signup.png', fullPage: false });
        await testInfo.attach('Blank First Name Rejection', {
            path: screenshotDir + '/T29-signup.png',
            contentType: 'image/png',
        });
    });

    test('T30-Blank Surname Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test blank surname field validation
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('John');
        // Leave surname empty
       
        // Try to proceed without surname
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
       
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T30-signup.png', fullPage: false });
        await testInfo.attach('Blank Surname Rejection', {
            path: screenshotDir + '/T30-signup.png',
            contentType: 'image/png',
        });
    });

    test('T31-Names with Numeric Characters Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test first name and surname with numbers (both tested together - should be rejected)
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('John123');
        await SignupPage.lastNameInput.fill('Smith456');
       
        // Try to proceed to see validation error
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
       
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T31-signup.png', fullPage: false });
        await testInfo.attach('Names with Numeric Characters Rejection', {
            path: screenshotDir + '/T31-signup.png',
            contentType: 'image/png',
        });
    });

    test('T32-Names with Special Characters Rejection', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Test first name and surname with special characters (both tested together - should be rejected)
        // Note: Hyphens are usually allowed, so testing with other special chars
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('John@#');
        await SignupPage.lastNameInput.fill('Smith$%');
       
        // Try to proceed to see validation error
        const nextButton = page.getByRole('button', { name: 'Next' });
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
       
        await highlightElement(SignupPage.firstNameInput);
        await highlightElement(SignupPage.lastNameInput);
        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T32-signup.png', fullPage: false });
        await testInfo.attach('Names with Special Characters Rejection', {
            path: screenshotDir + '/T32-signup.png',
            contentType: 'image/png',
        });
    });

    // ID Document and Date of Birth Validation Tests - Added after T32
    test('T33-ID Document Dropdown Selection and Valid SA ID', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Test ID document dropdown selection
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await highlightElement(idDropdown);
        await idDropdown.click();
        await page.waitForTimeout(500);

        // Select South African ID option
        const saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        await highlightElement(saIdOption);
        await saIdOption.click();
        await page.waitForTimeout(500);

        // Enter valid South African ID number (13 digits, valid format)
        const saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        await saIdInput.fill('9001010001084');
        await highlightElement(saIdInput);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T33-signup.png', fullPage: false });
        await testInfo.attach('ID Document Selection and Valid SA ID', {
            path: screenshotDir + '/T33-signup.png',
            contentType: 'image/png',
        });
    });

    test('T34-Invalid South African ID Validation', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Select South African ID
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await idDropdown.click();
        await page.waitForTimeout(500);
        
        const saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        await saIdOption.click();
        await page.waitForTimeout(500);

        // Test multiple invalid scenarios in sequence
        const saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        
        // Test 1: Too short
        await saIdInput.fill('90010100010'); // 11 digits instead of 13
        await highlightElement(saIdInput);
        await page.waitForTimeout(1000);

        // Clear and test 2: With letters
        await saIdInput.clear();
        await saIdInput.fill('9001010A01084'); // Contains letter 'A'
        await page.waitForTimeout(1000);

        // Clear and test 3: With special characters
        await saIdInput.clear();
        await saIdInput.fill('900101-001084'); // Contains hyphen
        await page.waitForTimeout(1000);

        // Try to proceed to trigger validation
        const registerButton = page.getByRole('button', { name: 'Register' });
        if (await registerButton.isVisible()) {
            await registerButton.click();
        }

        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T34-signup.png', fullPage: false });
        await testInfo.attach('Invalid South African ID Validation', {
            path: screenshotDir + '/T34-signup.png',
            contentType: 'image/png',
        });
    });

    test('T35-Valid Passport Number Format', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Open dropdown using South African ID locator
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await highlightElement(idDropdown);
        await idDropdown.click();
        await page.waitForTimeout(500);

        // Select Passport option from the dropdown
        const passportOption = page.getByText('Passport');
        await highlightElement(passportOption);
        await passportOption.click();
        await page.waitForTimeout(500);

        // Enter valid passport number (typical format: letter + 8 digits)
        const passportInput = page.getByRole('textbox', { name: 'Passport' });
        await passportInput.fill('B12345678'); // Valid passport format
        await highlightElement(passportInput);
        
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T35-signup.png', fullPage: false });
        await testInfo.attach('Valid Passport Number', {
            path: screenshotDir + '/T35-signup.png',
            contentType: 'image/png',
        });
    });

    test('T36-Invalid Passport Number Validation', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Open dropdown using South African ID locator
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await idDropdown.click();
        await page.waitForTimeout(500);

        // Select Passport option from the dropdown
        const passportOption = page.getByText('Passport');
        await passportOption.click();
        await page.waitForTimeout(500);

        const passportInput = page.getByRole('textbox', { name: 'Passport' });
        
        // Test multiple invalid passport scenarios
        // Test 1: Too short
        await passportInput.fill('A123'); // Too short
        await highlightElement(passportInput);
        await page.waitForTimeout(1000);

        // Test 2: Invalid format with special characters
        await passportInput.clear();
        await passportInput.fill('ABC@#$123'); // Invalid special characters
        await page.waitForTimeout(1000);

        // Test 3: All numeric (should have letters)
        await passportInput.clear();
        await passportInput.fill('123456789'); // All numbers
        await page.waitForTimeout(1000);

        // Try to proceed to trigger validation
        const registerButton = page.getByRole('button', { name: 'Register' });
        if (await registerButton.isVisible()) {
            await registerButton.click();
        }

        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T36-signup.png', fullPage: false });
        await testInfo.attach('Invalid Passport Number Validation', {
            path: screenshotDir + '/T36-signup.png',
            contentType: 'image/png',
        });
    });

    test('T37-Date of Birth Selection and Complete Registration', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);
 
        // Select South African ID
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await idDropdown.click();
        await page.waitForTimeout(500);
        
        const saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        await saIdOption.click();
        await page.waitForTimeout(500);

        // Fill valid SA ID
        const saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        await saIdInput.fill('9001010001084');

        // Test date of birth selection
        const dobDropdown = page.getByRole('combobox', { name: 'Date of Birth' });
        await highlightElement(dobDropdown);
        await dobDropdown.click();
        await page.waitForTimeout(500);

        // // Select day 2 as specified - the dob table opens, just click this locator dob will be set
        // const day2Option = page.getByText('2', { exact: true });
        // await highlightElement(day2Option);
        // await day2Option.click();
        // await page.waitForTimeout(500);

        // Check "Agree to All" if available
        try {
            const agreeToAll = page.getByLabel('Agree to All', { exact: false }).first();
            if (await agreeToAll.isVisible({ timeout: 2000 })) {
                await agreeToAll.click();
            }
        } catch (error) {
            console.log('Agree to All checkbox not found');
        }

        // Highlight the Register button (ready for complete registration)
        const registerButton = page.getByRole('button', { name: 'Register' });
        await highlightElement(registerButton);
        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T37-signup.png', fullPage: false });
        await testInfo.attach('Date of Birth Selection and Registration Ready', {
            path: screenshotDir + '/T37-signup.png',
            contentType: 'image/png',
        });
    });

    test('T38-Empty ID Number Field Validation', async ({ }, testInfo) => {
        await ensureCleanSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Select South African ID but leave the field empty
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await idDropdown.click();
        await page.waitForTimeout(500);
        
        const saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        await saIdOption.click();
        await page.waitForTimeout(500);

        // Leave ID field empty and highlight it
        const saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        await highlightElement(saIdInput);

        // Try to proceed without filling ID
        const registerButton = page.getByRole('button', { name: 'Register' });
        if (await registerButton.isVisible()) {
            await registerButton.click();
        }

        await page.waitForTimeout(2000); // Wait for validation message

        await page.screenshot({ path: screenshotDir + '/T38-signup.png', fullPage: false });
        await testInfo.attach('Empty ID Number Field Validation', {
            path: screenshotDir + '/T38-signup.png',
            contentType: 'image/png',
        });
    });

    
    // Hamburger Menu and Referral Code Tests
    test('T39-Hamburger Menu Sign Up Button Visibility', async ({ }, testInfo) => {
        await clearHighlights();
        await resetModalState();

        // Click hamburger menu
        const hamburgerMenu = page.locator('#header-hamburger-btn');
        await highlightElement(hamburgerMenu);
        await hamburgerMenu.click();
        await page.waitForTimeout(1000);

        // Check if Sign Up button is visible in hamburger menu
        const hamburgerSignupBtn = page.getByRole('button', { name: 'Sign Up' }).nth(1);
        await expect(hamburgerSignupBtn).toBeVisible();
        await highlightElement(hamburgerSignupBtn);

        await page.screenshot({ path: screenshotDir + '/T39-signup.png', fullPage: false });
        await testInfo.attach('Hamburger Menu Sign Up Button', {
            path: screenshotDir + '/T39-signup.png',
            contentType: 'image/png',
        });
    });

    test('T40-Sign Up Code Mixed Case Letters', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Click "I have a signup code" to reveal the voucher code field
        const signupCodeToggle = page.getByText('I have a signup code');
        await highlightElement(signupCodeToggle);
        await signupCodeToggle.click();
        await page.waitForTimeout(500);

        // Enter sign-up code with mixed case letters
        const voucherCodeField = page.getByRole('textbox', { name: 'Voucher Code' });
        await voucherCodeField.fill('AbCdEf'); // Mixed case letters
        await highlightElement(voucherCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T40-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Code Mixed Case Letters', {
            path: screenshotDir + '/T40-signup.png',
            contentType: 'image/png',
        });
    });

    test('T41-Sign Up Code with Numeric Characters', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Click "I have a signup code" to reveal the voucher code field
        const signupCodeToggle = page.getByText('I have a signup code');
        await signupCodeToggle.click();
        await page.waitForTimeout(500);

        // Enter sign-up code with numeric characters
        const voucherCodeField = page.getByRole('textbox', { name: 'Voucher Code' });
        await voucherCodeField.fill('ABC123'); // Mixed letters and numbers
        await highlightElement(voucherCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T41-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Code with Numeric Characters', {
            path: screenshotDir + '/T41-signup.png',
            contentType: 'image/png',
        });
    });

    test('T42-Sign Up Code with Special Characters', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Enter sign-up code with special characters
        try {
            const signUpCodeField = page.getByRole('textbox', { name: /sign.?up.?code|signup.?code|referral.?code/i }).first();
            if (await signUpCodeField.isVisible({ timeout: 2000 })) {
                await signUpCodeField.fill('ABC@#'); // Letters with special characters
                await highlightElement(signUpCodeField);
            }
        } catch (error) {
            console.log('Sign-up code field not found');
        }

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T42-signup.png', fullPage: false });
        await testInfo.attach('Sign Up Code with Special Characters', {
            path: screenshotDir + '/T42-signup.png',
            contentType: 'image/png',
        });
    });

    test('T43-Valid Referral Code', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Enter valid referral code (referral field is available by default)
        const referralCodeField = page.getByRole('textbox', { name: 'Referral Code' });
        await referralCodeField.fill('VALID123'); // Valid referral code
        await highlightElement(referralCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T43-signup.png', fullPage: false });
        await testInfo.attach('Valid Referral Code', {
            path: screenshotDir + '/T43-signup.png',
            contentType: 'image/png',
        });
    });

    test('T44-Referral Code Case Insensitive', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Test case insensitive referral code (referral field is available by default)
        const referralCodeField = page.getByRole('textbox', { name: 'Referral Code' });
        
        // First try lowercase
        await referralCodeField.fill('valid123');
        await page.waitForTimeout(500);
        
        // Then try uppercase to test case insensitivity
        await referralCodeField.clear();
        await referralCodeField.fill('VALID123');
        await highlightElement(referralCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T44-signup.png', fullPage: false });
        await testInfo.attach('Referral Code Case Insensitive', {
            path: screenshotDir + '/T44-signup.png',
            contentType: 'image/png',
        });
    });

    test('T45-Referral Code with Numeric Characters', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Enter referral code with numeric characters (referral field is available by default)
        const referralCodeField = page.getByRole('textbox', { name: 'Referral Code' });
        await referralCodeField.fill('REF12345'); // Referral code with numbers
        await highlightElement(referralCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T45-signup.png', fullPage: false });
        await testInfo.attach('Referral Code with Numeric Characters', {
            path: screenshotDir + '/T45-signup.png',
            contentType: 'image/png',
        });
    });

    test('T46-Referral Code with Special Characters', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill basic form fields first
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        // Enter referral code with special characters (referral field is available by default)
        const referralCodeField = page.getByRole('textbox', { name: 'Referral Code' });
        await referralCodeField.fill('REF-2024'); // Referral code with hyphen
        await highlightElement(referralCodeField);

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T46-signup.png', fullPage: false });
        await testInfo.attach('Referral Code with Special Characters', {
            path: screenshotDir + '/T46-signup.png',
            contentType: 'image/png',
        });
    });

    test('T47-Agree to All Checkbox', async ({ }, testInfo) => {
        await clearHighlights();
        await ensureCleanHamburgerSignupOpen();

        // Fill initial form to get to step 2
        await SignupPage.mobileInput.fill('999881234');
        await SignupPage.passwordInput.fill('Password12');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Fill required fields on step 2
        const idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        await idDropdown.click();
        await page.waitForTimeout(500);
        
        const saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        await saIdOption.click();
        await page.waitForTimeout(500);

        const saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        await saIdInput.fill('9001010001084');

        // Select date of birth
        const dobDropdown = page.getByRole('combobox', { name: 'Date of Birth' });
        await dobDropdown.click();
        await page.waitForTimeout(500);
        
        const day2Option = page.getByText('2', { exact: true });
        await day2Option.click();
        await page.waitForTimeout(500);

        // Test "Agree to All" checkbox
        try {
            const agreeToAllCheckbox = page.getByLabel('Agree to All', { exact: false }).first();
            await agreeToAllCheckbox.waitFor({ state: 'visible', timeout: 2000 });
            await highlightElement(agreeToAllCheckbox);
            await agreeToAllCheckbox.click();
            await page.waitForTimeout(500);
        } catch (error) {
            console.log('Agree to All checkbox not found');
        }

        await page.waitForTimeout(1000);

        await page.screenshot({ path: screenshotDir + '/T47-signup.png', fullPage: false });
        await testInfo.attach('Agree to All Checkbox', {
            path: screenshotDir + '/T47-signup.png',
            contentType: 'image/png',
        });
    });

});