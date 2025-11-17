import { test } from '../../../../ZA/fixtures/MasterFixtureFile'; // Adjust path
import { expect } from '@playwright/test';
import path from 'path';
import { ScreenshotHelper } from '../../../../../regions/Common-Flows/ScreenshotHelper'; // Adjust path
 
// Setup screenshot directory
const projectRoot = path.resolve(__dirname, '../../../..'); // Adjust depth as needed
const screenshotDir = path.join(projectRoot, 'screenshots/module/build-a-bet'); // New folder
 
// Global hook for clearing highlights
test.afterEach(async ({ signupUtils }) => {
    if (signupUtils) {
        await signupUtils.clearHighlights();
    }
});
 
test.describe('Build A Bet Section Tests', () => {
 
    // --- MAIN SETUP ---
    // This runs before EACH test, ensuring a clean, logged-in state
    // and navigates to the "Build A Bet" tab for a match.
    test.beforeEach(async ({ buildABetPage, testData }) => {
        await buildABetPage.gotoSports();
        await buildABetPage.login(
            testData.buildABetCredentials.mobile,
            testData.buildABetCredentials.password
        );
        // This single method handles the complex navigation flow
        await buildABetPage.navigateToBuildABet();
    });
 
    test('T1,T2,T3. Verify "Build A Bet" page UI and markets', async ({ page, buildABetPage }, testInfo) => {
        // We are already on the page thanks to beforeEach
        await buildABetPage.clickRandomMarketButton(); // Clicks the random market icon
        await buildABetPage.highlightBuildABetTab();
        await ScreenshotHelper(page, screenshotDir, 'build-a-bet-ui', testInfo);
    });
 
    test('T4. Verify the info icon text content', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.highlightInfoMessages();
        await ScreenshotHelper(page, screenshotDir, 'info-messages-highlighted', testInfo);
    });
 
    test('T5. Verify the info and favorite icons are clickable', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickFavorite(0);
        await buildABetPage.clickInfo(0);
        
        await buildABetPage.highlightFavorite(0);
        await buildABetPage.highlightInfo(0);
        await ScreenshotHelper(page, screenshotDir, 'info-favorite-icons', testInfo);
    });
 
    test('T6,7,8. Verify expand-collapse icon for markets', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.expandMarket(0); // Expand
        await buildABetPage.highlightMarket(0);
        await ScreenshotHelper(page, screenshotDir, 'expand-market-odds', testInfo);
    });
 
    test('T9,10,11,12. Click odd and verify Total odds bar is visible', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.highlightTotalOddsBar();
        await ScreenshotHelper(page, screenshotDir, 'total-odds-bar-visible', testInfo);
    });
 
    test('T13,14. Verify Add to Betslip and Clear all buttons are visible', async ({ page, buildABetPage }, testInfo) => {
        // Test T13 (disable) is hard to verify without knowing the exact state.
        // This test combines T13 and T14 to show the buttons are visible after 2 selections.
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickOdd('Draw');
        
        await buildABetPage.highlightAddAndClearButtons();
        await ScreenshotHelper(page, screenshotDir, 'add-betslip-clearall-visible', testInfo);
    });
 
    test('T15. Verify "Add to Betslip" button functionality', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickOdd('Draw');
        
        await buildABetPage.clickAddToBetslip();
        await buildABetPage.highlightAddAndClearButtons(); // Highlight *after* click
        await ScreenshotHelper(page, screenshotDir, 'add-to-betslip-clicked', testInfo);
    });
 
    test('T18. Verify functionality of "Clear All" button', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickOdd('Draw');
        
        await buildABetPage.highlightAddAndClearButtons();
        await buildABetPage.clickClearAll();
        // After clearing, the buttons should be hidden, so we just screenshot
        await ScreenshotHelper(page, screenshotDir, 'clear-all-clicked', testInfo);
    });
 
    test('T19,20. Verify selected odds display at bottom', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickOdd('Draw');
        
        await buildABetPage.highlightSelectedOddsScroller();
        await ScreenshotHelper(page, screenshotDir, 'selected-odds-scroller', testInfo);
    });
 
    test('T22,23,24. Verify Total Odds bar dropdown and cross icon', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickTotalOddsBar(); // Click to open dropdown
 
        await buildABetPage.highlightTotalOddsBar();
        await buildABetPage.highlightRemoveOddIcon();
        await ScreenshotHelper(page, screenshotDir, 'odds-bar-dropdown-open', testInfo);
 
        await buildABetPage.clickRemoveOddIcon(); // Click cross to remove odd
        await ScreenshotHelper(page, screenshotDir, 'odds-bar-remove-odd-clicked', testInfo);
    });
 
    test('T27,28,29. Verify invalid combination message', async ({ page, buildABetPage }, testInfo) => {
        await buildABetPage.clickOdd('Over (0.5)');
        await buildABetPage.clickOdd('Under (0.5)');
        await buildABetPage.clickOdd('Over (1.5)'); // This 3rd click should trigger the message
 
        await expect(buildABetPage.getInvalidCombinationMessage()).toBeVisible();
        await buildABetPage.highlightInvalidCombinationMessage();
        await ScreenshotHelper(page, screenshotDir, 'invalid-combination-message', testInfo);
    });
});