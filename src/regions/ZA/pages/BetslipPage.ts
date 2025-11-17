// import { betslipPageLocator } from '../locators/betslipPageLocators';
// import { HomePage } from './HomePage';
// import { expect, Page, Locator } from '@playwright/test';
// import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements'

// const userData = require('../json-data/userData.json');

// export class BetslipPage extends HomePage {
//   page: import('@playwright/test').Page;
//   mobileNumberInput: ReturnType<import('@playwright/test').Page['locator']>;
//   passwordInput: ReturnType<import('@playwright/test').Page['locator']>;
//   closePromotionPopup: ReturnType<import('@playwright/test').Page['locator']>;

//   sportButton: ReturnType<import('@playwright/test').Page['locator']>;
//   betslipButton: ReturnType<import('@playwright/test').Page['getByText']>;
//   singleTab: ReturnType<import('@playwright/test').Page['locator']>;
//   multiTab: ReturnType<import('@playwright/test').Page['locator']>;
//   bookingCodeInput: ReturnType<import('@playwright/test').Page['getByRole']>;
//   warningText: ReturnType<import('@playwright/test').Page['getByText']>;
//   settingsButton: ReturnType<import('@playwright/test').Page['locator']>;
//   loadButton: ReturnType<import('@playwright/test').Page['getByRole']>;

//   // New properties for T2 - Betslip Settings Popup
//   settingsText: ReturnType<import('@playwright/test').Page['getByText']>;
//   acceptOddsToggleLabel: ReturnType<import('@playwright/test').Page['getByText']>;
//   acceptOddsToggle: ReturnType<import('@playwright/test').Page['locator']>;
//   keepBetsToggleLabel: ReturnType<import('@playwright/test').Page['getByText']>;
//   keepBetsToggle: ReturnType<import('@playwright/test').Page['locator']>;
//   continueButton: ReturnType<import('@playwright/test').Page['getByRole']>;
//   closeIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   simpleViewToggle: ReturnType<import('@playwright/test').Page['locator']>;
//   deleteIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   selectAllCheckbox: ReturnType<import('@playwright/test').Page['locator']>;
//   removeLegIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   betAmountInput: ReturnType<import('@playwright/test').Page['locator']>;
//   loginBtnBetslip: ReturnType<import('@playwright/test').Page['getByRole']>;
//   betNowBtn: ReturnType<import('@playwright/test').Page['locator']>;
//   shareBtn: ReturnType<import('@playwright/test').Page['locator']>;
//   cashBtnSingle: ReturnType<import('@playwright/test').Page['locator']>;
//   freebetBtnSingle: ReturnType<import('@playwright/test').Page['locator']>
//   cashBtnMulti: ReturnType<import('@playwright/test').Page['locator']>;
//   freebetBtnMulti: ReturnType<import('@playwright/test').Page['locator']>;
//   cashOutIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   winBoostToolTip: ReturnType<import('@playwright/test').Page['getByText']>;
//   // winBoostInfoIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   winBoostValue: ReturnType<import('@playwright/test').Page['getByText']>;
//   winBoostInfoIcon: Locator;
//   betSaverText: ReturnType<import('@playwright/test').Page['getByText']>;
//   totalBetwayReturnMulti: ReturnType<import('@playwright/test').Page['getByText']>;
//   totalBetwayReturnSingle: ReturnType<import('@playwright/test').Page['getByText']>;
//   potentialReturnSingle: ReturnType<import('@playwright/test').Page['getByText']>;
//   potentialReturnMulti: ReturnType<import('@playwright/test').Page['getByText']>;

//   constructor(page: import('@playwright/test').Page) {
//     super(page);
//     this.page = page;
//     this.mobileNumberInput = page.locator(betslipPageLocator.usernameInput.selector);
//     this.passwordInput = page.locator(betslipPageLocator.passwordInput.selector);
//     this.closePromotionPopup = page.locator(betslipPageLocator.closePromotionPopup.selector);

//     this.sportButton = page.locator(betslipPageLocator.sportButton.selector);
//     this.betslipButton = page.getByText(betslipPageLocator.betslipButton.text);

//     this.singleTab = page.locator(betslipPageLocator.singleTab.selector);
//     this.multiTab = page.locator(betslipPageLocator.multiTab.selector);
//     this.bookingCodeInput = page.getByRole('textbox', { name: 'Booking Code' });
//     this.settingsButton = page.locator(betslipPageLocator.settingsButton.selector);
//     this.warningText = page.getByText(betslipPageLocator.warningText.text);
//     this.loadButton = page.getByRole('button', { name: betslipPageLocator.loadButton.name });

//     // Initialize new locators for T2
//     this.settingsText = page.getByText(betslipPageLocator.settingsText.text);
//     this.acceptOddsToggleLabel = page.getByText(betslipPageLocator.acceptOddsToggleLabel.text);
//     this.acceptOddsToggle = page.locator(betslipPageLocator.acceptOddsToggle.selector).first();
//     this.keepBetsToggleLabel = page.getByText(betslipPageLocator.keepBetsToggleLabel.text);
//     this.keepBetsToggle = page.locator(betslipPageLocator.keepBetsToggle.selector);
//     this.continueButton = page.getByRole('button', { name: betslipPageLocator.continueButton.name });
//     this.closeIcon = page.locator(betslipPageLocator.closeIcon.selector);
//     this.deleteIcon = page.locator(betslipPageLocator.deleteIcon.selector);
//     this.selectAllCheckbox = page.locator(betslipPageLocator.selectAllCheckbox.selector);
//     this.removeLegIcon = page.locator(betslipPageLocator.removeLegIcon.selector);
//     this.betAmountInput = page.locator(betslipPageLocator.betAmountInput.selector);
//     this.loginBtnBetslip = page.locator(betslipPageLocator.loginBtnBetslip.selector).getByRole('button', { name: betslipPageLocator.loginBtnBetslip.name });
//     this.betNowBtn = page.locator(betslipPageLocator.betNowBtn.selector);
//     this.shareBtn = page.locator(betslipPageLocator.shareBtn.selector);
//     this.cashBtnSingle = page.locator(betslipPageLocator.cashBtnSingle.selector);
//     this.freebetBtnSingle = page.locator(betslipPageLocator.freebetBtnSingle.selector);
//     this.cashBtnMulti = page.locator(betslipPageLocator.cashBtnMulti.selector);
//     this.freebetBtnMulti = page.locator(betslipPageLocator.freebetBtnMulti.selector);
//     this.cashOutIcon = page.locator(betslipPageLocator.cashOutIcon.selector);
//     this.simpleViewToggle = page.locator(betslipPageLocator.simpleViewToggle.selector);
//     this.winBoostToolTip = page.getByText(betslipPageLocator.winBoostToolTip.text);
//     // this.winBoostInfoIcon = page.locator(betslipPageLocator.winBoostInfoIcon.selector(page));
//     this.winBoostValue = page.getByText(betslipPageLocator.winBoostValue.text);
//     this.winBoostInfoIcon = page.locator(betslipPageLocator.winBoostInfoIcon.selector, { hasText: betslipPageLocator.winBoostInfoIcon.filter.hasText }).getByRole('img').nth(betslipPageLocator.winBoostInfoIcon.nth);
//     this.betSaverText = page.getByText(betslipPageLocator.betSaverText.text);
//     this.totalBetwayReturnMulti = page.getByText(betslipPageLocator.totalBetwayReturnMulti.text).nth(0);
//     this.totalBetwayReturnSingle = page.getByText(betslipPageLocator.totalBetwayReturnSingle.text).nth(0);
//     this.potentialReturnSingle = page.getByText(betslipPageLocator.potentialReturnSingle.text);
//     this.potentialReturnMulti = page.getByText(betslipPageLocator.potentialReturnMulti.text);
//   }

//   async goto() {
//     await this.page.goto('https://new.betway.co.za/sport/soccer');
//   }

//   async clickBetslipButton() {
//     await this.betslipButton.click();
//   }

//   async Login() {
//     // await this.goto();
//     await this.mobileNumberInput.fill(`${userData.user4.mobile}`);
//     await this.passwordInput.fill(`${userData.user4.password}`);
//     await this.page.keyboard.press('Enter');
//     await this.closePromotionPopup.click();
//     await this.page.waitForLoadState('domcontentloaded')
//   }

//   async loginWithoutFreebet() {
//     await this.mobileNumberInput.fill(`${userData.user5.mobile}`);
//     await this.passwordInput.fill(`${userData.user5.password}`);
//     await this.page.keyboard.press('Enter');
//     await this.closePromotionPopup.click();
//     await this.page.waitForLoadState('domcontentloaded')
//   }

//   async clickSettingsButton() {
//     await this.settingsButton.getByRole('img').click();
//     await this.page.waitForTimeout(1000);
//   }

//   async verifyBetslipSection() {
//     await highlightElementBorder(this.betslipButton);
//     await this.betslipButton.click();
//     await highlightElementBorder(this.singleTab);
//     await highlightElementBorder(this.multiTab);
//     await highlightElementBorder(this.warningText);
//     await highlightElementBorder(this.bookingCodeInput);
//     await highlightElementBorder(this.loadButton);
//   }

//   async verifyBetslipSettingsSection() {
//     await this.betslipButton.click();
//     await this.settingsButton.click();
//     await highlightElementBorder(this.settingsText);
//     await highlightElementBorder(this.acceptOddsToggleLabel);
//     await highlightElementBorder(this.acceptOddsToggle);
//     await highlightElementBorder(this.keepBetsToggleLabel);
//     await highlightElementBorder(this.keepBetsToggle);
//     await this.acceptOddsToggle.click();
//     await this.keepBetsToggle.click();
//   }

//   async tryInvalidInput(locator: Locator, value: string) {
//     for (const char of value) {
//       await locator.type(char);
//     }
//     const currentValue = await locator.inputValue();
//     expect(/^\d*\.?\d*$/.test(currentValue)).toBeTruthy();
//   }

//   async verifyWinBoostTooltip() {
//     await this.multiTab.click();
//     await expect(this.winBoostToolTip).toBeVisible();
//     await highlightElements(this.winBoostToolTip);
//   }

//   async verifyWinBoostCalculation() {
//     await this.betAmountInput.fill('1');
//     await expect(this.winBoostValue).toBeVisible();
//     await highlightElements(this.winBoostValue);
//   }

//   async verifyPotentialReturnsSingle() {
//     await expect(this.totalBetwayReturnSingle).toBeVisible();
//     await this.totalBetwayReturnSingle.click();
//     await expect(this.potentialReturnSingle).toBeVisible();
//     await highlightElements(this.potentialReturnSingle);
//   }

//   async verifyPotentialReturnsMulti() {
//     await this.multiTab.click();
//     await expect(this.totalBetwayReturnMulti).toBeVisible();
//     await this.totalBetwayReturnMulti.click();
//     await expect(this.potentialReturnMulti).toBeVisible();
//     await highlightElements(this.potentialReturnMulti);
//   }
// }
import { expect, Page, Locator } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';

const userData = require('../json-data/userData.json');
// const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx";
const Locator_Url = "src/global/utils/file-utils/locators(1).xlsx";

// Assume HomePage is imported correctly
import { HomePage } from './HomePage'; // You would have an import like this

export class BetslipPage extends HomePage {
  readonly BetslipPageLocatorsRegistry: Record<string, import('@playwright/test').Locator>;
  page: import('@playwright/test').Page;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.page = page;

    const configs = loadLocatorsFromExcel(Locator_Url, "BetslipPage");

    this.BetslipPageLocatorsRegistry = {
      mobileNumberInput: getLocator(this.page, configs["usernameInput"]),
      passwordInput: getLocator(this.page, configs["passwordInput"]),
      closePromotionPopup: getLocator(this.page, configs["closePromotionPopup"]),
      sportButton: getLocator(this.page, configs["sportButton"]),
      betslipButton: getLocator(this.page, configs["betslipButton"]),
      betslipCount: getLocator(this.page, configs["betslipCount"]),
      singleTab: getLocator(this.page, configs["singleTab"]),
      multiTab: getLocator(this.page, configs["multiTab"]),
      bookingCodeInput: getLocator(this.page, configs["bookingCodeInput"]),
      settingsButton: getLocator(this.page, configs["settingsButton"]),
      warningText: getLocator(this.page, configs["warningText"]),
      loadButton: getLocator(this.page, configs["loadButton"]),
      settingsText: getLocator(this.page, configs["settingsText"]),
      acceptOddsToggleLabel: getLocator(this.page, configs["acceptOddsToggleLabel"]),
      acceptOddsToggle: getLocator(this.page, configs["acceptOddsToggle"]),
      keepBetsToggleLabel: getLocator(this.page, configs["keepBetsToggleLabel"]),
      keepBetsToggle: getLocator(this.page, configs["keepBetsToggle"]),
      continueButton: getLocator(this.page, configs["continueButton"]),
      closeIcon: getLocator(this.page, configs["closeIcon"]),
      simpleViewToggle: getLocator(this.page, configs["simpleViewToggle"]),
      deleteIcon: getLocator(this.page, configs["deleteIcon"]),
      selectAllCheckbox: getLocator(this.page, configs["selectAllCheckbox"]),
      removeLegIcon: getLocator(this.page, configs["removeLegIcon"]),
      betAmountInput: getLocator(this.page, configs["betAmountInput"]),
      loginBtnBetslip: getLocator(this.page, configs["loginBtnBetslip"]),
      betNowBtn: getLocator(this.page, configs["betNowBtn"]),
      shareBtn: getLocator(this.page, configs["shareBtn"]),
      cashBtnSingle: getLocator(this.page, configs["cashBtnSingle"]),
      freebetBtnSingle: getLocator(this.page, configs["freebetBtnSingle"]),
      cashBtnMulti: getLocator(this.page, configs["cashBtnMulti"]),
      freebetBtnMulti: getLocator(this.page, configs["freebetBtnMulti"]),
      cashOutIcon: getLocator(this.page, configs["cashOutIcon"]),
      winBoostToolTip: getLocator(this.page, configs["winBoostToolTip"]),
      winBoostValue: getLocator(this.page, configs["winBoostValue"]),
      betSaverText: getLocator(this.page, configs["betSaverText"]),
      totalBetwayReturnMulti: getLocator(this.page, configs["totalBetwayReturnMulti"]),
      totalBetwayReturnSingle: getLocator(this.page, configs["totalBetwayReturnSingle"]),
      potentialReturnSingle: getLocator(this.page, configs["potentialReturnSingle"]),
      potentialReturnMulti: getLocator(this.page, configs["potentialReturnMulti"]),
      soccerLink: getLocator(this.page, configs["soccerLink"]),
      firstMatchOdds: getLocator(this.page, configs["firstMatchOdds"]),
      secondMatchOdds: getLocator(this.page, configs["secondMatchOdds"]),
      thirdMatchOdds: getLocator(this.page, configs["thirdMatchOdds"]),
      betslipContainer: getLocator(this.page, configs["betslipContainer"]),
      emptyBetslipMessage: getLocator(this.page, configs["emptyBetslipMessage"]),
      betslipCloseBtn: getLocator(this.page, configs["betslipCloseBtn"]),
      multiTabInactive: getLocator(this.page, configs["multiTabInactive"]),
      totalOdds: getLocator(this.page, configs["totalOdds"]),
      totalStake: getLocator(this.page, configs["totalStake"]),
    };

    // Special handling for winBoostInfoIcon (complex locator)
    this.BetslipPageLocatorsRegistry.winBoostInfoIcon = this.page.locator('div', {
      hasText: /^Win Boost 3%\. 1 more for 4% \(Min odds 1\.2\)Bet Saver not active$/
    }).getByRole('img').nth(1);
  }

  // Navigation Methods
  async goto() {
    await this.page.goto('https://new.betway.co.za/sport/soccer');
  }

  // Login Methods
  async Login() {
    await this.BetslipPageLocatorsRegistry.mobileNumberInput.fill(`${userData.user4.mobile}`);
    await this.BetslipPageLocatorsRegistry.passwordInput.fill(`${userData.user4.password}`);
    await this.page.keyboard.press('Enter');
    // await this.BetslipPageLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible',});
    // await this.BetslipPageLocatorsRegistry.closePromotionPopup.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async loginWithoutFreebet() {
    await this.BetslipPageLocatorsRegistry.mobileNumberInput.fill(`${userData.user5.mobile}`);
    await this.BetslipPageLocatorsRegistry.passwordInput.fill(`${userData.user5.password}`);
    await this.page.keyboard.press('Enter');
    // await this.BetslipPageLocatorsRegistry.closePromotionPopup.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verification Methods
  async verifyBetslipButton() {
    await this.BetslipPageLocatorsRegistry.betslipButton.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.betslipButton);
  }

  async verifySingleTab() {
    await this.BetslipPageLocatorsRegistry.singleTab.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.singleTab);
  }

  async verifyMultiTab() {
    await this.BetslipPageLocatorsRegistry.multiTab.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.multiTab);
  }

  async verifyWarningText() {
    await this.BetslipPageLocatorsRegistry.warningText.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.warningText);
  }

  async verifyBookingCodeInput() {
    await this.BetslipPageLocatorsRegistry.bookingCodeInput.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.bookingCodeInput);
  }

  async verifyLoadButton() {
    await this.BetslipPageLocatorsRegistry.loadButton.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.loadButton);
  }

  async verifySettingsText() {
    await this.BetslipPageLocatorsRegistry.settingsText.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.settingsText);
  }

  async verifyAcceptOddsToggle() {
    await this.BetslipPageLocatorsRegistry.acceptOddsToggleLabel.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.acceptOddsToggleLabel);
  }

  async verifyKeepBetsToggle() {
    await this.BetslipPageLocatorsRegistry.keepBetsToggleLabel.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.keepBetsToggleLabel);
  }

  async verifyDeleteIcon() {
    await this.BetslipPageLocatorsRegistry.deleteIcon.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.deleteIcon);
  }

  async verifySelectAllCheckbox() {
    await this.BetslipPageLocatorsRegistry.selectAllCheckbox.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.selectAllCheckbox);
  }

  async verifyRemoveLegIcon() {
    await this.BetslipPageLocatorsRegistry.removeLegIcon.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.removeLegIcon);
  }

  async verifyBetAmountInput() {
    await this.BetslipPageLocatorsRegistry.betAmountInput.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.betAmountInput);
  }

  async verifyLoginBtnBetslip() {
    const loginBtn = this.BetslipPageLocatorsRegistry.loginBtnBetslip.getByRole('button', { name: 'Login' });
    await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(loginBtn);
  }

  async verifyBetNowBtn() {
    await this.BetslipPageLocatorsRegistry.betNowBtn.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.betNowBtn);
  }

  async verifyShareBtn() {
    await this.BetslipPageLocatorsRegistry.shareBtn.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.shareBtn);
  }

  async verifyCashBtnSingle() {
    await this.BetslipPageLocatorsRegistry.cashBtnSingle.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.cashBtnSingle);
  }

  async verifyFreebetBtnSingle() {
    await this.BetslipPageLocatorsRegistry.freebetBtnSingle.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.freebetBtnSingle);
  }

  async verifyCashBtnMulti() {
    await this.BetslipPageLocatorsRegistry.cashBtnMulti.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.cashBtnMulti);
  }

  async verifyFreebetBtnMulti() {
    await this.BetslipPageLocatorsRegistry.freebetBtnMulti.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.freebetBtnMulti);
  }

  async verifyCashOutIcon() {
    await this.BetslipPageLocatorsRegistry.cashOutIcon.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.cashOutIcon);
  }

  async verifyWinBoostToolTip() { // Fixed casing
    await expect(this.BetslipPageLocatorsRegistry.winBoostToolTip).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.winBoostToolTip);
  }

  async verifyWinBoostValue() {
    await expect(this.BetslipPageLocatorsRegistry.winBoostValue).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.winBoostValue);
  }

  async verifyWinBoostInfoIcon() {
    await expect(this.BetslipPageLocatorsRegistry.winBoostInfoIcon).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.winBoostInfoIcon);
  }

  async verifyBetSaverText() {
    await expect(this.BetslipPageLocatorsRegistry.betSaverText).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.betSaverText);
  }

  async verifyTotalBetwayReturnMulti() {
    await expect(this.BetslipPageLocatorsRegistry.totalBetwayReturnMulti).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.totalBetwayReturnMulti);
  }

  async verifyTotalBetwayReturnSingle() {
    await expect(this.BetslipPageLocatorsRegistry.totalBetwayReturnSingle).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.totalBetwayReturnSingle);
  }

  async verifyPotentialReturnSingle() {
    await expect(this.BetslipPageLocatorsRegistry.potentialReturnSingle).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.potentialReturnSingle);
  }

  async verifyPotentialReturnMulti() {
    await expect(this.BetslipPageLocatorsRegistry.potentialReturnMulti).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.potentialReturnMulti);
  }

  async verifyEmptyBetslipMessage() {
    await this.BetslipPageLocatorsRegistry.emptyBetslipMessage.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.emptyBetslipMessage);
  }

  async verifySimpleViewToggle() {
    await this.BetslipPageLocatorsRegistry.simpleViewToggle.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.simpleViewToggle);
  }

  // --- NEW VERIFICATION METHODS ---
  async verifySettingsButtonVisible() {
    await expect(this.BetslipPageLocatorsRegistry.settingsButton).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.settingsButton);
  }

  async verifyAcceptOddsToggleVisible() {
    await expect(this.BetslipPageLocatorsRegistry.acceptOddsToggle).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.acceptOddsToggle);
  }

  async verifyKeepBetsToggleVisible() {
    await expect(this.BetslipPageLocatorsRegistry.keepBetsToggle).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.keepBetsToggle);
  }

  async verifyContinueButtonVisible() {
    await expect(this.BetslipPageLocatorsRegistry.continueButton).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.continueButton);
  }

  async verifyCloseIconVisible() {
    await expect(this.BetslipPageLocatorsRegistry.closeIcon).toBeVisible();
    await highlightElementBorder(this.BetslipPageLocatorsRegistry.closeIcon);
  }

  async verifyCashBtnSingleNotVisible() {
    await expect(this.BetslipPageLocatorsRegistry.cashBtnSingle).toHaveCount(0);
  }

  async verifyFreebetBtnSingleNotVisible() {
    await expect(this.BetslipPageLocatorsRegistry.freebetBtnSingle).toHaveCount(0);
  }

  async verifyBetSaverTextVisible() {
    await this.BetslipPageLocatorsRegistry.betSaverText.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000); // Allow for scroll
    await expect(this.BetslipPageLocatorsRegistry.betSaverText).toBeVisible();
    await highlightElements(this.BetslipPageLocatorsRegistry.betSaverText);
  }

  // Click Methods
  async clickBetslipButton() {
    await this.BetslipPageLocatorsRegistry.betslipButton.click();
  }

  async clickSingleTab() {
    await this.BetslipPageLocatorsRegistry.singleTab.click();
  }

  async clickMultiTab() {
    await this.BetslipPageLocatorsRegistry.multiTab.click();
  }

  async clickSettingsButton() {
    await this.BetslipPageLocatorsRegistry.settingsButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickAcceptOddsToggle() {
    await this.BetslipPageLocatorsRegistry.acceptOddsToggle.click();
  }

  async clickKeepBetsToggle() {
    await this.BetslipPageLocatorsRegistry.keepBetsToggle.click();
  }

  async clickContinueButton() {
    await this.BetslipPageLocatorsRegistry.continueButton.click();
  }

  async clickCloseIcon() {
    await this.BetslipPageLocatorsRegistry.closeIcon.click();
  }

  async clickDeleteIcon() {
    await this.BetslipPageLocatorsRegistry.deleteIcon.click();
  }

  async clickSelectAllCheckbox() {
    await this.BetslipPageLocatorsRegistry.selectAllCheckbox.click();
  }

  async clickRemoveLegIcon() {
    await this.BetslipPageLocatorsRegistry.removeLegIcon.click();
  }

  async clickBetNowBtn() {
    await this.BetslipPageLocatorsRegistry.betNowBtn.click();
  }

  async clickShareBtn() {
    await this.BetslipPageLocatorsRegistry.shareBtn.click();
  }

  async clickCashBtnSingle() {
    await this.BetslipPageLocatorsRegistry.cashBtnSingle.click();
  }

  async clickFreebetBtnSingle() {
    await this.BetslipPageLocatorsRegistry.freebetBtnSingle.click();
  }

  async clickCashBtnMulti() {
    await this.BetslipPageLocatorsRegistry.cashBtnMulti.click();
  }

  async clickFreebetBtnMulti() {
    await this.BetslipPageLocatorsRegistry.freebetBtnMulti.click();
  }

  async clickTotalBetwayReturnSingle() {
    await this.BetslipPageLocatorsRegistry.totalBetwayReturnSingle.click();
  }

  async clickTotalBetwayReturnMulti() {
    await this.BetslipPageLocatorsRegistry.totalBetwayReturnMulti.click();
  }

  async clickFirstMatchOdds() {
    await this.BetslipPageLocatorsRegistry.firstMatchOdds.click();
  }

  async clickSecondMatchOdds() {
    await this.BetslipPageLocatorsRegistry.secondMatchOdds.click();
  }

  async clickThirdMatchOdds() {
    await this.BetslipPageLocatorsRegistry.thirdMatchOdds.click();
  }

  async clickLoadButton() {
    await this.BetslipPageLocatorsRegistry.loadButton.click();
  }

  async clickSimpleViewToggle() {
    await this.BetslipPageLocatorsRegistry.simpleViewToggle.click();
  }

  async clickBetslipCloseBtn() {
    await this.BetslipPageLocatorsRegistry.betslipCloseBtn.click();
  }

  // --- NEW CLICK/ACTION METHODS ---
  async clickWinBoostInfoIcon() {
    await this.BetslipPageLocatorsRegistry.winBoostInfoIcon.click();
  }

  async clickLoginBtnBetslip() {
    const loginBtn = this.BetslipPageLocatorsRegistry.loginBtnBetslip.getByRole('button', { name: 'Login' });
    await loginBtn.click();
  }

  // Input Methods
  async enterBetAmount(amount: string) {
    await this.BetslipPageLocatorsRegistry.betAmountInput.fill(amount);
  }

  async enterBookingCode(code: string) {
    await this.BetslipPageLocatorsRegistry.bookingCodeInput.fill(code);
  }

  // --- NEW ACTION METHODS ---
  async checkSelectAllCheckbox() {
    await this.BetslipPageLocatorsRegistry.selectAllCheckbox.check();
  }

  async uncheckSelectAllCheckbox() {
    await this.BetslipPageLocatorsRegistry.selectAllCheckbox.uncheck();
  }

  // Combined Actions for Tests
  async verifyBetslipSection() {
    await this.verifyBetslipButton();
    await this.clickBetslipButton();
    await this.verifySingleTab();
    await this.verifyMultiTab();
    await this.verifyWarningText();
    await this.verifyBookingCodeInput();
    await this.verifyLoadButton();
  }

  async verifyBetslipSettingsSection() {
    await this.clickBetslipButton();
    await this.clickSettingsButton();
    await this.verifySettingsText();
    await this.verifyAcceptOddsToggle();
    await this.verifyKeepBetsToggle();
    // await this.clickAcceptOddsToggle();
  }

  async verifyAndTestInvalidInput(value: string) {
    // This method was in the original, but T25 implemented its own logic.
    // I've created a new method below for T25.
    await this.verifyBetAmountInput();
    for (const char of value) {
      await this.BetslipPageLocatorsRegistry.betAmountInput.type(char);
    }
    const currentValue = await this.BetslipPageLocatorsRegistry.betAmountInput.inputValue();
    expect(/^\d*\.?\d*$/.test(currentValue)).toBeTruthy();
  }

  // --- NEW COMBINED ACTION for T25 ---
  async validateInvalidBetAmountInput(input: string) {
    await this.BetslipPageLocatorsRegistry.betAmountInput.fill(''); // Clear
    await this.BetslipPageLocatorsRegistry.betAmountInput.type(input);
    const enteredValue = await this.BetslipPageLocatorsRegistry.betAmountInput.inputValue();

    // The original test threw an error, which is a good pattern for tests
    if (enteredValue === input) {
      throw new Error(`❌ Invalid input '${input}' was accepted in Bet Wager field.`);
    }
    // Alternate assertion style:
    // expect(enteredValue).not.toBe(input);
  }

  async verifyWinBoostCalculation() {
    await this.enterBetAmount('1');
    await this.verifyWinBoostValue();
  }

  async verifyPotentialReturnsSingle() {
    await this.verifyTotalBetwayReturnSingle();
    await this.clickTotalBetwayReturnSingle();
    await this.verifyPotentialReturnSingle();
  }

  async verifyPotentialReturnsMulti() {
    await this.clickMultiTab();
    await this.verifyTotalBetwayReturnMulti();
    await this.clickTotalBetwayReturnMulti();
    await this.verifyPotentialReturnMulti();
  }

  async addSingleBetToSlip() {
    await this.goto();
    await this.clickFirstMatchOdds();
    await this.page.waitForTimeout(1000);
  }

  async addMultipleBetsToSlip() {
    await this.goto();
    await this.clickFirstMatchOdds();
    await this.page.waitForTimeout(500);
    await this.clickSecondMatchOdds();
    await this.page.waitForTimeout(500);
    await this.clickThirdMatchOdds();
    await this.page.waitForTimeout(1000);
  }

  async verifyAndToggleSettings() {
    await this.clickSettingsButton();
    await this.verifySettingsText();
    await this.verifyAcceptOddsToggle();
    await this.verifyKeepBetsToggle();
    await this.clickAcceptOddsToggle();
    await this.page.waitForTimeout(500);
    await this.clickKeepBetsToggle();
    await this.page.waitForTimeout(500);
    await this.clickContinueButton();
  }

  async verifyBetslipWithSingleBet() {
    await this.clickBetslipButton();
    await this.verifySingleTab();
    await this.verifyBetAmountInput();
    await this.verifyRemoveLegIcon();
  }

  async verifyBetslipWithMultipleBets() {
    await this.clickBetslipButton();
    await this.clickMultiTab();
    await this.verifyMultiTab();
    await this.verifyBetAmountInput();
    await this.verifyDeleteIcon();
    await this.verifySelectAllCheckbox();
  }

  async verifyAndClickLoginFromBetslip() {
    await this.clickBetslipButton();
    await this.verifyLoginBtnBetslip();
    await this.clickLoginBtnBetslip(); // Using new dedicated click method
  }

  async verifyBetNowButton() {
    await this.clickBetslipButton();
    await this.enterBetAmount('10');
    await this.verifyBetNowBtn();
  }

  async verifyShareButton() {
    await this.clickBetslipButton();
    await this.verifyShareBtn();
  }

  async verifyCashAndFreebetTabsSingle() {
    await this.clickBetslipButton();
    await this.verifyCashBtnSingle();
    await this.verifyFreebetBtnSingle();
  }

  async verifyCashAndFreebetTabsMulti() {
    await this.clickBetslipButton();
    await this.clickMultiTab();
    await this.verifyCashBtnMulti();
    await this.verifyFreebetBtnMulti();
  }

  async verifyWinBoostSection() {
    await this.clickBetslipButton();
    await this.clickMultiTab();
    await this.verifyWinBoostToolTip();
    await this.verifyWinBoostInfoIcon();
    await this.enterBetAmount('10');
    await this.verifyWinBoostValue();
  }

  async clearBetslip() {
    await this.clickBetslipButton();
    await this.clickDeleteIcon();
    await this.page.waitForTimeout(1000);
  }

  async closePromotionPopup(){
    await this.BetslipPageLocatorsRegistry.closePromotionPopup.click();
  }
}