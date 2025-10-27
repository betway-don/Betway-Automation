import { Page, Locator } from '@playwright/test';
import { LocatorConfig as ExcelLocatorConfig } from '../file-utils/excelReader';

// Define HealedLocator type locally if not exported from excelReader
export type HealedLocator = {
  key: string;
  locator: string;
};
import { getLocator } from '../file-utils/locatorResolver';
import { updateLocatorMetadata } from './metadata';

const OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY ||
  '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';

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
    excelConfig: ExcelLocatorConfig,
    description: string,
    context: string,
    waitTimeout: number
  ): Promise<Locator> {
    const key = excelConfig.key ?? '';

    try {
      updateLocatorMetadata(key, excelConfig);
    } catch (e) {
      console.warn('Warning: could not update metadata from Excel config', e);
    }

    // Try Excel locator first
    try {
      console.log('Attempting to find element with config:', JSON.stringify(excelConfig, null, 2));
      const primaryLocator = getLocator(this.page, excelConfig);
      await primaryLocator.waitFor({ state: 'visible', timeout: waitTimeout });
      console.log(`✅ Excel locator (key=${key}) found and will be used.`);
      return primaryLocator;
    } catch (error) {
      console.log(`❌ Excel locator (key=${key}) failed. Error:`, error);
      console.log('Starting AI healing...');
    }

    // AI healing step
    const domInfo = await this.extractDOMInfo();
    const suggested = await this.getAISuggestion(description, context, domInfo);
    if (!suggested) throw new Error('AI could not suggest a locator');

    let locatorStr = suggested
      .replace(/```/g, '')
      .replace(/`/g, '')
      .replace(/^LOCATOR:\s*/i, '')
      .trim();

    locatorStr = locatorStr.split('\n')[0].trim();

    // Ensure valid locator syntax (Playwright safe)
    console.log('Trying AI suggested locator:', locatorStr);

    // If AI gives something like getByRole('textbox'...), we evaluate it properly
    let healedLocator: Locator;
    if (locatorStr.startsWith('getByRole')) {
      // Extract role and name safely
      const match = locatorStr.match(/getByRole\(['"]([^'"]+)['"],\s*\{[^}]*name:\s*['"]([^'"]+)['"]/i);
      if (match) {
        const role = match[1] as Parameters<Page['getByRole']>[0]; // Safe cast to Playwright RoleType
        const name = match[2];
        healedLocator = this.page.getByRole(role, { name });
      } else {
        throw new Error(`Invalid AI locator format: ${locatorStr}`);
      }
    } else if (locatorStr.startsWith('css=')) {
      healedLocator = this.page.locator(locatorStr.replace(/^css=/, ''));
    } else {
      healedLocator = this.page.locator(locatorStr);
    }

    await healedLocator.waitFor({ state: 'visible', timeout: waitTimeout });

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
            type: inputEl?.type || '',
            name: inputEl?.name || '',
            placeholder: inputEl?.placeholder || '',
            role: htmlEl.getAttribute('role') || '',
            ariaLabel: htmlEl.getAttribute('aria-label') || ''
          });
        }
      });

      return {
        url: window.location.href,
        title: document.title,
        elements
      };
    });

    return JSON.stringify(domData, null, 2);
  }

  private async getAISuggestion(
    description: string,
    context: string,
    domInfo: string
  ): Promise<string | null> {
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
1. Return ONLY the locator string.
2. Prefer getByRole with name and nth() when possible.
3. Fallback to CSS selectors if needed.
4. Do not include explanations or markdown.
LOCATOR:`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a Playwright expert. Return only the locator string.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', await response.text());
      return null;
    }

    const data = (await response.json()) as any;
    const locator = data?.choices?.[0]?.message?.content?.trim();
    return locator || null;
  }
}
