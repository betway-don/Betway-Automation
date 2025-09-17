import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import { virtualPageLocators } from "../locators/virtualPageLocators";

export class VirtualsPage extends SportsPage {
    page: import('@playwright/test').Page;
    searchBox: ReturnType<import('@playwright/test').Page['getByRole']>;
    playButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    casinoGames: ReturnType<import('@playwright/test').Page['getByRole']>;
    homePage: ReturnType<import('@playwright/test').Page['getByRole']>;
    favouriteGames: import('@playwright/test').Locator;


    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.searchBox = page.getByRole('textbox', virtualPageLocators.searchBox.options).nth(virtualPageLocators.searchBox.nth);
        this.playButton = page.getByRole('button', virtualPageLocators.playButton.options).nth(virtualPageLocators.playButton.nth);
        this.casinoGames = page.getByRole('link').filter({ hasText: 'the-chicken-game' }).first();
        this.homePage = page.getByRole('link').filter({ hasText: 'Home' }).first();
        this.favouriteGames = page.getByRole('button', virtualPageLocators.favouriteGames.options).nth(virtualPageLocators.favouriteGames.nth)
    }

    async gotoVirtuals() {
        await this.goto();
        await this.SportButton.click();
        await this.Virtuals.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchgame(gameName: string) {
        await this.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).click();
        // await this.page.getByRole('button',{name:'Play'}).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async FavouriteGame() {
        await this.favouriteGames.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}