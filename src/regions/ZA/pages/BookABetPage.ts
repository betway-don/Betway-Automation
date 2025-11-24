import { Page, Locator, expect } from '@playwright/test';
import { bookABetLocators } from '../locators/bookABetLocators';

export class BookABetPage {
    readonly page: Page;
    readonly locators: bookABetLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new bookABetLocators(page);
    }

    // Navigation methods
    async goto() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Click actions
    async clickBookingCode() {
        await this.locators.bookABet.click();
        await this.page.waitForTimeout(500);
    }

    async clickShareButton() {
        await this.locators.shareButton.click();
        await this.page.waitForTimeout(500);
    }

    async clickDetailview() {
        await this.locators.detailedView.click();
        await this.page.waitForTimeout(500);
    }

    async clickArrowFilter() {
        await this.locators.arrowFilter.click();
        await this.page.waitForTimeout(500);
    }

    async scrollToBottom() {
        await this.page.evaluate(() => {
            const image = document.querySelector('img.rounded');
            if (!image) return;

            let container = image.parentElement;
            while (container && container.scrollHeight <= container.clientHeight) {
                container = container.parentElement;
            }

            if (container) {
                container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            }
        });
        await this.page.waitForTimeout(1000);
    }

    async closePopup() {
        const closeButton = this.locators.closePopup;
        if (await closeButton.isVisible({ timeout: 1000 })) {
            await closeButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async Login(mobileNumber: string, password: string) {
        await this.locators.mobileNumber.fill(mobileNumber);
        await this.locators.password.fill(password);
        await this.locators.loginButton.click();
        await this.page.waitForTimeout(1000);
    }     
}