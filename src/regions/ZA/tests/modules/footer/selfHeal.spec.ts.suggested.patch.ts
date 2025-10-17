const loginLocator = page.locator('button[aria-label="Login"]'); // Updated to use aria-label for better targeting
await loginLocator.waitFor({state:'visible',timeout:4000});