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
import { HeaderPage } from '../pages/HeaderPage';
import {BetslipPage} from '../pages/BetslipPage';

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
  headerPage: HeaderPage;
  // Signup-specific fixtures
  signupPage: SignUpPage;
  signupUtils: SignupUtils;
  screenshotDir: string;
  testData: TestData;
  betslipPage: BetslipPage;

};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.page.getByText('Got it').first().click();

    await use(homePage);
  },
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
  }
});

// Export expect for convenience
export { expect };

// Test data variations for different test scenarios
export const TestDataVariations = {
  // Mobile number variations
  validMobile: '999881234',
  shortMobile: '99988',
  longMobile: '999887373737',
  alphabeticMobile: '999a89793',
  specialCharMobile: '999-88@123',

  // Password variations
  strongPassword: 'TestPassword',
  passwordWithNumbers: 'Password123',
  passwordWithSpecialChars: 'Password@123!',
  minLengthPassword: 'Test123!',
  maxLengthPassword: 'TestPassword123456!@',
  allCharTypesPassword: 'TestPass123!@#',
  passwordWithSpaces: 'Test Pass 123!',
  weakPassword: '123456',
  shortPassword: 'Test1',
  longPassword: 'ThisIsAVeryLongPasswordThatExceedsMaximumAllowedLength123!@#',

  // Name variations
  validFirstName: 'John',
  validLastName: 'Smith',
  nameWithSpaces: 'Mary Jane',
  lastNameWithSpaces: 'Van Der Berg',
  nameWithHyphen: 'Anna-Marie',
  lastNameWithHyphen: 'Smith-Jones',
  nameWithNumbers: 'John123',
  lastNameWithNumbers: 'Smith456',
  nameWithSpecialChars: 'John@#',
  lastNameWithSpecialChars: 'Smith$%',

  // ID variations
  validSAId: '9001010001084',
  shortSAId: '90010100010', // 11 digits instead of 13
  saIdWithLetters: '9001010A01084',
  saIdWithSpecialChars: '900101-001084',

  // Passport variations
  validPassport: 'B12345678',
  shortPassport: 'A123',
  passportWithSpecialChars: 'ABC@#$123',
  allNumericPassport: '123456789',

  // Code variations
  mixedCaseCode: 'AbCdEf',
  codeWithNumbers: 'ABC123',
  codeWithSpecialChars: 'ABC@#',
  validReferralCode: 'VALID123',
  lowercaseReferralCode: 'valid123',
  uppercaseReferralCode: 'VALID123',
  referralWithNumbers: 'REF12345',
  referralWithHyphen: 'REF-2024'
};

// Screenshot helper functions - matches original screenshot logic
export class ScreenshotHelper {
  static async takeScreenshot(page: Page, screenshotDir: string, testId: string, testInfo: any) {
    const screenshotPath = `${screenshotDir}/${testId}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    await testInfo.attach(`${testId} Screenshot`, {
      path: screenshotPath,
      contentType: 'image/png',
    });
  }
}

// Test setup hooks that match original beforeEach/afterEach logic
export const setupSignupTestHooks = () => {
  test.beforeEach(async ({ signupUtils }, testInfo) => {
    await signupUtils.clearHighlights();

    // Get current test name to determine which reset method to use
    const testName = testInfo.title;
    await signupUtils.performTestReset(testName);
  });

  test.afterEach(async ({ signupUtils }, testInfo) => {
    // Get current test name for cleanup
    const testName = testInfo.title;
    await signupUtils.performTestReset(testName);
  });
};

// Test describe setup function - matches original test.describe structure
export const setupSignupTestSuite = (suiteName: string) => {
  return test.describe(suiteName, () => {
    setupSignupTestHooks();

    // Matches original afterAll cleanup
    test.afterAll(async ({ browser }) => {
      // Clean up shared resources
      if (sharedSignupPage) {
        const signupUtils = new SignupUtils(sharedSignupPage);
        await signupUtils.clearHighlights();
        await signupUtils.resetModalState();
      }
      if (sharedSignupContext) {
        await sharedSignupContext.close();
      }
    });
  });
};