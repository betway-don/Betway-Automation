// utils/excelReader.ts
import * as XLSX from "xlsx";

export type LocatorConfig = {
  key: string;
  type: "css" | "role" | "text" | "xpath";
  value: string;
  options?: Record<string, any>;
  nth?: number;
};

export function loadLocatorsFromExcel(filePath: string, sheetName: string): Record<string, LocatorConfig> {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  const rows: LocatorConfig[] = XLSX.utils.sheet_to_json(sheet);

  const locators: Record<string, LocatorConfig> = {};

  rows.forEach((row) => {
    locators[row.key] = {
      key: row.key,
      type: row.type,
      value: row.value,
      options: row.options ? JSON.parse(row.options) : {},
      nth: row.nth !== undefined ? Number(row.nth) : undefined,
    };
  });

  return locators;
}
