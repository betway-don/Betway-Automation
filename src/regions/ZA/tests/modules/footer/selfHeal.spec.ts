import { test } from '@playwright/test';
import { loadLocatorsFromExcel } from '../../../../../global/utils/file-utils/excelReader';
import { SelfHealingLocator } from '../../../../../global/utils/locators/healing';
import { batchUpdateLocatorsInWorkbook } from '../../../../../global/utils/locators/excel';
import { getLocatorMetadata, updateLocatorMetadata } from '../../../../../global/utils/locators/metadata';

// Config
const APP_URL = 'https://new.betway.co.za/sport';
const USER_MOBILE = '713533467';
const USER_PASSWORD = '12345';
const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locatorsDemo.xlsx";
const SHEET_NAME = "SampleDemoSheet";

test('AI Healing Demo - Replace changed locators in batch at end', async ({ page }) => {
    test.setTimeout(120000);

    const configs = loadLocatorsFromExcel(LOCATOR_URL, SHEET_NAME);
    if (configs['passwordInput']) {
        updateLocatorMetadata('passwordInput', configs['passwordInput']);
    }
    if (configs['mobileInput']) {
        updateLocatorMetadata('mobileInput', configs['mobileInput']);
    }
    const excelPasswordConfig = configs['passwordInput'];
    const excelMobileConfig = configs['mobileInput'];

    if (!excelPasswordConfig || !excelMobileConfig) {
        throw new Error('Required locators not found in Excel');
    }

    await page.goto(APP_URL);
    await page.waitForTimeout(2000);

    const healer = new SelfHealingLocator(page);

    // Mobile input
    const mobileMetadata = getLocatorMetadata('mobileInput');
    const mobileInput = await healer.findByExcelConfig(excelMobileConfig, mobileMetadata.description, mobileMetadata.context, 3000);
    await mobileInput.fill(USER_MOBILE);

    // Password input
    const passwordMetadata = getLocatorMetadata('passwordInput');
    const passwordField = await healer.findByExcelConfig(excelPasswordConfig, passwordMetadata.description, passwordMetadata.context, 3000);
    await passwordField.fill(USER_PASSWORD);
    await passwordField.press('Enter');

    // Batch update Excel if any locators were healed
    const healed = healer.getHealedLocators();
    if (healed.length > 0) {
        const saved = await batchUpdateLocatorsInWorkbook(LOCATOR_URL, SHEET_NAME, healed);
        console.log('Updated locators saved to:', saved);
    }
});