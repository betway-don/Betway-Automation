// import { expect } from '@playwright/test';
// import { bookAbetTest, ScreenshotHelper } from '../../../fixtures/MasterFixtureFile';
// import { highlightElements } from '../../../../Common-Flows/HighlightElements';
// import { clear } from 'console';
// import { clearHighlights } from '../../../../Common-Flows/HighlightElements';
// import { OddsSelection } from '../../../../Common-Flows/OddsSelect';
// import { bookABetLocators } from '../../../locators/bookABetLocators';
// import { BetSaverPage } from '../../../pages/BetSaverPage';

// bookAbetTest.describe('BookABet Module Tests', () => {
//     bookAbetTest('T1-Verify presence of Booking Code(Book A Bet) Section', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.gotit.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await highlightElements(locators.bookABet);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T1-bookabet', testInfo);
//     });

//     bookAbetTest('T2-Verify user able to navigate to Booking Code(Book A Bet) Section', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.gotit.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.page.waitForTimeout(1000);
//         await highlightElements(locators.bookABetSearch);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T2b-bookabet', testInfo);
//     });

//     bookAbetTest('T3-Verify Search text box is visible on Booking Code(Book A Bet) screen', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.gotit.click();
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await highlightElements(locators.bookABetSearch);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T3-bookabet', testInfo);
//         await clearHighlights(locators.bookABetSearch);
//     });
//     bookAbetTest('T4-Verify user able to click on Search text box on Booking Code(Book A Bet) screen', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.bookABetSearch.click();
//         await bookABetPage.page.waitForTimeout(2000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T4-bookabet', testInfo);
//     });

//     bookAbetTest('T5-Verify user able to enter booking code in Search text box on Booking Code(Book A Bet) screen', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await bookABetPage.locators.copyBookingCode.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await bookABetPage.closePopup();
//         await bookABetPage.page.waitForTimeout(1000);
//         await bookABetPage.locators.bookABetSearch.click();

//         // Clear any existing value (optional but recommended)
//         await bookABetPage.locators.bookABetSearch.fill('');

//         // Paste clipboard content using Ctrl+V
//         await bookABetPage.page.keyboard.press('Control+V');
//         await bookABetPage.locators.bookABetSearchIcon.click();
//         await bookABetPage.locators.multiBetSlip.click()
//         await bookABetPage.page.waitForTimeout(2000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T5-bookabet', testInfo);
//     });

//     bookAbetTest('T6-Verify when user clicks on Search icon without entering the booking code it should show error message "Booking Code not found"', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.bookABetSearchIcon.click();
//         await bookABetPage.page.waitForTimeout(3000);
//         await expect(locators.codeNotFound).toBeVisible();
//         await highlightElements(locators.codeNotFound);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T6-bookabet', testInfo);
//         await clearHighlights(locators.codeNotFound);
//     });

//     bookAbetTest('T7-Verify user able to see "Sort By Odds" dropdown on Booking Code(Book A Bet) screen.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await expect(locators.sortByOdds).toBeVisible();
//         await highlightElements(locators.sortByOdds);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T7-bookabet', testInfo);
//         await clearHighlights(locators.sortByOdds);
//     });

//     bookAbetTest('T8-Verify after clicking on "Sort By Odds" dropdown button user able to see Odds, Win Boost, Outcomes, Bets Taken options in the dropdown', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.sortByOdds.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T8-bookabet', testInfo);
//     });

//     bookAbetTest('T9-Verify user able to see Arrow filter button on Booking Code(Book A Bet) screen.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await expect(locators.arrowFilter).toBeVisible();
//         await highlightElements(locators.arrowFilter);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T9-bookabet', testInfo);
//         await clearHighlights(locators.arrowFilter);
//     });

//     bookAbetTest('T10-Verify functionality of Arrow when in UP direction', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.arrowFilter.click();
//         await highlightElements(locators.arrowFilter);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T10-bookabet', testInfo);
//         await clearHighlights(locators.arrowFilter);
//     });

//     bookAbetTest('T11-Verify functionality of Arrow when in DOWN direction', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.arrowFilter.click();
//         await highlightElements(locators.arrowFilter);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T11-bookabet', testInfo);
//         await clearHighlights(locators.arrowFilter);
//     });

//     bookAbetTest('T12-Verify after clicking on "Sort By Odds" dropdown functionality', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.sortByOdds.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T12-bookabet', testInfo);
//     });

//     bookAbetTest('T13-Verify text message is displayed on clicking  "i" icon', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.infoButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T13-bookabet', testInfo);
//     });

//     bookAbetTest('T14-Verify  user able to see "Booking Code,  Outcomes , Odds, Bets Taken, Win Boost" tab on Booking Code(Book A Bet) screen. ', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.page.waitForTimeout(2000);
//         await expect(locators.detailedView).toBeVisible();
//         await highlightElements(locators.detailedView);
//         await bookABetPage.page.waitForTimeout(2000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T14-bookabet', testInfo);
//         await clearHighlights(locators.detailedView);
//     });

//     bookAbetTest('T15-Verify  user able to see Booking Code with share icon on Booking Code(Book A Bet) result screen.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await expect(locators.shareButton).toBeVisible();
//         await highlightElements(locators.shareButton);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T15-bookabet', testInfo);
//         await clearHighlights(locators.shareButton);
//     });

//     bookAbetTest('T16-Verify when user click on share option icon it will redirect share pop up window.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T16-bookabet', testInfo);
//         await bookABetPage.closePopup();
//     });

//     bookAbetTest('T17-Verify the Booking code pop window display "Share Your Bet" text with "Booking code"', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await expect(locators.shareyourBet).toBeVisible();
//         await highlightElements(locators.shareyourBet);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T17-bookabet', testInfo);
//         await clearHighlights(locators.shareyourBet);
//         await bookABetPage.closePopup();
//     });

//     bookAbetTest('T18-Verify text message is displayed on clicking copy icon T19-Verify after copied of the booking code it change to green colour.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await bookABetPage.locators.copyBookingCode.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T18,T19-bookabet', testInfo);
//         await bookABetPage.closePopup();
//     });

//     bookAbetTest('T20-Verify  user able to see Booking Code with share icon on Booking Code(Book A Bet) result screen.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T20-bookabet', testInfo);
//         await bookABetPage.closePopup();

//     });

//     bookAbetTest('T21-Verify after click on  zoom out icon on booking code slip it should open in pop up window,T22-Verify user able to close booking code slip by clicking on cross icon button,T23-Verify when user able to click outside the pop up screen then  booking code slip should be closed.T27-Verify presence and functionality of scanner', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await bookABetPage.page.waitForTimeout(2000);
//         await expect(locators.zoomInButton).toBeVisible({ timeout: 5000 });
//         await bookABetPage.locators.zoomInButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T21-bookabet', testInfo);
//         await bookABetPage.page.waitForTimeout(1000);
//         await bookABetPage.scrollToBottom();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T27-bookabet', testInfo);
//         await expect(locators.zoomCloseButton).toBeVisible({ timeout: 5000 });
//         await bookABetPage.locators.zoomCloseButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T22,T23-bookabet', testInfo);
//         await bookABetPage.closePopup();
//     });
//     bookAbetTest('T24,25-Verify user able to see WhatsApp, twitter, Facebook, Mail, Download options on pop up screen.T26-Verify after click download arrow icon button the booking code slip should be download.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await expect(locators.socialMediaButtons).toBeVisible({ timeout: 5000 });
//         await highlightElements(locators.socialMediaButtons);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T24-bookabet', testInfo);
//         await clearHighlights(locators.socialMediaButtons);



//         const mainPage = bookABetPage.page;

//         await expect(locators.socialMediaButtons).toBeVisible({ timeout: 5000 });

//         // Wait for new tab to open after click
//         const [newPage] = await Promise.all([
//             mainPage.context().waitForEvent('page'),
//             locators.whatsAppButton.click(),
//         ]);

//         await newPage.waitForLoadState('domcontentloaded');
//         await ScreenshotHelper.takeScreenshot(newPage, screenshotDir, 'T25-bookabet-whatsapp', testInfo);

//         // Close the new tab
//         await newPage.close();

//         // Back to main page (should already be focused)
//         await expect(locators.whatsAppButton).toBeVisible();
//         await expect(locators.downloadButton).toBeVisible({ timeout: 5000 });
//         await bookABetPage.locators.downloadButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T26-bookabet', testInfo);
//         await bookABetPage.closePopup();
//     });



//     bookAbetTest('T28,29-Verify user able to close Booking code screen by clicking on cross button .', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.shareButton.click();
//         await expect(locators.zoomInButton).toBeVisible({ timeout: 5000 });
//         await bookABetPage.locators.zoomInButton.click();
//         await expect(locators.zoomCloseButton).toBeVisible({ timeout: 5000 });
//         await bookABetPage.locators.zoomCloseButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T28-bookabet', testInfo);
//         await bookABetPage.page.waitForTimeout(1000);
//         await bookABetPage.closePopup();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T29-bookabet', testInfo);

//     });

//     bookAbetTest('T31-Verify on clicking Booking code with share icon, Outcomes with number of outcomes, Odds with odds value , Bets taken with number, Win boost with percentage button list of odds is displayed', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.page.waitForTimeout(2000);
//         await expect(locators.detailedView).toBeVisible();
//         await bookABetPage.clickDetailview();
//         await bookABetPage.page.waitForTimeout(2000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T31-bookabet', testInfo);
//     });

//     bookAbetTest('T32-Verify presence of  Add to Betslip button on Booking Code(Book A Bet) screen.', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.page.waitForTimeout(2000);
//         await expect(locators.addToBetSlip).toBeVisible();
//         await highlightElements(locators.addToBetSlip);
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T32-bookabet', testInfo);
//         await clearHighlights(locators.addToBetSlip);
//     });

//     bookAbetTest('T33,34-Verify user able to click on Add to Betslip button on Booking Code(Book A Bet) screen, Verify Bet now Functionality,T35-Verify Bets in Open Bets section inside My Bets,T36-Verify existence of Bet in Transaction History', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await bookABetPage.locators.addToBetSlip.click();
//         await bookABetPage.locators.multiBetSlip.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T33-bookabet', testInfo);

//         await bookABetPage.Login('999845637', '87654321');
//         // await bookABetPage.Login('964079720', '12345');
//         await bookABetPage.locators.betNowButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T34-bookabet', testInfo);

//         await bookABetPage.locators.myBetsButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T35-bookabet', testInfo);

//         await bookABetPage.locators.transactionHistoryButton.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T36-bookabet', testInfo);
//         await bookABetPage.closePopup();
//         await bookABetPage.page.waitForTimeout(1000);
//     });

//     bookAbetTest('T37-Verify Dropdowns expand/collapsed functionality,T38-Verify pagination presence and functionality', async ({ bookABetPage, locators, screenshotDir }, testInfo) => {
//         await bookABetPage.locators.sportButton.click();
//         await bookABetPage.clickBookingCode();
//         await expect(locators.detailedView).toBeVisible();
//         await bookABetPage.locators.detailedView.click();
//         await bookABetPage.page.waitForTimeout(1000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T37-bookabet', testInfo);
//         await expect(locators.paginationNextButton).toBeVisible();
//         await bookABetPage.locators.paginationNextButton.click();
//         await bookABetPage.page.evaluate(() => {
//             window.scrollBy({ top: -150, behavior: 'smooth' });
//         });
//         await bookABetPage.page.waitForTimeout(6000);
//         await ScreenshotHelper.takeScreenshot(bookABetPage.page, screenshotDir, 'T38-bookabet', testInfo);
//     });



// });
