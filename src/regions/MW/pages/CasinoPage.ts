import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import userData from '../json-data/userData.json'; // Adjust the path as needed

export class CasinoPage extends LoginPage {
    page: import('@playwright/test').Page;
    searchBox: ReturnType<import('@playwright/test').Page['getByRole']>;
    playButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    aviatorLink: ReturnType<import('@playwright/test').Page['getByRole']>;
    casinoGames: ReturnType<import('@playwright/test').Page['getByRole']>;
    homePage: ReturnType<import('@playwright/test').Page['getByRole']>;
    favouriteGames: import('@playwright/test').Locator;
    

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.searchBox=page.getByRole('textbox', casinoPageLocators.searchBox.options).nth(casinoPageLocators.searchBox.nth);
        this.playButton = page.getByRole('button', casinoPageLocators.playButton.options).nth(casinoPageLocators.playButton.nth);
        this.aviatorLink = page.getByRole('link', casinoPageLocators.aviatorLink.options).nth(casinoPageLocators.aviatorLink.nth);
        this.casinoGames = page.getByRole('link').filter({ hasText: 'the-chicken-game' }).first();
        this.homePage = page.getByRole('link').filter({ hasText: 'Home' }).first();
        this.favouriteGames = page.getByRole('button',casinoPageLocators.favouriteGames.options).nth(casinoPageLocators.favouriteGames.nth)}

    async gotoCasino() {
        await this.goto();
        await this.CasinoButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchgame(gameName: string) {
        await this.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for search results to load
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).first().click();
        await this.page.getByText('Real Play').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async FavouriteGame() {
        await this.favouriteGames.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    

}