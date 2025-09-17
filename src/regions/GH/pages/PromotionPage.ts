import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import userData from '../json-data/userData.json'; // Adjust the path as needed

export class PromotionPage extends SportsPage {
    page: import('@playwright/test').Page;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
    }
    async gotoPromotionPages() {
        await this.goto();
        await this.SportButton.click();
        await this.promotionPage.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async LoginFromPromotions(mobile: string, password: string) {
        await this.mobileInput.fill(`${mobile}`);
        await this.passwordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000); // Wait for login to complete
    }
}