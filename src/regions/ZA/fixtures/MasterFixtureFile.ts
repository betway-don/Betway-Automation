import { test as base, expect, Page, BrowserContext } from '@playwright/test';
import path from 'path';
import * as fs from 'fs';

// --- Page Object Imports ---
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

// ------------------------------------------------------------------
// 1. LOAD TEST DATA FROM JSON
// ------------------------------------------------------------------

// Define the shape of the data/testData.json file
export interface FullTestData {
  basicInfo: {
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  mobileValidation: { [key: string]: string };
  passwordValidation: { [key: string]: string };
  nameValidation: { [key: string]: string };
  idValidation: { [key: string]: string };
  codeValidation: { [key: string]: string };
}

// Read the JSON file *once* when the test runner starts
// Assumes 'data' folder is a sibling of your 'fixtures' folder
const testDataPath = path.resolve(__dirname, '../json-data/SignupData.json');
const testDataFile = fs.readFileSync(testDataPath, 'utf-8');
const allTestData: FullTestData = JSON.parse(testDataFile);

// DEPRECATED: Export the loaded data under the old name 'TestDataVariations'
// This is for backward compatibility with any old spec files.
// New spec files should use the 'testData' fixture.
// You can delete this export once all old files are updated.
export const TestDataVariations = allTestData;

// ------------------------------------------------------------------
// 2. DEFINE FIXTURE TYPES
// ------------------------------------------------------------------

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  sportsPage: SportsPage;
  casinoPage: CasinoPage;
  virtualsPage: VirtualsPage;
  promotionPage: PromotionPage;
  betgamesPage: BetgamesPage;
  betinfluencerModal: BetInfluencerModal;
  contactUs: ContactUsPage;
  howTo: HowToPage;

  // Signup-specific fixtures
  signupPage: SignUpPage;
  signupUtils: SignupUtils;
  screenshotDir: string;
  
  // Use the FullTestData interface for our fixture
  testData: FullTestData; 
};

// ------------------------------------------------------------------
// 3. EXTEND PLAYWRIGHT'S 'test' OBJECT
// ------------------------------------------------------------------

export const test = base.extend<PageFixtures>({

  // --- Standard Page Fixtures (Test-Isolated) ---
  // (These use the default 'page' fixture, so they get a new page every time)

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.page.setViewportSize({ width: 1300, height: 780 });
    await homePage.page.getByText('Got it').first().click();
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
  contactUs: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.page.setViewportSize({ width: 1300, height: 780 });
    await contactUsPage.gotoContactUs();
    await use(contactUsPage)
  },
  howTo: async ({ page }, use) => {
    const howTo = new HowToPage(page);
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

  // --- Utility Fixtures ---

  screenshotDir: async ({ }, use) => {
    // This assumes your fixture file is at a path like 'project/src/fixtures'
    const projectRoot = path.resolve(__dirname, '../../..'); 
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');
    await use(screenshotDir);
  },

  testData: async ({ }, use) => {
    // Provide the 'allTestData' object loaded from the JSON file.
    await use(allTestData);
  },

  // --- REFACTORED Signup Fixtures ---
  // These now use Playwright's built-in 'page' fixture,
  // ensuring a new, clean page for every single test (test isolation).

  signupPage: async ({ page }, use) => {
    // Use the isolated 'page' for this test.
    // The spec file's 'beforeEach' hook is responsible for navigation.
    await page.setViewportSize({ width: 1300, height: 780 });
    const signupPage = new SignUpPage(page);
    await use(signupPage);
  },

  signupUtils: async ({ page }, use) => {
    // Use the same isolated 'page' as the signupPage fixture.
    await page.setViewportSize({ width: 1300, height: 780 });
    const signupUtils = new SignupUtils(page);
    await use(signupUtils);
  }
});