import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Google Sheets: "${key}" not configured. Call googleSheets.setCredentials first.`);
  return val;
}

async function sheetsApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const token = getConfig("accessToken");
  const base = "https://sheets.googleapis.com/v4/spreadsheets";
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Sheets API error (${res.status}): ${text}`);
  }
  return res.json();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("googleSheets.setCredentials requires an access token.");
  config.set("accessToken", accessToken);
  return "Google Sheets credentials configured.";
};

const getValues: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const range = args[1] as string;
  if (!spreadsheetId || !range) throw new Error("googleSheets.getValues requires spreadsheetId and range.");
  return sheetsApi(`/${spreadsheetId}/values/${encodeURIComponent(range)}`);
};

const setValues: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const range = args[1] as string;
  const values = args[2] as unknown[][];
  if (!spreadsheetId || !range || !values) throw new Error("googleSheets.setValues requires spreadsheetId, range, and values.");
  return sheetsApi(
    `/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    "PUT",
    { range, values }
  );
};

const appendRow: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const range = args[1] as string;
  const values = args[2] as unknown[];
  if (!spreadsheetId || !range || !values) throw new Error("googleSheets.appendRow requires spreadsheetId, range, and values.");
  return sheetsApi(
    `/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    "POST",
    { values: [values] }
  );
};

const clearRange: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const range = args[1] as string;
  if (!spreadsheetId || !range) throw new Error("googleSheets.clearRange requires spreadsheetId and range.");
  return sheetsApi(`/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`, "POST");
};

const create: BuiltinHandler = async (args) => {
  const title = args[0] as string;
  if (!title) throw new Error("googleSheets.create requires a title.");
  return sheetsApi("", "POST", { properties: { title } });
};

const getSheets: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  if (!spreadsheetId) throw new Error("googleSheets.getSheets requires spreadsheetId.");
  const result = (await sheetsApi(`/${spreadsheetId}?fields=sheets.properties`)) as { sheets: unknown[] };
  return result.sheets;
};

const addSheet: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const title = args[1] as string;
  if (!spreadsheetId || !title) throw new Error("googleSheets.addSheet requires spreadsheetId and title.");
  return sheetsApi(`/${spreadsheetId}:batchUpdate`, "POST", {
    requests: [{ addSheet: { properties: { title } } }],
  });
};

const deleteSheet: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const sheetId = args[1] as number;
  if (!spreadsheetId || sheetId === undefined) throw new Error("googleSheets.deleteSheet requires spreadsheetId and sheetId.");
  return sheetsApi(`/${spreadsheetId}:batchUpdate`, "POST", {
    requests: [{ deleteSheet: { sheetId } }],
  });
};

const findRows: BuiltinHandler = async (args) => {
  const spreadsheetId = args[0] as string;
  const range = args[1] as string;
  const searchValue = args[2] as string;
  const column = (args[3] as number) ?? 0;
  if (!spreadsheetId || !range || searchValue === undefined) throw new Error("googleSheets.findRows requires spreadsheetId, range, and searchValue.");
  const result = (await sheetsApi(`/${spreadsheetId}/values/${encodeURIComponent(range)}`)) as { values?: unknown[][] };
  const rows = result.values ?? [];
  return rows.filter((row) => row[column] !== undefined && String(row[column]) === String(searchValue));
};

export const GoogleSheetsFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  getValues,
  setValues,
  appendRow,
  clearRange,
  create,
  getSheets,
  addSheet,
  deleteSheet,
  findRows,
};

export const GoogleSheetsFunctionMetadata: Record<string, object> = {
  setCredentials: {
    description: "Set the OAuth2 access token for Google Sheets API.",
    parameters: [
      { name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "password", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'googleSheets.setCredentials "ya29.xxx"',
  },
  getValues: {
    description: "Read values from a spreadsheet range.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "A1 notation range (e.g. Sheet1!A1:C10)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object containing values array.",
    example: 'googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"',
  },
  setValues: {
    description: "Write values to a spreadsheet range.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "A1 notation range", formInputType: "text", required: true },
      { name: "values", dataType: "array", description: "2D array of values", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Update response with updated range info.",
    example: 'googleSheets.setValues "spreadsheet_id" "Sheet1!A1:B2" [[1,2],[3,4]]',
  },
  appendRow: {
    description: "Append a row of values to a spreadsheet.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "A1 notation range to append after", formInputType: "text", required: true },
      { name: "values", dataType: "array", description: "Array of values for the new row", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Append response.",
    example: 'googleSheets.appendRow "spreadsheet_id" "Sheet1!A:C" ["Alice", 25, "alice@example.com"]',
  },
  clearRange: {
    description: "Clear all values in a spreadsheet range.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "A1 notation range to clear", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Clear response.",
    example: 'googleSheets.clearRange "spreadsheet_id" "Sheet1!A1:C10"',
  },
  create: {
    description: "Create a new Google Spreadsheet.",
    parameters: [
      { name: "title", dataType: "string", description: "Title for the new spreadsheet", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Created spreadsheet object with spreadsheetId.",
    example: 'googleSheets.create "My New Sheet"',
  },
  getSheets: {
    description: "List all sheets/tabs in a spreadsheet.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of sheet property objects.",
    example: 'googleSheets.getSheets "spreadsheet_id"',
  },
  addSheet: {
    description: "Add a new sheet/tab to a spreadsheet.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "title", dataType: "string", description: "Title for the new sheet", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Batch update response.",
    example: 'googleSheets.addSheet "spreadsheet_id" "New Tab"',
  },
  deleteSheet: {
    description: "Delete a sheet/tab from a spreadsheet.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "sheetId", dataType: "number", description: "Numeric ID of the sheet to delete", formInputType: "number", required: true },
    ],
    returnType: "object",
    returnDescription: "Batch update response.",
    example: 'googleSheets.deleteSheet "spreadsheet_id" 123456',
  },
  findRows: {
    description: "Find rows matching a value in a specific column.",
    parameters: [
      { name: "spreadsheetId", dataType: "string", description: "The spreadsheet ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "A1 notation range to search", formInputType: "text", required: true },
      { name: "searchValue", dataType: "string", description: "Value to search for", formInputType: "text", required: true },
      { name: "column", dataType: "number", description: "Column index to search (0-based, default 0)", formInputType: "number", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of matching rows.",
    example: 'googleSheets.findRows "spreadsheet_id" "Sheet1!A:D" "Alice"',
  },
};

export const GoogleSheetsModuleMetadata = {
  name: "googleSheets",
  description: "Read, write, and manage Google Sheets spreadsheets via the Google Sheets API v4.",
  icon: "table",
  category: "productivity",
};
