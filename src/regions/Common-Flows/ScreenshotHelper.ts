export async function ScreenshotHelper(page: import('@playwright/test').Page, screenshotDir: string, testId: string, testInfo: any) {
    const screenshotPath = `${screenshotDir}/${testId}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`${testId}`, { 
        path: screenshotPath ,
        contentType: 'image/png'
    });
}