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
import { HeaderPage } from '../pages/HeaderPage';
import {BetslipPage} from '../pages/BetslipPage';
import { BetInfluencerModal } from '../pages/BetInfluencerModal';
import { ContactUsPage } from '../pages/ContactUsPage';
import { HowToPage } from '../pages/HowToPage';
import { MyBetsPage } from '../pages/MyBetsPage';
import { BuildABetPage } from '../pages/BuildABetPage'; // <--- 1. IMPORT NEW PAGE

 
// ------------------------------------------------------------------
// 1. LOAD TEST DATA FROM JSON
// ------------------------------------------------------------------
 
// Define the shape of the data file
export interface FullTestData {
  basicInfo: {
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  mobileValidation: { [key: string]: string };
  passwordValidation: { [key: string]: string };
  nameValidation: { [key: string]: string };
  idValidation: { [key: string]: string };
  codeValidation: { [key: string]: string };
  myBetsCredentials: {
    mobile: string;
    password: string;
  };
  buildABetCredentials: { // <--- 2. ADD NEW DATA INTERFACE
    mobile: string;
    password: string;
  };
}
 
// Path to your JSON data file
const testDataPath = path.resolve(__dirname, '../json-data/SignUpData.json');
 
// Helper check
if (!fs.existsSync(testDataPath)) {
    console.error(`\n[MasterFixtureFile Error]`);
    console.error(`Could not find the JSON data file at the specified path.`);
    console.error(`Path tried: ${testDataPath}`);
    process.exit(1);
}
 
const testDataFile = fs.readFileSync(testDataPath, 'utf-8');
const allTestData: FullTestData = JSON.parse(testDataFile);
 
// DEPRECATED: For backward compatibility
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
  myBetsPage: MyBetsPage;
  buildABetPage: BuildABetPage; // <--- 3. ADD NEW PAGE FIXTURE TYPE
 
  headerPage: HeaderPage;
  // Signup-specific fixtures
  signupPage: SignUpPage;
  signupUtils: SignupUtils;
  screenshotDir: string;
    betslipPage: BetslipPage;

  testData: FullTestData;
};
 
// ------------------------------------------------------------------
// 3. EXTEND PLAYWRIGHT'S 'test' OBJECT
// ------------------------------------------------------------------
 
export const test = base.extend<PageFixtures>({
 
  // --- Standard Page Fixtures ---
  // (Omitted for brevity... your existing fixtures for HomePage, LoginPage, etc. go here)
  homePage: async ({ page }, use) => { /* ... */ },
  loginPage: async ({ page }, use) => { /* ... */ },
  sportsPage: async ({ page }, use) => { /* ... */ },
  casinoPage: async ({ page }, use) => { /* ... */ },
  virtualsPage: async ({ page }, use) => { /* ... */ },
  promotionPage: async ({ page }, use) => { /* ... */ },
  contactUs: async ({ page }, use) => { /* ... */ },
  howTo: async ({ page }, use) => { /* ... */ },
  betgamesPage: async ({ page }, use) => { /* ... */ },
  betinfluencerModal: async ({ page }, use) => { /* ... */ },
  myBetsPage: async ({ page }, use) => { /* ... */ },
 
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

  // --- Utility Fixtures ---
  screenshotDir: async ({ }, use) => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');
    await use(screenshotDir);
  },
 
  testData: async ({ }, use) => {
    await use(allTestData);
  },
 
  // --- Signup Fixtures ---
  signupPage: async ({ page }, use) => {
    await page.setViewportSize({ width: 1300, height: 780 });
    const signupPage = new SignUpPage(page);
    await use(signupPage);
  },
 
  signupUtils: async ({ page }, use) => {
    await page.setViewportSize({ width: 1300, height: 780 });
    const signupUtils = new SignupUtils(page);
    await use(signupUtils);
  },
 
  // --- 4. ADD NEW BUILD A BET FIXTURE ---
  buildABetPage: async ({ page }, use) => {
    await page.setViewportSize({ width: 1300, height: 780 });
    const buildABetPage = new BuildABetPage(page);
    await use(buildABetPage);
  },
});