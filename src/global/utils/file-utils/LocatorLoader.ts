import * as XLSX from 'xlsx';
import path from 'path';

type LocatorEntry = {
  selector?: string;
  options?: { name?: string };
  nth?: number;
};

export function loadPageLocatorsFromExcel(
  pageName: string,
  region: string,
  filePath = './locators.xlsx'
): Record<string, LocatorEntry> {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[region];

  if (!sheet) throw new Error(`Sheet "${region}" not found in Excel`);

  const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
  const locators: Record<string, LocatorEntry> = {};

  jsonData.forEach(row => {
    if (row['page'] !== pageName) return;

    const name = row['name'];
    const selector = row['selector'];
    const optionsName = row['options_name'];
    const nth = row['nth'];

    locators[name] = {
      ...(selector && { selector }),
      ...(optionsName && { options: { name: optionsName } }),
      ...(nth !== undefined && nth !== '' && { nth: Number(nth) }),
    };
  });

  return locators;
}
