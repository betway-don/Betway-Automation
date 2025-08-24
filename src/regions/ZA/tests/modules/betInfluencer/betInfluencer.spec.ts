import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { BetInfluencerModal } from '../../../pages/BetInfluencerModal';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/betInfluencer');

test.describe('BetInfluencer Tests', () => {
    // test("T1-", async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.toggleHambergerMenu();
    //     await highlightElements(betinfluencerModal.BetInfluencer);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T1-Bet Influencer', testInfo);
    // });
    // test('T2-Summary page presence', async ({ betinfluencerModal },testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await highlightElements(betinfluencerModal.page.getByRole('button',{name:'Summary'}));
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T2-Summary page presence', testInfo);
    //     await expect(betinfluencerModal.page.getByRole('button',{name:'Summary'})).toBeVisible();
    // });

    // test('T3-Details page presence', async ({ betinfluencerModal },testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();  
    //     await highlightElements(betinfluencerModal.detailButton);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T3-Details page presence', testInfo);
    //     await expect(betinfluencerModal.detailButton).toBeVisible();
    // });

    // test('T4 - Verify the Functionality and content of "Details" page inside the Bet influencer option from Hamburger menu.',async({ betinfluencerModal },testInfo) => {    
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.detailButton);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T4-Details page content', testInfo);
    // });

    // test('T5-Go to Detailed Breakdown',async({ betinfluencerModal },testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await highlightElements(betinfluencerModal.detailedBreakdownButton);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T5-Detailed Breakdown page before Click', testInfo);
    //     await betinfluencerModal.detailedBreakdownButton.click();
    //     await betinfluencerModal.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
    //     await expect(betinfluencerModal.totalMonthlyRevenue).toBeVisible();
    //     await highlightElements(betinfluencerModal.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T5-Detailed Breakdown page after Click', testInfo);
    // });

    // test('T6-Verify functionality of Month dropdown on Details page inside bet influencer from Hamburger menu.',async({ betinfluencerModal },testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.monthsSelector);
    //     await highlightElements(betinfluencerModal.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown before click', testInfo);
    //     await betinfluencerModal.monthsSelector.click();
    //     await betinfluencerModal.page.keyboard.press('ArrowUp');
    //     await betinfluencerModal.page.keyboard.press('Enter');
    //     await betinfluencerModal.page.waitForTimeout(2000);
    //     await highlightElements(betinfluencerModal.monthsSelector);
    //     await highlightElements(betinfluencerModal.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown after click', testInfo);
    // });

    // test('T7 - Verify functionality of sort by dropdown on Details page inside bet influencer from Hamburger menu.',async({ betinfluencerModal },testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.sortBySelector);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T7-Sort by dropdown before click', testInfo);
    //     for(let i=0;i<6;i++){
    //         await betinfluencerModal.sortBySelector.click();
    //         await betinfluencerModal.page.keyboard.press('ArrowDown');
    //         await betinfluencerModal.page.keyboard.press('Enter');
    //         await highlightElements(betinfluencerModal.sortBySelector);
    //         await ScreenshotHelper(betinfluencerModal.page, screenshotDir, `T7-${i+1}-Sort by dropdown after click`, testInfo);
    //     }
    // });

    // test('T8- Verify presence of Total Monthly Revenue on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T8-Total Monthly Revenue presence', testInfo);
    //     await expect(betinfluencerModal.totalMonthlyRevenue).toBeVisible();
    // });

    // test('T9-Verify Bets Taken inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.betsTaken);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T9-Bets Taken Number', testInfo);
    //     await expect(betinfluencerModal.betsTaken).toBeVisible();
    // });

    // test('T10-Verify Codes Used inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.codesUsed);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T10-Codes Used Number', testInfo);
    //     await expect(betinfluencerModal.codesUsed).toBeVisible();
    // });

    // test('T11-Verify functionality of Sort Button on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.sortBySelector.locator('..').locator('..').getByRole('img').last());
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
    //     await betinfluencerModal.sortBySelector.locator('..').locator('..').getByRole('img').last().click();
    //     await betinfluencerModal.page.waitForTimeout(2000);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
    // });

    // test('T13-Verify Previous/Next button functionality on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.nextButton);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T13-Next Button before click', testInfo);
    //     while (await betinfluencerModal.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
    //         await betinfluencerModal.nextButton.click();
    //         await betinfluencerModal.page.waitForTimeout(1000);
    //     }
    //     await expect(betinfluencerModal.previousButton).toContainClass('active');
    //     await highlightElementBorder(betinfluencerModal.previousButton);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T13-Previous Button after click', testInfo);
    // });

    test('T16-Verify presence of "Booking Code" message on Bet Confirmation pop up window.', async ({ sportsPage }, testinfo) => {
        await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
        await sportsPage.gotoSportsPage();

        const apiUrl = "https://new.betway.co.za/sportsapi/br/v1/BetBook/Highlights/?countryCode=ZA&sportId=soccer";
        const response = await sportsPage.page.waitForResponse(resp => resp.url().startsWith(apiUrl) && resp.status() === 200);

        // Parse the response JSON
        const data = await response.json();
        const sbv = data.prices?.[0]?.priceDecimal;
        const eventid = data.events?.[0]?.eventId;
        const knownOutcomeId = `${eventid}11`; // Replace with the actual outcomeId you want to test
        const priceObj = data.prices?.find((p: any) => p.outcomeId === knownOutcomeId);
        
        await sportsPage.page.getByText(`${priceObj.priceDecimal}`,{exact:false}).first().click(); // Wait for the page to load

        await sportsPage.page.waitForTimeout(2000); // Wait for the popup to appear

        // await sportsPage.betslip.click(); // Click on the betslip to open the login popup
        await sportsPage.page.locator('#betslip-container').getByRole('button',{name:"Login"}).click(); // Click on the login button in the popup
    });
})

