const userData = require('../json-data/userData.json');
import { expect } from '@playwright/test';
import { homepageLocators } from '../locators/homepageLocators';
import { time } from 'console';

export class HomePage {
    page: import('@playwright/test').Page;
    howtobet: ReturnType<import('@playwright/test').Page['getByRole']>;
    FAQs: ReturnType<import('@playwright/test').Page['getByRole']>;
    TermsAndConditions: ReturnType<import('@playwright/test').Page['getByText']>;
    BettingRules: ReturnType<import('@playwright/test').Page['getByRole']>;
    BetwayApp: ReturnType<import('@playwright/test').Page['getByRole']>;
    AffiliateProgram: ReturnType<import('@playwright/test').Page['getByRole']>;
    ResponsibleGaming: ReturnType<import('@playwright/test').Page['getByText']>;
    PrivacyPolicy: ReturnType<import('@playwright/test').Page['getByText']>;
    Sponsorships: ReturnType<import('@playwright/test').Page['getByText']>;
    ContactUs: ReturnType<import('@playwright/test').Page['getByRole']>;
    betwayLogo: ReturnType<import('@playwright/test').Page['getByText']>;
    footer: ReturnType<import('@playwright/test').Page['locator']>;
    arsenalLogo: ReturnType<import('@playwright/test').Page['locator']>;
    currentTime: ReturnType<import('@playwright/test').Page['getByText']>;
    downloadBetwayApp: ReturnType<import('@playwright/test').Page['getByText']>;
    appleLogo: ReturnType<import('@playwright/test').Page['locator']>;

    constructor(page: import('@playwright/test').Page) {
        this.page = page;
        this.howtobet = page.getByRole('link',{name:homepageLocators.howtobet.options.name}).nth(homepageLocators.howtobet.nth || 0);
        this.FAQs = page.getByRole('link',{name:homepageLocators.FAQs.options.name}).nth(homepageLocators.FAQs.nth || 0);
        this.TermsAndConditions = page.getByText(homepageLocators.TermsAndConditions.options.name).nth(homepageLocators.TermsAndConditions.nth || 0);
        this.BettingRules = page.getByRole('link',{name:homepageLocators.BettingRules.options.name}).nth(homepageLocators.BettingRules.nth || 0);
        this.BetwayApp = page.getByRole('link',{name:homepageLocators.BetwayApp.options.name}).nth(homepageLocators.BetwayApp.nth || 0);
        this.AffiliateProgram = page.getByRole('link',{name:homepageLocators.AffiliateProgram.options.name}).nth(homepageLocators.AffiliateProgram.nth || 0);
        this.ResponsibleGaming = page.getByText(homepageLocators.ResponsibleGaming.options.name).nth(homepageLocators.ResponsibleGaming.nth || 0);
        this.PrivacyPolicy = page.getByText(homepageLocators.PrivacyPolicy.options.name).nth(homepageLocators.PrivacyPolicy.nth || 0);
        this.Sponsorships = page.getByText(homepageLocators.Sponsorships.options.name).nth(homepageLocators.Sponsorships.nth || 0);
        this.betwayLogo = page.locator(homepageLocators.betwayLogo.selector);
        this.footer = page.locator(homepageLocators.footer.selector);
        this.arsenalLogo = page.locator(homepageLocators.arsenalLogo.selector);
        this.currentTime = page.getByText(homepageLocators.currentTime.options.name);
        this.downloadBetwayApp = page.getByText(homepageLocators.downloadBetwayApp.options.name).nth(homepageLocators.downloadBetwayApp.nth || 0);
        this.appleLogo = page.locator(homepageLocators.appleLogo.selector);
        this.ContactUs = page.getByRole('link', { name: homepageLocators.ContactUs.options.name }).nth(homepageLocators.ContactUs.nth || 0);
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
