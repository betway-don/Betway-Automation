import { Page, Locator } from '@playwright/test';
import { LocatorConfig, HealedLocator } from './types';
import { getLocator } from '../file-utils/locatorResolver';
import { updateLocatorMetadata } from './metadata';

const OPENROUTER_API_KEY = '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'

/**
 * SelfHealingLocator class:
 * - tries a locator from excel (resolved by getLocator)
 * - if it fails, asks AI for a locator, validates it, records healed locators and updates metadata
 */
export class SelfHealingLocator {
  private page: Page;
  private healedLocators: HealedLocator[] = [];

  constructor(page: Page) {
    this.page = page;
  }

  getHealedLocators(): HealedLocator[] {
    return this.healedLocators;
  }

  async findByExcelConfig(
    excelConfig: LocatorConfig,
    description: string,
    context: string,
    waitTimeout: number
  ): Promise<Locator> {
    // Update metadata first with the Excel config
    try {
      updateLocatorMetadata(excelConfig.key, excelConfig);
    } catch (e) {
      console.warn('Warning: could not update metadata from Excel config', e);
    }

    // try primary locator
    try {
      console.log('Attempting to find element with config:', JSON.stringify(excelConfig, null, 2));
      const primaryLocator = getLocator(this.page, excelConfig);
      await primaryLocator.waitFor({ state: 'visible', timeout: 10000 });
      console.log(`✅ Excel locator (key=${excelConfig.key}) found and will be used.`);
      return primaryLocator;
    } catch (error) {
      console.log(`❌ Excel locator (key=${excelConfig.key}) failed. Error:`, error);
      console.log('Starting AI healing...');
    }

    // AI healing
    const domInfo = await this.extractDOMInfo();
    const suggested = await this.getAISuggestion(description, context, domInfo);
    if (!suggested) throw new Error('AI could not suggest a locator');

    let locatorStr = suggested.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();
    locatorStr = locatorStr.split('\n')[0].trim();

    // validate suggested locator
    console.log('Trying AI suggested locator:', locatorStr);
    const healedLocator = this.page.locator(locatorStr);
    await healedLocator.waitFor({ state: 'visible', timeout: 10000 });

    const key = excelConfig.key || `ai_${Date.now()}`;
    this.healedLocators.push({ key, locator: locatorStr });

    console.log(`✅ Healed locator for ${key}: ${locatorStr}`);
    return healedLocator;
  }

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

  private async getAISuggestion(description: string, context: string, domInfo: string): Promise<string | null> {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set in environment');
    }

    const prompt = `You are a Playwright automation expert. Find the best locator for this element.
 
ELEMENT DESCRIPTION:
${description}
 
CONTEXT:
${context}
 
PAGE DOM:
${domInfo}
 
RULES:
1. Return ONLY the locator string, nothing else
2. Use these strategies in order of preference:
   a. Unique ID if available
   b. Precise getByRole with name/label and index if needed
   c. Precise CSS with multiple attributes to ensure uniqueness
3. If multiple similar elements exist, use these techniques to be specific:
   - For getByRole, add index: getByRole('button', { name: 'Login' }).nth(0)
   - Use parent elements or nearby text to narrow down
   - Combine multiple attributes: button[id='login-btn'][aria-label='Login']
4. ALWAYS check if your selector might match multiple elements
5. If context mentions specific instance (like "first", "nth=0"), use appropriate nth() selector
6. Prefer exact matches over partial matches

IMPORTANT: The context provided describes which specific instance is needed. Use this information to select the correct element when multiple similar elements exist.
 
LOCATOR:`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a Playwright expert. Return only the locator string.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error('AI API error:', txt);
      return null;
    }

    const data: any = await response.json();
    let locator = data.choices?.[0]?.message?.content?.trim();
    if (!locator) return null;
    locator = locator.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();
    return locator;
  }
}