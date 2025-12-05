// import { test } from '../../../fixtures/MasterFixtureFile';
// import { expect } from '@playwright/test';
// import { log } from 'console';
// import path from 'path';
// import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
// import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
// import { BetInfluencerModal } from '../../../pages/BetInfluencerModal';
// import fs from 'fs';
// import { DrawNoBetOddsSelection, EsportsOddsSelection, LiveOddsSelection, OddsSelection, placeBetWithIndex } from '../../../../Common-Flows/OddSelection';
// import { SportsPage } from '../../../pages/SportsPage';
// import { GetBookingCode, GetSharedBookingCode } from '../../../../Common-Flows/GetBookingCode';

// const highlights = require('../../../apis/Highlights.json');
// const fakerdata = require('../../../json-data/faker.json');
// const userData = require('../../../json-data/userData.json');
// const projectRoot = path.resolve(__dirname, '../../..');
// const screenshotDir = path.join(projectRoot, 'screenshots/module/betInfluencer');
// const apidatafromHighlights = path.join(projectRoot, 'json-data/oddsData.json');
// const bookingCode = path.join(projectRoot, 'json-data/bookingcode-September.json');
// //14,15,25,26,29,31,19
// test.describe('BetInfluencer Tests', () => {
//     test("T1-", async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.toggleHambergerMenu();
//         await highlightElements(betinfluencerModal.BetInfluencer);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T1-Bet Influencer', testInfo);
//     });

//     test('NewT2-Verify presence of "Bet influencer" option in Hamburger menu on Account pop up window from My Bet.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.Login();
//         await betinfluencerModal.page.waitForLoadState('domcontentloaded');
//         await betinfluencerModal.SportButton.click();
//         await betinfluencerModal.page.getByText('My Bets').nth(0).click();
//         await betinfluencerModal.page.getByText(`Account Options: ${userData.user1.mobile} `)
//         const windowBetInfluencer = await betinfluencerModal.page.locator('#booking-codes-account-nav');
//         await windowBetInfluencer.waitFor({ state: 'visible', timeout: 5000 });
//         await highlightElements(windowBetInfluencer);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T2-Bet Influencer presence in My Bets', testInfo);
//     });

//     test('T2-Summary page presence', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.page.getByRole('button', { name: 'Summary' }));
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T2-Summary page presence', testInfo);
//         await expect(betinfluencerModal.page.getByRole('button', { name: 'Summary' })).toBeVisible();
//     });

//     test('T3-Details page presence', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.detailButton);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T3-Details page presence', testInfo);
//         await expect(betinfluencerModal.detailButton).toBeVisible();
//     });

//     test('T4 - Verify the Functionality and content of "Details" page inside the Bet influencer option from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.detailButton);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T4-Details page content', testInfo);
//     });

//     test('New-T5-Verify functionality of "Revenue" on Summary page', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.revenue);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T5-Revenue presence', testInfo);
//     });
//     test('New-T6/T7-Verify graphical representational data for  "Number of codes" inside summary section./Verify graphical representational data for  "Total Bets taken" inside summary section.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.revenueGraph);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T6-T7-Graphical representation', testInfo);
//     });
//     test('T5-Go to Detailed Breakdown', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.detailedBreakdownButton);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T5-Detailed Breakdown page before Click', testInfo);
//         await betinfluencerModal.detailedBreakdownButton.click();
//         await betinfluencerModal.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
//         await expect(betinfluencerModal.totalMonthlyRevenue).toBeVisible();
//         await highlightElements(betinfluencerModal.totalMonthlyRevenue);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T5-Detailed Breakdown page after Click', testInfo);
//     });

//     test('T6-Verify functionality of Month dropdown on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.monthsSelector);
//         await highlightElements(betinfluencerModal.totalMonthlyRevenue);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown before click', testInfo);
//         await betinfluencerModal.monthsSelector.click();
//         await betinfluencerModal.page.keyboard.press('ArrowUp');
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await highlightElements(betinfluencerModal.monthsSelector);
//         await highlightElements(betinfluencerModal.totalMonthlyRevenue);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown after click', testInfo);
//     });

//     test('T7/New T-18/T19/T20 - Verify functionality of sort by dropdown on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.sortBySelector);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T7-Sort by dropdown before click', testInfo);
//         for (let i = 0; i < 6; i++) {
//             await betinfluencerModal.sortBySelector.click();
//             await betinfluencerModal.page.keyboard.press('ArrowDown');
//             await betinfluencerModal.page.keyboard.press('Enter');
//             await highlightElements(betinfluencerModal.sortBySelector);
//             await ScreenshotHelper(betinfluencerModal.page, screenshotDir, `T7-${i + 1}-Sort by dropdown after click`, testInfo);
//         }
//     });

//     test('T8- Verify presence of Total Monthly Revenue on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.totalMonthlyRevenue);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T8-Total Monthly Revenue presence', testInfo);
//         await expect(betinfluencerModal.totalMonthlyRevenue).toBeVisible();
//     });

//     test('T9-Verify Bets Taken inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.betsTaken);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T9-Bets Taken Number', testInfo);
//         await expect(betinfluencerModal.betsTaken).toBeVisible();
//     });

//     test('T10-Verify Codes Used inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.codesUsed);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T10-Codes Used Number', testInfo);
//         await expect(betinfluencerModal.codesUsed).toBeVisible();
//     });

//     test('T11/T12-Verify functionality of Sort Button on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.sortBySelector.locator('..').locator('..').getByRole('img').last());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
//         await betinfluencerModal.sortBySelector.locator('..').locator('..').getByRole('img').last().click();
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
//     });

//     test('New-T11-Verify  correct graphical representation of  "Last Four weeks" data .', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await highlightElements(betinfluencerModal.lastFourWeeksCanvas);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T11-Last Four Weeks', testInfo);
//     });

//     test('New T21-Verify count of "Results"  on Detail section inside Bet influencer', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.page.getByText('Results').nth(0).locator('..'));
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T21-Results count', testInfo);
//     });
//     test('New T21-Verify contents and UI of the "Result Section" on Details section inside Bet Influencer', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.page.getByText('Usage').nth(0).locator('..'));
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T21-Results count', testInfo);
//     });

//     test('New T25-Verify "Booking code" Dropdown functionality on Details page inside Bet Influencer.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await betinfluencerModal.page.locator(`#BWE8E173F`).locator('summary').click();
//         await betinfluencerModal.page.waitForTimeout(5000);
//         await highlightElements(betinfluencerModal.page.locator(`#BWE8E173F`).locator('summary'));
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T25-Booking code dropdown before click', testInfo);
//     });
//     test('New T26-Verify  "Share" booking code functionality on Result section inside Details Page from Bet Influencer.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.page.locator(`#BWE8E173F`).getByRole('img').first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T25-Booking code dropdown before click', testInfo);
//         await betinfluencerModal.page.locator(`#BWE8E173F`).getByRole('img').first().click();
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T26-Share booking code popup', testInfo);
//     });

//     test('New-T31-Verify "Social media" options presence and functionality on Bet confirmation pop up window.', async ({ sportsPage }, testInfo) => {
//         await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
//         await sportsPage.Login();
//         await OddsSelection(5, sportsPage.page);
//         await sportsPage.betNow.click();
//         await sportsPage.betConfirmation.waitFor({ state: 'visible', timeout: 5000 });
//         await highlightElementBorder(sportsPage.page.locator('a[href*="whatsapp.com"]'));
//         await highlightElementBorder(sportsPage.page.locator('a[href*="facebook.com"]'));
//         await highlightElementBorder(sportsPage.page.locator('a[href*="mailto:"]'));
//         await highlightElementBorder(sportsPage.page.locator('a[href*="twitter.com"]'));
//         await highlightElementBorder(sportsPage.page.locator('a[href*="telegram.me"]'));
//         await ScreenshotHelper(sportsPage.page, screenshotDir, 'New T31-Socials', testInfo)
//     });
//     test('New-T32-Verify "QR code scanner" functionality on Bet confirmation pop up window.', async ({ sportsPage }, testInfo) => {
//         await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
//         await sportsPage.Login();
//         await OddsSelection(5, sportsPage.page);
//         await sportsPage.betNow.click();
//         await sportsPage.betConfirmation.waitFor({ state: 'visible', timeout: 5000 });
//         await sportsPage.page.locator('a[href*="whatsapp.com"]').locator('..').getByRole('img').nth(5).click();
//         await sportsPage.page.waitForTimeout(3000);
//         await highlightElementBorder(sportsPage.page.locator('a[href*="whatsapp.com"]').locator('..').getByRole('img').nth(5));
//         await ScreenshotHelper(sportsPage.page, screenshotDir, 'New T32-QR', testInfo)
//     });

//     test('T13-Verify Previous/Next button functionality on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         await highlightElements(betinfluencerModal.nextButton);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T13-Next Button before click', testInfo);
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await expect(betinfluencerModal.previousButton).toContainClass('active');
//         await highlightElementBorder(betinfluencerModal.previousButton);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T13-Previous Button after click', testInfo);
//     });


//     test('T16-Verify presence of "Booking Code" message on Bet Confirmation pop up window.', async ({ sportsPage }, testInfo) => {
//         await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
//         await sportsPage.Login();
//         await OddsSelection(5, sportsPage.page);
//         await sportsPage.betNow.click();
//         await sportsPage.betConfirmation.waitFor({ state: 'visible', timeout: 5000 });
//         await highlightElementBorder(sportsPage.bookingCodeMessage);
//         await ScreenshotHelper(sportsPage.page, screenshotDir, 'T16-Previous Button after click', testInfo)
//     });

//     test('T17 - Verify influencer is getting payout if  influencer place a bet with 5 legs.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         const bookingCode = await betinfluencerModal.PlaceBets(8)
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.page.waitForEvent('domcontentloaded')
//         await betinfluencerModal.gotoBetInfluencerModal()
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T17-Influencer Payout', testInfo)
//     });

//     test('T20 - bet with 4 legs and later add 1 legs and share the code', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         const bookingCode = await betinfluencerModal.PlaceBets(4)
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await placeBetWithIndex(5, betinfluencerModal.page);
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.page.waitForEvent('domcontentloaded')
//         await betinfluencerModal.gotoBetInfluencerModal()
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await expect(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first()).toBeVisible();
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T20-Influencer Payout', testInfo)
//     });

//     test('T21 - bet with 4 legs and later add 1 legs and share the code', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         const bookingCode = await betinfluencerModal.PlaceBets(1)
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await placeBetWithIndex(2, betinfluencerModal.page);
//         await placeBetWithIndex(3, betinfluencerModal.page);
//         await placeBetWithIndex(4, betinfluencerModal.page);
//         await placeBetWithIndex(5, betinfluencerModal.page);
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.page.waitForEvent('domcontentloaded')
//         await betinfluencerModal.gotoBetInfluencerModal()
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await expect(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first()).toBeVisible();
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T21-Influencer Payout', testInfo)
//     });

//     test('T22 - Verify influencer is getting payout if influencer  place a bet by taking combination of  Sports and Esport section legs and share booking code to user .Example- 3 sport odd and 2 esport section leg.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         await OddsSelection(3, betinfluencerModal.page);
//         await betinfluencerModal.esports.click();
//         await EsportsOddsSelection(3, betinfluencerModal.page);
//         await betinfluencerModal.betNow.click();
//         const bookingCode = await betinfluencerModal.bookingCodeMessage.innerText();
//         console.log(bookingCode);
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         // await betinfluencerModal.page.waitForEvent('domcontentloaded')
//         await betinfluencerModal.gotoBetInfluencerModal()
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T22-Influencer Payout', testInfo)
//     });
//     test('T23 - Verify influencer is getting payout if influencer place a bet for "Draw no bet market" legs.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         await DrawNoBetOddsSelection(5, betinfluencerModal.page);
//         await betinfluencerModal.betNow.click();
//         const bookingCode = await betinfluencerModal.bookingCodeMessage.innerText();
//         console.log(bookingCode);
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' });
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode);
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`);
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T23-Influencer Payout', testInfo)
//     });
//     test('T24 - Verify influencer is getting  payout if influencer share code to user before placing a bet..', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         await OddsSelection(8, betinfluencerModal.page)
//         await betinfluencerModal.shareButton.click();
//         await betinfluencerModal.page.waitForTimeout(5000);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T24 A-Influencer Payout', testInfo)
//         const bookingCode = await betinfluencerModal.page.getByText('Share your bet:').locator('..').innerText();
//         console.log(bookingCode);
//         await betinfluencerModal.page.locator('#modal-close-btn').click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' });
//         const SharedBookingCode = await GetSharedBookingCode(bookingCode);
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`);
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await betinfluencerModal.page.waitForTimeout(3000);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T24-Influencer Payout', testInfo)
//     });
//     test('T27 - Verify Influencer is getting payout if influencer place a bet by taking  5 legs from Smart Picks.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         await betinfluencerModal.page.getByText('Filters').locator('..').locator('..').getByRole('img').last().click();
//         await betinfluencerModal.page.getByText('Smart Picks ').nth(2).click();
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.bookingCodeMessage.waitFor({ state: 'visible' });
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T25 A-Influencer Payout', testInfo)
//         const bookingCode = await betinfluencerModal.bookingCodeMessage.innerText();
//         console.log(bookingCode);
//         await betinfluencerModal.modalCloseButton.click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' });
//         const SharedBookingCode = await GetBookingCode(bookingCode);
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`);
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.gotoBetInfluencerModal();
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T25-Influencer Payout', testInfo)
//     });

//     test('T28 - Verify Influencer is getting payout if influencer place a bet by taking  5 legs from Live Section and share booking code .', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         await betinfluencerModal.live.click();
//         await LiveOddsSelection(5, betinfluencerModal.page);
//         await betinfluencerModal.betNow.click();
//         const bookingCode = await betinfluencerModal.bookingCodeMessage.innerText();
//         console.log(bookingCode);
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`));
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T28- Booking Code', testInfo)
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.betConfirmation.locator('..').getByRole('img').first().click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.reload();
//         await betinfluencerModal.gotoBetInfluencerModal()
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T28-Influencer Payout', testInfo)
//     });

//     test('T30 - To check influencer is getting payout when Influencer share booking code to other User 1 and User 1 will share booking code to User 2.', async ({ betinfluencerModal }, testInfo) => {
//         await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
//         await betinfluencerModal.gotoSportsPage();
//         await betinfluencerModal.Login();
//         const bookingCode = await betinfluencerModal.PlaceBets(5);
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode = await GetBookingCode(bookingCode)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         const bookingCode2 = await betinfluencerModal.bookingCodeMessage.innerText();
//         console.log(bookingCode2);
//         await betinfluencerModal.modalCloseButton.click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.LoginArgs(`${userData.user3.mobile}`, `${userData.user3.password}`)
//         await betinfluencerModal.welcomeUser.waitFor({ state: 'visible' })
//         await betinfluencerModal.betslipButton.click();
//         const SharedBookingCode2 = await GetBookingCode(bookingCode2)
//         await betinfluencerModal.enterBookingCodeTextbox.fill(`${SharedBookingCode2}`)
//         await betinfluencerModal.page.keyboard.press('Enter');
//         await betinfluencerModal.betNow.click();
//         await betinfluencerModal.modalCloseButton.click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await betinfluencerModal.LoginArgs(`${userData.user1.mobile}`, `${userData.user1.password}`);
//         await betinfluencerModal.goToBetInfluencerWithoutLogin();
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T30-Influencer Payout', testInfo);
//         await betinfluencerModal.modalCloseButton.click();
//         await betinfluencerModal.LogOut();
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await betinfluencerModal.LoginArgs(`${userData.user2.mobile}`, `${userData.user2.password}`);
//         await betinfluencerModal.goToBetInfluencerWithoutLogin();
//         await betinfluencerModal.clickDetailButton();
//         while (await betinfluencerModal.nextButton.getAttribute('class  ').then(cls => cls && cls.includes('active'))) {
//             await betinfluencerModal.nextButton.click();
//             await betinfluencerModal.page.waitForTimeout(1000);
//         }
//         await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode2}`).first());
//         await betinfluencerModal.page.waitForTimeout(2000);
//         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T30-User1 Payout', testInfo);
//     });
// })
