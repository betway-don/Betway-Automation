import { Page, Locator, expect } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { OddsSelection, LiveOddsSelection, DrawNoBetOddsSelection, EsportsOddsSelection } from '../../Common-Flows/OddSelection'; // Import odds selection helpers

const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";

export class BetSaverPage {
    readonly page: Page;
    readonly locatorsRegistry: Record<string, Locator>;
    readonly locators: Record<string, Locator>; // Added for compatibility with spec file helpers

    constructor(page: Page) {
        this.page = page;

        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BetSaverPage");

        this.locatorsRegistry = {
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
            // Login locators
            loginButton: getLocator(page, configs["loginButton"]),
            usernameInput: getLocator(page, configs["usernameInput"]),
            passwordInput: getLocator(page, configs["passwordInput"]),
            submitLoginButton: getLocator(page, configs["submitLoginButton"]),
            accountIcon: getLocator(page, configs["accountIcon"]),
        };
        this.locators = this.locatorsRegistry;
    }

    async goto() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async Login(mobileNumber: string, password: string) {
        await this.locatorsRegistry.mobileNumber.fill(mobileNumber);
        await this.locatorsRegistry.password.fill(password);
        await this.locatorsRegistry.loginButton.click();
        await this.page.waitForTimeout(1000);
    }

    // --- Screenshot Utility Methods (Kept for external calls from spec file) ---
    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }

    async takeScreenshot(screenshotDir: string, fileName: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    // --- End Screenshot Utility Methods ---

    // --- Low-Level Safe Wrappers (Moved from Spec Helper) ---

    private async safeClick(locator: Locator, name: string) {
        await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 5000 });
        await locator.click();
    }

    private async safeFill(locator: Locator, value: string, name: string) {
        await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 5000 });
        await locator.fill(value);
    }

    private async safePress(key: string) {
        await this.page.keyboard.press(key);
    }



    async preparePage() {
        await this.page.waitForTimeout(2000);
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async closePopup() {
        const close = this.locatorsRegistry.closePopup;
        if (await close.isVisible({ timeout: 1000 })) {
            await close.click();
            await this.page.waitForTimeout(500);
        }
    }

    async deleteBetslipIfVisible() {
        if (await this.locatorsRegistry.betslipDeleteButton?.isVisible()) {
            await expect(this.locatorsRegistry.betslipDeleteButton).toBeVisible({ timeout: 10000 });
            await this.locatorsRegistry.betslipDeleteButton.click();
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
        await this.locatorsRegistry.clickBookingCode.click();
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

    // Helper used in T26-27, T32
    async tryClick(locator: Locator, name: string, timeout = 2000) {
        try {
            if (await locator.isVisible({ timeout })) {
                console.log(`✅ Clicking on ${name}`);
                await locator.click();
                return true;
            } else {
                console.log(`⚠️ ${name} not visible, skipping...`);
                return false;
            }
        } catch {
            console.log(`⚠️ ${name} not found, skipping...`);
            return false;
        }
    }




    async continueBetSaverPopupFlow() {
        await this.safeClick(this.locatorsRegistry.betSaverInfo, "BetSaver Info");
    }

    async closeBetSaverPopupFlow() {
        await this.safeClick(this.locatorsRegistry.continueInBetSaverInfo, "Continue in BetSaver Info");
    }

    async clickDetailViewButton() {
        await this.safeClick(this.locatorsRegistry.detailViewButton, "Detail View Button");
    }

    async clickSettledBetsButton() {
        await this.safeClick(this.locatorsRegistry.settledBetsButton, "Settled Bets Button");
        await this.page.waitForTimeout(3000);
    }

    async verifyBetsaverNotActiveForFewSelections() {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(2, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }

    async setupBetsaverActive() {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(12, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }

    async openBetsaverInfoPopup() {
        await this.safeClick(this.locatorsRegistry.betSaverInfo, "BetSaver Info");
    }

    async clickContinueInBetsaverInfo() {
        await this.safeClick(this.locatorsRegistry.continueInBetSaverInfo, "Continue in BetSaver Info");
    }

    async placeQualifyingBetAndNavigateToMyBets(numberOfOdds: number = 3) {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(numberOfOdds, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betNowButton, "BetNow Button");
        await this.page.waitForTimeout(5000);
        await this.closePopup();
        await this.navigateToMyBets();
        await this.page.waitForTimeout(2000);
    }

    async placeBetsaverActiveBetAndNavigateToMyBets(numberOfOdds: number = 8) {
        await this.preparePage();
        await OddsSelection(numberOfOdds, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betNowButton, "BetNow Button");
        await this.page.waitForTimeout(5000);
        await this.closePopup();
        await this.navigateToMyBets();
    }

    async selectOutrightBet() {
        await this.outrightsSelection();
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
    }

    async selectSportBetForMixedSlip() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await this.preparePage();
        await OddsSelection(2, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async loadBetFromBookingCodeAndCheckStatus() {
        await this.clickBookingCode();
        await this.safeClick(this.locatorsRegistry.addToBetSlip, "Add To BetSlip");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        try {
            await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
            return 'Active';
        }
        catch {
            await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Active");
            return 'NotActive';
        }
    }


    async selectLowOddsSmartPicks5() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async selectMediumOddsSmartPicksAndVerifyActive() {
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");

        // Complex logic for selecting suitable smart picks
        if (await this.tryClick(this.locatorsRegistry.smartPicks30, "Smart Picks 30")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(6, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks25, "Smart Picks 25")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(8, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks20, "Smart Picks 20")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(10, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks15, "Smart Picks 15")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(12, this.page);
        } else {
            console.warn("❌ No Smart Picks option available (30, 25, or 20).");
        }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async placeBetWithNewWagerChangeAndCheckMyBets() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.page.waitForTimeout(2000);
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(12, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.acceptNewWager();
        await this.page.waitForTimeout(2000);
        await this.closePopup();
        await this.page.waitForTimeout(5000);
        await this.navigateToMyBets();
    }


    async shareAndLoadBookingCode() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(10, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.shareButton, "Share Button");
        await this.safeClick(this.locatorsRegistry.copyBookingCode, "Copy Booking Code");
        await this.closePopup();

        await this.safeFill(this.locatorsRegistry.betSlipTextBox, '', "BetSlip TextBox");
        await this.safePress('Control+V');
        await this.safeClick(this.locatorsRegistry.betSlipsearchIcon, "BetSlip Search Icon");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async checkBetsaverNotActiveForHighWager() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeFill(this.locatorsRegistry.wagerAmountInput, '2000', "Wager Amount Input");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverNotActiveForLowOddsAndFewLegs() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks10, "Smart Picks 10");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverActiveForLowOddsAndManyLegs() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");

        // Complex logic for selecting suitable smart picks (ensuring enough legs for activation)
        if (await this.tryClick(this.locatorsRegistry.smartPicks30, "Smart Picks 30")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(6, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks25, "Smart Picks 25")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(8, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks20, "Smart Picks 20")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(10, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks15, "Smart Picks 15")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(12, this.page);
        } else {
            throw new Error("❌ No Smart Picks option available (30, 25, or 20) for T32 flow.");
        }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async checkBetsaverNotActiveForDrawNoBet() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await DrawNoBetOddsSelection(1, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverNotActiveForMixedMarkets() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.outrightsSelection(); // second market
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button"); // Cleanup step
    }


    async selectEsportsOddsAndVerifyActive() {
        await this.safeClick(this.locatorsRegistry.eSportsButton, "Esports Button");
        const clickedOdds = await EsportsOddsSelection(10, this.page);

        // if (clickedOdds === 0) {
        //     throw new Error("❌ No odds were selected for Esports even after retries");
        // }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");

        const isBetSaverVisible = await this.locatorsRegistry.betSaverActive.isVisible();
        if (!isBetSaverVisible) {
            throw new Error("❌ BetSaver not active after odds selection");
        }
    }


    async selectLiveGameOddsAndVerifyActive() {
        await LiveOddsSelection(8, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }

}