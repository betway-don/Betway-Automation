import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SportsPage } from '../pages/SportsPage';
import { CasinoPage } from '../pages/CasinoPage';
import { VirtualsPage } from '../pages/VirtualsPage';
import { PromotionPage } from '../pages/PromotionPage';
import { BetgamesPage } from '../pages/BetGamesPage';

type PageFixtures = {
  loginPage: LoginPage;
  sportsPage: SportsPage;
  casinoPage: CasinoPage;
  virtualsPage: VirtualsPage;
  promotionPage: PromotionPage;
  betgamesPage: BetgamesPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  sportsPage: async ({ page }, use) => {
    const sportsPage = new SportsPage(page);
    await use(sportsPage);
  },
  casinoPage: async ({ page }, use) => {
    const casinoPage = new CasinoPage(page);
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
  }
});