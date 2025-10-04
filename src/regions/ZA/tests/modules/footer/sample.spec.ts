// import { test, expect } from "@playwright/test";
import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log, time } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { ContactUsPage } from '../../../pages/ContactUsPage';
import { TIMEOUT } from 'dns';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/footer');
import { loadLocatorsFromExcel } from "./excelReader";
import { getLocator } from "./locatorResolver";

const locators = loadLocatorsFromExcel("./src/regions/ZA/tests/modules/footer/locators.xlsx", "Sheet1");

test("Verify Summary Button", async ({ homePage },testInfo) => {
  await homePage.page.goto("https://new.betway.co.za");
  const contactUsPage = new ContactUsPage(homePage.page);
  

  const abc=getLocator(contactUsPage.page, locators["X"]);
  const summaryBtn = getLocator(homePage.page, locators["betwayLogo"]);
  
  console.log("Summary Button Locator:", summaryBtn);
  console.log("Locator Details:", abc);
  await highlightElementBorder(summaryBtn);
  await ScreenshotHelper(homePage.page, screenshotDir, "HomePage_BetwayLogo",testInfo);

  // await expect(homePage.page).toHaveURL(/.*summary/);
});
