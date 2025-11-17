import { Page, Locator, expect } from '@playwright/test';
import { highlightElements } from '../../../regions/Common-Flows/HighlightElements'; // Adjust path as needed
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader"; // Adjust path as needed
import { getLocator } from "../../../global/utils/file-utils/locatorResolver"; // Adjust path as needed
 
// URL for your central locator file
const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx";
 
export class BuildABetPage {
    readonly page: Page;
    readonly buildABetLocatorsRegistry: Record<string, Locator>;
 
    constructor(page: Page) {
        this.page = page;
 
        // ---
        // 🛑 IMPORTANT: Replace this MOCKED call with your REAL call
        // ---
        // const configs = loadLocatorsFromExcel(LOCATOR_URL, "BuildABetPage"); // <-- Your REAL call
        const configs = this.getMockLocatorData(); // <-- MOCKED call. Replace it.
        // ---
 
        this.buildABetLocatorsRegistry = {
            mobileInput: getLocator(this.page, configs["mobileInput"]),
            passwordInput: getLocator(this.page, configs["passwordInput"]),
            upcomingTab: getLocator(this.page, configs["upcomingTab"]),
            firstMatchContainer: getLocator(this.page, configs["firstMatchContainer"]),
            buildABetTab: getLocator(this.page, configs["buildABetTab"]),
            randomMarketButton: getLocator(this.page, configs["randomMarketButton"]),
            infoMessage1x2: getLocator(this.page, configs["infoMessage1x2"]),
            infoMessageDoubleChance: getLocator(this.page, configs["infoMessageDoubleChance"]),
            infoMessageBothTeamsScore: getLocator(this.page, configs["infoMessageBothTeamsScore"]),
            infoMessageTotalGoals: getLocator(this.page, configs["infoMessageTotalGoals"]),
            favoriteButton: getLocator(this.page, configs["favoriteButton"]),
            infoButton: getLocator(this.page, configs["infoButton"]),
            marketExpandIcon: getLocator(this.page, configs["marketExpandIcon"]),
            oddOver0_5: getLocator(this.page, configs["oddOver0_5"]),
            oddUnder0_5: getLocator(this.page, configs["oddUnder0_5"]),
            oddOver1_5: getLocator(this.page, configs["oddOver1_5"]),
            oddDraw: getLocator(this.page, configs["oddDraw"]),
            totalOddsBar: getLocator(this.page, configs["totalOddsBar"]),
            addToBetslipButton: getLocator(this.page, configs["addToBetslipButton"]),
            clearAllButton: getLocator(this.page, configs["clearAllButton"]),
            selectedOddsScroller: getLocator(this.page, configs["selectedOddsScroller"]),
            removeOddIcon: getLocator(this.page, configs["removeOddIcon"]),
            invalidCombinationMessage: getLocator(this.page, configs["invalidCombinationMessage"]),
        };
    }
 
    // ------------------------------------------------------------------
    // 1. Navigation & Setup Methods
    // ------------------------------------------------------------------
    
    async gotoSports() {
        await this.page.goto('/sport');
        await this.page.waitForLoadState('domcontentloaded');
    }
 
    async login(mobile: string, password: string) {
        await this.buildABetLocatorsRegistry.mobileInput.fill(mobile);
        await this.buildABetLocatorsRegistry.passwordInput.fill(password);
        await this.buildABetLocatorsRegistry.passwordInput.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }
 
    /**
     * This is the main setup method. It handles all navigation
     * from the sports page to the Build A Bet tab for a match.
     */
    async navigateToBuildABet() {
        await this.buildABetLocatorsRegistry.upcomingTab.click();
        
        // This logic finds the first match container to click
        const firstMatch = this.buildABetLocatorsRegistry.firstMatchContainer.first();
        await firstMatch.waitFor({ state: 'visible', timeout: 10000 });
        await firstMatch.click();
 
        // Now that we are on the match page, click the "Build A Bet" tab
        await this.buildABetLocatorsRegistry.buildABetTab.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
 
    // ------------------------------------------------------------------
    // 2. Action Methods
    // ------------------------------------------------------------------
 
    async clickRandomMarketButton() {
        await this.buildABetLocatorsRegistry.randomMarketButton.click();
        await this.page.waitForTimeout(7000); // Wait for action
    }
 
    async clickFavorite(index = 0) {
        await this.buildABetLocatorsRegistry.favoriteButton.nth(index).click();
    }
    
    async clickInfo(index = 0) {
        await this.buildABetLocatorsRegistry.infoButton.nth(index).click();
    }
 
    async expandMarket(index = 0) {
        await this.buildABetLocatorsRegistry.marketExpandIcon.nth(index).click();
    }
 
    async clickOdd(oddName: 'Over (0.5)' | 'Under (0.5)' | 'Over (1.5)' | 'Draw') {
        switch (oddName) {
            case 'Over (0.5)':
                await this.buildABetLocatorsRegistry.oddOver0_5.first().click();
                break;
            case 'Under (0.5)':
                await this.buildABetLocatorsRegistry.oddUnder0_5.first().click();
                break;
            case 'Over (1.5)':
                await this.buildABetLocatorsRegistry.oddOver1_5.first().click();
                break;
            case 'Draw':
                // This assumes the "Draw" locator is inside the #more-market-container
                await this.buildABetLocatorsRegistry.oddDraw.getByText('Draw', { exact: true }).first().click();
                break;
        }
    }
 
    async clickTotalOddsBar() {
        await this.buildABetLocatorsRegistry.totalOddsBar.click();
    }
    
    async clickAddToBetslip() {
        await this.buildABetLocatorsRegistry.addToBetslipButton.click();
    }
 
    async clickClearAll() {
        await this.buildABetLocatorsRegistry.clearAllButton.click();
    }
 
    async clickRemoveOddIcon() {
        await this.buildABetLocatorsRegistry.removeOddIcon.click();
    }
 
    // ------------------------------------------------------------------
    // 3. Highlight & Accessor (Get) Methods
    // ------------------------------------------------------------------
 
    async highlightBuildABetTab() {
        await highlightElements(this.buildABetLocatorsRegistry.buildABetTab);
    }
 
    async highlightInfoMessages() {
        await highlightElements(this.buildABetLocatorsRegistry.infoMessage1x2);
        await highlightElements(this.buildABetLocatorsRegistry.infoMessageDoubleChance);
        await highlightElements(this.buildABetLocatorsRegistry.infoMessageBothTeamsScore);
        await highlightElements(this.buildABetLocatorsRegistry.infoMessageTotalGoals);
    }
 
    async highlightFavorite(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.favoriteButton.nth(index));
    }
 
    async highlightInfo(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.infoButton.nth(index));
    }
    
    async highlightMarket(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.marketExpandIcon.nth(index));
    }
 
    async highlightTotalOddsBar() {
        await highlightElements(this.buildABetLocatorsRegistry.totalOddsBar);
    }
    
    async highlightAddAndClearButtons() {
        await highlightElements(this.buildABetLocatorsRegistry.addToBetslipButton);
        await highlightElements(this.buildABetLocatorsRegistry.clearAllButton);
    }
 
    async highlightSelectedOddsScroller() {
        await highlightElements(this.buildABetLocatorsRegistry.selectedOddsScroller);
    }
 
    async highlightRemoveOddIcon() {
        await highlightElements(this.buildABetLocatorsRegistry.removeOddIcon);
    }
 
    async highlightInvalidCombinationMessage() {
        await highlightElements(this.buildABetLocatorsRegistry.invalidCombinationMessage);
    }
 
    getInvalidCombinationMessage(): Locator {
        return this.buildABetLocatorsRegistry.invalidCombinationMessage;
    }

       // ------------------------------------------------------------------
    // Mock Data Function (Delete this when your Excel is ready)
    // ------------------------------------------------------------------
    private getMockLocatorData(): Record<string, any> {
        // This simulates the data read from your Excel file.
        return {
            "mobileInput": { type: "role", value: "textbox", options: '{"name":"Mobile Number"}', nth: 0 },
            "passwordInput": { type: "role", value: "textbox", options: '{"name":"Enter Password"}', nth: 0 },
            "upcomingTab": { type: "text", value: "Upcoming", options: '{"exact":true}', nth: 0 },
            "firstMatchContainer": { type: "locator", value: "div.flex.flex-row.w-full.gap-1.text-xs", options: '{}', nth: 0 },
            "buildABetTab": { type: "text", value: "Build A Bet", options: '{}', nth: 0 },
            "randomMarketButton": { type: "locator", value: ".bg-light-200.dark\\:bg-dark-900.sticky.left-0.z-\\[11\\].md\\:z-10.md\\:pt-2.md\\:-mt-2.top-\\[112px\\].lg\\:top-\\[152px\\].hidden > .bg-dark-800 > .flex.items-center.w-full > div:nth-child(7) > .w-6", options: '{}', nth: 0 },
            "infoMessage1x2": { type: "text", value: "1X2 Bets Can Be Placed By Either Selecting A Home Win, A Draw, Or An Away Win.", options: '{}', nth: 0 },
            "infoMessageDoubleChance": { type: "text", value: "Double Chance Allows You To", options: '{}', nth: 0 },
            "infoMessageBothTeamsScore": { type: "text", value: "Both Teams To Score (GG/NG) Predict Whether Both Teams Will Score At Least One", options: '{}', nth: 0 },
            "infoMessageTotalGoals": { type: "text", value: "Total Goals Predict the Total Number Of Goals In A Match.", options: '{}', nth: 0 },
            "favoriteButton": { type: "locator", value: ".w-6.h-6.flex-shrink-0", options: '{}', nth: 0 },
            "infoButton": { type: "locator", value: ".w-6.h-6.fill-light-50.prevent-trigger", options: '{}', nth: 0 },
            "marketExpandIcon": { type: "locator", value: ".z-10.w-6.h-6.fill-light-50", options: '{}', nth: 0 },
            "oddOver0_5": { type: "text", value: "Over (0.5)", options: '{}', nth: 0 },
            "oddUnder0_5": { type: "text", value: "Under (0.5)", options: '{}', nth: 0 },
            "oddOver1_5": { type: "text", value: "Over (1.5)", options: '{}', nth: 0 },
            "oddDraw": { type: "locator", value: "#more-market-container", options: '{"hasText": "Draw"}' , nth: 0 },
            "totalOddsBar": { type: "locator", value: ".bg-dark-800 div", options: '{"hasText": "/\\d+ Selections \\| Total Odds/"}', nth: 0 },
            "addToBetslipButton": { type: "role", value: "button", options: '{"name":"Add to Betslip", "exact":true}', nth: 0 },
            "clearAllButton": { type: "role", value: "button", options: '{"name":"Clear all", "exact":true}', nth: 0 },
            "selectedOddsScroller": { type: "locator", value: "#build-a-bet-selection-scroller", options: '{}', nth: 0 },
            "removeOddIcon": { type: "locator", value: "#build-a-bet-selection-scroller path", options: '{}', nth: 0 },
            "invalidCombinationMessage": { type: "text", value: "This combination is not", options: '{}', nth: 0 },
        };
    }
}

// update excel with these locators

// key type value options nth
// mobileInput role textbox {"name":"Mobile Number"} 0
// passwordInput role textbox {"name":"Enter Password"} 0
// upcomingTab text Upcoming {"exact":true} 0
// firstMatchContainer locator div.flex.flex-row.w-full.gap-1.text-xs {} 0
// buildABetTab text Build A Bet {} 0
// randomMarketButton locator .bg-light-200.dark\\:bg-dark-900...div:nth-child(7) > .w-6 {} 0
// infoMessage1x2 text 1X2 Bets Can Be Placed By Either... {} 0
// infoMessageDoubleChance text Double Chance Allows You To {} 0
// infoMessageBothTeamsScore text Both Teams To Score (GG/NG)... {} 0
// infoMessageTotalGoals text Total Goals Predict the Total Number... {} 0
// favoriteButton locator .w-6.h-6.flex-shrink-0 {} 0
// infoButton locator .w-6.h-6.fill-light-50.prevent-trigger {} 0
// marketExpandIcon locator .z-10.w-6.h-6.fill-light-50 {} 0
// oddOver0_5 text Over (0.5) {} 0
// oddUnder0_5 text Under (0.5) {} 0
// oddOver1_5 text Over (1.5) {} 0
// oddDraw locator #more-market-container {"hasText": "Draw"} 0
// totalOddsBar locator .bg-dark-800 div {"hasText": "/\\d+ Selections \| Total Odds/"} 0
// addToBetslipButton role button {"name":"Add to Betslip", "exact":true} 0
// clearAllButton role button {"name":"Clear all", "exact":true} 0
// selectedOddsScroller locator #build-a-bet-selection-scroller {} 0
// removeOddIcon locator #build-a-bet-selection-scroller path {} 0
// invalidCombinationMessage text This combination is not {} 0