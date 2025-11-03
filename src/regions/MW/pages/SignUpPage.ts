import { Page, Locator, expect } from '@playwright/test';
import { SignUpLocators } from '../locators/signUpLocators';

export class SignUpPage {
    readonly page: Page;
    readonly locators: SignUpLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new SignUpLocators(page);
    }

    // Navigation methods
    async goto() {
        await this.page.goto('https://www.betway.mw/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Click actions
    async clickSignUp() {
        await this.locators.signUpButton.click();
        await this.page.waitForTimeout(500);
    }

    async clickLogin() {
        await this.locators.loginButton.click();
    }

    async clickHamburgerMenu() {
        await this.locators.hamburgerMenu.click();
        await this.page.waitForTimeout(500);
    }

    async clickHamburgerSignUp() {
        await this.clickHamburgerMenu();
        await this.locators.hamburgerSignupBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickNext() {
        await this.locators.nextButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPrevious() {
        const previousButton = this.locators.previousButton;
        if (await previousButton.isVisible({ timeout: 1000 })) {
            await previousButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async clickRegister() {
        await this.locators.registerButton.click();
    }

    // Form filling methods
    async fillBasicInfo(mobile: string, password: string, firstName: string, lastName: string) {
        await this.locators.mobileInput.fill(mobile);
        await this.locators.passwordInput.fill(password);
        await this.locators.firstNameInput.fill(firstName);
        await this.locators.lastNameInput.fill(lastName);
    }

    async fillMobileNumber(mobile: string) {
        await this.locators.mobileInput.fill(mobile);
    }

    async fillPassword(password: string) {
        await this.locators.passwordInput.fill(password);
    }

    async fillFirstName(firstName: string) {
        await this.locators.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.locators.lastNameInput.fill(lastName);
    }

    async fillReferralCode(code: string) {
        await this.locators.referralCodeField.fill(code);
    }

    async fillVoucherCode(code: string) {
        await this.locators.voucherCodeField.fill(code);
    }

    // ID Document methods
    async selectSouthAfricanID() {
        await this.locators.idDropdown.click();
        await this.page.waitForTimeout(500);
        await this.locators.saIdOption.click();
        await this.page.waitForTimeout(500);
    }

    async selectPassport() {
        await this.locators.idDropdown.click();
        await this.page.waitForTimeout(500);
        await this.locators.passportOption.click();
        await this.page.waitForTimeout(500);
    }

    async fillSouthAfricanID(idNumber: string) {
        await this.locators.saIdInput.fill(idNumber);
    }

    async fillPassportNumber(passportNumber: string) {
        await this.locators.passportInput.fill(passportNumber);
    }

    // Date of Birth methods
    async selectDateOfBirth() {
        await this.locators.dobDropdown.click();
        await this.page.waitForTimeout(500);
        // Date selection logic can be added here if needed
    }

    // Checkbox methods
    async clickSignupCodeToggle() {
        await this.locators.signupCodeToggle.click();
        await this.page.waitForTimeout(500);
    }

    async agreeToAll() {
        try {
            const agreeToAll = this.locators.agreeToAllCheckbox;
            if (await agreeToAll.isVisible({ timeout: 2000 })) {
                await agreeToAll.click();
            }
        } catch (error) {
            console.log('Agree to All checkbox not found');
        }
    }

    // Clear form methods
    async clearAllFields() {
        try {
            await this.locators.mobileInput.clear();
            await this.locators.passwordInput.clear();
            await this.locators.firstNameInput.clear();
            await this.locators.lastNameInput.clear();
        } catch (e) {
            console.log('Could not clear form fields');
        }
    }

    // Validation methods
    async isSignUpButtonVisible(): Promise<boolean> {
        return await this.locators.signUpButton.isVisible();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.locators.loginButton.isVisible();
    }

    async isFormVisible(): Promise<boolean> {
        try {
            await this.page.waitForSelector('form', { timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async isRegisterButtonVisible(): Promise<boolean> {
        return await this.locators.registerButton.isVisible();
    }

    // Get elements for highlighting/screenshots
    getMobileInput(): Locator {
        return this.locators.mobileInput;
    }

    getPasswordInput(): Locator {
        return this.locators.passwordInput;
    }

    getFirstNameInput(): Locator {
        return this.locators.firstNameInput;
    }

    getLastNameInput(): Locator {
        return this.locators.lastNameInput;
    }

    getSignUpButton(): Locator {
        return this.locators.signUpButton;
    }

    getLoginButton(): Locator {
        return this.locators.loginButton;
    }

    getRegisterButton(): Locator {
        return this.locators.registerButton;
    }

    getReferralCodeField(): Locator {
        return this.locators.referralCodeField;
    }

    getVoucherCodeField(): Locator {
        return this.locators.voucherCodeField;
    }

    getDiallingCode(): Locator {
        return this.locators.diallingCode;
    }

    getSAIdInput(): Locator {
        return this.locators.saIdInput;
    }

    getPassportInput(): Locator {
        return this.locators.passportInput;
    }

    getIdDropdown(): Locator {
        return this.locators.idDropdown;
    }

    getDobDropdown(): Locator {
        return this.locators.dobDropdown;
    }
}