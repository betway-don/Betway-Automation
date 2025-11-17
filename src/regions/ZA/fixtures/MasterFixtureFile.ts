import { test as base, expect, Page, BrowserContext } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { SportsPage } from '../pages/SportsPage';
import { CasinoPage } from '../pages/CasinoPage';
import { VirtualsPage } from '../pages/VirtualsPage';
import { PromotionPage } from '../pages/PromotionPage';
import { BetgamesPage } from '../pages/BetGamesPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignupUtils } from '../utils/signupUtils';
import { HomePage } from '../pages/HomePage';
import { BetInfluencerModal } from '../pages/BetInfluencerModal';
import { ContactUsPage } from '../pages/ContactUsPage';
import { HowToPage } from '../pages/HowToPage';
import { HeaderPage } from '../pages/HeaderPage';
import {BetslipPage} from '../pages/BetslipPage';
import { MyBetsPage } from '../pages/MyBetsPage';
import { BuildABetPage } from '../pages/BuildABetPage'; 

// Test data interface for signup
export interface TestData {
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
  saId: string;
  passportNumber: string;
  referralCode: string;
  voucherCode: string;
}

// Worker-scoped variables to maintain single context/page approach for signup tests
let sharedSignupContext: BrowserContext;
let sharedSignupPage: Page;

// Default test data - matches original test values
const defaultTestData: TestData = {
  mobile: '999881234',
  password: '123456789',
  firstName: 'Test',
  lastName: 'User',
  saId: '9001010001084',
  passportNumber: 'B12345678',
  referralCode: 'VALID123',
  voucherCode: 'AbCdEf'
};

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  sportsPage: SportsPage;
  casinoPage: CasinoPage;
  virtualsPage: VirtualsPage;
  promotionPage: PromotionPage;
  betgamesPage: BetgamesPage;
  betinfluencerModal: BetInfluencerModal;
  contactUs:ContactUsPage;
  howTo:HowToPage
  myBetsPage: MyBetsPage;
  buildABetPage: BuildABetPage;
  headerPage: HeaderPage;
  betslipPage: BetslipPage;
  // Signup-specific fixtures
  signupPage: SignUpPage;
  signupUtils: SignupUtils;
  screenshotDir: string;
  testData: TestData;

};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.page.setViewportSize({ width: 1300, height: 780 });
    await homePage.page.getByText('Got it').first().click();
    // await homePage.page.waitForEvent('domcontentloaded');
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.page.setViewportSize({ width: 1300, height: 780 });
    await loginPage.goto();
    await loginPage.page.getByText('Got it').first().click();
    await use(loginPage);
  },
  sportsPage: async ({ page }, use) => {
    const sportsPage = new SportsPage(page);
    await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
    await sportsPage.gotoSportsPage();
    await sportsPage.page.getByText('Got it').first().click();
    await use(sportsPage);
  },
  casinoPage: async ({ page }, use) => {
    const casinoPage = new CasinoPage(page);
    await casinoPage.page.setViewportSize({ width: 1300, height: 780 });
    await casinoPage.gotoCasino();
    await casinoPage.page.getByText('Got it').first().click();
    await use(casinoPage);
  },
  virtualsPage: async ({ page }, use) => {
    const virtualsPage = new VirtualsPage(page);
    await virtualsPage.page.setViewportSize({ width: 1300, height: 780 });
    await virtualsPage.gotoVirtuals();
    await use(virtualsPage);
  },
  promotionPage: async ({ page }, use) => {
    const promotionPage = new PromotionPage(page);
    await use(promotionPage);
  },
  contactUs:async({page},use)=>{
    const contactUsPage=new ContactUsPage(page);
    await contactUsPage.page.setViewportSize({ width: 1300, height: 780 });
    await contactUsPage.gotoContactUs();
    await use(contactUsPage)
  },
  howTo: async({page},use)=>{
    const howTo=new HowToPage(page);
    await howTo.page.setViewportSize({ width: 1300, height: 780 });
    await howTo.gotoHowTo();
    await use(howTo)
  },
  betgamesPage: async ({ page }, use) => {
    const betgamesPage = new BetgamesPage(page);
    await betgamesPage.page.setViewportSize({ width: 1300, height: 780 });
    await betgamesPage.gotoBetgames();
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

  testData: async ({ }, use) => {
    await use(defaultTestData);
  },

  signupPage: async ({ browser }, use) => {
    // Initialize shared context and page if not already done
    if (!sharedSignupContext) {
      sharedSignupContext = await browser.newContext();
    }
    if (!sharedSignupPage) {
      sharedSignupPage = await sharedSignupContext.newPage();

      // Initialize the page and wait for load state - matches original beforeAll
      const signupPage = new SignUpPage(sharedSignupPage);
      await signupPage.goto();
      await sharedSignupPage.waitForLoadState('domcontentloaded');
    }

    const signupPage = new SignUpPage(sharedSignupPage);
    await use(signupPage);
  },

  signupUtils: async ({ browser }, use) => {
    // Use the same shared page
    if (!sharedSignupContext) {
      sharedSignupContext = await browser.newContext();
    }
    if (!sharedSignupPage) {
      sharedSignupPage = await sharedSignupContext.newPage();

      // Initialize the page and wait for load state - matches original beforeAll
      const signupPage = new SignUpPage(sharedSignupPage);
      await signupPage.goto();
      await sharedSignupPage.waitForLoadState('domcontentloaded');
    }

    const signupUtils = new SignupUtils(sharedSignupPage);
    await use(signupUtils);
  },
  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await use(headerPage);
  },
  betslipPage: async ({ page }, use) => {
    const betslipPage = new BetslipPage(page);
    await betslipPage.goto();
    await use(betslipPage);
  },
  buildABetPage: async ({ page }, use) => {
    await page.setViewportSize({ width: 1300, height: 780 });
    const buildABetPage = new BuildABetPage(page);
    await use(buildABetPage);
  },
  
});

// Export expect for convenience
