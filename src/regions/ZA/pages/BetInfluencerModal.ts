import { betInfluencerModalLocators } from '../locators/betInfluencerModalLocators';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { LoginPage } from './LoginPage';
// const userData = require('../../../json-data/userData.json');

import { SportsPage } from './SportsPage';
import { highlightElements } from '../../Common-Flows/HighlightElements';
const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx"


export class BetInfluencerModal extends SportsPage {
    page: import('@playwright/test').Page;
    BetInfluencerModalLocatorRegistry: Record<string, import('@playwright/test').Locator>;
    revenue: any;


    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.revenue = this.page.getByText('Revenue').nth(0);
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BetInfluencerModalPage");
        this.BetInfluencerModalLocatorRegistry = {
            ...this.SportsPagelocatorRegistry,
            summaryButton: getLocator(page, configs["summaryButton"]),
            detailButton: getLocator(page, configs["detailButton"]),
            lastFourWeeksCanvas: getLocator(page, configs["lastFourWeeksCanvas"]),
            detailedBreakdownButton: getLocator(page, configs["detailedBreakdownButton"]),
            totalMonthlyRevenue: getLocator(page, configs["totalMonthlyRevenue"]),
            sortBySelector: getLocator(page, configs["sortBySelector"]),
            // monthsSelector : getLocator(page, configs["monthsSelector"]),
            codesUsed: getLocator(page, configs["codesUsed"]),
            betsTaken: getLocator(page, configs["betsTaken"]),
            nextButton: getLocator(page, configs["nextButton"]),
            previousButton: getLocator(page, configs["previousButton"]),
            // revenueGraph : getLocator(page, configs["revenueGraph"])
        }
    }

    async verifyPresenceofBetInfluencerinHamburgerMenu() {
        await this.toggleHambergerMenu();
        await highlightElements(this.BetInfluencerModalLocatorRegistry.BetInfluencer);
    }

    async verifyBetInfluencerFromAccountPopup(mobile: any) {
        await this.toggleHambergerMenu();
        await this.page.getByText('My Bets').nth(0).click();
        await this.page.getByText(`Account Options: ${mobile} `)
        const windowBetInfluencer = await this.page.locator('#booking-codes-account-nav');
        await windowBetInfluencer.waitFor({ state: 'visible', timeout: 5000 });
        await highlightElements(windowBetInfluencer);
    }

    async verifyAndClickDetailedBreakdown() {
        await highlightElements(this.BetInfluencerModalLocatorRegistry.detailedBreakdownButton);
        await this.BetInfluencerModalLocatorRegistry.detailedBreakdownButton.click();
        await this.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
    }
    async toggleHambergerMenu() {
        await this.Login();
        await this.page.waitForLoadState('domcontentloaded');
        await this.BetInfluencerModalLocatorRegistry.hamburgerMenu.click();
    }

    async gotoBetInfluencerModal() {
        await this.toggleHambergerMenu();
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
    }
    async gotoDetailSectionBetInfluencerModal() {
        await this.toggleHambergerMenu();
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
        await this.clickDetailButton();
    }
    async goToBetInfluencerWithoutLogin() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.BetInfluencerModalLocatorRegistry.hamburgerMenu.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
        await this.page.waitForTimeout(2000);
    }
    async clickDetailButton() {
        await this.BetInfluencerModalLocatorRegistry.detailButton.click();
        await this.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
    }
}