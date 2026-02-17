import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

function expandField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range: string, step: number;
    if (stepMatch) { range = stepMatch[1]!; step = Number(stepMatch[2]); }
    else { range = part; step = 1; }

    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start!; i <= end!; i += step) values.add(i);
    } else {
      values.add(Number(range));
    }
  }
  return [...values].sort((a, b) => a - b);
}

function parseCron(expr: string): { minute: number[]; hour: number[]; dayOfMonth: number[]; month: number[]; dayOfWeek: number[] } | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  try {
    return {
      minute: expandField(parts[0]!, 0, 59),
      hour: expandField(parts[1]!, 0, 23),
      dayOfMonth: expandField(parts[2]!, 1, 31),
      month: expandField(parts[3]!, 1, 12),
      dayOfWeek: expandField(parts[4]!, 0, 6),
    };
  } catch { return null; }
}

function matchesDate(parsed: NonNullable<ReturnType<typeof parseCron>>, date: Date): boolean {
  return parsed.minute.includes(date.getMinutes()) &&
    parsed.hour.includes(date.getHours()) &&
    parsed.dayOfMonth.includes(date.getDate()) &&
    parsed.month.includes(date.getMonth() + 1) &&
    parsed.dayOfWeek.includes(date.getDay());
}

function findNext(parsed: NonNullable<ReturnType<typeof parseCron>>, from: Date): Date {
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  for (let i = 0; i < 525960; i++) { // max ~1 year of minutes
    if (matchesDate(parsed, d)) return d;
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No matching date found within 1 year");
}

function findPrev(parsed: NonNullable<ReturnType<typeof parseCron>>, from: Date): Date {
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() - 1);
  for (let i = 0; i < 525960; i++) {
    if (matchesDate(parsed, d)) return d;
    d.setMinutes(d.getMinutes() - 1);
  }
  throw new Error("No matching date found within 1 year");
}

const isValid: BuiltinHandler = (args) => parseCron(String(args[0] ?? "")) !== null;

const parse: BuiltinHandler = (args) => {
  const result = parseCron(String(args[0] ?? ""));
  if (!result) throw new Error("Invalid cron expression");
  return result;
};

const next: BuiltinHandler = (args) => {
  const parsed = parseCron(String(args[0] ?? ""));
  if (!parsed) throw new Error("Invalid cron expression");
  const from = args[1] ? new Date(String(args[1])) : new Date();
  return findNext(parsed, from).toISOString();
};

const nextN: BuiltinHandler = (args) => {
  const parsed = parseCron(String(args[0] ?? ""));
  if (!parsed) throw new Error("Invalid cron expression");
  const count = Number(args[1] ?? 5);
  let from = args[2] ? new Date(String(args[2])) : new Date();
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    from = findNext(parsed, from);
    results.push(from.toISOString());
  }
  return results;
};

const prev: BuiltinHandler = (args) => {
  const parsed = parseCron(String(args[0] ?? ""));
  if (!parsed) throw new Error("Invalid cron expression");
  const from = args[1] ? new Date(String(args[1])) : new Date();
  return findPrev(parsed, from).toISOString();
};

const matches: BuiltinHandler = (args) => {
  const parsed = parseCron(String(args[0] ?? ""));
  if (!parsed) return false;
  const date = args[1] ? new Date(String(args[1])) : new Date();
  return matchesDate(parsed, date);
};

const describe: BuiltinHandler = (args) => {
  const expr = String(args[0] ?? "");
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression";
  const [min, hr, dom, mon, dow] = parts;
  const descs: string[] = [];
  if (min === "*/5" && hr === "*") descs.push("Every 5 minutes");
  else if (min === "0" && hr === "*") descs.push("Every hour");
  else if (min === "0" && hr === "0") descs.push("Daily at midnight");
  else if (min === "*" && hr === "*") descs.push("Every minute");
  else descs.push(`At minute ${min} of hour ${hr}`);
  if (dom !== "*") descs.push(`on day ${dom} of the month`);
  if (mon !== "*") descs.push(`in month ${mon}`);
  if (dow !== "*") descs.push(`on weekday ${dow}`);
  return descs.join(", ");
};

const between: BuiltinHandler = (args) => {
  const parsed = parseCron(String(args[0] ?? ""));
  if (!parsed) throw new Error("Invalid cron expression");
  const start = new Date(String(args[1] ?? ""));
  const end = new Date(String(args[2] ?? ""));
  const results: string[] = [];
  let current = new Date(start);
  current.setMinutes(current.getMinutes() - 1);
  while (true) {
    current = findNext(parsed, current);
    if (current > end) break;
    results.push(current.toISOString());
    if (results.length > 1000) break; // safety limit
  }
  return results;
};

export const CronFunctions: Record<string, BuiltinHandler> = {
  isValid, parse, next, nextN, prev, matches, describe, between,
};

export const CronFunctionMetadata = {
  isValid: { description: "Validate a cron expression", parameters: [{ name: "expression", dataType: "string", description: "Cron expression (5 fields)", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if valid", example: 'cron.isValid "*/5 * * * *"' },
  parse: { description: "Parse cron expression into expanded fields", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }], returnType: "object", returnDescription: "{minute[], hour[], dayOfMonth[], month[], dayOfWeek[]}", example: 'cron.parse "0 9 * * 1-5"' },
  next: { description: "Get next occurrence after a date", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }, { name: "from", dataType: "string", description: "From date (default: now)", formInputType: "text", required: false }], returnType: "string", returnDescription: "ISO date string", example: 'cron.next "*/5 * * * *"' },
  nextN: { description: "Get next N occurrences", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }, { name: "count", dataType: "number", description: "Number of occurrences (default: 5)", formInputType: "number", required: false, defaultValue: "5" }, { name: "from", dataType: "string", description: "From date (default: now)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of ISO date strings", example: 'cron.nextN "0 * * * *" 10' },
  prev: { description: "Get previous occurrence before a date", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }, { name: "from", dataType: "string", description: "From date (default: now)", formInputType: "text", required: false }], returnType: "string", returnDescription: "ISO date string", example: 'cron.prev "0 9 * * *"' },
  matches: { description: "Check if a date matches a cron expression", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }, { name: "date", dataType: "string", description: "Date to check (default: now)", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "True if matches", example: 'cron.matches "0 9 * * *" "2024-01-15T09:00:00"' },
  describe: { description: "Human-readable description of a cron expression", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }], returnType: "string", returnDescription: "Description string", example: 'cron.describe "*/5 * * * *"' },
  between: { description: "Get all occurrences between two dates", parameters: [{ name: "expression", dataType: "string", description: "Cron expression", formInputType: "text", required: true }, { name: "start", dataType: "string", description: "Start date", formInputType: "text", required: true }, { name: "end", dataType: "string", description: "End date", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of ISO date strings", example: 'cron.between "0 * * * *" "2024-01-01" "2024-01-02"' },
};

export const CronModuleMetadata = {
  description: "Cron expression parsing, validation, scheduling, and human-readable descriptions",
  methods: ["isValid", "parse", "next", "nextN", "prev", "matches", "describe", "between"],
};
