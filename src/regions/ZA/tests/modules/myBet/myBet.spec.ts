import { test } from '../../../fixtures/MasterFixtureFile'; // Adjust path
import { expect } from '@playwright/test';
import path from 'path';
import { ScreenshotHelper } from '../../../../../regions/Common-Flows/ScreenshotHelper'; // Adjust path
import { OddsSelection } from '../../../../../regions/Common-Flows/OddSelection'; // Adjust path

// Setup screenshot directory
const projectRoot = path.resolve(__dirname, '../../../..'); // Adjust depth as needed
const screenshotDir = path.join(projectRoot, 'screenshots/module/my-bets'); // New screenshot folder

// Global hook for clearing highlights
test.afterEach(async ({ signupUtils }) => {
    if (signupUtils) { // Use signupUtils if available, or create a common one
        await signupUtils.clearHighlights();
    }
});

test.describe('My Bets Page Functionality', () => {

    // --- MAIN SETUP ---
    // Logs in before any test in this suite
    test.beforeEach(async ({ myBetsPage, testData }) => {
        await myBetsPage.gotoSports();
        await myBetsPage.login(
            testData.myBetsCredentials.mobile,
            testData.myBetsCredentials.password
        );
    });

    // --- OPEN BETS TESTS ---
    test.describe('Open Bets Section', () => {

        // Clicks "My Bets" and "Open Bets" tab before each test in this group
        test.beforeEach(async ({ myBetsPage }) => {
            await myBetsPage.clickMyBets();
            await myBetsPage.clickOpenBetsTab();
        });

        test('T1,2,3. Verify contents and structure of My Bets page', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.highlightOpenBetsTab();
            await myBetsPage.highlightSettledBetsTab();
            await ScreenshotHelper(page, screenshotDir, 'my-bets-structure', testInfo);
        });

        test('T5. Verify category dropdown options in Open Bets', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.selectCategory('Betgames');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-cat-betgames', testInfo);

            await myBetsPage.selectCategory('Lucky Numbers');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-cat-lucky-numbers', testInfo);

            await myBetsPage.selectCategory('Jackpots');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-cat-jackpots', testInfo);

            await myBetsPage.selectCategory('Tote');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-cat-tote', testInfo);
        });

        test('T6. Verify "All Drop-down" result data options in Open Bets', async ({ page, myBetsPage }, testInfo) => {
            // Note: This test seems identical to T38. It's testing the same dropdown.
            // Assuming this dropdown is for "Filter"
            await myBetsPage.selectFilter('All');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-filter-all', testInfo);

            await myBetsPage.selectFilter('Cashout');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-filter-cashout', testInfo);

            await myBetsPage.selectFilter('Win');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-filter-win', testInfo);

            await myBetsPage.selectFilter('Loss');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-filter-loss', testInfo);
        });

        test('T7. Verify search text box in Open Bets', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.highlightSearchBox();
            await myBetsPage.searchFor('fc');
            await ScreenshotHelper(page, screenshotDir, 'open-bets-search-fc', testInfo);
        });

        test('T9. Open Bets>>Verify Detail view button functionality', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.clickDetailView(0);
            await myBetsPage.highlightDetailViewContainer(0);
            await ScreenshotHelper(page, screenshotDir, 'open-bets-detail-view', testInfo);
        });

        test('T11. Open Bets>>Verify share functionality', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.clickShare(0);
            // Note: Screenshotting a native share dialog is not reliable.
            // We screenshot the page *after* the click.
            await ScreenshotHelper(page, screenshotDir, 'open-bets-share-click', testInfo);
        });

        test('T17-22. Select 6 odds and check edit functionality', async ({ page, myBetsPage }, testInfo) => {
            await OddsSelection(6, page); // External helper
            await myBetsPage.placeBet();
            await ScreenshotHelper(page, screenshotDir, 'select-6-odds', testInfo);

            // Navigate back to My Bets (placing bet might close it)
            await myBetsPage.clickMyBets();
            await myBetsPage.clickOpenBetsTab();

            // Perform edit and continue
            await myBetsPage.performEditBetFlow('continue', 0);
            await ScreenshotHelper(page, screenshotDir, 'edit-bet-continue', testInfo);

            // Perform edit and cancel
            await myBetsPage.performEditBetFlow('cancel', 0);
            await ScreenshotHelper(page, screenshotDir, 'edit-bet-cancel', testInfo);
        });

        test('T23-26. My Bets Cashout flow and success highlight', async ({ page, myBetsPage }, testInfo) => {
            // Note: This test requires a bet to be in a cashout-able state.
            await myBetsPage.attemptCashout('confirm', 0);

            await expect(myBetsPage.getCashoutSuccessMessage()).toBeVisible();
            await myBetsPage.highlightCashoutSuccess();
            await ScreenshotHelper(page, screenshotDir, 'cashout-success', testInfo);
        });
    });

    // --- SETTLED BETS TESTS ---
    test.describe('Settled Bets Section', () => {

        // Clicks "My Bets" and "Settled Bets" tab before each test in this group
        test.beforeEach(async ({ myBetsPage }) => {
            await myBetsPage.clickMyBets();
            await myBetsPage.clickSettledBetsTab();
        });

        test('T36,40,42. Verify Settled Bets section loads', async ({ page, myBetsPage }, testInfo) => {
            await expect(myBetsPage.getSettledBetsTab()).toBeVisible(); // Simple check
            await page.waitForTimeout(2000); // Wait for data to load
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-section', testInfo);
        });

        test('T37. Verify category dropdown options in Settled Bets', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.selectCategory('Betgames');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-cat-betgames', testInfo);

            await myBetsPage.selectCategory('Lucky Numbers');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-cat-lucky-numbers', testInfo);

            await myBetsPage.selectCategory('Jackpots');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-cat-jackpots', testInfo);

            await myBetsPage.selectCategory('Tote');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-cat-tote', testInfo);
        });

        test('T38. Verify "All Drop-down" result data options in Settled Bets', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.selectFilter('All');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-filter-all', testInfo);

            await myBetsPage.selectFilter('Cashout');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-filter-cashout', testInfo);

            await myBetsPage.selectFilter('Win');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-filter-win', testInfo);

            await myBetsPage.selectFilter('Loss');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-filter-loss', testInfo);
        });

        test('T39. Verify search text box in Settled Bets', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.highlightSearchBox();
            await myBetsPage.searchFor('fc');
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-search-fc', testInfo);
        });

        test('T41. Verify "Hide Losses" toggle functionality', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.highlightHideLossesToggle();
            await myBetsPage.toggleHideLosses();
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-hide-losses-on', testInfo);
        });

        test('T43 & T45. Settled Bets>>Verify Detail view button', async ({ page, myBetsPage }, testInfo) => {
            // Merged T43 and T45 as they are identical
            await myBetsPage.clickDetailView(0);
            await myBetsPage.highlightDetailViewContainer(0);
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-detail-view', testInfo);
        });

        test('T44. settled bets verify pagination', async ({ page, myBetsPage }, testInfo) => {
            await myBetsPage.clickNextPage();
            // We screenshot after the click to show the *new* page state
            await page.waitForTimeout(1000); // Wait for new content to load
            await ScreenshotHelper(page, screenshotDir, 'settled-bets-pagination-next', testInfo);
        });
    });
});