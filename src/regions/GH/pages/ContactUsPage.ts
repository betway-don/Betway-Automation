import { HomePage } from "./HomePage";
import { contactUsPageLocators } from "../locators/contactusPageLocators";

export class ContactUsPage extends HomePage{
    page: import('@playwright/test').Page;
    chatToLiveSupport: ReturnType<import('@playwright/test').Page['getByText']>;
    email: ReturnType<import('@playwright/test').Page['getByText']>;
    X:ReturnType<import('@playwright/test').Page['getByText']>;
    facebook: ReturnType<import('@playwright/test').Page['getByText']>;
    call: ReturnType<import('@playwright/test').Page['getByText']>;
    mobile_input: ReturnType<import('@playwright/test').Page['locator']>;
    email_input: ReturnType<import('@playwright/test').Page['locator']>
    query_input: ReturnType<import('@playwright/test').Page['locator']>;
    submit_button: ReturnType<import('@playwright/test').Page['getByRole']>;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        // this.contactUsForm = page.getByText(contactUsPageLocators.contactUsForm?.selector || 'form#contact-us-form');
        this.chatToLiveSupport = page.getByText(contactUsPageLocators.chatToLiveSupport.options.name).nth(contactUsPageLocators.chatToLiveSupport.nth || 0);
        this.email = page.getByText(contactUsPageLocators.email.options.name);
        this.X = page.getByText(contactUsPageLocators.X.options.name);
        this.facebook = page.getByText(contactUsPageLocators.facebook.options.name);
        this.call = page.getByText(contactUsPageLocators.call.options.name);
        this.mobile_input = page.locator(contactUsPageLocators.mobile_input);
        this.email_input = page.locator(contactUsPageLocators.email_input);
        this.query_input = page.locator(contactUsPageLocators.query_input);
        this.submit_button = page.getByRole('button', { name: contactUsPageLocators.submit_button.options.name }).nth(contactUsPageLocators.submit_button.nth || 0);
    }

    async clickOnChatToLiveSupport() {
        await this.chatToLiveSupport.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnEmail() {
        await this.email.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnX() {
        await this.X.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnFacebook() {
        await this.facebook.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnCall() {
        await this.call.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
}