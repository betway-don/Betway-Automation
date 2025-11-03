import { test as base, expect, Page, BrowserContext } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { SportsPage } from '../pages/SportsPage';
import { CasinoPage } from '../pages/CasinoPage';
import { VirtualsPage } from '../pages/VirtualsPage';
import { PromotionPage } from '../pages/PromotionPage';
import { BetgamesPage } from '../pages/BetGamesPage';
import { SignUpPage } from '../pages/SignUpPage';
import { HomePage } from '../pages/HomePage';
import { BetInfluencerModal } from '../pages/BetInfluencerModal';


type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  sportsPage: SportsPage;
  casinoPage: CasinoPage;
  virtualsPage: VirtualsPage;
  promotionPage: PromotionPage;
  betgamesPage: BetgamesPage;
  betinfluencerModal: BetInfluencerModal;
  signupPage: SignUpPage;
  screenshotDir: string;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.page.setViewportSize({ width: 1300, height: 780 });
    await homePage.page.getByText('Got it').first().click();
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.page.getByText('Got it').first().click();
    await use(loginPage);
  },
  sportsPage: async ({ page }, use) => {
    const sportsPage = new SportsPage(page);
    await sportsPage.gotoSportsPage();
    await sportsPage.page.getByText('Got it').first().click();
    await use(sportsPage);
  },
  casinoPage: async ({ page }, use) => {
    const casinoPage = new CasinoPage(page);
    await casinoPage.gotoCasino();
    await casinoPage.page.getByText('Got it').first().click();
    await use(casinoPage);
  },
  virtualsPage: async ({ page }, use) => {
    const virtualsPage = new VirtualsPage(page);
    await use(virtualsPage);
  },
  promotionPage: async ({ page }, use) => {
    const promotionPage = new PromotionPage(page);
    await use(promotionPage);
  },
  betgamesPage: async ({ page }, use) => {
    const betgamesPage = new BetgamesPage(page);
    await use(betgamesPage);
  },
  betinfluencerModal: async ({ page }, use) => {
    const betinfluencerModal = new BetInfluencerModal(page);
    await betinfluencerModal.goto();
    await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
    await betinfluencerModal.page.getByText('Got it').first().click();
    await use(betinfluencerModal);
  },

  // Signup fixtures - using shared page approach for no-refresh strategy
  screenshotDir: async ({ }, use) => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');
    await use(screenshotDir);
  },

});

