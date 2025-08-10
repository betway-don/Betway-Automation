import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import { betgamesPageLocators } from "../locators/betgamesPageLocator";

export class BetgamesPage extends SportsPage {
    page: import('@playwright/test').Page;
    searchBox: ReturnType<import('@playwright/test').Page['getByRole']>;
    playButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    casinoGames: ReturnType<import('@playwright/test').Page['getByRole']>;
    homePage: ReturnType<import('@playwright/test').Page['getByRole']>;
    favouriteGames: import('@playwright/test').Locator;
    

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.searchBox=page.getByRole('textbox', betgamesPageLocators.searchBox.options).nth(betgamesPageLocators.searchBox.nth);
        this.playButton = page.getByRole('button', betgamesPageLocators.playButton.options).nth(betgamesPageLocators.playButton.nth);
        this.casinoGames = page.getByRole('link').filter({ hasText: 'the-chicken-game' }).first();
        this.homePage = page.getByRole('link').filter({ hasText: 'Home' }).first();
        this.favouriteGames = page.locator(betgamesPageLocators.favouriteGames.selector).nth(betgamesPageLocators.favouriteGames.nth);
    }

    async gotoBetgames() {
        await this.goto();
        await this.SportButton.click();
        await this.betgames.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchgame(gameName: string) {
        await this.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async FavouriteGame() {
        await this.favouriteGames.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}