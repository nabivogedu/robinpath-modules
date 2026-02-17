import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

type Row = Record<string, unknown>;

const create: BuiltinHandler = (args) => {
  const input = args[0];
  if (Array.isArray(input)) return [...input];
  if (typeof input === "object" && input !== null) {
    const obj = input as { columns?: string[]; rows?: unknown[][] };
    if (obj.columns && obj.rows) {
      return obj.rows.map((row: any) => {
        const r: Row = {};
        obj.columns!.forEach((col: any, i: any) => { r[col] = row[i]; });
        return r;
      });
    }
  }
  return [];
};

const select: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const columns = (args[1] ?? []) as string[];
  return table.map((row: any) => {
    const r: Row = {};
    for (const col of columns) r[col] = row[col];
    return r;
  });
};

const where: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  const operator = String(args[2] ?? "eq");
  const value = args[3];

  return table.filter((row: any) => {
    const v = row[field];
    switch (operator) {
      case "eq": return v === value;
      case "neq": return v !== value;
      case "gt": return Number(v) > Number(value);
      case "lt": return Number(v) < Number(value);
      case "gte": return Number(v) >= Number(value);
      case "lte": return Number(v) <= Number(value);
      case "contains": return String(v).includes(String(value));
      case "startsWith": return String(v).startsWith(String(value));
      case "endsWith": return String(v).endsWith(String(value));
      case "in": return Array.isArray(value) && value.includes(v);
      case "notIn": return Array.isArray(value) && !value.includes(v);
      case "isNull": return v === null || v === undefined;
      case "notNull": return v !== null && v !== undefined;
      default: return true;
    }
  });
};

const orderBy: BuiltinHandler = (args) => {
  const table = [...((args[0] ?? []) as Row[])];
  const field = String(args[1] ?? "");
  const direction = String(args[2] ?? "asc").toLowerCase();
  const mult = direction === "desc" ? -1 : 1;
  return table.sort((a: any, b: any) => {
    const va = a[field], vb = b[field];
    if (va === vb) return 0;
    if (va === null || va === undefined) return 1;
    if (vb === null || vb === undefined) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * mult;
    return String(va).localeCompare(String(vb)) * mult;
  });
};

const groupBy: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  const groups: Record<string, Row[]> = {};
  for (const row of table) {
    const key = String(row[field] ?? "");
    (groups[key] ??= []).push(row);
  }
  return groups;
};

const aggregate: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const groupField = String(args[1] ?? "");
  const aggregations = (args[2] ?? []) as { field: string; op: string }[];

  const groups: Record<string, Row[]> = {};
  for (const row of table) {
    const key = String(row[groupField] ?? "");
    (groups[key] ??= []).push(row);
  }

  return Object.entries(groups).map(([key, rows]) => {
    const result: Row = { [groupField]: key };
    for (const agg of aggregations) {
      const vals = rows.map((r: any) => r[agg.field]).filter((v: any) => v !== null && v !== undefined);
      const nums = vals.map(Number).filter((n: any) => !isNaN(n));
      switch (agg.op) {
        case "sum": result[`${agg.field}_sum`] = nums.reduce((a, b) => a + b, 0); break;
        case "avg": result[`${agg.field}_avg`] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0; break;
        case "min": result[`${agg.field}_min`] = nums.length ? Math.min(...nums) : null; break;
        case "max": result[`${agg.field}_max`] = nums.length ? Math.max(...nums) : null; break;
        case "count": result[`${agg.field}_count`] = vals.length; break;
        case "first": result[`${agg.field}_first`] = vals[0] ?? null; break;
        case "last": result[`${agg.field}_last`] = vals[vals.length - 1] ?? null; break;
      }
    }
    return result;
  });
};

const join: BuiltinHandler = (args) => {
  const left = (args[0] ?? []) as Row[];
  const right = (args[1] ?? []) as Row[];
  const leftKey = String(args[2] ?? "");
  const rightKey = String(args[3] ?? "");
  const type = String(args[4] ?? "inner");

  const rightIndex = new Map<string, Row[]>();
  for (const r of right) {
    const k = String(r[rightKey] ?? "");
    (rightIndex.get(k) ?? (rightIndex.set(k, []), rightIndex.get(k)!)).push(r);
  }

  const results: Row[] = [];
  const matchedRight = new Set<string>();

  for (const l of left) {
    const k = String(l[leftKey] ?? "");
    const matches = rightIndex.get(k);
    if (matches) {
      matchedRight.add(k);
      for (const r of matches) results.push({ ...l, ...r });
    } else if (type === "left" || type === "full") {
      results.push({ ...l });
    }
  }

  if (type === "right" || type === "full") {
    for (const r of right) {
      const k = String(r[rightKey] ?? "");
      if (!matchedRight.has(k)) results.push({ ...r });
    }
  }

  return results;
};

const distinct: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const columns = args[1] as string[] | undefined;
  const seen = new Set<string>();
  return table.filter((row: any) => {
    const key = columns ? columns.map((c: any) => JSON.stringify(row[c])).join("|") : JSON.stringify(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const limit: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  return table.slice(0, Number(args[1] ?? 10));
};

const offset: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  return table.slice(Number(args[1] ?? 0));
};

const addColumn: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const colName = String(args[1] ?? "");
  const defaultValue = args[2];
  return table.map((row: any) => ({ ...row, [colName]: defaultValue }));
};

const removeColumn: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const cols = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")];
  return table.map((row: any) => {
    const r = { ...row };
    for (const c of cols) delete r[c];
    return r;
  });
};

const renameColumn: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const oldName = String(args[1] ?? "");
  const newName = String(args[2] ?? "");
  return table.map((row: any) => {
    const r: Row = {};
    for (const [k, v] of Object.entries(row)) r[k === oldName ? newName : k] = v;
    return r;
  });
};

const pivot: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const rowField = String(args[1] ?? "");
  const columnField = String(args[2] ?? "");
  const valueField = String(args[3] ?? "");
  const aggOp = String(args[4] ?? "first");

  const groups = new Map<string, Map<string, unknown[]>>();
  for (const row of table) {
    const rk = String(row[rowField] ?? "");
    const ck = String(row[columnField] ?? "");
    if (!groups.has(rk)) groups.set(rk, new Map());
    const cols = groups.get(rk)!;
    if (!cols.has(ck)) cols.set(ck, []);
    cols.get(ck)!.push(row[valueField]);
  }

  return [...groups.entries()].map(([rk, cols]) => {
    const r: Row = { [rowField]: rk };
    for (const [ck, vals] of cols) {
      const nums = vals.map(Number).filter((n: any) => !isNaN(n));
      switch (aggOp) {
        case "sum": r[ck] = nums.reduce((a, b) => a + b, 0); break;
        case "count": r[ck] = vals.length; break;
        case "avg": r[ck] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0; break;
        case "first": r[ck] = vals[0]; break;
        default: r[ck] = vals[0];
      }
    }
    return r;
  });
};

const unpivot: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const idColumns = (args[1] ?? []) as string[];
  const valueColumns = (args[2] ?? []) as string[];
  const results: Row[] = [];
  for (const row of table) {
    for (const vc of valueColumns) {
      const r: Row = {};
      for (const ic of idColumns) r[ic] = row[ic];
      r.key = vc;
      r.value = row[vc];
      results.push(r);
    }
  }
  return results;
};

const count: BuiltinHandler = (args) => ((args[0] ?? []) as Row[]).length;

const sum: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  return table.reduce((acc, row) => acc + Number(row[field] ?? 0), 0);
};

const avg: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  if (!table.length) return 0;
  return table.reduce((acc, row) => acc + Number(row[field] ?? 0), 0) / table.length;
};

const min: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  const vals = table.map((r: any) => Number(r[field])).filter((n: any) => !isNaN(n));
  return vals.length ? Math.min(...vals) : null;
};

const max: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const field = String(args[1] ?? "");
  const vals = table.map((r: any) => Number(r[field])).filter((n: any) => !isNaN(n));
  return vals.length ? Math.max(...vals) : null;
};

const head: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  return table.slice(0, Number(args[1] ?? 5));
};

const tail: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  const n = Number(args[1] ?? 5);
  return table.slice(-n);
};

const columns: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  if (!table.length) return [];
  return Object.keys(table[0]!);
};

const shape: BuiltinHandler = (args) => {
  const table = (args[0] ?? []) as Row[];
  return { rows: table.length, columns: table.length ? Object.keys(table[0]!).length : 0 };
};

export const TableFunctions: Record<string, BuiltinHandler> = {
  create, select, where, orderBy, groupBy, aggregate, join, distinct, limit, offset,
  addColumn, removeColumn, renameColumn, pivot, unpivot,
  count, sum, avg, min, max, head, tail, columns, shape,
};

export const TableFunctionMetadata = {
  create: { description: "Create a table from array of objects or columns+rows", parameters: [{ name: "data", dataType: "object", description: "Array of objects or {columns, rows}", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of row objects", example: 'table.create [{"name": "Alice", "age": 30}]' },
  select: { description: "Select specific columns", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "columns", dataType: "array", description: "Column names to keep", formInputType: "text", required: true }], returnType: "array", returnDescription: "Table with selected columns", example: 'table.select $data ["name", "age"]' },
  where: { description: "Filter rows by condition", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column name", formInputType: "text", required: true }, { name: "operator", dataType: "string", description: "eq|neq|gt|lt|gte|lte|contains|startsWith|endsWith|in|notIn|isNull|notNull", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Comparison value", formInputType: "text", required: false }], returnType: "array", returnDescription: "Filtered rows", example: 'table.where $data "age" "gt" 25' },
  orderBy: { description: "Sort rows by a field", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column to sort by", formInputType: "text", required: true }, { name: "direction", dataType: "string", description: "asc or desc", formInputType: "text", required: false }], returnType: "array", returnDescription: "Sorted table", example: 'table.orderBy $data "age" "desc"' },
  groupBy: { description: "Group rows by a field", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column to group by", formInputType: "text", required: true }], returnType: "object", returnDescription: "Grouped rows keyed by field value", example: 'table.groupBy $data "department"' },
  aggregate: { description: "Aggregate grouped data", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "groupField", dataType: "string", description: "Column to group by", formInputType: "text", required: true }, { name: "aggregations", dataType: "array", description: "Array of {field, op: sum|avg|min|max|count|first|last}", formInputType: "text", required: true }], returnType: "array", returnDescription: "Aggregated results", example: 'table.aggregate $data "dept" [{"field": "salary", "op": "avg"}]' },
  join: { description: "Join two tables", parameters: [{ name: "left", dataType: "array", description: "Left table", formInputType: "text", required: true }, { name: "right", dataType: "array", description: "Right table", formInputType: "text", required: true }, { name: "leftKey", dataType: "string", description: "Left join key", formInputType: "text", required: true }, { name: "rightKey", dataType: "string", description: "Right join key", formInputType: "text", required: true }, { name: "type", dataType: "string", description: "inner|left|right|full", formInputType: "text", required: false }], returnType: "array", returnDescription: "Joined table", example: 'table.join $users $orders "id" "userId" "left"' },
  distinct: { description: "Remove duplicate rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "columns", dataType: "array", description: "Columns for uniqueness check", formInputType: "text", required: false }], returnType: "array", returnDescription: "Deduplicated table", example: 'table.distinct $data ["name"]' },
  limit: { description: "Take first N rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Number of rows", formInputType: "text", required: true }], returnType: "array", returnDescription: "First N rows", example: 'table.limit $data 10' },
  offset: { description: "Skip first N rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Rows to skip", formInputType: "text", required: true }], returnType: "array", returnDescription: "Remaining rows", example: 'table.offset $data 5' },
  addColumn: { description: "Add a column with a default value", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "columnName", dataType: "string", description: "New column name", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Default value", formInputType: "text", required: true }], returnType: "array", returnDescription: "Table with new column", example: 'table.addColumn $data "status" "active"' },
  removeColumn: { description: "Remove column(s)", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "columns", dataType: "any", description: "Column name or array of names", formInputType: "text", required: true }], returnType: "array", returnDescription: "Table without specified columns", example: 'table.removeColumn $data "temp"' },
  renameColumn: { description: "Rename a column", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "oldName", dataType: "string", description: "Current name", formInputType: "text", required: true }, { name: "newName", dataType: "string", description: "New name", formInputType: "text", required: true }], returnType: "array", returnDescription: "Table with renamed column", example: 'table.renameColumn $data "fname" "firstName"' },
  pivot: { description: "Pivot table", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "rowField", dataType: "string", description: "Row grouping field", formInputType: "text", required: true }, { name: "columnField", dataType: "string", description: "Column pivot field", formInputType: "text", required: true }, { name: "valueField", dataType: "string", description: "Value field", formInputType: "text", required: true }, { name: "aggOp", dataType: "string", description: "sum|count|avg|first", formInputType: "text", required: false }], returnType: "array", returnDescription: "Pivoted table", example: 'table.pivot $data "product" "month" "sales" "sum"' },
  unpivot: { description: "Unpivot/melt table", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "idColumns", dataType: "array", description: "Columns to keep", formInputType: "text", required: true }, { name: "valueColumns", dataType: "array", description: "Columns to melt", formInputType: "text", required: true }], returnType: "array", returnDescription: "Unpivoted table with key/value columns", example: 'table.unpivot $data ["name"] ["jan", "feb", "mar"]' },
  count: { description: "Count rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }], returnType: "number", returnDescription: "Row count", example: 'table.count $data' },
  sum: { description: "Sum a numeric column", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Sum", example: 'table.sum $data "amount"' },
  avg: { description: "Average a numeric column", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Average", example: 'table.avg $data "score"' },
  min: { description: "Minimum of a column", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Minimum value", example: 'table.min $data "price"' },
  max: { description: "Maximum of a column", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Column name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Maximum value", example: 'table.max $data "price"' },
  head: { description: "First N rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Number of rows (default 5)", formInputType: "text", required: false }], returnType: "array", returnDescription: "First N rows", example: 'table.head $data 5' },
  tail: { description: "Last N rows", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Number of rows (default 5)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Last N rows", example: 'table.tail $data 5' },
  columns: { description: "Get column names", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }], returnType: "array", returnDescription: "Column name strings", example: 'table.columns $data' },
  shape: { description: "Get row and column counts", parameters: [{ name: "table", dataType: "array", description: "Table data", formInputType: "text", required: true }], returnType: "object", returnDescription: "{rows, columns}", example: 'table.shape $data' },
};

export const TableModuleMetadata = {
  description: "Tabular data operations: filter, sort, join, group, aggregate, pivot — like a lightweight DataFrame",
  methods: ["create", "select", "where", "orderBy", "groupBy", "aggregate", "join", "distinct", "limit", "offset", "addColumn", "removeColumn", "renameColumn", "pivot", "unpivot", "count", "sum", "avg", "min", "max", "head", "tail", "columns", "shape"],
};
