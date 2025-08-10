import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log } from 'console';
import path from 'path';

const fakerdata = require('../../../json-data/faker.json');

const userData = require('../../../json-data/userData.json');

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/login');

test.describe('Login Page Tests', () => {

  // test("T1-Verify Login Button is visible on Homepage.", async ({ loginPage }, testInfo) => {
  //   const loginButton = loginPage.loginButton;
  //   await loginButton.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T1-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Homepage', {
  //     path: screenshotDir + '/T1-loginPage.png',
  //     contentType: 'image/png',
  //   });
  //   await loginPage.goto();
  // });

  // test('T2 - Verify that user should able to click on "Login" button', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLogin();
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T2-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button is clickable', {
  //     path: screenshotDir + '/T2-loginPage.png',
  //     contentType: 'image/png',
  //   });
  //   await loginPage.goto();
  // });

  // test('T3 - Verify that user should able to see the "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
  //   await loginPage.hamburgerMenu.click();
  //   const loginButtonHamburgerMenu = loginPage.loginButtonfromHeader;

  //   await loginButtonHamburgerMenu.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T3-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button in Hamburger Menu', {
  //     path: screenshotDir + '/T3-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T4 - Verify that user should able to click on "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHeader();
  //   await loginPage.page.waitForTimeout(2000); // Wait for the login modal to appear  
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T4-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button in Hamburger Menu is clickable', {
  //     path: screenshotDir + '/T4-loginPage.png',
  //     contentType: 'image/png',   
  //   });
  // });

  // test('T5 - Verify that user should able to see the "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHeader();
  //   const loginButtonSignUpPopup = loginPage.page.getByRole('button', { name: 'Login' }).nth(2);

  //   await loginButtonSignUpPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T5-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button in Hamburger Menu is clickable', {
  //     path: screenshotDir + '/T5-loginPage.png',
  //     contentType: 'image/png',   
  //   });
  // });

  // test('T6 - Verify that user should able to click on "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickSignUp();
  //   const loginButtonSignUpPopup = loginPage.page.getByRole('button', { name: 'Login' }).nth(1);

  //   await loginButtonSignUpPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T6-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button in Signup Popup is clickable', {
  //     path: screenshotDir + '/T6-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T7 - Verify that user should able to see the "Login" button on login popup window when clicked on aviator from carousel', async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();

  //   const loginButton = await sportsPage.page.getByRole('button', { name: 'Login' }).nth(1);
  //   await loginButton.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T7-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator Page Login', {
  //     path: screenshotDir + '/T7-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T8 - Verify that user is able to see login button on signup popup window on aviator page', async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();

  //   await sportsPage.signUpButton2.click();

  //   const loginButtonSignUpPopup = sportsPage.page.getByRole('button', { name: 'Login' }).nth(1);
  //   await loginButtonSignUpPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T8-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Button on Aviator Signup Popup', {
  //     path: screenshotDir + '/T8-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T9 - Verify user is able to login',async ({ loginPage }, testInfo) => { 
  //   await loginPage.Login();

  //   await expect(loginPage.welcomeUser).toBeVisible();
  //   const welcomeText = await loginPage.welcomeUser.locator('..');

  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T9-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Success', {
  //     path: screenshotDir + '/T9-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T10 - Verify user is able to login from hamburger menu', async ({ loginPage }, testInfo) => {

  //   await loginPage.LoginFromHamburgerMenu();

  //   const welcomeText = await loginPage.welcomeUser.locator('..');

  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T10-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Hamburger Menu', {
  //     path: screenshotDir + '/T10-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T11 - Verify user is able to login from signup popup', async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginPopUp();

  //   const welcomeText = await loginPage.welcomeUser.locator('..');

  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T11-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Signup Popup', {
  //     path: screenshotDir + '/T11-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T12  - Verify that user is able to login from login button available on signup popup window through hamburger menu', async ({ loginPage }, testInfo) => {

  //   await loginPage.LoginFromSignupPopupHamburgerMenu();
  //   await loginPage.page.waitForTimeout(2000); // Wait for the login modal to appear
  //   const welcomeText = await loginPage.welcomeUser.locator('..');
  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T12-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Signup Hamburger Menu', {
  //     path: screenshotDir + '/T12-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // }); 

  // test('T13 - Verify that user is able to login from  signup popup window from aviator page', async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUp();

  //   await expect(sportsPage.welcomeUser).toBeVisible();
  //   const welcomeText = await sportsPage.welcomeUser.locator('..');
  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T13-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Aviator Signup Popup', {
  //     path: screenshotDir + '/T13-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T14 - Verify that user is not able to login if mobile number field is empty',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user1.mobile, fakerdata.user1.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T14-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Aviator Hamburger Menu', {
  //     path: screenshotDir + '/T14-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T15 - Verify that user is not able to login if mobile number field has less than 9 numeric characters',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T15-loginPage.png', fullPage: false });
  //   await testInfo.attach('Less than 9 Numbers', {
  //     path: screenshotDir + '/T15-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T16 - Verify that user is not able to login if mobile number field has more than 9 numeric characters',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user3.mobile, fakerdata.user3.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T16-loginPage.png', fullPage: false });
  //   await testInfo.attach('More than 9 numeric', {
  //     path: screenshotDir + '/T16-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T17 - Verify that user is not able to login if mobile number field has alphanumeric characters',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user4.mobile, fakerdata.user4.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T17-loginPage.png', fullPage: false });
  //   await testInfo.attach('Mobile Number Contain Alphanumeric character', {
  //     path: screenshotDir + '/T17-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T18 -Verify that user is not able to enter special character in mobile number field',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user5.mobile, fakerdata.user5.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T18-loginPage.png', fullPage: false });
  //   await testInfo.attach('Mobile Number Contain Alphanumeric character', {
  //     path: screenshotDir + '/T18-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T19 -Verify that user is not able to login if password field is empty',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user6.mobile, fakerdata.user6.password);

  //   await loginPage.formMobileInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T19-loginPage.png', fullPage: false });
  //   await testInfo.attach('Password is empty', {
  //     path: screenshotDir + '/T19-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T20 - Verify that user is not able to login if password field has less than 5 characters',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);

  //   await loginPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T20-loginPage.png', fullPage: false });
  //   await testInfo.attach('Password has less than 5 characters', {
  //     path: screenshotDir + '/T20-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T21 - Verify that user is not able to login if password field has more than 20 characters',async ({ loginPage }, testInfo) => {
  //   await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user8.mobile, fakerdata.user8.password);

  //   await loginPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await loginPage.page.screenshot({ path: screenshotDir + '/T21-loginPage.png', fullPage: false });
  //   await testInfo.attach('Password has more than 20 characters', {
  //     path: screenshotDir + '/T21-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T22 - Verify that user is not able to login when mobile number field is empty when navigated from aviator page',async ({ sportsPage }, testInfo) => {

  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user9.mobile, fakerdata.user9.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T20-loginPage.png', fullPage: false });
  //   await testInfo.attach('Password has less than 5 characters', {
  //     path: screenshotDir + '/T20-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T23 - Verify that user is not able to login if mobile number field has less than 9 numeric characters when navigated from signup popup window from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user10.mobile, fakerdata.user10.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T23-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T23-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T24 - Verify that user is not able to login if mobile number field has more than 9 numeric characters when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user11.mobile, fakerdata.user11.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T24-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number has alphanumeric characters ', {
  //     path: screenshotDir + '/T24-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T25 -Verify that user is not able to login if mobile number field has alphanumeric characters when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user12.mobile, fakerdata.user12.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T25-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T25-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T26 - Verify that user is not able to enter special character in mobile number field when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user13.mobile, fakerdata.user13.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T26-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T26-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T27 - Verify that user is not able to login if password field is empty when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user14.mobile, fakerdata.user14.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T27-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T27-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T28 - Verify that user is not able to login if password field has less than 5 character when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user7.mobile, fakerdata.user7.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T28-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T28-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T29 - Verify that user is not able to login if password field has more than 20 characters when navigated from signup popup window  from  aviator page',async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoAviator();
  //   await sportsPage.AviatorLoginPopUpArgs(fakerdata.user8.mobile, fakerdata.user8.password);
  //   await sportsPage.formPasswordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });
  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T29-loginPage.png', fullPage: false });
  //   await testInfo.attach('Aviator : Mobile Number less than 9 characters ', {
  //     path: screenshotDir + '/T29-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });


  // test('T39- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "casino" page' , async ({ casinoPage }, testInfo) => {
  //   await casinoPage.gotoCasino();

  //   await casinoPage.playGame('The Chicken game');

  //   await casinoPage.page.screenshot({ path: screenshotDir + '/T39-loginPage.png', fullPage: false });

  //   // await casinoPage.page.waitForLoadState('networkidle');
  //   await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T39-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T40- Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "casino" page' , async ({ casinoPage }, testInfo) => {
  //   await casinoPage.gotoCasino();

  //   await casinoPage.playGame('The Chicken game');

  //   await casinoPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

  //   await casinoPage.page.waitForTimeout(5000); 

  //   const welcomeText=await casinoPage.welcomeUser.locator('..');

  //   await welcomeText.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await casinoPage.page.waitForTimeout(4000);

  //   await casinoPage.page.screenshot({ path: screenshotDir + '/T40-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T40-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T41- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "Virtuals" page' , async ({ virtualsPage }, testInfo) => {
  //   await virtualsPage.gotoVirtuals();

  //   await virtualsPage.playGame('Goal Football English');

  //   await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await virtualsPage.page.screenshot({ path: screenshotDir + '/T41-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T41-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T42 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "Virtuals" page' , async ({ virtualsPage }, testInfo) => {
  //   await virtualsPage.gotoVirtuals();

  //   await virtualsPage.playGame('Goal Football English');

  //   await virtualsPage.signUpButtonfromHamburger.click();

  //   await virtualsPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });

  //   await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await virtualsPage.page.screenshot({ path: screenshotDir + '/T42-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T42-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T43 -Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "Virtuals" page' , async ({ virtualsPage }, testInfo) => {
  //   await virtualsPage.gotoVirtuals();

  //   await virtualsPage.playGame('Goal Football English');

  //   await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

  //   await virtualsPage.welcomeUser.locator('..').evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });

  //   await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await virtualsPage.page.screenshot({ path: screenshotDir + '/T43-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T43-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T44 - Verify that user is able to click "Login" from signup popup window when clicked on "Play" button  on game banner while on "Virtuals" page' , async ({ virtualsPage }, testInfo) => {
  //   await virtualsPage.gotoVirtuals();

  //   await virtualsPage.playGame('Goal Football English');

  //   await virtualsPage.signUpButtonfromHamburger.click();

  //   await virtualsPage.loginButtonFromPopup.click();

  //   await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

  //   await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await expect(virtualsPage.welcomeUser).toBeVisible({timeout: 20000});

  //   await virtualsPage.welcomeUser.locator('..').evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await virtualsPage.page.screenshot({ path: screenshotDir + '/T44-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Casino Play Popup', {
  //     path: screenshotDir + '/T44-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T45 - Verify that user is able to see the "Login" window when clicked on "Login" from signup popup window while on "Promotions" page', async ({ promotionPage }, testInfo) => {
  //   await promotionPage.gotoPromotionPages();

  //   await promotionPage.LoginFromPromotions(userData.user1.mobile, userData.user1.password);

  //   await expect(promotionPage.welcomeUser).toBeVisible({timeout: 20000});

  //   await promotionPage.welcomeUser.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await promotionPage.page.screenshot({ path: screenshotDir + '/T45-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Promotions Popup', {
  //     path: screenshotDir + '/T45-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T46 - Verify user is able to hide or show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHeader();
  //   await loginPage.formMobileInput.fill(userData.user1.mobile);
  //   await loginPage.formPasswordInput.fill(userData.user1.password);

  //   await loginPage.eyeButton.click();

  //   const passwordInput = loginPage.page.locator('#login-password');

  //   const passwordBoundingBox = await passwordInput.boundingBox();
  //   const x = passwordBoundingBox?.x + passwordBoundingBox.width / 2;


  //   await loginPage.passwordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T46-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Promotions Popup', {
  //     path: screenshotDir + '/T46-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T47 - Verify user is able to show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHeader();
  //   await loginPage.formMobileInput.fill(userData.user1.mobile);
  //   await loginPage.formPasswordInput.fill(userData.user1.password);

  //   await loginPage.eyeButton.click();

  //   const passwordInput = loginPage.page.locator('#login-password');

  //   const passwordBoundingBox = await passwordInput.boundingBox();
  //   const x = passwordBoundingBox?.x + passwordBoundingBox.width / 2;


  //   await loginPage.passwordInput.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await loginPage.page.screenshot({ path: screenshotDir + '/T46-loginPage.png', fullPage: false });

  //   await testInfo.attach('Login Button on Promotions Popup', {
  //     path: screenshotDir + '/T46-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T48 - Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
  //   await betgamesPage.gotoBetgames();

  //   await betgamesPage.playGame('Bad Baboons');

  //   await betgamesPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await betgamesPage.page.screenshot({ path: screenshotDir + '/T48-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Button on Betgames Play Popup', {
  //     path: screenshotDir + '/T48-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });
  // test('T49 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
  //   await betgamesPage.gotoBetgames();

  //   await betgamesPage.playGame('Bad Baboons');

  //   await betgamesPage.page.waitForTimeout(4000); // Wait for the popup to appear
  //   await betgamesPage.signUpButtonfromHamburger.click();

  //   await betgamesPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });


  //   await betgamesPage.page.screenshot({ path: screenshotDir + '/T49-loginPage.png', fullPage: false });
  //   await testInfo.attach('BetGames Login button on Sign Up', {
  //     path: screenshotDir + '/T49-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T50 - Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
  //   await betgamesPage.gotoBetgames();

  //   await betgamesPage.playGame('Bad Baboons');

  //   await betgamesPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

  //   await betgamesPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await betgamesPage.welcomeUser.locator('..').evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await betgamesPage.page.screenshot({ path: screenshotDir + '/T50-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login from Betgames', {
  //     path: screenshotDir + '/T50-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T51- Verify that user is able to see the "Login" popup window', async ({ sportsPage }, testInfo) => {
  //   await sportsPage.gotoSportsPage();

  //   await sportsPage.clickLoginButtonFromHeader();


  //   await sportsPage..evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //     el.style.backgroundColor = 'rgba(255,255,0,0.3)';
  //   });

  //   await sportsPage.page.screenshot({ path: screenshotDir + '/T51-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Popup on Sports Page', {
  //     path: screenshotDir + '/T51-loginPage.png',
  //     contentType: 'image/png',
  //   });
  // });

  // test('T54 - Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Aviator" page',async({casinoPage}, testInfo) => {
  //   await casinoPage.gotoCasino();

  //   await casinoPage.favouriteGames.click();

  //   await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await casinoPage.page.screenshot({ path: screenshotDir + '/T54-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Button on Casino Favorite Popup', {
  //     path: screenshotDir + '/T54-loginPage.png', 
  //     contentType: 'image/png',
  //   });
  // });
  // test('T55 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page',async({casinoPage}, testInfo) => {
  //   await casinoPage.gotoCasino();

  //   await casinoPage.favouriteGames.click();

  //   await casinoPage.signUpButtonfromHamburger.click();

  //   await casinoPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
  //     el.style.outline = '4px solid red';
  //   });

  //   await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear

  //   await casinoPage.page.screenshot({ path: screenshotDir + '/T55-loginPage.png', fullPage: false });
  //   await testInfo.attach('Login Button on Casino Favorite Popup', {
  //     path: screenshotDir + '/T55-loginPage.png', 
  //     contentType: 'image/png',
  //   });
  // });
  test('T56 - Verify that user is able  to click "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page ',async({casinoPage}, testInfo) => {
    await casinoPage.gotoCasino();

    await casinoPage.favouriteGames.click();

    await casinoPage.signUpButtonfromHamburger.click();

    await casinoPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
      el.style.outline = '4px solid red';
    });

    await casinoPage.loginButtonFromPopup.click();

    await casinoPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

    await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear

    await casinoPage.welcomeUser.locator('..').evaluate((el: HTMLElement) => {
      el.style.outline = '4px solid red';
      el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    });

    await casinoPage.page.screenshot({ path: screenshotDir + '/T56-loginPage.png', fullPage: false });
    await testInfo.attach('Login Button on Casino Favorite Popup', {
      path: screenshotDir + '/T56-loginPage.png', 
      contentType: 'image/png',
    });
  });

  test('T66- Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Virtuals" page',async({virtualsPage}, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

    await virtualsPage.page.screenshot({ path: screenshotDir + '/T66-loginPage.png', fullPage: false });
    await testInfo.attach('Login Button on Virtuals Favorite Popup', {
      path: screenshotDir + '/T66-loginPage.png',
      contentType: 'image/png',
    });
  });
  test('T67 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page',async({virtualsPage}, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.signUpButtonfromHamburger.click();

    await virtualsPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
      el.style.outline = '4px solid red';
    });

    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

    await virtualsPage.page.screenshot({ path: screenshotDir + '/T67-loginPage.png', fullPage: false });
    await testInfo.attach('Login Button on Virtuals Favorite Popup', {
      path: screenshotDir + '/T67-loginPage.png',
      contentType: 'image/png',
    });
  });
  test('T68 - Verify that user is able  to "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page',async({virtualsPage}, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.signUpButtonfromHamburger.click();

    await virtualsPage.loginButtonFromPopup.evaluate((el: HTMLElement) => {
      el.style.outline = '4px solid red';
    });

    await virtualsPage.loginButtonFromPopup.click();

    await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);

    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear

    await virtualsPage.welcomeUser.locator('..').evaluate((el: HTMLElement) => {
      el.style.outline = '4px solid red';
      el.style.backgroundColor = 'rgba(255,255,0,0.3)';
    });

    await virtualsPage.page.screenshot({ path: screenshotDir + '/T68-loginPage.png', fullPage: false });
    await testInfo.attach('Login Button on Virtuals Favorite Popup', {
      path: screenshotDir + '/T68-loginPage.png',
      contentType: 'image/png',
    });
  });
});