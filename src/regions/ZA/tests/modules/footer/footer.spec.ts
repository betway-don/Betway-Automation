import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log, time } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { ContactUsPage } from '../../../pages/ContactUsPage';
import { TIMEOUT } from 'dns';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/footer');

test.describe('Footer Module Tests', () => {
    test('T1-Verify Footer page', async ({ homePage },testInfo) => {
        await homePage.footer.waitFor({state:'visible',timeout:10000});
        await highlightElements(homePage.footer);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T1.png', testInfo);
    });
    test('T2-Verify the "Betway" logo in footer', async ({ homePage },testInfo) => {
        await homePage.betwayLogo.waitFor({state:'visible',timeout:10000})
        await highlightElements(homePage.betwayLogo);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T2.png', testInfo);
    });

    test('T3-Verify that user should able to click on  "Betway" logo in footer', async({homePage},testInfo)=>{
        await homePage.betwayLogo.waitFor({state:'visible',timeout:10000});
        await homePage.betwayLogo.hover();
        await highlightElementBorder(homePage.betwayLogo);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T3-a.png', testInfo);
    });

    test('T4-Verify functionality of "Betway" logo at footer', async ({ homePage },testInfo) => {
        await homePage.betwayLogo.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T4.png', testInfo);
    });

    test('T5- Verify that user should able to see mouse over hand icon on the "Sponsorships" logo in footer',async({homePage},testInfo)=>{
        await homePage.arsenalLogo.hover();
        await highlightElements(homePage.arsenalLogo.locator('..').locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T5.png', testInfo);
    });
    test('T6-Verify that user should able to click on "Sponsorships" logo in footer', async ({ homePage }, testInfo) => {
        await highlightElements(homePage.arsenalLogo.locator('..').locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T6-a.png', testInfo);
        await homePage.arsenalLogo.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship',{timeout:10000});
        await homePage.page.waitForLoadState('load');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T6-b.png', testInfo);
    });
    test('T7-Verify contents of the "Sponsorships" page', async ({ homePage },testInfo) => {
        await homePage.arsenalLogo.click();
        await homePage.page.waitForLoadState('load');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship');
        const content=await homePage.page.locator('content').first();
        await highlightElementBorder(content);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T7.png', testInfo);
    });
    test('T8-Verify functionality of Back button inside "Sponsorships" page', async ({ homePage }, testInfo) => {
        await homePage.arsenalLogo.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Sponsorship').nth(1).locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T8-a.png', testInfo);
        await homePage.page.getByText('Sponsorship').first().locator('..').locator('a').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T8-b.png', testInfo);

    });

    test('T9-Verify that on Sponsorships information page all the hyperlink should navigate to the respected page after clicking on it',async({homePage},testInfo)=>{
        await homePage.Sponsorships.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('Sponsorship').first().locator('..'));
        await ScreenshotHelper(homePage.page,screenshotDir,'T9.png',testInfo);
    });
    test('T10-Verify that on Sponsorships information page all the hyperlink should navigate to the respected page after clicking on it',async({homePage},testInfo)=>{
        await homePage.arsenalLogo.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await homePage.page.getByText('Manchester City').first().waitFor({state:'visible',timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Sponsorship').first().locator('..'));
        await ScreenshotHelper(homePage.page,screenshotDir,'T10.png',testInfo);
    });
    test('T11-Verify that on Sponsorships information page all the hyperlink should navigate to the respected page after clicking on it',async({homePage},testInfo)=>{
        await homePage.arsenalLogo.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/sponsorship',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await homePage.page.getByText('Manchester City').first().waitFor({state:'visible',timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Sponsorship').first().locator('..'));
        await ScreenshotHelper(homePage.page,screenshotDir,'T11.png',testInfo);
    });
    test('T12-Verify functionality of "privacy policy" button', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.PrivacyPolicy);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T12-a.png', testInfo);
        await homePage.PrivacyPolicy.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/privacy-policy',{timeout:10000});
        await homePage.page.waitForLoadState('load');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T12-b.png', testInfo);
    });
    test('T13-Verify back button on "Privacy policy" page', async ({ homePage }, testInfo) => {
        await homePage.PrivacyPolicy.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/privacy-policy',{timeout:10000});
        await highlightElementBorder(homePage.page.getByRole('heading', { name: 'Privacy Policy' }).locator('..').locator('a').first());
        await homePage.page.getByRole('heading', { name: 'Privacy Policy' }).locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T13-b.png', testInfo);
    }); 
    test('T14-Verify functionality of "Contact Us" button', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.ContactUs);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T14-a.png', testInfo);
        await homePage.ContactUs.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/contact-us',{timeout:10000});
        await homePage.page.getByText('Contact us - ').first().locator('..').locator('a').first().click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T14-b.png', testInfo);

    });
    test('T15-Verify contents of of "Contact Us" button', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        await homePage.page.getByText('Contact us - ').first().waitFor({state:'visible'});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T15.png', testInfo);

    });
    test('T16-Verify functionality of "Back" button on "Contact us" page', async ({ homePage }, testInfo) => {
        await highlightElementBorder(homePage.ContactUs);
        await homePage.ContactUs.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/contact-us',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Contact us - ').first().locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T16-a.png', testInfo);
        await homePage.page.getByText('Contact us - ').first().locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T16-b.png', testInfo);
    });
    test('T17-Verify functionality of "Chat to Live Support" button on Contact details page inside contact Us page', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        const contactUsPage = new ContactUsPage(homePage.page);
        await highlightElementBorder(contactUsPage.chatToLiveSupport);
        await ScreenshotHelper(contactUsPage.page, screenshotDir, 'T17-a.png', testInfo);
        await contactUsPage.clickOnChatToLiveSupport();
        await expect(contactUsPage.page).toHaveURL('https://new.betway.co.za/contact-us?livechat=true',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T17.png', testInfo);
    });
    test('T18-Verify the presence and contents of "Standard Rate" on Contact details page inside contact Us page', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        const contactUsPage = new ContactUsPage(homePage.page);
        await highlightElementBorder(contactUsPage.call);
        await ScreenshotHelper(contactUsPage.page, screenshotDir, 'T18-a.png', testInfo);
    });
    test('T19-Verify the presence and functionality of "Email: Support@betway.co.za" hyperlink', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        const contactUsPage = new ContactUsPage(homePage.page);
        await highlightElementBorder(contactUsPage.email);
        await ScreenshotHelper(contactUsPage.page, screenshotDir, 'T19-a.png', testInfo);

    });
    test('T20-Verify presence and functionality of "Twitter: @Betway_GH" hyperlink', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        const contactUsPage = new ContactUsPage(homePage.page);
        await highlightElementBorder(contactUsPage.X);
        await ScreenshotHelper(contactUsPage.page, screenshotDir, 'T20.png', testInfo);
    });
    // test('T16-Verify functionality of "WhatsApp: +233 20 930 1418" hyperlink', async ({ homePage },testInfo) => {

    // });
    test('T21-Verify functionality of Facebook: /BetwaySouthAfrica" hyperlink', async ({ homePage },testInfo) => {
        await homePage.ContactUs.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        const contactUsPage = new ContactUsPage(homePage.page);
        await highlightElementBorder(contactUsPage.facebook);
        await ScreenshotHelper(contactUsPage.page, screenshotDir, 'T21.png', testInfo);
    });
    test('T22-Verify contents of the "Contact Form" inside Contact Us page', async ({ homePage },testInfo) => {
        await homePage.page.waitForTimeout(5000);
        await highlightElementBorder(homePage.ContactUs);
        await highlightElementBorder(homePage.arsenalLogo.locator('..').locator('..'));
        await highlightElementBorder(homePage.betwayLogo);
        await highlightElementBorder(homePage.linkToSocials.locator('..').locator('..'));
        await highlightElementBorder(homePage.PrivacyPolicy);
        await highlightElementBorder(homePage.FAQs);
        await highlightElementBorder(homePage.howtobet);
        await highlightElementBorder(homePage.TermsAndConditions);
        await highlightElementBorder(homePage.BetwayApp);
        await highlightElementBorder(homePage.ResponsibleGaming);
        await highlightElementBorder(homePage.BettingRules);
        await highlightElementBorder(homePage.AffiliateProgram);
        await highlightElementBorder(homePage.appleLogo.locator('..').locator('..'));
        await highlightElementBorder(homePage.Sponsorships);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T22.png', testInfo);
    });
    // test('T19-Verify functionality of "Dialing code" dropdown', async ({ homePage },testInfo) => {

    // });
    // test('T20-Verify that user should able to see "Mobile Number" filed', async ({ homePage },testInfo) => {

    // });
    // test('T21-Verify functionality of "Mobile Number" text box', async ({ homePage },testInfo) => {

    // });
    // test('T22-Verify that it should not accept special character in "Email Address" filed', async ({ homePage },testInfo) => {

    // });
    // test('T23-Verify that it should accept only valid data in "Email Address" filed', async ({ homePage },testInfo) => {

    // });
    // test('T24-Verify contents of "Query Type" dropdown', async ({ homePage },testInfo) => {

    // });
    // test('T25-Verify functionality of "Query Type" dropdown', async ({ homePage },testInfo) => {

    // });
    // test('T26-Verify functionality of "Query Type" dropdown', async ({ homePage },testInfo) => {

    // });
    // test('T27-Verify functionality of "Query Field" comment text box', async ({ homePage },testInfo) => {

    // });
    // test('T28-Verify functionality of "Submit" button"', async ({ homePage },testInfo) => {

    // });
    test('T23-Verify functionality of "FAQs" button at Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.FAQs);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T23-a.png', testInfo);
        await homePage.FAQs.click();
        await homePage.page.waitForTimeout(4000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T23-b.png', testInfo);
    });
    test('T24-Verify that User should able to click on any question from FAQs list', async ({ homePage },testInfo) => {
        await homePage.FAQs.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/frequently-asked-questions',{timeout:10000});
        await homePage.page.getByText('How do I register with Betway?').click();
        await highlightElementBorder(homePage.page.getByText('How do I register with Betway?').first());
        await homePage.page.waitForTimeout(2000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T24.png', testInfo);
    });
    test('T25-Verify functionality of "Back button" inside FAQs page', async ({ homePage }, testInfo) => {
        await highlightElementBorder(homePage.FAQs);
        await homePage.FAQs.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/frequently-asked-questions',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText("FAQ's").first().locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T25-a.png', testInfo);
        await homePage.page.getByText("FAQ's").first().locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T25-b.png', testInfo);
    });
    test('T26-Verify functionality of "Responsible Gaming" at Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.ResponsibleGaming);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T26-a.png', testInfo);
        await homePage.ResponsibleGaming.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/responsible-gaming',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T26-b.png', testInfo);
    });
    test('T27-Verify contents of the "Responsible Gaming" at Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.ResponsibleGaming);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T27-a.png', testInfo);
        await homePage.ResponsibleGaming.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/responsible-gaming',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T27-b.png', testInfo);
    });
    test('T28-Verify functionality of "Back button" on Responsible Gaming page', async ({ homePage }, testInfo) => {
        await highlightElementBorder(homePage.ResponsibleGaming);
        await homePage.ResponsibleGaming.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/responsible-gaming',{timeout:10000});
        await highlightElementBorder(homePage.page.getByRole('heading',{name:'Responsible Gaming'}).locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T28-a.png', testInfo);
        await homePage.page.getByText("Responsible Gaming").first().locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T28-b.png', testInfo);
    });
    test('T29-Verify functionality of "Terms & Conditions" at the Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.TermsAndConditions);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T29-a.png', testInfo);
        await homePage.TermsAndConditions.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/terms-and-conditions',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T29-b.png', testInfo);
    });
    test('T30-Verify expand and collapse functionality of any options button inside "Terms & Conditions" page', async ({ homePage },testInfo) => {
        await homePage.TermsAndConditions.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/terms-and-conditions',{timeout:10000});
        await highlightElementBorder(homePage.page.getByRole('button',{name:"General"}).first());
        await homePage.page.getByRole('button',{name:"General"}).click();
        await homePage.page.waitForTimeout(2000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T30.png', testInfo);
    });
    test('T31-Verify functionality of "Back" button on "Terms & Conditions" page', async ({ homePage }, testInfo) => {
        await highlightElements(homePage.TermsAndConditions);
        await homePage.TermsAndConditions.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/terms-and-conditions',{timeout:10000});
        await highlightElementBorder(homePage.page.getByRole("heading",{name:"Terms and Conditions"}).first().locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T31-a.png', testInfo);
        await homePage.page.getByRole("heading",{name:'Terms and Conditions'}).first().locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T31-b.png', testInfo);
    });
    test('T32-Verify functionality of "Betting Rules" at footer section', async ({ homePage },testInfo) => {
        await highlightElements(homePage.BettingRules);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T32-a.png', testInfo);
        await homePage.BettingRules.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/betting-rules-and-tips',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T32-b.png', testInfo);

    });
    test('T33-Verify functionality of "Betway App" at Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.BetwayApp);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T33-a.png', testInfo);
        await homePage.BetwayApp.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/betway-app',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T33-b.png', testInfo);
    });
    test('T34-Verify Contents of betway app', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.BetwayApp);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T40-a.png', testInfo);
        await homePage.BetwayApp.click();
        await homePage.page.waitForLoadState('domcontentloaded')
        await ScreenshotHelper(homePage.page, screenshotDir, 'T40-b.png', testInfo);
    });
    test('T35-Verify functionality of "Back button" inside the Betway App page screen', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.BetwayApp);
        await homePage.BetwayApp.click();
        await homePage.page.waitForTimeout(4000);
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/betway-app');
        await highlightElementBorder(homePage.page.getByText("Betway App").first().locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T35-a.png', testInfo);
        await homePage.page.getByRole('heading',{name:"Betway App"}).first().locator('..').locator('a').first().click();
        await homePage.page.waitForTimeout(4000);
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/');
        await ScreenshotHelper(homePage.page, screenshotDir, 'T35-b.png', testInfo);
    });
    test('T36-Verify functionality of "Back button" on Betway App page', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.BetwayApp);
        await homePage.BetwayApp.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/betway-app',{timeout:10000});
        await highlightElementBorder(homePage.page.getByRole("heading",{name:"Betway App"}).first().locator('..').locator('a').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T36-a.png', testInfo);
        await homePage.page.getByRole('heading',{name:"Betway App"}).first().locator('..').locator('a').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/');
        await homePage.page.waitForTimeout(4000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T36-b.png', testInfo);
    });
    test('T37-Verify functionality of "How To" button at Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.howtobet);
        await homePage.page.waitForTimeout(3000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T37-a.png', testInfo);
        await homePage.howtobet.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T37-b.png', testInfo);
    });
    test('T38-Verify options availability at "How To" page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('How to Bet').first());
        await ScreenshotHelper(homePage.page, screenshotDir, 'T38.png', testInfo);
    });
    test('T39-Verify that User should able to click on "How to Bet SMS" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('How to Bet SMS').first().locator('..'));
        await homePage.page.waitForTimeout(4000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T39.png', testInfo);
        await homePage.page.getByText('How to Bet SMS').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet-sms',{timeout:10000});
        await ScreenshotHelper(homePage.page, screenshotDir, 'T39-b.png', testInfo);
    });
    test('T40-Verify that User should able to click on any option available on "How to SMS" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Bet SMS').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet-sms',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Get a Fixture List').first().locator('..'));
        await homePage.page.getByText('Get a Fixture List').first().click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T40.png', testInfo);
    });
    test('T41-Verify that User should able to click on "How to Bet" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Bet').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});      
        await highlightElementBorder(homePage.page.getByText('How to Bet').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T41.png', testInfo);
    });
    test('T42-Verify that User should able to click on any option available on "How to Bet" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Bet').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElements(homePage.page.getByText('How to Bet').first().locator('..'));
        await highlightElementBorder(homePage.page.getByText('USSD Betting').first().locator('..'));
        await homePage.page.getByText('USSD Betting').first().click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T42.png', testInfo);
    });
    test('T43-Verify that User should able to click on "How to Betgames" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Betgames').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T43.png', testInfo);
    });
    test('T44-Verify that User should able to click on any option available on "How to Betgames" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Betgames').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-betgames',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('Dice duel').first().locator('..'));
        await homePage.page.getByText('Dice duel').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T44.png', testInfo);
    });
    test('T45-Verify that User should able to click on "How to Register" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Register').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T45.png', testInfo);
    });
    test('T46-Verify that User should able to click on any option available on "How to Register" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Register').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-register',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('How to Sign Up').first().locator('..'));
        await homePage.page.getByText('How to Sign Up').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T46.png', testInfo);
    });
    test('T47-Verify that User should able to click on "How to Deposit" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('How to Deposit').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T47.png', testInfo);
    });
    test('T48-Verify that User should able to click on any option available on "How to Deposit" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await homePage.page.getByText('How to Deposit').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-deposit',{timeout:10000});
        await homePage.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(homePage.page.getByText('Ozow').first().locator('..'));
        await homePage.page.getByText('Ozow').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T48.png', testInfo);
    });
    test('T49-Verify that User should able to click on "How to Reset Password" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Reset Password').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T49.png', testInfo);
    });

    test('T50-Verify that User should able to click on any option available on "How to Reset Password" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Reset Password').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-reset-password',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Reset Password').first().locator('..'));
        await highlightElementBorder(homePage.page.getByText('How to reset your password').first().locator('..'));
        await homePage.page.getByText('How to reset your password').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T50.png', testInfo);
    });

    test('T51-Verify that User should able to click on "How to Withdraw" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Withdraw').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T51.png', testInfo);
    });

    test('T52-Verify that User should able to click on any option available on "How to Withdraw" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await homePage.page.getByText('How to Withdraw').first().click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-withdraw',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Withdraw').first().locator('..'));
        await highlightElementBorder(homePage.page.getByText('Via EFT').first().locator('..'));
        await homePage.page.getByText('Via EFT').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T52.png', testInfo);
    });

    test('T53-Verify that User should able to click on "How to Jackpots" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Jackpots').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T53.png', testInfo);
    });

    test('T54-Verify that User should able to click on any option available on "How to Jackpots" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Jacpots').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T54.png', testInfo);
    });

    test('T55-Verify that User should able to click on "How to Casino" on the How To page', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Casino').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T55.png', testInfo);
    });

    test('T56-Verify that User should able to click on any option available on "How to Casino" section', async ({ homePage },testInfo) => {
        await homePage.howtobet.click();
        await homePage.page.waitForLoadState('domcontentloaded');
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-bet',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Casino').first().locator('..'));
        await homePage.page.getByText('How to Casino').first().click();
        await expect(homePage.page).toHaveURL('https://new.betway.co.za/how-to-casino',{timeout:10000});
        await highlightElementBorder(homePage.page.getByText('How to Play').first().locator('..'));
        await homePage.page.getByText('How to Play').first().locator('..').click();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T56.png', testInfo);
    });

    test('T57-Verify functionality of "Affiliate Program" button at the Footer section', async ({ homePage },testInfo) => {
        await highlightElementBorder(homePage.AffiliateProgram);
        await homePage.page.waitForTimeout(5000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T57-a.png', testInfo);
    });

    test('T64-Verify presence of Legal information about Betway at footer section', async ({ homePage },testInfo) => {
        // await homePage.page.waitForEvent('domcontentloaded')
        await highlightElements(await homePage.page.getByText('Raging River Trading (Pty) Ltd').first().locator('..'));
        await ScreenshotHelper(homePage.page, screenshotDir, 'T64.png', testInfo);
    });

    test('T65-Verify presence of version information of Betway application at footer section', async ({ homePage },testInfo) => {
        await homePage.version.waitFor({state:'visible',timeout:3000})
        await highlightElementBorder(homePage.version);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T65.png', testInfo);
    }); 

    test('T66-Verify presence of Current time at footer section', async ({ homePage },testInfo) => {
        await homePage.currentTime.waitFor({state:'visible'})
        await highlightElementBorder(homePage.currentTime);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T66.png', testInfo);
    });

    test('T67-Verify presence and functionality of "Betway App QR code " at footer section', async ({ homePage },testInfo) => {
        await homePage.downloadBetwayApp.waitFor({state:'visible',timeout:30000})
        await highlightElementBorder(homePage.downloadBetwayApp.locator('..').locator('..'));
        await homePage.page.waitForTimeout(5000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T61.png', testInfo);
    });

    test('T68-Verify functionality of "App store" icons from the footer section', async ({ homePage },testInfo) => {
        await homePage.appleLogo.waitFor({state:'visible',timeout:30000});
        await highlightElementBorder(homePage.appleLogo);
        await homePage.page.waitForTimeout(5000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T62-a.png', testInfo);

    });

    test('T69-Verify presence and functionality of social media icons at footer section', async ({ homePage },testInfo) => {
        await homePage.linkToSocials.waitFor({state:'visible',timeout:30000})
        await highlightElementBorder(homePage.linkToSocials.locator('..').locator('..'));
        await homePage.page.waitForTimeout(5000);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T63-a.png', testInfo);
    });

    test('T64-Verify functionality of "18" logo at footer section', async ({ homePage },testInfo) => {
        const logos=await homePage.arsenalLogo.locator('..').locator('..');
        const eighteenplusLogo = logos.getByRole('link').last();
        await eighteenplusLogo.waitFor({state:'visible',timeout:60000})
        await highlightElementBorder(eighteenplusLogo);
        await ScreenshotHelper(homePage.page, screenshotDir, 'T70-a.png', testInfo);
    });
});
// 1.npx playwright test src/regions/ZA/tests/modules/footer/footer.spec.ts --config=playwright.ZA.config.ts --headed    
// 2.allure generate allure-results --clean -o src/regions/ZA/reports/allure-report
// 3.allure open src/regions/ZA/reports/allure-report 