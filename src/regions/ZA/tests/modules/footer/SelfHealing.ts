// ====================================
// SELF-HEALING LOCATOR CLASS
// - exposes findByExcelConfig which accepts an excel-style config object (with key,type,value,...).

import { Locator, Page } from "@playwright/test";

// - if primary (excel) locator fails, calls AI, validates suggested locator and updates excel sheet.
class SelfHealingLocator {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Try excel-style config first, then AI heal & persist change if needed.
   * excelConfig must at least include { key?: string, type?: string, value?: string, options?: any, nth?: number }
   */
  async findByExcelConfig(
    excelConfig: { key?: string; type?: string; value?: string; options?: any; nth?: number },
    description: string,
    context: string,
    excelSourceUrl: string,
    sheetName: string,
    waitTimeout: number = 10000
  ): Promise<Locator> {
    // first, try using getLocator (keeps same resolution logic as the rest of your suite)
    try {
      const primaryLocator = getLocator(this.page, {
        key: excelConfig.key,
        type: excelConfig.type as any,
        value: excelConfig.value as any,
        options: excelConfig.options,
        nth: excelConfig.nth
      } as any);
      // wait a small time only; if it exists we use it.
      await primaryLocator.waitFor({ state: 'visible', timeout: waitTimeout });
      console.log(`✅ Excel locator (key=${excelConfig.key}) found and will be used.`);
      return primaryLocator;
    } catch (err) {
      console.log(`❌ Excel locator (key=${excelConfig.key}) failed to find element. Starting AI healing...`);
    }

    // AI Healing flow
    const domInfo = await this.extractDOMInfo();
    const suggested = await this.getAISuggestion(description, context, domInfo);
    if (!suggested) {
      throw new Error('AI could not suggest a locator');
    }

    // Clean and pick the first sensible line
    let locatorStr = suggested.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();
    locatorStr = locatorStr.split('\n')[0].trim();

    // Validate AI suggestion
    try {
      const healedLocator = this.page.locator(locatorStr).first();
      await healedLocator.waitFor({ state: 'visible', timeout: 5000 });
      console.log(`✅ AI suggestion is valid: ${locatorStr}`);
      // Persist into workbook (update only the row with the excel key)
      try {
        const keyToUpdate = excelConfig.key || 'passwordInput';
        const savedPath = await updateLocatorInWorkbook(excelSourceUrl, sheetName, keyToUpdate, locatorStr);
        console.log(`💾 Updated locator saved to: ${savedPath}`);
        console.log('  (Note: remote URL cannot be overwritten anonymously — file saved locally. Commit & push to propagate.)');
      } catch (persistErr: any) {
        console.warn('⚠️ Could not persist healed locator:', persistErr?.message || persistErr);
      }
      return healedLocator;
    } catch (err) {
      console.error('❌ AI suggestion did not match any visible element on the page:', locatorStr);
      throw new Error('AI healing provided a locator but it did not match any visible element.');
    }
  }

  /**
   * Extract page DOM info (small snapshot) for AI.
   */
  private async extractDOMInfo(): Promise<string> {
    const domData = await this.page.evaluate(() => {
      const elements: Array<{
        tag: string;
        id: string;
        class: string;
        text: string;
        type: string;
        name: string;
        placeholder: string;
        role: string;
        ariaLabel: string;
      }> = [];

      const selectors = 'button, a, input, select, textarea, [role="button"]';
      const nodeList = document.querySelectorAll(selectors);

      nodeList.forEach((el, idx) => {
        if (idx < 50) {
          const htmlEl = el as HTMLElement;
          const inputEl = el as HTMLInputElement;
          elements.push({
            tag: htmlEl.tagName.toLowerCase(),
            id: htmlEl.id || '',
            class: htmlEl.className || '',
            text: (htmlEl.innerText || '').substring(0, 100),
            type: (inputEl && inputEl.type) || '',
            name: (inputEl && inputEl.name) || '',
            placeholder: (inputEl && inputEl.placeholder) || '',
            role: htmlEl.getAttribute('role') || '',
            ariaLabel: htmlEl.getAttribute('aria-label') || ''
          });
        }
      });

      return {
        url: window.location.href,
        title: document.title,
        elements: elements
      };
    });

    return JSON.stringify(domData, null, 2);
  }

  /**
   * Ask AI for a locator string using OpenRouter (same API call structure as before).
   */
  private async getAISuggestion(description: string, context: string, domInfo: string): Promise<string | null> {
    const prompt = `You are a Playwright automation expert. Find the best locator for this element.
 
ELEMENT DESCRIPTION:
${description}
 
CONTEXT:
${context}
 
PAGE DOM:
${domInfo}
 
RULES:
1. Return ONLY the locator string, nothing else
2. Priority: data-testid > role > placeholder > text > CSS
3. Use Playwright syntax like: role=button[name='Login'], input[name='mobile'], button:has-text('Login')
4. Must match exactly ONE element
 
LOCATOR:`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://playwright-demo',
          'X-Title': 'Playwright Self-Healing'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a Playwright expert. Return only the locator string.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        return null;
      }

      const data: any = await response.json();
      let locator = data.choices?.[0]?.message?.content?.trim();
      if (!locator) return null;

      // Clean response
      locator = locator.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();

      return locator;
    } catch (error: any) {
      console.error('AI API failed:', error.message || error);
      return null;
    }
  }
}
