import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import ExcelJS from "exceljs";

// ── Function Handlers ───────────────────────────────────────────────

const read: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const sheetName = opts.sheet ? String(opts.sheet) : undefined;

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = sheetName ? workbook.getWorksheet(sheetName) : workbook.worksheets[0];
  if (!sheet) throw new Error(`Sheet "${sheetName ?? "first"}" not found`);

  const rows: Record<string, unknown>[] = [];
  const headers: string[] = [];

  sheet.eachRow((row: any, rowNumber: any) => {
    if (rowNumber === 1 && opts.headers !== false) {
      row.eachCell((cell: any, colNumber: any) => { headers[colNumber - 1] = String(cell.value ?? `col${colNumber}`); });
    } else {
      const obj: Record<string, unknown> = {};
      row.eachCell((cell: any, colNumber: any) => {
        const key = headers[colNumber - 1] ?? `col${colNumber}`;
        obj[key] = cell.value;
      });
      rows.push(obj);
    }
  });

  return { rows, headers, sheetName: sheet.name, rowCount: rows.length };
};

const write: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "output.xlsx");
  const data = Array.isArray(args[1]) ? args[1] : [];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(String(opts.sheetName ?? "Sheet1"));

  if (data.length === 0) {
    await workbook.xlsx.writeFile(filePath);
    return { path: filePath, rows: 0 };
  }

  // Auto-detect headers from first row
  const headers = Object.keys(data[0] as Record<string, unknown>);
  sheet.columns = headers.map((h: any) => ({ header: h, key: h, width: Number(opts.colWidth ?? 15) }));

  // Style headers
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
  if (opts.headerColor) {
    headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: String(opts.headerColor).replace("#", "FF") } };
  }

  // Add data rows
  for (const row of data) {
    sheet.addRow(row as Record<string, unknown>);
  }

  // Auto-filter
  if (opts.autoFilter !== false) {
    sheet.autoFilter = { from: "A1", to: `${String.fromCharCode(64 + headers.length)}1` };
  }

  await workbook.xlsx.writeFile(filePath);
  return { path: filePath, rows: data.length, columns: headers.length };
};

const readSheetNames: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  return workbook.worksheets.map((s: any) => s.name);
};

const addSheet: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const sheetName = String(args[1] ?? "Sheet");
  const data = Array.isArray(args[2]) ? args[2] : [];

  const workbook = new ExcelJS.Workbook();
  try { await workbook.xlsx.readFile(filePath); } catch { /* new file */ }

  const sheet = workbook.addWorksheet(sheetName);
  if (data.length > 0) {
    const headers = Object.keys(data[0] as Record<string, unknown>);
    sheet.columns = headers.map((h: any) => ({ header: h, key: h, width: 15 }));
    sheet.getRow(1).font = { bold: true };
    for (const row of data) sheet.addRow(row as Record<string, unknown>);
  }

  await workbook.xlsx.writeFile(filePath);
  return { path: filePath, sheet: sheetName, rows: data.length };
};

const toJson: BuiltinHandler = async (args) => {
  const result = await read(args) as { rows: Record<string, unknown>[] };
  return result.rows;
};

const fromJson: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "output.xlsx");
  const jsonData = args[1];
  const data = Array.isArray(jsonData) ? jsonData : typeof jsonData === "string" ? JSON.parse(jsonData) : [jsonData];
  return await write([filePath, data]);
};

const toCsv: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const result = await read([filePath]) as { rows: Record<string, unknown>[]; headers: string[] };

  const csvLines = [result.headers.join(",")];
  for (const row of result.rows) {
    const values = result.headers.map((h: any) => {
      const v = String(row[h] ?? "");
      return v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
    });
    csvLines.push(values.join(","));
  }
  return csvLines.join("\n");
};

const getCell: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const sheetName = args[2] != null ? String(args[2]) : undefined;

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = sheetName ? workbook.getWorksheet(sheetName) : workbook.worksheets[0];
  if (!sheet) return null;
  const cell = sheet.getCell(cellRef);
  return { value: cell.value, formula: cell.formula, type: cell.type };
};

const setCell: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const value = args[2];
  const sheetName = args[3] != null ? String(args[3]) : undefined;

  const workbook = new ExcelJS.Workbook();
  try { await workbook.xlsx.readFile(filePath); } catch { /* new file */ }

  let sheet = sheetName ? workbook.getWorksheet(sheetName) : workbook.worksheets[0];
  if (!sheet) sheet = workbook.addWorksheet(sheetName ?? "Sheet1");

  sheet.getCell(cellRef).value = value as ExcelJS.CellValue;
  await workbook.xlsx.writeFile(filePath);
  return true;
};

// ── Exports ─────────────────────────────────────────────────────────

export const ExcelFunctions: Record<string, BuiltinHandler> = {
  read, write, readSheetNames, addSheet, toJson, fromJson, toCsv, getCell, setCell,
};

export const ExcelFunctionMetadata = {
  read: { description: "Read an Excel file into an array of row objects", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{sheet, headers}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{rows, headers, sheetName, rowCount}", example: 'excel.read "./data.xlsx"' },
  write: { description: "Write an array of objects to an Excel file", parameters: [{ name: "filePath", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "data", dataType: "array", description: "Array of row objects", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{sheetName, colWidth, headerColor, autoFilter}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, rows, columns}", example: 'excel.write "./output.xlsx" $data {"sheetName": "Users"}' },
  readSheetNames: { description: "List all sheet names in an Excel file", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of sheet name strings", example: 'excel.readSheetNames "./data.xlsx"' },
  addSheet: { description: "Add a new sheet with data to an existing Excel file", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }, { name: "sheetName", dataType: "string", description: "New sheet name", formInputType: "text", required: true }, { name: "data", dataType: "array", description: "Row data", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, sheet, rows}", example: 'excel.addSheet "./data.xlsx" "Summary" $summaryData' },
  toJson: { description: "Convert an Excel file to JSON (shortcut for read().rows)", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of row objects", example: 'excel.toJson "./data.xlsx"' },
  fromJson: { description: "Create an Excel file from JSON data", parameters: [{ name: "filePath", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "data", dataType: "any", description: "JSON array or string", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, rows, columns}", example: 'excel.fromJson "./output.xlsx" $jsonData' },
  toCsv: { description: "Convert an Excel file to CSV string", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }], returnType: "string", returnDescription: "CSV string", example: 'excel.toCsv "./data.xlsx"' },
  getCell: { description: "Get a specific cell value", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }, { name: "cell", dataType: "string", description: "Cell reference (e.g. 'A1')", formInputType: "text", required: true }, { name: "sheet", dataType: "string", description: "Sheet name (optional)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{value, formula, type}", example: 'excel.getCell "./data.xlsx" "B2"' },
  setCell: { description: "Set a specific cell value", parameters: [{ name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true }, { name: "cell", dataType: "string", description: "Cell reference", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Cell value", formInputType: "text", required: true }, { name: "sheet", dataType: "string", description: "Sheet name (optional)", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "True", example: 'excel.setCell "./data.xlsx" "A1" "Hello"' },
};

export const ExcelModuleMetadata = {
  description: "Read, write, and manipulate Excel spreadsheets (.xlsx) with sheets, cells, JSON/CSV conversion",
  methods: ["read", "write", "readSheetNames", "addSheet", "toJson", "fromJson", "toCsv", "getCell", "setCell"],
};
