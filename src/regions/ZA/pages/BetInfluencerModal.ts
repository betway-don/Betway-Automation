import { betInfluencerModalLocators } from '../locators/betInfluencerModalLocators';
import { loadLocatorsFromExcel } from '../tests/modules/footer/excelReader';
import { getLocator } from '../tests/modules/footer/locatorResolver';
import { LoginPage } from './LoginPage';
import { SportsPage } from './SportsPage';
const file = "src/global/utils/file-utils/locators.xlsx";

// import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
// import { getLocator } from "../../../global/utils/file-utils/locatorResolver";

export class BetInfluencerModal extends SportsPage {
    page: import('@playwright/test').Page;
    BetInfluencerModalLocatorRegistry: Record<string, import('@playwright/test').Locator>;
    revenue: ReturnType<import('@playwright/test').Page['getByText']>;
    // summaryButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    // detailButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    // lastFourWeeksCanvas: import('@playwright/test').Locator;
    // detailedBreakdownButton: ReturnType<import('@playwright/test').Page['getByText']>;
    // totalMonthlyRevenue: ReturnType<import('@playwright/test').Page['getByText']>;
    // sortBySelector: import('@playwright/test').Locator;
    // monthsSelector: import('@playwright/test').Locator;
    // codesUsed: import('@playwright/test').Locator;
    // betsTaken: import('@playwright/test').Locator;
    // nextButton: import('@playwright/test').Locator;
    // previousButton: import('@playwright/test').Locator;
    // revenueGraph: import('@playwright/test').Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "BetGamesPage");
        this.revenue =this.page.getByText('Revenue').nth(0),
        this.BetInfluencerModalLocatorRegistry = {
            ...this.SportsPagelocatorRegistry,
            summaryButton : getLocator(page, configs["summaryButton"]),
            detailButton :getLocator(page, configs["detailButton"]),
            lastFourWeeksCanvas : getLocator(page, configs["lastFourWeeksCanvas"]),
            detailedBreakdownButton : getLocator(page, configs["detailedBreakdownButton"]),
            totalMonthlyRevenue: getLocator(page, configs["totalMonthlyRevenue"]),
            sortBySelector : getLocator(page, configs["sortBySelector"]),
            monthsSelector : getLocator(page, configs["monthsSelector"]),
            codesUsed : getLocator(page, configs["codesUsed"]),
            betsTaken : getLocator(page, configs["betsTaken"]),
            nextButton : getLocator(page, configs["nextButton"]),
            previousButton : getLocator(page, configs["previousButton"]),
            revenueGraph : getLocator(page, configs["revenueGraph"]),

        }
        // console.log("Loaded locators:", locators);
        // const locators = loadLocatorsFromExcel("src/global/utils/file-utils/locators.xlsx", "HomePage");


        // this.revenueGraph = page.locator(betInfluencerModalLocators.revnueGraph.selectors);
        // this.revenue = page.getByText('Revenue').nth(0);
        // this.summaryButton = page.getByRole('button', betInfluencerModalLocators.summaryButton.options).nth(betInfluencerModalLocators.summaryButton.nth);
        // this.detailButton = page.getByRole('button', betInfluencerModalLocators.detailButton.options).nth(betInfluencerModalLocators.detailButton.nth);
        // this.lastFourWeeksCanvas = page.locator(betInfluencerModalLocators.lastFourWeeksCanvas.selectors);
        // this.detailedBreakdownButton = page.getByText(betInfluencerModalLocators.detailedBreakdownButton.options.name).nth(betInfluencerModalLocators.detailedBreakdownButton.nth);
        // this.totalMonthlyRevenue = page.getByText(betInfluencerModalLocators.totalMonthlyRevenue.options.name).nth(betInfluencerModalLocators.totalMonthlyRevenue.nth);
        // this.sortBySelector = page.locator(betInfluencerModalLocators.sortBySelector.selectors);
        // this.monthsSelector = page.locator(betInfluencerModalLocators.monthSelector.selectors);
        // this.codesUsed = page.getByText(betInfluencerModalLocators.codesUsed.options.name).nth(betInfluencerModalLocators.codesUsed.nth).locator('..');
        // this.betsTaken = page.getByText(betInfluencerModalLocators.betsTaken.options.name).nth(betInfluencerModalLocators.betsTaken.nth).locator('..');
        // this.nextButton = page.locator(betInfluencerModalLocators.nextButton.selectors, { hasText: betInfluencerModalLocators.nextButton.options.name }).nth(betInfluencerModalLocators.nextButton.nth);
        // this.previousButton = page.locator(betInfluencerModalLocators.previousButton.selectors, { hasText: betInfluencerModalLocators.previousButton.options.name }).nth(betInfluencerModalLocators.previousButton.nth);
    }

    async toggleHambergerMenu() {
        await this.Login();
        await this.page.waitForLoadState('domcontentloaded');
        await this.BetInfluencerModalLocatorRegistry.hamburgerMenu.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async gotoBetInfluencerModal() {
        await this.toggleHambergerMenu();
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
        await this.page.waitForTimeout(2000);
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