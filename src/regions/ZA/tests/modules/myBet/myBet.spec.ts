import path from 'path';
import { test } from '@playwright/test';
import { highlightElements } from '../../../../../regions/Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../../regions/Common-Flows/ScreenshotHelper';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/footer');

async function login(page, mobile, password) {
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill(mobile);
    await page.getByRole('textbox', { name: 'Enter Password' }).fill(password);
    await page.getByRole('textbox', { name: 'Enter Password' }).press('Enter');
    await page.waitForLoadState('domcontentloaded');
}

const APP_URL = 'https://new.betway.co.za/sport'; // Replace with actual URL
const USER_MOBILE = '713533467';
const USER_PASSWORD = '12345';

test.describe('My Bets Page Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(APP_URL);
        await login(page, USER_MOBILE, USER_PASSWORD);
    });

    test('T1,2,3. Verify contents and structure of My Bets page', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Highlight 'Open Bets'
        const OpenBets = page.getByText('Open Bets');
        await highlightElements(OpenBets);

        // Highlight 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await highlightElements(settledBets);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'login-my-bets-highlight', testInfo);
    });



test('T5. Verify category dropdown options and functionality in Open Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Open Bets');
        await settledBets.click();

        // Step 1: Click 'Sports', then 'Betgames', take screenshot
        const sports = page.getByText('Sports', { exact: true });
        await sports.click();
        const betgames = page.getByLabel('Betgames').getByText('Betgames');
        await betgames.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-betgames', testInfo);

        // Step 2: Click 'Betgames', then 'Lucky Numbers', take screenshot
        await betgames.click();
        const luckyNumbers = page.getByLabel('Lucky Numbers').getByText('Lucky Numbers');
        await luckyNumbers.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-lucky-numbers', testInfo);

        // Step 3: Click 'Lucky Numbers', then 'Betway Jackpots', take screenshot
        await luckyNumbers.click();
        const jackpots = page.getByLabel('Betway Jackpots').getByText('Betway Jackpots');
        await jackpots.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-jackpots', testInfo);

        // Step 4: Click 'Betway Jackpots', then 'Tote', take screenshot
        await jackpots.click();
        const tote = page.getByText('Tote', { exact: true });
        await tote.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-tote', testInfo);
    });

    test('T6. Verify "All Drop-down" result data options in Open Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Open Bets');
        await settledBets.click();

        // Step 1: Click 'All', take screenshot
        const all = page.getByText('All', { exact: true });
        await all.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-all', testInfo);

        // Step 2: Click 'All', then 'Cashout', take screenshot
        await all.click();
        const cashout = page.getByText('Cashout');
        await cashout.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-cashout', testInfo);

        // Step 3: Click 'Cashout', then 'Win', take screenshot
        await cashout.click();
        const win = page.getByText('Win', { exact: true });
        await win.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-win', testInfo);

        // Step 4: Click 'Win', then 'Loss', take screenshot
        await win.click();
        const loss = page.getByLabel('Loss').getByText('Loss');
        await loss.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-loss', testInfo);
    });

    test('T7. Verify search text box, button, and refresh in Open Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Open Bets');
        await settledBets.click();

        // Find the search textbox, highlight, fill 'fc', and press Enter
        const searchBox = page.getByRole('textbox', { name: 'Search bets...' });
        await highlightElements(searchBox);
        await searchBox.fill('fc');
        await searchBox.press('Enter');
        await page.waitForTimeout(3000);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'search-bets-fc', testInfo);
    });

    test('T9. Open Bets>>Verify Detail view button functionality)', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Open Bets');
        await settledBets.click();

        await page.getByText('Detail View').first().click();
        const detailofbet =  page.locator('.w-full.px-2.bg-light-100').first();
        await highlightElements(detailofbet);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });

     test('T11. Open Bets>>Verify share functionality)', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Open Bets');
        await settledBets.click();

        await page.locator('.cursor-pointer.w-5.h-5.rounded').first().click();

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });



  


    // setteled bets section
    test('T36,40,42. Verify Settled Bets section functionality', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        // Wait for 2 seconds
        await page.waitForTimeout(2000);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'settled-bets-section', testInfo);
    });

    test('T37. Verify category dropdown options and functionality in Settled Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        // Step 1: Click 'Sports', then 'Betgames', take screenshot
        const sports = page.getByText('Sports', { exact: true });
        await sports.click();
        const betgames = page.getByLabel('Betgames').getByText('Betgames');
        await betgames.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-betgames', testInfo);

        // Step 2: Click 'Betgames', then 'Lucky Numbers', take screenshot
        await betgames.click();
        const luckyNumbers = page.getByLabel('Lucky Numbers').getByText('Lucky Numbers');
        await luckyNumbers.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-lucky-numbers', testInfo);

        // Step 3: Click 'Lucky Numbers', then 'Betway Jackpots', take screenshot
        await luckyNumbers.click();
        const jackpots = page.getByLabel('Betway Jackpots').getByText('Betway Jackpots');
        await jackpots.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-jackpots', testInfo);

        // Step 4: Click 'Betway Jackpots', then 'Tote', take screenshot
        await jackpots.click();
        const tote = page.getByText('Tote', { exact: true });
        await tote.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'combobox-tote', testInfo);
    });

    test('T38. Verify "All Drop-down" result data options in Settled Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        // Step 1: Click 'All', take screenshot
        const all = page.getByText('All', { exact: true });
        await all.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-all', testInfo);

        // Step 2: Click 'All', then 'Cashout', take screenshot
        await all.click();
        const cashout = page.getByText('Cashout');
        await cashout.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-cashout', testInfo);

        // Step 3: Click 'Cashout', then 'Win', take screenshot
        await cashout.click();
        const win = page.getByText('Win', { exact: true });
        await win.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-win', testInfo);

        // Step 4: Click 'Win', then 'Loss', take screenshot
        await win.click();
        const loss = page.getByLabel('Loss').getByText('Loss');
        await loss.click();
        await page.waitForTimeout(1000);
        await ScreenshotHelper(page, screenshotDir, 'settled-loss', testInfo);
    });

    test('T39. Verify search text box, button, and refresh in Settled Bets', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        // Find the search textbox, highlight, fill 'fc', and press Enter
        const searchBox = page.getByRole('textbox', { name: 'Search bets...' });
        await highlightElements(searchBox);
        await searchBox.fill('fc');
        await searchBox.press('Enter');
        await page.waitForTimeout(3000);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'search-bets-fc', testInfo);
    });

    test('T41. Verify "Hide Losses" toggle functionality (OFF state)', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        // Find the custom label, highlight and click it
        const customLabel = page.locator('#my-bets-container div').filter({ hasText: 'SportsAllHide Losses' }).locator('label span');
        await highlightElements(customLabel);
        await customLabel.click();
        await page.waitForTimeout(5000);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });


    test('T43. Settled Bets>>Verify Detail view button functionality)', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        await page.getByText('Detail View').first().click();
        const detailofbet =  page.locator('.w-full.px-2.bg-light-100').first();
        await highlightElements(detailofbet);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });


    test('T44. settled bets verify pagination', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

         await page.locator('#transaction-history-next').click();


        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });


    test('T45. Settled Bets>>Verify Detail view button functionality)', async ({ page }, testInfo) => {
        // Click 'My Bets'
        const myBets = page.getByText('My Bets').first();
        await myBets.click();

        // Click 'Settled Bets'
        const settledBets = page.getByText('Settled Bets');
        await settledBets.click();

        await page.getByText('Detail View').first().click();
        const detailofbet =  page.locator('.w-full.px-2.bg-light-100').first();
        await highlightElements(detailofbet);

        // Take screenshot
        await ScreenshotHelper(page, screenshotDir, 'custom-label-sportsallhide-losses', testInfo);
    });

});