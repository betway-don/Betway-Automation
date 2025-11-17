// import { headerLocators } from '../locators/headerLocators';
// import { HomePage } from './HomePage';

// const userData = require('../json-data/userData.json');

// export class HeaderPage extends HomePage {
//   page: import('@playwright/test').Page;

//   mobileNumber: ReturnType<import('@playwright/test').Page['getByText']>;
//   hamburgerMenu: ReturnType<import('@playwright/test').Page['locator']>;
//   closePromotionPopup: ReturnType<import('@playwright/test').Page['locator']>;

//   betwayTopLogo: ReturnType<import('@playwright/test').Page['locator']>;
//   loginButtonfromHamburger: ReturnType<import('@playwright/test').Page['getByRole']>;
//   signUpButtonfromHamburger: ReturnType<import('@playwright/test').Page['getByRole']>;
//   closeHamburgerMenu: ReturnType<import('@playwright/test').Page['locator']>;
//   quickLinks: ReturnType<import('@playwright/test').Page['getByText']>;
//   betingRules: ReturnType<import('@playwright/test').Page['getByText']>;
//   statistics: ReturnType<import('@playwright/test').Page['getByText']>;
//   oddsFormat: ReturnType<import('@playwright/test').Page['getByText']>;
//   countryCode: ReturnType<import('@playwright/test').Page['getByText']>;
//   mobileNumberInput: ReturnType<import('@playwright/test').Page['locator']>;
//   passwordInput: ReturnType<import('@playwright/test').Page['locator']>;
//   eyeButton: ReturnType<import('@playwright/test').Page['locator']>;
//   forgetPasswordLink: ReturnType<import('@playwright/test').Page['getByText']>;
//   betslipButton: ReturnType<import('@playwright/test').Page['getByText']>;
//   gotItButton: ReturnType<import('@playwright/test').Page['getByText']>;
//   myAccount: ReturnType<import('@playwright/test').Page['getByText']>;

//   depositFund: ReturnType<import('@playwright/test').Page['getByText']>;
//   withdrawFund: ReturnType<import('@playwright/test').Page['getByText']>;
//   closeWithdrawalAlert: ReturnType<import('@playwright/test').Page['locator']>;
//   myBets: ReturnType<import('@playwright/test').Page['locator']>;
//   MyCasinoBigWin: ReturnType<import('@playwright/test').Page['locator']>;
//   bonusSummary: ReturnType<import('@playwright/test').Page['getByText']>;
//   transactionsHistory: ReturnType<import('@playwright/test').Page['getByText']>;
//   myCoupons: ReturnType<import('@playwright/test').Page['getByText']>;
//   betInfluencer: ReturnType<import('@playwright/test').Page['getByText']>;
//   promoVouchers: ReturnType<import('@playwright/test').Page['getByText']>;
//   updateDetails: ReturnType<import('@playwright/test').Page['getByText']>;
//   responsibleGaming: ReturnType<import('@playwright/test').Page['locator']>;
//   documentVerification: ReturnType<import('@playwright/test').Page['getByText']>;
//   betwayBenefits: ReturnType<import('@playwright/test').Page['locator']>;
//   betwayRewards: ReturnType<import('@playwright/test').Page['locator']>;
//   changePassword: ReturnType<import('@playwright/test').Page['locator']>;
//   logOut: ReturnType<import('@playwright/test').Page['locator']>;

//   closeMyAccountOptions: ReturnType<import('@playwright/test').Page['locator']>;
//   eyeButton2: ReturnType<import('@playwright/test').Page['locator']>;
//   accountsButton: ReturnType<import('@playwright/test').Page['locator']>;
//   balanceContainer: ReturnType<import('@playwright/test').Page['getByRole']>;
//   balanceLabel: ReturnType<import('@playwright/test').Page['getByText']>;
//   balanceValue: ReturnType<import('@playwright/test').Page['locator']>;
//   balanceCurrency: ReturnType<import('@playwright/test').Page['getByText']>;
//   balanceDropdown: ReturnType<import('@playwright/test').Page['locator']>;
//   freeBetRefreshBtn: ReturnType<import('@playwright/test').Page['locator']>;
//   freebetField: ReturnType<import('@playwright/test').Page['getByText']>;
//   freebetCurrency: ReturnType<import('@playwright/test').Page['getByText']>;

//   casinoBonusField: ReturnType<import('@playwright/test').Page['getByText']>;
//   casinoBonusAmount: ReturnType<import('@playwright/test').Page['getByText']>;
//   casinoCurrency: ReturnType<import('@playwright/test').Page['getByText']>;
//   casinoRefreshBtn: ReturnType<import('@playwright/test').Page['locator']>; 
//   depositButton: ReturnType<import('@playwright/test').Page['getByRole']>;
//   notificationBellIcon: ReturnType<import('@playwright/test').Page['locator']>;
//   liveChatIcon: ReturnType<import('@playwright/test').Page['locator']>; 

//   constructor(page: import('@playwright/test').Page) {
//     super(page);
//     this.page = page;
//     this.mobileNumber = page.getByText(headerLocators.mobileInput2.options.name).nth(headerLocators.mobileInput2.nth || 0);
//     this.hamburgerMenu = page.locator(headerLocators.hamburgerMenu.selector);
//     this.closePromotionPopup = page.locator(headerLocators.closePromotionPopup.selector);

//     this.betwayTopLogo = this.hamburgerMenu.locator('..').getByRole('link').last();
//     this.signUpButtonfromHamburger = page.getByRole('button', headerLocators.signUpButtonfromHamburger.options).nth(headerLocators.signUpButtonfromHamburger.nth);
//     this.loginButtonfromHamburger = page.getByRole('button', headerLocators.loginButtonfromHamburger.options).nth(headerLocators.loginButtonfromHamburger.nth);
//     this.closeHamburgerMenu = page.locator(headerLocators.closeHamburgerMenu.selector);
//     this.quickLinks = page.getByText(headerLocators.quickLinks.options.name);
//     this.betingRules = page.getByText(headerLocators.bettingRules.options.name);
//     this.statistics = page.getByText(headerLocators.statistics.options.name);
//     this.oddsFormat = page.getByText(headerLocators.oddsFormat.options.name);
//     this.countryCode = page.getByText(headerLocators.countryCode.options.name);
//     this.mobileNumberInput = page.locator(headerLocators.usernameInput.selector);
//     this.passwordInput = page.locator(headerLocators.passwordInput.selector);
//     this.eyeButton = page.locator(`xpath=//*[local-name()="${headerLocators.eyeButton.options.tag}" and namespace-uri()="${headerLocators.eyeButton.options.namespace}"]`).nth(headerLocators.eyeButton.nth);
//     this.forgetPasswordLink = page.getByText(headerLocators.forgetPasswordLink.options.name);
//     this.betslipButton = page.getByText(headerLocators.betslipButton.text);
//     this.gotItButton = page.getByText(headerLocators.gotItButton.options.name).nth(headerLocators.gotItButton.nth);
//     this.myAccount = page.getByText(headerLocators.myAccount.options.name).nth(0);

//     this.depositFund = page.getByText(headerLocators.depositFund.options.name);
//     this.withdrawFund = page.getByText(headerLocators.withdrawFund.options.name);
//     this.closeWithdrawalAlert = page.locator(headerLocators.closeWithdrawalAlert.selector).nth(headerLocators.closeWithdrawalAlert.nth);
//     this.myBets = page.locator(headerLocators.myBets.selector);
//     this.MyCasinoBigWin = page.locator(headerLocators.MyCasinoBigWun.selector);
//     this.bonusSummary = page.getByText(headerLocators.bonusSummary.options.name);
//     this.transactionsHistory = page.getByText(headerLocators.transactionsHistory.options.name);
//     this.myCoupons = page.getByText(headerLocators.myCoupons.options.name);
//     this.betInfluencer = page.getByText(headerLocators.betInfluencer.options.name);
//     this.promoVouchers = page.getByText(headerLocators.promoVouchers.options.name);
//     this.updateDetails = page.getByText(headerLocators.updateDetails.options.name);
//     this.responsibleGaming = page.locator(headerLocators.responsibleGaming.selector);
//     this.documentVerification = page.getByText(headerLocators.documentVerification.options.name);
//     this.betwayBenefits = page.locator(headerLocators.betwayBenefits.selector);
//     this.betwayRewards = page.locator(headerLocators.betwayRewards.selector);
//     this.changePassword = page.locator(headerLocators.changePassword.selector);
//     this.logOut = page.locator(headerLocators.logOut.selector);

//     this.closeMyAccountOptions = page.locator(headerLocators.closeMyAccountOptions.selector).nth(headerLocators.closeMyAccountOptions.nth);
//     this.eyeButton2 = page.getByText('All balance').locator('..').locator('..').getByRole('img').first();
//     this.accountsButton = page.locator(headerLocators.accountsButton.selector).nth(0);
//     this.balanceContainer = page.getByRole('banner').getByText('Balance').locator('..');
//     this.balanceLabel = this.balanceContainer.getByText('Balance');

//     this.balanceValue = page.getByRole('banner').getByText('Balance').locator('..').locator('..').getByRole('generic').first();
//     this.balanceDropdown = page.locator('xpath=//*[@id="__nuxt"]/div/div/div[1]/header/div/div[2]/div/div[2]/div[2]');
//     this.balanceCurrency = this.balanceContainer.getByText('R');

//     this.freebetField = page.getByText(headerLocators.freebetField.text);
//     this.freebetCurrency = page.getByText('Freebet').locator('..').getByText('R').nth(1);
//     this.freeBetRefreshBtn = headerLocators.freeBetRefreshBtn.selector(page);

//     this.casinoBonusField = page.getByText(headerLocators.casinoBonusField.options.name);
//     this.casinoBonusAmount = page.getByText(headerLocators.casinoBonusAmount.options.name).nth(0);
//     this.casinoCurrency = page.getByText('Casino Bonus').locator('..').getByText('R');
//     this.casinoRefreshBtn = headerLocators.casinoRefreshBtn.selector(page);
//     this.depositButton = page.getByRole('button', headerLocators.depositButton.options).nth(1);
//     this.notificationBellIcon = page.getByRole('banner').getByRole('img').nth(headerLocators.notificationIcon.nth);
//     this.liveChatIcon = page.locator(headerLocators.liveChatIcon.selector);
//   }

//   async goto() {
//     await this.page.goto('https://new.betway.co.za/sport/soccer');
//   }

//   async clickHamburgerMenu() {
//     await this.hamburgerMenu.click();
//   }

//   async clickquickLinks() {
//     await this.quickLinks.click();
//   }

//   async clickBettingRules() {
//     await this.betingRules.click();
//   }

//   async clickStatistics() {
//     await this.statistics.click();
//   }

//   async enterMobileNumber(mobile: string) {
//     await this.mobileNumberInput.fill(mobile);
//   }

//   async enterPassword(password: string) {
//     await this.passwordInput.fill(password);
//   }

//   async clickForgetPasswordLink() {
//     await this.forgetPasswordLink.click();
//   }

//   async clickBetslipButton() {
//     await this.betslipButton.click();
//   }

//   async clickGotItButton() {
//     await this.gotItButton.click();
//   }

//   async Login() {
//     await this.goto();
//     await this.mobileNumberInput.fill(`${userData.user4.mobile}`);
//     await this.passwordInput.fill(`${userData.user4.password}`);
//     await this.page.keyboard.press('Enter');
//     await this.closePromotionPopup.click();
//     await this.page.waitForLoadState('domcontentloaded')

//   }

//   async clickMyAccount() {
//     await this.myAccount.click();
//   }

//   async clickLogOut() {
//     await this.logOut.click();
//   }

//   async clickDepositFund() {
//     await this.depositFund.click();
//   }

//   async clickWithdrawFund() {
//     await this.withdrawFund.click();
//   }

//   async clickCloseWithdrawalAlert() {
//     await this.closeWithdrawalAlert.click();
//   }

//   async clickMyBets() {
//     await this.myBets.click();
//   }

//   async clickMyCasinoBigWin() {
//     await this.MyCasinoBigWin.click();
//   }

//   async clickBonusSummary() {
//     await this.bonusSummary.click();
//   }

//   async clickTransactionsHistory() {
//     await this.transactionsHistory.click();
//   }

//   async clickMyCoupons() {
//     await this.myCoupons.click();
//   }

//   async clickBetInfluencer() {
//     await this.betInfluencer.click();
//   }

//   async clickPromoVouchers() {
//     await this.promoVouchers.click();
//   }

//   async clickUpdateDetails() {
//     await this.updateDetails.click();
//   }
//   async clickResponsibleGaming() {
//     await this.responsibleGaming.click();
//   }

//   async clickDocumentVerification() {
//     await this.documentVerification.click();
//   }

//   async clickBetwayBenefits() {
//     await this.betwayBenefits.click();
//   }

//   async clickBetwayRewards() {
//     await this.betwayRewards.click();
//   }

//   async clickChangePassword() {
//     await this.changePassword.click();
//   }

//   async clickCloseMyAccountOptions() {
//     await this.closeMyAccountOptions.click();
//   }

//   async clickEyeButton2() {
//     await this.eyeButton2.click();
//   }

//   async clickAccountsButton() {
//     await this.accountsButton.click();
//   }

//   async clickbalanceDropdown() {
//     await this.balanceDropdown.click();
//   }

//   async clickDepositButton() {
//     await this.depositButton.click();
//   }

//   async clickNotificationBellIcon() {
//     await this.notificationBellIcon.click();
//   }

//   async clickLiveChatIcon() {
//     await this.liveChatIcon.click();
//   }

// }
import { HomePage } from './HomePage';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { expect } from '@playwright/test';
import { get } from 'http';

const userData = require('../json-data/userData.json');
// const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx";
const Locator_Url = "src/global/utils/file-utils/locators(1).xlsx"

export class HeaderPage extends HomePage {
  readonly HeaderPageLocatorsRegistry: Record<string, import('@playwright/test').Locator>;
  page: import('@playwright/test').Page;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.page = page;

    const configs = loadLocatorsFromExcel(Locator_Url, "HeaderPage");

    this.HeaderPageLocatorsRegistry = {
      betwayLogoHeader: getLocator(this.page, configs["betwayLogoHeader"]),
      mobileNumber: getLocator(this.page, configs["mobileNumber"]),
      closePromotionPopup: getLocator(this.page, configs["closePromotionPopup"]),
      hamburgerMenu: getLocator(this.page, configs["hamburgerMenu"]),
      loginButton: getLocator(this.page, configs["loginButton"]),
      loginButtonFromPopup: getLocator(this.page, configs["loginButtonFromPopup"]),
      loginButtonfromHamburger: getLocator(this.page, configs["loginButtonfromHamburger"]),
      signUpButton: getLocator(this.page, configs["signUpButton"]),
      signUpButtonfromHamburger: getLocator(this.page, configs["signUpButtonfromHamburger"]),
      closeHamburgerMenu: getLocator(this.page, configs["closeHamburgerMenu"]),
      quickLinks: getLocator(this.page, configs["quickLinks"]),
      myAccount: getLocator(this.page, configs["myAccount"]),
      bettingRules: getLocator(this.page, configs["bettingRules"]),
      statistics: getLocator(this.page, configs["statistics"]),
      oddsFormat: getLocator(this.page, configs["oddsFormat"]),
      // countryCode: getLocator(this.page, configs["countryCode"]),
      mobileNumberInput: getLocator(this.page, configs["mobileNumberInput"]),
      passwordInput: getLocator(this.page, configs["passwordInput"]),
      eyeButton: getLocator(this.page, configs["eyeButton"]),
      forgetPasswordLink: getLocator(this.page, configs["forgetPasswordLink"]),
      betslipButton: getLocator(this.page, configs["betslipButton"]),
      gotItButton: getLocator(this.page, configs["gotItButton"]),
      depositFund: getLocator(this.page, configs["depositFund"]),
      withdrawFund: getLocator(this.page, configs["withdrawFund"]),
      closeWithdrawalAlert: getLocator(this.page, configs["closeWithdrawalAlert"]),
      myBets: getLocator(this.page, configs["myBets"]),
      MyCasinoBigWin: getLocator(this.page, configs["MyCasinoBigWin"]),
      bonusSummary: getLocator(this.page, configs["bonusSummary"]),
      transactionsHistory: getLocator(this.page, configs["transactionsHistory"]),
      myCoupons: getLocator(this.page, configs["myCoupons"]),
      betInfluencer: getLocator(this.page, configs["betInfluencer"]),
      promoVouchers: getLocator(this.page, configs["promoVouchers"]),
      updateDetails: getLocator(this.page, configs["updateDetails"]),
      responsibleGaming: getLocator(this.page, configs["responsibleGaming"]),
      documentVerification: getLocator(this.page, configs["documentVerification"]),
      betwayBenefits: getLocator(this.page, configs["betwayBenefits"]),
      betwayRewards: getLocator(this.page, configs["betwayRewards"]),
      changePassword: getLocator(this.page, configs["changePassword"]),
      logOut: getLocator(this.page, configs["logOut"]),
      closeMyAccountOptions: getLocator(this.page, configs["closeMyAccountOptions"]),
      // eyeButton2: getLocator(this.page, configs["eyeButton2"]),
      accountsButton: getLocator(this.page, configs["accountsButton"]),
      balanceLabel: getLocator(this.page, configs["balanceLabel"]),
      balanceValue: getLocator(this.page, configs["balanceValue"]),
      balanceDropdown: getLocator(this.page, configs["balanceDropdown"]),
      balanceCurrency: getLocator(this.page, configs["balanceCurrency"]),
      freebetField: getLocator(this.page, configs["freebetField"]),
      freebetCurrency: getLocator(this.page, configs["freebetCurrency"]),
      // freeBetRefreshBtn: getLocator(this.page, configs["freeBetRefreshBtn"]),
      casinoBonusField: getLocator(this.page, configs["casinoBonusField"]),
      casinoBonusAmount: getLocator(this.page, configs["casinoBonusAmount"]),
      casinoCurrency: getLocator(this.page, configs["casinoCurrency"]),
      // casinoRefreshBtn: getLocator(this.page, configs["casinoRefreshBtn"]),
      depositButton: getLocator(this.page, configs["depositButton"]),
      notificationBellIcon: getLocator(this.page, configs["notificationBellIcon"]),
      allBalanceTxt: getLocator(this.page, configs["allBalanceTxt"]),
      liveChatIcon: getLocator(this.page, configs["liveChatIcon"]),
    };
  }

  // Navigation Methods
  async goto() {
    await this.page.goto('https://new.betway.co.za/sport/soccer');
  }

  // Verification Methods
  async verifyBetwayLogoHeader() {
    await this.HeaderPageLocatorsRegistry.betwayLogoHeader.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElements(this.HeaderPageLocatorsRegistry.betwayLogoHeader);
  }

  async verifyHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.hamburgerMenu.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.hamburgerMenu);
  }

  async verifyLoginAndSignUpButtons() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.loginButtonfromHamburger.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.loginButtonfromHamburger);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.signUpButtonfromHamburger);
  }

  async verifyQuickLinksDropdown() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.quickLinks.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.quickLinks);
  }

  async verifyBettingRulesOption() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.bettingRules.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules);
  }

  async verifyStatisticsOption() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
  }

  async verifyOddsFormat() {
    await this.clickHamburgerMenu();
    await highlightElements(this.HeaderPageLocatorsRegistry.oddsFormat);
  }

  async verifyMobileNumberField() {
    await this.HeaderPageLocatorsRegistry.mobileNumber.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.mobileNumberInput);
  }

  async verifyPasswordField() {
    await this.HeaderPageLocatorsRegistry.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.passwordInput);
  }

  // async verifyEyeButton() {
  //   await highlightElementBorder(this.HeaderPageLocatorsRegistry.eyeButton);
  //   await this.page.waitForTimeout(3000);
  // }

  async verifyEyeButton() {
  // Scope to the login form area that contains both Mobile Number and Password fields
  const formContainer = this.page.locator('form').filter({
    hasText: '+27Forgot Username?Forgot Password?'
  });

  // From within that form, target the eye SVG next to the password input
  const eyeIcon = formContainer.locator("//input[@id='header-password']/preceding-sibling::svg");

  // Wait for it and visually highlight
  await eyeIcon.waitFor({ state: 'visible', timeout: 10000 });
  await highlightElementBorder(eyeIcon);
  await this.page.waitForTimeout(1000);
}

  async verifyForgetPasswordLink() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.forgetPasswordLink);
    await this.page.waitForTimeout(300);
  }

  async verifyBetslipButton() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betslipButton);
  }

  async verifyMyAccountDropdown() {
    await this.Login();
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myAccount);
  }

  async verifyAllMyAccountOptions() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositFund);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.withdrawFund);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myBets);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.MyCasinoBigWin);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bonusSummary);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.transactionsHistory);

    await this.HeaderPageLocatorsRegistry.promoVouchers.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myCoupons);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betInfluencer);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.promoVouchers);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.updateDetails);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.responsibleGaming);

    await this.HeaderPageLocatorsRegistry.logOut.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.documentVerification);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayBenefits);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayRewards);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.changePassword);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.logOut);
  }

  async verifyEyeButton2() {
    await this.Login();
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.eyeButton2);
  }

  async verifyAccountsButton() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.accountsButton);
  }

  async verifyBalanceField() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceLabel);
  }

  async verifyBalanceCurrency() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceCurrency);
  }

  async verifyFreebetField() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceDropdown);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceContainer);
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.freebetField);
  }

  async verifyFreebetCurrency() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.freebetCurrency);
  }

  async verifyFreebetRefreshButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElements(this.HeaderPageLocatorsRegistry.freeBetRefreshBtn);
  }

  async verifyCasinoBonusField() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElements(this.HeaderPageLocatorsRegistry.casinoBonusField);
  }

  async verifyCasinoBonusCurrency() {
    await this.Login();
    await this.clickBalanceDropdown();
    await this.page.waitForTimeout(4000);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.casinoCurrency);
  }

  async verifyCasinoRefreshButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.casinoRefreshBtn);
  }

  async verifyDepositButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositButton);
  }

  async verifyNotificationBellIcon() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.notificationBellIcon);
  }

  async verifyChatIcon() {
    await this.Login();
    await this.clickGotItButton();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.liveChatIcon);
  }

  // Click Methods - Hamburger Menu
  async clickHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.hamburgerMenu.click();
  }

  async clickCloseHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.closeHamburgerMenu.click();
  }

  async clickQuickLinks() {
    await this.HeaderPageLocatorsRegistry.quickLinks.click();
  }

  async clickBettingRules() {
    await this.HeaderPageLocatorsRegistry.bettingRules.click();
  }

  async clickStatistics() {
    await this.HeaderPageLocatorsRegistry.statistics.click();
  }

  // Login Methods
  async enterMobileNumber(mobile: string) {
    await this.HeaderPageLocatorsRegistry.mobileNumberInput.fill(mobile);
  }

  async enterPassword(password: string) {
    await this.HeaderPageLocatorsRegistry.passwordInput.fill(password);
  }

  async clickForgetPasswordLink() {
    await this.HeaderPageLocatorsRegistry.forgetPasswordLink.click();
  }

  async Login() {
    await this.goto();
    await this.HeaderPageLocatorsRegistry.mobileNumberInput.fill(`${userData.user4.mobile}`);
    await this.HeaderPageLocatorsRegistry.passwordInput.fill(`${userData.user4.password}`);
    await this.page.keyboard.press('Enter');
    // await this.HeaderPageLocatorsRegistry.closePromotionPopup.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Betslip Methods
  async clickBetslipButton() {
    await this.HeaderPageLocatorsRegistry.betslipButton.click();
  }

  async clickGotItButton() {
    await this.HeaderPageLocatorsRegistry.gotItButton.click();
  }

  // My Account Methods
  async clickMyAccount() {
    await this.HeaderPageLocatorsRegistry.myAccount.click();
  }

  async clickLogOut() {
    await this.HeaderPageLocatorsRegistry.logOut.click();
  }

  async clickCloseMyAccountOptions() {
    await this.HeaderPageLocatorsRegistry.closeMyAccountOptions.click();
  }

  // Account Actions
  async clickDepositFund() {
    await this.HeaderPageLocatorsRegistry.depositFund.click();
  }

  async clickWithdrawFund() {
    await this.HeaderPageLocatorsRegistry.withdrawFund.click();
  }

  async clickCloseWithdrawalAlert() {
    await this.HeaderPageLocatorsRegistry.closeWithdrawalAlert.click();
  }

  async clickMyBets() {
    await this.HeaderPageLocatorsRegistry.myBets.click();
  }

  async clickMyCasinoBigWin() {
    await this.HeaderPageLocatorsRegistry.MyCasinoBigWin.click();
  }

  async clickBonusSummary() {
    await this.HeaderPageLocatorsRegistry.bonusSummary.click();
  }

  async clickTransactionsHistory() {
    await this.HeaderPageLocatorsRegistry.transactionsHistory.click();
  }

  async clickMyCoupons() {
    await this.HeaderPageLocatorsRegistry.myCoupons.click();
  }

  async clickBetInfluencer() {
    await this.HeaderPageLocatorsRegistry.betInfluencer.click();
  }

  async clickPromoVouchers() {
    await this.HeaderPageLocatorsRegistry.promoVouchers.click();
  }

  async clickUpdateDetails() {
    await this.HeaderPageLocatorsRegistry.updateDetails.click();
  }

  async clickResponsibleGaming() {
    await this.HeaderPageLocatorsRegistry.responsibleGaming.click();
  }

  async clickDocumentVerification() {
    await this.HeaderPageLocatorsRegistry.documentVerification.click();
  }

  async clickBetwayBenefits() {
    await this.HeaderPageLocatorsRegistry.betwayBenefits.click();
  }

  async clickBetwayRewards() {
    await this.HeaderPageLocatorsRegistry.betwayRewards.click();
  }

  async clickChangePassword() {
    await this.HeaderPageLocatorsRegistry.changePassword.click();
  }

  // Balance Methods
  async clickEyeButton2() {
    await this.HeaderPageLocatorsRegistry.eyeButton2.click();
  }

  async clickAccountsButton() {
    await this.HeaderPageLocatorsRegistry.accountsButton.click();
  }

  async clickBalanceDropdown() {
    await this.HeaderPageLocatorsRegistry.balanceDropdown.click();
  }

  async clickDepositButton() {
    await this.HeaderPageLocatorsRegistry.depositButton.click();
  }

  // Notification & Support Methods
  async clickNotificationBellIcon() {
    await this.HeaderPageLocatorsRegistry.notificationBellIcon.click();
  }

  async clickLiveChatIcon() {
    await this.HeaderPageLocatorsRegistry.liveChatIcon.click();
  }

  // Combined Actions for Tests
  async verifyAndClickQuickLinksDropdown() {
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.quickLinks);
    await this.clickQuickLinks();
  }

  async verifyAndClickBettingRules() {
    await this.HeaderPageLocatorsRegistry.bettingRules.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules);
    await this.clickBettingRules();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickBettingRulesWithoutLogin() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.bettingRules.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules);
    await this.clickBettingRules();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickStatistics() {
    // await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
    await this.clickStatistics();
    await this.page.waitForTimeout(4000);
  }

   async verifyAndClickStatisticsWithoutLogin() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
    await this.clickStatistics();
    await this.page.waitForTimeout(3000);
  }

  async verifyMobileNumberInput() {
    await expect(this.HeaderPageLocatorsRegistry.mobileNumberInput).toBeVisible();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.mobileNumberInput);
    await this.enterMobileNumber('123456789');
    await this.page.waitForTimeout(300);
  }

  async verifyPasswordInput() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.passwordInput);
    await this.enterPassword('12345678');
  }

  async verifyAndClickForgetPassword() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.forgetPasswordLink);
    await this.page.waitForTimeout(300);
    await this.clickForgetPasswordLink();
  }

  async verifyAndClickBetslip() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betslipButton);
    await this.clickBetslipButton();
  }

  async verifyAndClickMyAccount() {
    await this.Login();
    await this.page.waitForTimeout(3000);
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myAccount);
    await this.clickMyAccount();
  }

  async testDepositFund() {
    await this.clickHamburgerMenu();
    await this.clickDepositFund();
    await this.page.waitForTimeout(5000);
  }

  async testWithdrawFund() {
    await this.clickHamburgerMenu();
    await this.clickWithdrawFund();
    await this.page.waitForTimeout(3000);
    await this.clickCloseWithdrawalAlert();
  }

  async testMyBets() {
    await this.clickHamburgerMenu();
    await this.clickMyBets();
    await this.page.waitForTimeout(3000);
  }

  async testMyCasinoBigWin() {
    await this.clickHamburgerMenu();
    await this.clickMyCasinoBigWin();
  }

  async testBonusSummary() {
    await this.clickHamburgerMenu();
    await this.clickBonusSummary();
  }

  async testTransactionsHistory() {
    await this.clickHamburgerMenu();
    await this.clickTransactionsHistory();
    await this.page.waitForTimeout(3000);
  }

  async testMyCoupons() {
    await this.clickHamburgerMenu();
    await this.clickMyCoupons();
    await this.page.waitForTimeout(3000);
  }

  async testBetInfluencer() {
    await this.clickHamburgerMenu();
    await this.clickBetInfluencer();
    await this.page.waitForTimeout(3000);
  }

  async testPromoVouchers() {
    await this.clickHamburgerMenu();
    await this.clickPromoVouchers();
  }

  async testUpdateDetails() {
    await this.clickHamburgerMenu();
    await this.clickUpdateDetails();
  }

  async testResponsibleGaming() {
    await this.clickHamburgerMenu();
    await this.clickResponsibleGaming();
  }

  async testDocumentVerification() {
    await this.clickHamburgerMenu();
    await this.clickDocumentVerification();
    await this.page.waitForTimeout(3000);
  }

  async testBetwayBenefits() {
    await this.clickHamburgerMenu();
    await this.clickBetwayBenefits();
    await this.page.waitForTimeout(3000);
  }

  async testBetwayRewards() {
    await this.clickHamburgerMenu();
    await this.clickBetwayRewards();
    await this.page.waitForTimeout(3000);
  }

  async testChangePassword() {
    await this.clickHamburgerMenu();
    await this.clickChangePassword();
  }

  async testLogout() {
    await this.clickHamburgerMenu();
    await this.clickLogOut();
  }

  async verifyHamburgerEyeButton() {
    const hamburgerEyeButton = this.HeaderPageLocatorsRegistry.allBalanceTxt.locator('..').locator('..').getByRole('img').first();
    await highlightElementBorder(hamburgerEyeButton);
    await hamburgerEyeButton.click();
  }

  async verifyAndClickAccountsButton() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.accountsButton);
    await this.clickAccountsButton();
    await this.page.waitForTimeout(5000);
  }

  async verifyAndClickDepositButton() {
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositButton);
    await this.clickDepositButton();
    await this.page.waitForTimeout(5000);
  }

  async verifyAndClickNotificationIcon() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.notificationBellIcon);
    await this.HeaderPageLocatorsRegistry.notificationBellIcon.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickChatIcon() {
    await this.HeaderPageLocatorsRegistry.gotItButton.click();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.liveChatIcon);
    await this.clickLiveChatIcon();
    await this.page.waitForTimeout(5000);
  }
}