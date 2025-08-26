// const data = require('../ZA/json-data/oddsData.json')
export async function OddsSelection(numberOflegs: number, page: import('@playwright/test').Page,data:any) {
    for (let i = 0; i < numberOflegs; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;
        const knownOutcomeId = `${eventId}11`;
        const priceObj = data.prices?.find((p: any) => p.outcomeId === knownOutcomeId);
        if (!priceObj) continue;
        const oddValue = await page.locator(`//div[@id="${eventId}"]`).getByText(`${priceObj.priceDecimal}`, { exact: false }).first();
        await oddValue.click();
        await page.waitForTimeout(1000); // Optional: wait between clicks
    }
}