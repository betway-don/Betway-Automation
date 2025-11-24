import { Page, Locator, expect } from '@playwright/test';
import { transactionHistoryLocators } from '../locators/transactionHistoryLocators';
import { OddsSelection } from '../../Common-Flows/OddsSelect';
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { clearHighlights } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../fixtures/MasterFixtureFile';


export class TransactionHistoryPage {
    readonly page: Page;
    readonly locators: transactionHistoryLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new transactionHistoryLocators(page);
    }

    // Navigation methods
    async goto() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }



    // Scroll to bottom of the page
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
    // Close popup if visible
    async closePopup() {
        const closeButton = this.locators.closePopup;
        if (await closeButton.isVisible({ timeout: 1000 })) {
            await closeButton.click();
            await this.page.waitForTimeout(500);
        }
    }
    //Login Method
    async Login(mobileNumber: string, password: string) {
        await this.locators.mobileNumber.fill(mobileNumber);
        await this.locators.password.fill(password);
        await this.locators.loginButton.click();
        await this.page.waitForTimeout(1000);
    }
    //Click Odds based on number of legs
    async clickOdds(numberOfLegs: number) {
        const apiUrl = "https://new.betway.co.za/sportsapi/br/v1/BetBook/Highlights/?countryCode=ZA&sportId=soccer";
        const response = await this.page.waitForResponse(resp => resp.url().startsWith(apiUrl) && resp.status() === 200);
        const data = await response.json();
        await OddsSelection(numberOfLegs, this.page, data);
    }



    async captureScreenshot(locators: Locator, screenshotDir: string, fileName: string, testInfo: any) {
        // Ensure the element is visible
        await expect(locators).toBeVisible({ timeout: 5000 });

        // Highlight the element (for debugging purposes)
        await highlightElements(locators);

        // Capture the screenshot using ScreenshotHelper
        await ScreenshotHelper.takeScreenshot(this.page, screenshotDir, fileName, testInfo);

        // Clear the highlight after taking the screenshot
        await clearHighlights(locators);
    }
    async navigateToTransactionHistory() {
        await this.locators.hamburgerBtn.click();
        await this.page.waitForTimeout(1000);
        await this.locators.transactionHistoryButton.click();
        await this.page.waitForTimeout(1000);
    }

 async  placeBet(page: Page) {
  // Click first button: Smart Picks
  await this.locators.smartPicksButton.click();

  // Click second button: Smart Picks 5
  await this.locators.smartPicks5.click();

  // Try-catch for Betslip Multi tab only
  try {
    await this.locators.multipleBetsButton.click();
  } catch (err) {
    console.warn('Betslip Multi tab not found or not clickable:', err);
  }

  // Click Bet Now button
  await this.locators.betNowButton.click();

  // Close the popup
  await this.locators.closePopup.click();
}



}