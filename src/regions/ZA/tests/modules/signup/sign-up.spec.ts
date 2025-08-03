// Utility function to extract fieldIdMap from apiData
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
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPageZA } from './pages/Login';
test.describe.serial('ZALogin Signup Tests', () => {
    let page;
    let context;
    let LoginPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        LoginPage = new LoginPageZA(page);
        await LoginPage.goto();
        await page.waitForLoadState('domcontentloaded');
    });

    test("T1-Verify Sign-Up Button is visible on Homepage.", async ( { }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });
        await signUpButton.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
        await page.screenshot({ path: 'screenshots/T1-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T1-signup.png';
        await testInfo.attach('Sign Up Homepage', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        // Return to homepage without logging out
        await LoginPage.goto();
    });

    test("T2-Verify Login Button is visible on Homepage.", async ( { }, testInfo) => {
        const loginButton = page.getByRole('button', { name: 'Login' });
        await loginButton.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
        await page.screenshot({ path: 'screenshots/T2-login.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T2-login.png';
        await testInfo.attach('Login Homepage', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        // Return to homepage without logging out
        await LoginPage.goto();
    });

    test('T3-Verify Sign page after clicking.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;
        const forms = await page.getByRole('form').first();

        const signUpPageTitle = await forms.getByText('Sign Up').first();

        const parent = await signUpPageTitle.locator('..');

        await page.screenshot({ path: 'screenshots/T3-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T3-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });

    test('T4-Verify Sign Up Form is visible.', async ({ }, testInfo) => {

        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        await page.waitForTimeout(5000);
        await signUpButton.click();
        // await apiPromise;

        const forms = await page.getByRole('form').first();
        // const apiData = await apiResponse.json();

        // // Extract templateFieldId and propertyName pairs
        // const fieldIdMap: { id: any; propertyName: any }[] = [];
        // for (const section of apiData.templateSections || []) {
        //     for (const field of section.templateFields || []) {
        //         fieldIdMap.push({
        //             id: field.templateFieldId,
        //             propertyName: field.propertyName
        //         });
        //     }
        // }
        // console.log(fieldIdMap);
        // fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        // const propertyName = 'MobileNumber';
        // const field = fieldIdMap.find(f => f.propertyName === propertyName);

        // if (field && field.id) {
        //     const element = await page.locator(`#${field.id}`);
        //     await element.fill('999889793');
        // }

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const firstNameField = await page.getByRole('textbox', { name: 'First Name' });

        const surnameField = await page.getByRole('textbox', { name: 'Surname' });

        // await expect(MobileNumberField).toBeVisible();
        // await expect(passwordField).toBeVisible();
        // await expect(firstNameField).toBeVisible();
        // await expect(surnameField).toBeVisible();

        await firstNameField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
        await surnameField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        }); 
        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.screenshot({ path: 'screenshots/T4-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T4-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        // Return to homepage without logging out
        await LoginPage.goto();
    });

    test('T5-Register Button.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        // await apiPromise;

        await page.waitForTimeout(5000);

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const firstNameField = await page.getByRole('textbox', { name: 'First Name' });

        const surnameField = await page.getByRole('textbox', { name: 'Surname' });

        await MobileNumberField.fill('999889100');
        await passwordField.fill('123456789');
        await firstNameField.fill('Test');
        await surnameField.fill('User');

        await page.getByRole('button', { name: 'Next' }).click();

        const reg=await page.getByRole('button', { name: 'Register' });

        await reg.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.screenshot({ path: 'screenshots/T5-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T5-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });

        // Return to homepage without logging out
        // await LoginPage.goto();
        // await page.waitForLoadState
    });

    test('T7-Register Button.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const apiResponse = await apiPromise;

        const apiData = await apiResponse.json();

        const fieldIdMap = extractFieldIdMap(apiData);
        console.log(fieldIdMap);
        fs.writeFileSync('template_field_ids.json', JSON.stringify(fieldIdMap, null, 2));

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const firstNameField = await page.getByRole('textbox', { name: 'First Name' });

        const surnameField = await page.getByRole('textbox', { name: 'Surname' });

        await MobileNumberField.fill('0000999888');
        await passwordField.fill('123456789');
        await firstNameField.fill('Test');
        await surnameField.fill('User');

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

        await page.waitForTimeout(10000);

        await page.getByRole('button', { name: 'Register' }).click();

        const errorMessage = await page.getByText('Operator number incorrect').first();

        const parentError= await errorMessage.locator('..');

        await errorMessage.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,0,0,0.3)';
        });

        await page.screenshot({ path: 'screenshots/T7-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T7-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });

    });

    test('T8-Dialling Code.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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

        const propertyName = 'DialingCode';
        const field = fieldIdMap.find(f => f.propertyName === propertyName);
        const hasPlus27 = field && Array.isArray(field.items) && field.items.some(item => item.title === '+27');

        await expect(hasPlus27).toBeTruthy();

        await page.waitForTimeout(10000);

        const num=await page.getByText('+27').nth(1);
        if(num!== null) {
            await num.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        }

        await page.screenshot({ path: 'screenshots/T8-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T8-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
    });
    test('T10-Short Mobile Number.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T10-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T10-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
    });

    test('T11-Long Mobile Number.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999887373737'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T11-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T11-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
    });
    test('T12-Verify that :Alphabetic Characters in Mobile Number.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999a89793'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T12-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T12-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
    });

    test('T13-  Verify that :Special Characters in Mobile Number', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999$89@93'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T13-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T13-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T14- Verify that :Mobile Number with Consecutive Spaces', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('9 9 89 93'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('123456789');
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await MobileNumberField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T14-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T14-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        // await LoginPage.goto();
    });


    test('T15-  Verify Password Strength', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T15-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T15-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T16-  Verify Password Complexity', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('AbCdEfgHi');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T16-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T16-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });


    test('T17-  Verify Password with Numbers', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('35367136');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T17-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T17-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });

    test('T18-  Verify Password with Special Characters', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('!@#$%^&*(');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T18-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T18-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });

    test('T19-Verify Password Length ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T19-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T19-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T20-Verify Maximum Password Length ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('1234567890');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T21-Verify All characters allowed ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('@Ath!va101');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T22-Verify Password with Spaces ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('A 2 78 09');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T23-Verify Weak Password Rejection ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('abcdefgh');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T24-Verify Blank Password Rejection ', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T25-Verify Password Exceeding Maximum Length', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('9999999999999999999');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T26-Verify Password with Minimum Length', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        const apiResponse = await apiPromise;

        const MobileNumberField = await page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345');

        const PasswordBoundingBox = await passwordField.boundingBox();
        if (!PasswordBoundingBox) {
            throw new Error('Password field bounding box not found');
        } else {
            // Calculate coordinates 5px from the right and vertically centered
            const x = PasswordBoundingBox.x + PasswordBoundingBox.width - 2;
            const y = PasswordBoundingBox.y + PasswordBoundingBox.height / 2;
            await page.mouse.click(x, y);
        }
        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        await passwordField.evaluate((el) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T20-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T20-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });


    test('T27- Verify Valid First Name with alphabets only.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('testName');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T27-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T27-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T28- Verify First Name with Spaces.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        // console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('te st Na me');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T28-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T28-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });


    test('T29- Verify First Name with Hyphen.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        // console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('te st Na me');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        await passwordField.click(); // Ensure the password field is focused
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T29-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T29-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T30- Verify Blank First Name Rejection.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        // console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        await passwordField.click(); // Ensure the password field is focused

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T30-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T30-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T31- Verify First Name with Numbers.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        // console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('12345678 987654');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        await passwordField.click(); // Ensure the password field is focused

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T31-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T31-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T32- Verify First Name with Special Characters.', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        // const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);

        const propertyName = 'FirstName';
        // Debug: log all property names in fieldIdMap
        // console.log('All propertyNames in fieldIdMap:', fieldIdMap.map(f => f.propertyName));
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            // Try to match with trimmed property names (in case of extra spaces)
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('12345678 987654');
            await firstNameField.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }
        await passwordField.click(); // Ensure the password field is focused


        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T32-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T32-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T33- Verify Valid Surname', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('testSurname');
            await page.keyboard.press('Tab'); // Move focus to the next field
            await firstNameField2.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T33-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T33-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T34- Verify Surname with Spaces', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('te st Sur name');
            await page.keyboard.press('Tab'); // Move focus to the next field
            await firstNameField2.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T33-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T33-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T35- Verify Surname with Hyphen', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('test-Surname');
            await page.keyboard.press('Tab'); // Move focus to the next field
            await firstNameField2.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T33-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T33-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T36- Verify Blank Surname Rejection', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('');
            await page.keyboard.press('Tab'); // Move focus to the next field
            await firstNameField2.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T33-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T33-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T37- Verify Surname with Numbers', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('12345678');
            await page.keyboard.press('Tab'); // Move focus to the next field
            await firstNameField2.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }
        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T33-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T33-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T53- Verify user is able to Choose his preferred ID document from dropdown', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('testZensar');
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }

        await page.locator('#regster-next').click();

        await page.getByText('South African ID').first().click(); // Select South African ID from dropdown

        await page.getByText('Passport').first().click(); // Select Passport from dropdown

        const propertyName3 = 'IDNumber';
        
        let field3 = fieldIdMap.find(f => f.propertyName === propertyName3);
        if (!field3) {
            field3 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName3.trim());
        }
        console.log('Matched field:', field3);
        if (field3 && field3.id) {
            const firstNameField3 = await page.locator(`#${field3.id}`);
            await firstNameField3.fill('1234uwiq121313'); 
            await firstNameField3.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName3}'. Check for typos or mismatches.`);
        }

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T53-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T53-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T54 - Verify user is able to Select his preferred Day from date of birth dropdown', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('testZensar');
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }

        await page.locator('#regster-next').click();

        await page.getByText('South African ID').first().click(); // Select South African ID from dropdown

        await page.getByText('Passport').first().click(); // Select Passport from dropdown

        const propertyName3 = 'IDNumber';
        
        let field3 = fieldIdMap.find(f => f.propertyName === propertyName3);
        if (!field3) {
            field3 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName3.trim());
        }
        console.log('Matched field:', field3);
        if (field3 && field3.id) {
            const firstNameField3 = await page.locator(`#${field3.id}`);
            await firstNameField3.fill('1234uwiq121313'); 
            await firstNameField3.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName3}'. Check for typos or mismatches.`);
        }
        const propertyName4 = 'DateOfBirth';
        
        let field4 = fieldIdMap.find(f => f.propertyName === propertyName4);
        if (!field4) {
            field4 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName4.trim());
        }
        console.log('Matched field:', field4);
        if (field4 && field4.id) {
            // Use attribute selector for IDs with special characters
            const dateOfBirthComboBox = await page.locator(`[id='${field4.id}']`);
            await dateOfBirthComboBox.click(); // Click to open the date picker
            await dateOfBirthComboBox.fill('01/03/2003'); // Fill in the day
            await dateOfBirthComboBox.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName4}'. Check for typos or mismatches.`);
        }

        //*[@id="8445357a-bef4-4c10-a130-ba502b568346"]

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T53-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T53-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });
    test('T55 - Verify user is not able to signup if  Day  is not selected from date of birth dropdown', async ({ }, testInfo) => {
        const signUpButton = page.getByRole('button', { name: 'Sign Up' });

        // Wait for the expected API call after clicking Sign Up
        const apiPromise = page.waitForResponse(response =>
            response.url().includes('https://config.betwayafrica.com/cron/registration/synapse/ZA') && response.status() === 200
        );

        await signUpButton.click();
        await apiPromise;

        // const apiResponse = await apiPromise;
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
        await MobileNumberField.fill('999889193'); // Short mobile number

        const passwordField = await page.getByRole('textbox', { name: 'Password' }).nth(1);
        await passwordField.fill('12345678');

        const propertyName = 'FirstName';
        
        let field = fieldIdMap.find(f => f.propertyName === propertyName);
        if (!field) {
            field = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName.trim());
        }
        console.log('Matched field:', field);
        if (field && field.id) {
            const firstNameField = await page.locator(`#${field.id}`);
            await firstNameField.fill('test');
        } else {
            console.warn(`No field found for propertyName: '${propertyName}'. Check for typos or mismatches.`);
        }

        const propertyName2 = 'LastName';
        
        let field2 = fieldIdMap.find(f => f.propertyName === propertyName2);
        if (!field2) {
            field2 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName2.trim());
        }
        console.log('Matched field:', field);
        if (field2 && field2.id) {
            const firstNameField2 = await page.locator(`#${field2.id}`);
            await firstNameField2.fill('testZensar');
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName2}'. Check for typos or mismatches.`);
        }

        await page.locator('#regster-next').click();

        await page.getByText('South African ID').first().click(); // Select South African ID from dropdown

        await page.getByText('Passport').first().click(); // Select Passport from dropdown

        const propertyName3 = 'IDNumber';
        
        let field3 = fieldIdMap.find(f => f.propertyName === propertyName3);
        if (!field3) {
            field3 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName3.trim());
        }
        console.log('Matched field:', field3);
        if (field3 && field3.id) {
            const firstNameField3 = await page.locator(`#${field3.id}`);
            await firstNameField3.fill('1234uwiq121313'); 
            await firstNameField3.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName3}'. Check for typos or mismatches.`);
        }
        const propertyName4 = 'DateOfBirth';
        
        let field4 = fieldIdMap.find(f => f.propertyName === propertyName4);
        if (!field4) {
            field4 = fieldIdMap.find(f => f.propertyName && f.propertyName.trim() === propertyName4.trim());
        }
        console.log('Matched field:', field4);
        if (field4 && field4.id) {
            // Use attribute selector for IDs with special characters
            const dateOfBirthComboBox = await page.locator(`[id='${field4.id}']`);
            await dateOfBirthComboBox.click(); // Click to open the date picker
            await dateOfBirthComboBox.fill('00/03/2003'); // Fill in the day
            await dateOfBirthComboBox.evaluate((el) => {
                el.style.outline = '4px solid red';
                el.style.backgroundColor = 'rgba(255,255,0,0.3)';
            });
            await page.keyboard.press('Tab'); // Move focus to the next field
        } else {
            console.warn(`No field found for propertyName: '${propertyName4}'. Check for typos or mismatches.`);
        }

        //*[@id="8445357a-bef4-4c10-a130-ba502b568346"]

        await page.waitForTimeout(10000);

        await page.screenshot({ path: 'screenshots/T53-signup.png', fullPage: false });
        const sortScreenshotPath = 'C:/Users/AD115408/Desktop/Playwright/screenshots/T53-signup.png';
        await testInfo.attach('Sign Up Login Page', {
            path: sortScreenshotPath,
            contentType: 'image/png',
        });
        await LoginPage.goto();
    });

});