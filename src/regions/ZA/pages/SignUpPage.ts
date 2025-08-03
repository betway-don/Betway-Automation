const data = require('../apis/Sign-upPage/api.json')[0];

export class SignUpPage {
    page: import('@playwright/test').Page;
    mobileInput: import('@playwright/test').Locator;
    passwordInput: import('@playwright/test').Locator;
    firstNameInput: import('@playwright/test').Locator;
    lastNameInput: import('@playwright/test').Locator;
    loginButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    signUpButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    sportButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    casinoButton: ReturnType<import('@playwright/test').Page['getByRole']>;

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page: import('@playwright/test').Page) {
        this.page = page;
        this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);;
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).nth(1);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Surname' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
        this.sportButton = page.getByRole('button', { name: 'Sport' });
        this.casinoButton = page.getByRole('button', { name: 'Casino' });
    }

    async goto() {
        await this.page.goto('https://new.betway.co.za/');
    }

    async clickSignUp() {
        await this.signUpButton.click();
        const apiPromise = this.page.waitForResponse(response =>
            response.url().includes(data.signupButtonClick) && response.status() === 200
        );
        await apiPromise;
    }
}