const data = require('../links/navbarLinks.json')[0];
const apidata = require('../apis/Sign-upPage/api.json')[0];

const userData = require('../json-data/userData.json');
import { expect } from '@playwright/test';
import { loginLocators } from '../locators/loginPageLocators';
import { time } from 'console';
const config = process.env.BASE_URL || 'https://www.betway.mw/';

export class LoginPage {
    page: import('@playwright/test').Page;
    mobileInput: import('@playwright/test').Locator;
    passwordInput: import('@playwright/test').Locator;
    loginButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    signUpButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    signUpButtonfromHamburger: ReturnType<import('@playwright/test').Page['getByRole']>;
    hamburgerMenu: ReturnType<import('@playwright/test').Page['locator']>;
    loginButtonfromHeader: ReturnType<import('@playwright/test').Page['getByRole']>;
    SportButton: ReturnType<import('@playwright/test').Page['getByText']>;
    CasinoButton: ReturnType<import('@playwright/test').Page['getByText']>;
    loginButtonFromPopup: ReturnType<import('@playwright/test').Page['getByRole']>;
    welcomeUser: ReturnType<import('@playwright/test').Page['getByText']>;
    username: ReturnType<import('@playwright/test').Page['getByText']>;
    formMobileInput: import('@playwright/test').Locator;
    formPasswordInput: import('@playwright/test').Locator;
    eyeButton: ReturnType<import('@playwright/test').Page['locator']>;
    BetInfluencer: ReturnType<import('@playwright/test').Page['getByText']>;

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page: import('@playwright/test').Page) {
        this.page = page;
        this.mobileInput = page.getByRole(
            'textbox',
            loginLocators.mobileInput.options
        ).nth(loginLocators.mobileInput.nth);

        this.passwordInput = page.getByRole(
            'textbox',
            loginLocators.passwordInput.options
        ).nth(loginLocators.passwordInput.nth);

        this.formMobileInput = page.getByRole(
            'textbox',
            loginLocators.formMobileInput.options
        ).nth(loginLocators.formMobileInput.nth);

        this.formPasswordInput = page.getByRole(
            'textbox',
            loginLocators.formPasswordInput.options
        ).nth(loginLocators.formPasswordInput.nth);

        this.loginButton = page.locator(loginLocators.loginButton);

        this.loginButtonfromHeader = page.getByRole(
            'button',
            loginLocators.loginButtonfromHeader.options
        ).nth(loginLocators.loginButtonfromHeader.nth);

        this.signUpButton = page.locator(loginLocators.signUpButton);
        this.hamburgerMenu = page.locator(loginLocators.hamburgerMenu);

        this.SportButton = page.getByText(
            loginLocators.SportButton.options.name
        ).nth(loginLocators.SportButton.nth);

        this.CasinoButton = page.getByText(
            loginLocators.CasinoButton.options.name
        ).nth(loginLocators.CasinoButton.nth);

        this.signUpButtonfromHamburger = page.getByRole(
            'button',
            loginLocators.signUpButtonfromHamburger.options
        ).nth(loginLocators.signUpButtonfromHamburger.nth);

        this.loginButtonFromPopup = page.getByRole(
            'button',
            loginLocators.loginButtonFromPopup.options
        ).nth(loginLocators.loginButtonFromPopup.nth);

        this.welcomeUser = page.getByText(
            loginLocators.welcomeUser.options.name
        ).nth(loginLocators.welcomeUser.nth);
        this.username = page.getByText(
            loginLocators.username.options.name
        ).nth(loginLocators.username.nth);

        this.eyeButton = this.formPasswordInput.locator('..').getByRole('img').first();
        this.BetInfluencer = page.getByText(
            loginLocators.betInfluencer.options.name
        ).nth(loginLocators.betInfluencer.nth);

    }

    async goto() {
        await this.page.goto(`${config}`);
    }

    
    async gotoAviatorPage() {
        await this.page.goto(data.aviator);
        await this.page.waitForLoadState('networkidle');
    }
    
    async gotoSportsPage() {
        await this.goto();
        await this.SportButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async clickLogin() {
        await this.loginButton.click();
    }

    async clickLoginButtonFromHeader() {
        await this.hamburgerMenu.click();
        await this.loginButtonfromHeader.click();
    }

    async clickSignUp() {
        await this.signUpButton.click();
        const apiPromise = this.page.waitForResponse(response =>
            response.url().includes(apidata.signupButtonClick) && response.status() === 200
        );
        await apiPromise;
    }

    async clickSignUpFromHeader() {
        await this.hamburgerMenu.click();
        await this.signUpButtonfromHamburger.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000); // Wait for the sign-up modal to appear
    }

    async clickOnLoginButtonFromHeader() {
        await this.hamburgerMenu.click();
        await this.loginButtonfromHeader.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async Login() {
        await this.goto();
        await this.mobileInput.fill(`${userData.user1.mobile}`);
        await this.passwordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(7000); // Wait for login to complete
    }
    async LoginArgs(mobile: string, password: string) {
        await this.goto();
        await this.mobileInput.fill(`${mobile}`);
        await this.passwordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(7000); // Wait for login to complete
    }

    async LoginFromSignupPopupHamburgerMenu() {
        await this.clickSignUpFromHeader();
        const loginButtonSignUpPopup = this.page.getByRole('button', { name: 'Login' }).nth(1);
        await loginButtonSignUpPopup.click();
        await this.page.waitForTimeout(2000); 
        await this.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }
    async LoginFromSignupPopupHamburgerMenuArgs(mobile: string, password: string) {
        await this.clickOnLoginButtonFromHeader();
        await this.page.waitForTimeout(2000); 
        await this.formMobileInput.fill(`${mobile}`);
        await this.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async LoginPopUp() {
        await this.goto();
        await this.clickSignUp();
        const loginButtonSignUpPopup = this.page.getByRole('button', { name: 'Login' }).nth(1);
        await loginButtonSignUpPopup.click();
        await this.page.waitForTimeout(2000); 
        await this.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
    }

    async LoginFromPopUp(mobile: string, password: string) {
        await this.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
    }

    async LoginFromHamburgerMenu(mobile: string, password: string) {
        await this.hamburgerMenu.click();
        await this.loginButtonfromHeader.click();
        await this.page.waitForTimeout(2000); // Wait for the login modal to appear
        await this.formMobileInput.fill(`${mobile}`);
        await this.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');

        await this.page.waitForTimeout(2000); // Wait for login to complete
        await this.page.waitForLoadState('domcontentloaded');
    }

}