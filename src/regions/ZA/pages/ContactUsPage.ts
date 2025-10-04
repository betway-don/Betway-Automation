import { HomePage } from "./HomePage";
import { contactUsPageLocators } from "../locators/contactusPageLocators";
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
// import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
// import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
const file = "src/global/utils/file-utils/locators.xlsx";

export class ContactUsPage extends HomePage {
    // page: import('@playwright/test').Page;
    ContactUsPagelocatorRegistry: Record<string, import('@playwright/test').Locator>;
    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "ContactUsPage");
        this.ContactUsPagelocatorRegistry = {
            ...this.HomePagelocatorsRegistry,
            chatToLiveSupport : getLocator(this.page, configs["chatToLiveSupport"]),
            email : getLocator(this.page, configs["email"]),
            X : getLocator(this.page, configs["X"]),
            facebook : getLocator(this.page, configs["facebook"]),
            call : getLocator(this.page, configs["call"]),
            formMobileInput : getLocator(this.page, configs["formMobileInput"]),
            formEmailInput : getLocator(this.page, configs["formEmailInput"]),
            formQueryType : getLocator(this.page, configs["formQueryType"]),
            formQueryInput : getLocator(this.page, configs["formQueryInput"]),
            formSubmitButton : getLocator(this.page, configs["formSubmitButton"]),
        }

        // this.contactUsForm = page.getByText(contactUsPageLocators.contactUsForm?.selector || 'form#contact-us-form');
        // this.chatToLiveSupport = page.getByText(contactUsPageLocators.chatToLiveSupport.options.name).nth(contactUsPageLocators.chatToLiveSupport.nth || 0);
        // this.email = page.getByText(contactUsPageLocators.email.options.name);
        // this.X = page.getByText(contactUsPageLocators.X.options.name);
        // this.facebook = page.getByText(contactUsPageLocators.facebook.options.name);
        // this.call = page.getByText(contactUsPageLocators.call.options.name);
    }

    async clickOnChatToLiveSupport() {
        await this.ContactUsPagelocatorRegistry.chatToLiveSupport.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnEmail() {
        await this.ContactUsPagelocatorRegistry.email.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnX() {
        await this.ContactUsPagelocatorRegistry.X.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnFacebook() {
        await this.ContactUsPagelocatorRegistry.facebook.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnCall() {
        await this.ContactUsPagelocatorRegistry.call.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
}