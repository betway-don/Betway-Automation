const userData = require('../json-data/userData.json');
import { expect, Page } from '@playwright/test';
import { homepageLocators } from '../locators/homepageLocators';
import { time } from 'console';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { get } from 'http';



const region = process.env.REGION || 'ZA';

export class HomePage {

    readonly HomePagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;

    page: import('@playwright/test').Page;
    footerLinksContainer: any;
    // howtobet: ReturnType<import('@playwright/test').Page['getByRole']>;
    // FAQs: ReturnType<import('@playwright/test').Page['getByRole']>;
    // TermsAndConditions: ReturnType<import('@playwright/test').Page['getByText']>;
    // BettingRules: ReturnType<import('@playwright/test').Page['getByRole']>;
    // BetwayApp: ReturnType<import('@playwright/test').Page['getByRole']>;
    // AffiliateProgram: ReturnType<import('@playwright/test').Page['getByRole']>;
    // ResponsibleGaming: ReturnType<import('@playwright/test').Page['getByText']>;
    // PrivacyPolicy: ReturnType<import('@playwright/test').Page['getByText']>;
    // Sponsorships: ReturnType<import('@playwright/test').Page['getByText']>;
    // ContactUs: ReturnType<import('@playwright/test').Page['getByRole']>;
    // betwayLogo: ReturnType<import('@playwright/test').Page['getByText']>;
    // footer: ReturnType<import('@playwright/test').Page['locator']>;
    // arsenalLogo: ReturnType<import('@playwright/test').Page['locator']>;
    // currentTime: ReturnType<import('@playwright/test').Page['getByText']>;
    // downloadBetwayApp: ReturnType<import('@playwright/test').Page['getByText']>;
    // appleLogo: ReturnType<import('@playwright/test').Page['locator']>;
    // linkToSocials: ReturnType<import('@playwright/test').Page['locator']>;
    // version: ReturnType<import('@playwright/test').Page['getByText']>;
    // footerLinksContainer: any;

    constructor(page: import('@playwright/test').Page) {
        // console.log("Loaded locators:", locators);
        this.page = page;
        const configs = loadLocatorsFromExcel("src/global/utils/file-utils/locators.xlsx", "HomePage");
        this.footerLinksContainer = getLocator(this.page, configs["ContactUs"]).locator('..');
        this.HomePagelocatorsRegistry = {
            ContactUs: getLocator(this.page, configs["ContactUs"]),
            howtobet:  getLocator(this.page, configs["howtobet"]),
            FAQs : getLocator(this.footerLinksContainer, configs["FAQs"]),
            TermsAndConditions : getLocator(this.footerLinksContainer, configs["TermsAndConditions"]),
            BettingRules : getLocator(this.footerLinksContainer, configs["BettingRules"]),
            BetwayApp : getLocator(this.footerLinksContainer, configs["BetwayApp"]),
            AffiliateProgram : getLocator(this.footerLinksContainer, configs["AffiliateProgram"]),
            ResponsibleGaming : getLocator(this.footerLinksContainer, configs["ResponsibleGaming"]),
            PrivacyPolicy : getLocator(this.footerLinksContainer, configs["PrivacyPolicy"]),
            Sponsorships : getLocator(this.footerLinksContainer, configs["Sponsorships"]),
            betwayLogo : getLocator(this.page, configs["betwayLogo"]),
            footer : getLocator(this.page, configs["footer"]),
            arsenalLogo : getLocator(this.page, configs["arsenalLogo"]),
            currentTime : getLocator(this.page, configs["currentTime"]),
            downloadBetwayApp : getLocator(this.page, configs["downloadBetwayApp"]),
            appleLogo : getLocator(this.page, configs["appleLogo"]),
            linkToSocials : getLocator(this.page, configs["linkToSocials"]),
            version : getLocator(this.page, configs["version"])
        };

        // this.page = page;
        // this.howtobet = page.getByRole('link',{name:homepageLocators.howtobet.options.name}).nth(homepageLocators.howtobet.nth || 0);
        // this.FAQs = page.getByRole('link',{name:homepageLocators.FAQs.options.name}).nth(homepageLocators.FAQs.nth || 0);
        // this.TermsAndConditions = page.getByText(homepageLocators.TermsAndConditions.options.name).nth(homepageLocators.TermsAndConditions.nth || 0);
        // this.BettingRules = page.getByRole('link',{name:homepageLocators.BettingRules.options.name}).nth(homepageLocators.BettingRules.nth || 0);
        // this.BetwayApp = page.getByRole('link',{name:homepageLocators.BetwayApp.options.name}).nth(homepageLocators.BetwayApp.nth || 0);
        // this.AffiliateProgram = page.getByRole('link',{name:homepageLocators.AffiliateProgram.options.name}).nth(homepageLocators.AffiliateProgram.nth || 0);
        // this.ResponsibleGaming = page.getByText(homepageLocators.ResponsibleGaming.options.name).nth(homepageLocators.ResponsibleGaming.nth || 0);
        // this.PrivacyPolicy = page.getByText(homepageLocators.PrivacyPolicy.options.name).nth(homepageLocators.PrivacyPolicy.nth || 0);
        // this.Sponsorships = page.getByText(homepageLocators.Sponsorships.options.name).nth(homepageLocators.Sponsorships.nth || 0);
        // this.betwayLogo = page.locator(homepageLocators.betwayLogo.selector);
        // this.footer = page.locator(homepageLocators.footer.selector);
        // this.arsenalLogo = page.locator(homepageLocators.arsenalLogo.selector);
        // this.currentTime = page.getByText(homepageLocators.currentTime.options.name);
        // this.downloadBetwayApp = page.getByText(homepageLocators.downloadBetwayApp.options.name).nth(homepageLocators.downloadBetwayApp.nth || 0);
        // this.appleLogo = page.locator(homepageLocators.appleLogo.selector);
        // this.linkToSocials = page.locator(homepageLocators.linkToSocials.selector);
        // this.version = page.getByText(homepageLocators.version.options.name).nth(homepageLocators.version.nth || 0);
        // this.ContactUs = page.getByRole('link', { name: homepageLocators.ContactUs.options.name }).nth(homepageLocators.ContactUs.nth || 0);


    }
    async gotoHomePage() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickHowToBet() {
        await this.HomePagelocatorsRegistry.howtobet.click();
        await this.page.waitForTimeout(1000);
    }

    async clickFAQs() {
        await this.HomePagelocatorsRegistry.FAQs.click();
        await this.page.waitForTimeout(1000);
    }

    async clickTermsAndConditions() {
        await this.HomePagelocatorsRegistry.TermsAndConditions.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBettingRules() {
        await this.HomePagelocatorsRegistry.BettingRules.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBetwayApp() {
        await this.HomePagelocatorsRegistry.BetwayApp.click();
        await this.page.waitForTimeout(1000);
    }

    async clickAffiliateProgram() {
        await this.HomePagelocatorsRegistry.AffiliateProgram.click();
        await this.page.waitForTimeout(1000);
    }

    async clickResponsibleGaming() {
        await this.HomePagelocatorsRegistry.ResponsibleGaming.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPrivacyPolicy() {
        await this.HomePagelocatorsRegistry.PrivacyPolicy.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSponsorships() {
        await this.HomePagelocatorsRegistry.Sponsorships.click();
        await this.page.waitForTimeout(1000);
    }

    async clickContactUs() {
        await this.HomePagelocatorsRegistry.ContactUs.click();
        await this.page.waitForTimeout(1000);
    }
}
