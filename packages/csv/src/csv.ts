import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── CSV Parsing Core ────────────────────────────────────────────────

function parseCSVRows(input: string, delimiter = ","): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i]!;

    if (inQuotes) {
      if (ch === '"') {
        // Check for escaped quote ""
        if (i + 1 < input.length && input[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === delimiter) {
        row.push(field.trim());
        field = "";
        i++;
      } else if (ch === "\r") {
        // Handle \r\n and bare \r
        row.push(field.trim());
        field = "";
        rows.push(row);
        row = [];
        i++;
        if (i < input.length && input[i] === "\n") {
          i++;
        }
      } else if (ch === "\n") {
        row.push(field.trim());
        field = "";
        rows.push(row);
        row = [];
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  // Push last field/row
  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return [];
  const headers = rows[0]!;
  const result: Record<string, string>[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]!;
    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]!] = row[j] ?? "";
    }
    result.push(obj);
  }

  return result;
}

function escapeField(value: string, delimiter: string): string {
  if (
    value.includes(delimiter) ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

// ── RobinPath Function Handlers ─────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const csvString = String(args[0] ?? "");
  const delimiter = args[1] != null ? String(args[1]) : ",";
  const rows = parseCSVRows(csvString, delimiter);
  return rowsToObjects(rows);
};

const stringify: BuiltinHandler = (args) => {
  const data = args[0];
  const delimiter = args[1] != null ? String(args[1]) : ",";

  if (!Array.isArray(data) || data.length === 0) return "";

  const first = data[0] as Record<string, unknown>;
  const headers = Object.keys(first);

  const headerLine = headers.map((h: any) => escapeField(h, delimiter)).join(delimiter);

  const dataLines = (data as Record<string, unknown>[]).map((row: any) =>
    headers
      .map((h: any) => escapeField(String(row[h] ?? ""), delimiter))
      .join(delimiter)
  );

  return [headerLine, ...dataLines].join("\n");
};

const headers: BuiltinHandler = (args) => {
  const csvString = String(args[0] ?? "");
  const rows = parseCSVRows(csvString);
  if (rows.length === 0) return [];
  return rows[0]!;
};

const column: BuiltinHandler = (args) => {
  const csvString = String(args[0] ?? "");
  const columnName = String(args[1] ?? "");
  const rows = parseCSVRows(csvString);

  if (rows.length < 2) return [];

  const headerRow = rows[0]!;
  const colIndex = headerRow.indexOf(columnName);
  if (colIndex === -1) return [];

  const values: string[] = [];
  for (let i = 1; i < rows.length; i++) {
    values.push(rows[i]![colIndex] ?? "");
  }
  return values;
};

const rows: BuiltinHandler = (args) => {
  const csvString = String(args[0] ?? "");
  const delimiter = args[1] != null ? String(args[1]) : ",";
  return parseCSVRows(csvString, delimiter);
};

// ── Exports ─────────────────────────────────────────────────────────

export const CsvFunctions: Record<string, BuiltinHandler> = {
  parse,
  stringify,
  headers,
  column,
  rows,
};

export const CsvFunctionMetadata = {
  parse: {
    description: "Parse a CSV string into an array of objects (first row = headers)",
    parameters: [
      {
        name: "csvString",
        dataType: "string",
        description: "The CSV string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "delimiter",
        dataType: "string",
        description: "Column delimiter (default: comma)",
        formInputType: "text",
        required: false,
        defaultValue: ",",
      },
    ],
    returnType: "array",
    returnDescription: "Array of objects where keys are header names",
    example: 'csv.parse "name,age\\nAlice,30\\nBob,25"',
  },
  stringify: {
    description: "Convert an array of objects into a CSV string",
    parameters: [
      {
        name: "data",
        dataType: "array",
        description: "Array of objects to convert",
        formInputType: "json",
        required: true,
      },
      {
        name: "delimiter",
        dataType: "string",
        description: "Column delimiter (default: comma)",
        formInputType: "text",
        required: false,
        defaultValue: ",",
      },
    ],
    returnType: "string",
    returnDescription: "CSV formatted string",
    example: 'csv.stringify $data',
  },
  headers: {
    description: "Extract header names from a CSV string",
    parameters: [
      {
        name: "csvString",
        dataType: "string",
        description: "The CSV string",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of header name strings",
    example: 'csv.headers "name,age\\nAlice,30"',
  },
  column: {
    description: "Extract all values from a specific column",
    parameters: [
      {
        name: "csvString",
        dataType: "string",
        description: "The CSV string",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "columnName",
        dataType: "string",
        description: "Name of the column to extract",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of values from the specified column",
    example: 'csv.column "name,age\\nAlice,30" "name"',
  },
  rows: {
    description: "Parse a CSV string into an array of arrays (raw, no header mapping)",
    parameters: [
      {
        name: "csvString",
        dataType: "string",
        description: "The CSV string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "delimiter",
        dataType: "string",
        description: "Column delimiter (default: comma)",
        formInputType: "text",
        required: false,
        defaultValue: ",",
      },
    ],
    returnType: "array",
    returnDescription: "Array of arrays (each inner array is a row of strings)",
    example: 'csv.rows "name,age\\nAlice,30"',
  },
};

export const CsvModuleMetadata = {
  description: "Parse and stringify CSV data",
  methods: ["parse", "stringify", "headers", "column", "rows"],
};
