import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { isHttpUrl, updateGitHubFile } from './github';
import { HealedLocator } from './types';

export function guessLocatorType(locatorStr: string) {
  const s = String(locatorStr).trim();
  if (/^role=/i.test(s)) return { type: 'role', value: s.replace(/^role=/i, '') };
  if (/^xpath=/i.test(s)) return { type: 'xpath', value: s.replace(/^xpath=/i, '') };
  if (/^text=/i.test(s)) return { type: 'text', value: s.replace(/^text=/i, '') };
  return { type: 'css', value: s };
}

/**
 * Batch update healed locators into the given sheet.
 * If GITHUB_TOKEN is present and the source is a GitHub raw URL, attempt to PUT the file.
 * Otherwise save 'locators-updated.xlsx' locally.
 */
export async function batchUpdateLocatorsInWorkbook(
  source: string,
  sheetName: string,
  updates: HealedLocator[]
): Promise<string> {
  if (!updates || updates.length === 0) {
    throw new Error('No updates provided');
  }

  const norm = (s: any) => (s === undefined || s === null) ? '' : String(s).trim().toLowerCase();

  // Read workbook (remote or local)
  let workbook: XLSX.WorkBook;
  if (isHttpUrl(source)) {
    const resp = await fetch(source);
    if (!resp.ok) {
      throw new Error(`Failed to download remote locator file: ${resp.status} ${resp.statusText}`);
    }
    const buffer = Buffer.from(await resp.arrayBuffer());
    workbook = XLSX.read(buffer, { type: 'buffer' });
  } else {
    if (!fs.existsSync(source)) {
      throw new Error(`Local locator file not found: ${source}`);
    }
    workbook = XLSX.readFile(source);
  }

  // Read or create rows
  let rows: any[] = [];
  if (workbook.Sheets[sheetName]) {
    rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }) as any[];
  }

  // Apply updates by matching 'key' (support common header names)
  const possibleKeyNames = ['key', 'Key', 'KEY', 'locatorKey', 'locator_key', 'name', 'id', 'locator', 'value'];

  function findRowKeyAndName(row: any): { foundName?: string; foundValue?: string } {
    for (const candidate of possibleKeyNames) {
      if (Object.prototype.hasOwnProperty.call(row, candidate) && row[candidate] !== undefined && row[candidate] !== '') {
        return { foundName: candidate, foundValue: String(row[candidate]) };
      }
    }
    for (const header of Object.keys(row)) {
      if (norm(header) === 'key' && row[header] !== undefined && row[header] !== '') {
        return { foundName: header, foundValue: String(row[header]) };
      }
    }
    return {};
  }

  updates.forEach(({ key, locator }) => {
    const keyNormalized = norm(key);
    let matchedIdx = -1;
    let matchedKeyName: string | undefined;

    for (let i = 0; i < rows.length; i++) {
      const { foundName, foundValue } = findRowKeyAndName(rows[i]);
      if (foundName && norm(foundValue) === keyNormalized) {
        matchedIdx = i;
        matchedKeyName = foundName;
        break;
      }
    }

    const guessed = guessLocatorType(locator);

    const updatedRowFragment: any = {
      type: guessed.type,
      value: guessed.value,
      locator: guessed.value,
      healedAt: new Date().toISOString()
    };

    if (matchedIdx >= 0) {
      rows[matchedIdx] = Object.assign({}, rows[matchedIdx], updatedRowFragment);
      if (matchedKeyName) {
        rows[matchedIdx][matchedKeyName] = rows[matchedIdx][matchedKeyName] ?? key;
      }
    } else {
      const appendRow: any = Object.assign({}, updatedRowFragment, { key });
      if (rows.length > 0) {
        const firstRowKeyInfo = findRowKeyAndName(rows[0]);
        if (firstRowKeyInfo.foundName) {
          appendRow[firstRowKeyInfo.foundName] = key;
          delete appendRow.key;
        }
      }
      rows.push(appendRow);
    }
  });

  // Write back
  workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(rows);
  if (!workbook.SheetNames.includes(sheetName)) {
    workbook.SheetNames.push(sheetName);
  }

  const outBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  const githubToken = process.env.GITHUB_TOKEN;
  if (githubToken && isHttpUrl(source)) {
    try {
      const updatedPath = await updateGitHubFile(source, outBuffer, `chore: update healed locators (${updates.map(u => u.key).join(', ')})`, githubToken);
      return `github://${updatedPath}`;
    } catch (err) {
      // fallback to local save
      console.error('GitHub update failed, falling back to local save:', err);
    }
  }

  const outPath = path.join(process.cwd(), 'locators-updated.xlsx');
  fs.writeFileSync(outPath, outBuffer);
  return outPath;
}