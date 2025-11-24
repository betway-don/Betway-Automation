// import { expect } from '@playwright/test';
// import { betSaverTest, ScreenshotHelper } from '../../../fixtures/MasterFixtureFile';
// import {
//   OddsSelection,
//   DrawNoBetOddsSelection,
//   EsportsOddsSelection,
//   LiveOddsSelection,
// } from '../../../../Common-Flows/OddSelection';

// /**
//  * Refactored helpers — same behaviour as your original file but a bit cleaner
//  */

// // small helper to reload & ensure DOM loaded
// async function preparePage(betSaverPage: any) {
//   await betSaverPage.page.waitForTimeout(1500);
//   await betSaverPage.page.reload();
//   await betSaverPage.page.waitForLoadState('domcontentloaded');
// }

// // close popup if locator is visible (keeps same semantics)
// async function closeIfVisible(betSaverPage: any, locator: any) {
//   try {
//     if (locator && (await locator.isVisible())) {
//       await expect(locator).toBeVisible({ timeout: 10000 });
//       await betSaverPage.closePopup();
//     }
//   } catch {
//     // swallow - popup might disappear between checks
//   }
// }

// // delete betslip if visible
// async function deleteBetslipIfVisible(betSaverPage: any) {
//   try {
//     const btn = betSaverPage.locators?.betslipDeleteButton;
//     if (btn && (await btn.isVisible())) {
//       await expect(btn).toBeVisible({ timeout: 10000 });
//       await btn.click();
//     }
//   } catch {
//     // ignore
//   }
// }

// // wrapper to call the page object's captureScreenshot consistently
// async function capture(betSaverPage: any, locatorOrKey: any, screenshotDir: string, name: string, testInfo: any) {
//   // original accepted either locator or key from locators (you passed locators earlier)
//   await betSaverPage.captureScreenshot(locatorOrKey, screenshotDir, name, testInfo);
// }

// // safe interactions
// async function safeClick(locator: any, name = 'element') {
//   await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 7000 });
//   await locator.click();
// }

// async function safeFill(locator: any, value: string, name = 'input') {
//   await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 7000 });
//   await locator.fill(value);
// }

// async function safePress(page: any, key: string) {
//   await page.keyboard.press(key);
// }

// async function tryClick(locator: any, name = 'element', timeout = 2000) {
//   try {
//     if (await locator.isVisible({ timeout })) {
//       await locator.click();
//       return true;
//     }
//     return false;
//   } catch {
//     return false;
//   }
// }

// /**
//  * runSafeTest utility:
//  * - preserves original behaviour: attempts to capture a failure screenshot on error and rethrows
//  * - accepts same parameters as your previous implementation
//  */
// async function runSafeTest(
//   fn: () => Promise<void>,
//   betSaverPage: any,
//   testInfo: any,
//   screenshotDir: string,
//   name: string
// ) {
//   try {
//     await fn();
//   } catch (error) {
//     const screenshotPath = `${screenshotDir}/${name}-failure.png`;
//     try {
//       if (betSaverPage?.page) {
//         await betSaverPage.page.screenshot({ path: screenshotPath, fullPage: true });
//         await testInfo.attach(`${name}-failure`, { path: screenshotPath, contentType: 'image/png' });
//       }
//     } catch (screenshotError) {
//       console.warn(`⚠️ Could not capture screenshot for ${name}:`, screenshotError);
//     }
//     throw error;
//   }
// }

// /* ===========================
//    Tests (kept the exact order and merged groups)
//    =========================== */

// betSaverTest.describe('BetSaver Module Tests', () => {
//   // T1
//   betSaverTest('T1 - Verify Betsaver not active', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await betSaverPage.locators.gotit.click().catch(() => {});
//       await preparePage(betSaverPage);

//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//       await OddsSelection(2, betSaverPage.page, 'ZA');

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T1', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T1');
//   });

//   // T2-7 (merged)
//   betSaverTest('T2-7 - Betsaver Popup Flow', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await betSaverPage.locators.gotit.click().catch(() => {});
//       await preparePage(betSaverPage);

//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//       await OddsSelection(12, betSaverPage.page, 'ZA');

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');

//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T2-3', testInfo);

//       await safeClick(betSaverPage.locators.betSaverInfo, 'BetSaver Info');
//       await ScreenshotHelper.takeScreenshot(betSaverPage.page, screenshotDir, 'T4-5', testInfo);

//       await safeClick(betSaverPage.locators.continueInBetSaverInfo, 'Continue in BetSaver Info');
//       await ScreenshotHelper.takeScreenshot(betSaverPage.page, screenshotDir, 'T6', testInfo);

//       await safeClick(betSaverPage.locators.betSaverInfo, 'BetSaver Info Again');
//       await betSaverPage.closePopup();
//       await ScreenshotHelper.takeScreenshot(betSaverPage.page, screenshotDir, 'T7', testInfo);

//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T2-7');
//   });

//   // T8-9 (merged)
//   betSaverTest('T8-9 - Betsaver gray out in My Bets', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await betSaverPage.locators.gotit.click().catch(() => {});
//       await preparePage(betSaverPage);

//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//       await OddsSelection(3, betSaverPage.page, 'ZA');

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betNowButton, 'BetNow Button');

//       // Wait for bet placement flows to settle (kept same behaviour)
//       await betSaverPage.page.waitForTimeout(5000);
//       await betSaverPage.closePopup();

//       await betSaverPage.navigateToMyBets();
//       await betSaverPage.page.waitForTimeout(2000);

//       await capture(betSaverPage, locators.betSaverInMyBets, screenshotDir, 'T8', testInfo);

//       await safeClick(betSaverPage.locators.settledBetsButton, 'Settled Bets Button');
//       await betSaverPage.page.waitForTimeout(3000);

//       await capture(betSaverPage, locators.betSaverInMyBets, screenshotDir, 'T9', testInfo);

//       await closeIfVisible(betSaverPage, betSaverPage.locators.closePopup);
//     }, betSaverPage, testInfo, screenshotDir, 'T8-9');
//   });

//   // T10-15 (merged)
//   betSaverTest('T10-15 - Betsaver Active in My Bets', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await preparePage(betSaverPage);

//       await OddsSelection(8, betSaverPage.page, 'ZA');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betNowButton, 'BetNow Button');

//       await betSaverPage.page.waitForTimeout(5000);
//       await betSaverPage.closePopup();
//       await betSaverPage.navigateToMyBets();

//       await capture(betSaverPage, locators.betSaverInMyBets, screenshotDir, 'T10', testInfo);

//       await safeClick(betSaverPage.locators.detailViewButton, 'Detail View Button');
//       await capture(betSaverPage, locators.detailViewButton, screenshotDir, 'T11', testInfo);

//       // kept commented steps as in original
//       // await safeClick(betSaverPage.locators.betSaverInDetailView, "BetSaver in DetailView");
//       // await capture(betSaverPage, locators.betSaverInDetailView, screenshotDir, 'T12', testInfo);
//       // await betSaverPage.cashoutBet();

//       await safeClick(betSaverPage.locators.settledBetsButton, 'Settled Bets Button');
//       await capture(betSaverPage, locators.betSaverInMyBets, screenshotDir, 'T13', testInfo);

//       await safeClick(betSaverPage.locators.detailViewButton, 'Detail View Button');
//       await capture(betSaverPage, locators.detailViewButton, screenshotDir, 'T14', testInfo);

//       // await safeClick(betSaverPage.locators.betSaverInDetailView, "BetSaver in DetailView");
//       // await capture(betSaverPage, locators.betSaverInDetailView, screenshotDir, 'T15', testInfo);

//       await betSaverPage.closePopup();
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T10-15');
//   });

//   // T19-20 (merged)
//   betSaverTest('T19-20 - Betsaver not active for Outrights and Mixed Bets', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await betSaverPage.outrightsSelection();
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T19', testInfo);

//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');

//       await preparePage(betSaverPage);
//       await OddsSelection(2, betSaverPage.page, 'ZA');

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T20', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T19-20');
//   });

//   // T21
//   betSaverTest('T21 - Betsaver active from Book a Bet', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await betSaverPage.clickBookingCode();

//       await safeClick(betSaverPage.locators.addToBetSlip, 'Add To BetSlip');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       try {
//         await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');
//         await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T21', testInfo);
//         await deleteBetslipIfVisible(betSaverPage);
//       } catch {
//         await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active (fallback)');
//         await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T21', testInfo);
//         await deleteBetslipIfVisible(betSaverPage);
//       }
//     }, betSaverPage, testInfo, screenshotDir, 'T21');
//   });

//   // T26-27 (merged)
//   betSaverTest('T26-27 - Betsaver offer for odds below 1.2', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');
//       await safeClick(betSaverPage.locators.smartPicks5, 'Smart Picks 5');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T26', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);

//       // Try to pick higher SmartPicks options, fallback chain preserved
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');

//       if (await tryClick(betSaverPage.locators.smartPicks30, 'Smart Picks 30')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(6, betSaverPage.page, 'ZA');
//       } else if (await tryClick(betSaverPage.locators.smartPicks25, 'Smart Picks 25')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(8, betSaverPage.page, 'ZA');
//       } else if (await tryClick(betSaverPage.locators.smartPicks20, 'Smart Picks 20')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(10, betSaverPage.page, 'ZA');
//       } else {
//         console.warn('❌ No Smart Picks option available (30, 25, or 20).');
//       }

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');

//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T27', testInfo);

//       await safeClick(betSaverPage.locators.betSaverInfo, 'BetSaver Info');
//       await ScreenshotHelper.takeScreenshot(betSaverPage.page, screenshotDir, 'T27-Info', testInfo);

//       await betSaverPage.closePopup();
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T26-27');
//   });

//   // T28
//   betSaverTest('T28 - Betsaver after Confirm Rebet', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await preparePage(betSaverPage);
//       await betSaverPage.page.waitForTimeout(1500);
//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');

//       await OddsSelection(12, betSaverPage.page, 'ZA');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       await betSaverPage.acceptNewWager();
//       await betSaverPage.page.waitForTimeout(1500);
//       await betSaverPage.closePopup();
//       await betSaverPage.page.waitForTimeout(4000);

//       await betSaverPage.navigateToMyBets();
//       await capture(betSaverPage, locators.betSaverInMyBets, screenshotDir, 'T28', testInfo);

//       await closeIfVisible(betSaverPage, locators.closePopup);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T28');
//   });

//   // T29
//   betSaverTest('T29 - Betsaver after Sharing Booking Code', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await preparePage(betSaverPage);
//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');

//       await OddsSelection(10, betSaverPage.page, 'ZA');

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.shareButton, 'Share Button');
//       await safeClick(betSaverPage.locators.copyBookingCode, 'Copy Booking Code');

//       await closeIfVisible(betSaverPage, locators.closePopup);

//       await safeFill(betSaverPage.locators.betSlipTextBox, '', 'BetSlip TextBox');
//       await safePress(betSaverPage.page, 'Control+V');

//       await safeClick(betSaverPage.locators.betSlipsearchIcon, 'BetSlip Search Icon');
//       await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');

//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T29', testInfo);
//       await closeIfVisible(betSaverPage, locators.closePopup);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T29');
//   });

//   // T30
//   betSaverTest('T30 - Betsaver with Low Odds + Few Legs + High Wager', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');
//       await safeClick(betSaverPage.locators.smartPicks5, 'Smart Picks 5');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       await safeFill(betSaverPage.locators.wagerAmountInput, '2000', 'Wager Amount Input');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T30', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T30');
//   });

//   // T31
//   betSaverTest('T31 - Betsaver with Low Odds + Few Legs', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');
//       await safeClick(betSaverPage.locators.smartPicks10, 'Smart Picks 10');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T31', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T31');
//   });

//   // T32
//   betSaverTest('T32 - Betsaver with Low Odds + Many Legs', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');

//       if (await tryClick(betSaverPage.locators.smartPicks30, 'Smart Picks 30')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(6, betSaverPage.page, 'ZA');
//       } else if (await tryClick(betSaverPage.locators.smartPicks25, 'Smart Picks 25')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(8, betSaverPage.page, 'ZA');
//       } else if (await tryClick(betSaverPage.locators.smartPicks20, 'Smart Picks 20')) {
//         await preparePage(betSaverPage);
//         await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');
//         await OddsSelection(10, betSaverPage.page, 'ZA');
//       } else {
//         console.warn('❌ No Smart Picks option available (30, 25, or 20).');
//       }

//       await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');
//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T32', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T32');
//   });

//   // T23 (kept last as in your file)
//   betSaverTest('T23 - Betsaver with Draw No Bet', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await preparePage(betSaverPage);
//       await safeClick(betSaverPage.locators.upcomingButton, 'Upcoming Button');

//       await DrawNoBetOddsSelection(1, betSaverPage.page, 'ZA');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T23', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T23');
//   });

//   // T24-25 (merged)
//   betSaverTest('T24-25 - Betsaver when Bet Slip has multiple markets', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//       await safeClick(betSaverPage.locators.smartPicksButton, 'Smart Picks Button');
//       await safeClick(betSaverPage.locators.smartPicks5, 'Smart Picks 5');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       // add second market
//       await betSaverPage.outrightsSelection();
//       await safeClick(betSaverPage.locators.betSaverNotActive, 'BetSaver Not Active');

//       await capture(betSaverPage, locators.betSaverNotActive, screenshotDir, 'T24-25', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);

//       await safeClick(betSaverPage.locators.sportButton, 'Sport Button');
//     }, betSaverPage, testInfo, screenshotDir, 'T24-25');
//   });

//   // T16 (kept in original position)
//   betSaverTest('T16 - Betsaver active for Esports', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await safeClick(betSaverPage.locators.eSportsButton, 'Esports Button');

//       const clickedOdds = await EsportsOddsSelection(10, betSaverPage.page, 'ZA');

//       if (clickedOdds === 0) {
//         throw new Error('❌ No odds were selected for Esports even after retries');
//       }

//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');

//       const isBetSaverVisible = await betSaverPage.locators.betSaverActive.isVisible();
//       if (isBetSaverVisible) {
//         console.log(`✅ BetSaver active — test passed (clicked ${clickedOdds} odds)`);
//       } else {
//         throw new Error('❌ BetSaver not active after odds selection');
//       }

//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T16', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T16');
//   });

//   // T18 (final)
//   betSaverTest('T18 - Betsaver active for Live Games', async ({ betSaverPage, locators, screenshotDir }, testInfo) => {
//     await runSafeTest(async () => {
//       await LiveOddsSelection(8, betSaverPage.page, 'ZA');
//       await safeClick(betSaverPage.locators.multiBetSlip, 'Multi BetSlip');
//       await safeClick(betSaverPage.locators.betSaverActive, 'BetSaver Active');

//       await capture(betSaverPage, locators.betSaverActive, screenshotDir, 'T18', testInfo);
//       await deleteBetslipIfVisible(betSaverPage);
//     }, betSaverPage, testInfo, screenshotDir, 'T18');
//   });
// });
