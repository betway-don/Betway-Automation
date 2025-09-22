// // utils/locatorLoader.ts
// import * as XLSX from 'xlsx';
// import * as path from 'path';
// // import data from '../'
// const projectRoot = path.resolve(__dirname, '../');

// type LocatorEntry = {
//   selector?: string;
//   options?: { name?: string };
//   nth?: number;
// };

// export function loadPageLocatorsFromExcel(
//   pageName: string,
//   region: string,
//   filePath = path.join(projectRoot, '/file-utils/homepage-locators.xlsx')
  
// ): Record<string, LocatorEntry> {
//   const workbook = XLSX.readFile(path.resolve(filePath));
//   const sheet = workbook.Sheets[region];

//   if (!sheet) {
//     throw new Error(`Sheet "${region}" not found`);
//   }

//   const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

//   const locators: Record<string, LocatorEntry> = {};

//   json.forEach((row) => {
//     if (row.page !== pageName) return;

//     const entry: LocatorEntry = {
//       ...(row.selector && { selector: row.selector }),
//       ...(row.options_name && { options: { name: row.options_name } }),
//       ...(row.nth !== undefined && row.nth !== '' && { nth: Number(row.nth) }),
//     };

//     locators[row.name] = entry;
//   });

//   return locators;
// }
