import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { SignUpPage } from '../../../pages/SignUpPage';

const data = require('../../../apis/Sign-upPage/api.json');


type FieldIdMapEntry = { id: any; propertyName: any };
function extractFieldIdMap(apiData: any): FieldIdMapEntry[] {
    const fieldIdMap: FieldIdMapEntry[] = [];
    for (const section of apiData.templateSections || []) {
        for (const field of section.templateFields || []) {
            fieldIdMap.push({
                id: field.templateFieldId,
                propertyName: field.propertyName
            });
        }
    }
    return fieldIdMap;
}

test.describe.serial('ZALogin Signup Tests', () => {
    let page: import('@playwright/test').Page;
    let context;
    let SignupPage: SignUpPage;
    const projectRoot = path.resolve(__dirname, '../../..');
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        SignupPage = new SignUpPage(page);
        await SignupPage.goto();
    });
    

    // test("T1-Verify Sign-Up Button is visible on Homepage.", async ({ }, testInfo) => {
    //     const signUpButton = page.getByRole('button', { name: 'Sign Up' });
    //     await signUpButton.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });

    //     await page.screenshot({ path: screenshotDir + '/T1-signup.png', fullPage: false });

    //     await testInfo.attach('Sign Up Homepage', {
    //         path: screenshotDir + '/T1-signup.png',
    //         contentType: 'image/png',
    //     });
    //     await SignupPage.goto();
    // });

    // test("T2-Verify Login Button is visible on Homepage.", async ({ }, testInfo) => {
    //     const loginButton = page.getByRole('button', { name: 'Login' });
    //     await loginButton.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });
    //     await page.screenshot({ path: screenshotDir + '/T2-signup.png', fullPage: false });
    //     await testInfo.attach('Login Homepage', {
    //         path: screenshotDir + '/T2-signup.png',
    //         contentType: 'image/png',
    //     });
    //     // Return to homepage without logging out
    //     await SignupPage.goto();
    // });

    // test('T3-Verify Sign page after clicking.', async ({ }, testInfo) => {

    //     await SignupPage.clickSignUp();

    //     const forms = await page.getByRole('form').first();

    //     const signUpPageTitle = await forms.getByText('Sign Up').first();

    //     const parent = await signUpPageTitle.locator('..');

    //     await page.screenshot({ path: screenshotDir + '/T3-signup.png', fullPage: false });
    //     await testInfo.attach('Login Homepage', {
    //         path: screenshotDir + '/T3-signup.png',
    //         contentType: 'image/png',
    //     });
    //     await SignupPage.goto();
    // });

    // test('T4-Verify Sign Up Form is visible.', async ({ }, testInfo) => {

    //     await SignupPage.clickSignUp();

    //     await SignupPage.mobileInput.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });
    //     await SignupPage.passwordInput.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });
    //     await SignupPage.firstNameInput.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });
    //     await SignupPage.lastNameInput.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });

    //     await page.screenshot({ path: screenshotDir + '/T4-signup.png', fullPage: false });
    //     await testInfo.attach('Login Homepage', {
    //         path: screenshotDir + '/T4-signup.png',
    //         contentType: 'image/png',
    //     });

    //     await SignupPage.goto();
    // });

    // test('T5-Register Button.', async ({ }, testInfo) => {

    //     await SignupPage.clickSignUp();

    //     SignupPage.mobileInput.fill('999889100');
    //     SignupPage.passwordInput.fill('123456789');
    //     SignupPage.firstNameInput.fill('Test');
    //     SignupPage.lastNameInput.fill('User');

    //     await page.getByRole('button', { name: 'Next' }).click();

    //     const reg = await page.getByRole('button', { name: 'Register' });

    //     await reg.evaluate((el) => {
    //         el.style.outline = '4px solid red';
    //         el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    //     });

    //     await page.screenshot({ path: screenshotDir + '/T5-signup.png', fullPage: false });
    //     await testInfo.attach('Login Homepage', {
    //         path: screenshotDir + '/T5-signup.png',
    //         contentType: 'image/png',
    //     });

    //     await SignupPage.goto();
    // });

    test('T7-Register Button.', async ({ }, testInfo) => {

        const apiPromise = page.waitForResponse(response =>
            response.url().includes(data[0].signupButtonClick) && response.status() === 200
        );

        await SignupPage.clickSignUp();

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        const fieldIdMap = extractFieldIdMap(apiData);
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        await SignupPage.mobileInput.fill('999889100');
        await SignupPage.passwordInput.fill('123456789');
        await SignupPage.firstNameInput.fill('Test');
        await SignupPage.lastNameInput.fill('User');

        await page.getByRole('button', { name: 'Next' }).click();

        const propertyName = 'AgreeToAll';
        const field = fieldIdMap.find(f => f.propertyName === propertyName);

        if (field && field.id) {
            const element = await page.locator(`#${field.id}`);
            await element.click();
        }

        const propertyName2 = 'IDNumber';
        const field2 = fieldIdMap.find(f => f.propertyName === propertyName2);

        if (field2 && field2.id) {
            const element = await page.locator(`#${field2.id}`);
            await element.fill('12hshkqiqsb');
        }

        await page.getByRole('button', { name: 'Register' }).click();

        await page.screenshot({ path: screenshotDir + '/T7-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T7-signup.png',
            contentType: 'image/png',
        });

        await SignupPage.goto();

    });

    test('T8-Dialling Code.', async ({ }, testInfo) => {

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes(data[0].signupButtonClick) && response.status() === 200
        );

        await SignupPage.clickSignUp();

        await apiPromise;

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        // // Extract templateFieldId and propertyName pairs
        const fieldIdMap: { id: any; propertyName: any; items?: any[] }[] = [];
        for (const section of apiData.templateSections || []) {
            for (const field of section.templateFields || []) {
                fieldIdMap.push({
                    id: field.templateFieldId,
                    propertyName: field.propertyName,
                    items: field.items || [] // Include items if they exist
                });
            }
        }
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        const propertyName = 'DialingCode';
        const field = fieldIdMap.find(f => f.propertyName === propertyName);
        const hasPlus27 = field && Array.isArray(field.items) && field.items.some(item => item.title === '+27');

        await expect(hasPlus27).toBeTruthy();

        await page.waitForTimeout(10000);

        const num = await page.getByText('+27').nth(1);
        if (num !== null) {
            await num.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        }

        await page.screenshot({ path: screenshotDir + '/T8-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T8-signup.png',
            contentType: 'image/png',
        });

        await SignupPage.goto();
    });
    test('T10-Short Mobile Number.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes(data[0].signupButtonClick) && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        // // Extract templateFieldId and propertyName pairs
        const fieldIdMap: { id: any; propertyName: any; items?: any[] }[] = [];
        for (const section of apiData.templateSections || []) {
            for (const field of section.templateFields || []) {
                fieldIdMap.push({
                    id: field.templateFieldId,
                    propertyName: field.propertyName,
                    items: field.items || [] // Include items if they exist
                });
            }
        }
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('99988'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.screenshot({ path: screenshotDir + '/T10-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T10-signup.png',
            contentType: 'image/png',
        });

        await SignupPage.goto();

    });

    test('T11-Long Mobile Number.', async ({ }, testInfo) => {
        const apiPromise = page.waitForResponse(response =>
            response.url().includes(data[0].signupButtonClick) && response.status() === 200
        );
        await SignupPage.clickSignUp();

        await apiPromise;

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        // // Extract templateFieldId and propertyName pairs
        const fieldIdMap: { id: any; propertyName: any; items?: any[] }[] = [];
        for (const section of apiData.templateSections || []) {
            for (const field of section.templateFields || []) {
                fieldIdMap.push({
                    id: field.templateFieldId,
                    propertyName: field.propertyName,
                    items: field.items || [] // Include items if they exist
                });
            }
        }
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999887373737'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.screenshot({ path: screenshotDir + '/T11-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T11-signup.png',
            contentType: 'image/png',
        });

        await SignupPage.goto();
    });
    test('T12-Verify that :Alphabetic Characters in Mobile Number.', async ({ }, testInfo) => {

        const apiPromise = page.waitForResponse(response =>
            response.url().includes(data[0].signupButtonClick) && response.status() === 200
        );

        await SignupPage.clickSignUp();

        await apiPromise;

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        // // Extract templateFieldId and propertyName pairs
        const fieldIdMap: { id: any; propertyName: any; items?: any[] }[] = [];
        for (const section of apiData.templateSections || []) {
            for (const field of section.templateFields || []) {
                fieldIdMap.push({
                    id: field.templateFieldId,
                    propertyName: field.propertyName,
                    items: field.items || [] // Include items if they exist
                });
            }
        }
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999a89793'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: screenshotDir + '/T12-signup.png', fullPage: false });
        await testInfo.attach('Login Homepage', {
            path: screenshotDir + '/T12-signup.png',
            contentType: 'image/png',
        });

        await SignupPage.goto();
    });
});