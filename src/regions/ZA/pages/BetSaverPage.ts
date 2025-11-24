import { Page, Locator, expect } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements, clearHighlights } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { OddsSelection } from '../../Common-Flows/OddSelection';

const LOCATOR_URL = "https://raw.githubusercontent.com/Pavan69988/Locators/main/locators-69988.xlsx";

export class BetSaverPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;

        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BetSaver");

        this.locators = {
            // Common Buttons
            gotit: getLocator(page, configs["gotit"]),
            sportButton: getLocator(page, configs["sportButton"]),
            eSportsButton: getLocator(page, configs["eSportsButton"]),
            upcomingButton: getLocator(page, configs["upcomingButton"]),
            multiBetSlip: getLocator(page, configs["multiBetSlip"]),
            betNowButton: getLocator(page, configs["betNowButton"]),
            closePopup: getLocator(page, configs["closePopup"]),
            settledBetsButton: getLocator(page, configs["settledBetsButton"]),

            // Betsaver UI Elements
            betSaverActive: getLocator(page, configs["betSaverActive"]),
            betSaverNotActive: getLocator(page, configs["betSaverNotActive"]),
            betSaverInfo: getLocator(page, configs["betSaverInfo"]),
            continueInBetSaverInfo: getLocator(page, configs["continueInBetSaverInfo"]),
            betSaverInMyBets: getLocator(page, configs["betSaverInMyBets"]),
            betSaverInDetailView: getLocator(page, configs["betSaverInDetailView"]),

            // Smart Picks
            smartPicksButton: getLocator(page, configs["smartPicksButton"]),
            smartPicks5: getLocator(page, configs["smartPicks5"]),
            smartPicks10: getLocator(page, configs["smartPicks10"]),
            smartPicks20: getLocator(page, configs["smartPicks20"]),
            smartPicks25: getLocator(page, configs["smartPicks25"]),
            smartPicks30: getLocator(page, configs["smartPicks30"]),

            // My Bets
            detailViewButton: getLocator(page, configs["detailViewButton"]),
            betslipDeleteButton: getLocator(page, configs["betslipDeleteButton"]),

            // Book a Bet / Share Booking
            clickBookingCode: getLocator(page, configs["clickBookingCode"]),
            addToBetSlip: getLocator(page, configs["addToBetSlip"]),
            shareButton: getLocator(page, configs["shareButton"]),
            copyBookingCode: getLocator(page, configs["copyBookingCode"]),
            betSlipTextBox: getLocator(page, configs["betSlipTextBox"]),
            betSlipsearchIcon: getLocator(page, configs["betSlipsearchIcon"]),
            wagerAmountInput: getLocator(page, configs["wagerAmountInput"]),
        };
    }

    async goto() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locators[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
        await clearHighlights(locator);
    }
 async login(username: string, password: string) {
    await this.locators.loginButton.click();
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitLoginButton.click();

    await expect(this.locators.accountIcon, 'User should be logged in').toBeVisible({ timeout: 10000 });
  }
    async closePopup() {
        const close = this.locators.closePopup;
        if (await close.isVisible({ timeout: 1000 })) {
            await close.click();
            await this.page.waitForTimeout(500);
        }
    }

    async navigateToMyBets() {
        await this.page.goto('https://new.betway.co.za/mybets');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async outrightsSelection() {
        await this.page.goto('https://new.betway.co.za/sport/football/outrights');
        await this.page.waitForTimeout(2000);
        const firstOdds = this.page.locator('(//div[contains(@class,"odd-value")])[1]');
        if (await firstOdds.isVisible()) {
            await firstOdds.click();
        }
    }

    async clickBookingCode() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForTimeout(1000);
        await this.locators.clickBookingCode.click();
        await this.page.waitForTimeout(1000);
    }

    async acceptNewWager() {
        const confirmRebet = this.page.locator("//button[contains(.,'Accept Changes') or contains(.,'Confirm')]");
        if (await confirmRebet.isVisible({ timeout: 2000 })) {
            await confirmRebet.click();
        }
    }

    async cashoutBet() {
        const cashoutBtn = this.page.locator("//button[contains(.,'Cash Out')]");
        if (await cashoutBtn.isVisible()) {
            await cashoutBtn.click();
            await this.page.waitForTimeout(1000);
        }
    }
}
