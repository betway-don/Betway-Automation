import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { OddsSelection } from '../../../../Common-Flows/OddSelection';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/login');

test.describe('Login Page Tests', () => {

  test("T1-Verify Login Button is visible on Homepage.", async ({ loginPage }, testInfo) => {
    const loginButton = loginPage.loginButton;
    await expect(loginButton).toBeVisible();
    await highlightElements(loginButton);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T1-loginPage', testInfo);
    await console.log(1)
  });


  test('T2 - Verify that user should able to click on "Login" button', async ({ loginPage }, testInfo) => {
    await loginPage.clickLogin();
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T2-loginPage', testInfo);
    await console.log(2)

  });


  test('T3 - Verify that user should able to see the "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
    await loginPage.hamburgerMenu.click();
    const loginButtonHamburgerMenu = loginPage.loginButtonfromHeader;
    await highlightElements(loginButtonHamburgerMenu);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T3-loginPage', testInfo);
  });


  test('T4 - Verify that user should able to click on "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHeader();
    await loginPage.page.waitForTimeout(2000);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T4-loginPage', testInfo);
  });


  test('T5 - Verify that user should able to see the "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHeader();
    const loginButtonSignUpPopup = loginPage.page.getByRole('button', { name: 'Login' }).nth(2);
    await highlightElementBorder(loginButtonSignUpPopup);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T5-loginPage', testInfo);
  });


  test('T6 - Verify that user should able to click on "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
    await loginPage.clickSignUp();
    const loginButtonSignUpPopup = loginPage.page.getByRole('button', { name: 'Login' }).nth(1);
    await highlightElementBorder(loginButtonSignUpPopup);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T6-loginPage', testInfo);
  });


  test('T7 - Verify that user should able to see the "Login" button on login popup window when clicked on aviator from carousel', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    const loginButton = await sportsPage.page.getByRole('button', { name: 'Login' }).nth(1);
    await highlightElementBorder(loginButton);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T7-loginPage', testInfo);
  });


  test('T8 - Verify that user is able to see login button on signup popup window on aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.signUpButtonfromHamburger.click();
    const loginButtonSignUpPopup = sportsPage.page.getByRole('button', { name: 'Login' }).nth(1);
    await highlightElementBorder(loginButtonSignUpPopup);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T8-loginPage', testInfo);
  });

  test('T9 - Verify user is able to login', async ({ loginPage }, testInfo) => {
    await loginPage.Login();
    await expect(loginPage.welcomeUser).toBeVisible();
    const welcomeText = await loginPage.welcomeUser.locator('..');
    await highlightElements(welcomeText);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T9-loginPage', testInfo);
  });

  test('T10 - Verify user is able to login from hamburger menu', async ({ loginPage }, testInfo) => {
    console.log('Timeout value is:', testInfo.timeout);
    await loginPage.LoginFromHamburgerMenu(userData.user1.mobile, userData.user1.password);
    await expect(loginPage.welcomeUser).toBeVisible({ timeout: 100000 });
    const welcomeText = await loginPage.welcomeUser.locator('..');
    console.log('Timeout value is:', testInfo.timeout);
    await highlightElements(welcomeText);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T10-loginPage', testInfo);
  });

  test('T11 - Verify user is able to login from signup popup', async ({ loginPage }, testInfo) => {
    await loginPage.LoginPopUp();
    await expect(loginPage.welcomeUser).toBeVisible({ timeout: 100000 });
    const welcomeText = await loginPage.welcomeUser.locator('..');
    await highlightElements(welcomeText);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T11-loginPage', testInfo);
  });

  test('T12  - Verify that user is able to login from login button available on signup popup window through hamburger menu', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenu();
    await loginPage.page.waitForTimeout(2000); // Wait for the login modal to appear
    const welcomeText = await loginPage.welcomeUser.locator('..');
    await highlightElements(welcomeText);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T12-loginPage', testInfo);
  });

  test('T13 - Verify that user is able to login from  signup popup window from aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUp();
    await expect(sportsPage.welcomeUser).toBeVisible();
    const welcomeText = await sportsPage.welcomeUser.locator('..');
    await highlightElements(welcomeText);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T13-loginPage', testInfo);
  });

  test('T14 - Verify that user is not able to login if mobile number field is empty', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user1.mobile, fakerdata.user1.password);
    await highlightElements(loginPage.formMobileInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T14-loginPage', testInfo);
    await console.log(14)

  });


  test('T15 - Verify that user is not able to login if mobile number field has less than 9 numeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);
    await highlightElements(loginPage.formMobileInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T15-loginPage', testInfo);
  });


  test('T16 - Verify that user is not able to login if mobile number field has more than 9 numeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user3.mobile, fakerdata.user3.password);
    await highlightElements(loginPage.formMobileInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T16-loginPage', testInfo);
  });


  test('T17 - Verify that user is not able to login if mobile number field has alphanumeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user4.mobile, fakerdata.user4.password);
    await highlightElements(loginPage.formMobileInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T17-loginPage', testInfo);
  });
  test('T18 -Verify that user is not able to enter special character in mobile number field', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user5.mobile, fakerdata.user5.password);
    await highlightElements(loginPage.formMobileInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T18-loginPage', testInfo);
  });


  test('T19 -Verify that user is not able to login if password field is empty', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user6.mobile, fakerdata.user6.password);
    await highlightElements(loginPage.formPasswordInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T19-loginPage', testInfo);
  });

  test('T20 - Verify that user is not able to login if password field has less than 5 characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);
    await highlightElements(loginPage.formPasswordInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T20-loginPage', testInfo);
  });
  test('T21 - Verify that user is not able to login if password field has more than 20 characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user8.mobile, fakerdata.user8.password);
    await highlightElements(loginPage.formPasswordInput);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T21-loginPage', testInfo);
  });
  test('T22 - Verify that user is not able to login when mobile number field is empty when navigated from aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user9.mobile, fakerdata.user9.password);
    await highlightElements(sportsPage.formMobileInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T22-loginPage', testInfo);
  });
  test('T23 - Verify that user is not able to login if mobile number field has less than 9 numeric characters when navigated from signup popup window from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user10.mobile, fakerdata.user10.password);
    await highlightElements(sportsPage.formMobileInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T23-loginPage', testInfo);
  });
  test('T24 - Verify that user is not able to login if mobile number field has more than 9 numeric characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user11.mobile, fakerdata.user11.password);
    await highlightElements(sportsPage.formMobileInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T24-loginPage', testInfo);
  });
  test('T25 -Verify that user is not able to login if mobile number field has alphanumeric characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user12.mobile, fakerdata.user12.password);
    await highlightElements(sportsPage.formMobileInput);
    
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T25-loginPage', testInfo);
    await console.log(25)
    
  });
  test('T26 - Verify that user is not able to enter special character in mobile number field when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user13.mobile, fakerdata.user13.password);
    await highlightElements(sportsPage.formMobileInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T26-loginPage', testInfo);
  });
  test('T27 - Verify that user is not able to login if password field is empty when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user14.mobile, fakerdata.user14.password);
    await highlightElements(sportsPage.formPasswordInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T27-loginPage', testInfo);
  });
  test('T28 - Verify that user is not able to login if password field has less than 5 character when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user7.mobile, fakerdata.user7.password);
    await highlightElements(sportsPage.formPasswordInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T28-loginPage', testInfo);
  });
  test('T29 - Verify that user is not able to login if password field has more than 20 characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user8.mobile, fakerdata.user8.password);
    await highlightElements(sportsPage.formPasswordInput);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T29-loginPage', testInfo);
  });

  test('T39- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "casino" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.playGame('The Chicken game');
    await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T39-loginPage', testInfo);
  });
  test('T40- Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "casino" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.playGame('The Chicken game');
    await casinoPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await casinoPage.page.waitForTimeout(5000);
    const welcomeText = await casinoPage.welcomeUser.locator('..');
    await highlightElements(welcomeText);
    await casinoPage.page.waitForTimeout(4000);
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T40-loginPage', testInfo);
  });

  test('T41- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T41-loginPage', testInfo);
  });
  test('T42 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.signUpButtonfromHamburger.click();
    await highlightElements(virtualsPage.loginButtonFromPopup);
    await virtualsPage.page.waitForTimeout(2000); // Wait for the popup to appear

    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T42-loginPage', testInfo);
  });
  test('T43 -Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await highlightElements(virtualsPage.welcomeUser.locator('..'));
    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T43-loginPage', testInfo);
  });

  test('T44 - Verify that user is able to click "Login" from signup popup window when clicked on "Play" button  on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.signUpButtonfromHamburger.click();
    await virtualsPage.loginButtonFromPopup.click();
    await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await virtualsPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await expect(virtualsPage.welcomeUser).toBeVisible({ timeout: 100000 });
    await highlightElements(virtualsPage.welcomeUser.locator('..'));
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T44-loginPage', testInfo);
  });

  test('T45 - Verify that user is able to see the "Login" window when clicked on "Login" from signup popup window while on "Promotions" page', async ({ promotionPage }, testInfo) => {
    await promotionPage.gotoPromotionPages();
    await promotionPage.LoginFromPromotions(userData.user1.mobile, userData.user1.password);
    await expect(promotionPage.welcomeUser).toBeVisible({ timeout: 100000 });
    await highlightElements(promotionPage.welcomeUser.locator('..'));
    await ScreenshotHelper(promotionPage.page, screenshotDir, 'T45-loginPage', testInfo);
  });
  test('T46 - Verify user is able to hide or show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHeader();
    await loginPage.formMobileInput.fill(userData.user1.mobile);
    await loginPage.formPasswordInput.fill(userData.user1.password);

    await highlightElementBorder(loginPage.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T46-Hide', testInfo)
    await loginPage.eyeButton.click();
    await highlightElementBorder(loginPage.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T46-Visible', testInfo)
  });
  test('T47 - Verify user is able to show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHeader();
    await loginPage.formMobileInput.fill(userData.user1.mobile);
    await loginPage.formPasswordInput.fill(userData.user1.password);

    await highlightElementBorder(loginPage.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T47-Hide', testInfo)
    await loginPage.eyeButton.click();
    await highlightElementBorder(loginPage.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T47-', testInfo)

  });

  test('T48 - Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.gotoBetgames();
    await betgamesPage.playGame('Bad Baboons');
    await betgamesPage.page.waitForTimeout(4000);
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T48-loginPage', testInfo);
  });
  test('T49 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.gotoBetgames();
    await betgamesPage.playGame('Bad Baboons');
    await betgamesPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await betgamesPage.signUpButtonfromHamburger.click();
    await highlightElementBorder(betgamesPage.loginButtonFromPopup);
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T49-loginPage', testInfo);
  });

  test('T50 - Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.gotoBetgames();
    await betgamesPage.playGame('Bad Baboons');
    await betgamesPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await betgamesPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await highlightElements(betgamesPage.welcomeUser.locator('..'));
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T50-loginPage', testInfo);
  });

  test('T51- Verify that user is able to see the "Login" popup window', async ({ sportsPage }, testInfo) => {
    await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
    await sportsPage.gotoSportsPage();
    await OddsSelection(5,sportsPage.page)
    await sportsPage.loginButtonFromBetslip.click(); // Click on the login button in the popup
    await sportsPage.page.waitForTimeout(2000); // Wait for the login modal to
    await sportsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await expect(sportsPage.welcomeUser).toBeVisible({ timeout: 20000 });
    await highlightElements(sportsPage.welcomeUser.locator('..'));
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T51-loginPage', testInfo);
  });
  test('T54/58/62 - Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Aviator" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.favouriteGames.click();
    await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T54-loginPage', testInfo);
  });

  test('T55/59/63 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.favouriteGames.click();
    await casinoPage.signUpButtonfromHamburger.click();
    await highlightElementBorder(casinoPage.loginButtonFromPopup);
    await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T55-loginPage', testInfo);
  });

  test('T56/60/64 - Verify that user is able  to click "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page ', async ({ casinoPage }, testInfo) => {
    await casinoPage.favouriteGames.click();
    await casinoPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await casinoPage.page.waitForTimeout(4000);
    await highlightElementBorder(casinoPage.welcomeUser.locator('..'));
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T56-loginPage', testInfo);
  });

  test('T57/61/65 - Verify that user is able  to click "Login"  from sign up popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page ', async ({ casinoPage }, testInfo) => {
    await casinoPage.favouriteGames.click();
    await casinoPage.signUpButtonfromHamburger.click();
    await highlightElementBorder(casinoPage.loginButtonFromPopup);
    await casinoPage.loginButtonFromPopup.click();
    await casinoPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await casinoPage.page.waitForTimeout(4000); // Wait for the popup to appear

    await highlightElementBorder(casinoPage.welcomeUser.locator('..'));
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T57-loginPage', testInfo);
  });

  test('T66- Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.page.waitForTimeout(4000);
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T66-loginPage', testInfo);
  });
  test('T67 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.signUpButtonfromHamburger.click();
    await highlightElementBorder(virtualsPage.loginButtonFromPopup);
    await virtualsPage.page.waitForTimeout(4000);
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T67-loginPage', testInfo);
  });

  test('T68 - Verify that user is able  to "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.gotoVirtuals();
    await virtualsPage.favouriteGames.click();
    await virtualsPage.signUpButtonfromHamburger.click();
    await virtualsPage.loginButtonFromPopup.click();
    await virtualsPage.LoginFromPopUp(userData.user1.mobile, userData.user1.password);
    await virtualsPage.page.waitForTimeout(4000);
    await highlightElements(virtualsPage.welcomeUser.locator('..'));
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T68-loginPage', testInfo);
  });
});
