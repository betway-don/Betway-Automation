// import { expect } from '@playwright/test';
// import { transactionHistoryTest, ScreenshotHelper } from '../../../fixtures/MasterFixtureFile';
// import { TransactionHistoryPage } from '../../../pages/TransactionHistoryPage';
// import { transactionHistoryLocators } from '../../../locators/transactionHistoryLocators';
// import { highlightElements, clearHighlights } from '../../../../Common-Flows/HighlightElements';

// transactionHistoryTest.describe('Transaction History Module Tests', () => {

//     // T1: Verify contents of Transaction History page
//     transactionHistoryTest('T1-Hamburger Menu >> Verify Transaction History page contents',
//         async ({ transactionHistoryPage, screenshotDir }, testInfo) => {
//             await transactionHistoryPage.navigateToTransactionHistory();
//             await transactionHistoryPage.page.waitForTimeout(1000);

//             await highlightElements(transactionHistoryPage.locators.accountMain);
//             await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T1-TransactionHistory', testInfo);
//             await clearHighlights(transactionHistoryPage.locators.accountMain);
//             await transactionHistoryPage.page.waitForTimeout(500);
//             await transactionHistoryPage.closePopup();
//         });

//     // T2–T5: Verify All, Deposits, Withdrawals, Sports tabs
//     transactionHistoryTest('T2-T5: Verify all tabs click and take screenshots', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         const tabs = [
//             { locator: locators.allBtn, name: 'T2-All' },
//             { locator: locators.depositBtn, name: 'T3-Deposits' },
//             { locator: locators.withdrawalBtn, name: 'T4-Withdrawals' },
//             { locator: locators.sportsBtn, name: 'T5-Sports' },
//         ];

//         for (const tab of tabs) {
//             await tab.locator.click();
//             await transactionHistoryPage.page.waitForTimeout(1000);
//             await highlightElements(tab.locator);
//             await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, `TransactionHistory_${tab.name}`, testInfo);
//             await clearHighlights(tab.locator);
//         }
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();
//     });

//     // T11: Calendar
//     transactionHistoryTest('T11-Verify calendar opens', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         await locators.datePicker.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await highlightElements(locators.dateDialog);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T11-TransactionHistory_Calendar', testInfo);
//         await clearHighlights(locators.dateDialog);
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();
//     });

//     // T12: Search
//     transactionHistoryTest('T12-Search transaction by ID', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();

//         // Get the transaction ID text from the button
//         const transactionId = (await locators.transactionIDButton.textContent())?.trim();

//         if (transactionId) {
//             // Type into number input
//             await locators.transactionIdInput.fill("12345678");

//             // Press Enter
//             await transactionHistoryPage.page.keyboard.press('Enter');

//             // Wait for results to load
//             await transactionHistoryPage.page.waitForTimeout(1000);

//             // Take screenshot
//             await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T12-TransactionHistory_Search', testInfo);

//             await transactionHistoryPage.page.waitForTimeout(500);

//             // Close any popup
//             await transactionHistoryPage.closePopup();
//         } else {
//             throw new Error("Transaction ID could not be retrieved.");
//         }
//     });


//     // T13: Export
//     transactionHistoryTest('T13-Export transactions', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         await locators.exportBtn.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await highlightElements(locators.exportBtn);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T13-TransactionHistory_Export', testInfo);
//         await clearHighlights(locators.exportBtn);
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();
//     });

//     // T14-T15: Transaction Detail view & Back
//     transactionHistoryTest('T14-T15-Transaction Detail view and Back', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         await locators.transactionDetailView.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T14-TransactionHistory_DetailView', testInfo);

//         await locators.detailViewBackButton.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T15-TransactionHistory_Back', testInfo);
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();

//     });

//     // T16: Pagination
//     transactionHistoryTest('T16-Pagination', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         await locators.nextPageButton.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T16-TransactionHistory_NextPage', testInfo);

//         await locators.prevPageButton.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T16-TransactionHistory_PrevPage', testInfo);
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();
//     });

//     // T17-T19: Betslip info
//     transactionHistoryTest('T17-T19-Betslip info', async ({ transactionHistoryPage, locators, screenshotDir }, testInfo) => {
//         await transactionHistoryPage.navigateToTransactionHistory();
//         await locators.transactionIDButton.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T17,18-TransactionHistory_BetslipContents', testInfo);

//         await locators.betslipBackButton.click();
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T19-TransactionHistory_BetslipClosed', testInfo);
//         await transactionHistoryPage.page.waitForTimeout(500);
//         await transactionHistoryPage.closePopup();
//     });
//     transactionHistoryTest('T20 - Verify Bet Now to Transaction History', async ({ transactionHistoryPage, screenshotDir }, testInfo) => {

//         //Place a bet
//         await transactionHistoryPage.placeBet(transactionHistoryPage.page);
//         // Navigate to Transaction History
//         await transactionHistoryPage.navigateToTransactionHistory();
//         // Wait a bit for page to load
//         await transactionHistoryPage.page.waitForTimeout(1000);
//         // Take screenshot of Transaction History page
//         await ScreenshotHelper.takeScreenshot(transactionHistoryPage.page, screenshotDir, 'T20_BetNow_TransactionHistory', testInfo);
//     });
// });
