const userData = require('../json-data/userData.json');
import { expect, Page } from '@playwright/test';
import { homepageLocators } from '../locators/homepageLocators';
import { time } from 'console';
// import { loadPageLocatorsFromExcel } from '../../../global/utils/file-utils/locatorLoader';

const region = process.env.REGION || 'ZA';
// const homepageLocators = loadPageLocatorsFromExcel('HomePage', region);

export class HomePage {
    page;
    howtobet;
    FAQs;
    TermsAndConditions;
    BettingRules;
    BetwayApp;
    AffiliateProgram;
    ResponsibleGaming;
    PrivacyPolicy;
    Sponsorships;
    ContactUs;
    betwayLogo;
    footer;
    arsenalLogo;
    currentTime;
    downloadBetwayApp;
    appleLogo;
    linkToSocials;
    version;

    constructor(page: Page) {
        this.page = page;

        const get = (key: string) => homepageLocators[key];
        const role = (key: string) =>
            page.getByRole(get(key).selector as any, { name: get(key).options?.name }).nth(get(key).nth || 0);
        const text = (key: string) => {
            const name = get(key).options?.name;
            if (!name) throw new Error(`Missing 'options.name' for locator: ${key}`);
            return page.getByText(name).nth(get(key).nth || 0);
        };
        const locator = (key: string) => page.locator(get(key).selector!);

        this.howtobet = role('howtobet');
        this.FAQs = role('FAQs');
        this.TermsAndConditions = text('TermsAndConditions');
        this.BettingRules = role('BettingRules');
        this.BetwayApp = role('BetwayApp');
        this.AffiliateProgram = role('AffiliateProgram');
        this.ResponsibleGaming = text('ResponsibleGaming');
        this.PrivacyPolicy = text('PrivacyPolicy');
        this.Sponsorships = text('Sponsorships');
        this.ContactUs = role('ContactUs');

        this.betwayLogo = locator('betwayLogo');
        this.footer = locator('footer');
        this.arsenalLogo = locator('arsenalLogo');
        this.currentTime = text('currentTime');
        this.downloadBetwayApp = text('downloadBetwayApp');
        this.appleLogo = locator('appleLogo');
        this.linkToSocials = locator('linkToSocials');
        this.version = text('version');
    }
    async gotoHomePage() {
        await this.page.goto('https://new.betway.co.za/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickHowToBet() {
        await this.howtobet.click();
        await this.page.waitForTimeout(1000);
    }

    async clickFAQs() {
        await this.FAQs.click();
        await this.page.waitForTimeout(1000);
    }

    async clickTermsAndConditions() {
        await this.TermsAndConditions.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBettingRules() {
        await this.BettingRules.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBetwayApp() {
        await this.BetwayApp.click();
        await this.page.waitForTimeout(1000);
    }

    async clickAffiliateProgram() {
        await this.AffiliateProgram.click();
        await this.page.waitForTimeout(1000);
    }

    async clickResponsibleGaming() {
        await this.ResponsibleGaming.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPrivacyPolicy() {
        await this.PrivacyPolicy.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSponsorships() {
        await this.Sponsorships.click();
        await this.page.waitForTimeout(1000);
    }

    async clickContactUs() {
        await this.ContactUs.click();
        await this.page.waitForTimeout(1000);
    }
}
