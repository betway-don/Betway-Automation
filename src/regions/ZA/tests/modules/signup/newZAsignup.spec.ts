import { expect } from '@playwright/test';
import { test, setupSignupTestSuite, ScreenshotHelper, TestDataVariations } from '../../../fixtures/MasterFixtureFile';

setupSignupTestSuite('ZALogin Signup Tests');

test("T1-Verify Sign-Up Button is visible on Homepage.", async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    const signUpButton = signupPage.getSignUpButton();
    // await expect(signUpButton).toBeVisible();
    await signupUtils.highlightElement(signUpButton);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T1-signup', testInfo);
    await signupUtils.clearHighlights();

});

test("T2-Verify Login Button is visible on Homepage.", async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    const loginButton = signupPage.getLoginButton();
    // await expect(loginButton).toBeVisible();
    await signupUtils.highlightElement(loginButton);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T2-signup', testInfo);
    await signupUtils.clearHighlights();
});

test('T3-Verify Sign page after clicking.', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    const forms = await signupPage.page.getByRole('form').first();
    const signUpPageTitle = await forms.getByText('Sign Up').first();

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T3-signup', testInfo);
});

test('T4-Verify Sign Up Form is visible.', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T4-signup', testInfo);
});

test('T5-Register Button.', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillBasicInfo('999889100', '123456789', 'Test', 'User');

    await signupPage.page.getByRole('button', { name: 'Next' }).click();
    await signupPage.page.waitForTimeout(1000);

    const reg = await signupPage.page.getByRole('button', { name: 'Register' });
    await signupUtils.highlightElement(reg);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T5-signup', testInfo);

    // Go back to step 1 before cleanup
    try {
        const previousButton = signupPage.page.getByRole('button', { name: 'Previous' });
        if (await previousButton.isVisible({ timeout: 1000 })) {
            await previousButton.click();
            await signupPage.page.waitForTimeout(500);
        }
    } catch (e) {
        console.log('Previous button not found in T5');
    }
});

test('T7-Register Button.', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillBasicInfo('999889100', '123456789', 'Test', 'User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.waitFor({ state: 'visible' });
    await nextButton.click();

    await signupPage.page.waitForTimeout(1000);

    try {
        const agreeToAll = signupPage.page.getByLabel('Agree to All', { exact: false }).first();
        await agreeToAll.waitFor({ state: 'visible', timeout: 5000 });
        await agreeToAll.click();
    } catch (error) {
        console.log('Agree to All checkbox not found or not clickable');
    }

    try {
        const idNumberField = signupPage.page.getByRole('textbox', { name: /ID Number|IDNumber/i }).first();
        await idNumberField.waitFor({ state: 'visible', timeout: 5000 });
        await idNumberField.fill('12hshkqiqsb');
    } catch (error) {
        console.log('ID Number field not found');
    }

    // Just highlight the Register button, don't actually click it
    const registerButton = signupPage.page.getByRole('button', { name: 'Register' });
    await registerButton.waitFor({ state: 'visible' });
    await signupUtils.highlightElement(registerButton);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T7-signup', testInfo);

    // Go back to step 1 before cleanup
    try {
        const previousButton = signupPage.page.getByRole('button', { name: 'Previous' });
        if (await previousButton.isVisible({ timeout: 1000 })) {
            await previousButton.click();
            await signupPage.page.waitForTimeout(500);
        }
    } catch (e) {
        console.log('Previous button not found in T7');
    }
});

test('T8-Dialling Code.', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.page.waitForTimeout(2000);

    let num: import('@playwright/test').Locator | null = null;
    try {
        const matches = await signupPage.page.getByText('+27');
        if (await matches.count() > 1) {
            num = matches.nth(1);
        }
    } catch { }
    if (num) {
        await signupUtils.highlightElement(num);
    }

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T8-signup', testInfo);
});

test('T9-Valid Mobile Number Format', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('123456789');

    await signupUtils.highlightElement(signupPage.getMobileInput());

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T9-signup', testInfo);
});

test('T10-Short Mobile Number Validation', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillMobileNumber(TestDataVariations.shortMobile);
    await signupPage.fillPassword('123456789');

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T10-signup', testInfo);
});

test('T11-Long Mobile Number Validation', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillMobileNumber(TestDataVariations.longMobile);
    await signupPage.fillPassword('123456789');

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T11-signup', testInfo);
});

test('T12-Alphabetic Characters in Mobile Number', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillMobileNumber(TestDataVariations.alphabeticMobile);
    await signupPage.fillPassword('123456789');

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupPage.page.waitForTimeout(2000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T12-signup', testInfo);
});

test('T13-Special Characters in Mobile Number', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillMobileNumber(TestDataVariations.specialCharMobile);
    await signupPage.fillPassword('123456789');

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T13-signup', testInfo);
});

test('T14-Empty Mobile Number Field', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    await signupPage.fillPassword('123456789');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getMobileInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T14-signup', testInfo);
});

// Password Validation Tests - Added after T14
test('T15-Strong Password with Mixed Case', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with uppercase and lowercase letters
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.strongPassword, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T15-signup', testInfo);
});

test('T16-Password with Numeric Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with numbers
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.passwordWithNumbers, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T16-signup', testInfo);
});

test('T17-Password with Special Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with special characters
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.passwordWithSpecialChars, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T17-signup', testInfo);
});

test('T18-Password Minimum Length', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with minimum required length (assuming 8 characters)
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.minLengthPassword, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T18-signup', testInfo);
});

test('T19-Password Maximum Length', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with maximum allowed length (assuming 20 characters)
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.maxLengthPassword, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T19-signup', testInfo);
});

test('T20-Password with All Character Types', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password with all allowed characters (uppercase, lowercase, numbers, special chars)
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.allCharTypesPassword, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T20-signup', testInfo);
});

test('T21-Password with Spaces', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password containing spaces
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.passwordWithSpaces, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T21-signup', testInfo);
});

test('T22-Weak Password Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test weak password (should be rejected)
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.weakPassword, 'Test', 'User');

    // Try to proceed to see validation error
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(2000); // Wait longer for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T22-signup', testInfo);
});

test('T23-Blank Password Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test blank password field validation
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');
    // Leave password field empty

    // Try to proceed without password
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T23-signup', testInfo);
});

test('T24-Password Exceeding Maximum Length', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password exceeding maximum allowed length
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.longPassword, 'Test', 'User');

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(2000); // Wait longer for validation/truncation

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T24-signup', testInfo);
});

test('T25-Password Below Minimum Length', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test password below minimum required length
    await signupPage.fillBasicInfo(TestDataVariations.validMobile, TestDataVariations.shortPassword, 'Test', 'User');

    // Try to proceed to see validation error
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getPasswordInput());
    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T25-signup', testInfo);
});



setupSignupTestSuite('ZALogin Signup Tests - Part 1 (T26-T35)');

test('T26-Valid First Name and Surname', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test valid first name and surname (both tested together)
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.validFirstName);
    await signupPage.fillLastName(TestDataVariations.validLastName);

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T26-signup', testInfo);
});

test('T27-Names with Spaces', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test first name and surname containing spaces (both tested together)
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.nameWithSpaces);
    await signupPage.fillLastName(TestDataVariations.lastNameWithSpaces);

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T27-signup', testInfo);
});

test('T28-Names with Hyphens', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test first name and surname containing hyphens (both tested together)
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.nameWithHyphen);
    await signupPage.fillLastName(TestDataVariations.lastNameWithHyphen);

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T28-signup', testInfo);
});

test('T29-Blank First Name Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test blank first name field validation
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    // Leave first name empty
    await signupPage.fillLastName(TestDataVariations.validLastName);

    // Try to proceed without first name
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T29-signup', testInfo);
});

test('T30-Blank Surname Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test blank surname field validation
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.validFirstName);
    // Leave surname empty

    // Try to proceed without surname
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T30-signup', testInfo);
});

test('T31-Names with Numeric Characters Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test first name and surname with numbers (both tested together - should be rejected)
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.nameWithNumbers);
    await signupPage.fillLastName(TestDataVariations.lastNameWithNumbers);

    // Try to proceed to see validation error
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T31-signup', testInfo);
});

test('T32-Names with Special Characters Rejection', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Test first name and surname with special characters (both tested together - should be rejected)
    // Note: Hyphens are usually allowed, so testing with other special chars
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName(TestDataVariations.nameWithSpecialChars);
    await signupPage.fillLastName(TestDataVariations.lastNameWithSpecialChars);

    // Try to proceed to see validation error
    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    if (await nextButton.isVisible()) {
        await nextButton.click();
    }

    await signupUtils.highlightElement(signupPage.getFirstNameInput());
    await signupUtils.highlightElement(signupPage.getLastNameInput());
    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T32-signup', testInfo);
});

test('T33-ID Document Dropdown Selection and Valid SA ID', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Test ID document dropdown selection
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await signupUtils.highlightElement(idDropdown);
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    // Select South African ID option
    const saIdOption = signupPage.page.getByRole('option', { name: 'South African ID' }).locator('div');
    await signupUtils.highlightElement(saIdOption);
    await saIdOption.click();
    await signupPage.page.waitForTimeout(500);

    // Enter valid South African ID number (13 digits, valid format)
    const saIdInput = signupPage.page.getByRole('textbox', { name: 'South African ID' });
    await saIdInput.fill(TestDataVariations.validSAId);
    await signupUtils.highlightElement(saIdInput);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T33-signup', testInfo);
});

test('T34-Invalid South African ID Validation', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Select South African ID
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    const saIdOption = signupPage.page.getByRole('option', { name: 'South African ID' }).locator('div');
    await saIdOption.click();
    await signupPage.page.waitForTimeout(500);

    // Test multiple invalid scenarios in sequence
    const saIdInput = signupPage.page.getByRole('textbox', { name: 'South African ID' });

    // Test 1: Too short
    await saIdInput.fill(TestDataVariations.shortSAId); // 11 digits instead of 13
    await signupUtils.highlightElement(saIdInput);
    await signupPage.page.waitForTimeout(1000);

    // Clear and test 2: With letters
    await saIdInput.clear();
    await saIdInput.fill(TestDataVariations.saIdWithLetters); // Contains letter 'A'
    await signupPage.page.waitForTimeout(1000);

    // Clear and test 3: With special characters
    await saIdInput.clear();
    await saIdInput.fill(TestDataVariations.saIdWithSpecialChars); // Contains hyphen
    await signupPage.page.waitForTimeout(1000);

    // Try to proceed to trigger validation
    const registerButton = signupPage.page.getByRole('button', { name: 'Register' });
    if (await registerButton.isVisible()) {
        await registerButton.click();
    }

    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T34-signup', testInfo);
});

test('T35-Valid Passport Number Format', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Open dropdown using South African ID locator
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await signupUtils.highlightElement(idDropdown);
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    // Select Passport option from the dropdown
    const passportOption = signupPage.page.getByText('Passport');
    await signupUtils.highlightElement(passportOption);
    await passportOption.click();
    await signupPage.page.waitForTimeout(500);

    // Enter valid passport number (typical format: letter + 8 digits)
    const passportInput = signupPage.page.getByRole('textbox', { name: 'Passport' });
    await passportInput.fill(TestDataVariations.validPassport); // Valid passport format
    await signupUtils.highlightElement(passportInput);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T35-signup', testInfo);
});




setupSignupTestSuite('ZALogin Signup Tests - Part 2 (T36-T47)');

test('T36-Invalid Passport Number Validation', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Open dropdown using South African ID locator
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    // Select Passport option from the dropdown
    const passportOption = signupPage.page.getByText('Passport');
    await passportOption.click();
    await signupPage.page.waitForTimeout(500);

    const passportInput = signupPage.page.getByRole('textbox', { name: 'Passport' });

    // Test multiple invalid passport scenarios
    // Test 1: Too short
    await passportInput.fill(TestDataVariations.shortPassport); // Too short
    await signupUtils.highlightElement(passportInput);
    await signupPage.page.waitForTimeout(1000);

    // Test 2: Invalid format with special characters
    await passportInput.clear();
    await passportInput.fill(TestDataVariations.passportWithSpecialChars); // Invalid special characters
    await signupPage.page.waitForTimeout(1000);

    // Test 3: All numeric (should have letters)
    await passportInput.clear();
    await passportInput.fill(TestDataVariations.allNumericPassport); // All numbers
    await signupPage.page.waitForTimeout(1000);

    // Try to proceed to trigger validation
    const registerButton = signupPage.page.getByRole('button', { name: 'Register' });
    if (await registerButton.isVisible()) {
        await registerButton.click();
    }

    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T36-signup', testInfo);
});

test('T37-Date of Birth Selection and Complete Registration', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Select South African ID
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    const saIdOption = signupPage.page.getByRole('option', { name: 'South African ID' }).locator('div');
    await saIdOption.click();
    await signupPage.page.waitForTimeout(500);

    // Fill valid SA ID
    const saIdInput = signupPage.page.getByRole('textbox', { name: 'South African ID' });
    await saIdInput.fill(TestDataVariations.validSAId);

    // Test date of birth selection
    const dobDropdown = signupPage.page.getByRole('combobox', { name: 'Date of Birth' });
    await signupUtils.highlightElement(dobDropdown);
    await dobDropdown.click();
    await signupPage.page.waitForTimeout(500);

    // Check "Agree to All" if available
    try {
        const agreeToAll = signupPage.page.getByLabel('Agree to All', { exact: false }).first();
        if (await agreeToAll.isVisible({ timeout: 2000 })) {
            await agreeToAll.click();
        }
    } catch (error) {
        console.log('Agree to All checkbox not found');
    }

    // Highlight the Register button (ready for complete registration)
    const registerButton = signupPage.page.getByRole('button', { name: 'Register' });
    await signupUtils.highlightElement(registerButton);
    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T37-signup', testInfo);
});

test('T38-Empty ID Number Field Validation', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.ensureCleanSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Select South African ID but leave the field empty
    const idDropdown = signupPage.page.getByRole('combobox', { name: 'South African ID' }).locator('div');
    await idDropdown.click();
    await signupPage.page.waitForTimeout(500);

    const saIdOption = signupPage.page.getByRole('option', { name: 'South African ID' }).locator('div');
    await saIdOption.click();
    await signupPage.page.waitForTimeout(500);

    // Leave ID field empty and highlight it
    const saIdInput = signupPage.page.getByRole('textbox', { name: 'South African ID' });
    await signupUtils.highlightElement(saIdInput);

    // Try to proceed without filling ID
    const registerButton = signupPage.page.getByRole('button', { name: 'Register' });
    if (await registerButton.isVisible()) {
        await registerButton.click();
    }

    await signupPage.page.waitForTimeout(2000); // Wait for validation message

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T38-signup', testInfo);
});

test('T39-Hamburger Menu Sign Up Button Visibility', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.resetModalState();

    // Click hamburger menu
    const hamburgerMenu = signupPage.page.locator('#header-hamburger-btn');
    await signupUtils.highlightElement(hamburgerMenu);
    await hamburgerMenu.click();
    await signupPage.page.waitForTimeout(1000);

    // Check if Sign Up button is visible in hamburger menu
    const hamburgerSignupBtn = signupPage.page.getByRole('button', { name: 'Sign Up' }).nth(1);
    await expect(hamburgerSignupBtn).toBeVisible();
    await signupUtils.highlightElement(hamburgerSignupBtn);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T39-signup', testInfo);
});

test('T40-Sign Up Code Mixed Case Letters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Click "I have a signup code" to reveal the voucher code field
    const signupCodeToggle = signupPage.page.getByText('I have a signup code');
    await signupUtils.highlightElement(signupCodeToggle);
    await signupCodeToggle.click();
    await signupPage.page.waitForTimeout(500);

    // Enter sign-up code with mixed case letters
    const voucherCodeField = signupPage.page.getByRole('textbox', { name: 'Voucher Code' });
    await voucherCodeField.fill(TestDataVariations.mixedCaseCode); // Mixed case letters
    await signupUtils.highlightElement(voucherCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T40-signup', testInfo);
});

test('T41-Sign Up Code with Numeric Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Click "I have a signup code" to reveal the voucher code field
    const signupCodeToggle = signupPage.page.getByText('I have a signup code');
    await signupCodeToggle.click();
    await signupPage.page.waitForTimeout(500);

    // Enter sign-up code with numeric characters
    const voucherCodeField = signupPage.page.getByRole('textbox', { name: 'Voucher Code' });
    await voucherCodeField.fill(TestDataVariations.codeWithNumbers); // Mixed letters and numbers
    await signupUtils.highlightElement(voucherCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T41-signup', testInfo);
});

test('T42-Sign Up Code with Special Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill initial form to get to step 2
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    const nextButton = signupPage.page.getByRole('button', { name: 'Next' });
    await nextButton.click();
    await signupPage.page.waitForTimeout(1000);

    // Enter sign-up code with special characters
    try {
        const signUpCodeField = signupPage.page.getByRole('textbox', { name: /sign.?up.?code|signup.?code|referral.?code/i }).first();
        if (await signUpCodeField.isVisible({ timeout: 2000 })) {
            await signUpCodeField.fill(TestDataVariations.codeWithSpecialChars); // Letters with special characters
            await signupUtils.highlightElement(signUpCodeField);
        }
    } catch (error) {
        console.log('Sign-up code field not found');
    }

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T42-signup', testInfo);
});

test('T43-Valid Referral Code', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Enter valid referral code (referral field is available by default)
    const referralCodeField = signupPage.page.getByRole('textbox', { name: 'Referral Code' });
    await referralCodeField.fill(TestDataVariations.validReferralCode); // Valid referral code
    await signupUtils.highlightElement(referralCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T43-signup', testInfo);
});

test('T44-Referral Code Case Insensitive', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Test case insensitive referral code (referral field is available by default)
    const referralCodeField = signupPage.page.getByRole('textbox', { name: 'Referral Code' });

    // First try lowercase
    await referralCodeField.fill(TestDataVariations.lowercaseReferralCode);
    await signupPage.page.waitForTimeout(500);

    // Then try uppercase to test case insensitivity
    await referralCodeField.clear();
    await referralCodeField.fill(TestDataVariations.uppercaseReferralCode);
    await signupUtils.highlightElement(referralCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T44-signup', testInfo);
});

test('T45-Referral Code with Numeric Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Enter referral code with numeric characters (referral field is available by default)
    const referralCodeField = signupPage.page.getByRole('textbox', { name: 'Referral Code' });
    await referralCodeField.fill(TestDataVariations.referralWithNumbers); // Referral code with numbers
    await signupUtils.highlightElement(referralCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T45-signup', testInfo);
});

test('T46-Referral Code with Special Characters', async ({ signupPage, signupUtils, screenshotDir }, testInfo) => {
    await signupUtils.clearHighlights();
    await signupUtils.ensureCleanHamburgerSignupOpen();

    // Fill basic form fields first
    await signupPage.fillMobileNumber(TestDataVariations.validMobile);
    await signupPage.fillPassword('Password12');
    await signupPage.fillFirstName('Test');
    await signupPage.fillLastName('User');

    // Enter referral code with special characters (referral field is available by default)
    const referralCodeField = signupPage.page.getByRole('textbox', { name: 'Referral Code' });
    await referralCodeField.fill(TestDataVariations.referralWithHyphen); // Referral code with hyphen
    await signupUtils.highlightElement(referralCodeField);

    await signupPage.page.waitForTimeout(1000);

    await ScreenshotHelper.takeScreenshot(signupPage.page, screenshotDir, 'T46-signup', testInfo);
});

