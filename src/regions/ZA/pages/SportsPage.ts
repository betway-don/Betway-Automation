import { OddsSelection } from '../../Common-Flows/OddSelection';
import { loginLocators } from '../locators/loginPageLocators';
import { sportsPageLocators } from '../locators/sportsPageLocators';
const userData = require('../json-data/userData.json');
import { LoginPage } from './LoginPage';

export class SportsPage extends LoginPage {
    page: import('@playwright/test').Page;
    aviator: ReturnType<import('@playwright/test').Page['getByRole']>;
    live: ReturnType<import('@playwright/test').Page['getByRole']>;
    esports: ReturnType<import('@playwright/test').Page['getByRole']>;
    soccerTote: ReturnType<import('@playwright/test').Page['getByRole']>;
    betwayJackpots: ReturnType<import('@playwright/test').Page['getByRole']>;
    betgames: ReturnType<import('@playwright/test').Page['getByRole']>;
    LuckyNumbers: ReturnType<import('@playwright/test').Page['getByRole']>;
    HorseRacing: ReturnType<import('@playwright/test').Page['getByRole']>;
    Jetx: ReturnType<import('@playwright/test').Page['getByRole']>;
    ChickenGame: ReturnType<import('@playwright/test').Page['getByRole']>;
    OldSite: ReturnType<import('@playwright/test').Page['getByRole']>;
    Home: ReturnType<import('@playwright/test').Page['getByRole']>;
    CasinoGames: ReturnType<import('@playwright/test').Page['getByRole']>;
    Virtuals: ReturnType<import('@playwright/test').Page['getByRole']>;
    promotionPage: ReturnType<import('@playwright/test').Page['getByRole']>;
    betslip: ReturnType<import('@playwright/test').Page['getByRole']>;
    betslipButton: ReturnType<import('@playwright/test').Page['getByText']>;
    loginButtonFromBetslip: ReturnType<import('@playwright/test').Page['getByRole']>;
    betNow: ReturnType<import('@playwright/test').Page['locator']>;
    betConfirmation: ReturnType<import('@playwright/test').Page['locator']>;
    bookingCodeMessage: ReturnType<import('@playwright/test').Page['getByText']>;
    enterBookingCodeTextbox:ReturnType<import('@playwright/test').Page['locator']>;
    shareButton:ReturnType<import('@playwright/test').Page['locator']>;
    modalCloseButton:ReturnType<import('@playwright/test').Page['locator']>;
    

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.aviator = page.getByRole('link').filter({ hasText: 'Aviator' }).first();
        this.live = page.getByRole('link').filter({ hasText: 'Live' }).first();
        this.esports = page.getByRole('link').filter({ hasText: 'Esports' }).first();
        this.soccerTote = page.getByRole('link').filter({ hasText: 'Soccer Tote' }).first();
        this.betwayJackpots = page.getByRole('link').filter({ hasText: 'Betway Jackpots' }).first();
        this.betgames = page.getByRole('link').filter({ hasText: 'Betgames' }).first();
        this.LuckyNumbers = page.getByRole('link').filter({ hasText: 'Lucky Numbers' }).first();
        this.HorseRacing = page.getByRole('link').filter({ hasText: 'Horse Racing' }).first();
        this.Jetx = page.getByRole('link').filter({ hasText: 'JetX' }).first();
        this.ChickenGame = page.getByRole('link').filter({ hasText: 'Chicken Game' }).first();
        this.OldSite = page.getByRole('link').filter({ hasText: 'Old Site' }).first();
        this.Home = page.getByRole('link').filter({ hasText: 'Home' }).first();
        this.CasinoGames = page.getByRole('link').filter({ hasText: 'Casino Games' }).first();
        this.Virtuals = page.getByRole('link').filter({ hasText: 'Virtuals' }).first();
        this.promotionPage = page.getByRole('link').filter({ hasText: 'Promotions' }).first();
        this.betslip = page.locator(sportsPageLocators.Betslip.selector);
        this.betslipButton=page.getByText(sportsPageLocators.BetSlipButton.options.name);
        this.loginButtonFromBetslip = this.betslip.getByRole('button', { name: sportsPageLocators.loginButtonFromBetSlip.options.name });
        this.betNow = this.betslip.locator(sportsPageLocators.betNow.selector);
        this.shareButton = this.betslip.locator(sportsPageLocators.shareButton.selector);
        this.betConfirmation = page.getByText(sportsPageLocators.betConfirmation.options.name).nth(sportsPageLocators.betConfirmation.nth).locator('..');
        this.bookingCodeMessage = page.getByText(sportsPageLocators.bookingCodeMessage.options.name).nth(sportsPageLocators.bookingCodeMessage.nth)
        this.enterBookingCodeTextbox=page.locator(sportsPageLocators.enterBookingCode.selector);
        this.modalCloseButton=page.locator(sportsPageLocators.modalCloseButton.selector);
    }
    async gotoSportsPage() {
        await this.goto();
        await this.SportButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async gotoAviator() {
        await this.goto();
        await this.SportButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.aviator.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async AviatorLoginPopUp() {
        await this.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
    }

    async AviatorLoginPopUpArgs(mobile: string, password: string) {
        await this.formMobileInput.fill(`${mobile}`);
        await this.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
    }

    async LogOut() {
        await this.hamburgerMenu.click();
        await this.page.getByText('All Balances').waitFor({ state: 'visible' });
        await this.page.getByText('Log out').click();
        await this.page.getByRole('button', { name: 'Proceed' }).click();
        await this.loginButton.waitFor({ state: 'visible' });
    }

    async PlaceBets(legsCount: number) {
        await OddsSelection(legsCount, this.page);
        await this.betNow.click();
        const bookingCode = await this.bookingCodeMessage.innerText();
        console.log(bookingCode);
        await this.modalCloseButton.click();
        return bookingCode;
    }
}