import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Helpers ────────────────────────────────────────────────────────

function toDate(val: unknown): Date {
  if (typeof val === "number") return new Date(val);
  const s = String(val ?? "");
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date: ${s}`);
  }
  return d;
}

const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

function formatDate(d: Date, pattern: string): string {
  const tokens: Record<string, string> = {
    YYYY: String(d.getUTCFullYear()),
    MMMM: MONTHS_FULL[d.getUTCMonth()]!,
    MMM: MONTHS_SHORT[d.getUTCMonth()]!,
    MM: pad2(d.getUTCMonth() + 1),
    DD: pad2(d.getUTCDate()),
    HH: pad2(d.getUTCHours()),
    mm: pad2(d.getUTCMinutes()),
    ss: pad2(d.getUTCSeconds()),
    ddd: WEEKDAYS_SHORT[d.getUTCDay()]!,
  };

  // Replace longest tokens first to avoid partial matches
  // Order: YYYY, MMMM, MMM, MM, DD, HH, mm, ss, ddd
  let result = pattern;
  result = result.replace(/YYYY/g, tokens["YYYY"]!);
  result = result.replace(/MMMM/g, tokens["MMMM"]!);
  result = result.replace(/MMM/g, tokens["MMM"]!);
  result = result.replace(/MM/g, tokens["MM"]!);
  result = result.replace(/DD/g, tokens["DD"]!);
  result = result.replace(/HH/g, tokens["HH"]!);
  result = result.replace(/mm/g, tokens["mm"]!);
  result = result.replace(/ss/g, tokens["ss"]!);
  result = result.replace(/ddd/g, tokens["ddd"]!);
  return result;
}

type TimeUnit = "years" | "months" | "days" | "hours" | "minutes" | "seconds";

function addToDate(d: Date, amount: number, unit: TimeUnit): Date {
  const result = new Date(d.getTime());
  switch (unit) {
    case "years":
      result.setUTCFullYear(result.getUTCFullYear() + amount);
      break;
    case "months":
      result.setUTCMonth(result.getUTCMonth() + amount);
      break;
    case "days":
      result.setUTCDate(result.getUTCDate() + amount);
      break;
    case "hours":
      result.setUTCHours(result.getUTCHours() + amount);
      break;
    case "minutes":
      result.setUTCMinutes(result.getUTCMinutes() + amount);
      break;
    case "seconds":
      result.setUTCSeconds(result.getUTCSeconds() + amount);
      break;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
  return result;
}

type PeriodUnit = "year" | "month" | "day" | "hour" | "minute";

function getStartOf(d: Date, unit: PeriodUnit): Date {
  const result = new Date(d.getTime());
  switch (unit) {
    case "year":
      result.setUTCMonth(0, 1);
      result.setUTCHours(0, 0, 0, 0);
      break;
    case "month":
      result.setUTCDate(1);
      result.setUTCHours(0, 0, 0, 0);
      break;
    case "day":
      result.setUTCHours(0, 0, 0, 0);
      break;
    case "hour":
      result.setUTCMinutes(0, 0, 0);
      break;
    case "minute":
      result.setUTCSeconds(0, 0);
      break;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
  return result;
}

function getEndOf(d: Date, unit: PeriodUnit): Date {
  const result = new Date(d.getTime());
  switch (unit) {
    case "year":
      result.setUTCMonth(11, 31);
      result.setUTCHours(23, 59, 59, 999);
      break;
    case "month":
      // Go to first of next month, then subtract 1ms
      result.setUTCMonth(result.getUTCMonth() + 1, 1);
      result.setUTCHours(0, 0, 0, 0);
      result.setTime(result.getTime() - 1);
      break;
    case "day":
      result.setUTCHours(23, 59, 59, 999);
      break;
    case "hour":
      result.setUTCMinutes(59, 59, 999);
      break;
    case "minute":
      result.setUTCSeconds(59, 999);
      break;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
  return result;
}

function diffInUnit(d1: Date, d2: Date, unit: TimeUnit): number {
  const ms = d1.getTime() - d2.getTime();
  switch (unit) {
    case "seconds":
      return Math.floor(ms / 1000);
    case "minutes":
      return Math.floor(ms / (1000 * 60));
    case "hours":
      return Math.floor(ms / (1000 * 60 * 60));
    case "days":
      return Math.floor(ms / (1000 * 60 * 60 * 24));
    case "months": {
      const yearDiff = d1.getUTCFullYear() - d2.getUTCFullYear();
      const monthDiff = d1.getUTCMonth() - d2.getUTCMonth();
      return yearDiff * 12 + monthDiff;
    }
    case "years":
      return d1.getUTCFullYear() - d2.getUTCFullYear();
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}

// ── RobinPath Function Handlers ────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  return d.toISOString();
};

const format: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const pattern = String(args[1] ?? "YYYY-MM-DD");
  return formatDate(d, pattern);
};

const add: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const amount = Number(args[1] ?? 0);
  const unit = String(args[2] ?? "days") as TimeUnit;
  return addToDate(d, amount, unit).toISOString();
};

const subtract: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const amount = Number(args[1] ?? 0);
  const unit = String(args[2] ?? "days") as TimeUnit;
  return addToDate(d, -amount, unit).toISOString();
};

const diff: BuiltinHandler = (args) => {
  const d1 = toDate(args[0]);
  const d2 = toDate(args[1]);
  const unit = String(args[2] ?? "days") as TimeUnit;
  return diffInUnit(d1, d2, unit);
};

const startOf: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const unit = String(args[1] ?? "day") as PeriodUnit;
  return getStartOf(d, unit).toISOString();
};

const endOf: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const unit = String(args[1] ?? "day") as PeriodUnit;
  return getEndOf(d, unit).toISOString();
};

const isAfter: BuiltinHandler = (args) => {
  const d1 = toDate(args[0]);
  const d2 = toDate(args[1]);
  return d1.getTime() > d2.getTime();
};

const isBefore: BuiltinHandler = (args) => {
  const d1 = toDate(args[0]);
  const d2 = toDate(args[1]);
  return d1.getTime() < d2.getTime();
};

const isBetween: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  const start = toDate(args[1]);
  const end = toDate(args[2]);
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
};

const toISO: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  return d.toISOString();
};

const toUnix: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  return Math.floor(d.getTime() / 1000);
};

const fromUnix: BuiltinHandler = (args) => {
  const ts = Number(args[0] ?? 0);
  return new Date(ts * 1000).toISOString();
};

const dayOfWeek: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  return d.getUTCDay();
};

const daysInMonth: BuiltinHandler = (args) => {
  const d = toDate(args[0]);
  // Day 0 of next month gives the last day of current month
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
};

// ── Exports ────────────────────────────────────────────────────────

export const DateFunctions: Record<string, BuiltinHandler> = {
  parse,
  format,
  add,
  subtract,
  diff,
  startOf,
  endOf,
  isAfter,
  isBefore,
  isBetween,
  toISO,
  toUnix,
  fromUnix,
  dayOfWeek,
  daysInMonth,
};

export const DateFunctionMetadata = {
  parse: {
    description: "Parse a date string and return its ISO representation",
    parameters: [
      {
        name: "dateString",
        dataType: "string",
        description: "The date string to parse (e.g. \"2024-01-15\", ISO 8601, etc.)",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The date as an ISO 8601 string",
    example: 'date.parse "2024-01-15"',
  },
  format: {
    description: "Format a date using a pattern string",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string to format",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "Format pattern (tokens: YYYY, MM, DD, HH, mm, ss, ddd, MMM, MMMM)",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The formatted date string",
    example: 'date.format $date "YYYY-MM-DD"',
  },
  add: {
    description: "Add a duration to a date",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The base date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "amount",
        dataType: "number",
        description: "The amount to add",
        formInputType: "number",
        required: true,
      },
      {
        name: "unit",
        dataType: "string",
        description: "The unit: years, months, days, hours, minutes, or seconds",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The resulting date as an ISO 8601 string",
    example: 'date.add $date 5 "days"',
  },
  subtract: {
    description: "Subtract a duration from a date",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The base date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "amount",
        dataType: "number",
        description: "The amount to subtract",
        formInputType: "number",
        required: true,
      },
      {
        name: "unit",
        dataType: "string",
        description: "The unit: years, months, days, hours, minutes, or seconds",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The resulting date as an ISO 8601 string",
    example: 'date.subtract $date 3 "months"',
  },
  diff: {
    description: "Calculate the difference between two dates in a given unit",
    parameters: [
      {
        name: "date1",
        dataType: "string",
        description: "The first date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "date2",
        dataType: "string",
        description: "The second date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "unit",
        dataType: "string",
        description: "The unit: years, months, days, hours, minutes, or seconds",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The difference as a whole number (date1 - date2)",
    example: 'date.diff $date1 $date2 "days"',
  },
  startOf: {
    description: "Get the start of a time period for a date",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "unit",
        dataType: "string",
        description: "The period: year, month, day, hour, or minute",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The start of the period as an ISO 8601 string",
    example: 'date.startOf $date "month"',
  },
  endOf: {
    description: "Get the end of a time period for a date",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "unit",
        dataType: "string",
        description: "The period: year, month, day, hour, or minute",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The end of the period as an ISO 8601 string",
    example: 'date.endOf $date "month"',
  },
  isAfter: {
    description: "Check if the first date is after the second date",
    parameters: [
      {
        name: "date1",
        dataType: "string",
        description: "The first date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "date2",
        dataType: "string",
        description: "The second date string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if date1 is after date2",
    example: 'date.isAfter $date1 $date2',
  },
  isBefore: {
    description: "Check if the first date is before the second date",
    parameters: [
      {
        name: "date1",
        dataType: "string",
        description: "The first date string",
        formInputType: "text",
        required: true,
      },
      {
        name: "date2",
        dataType: "string",
        description: "The second date string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if date1 is before date2",
    example: 'date.isBefore $date1 $date2',
  },
  isBetween: {
    description: "Check if a date falls between two other dates (exclusive)",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date to check",
        formInputType: "text",
        required: true,
      },
      {
        name: "start",
        dataType: "string",
        description: "The start of the range",
        formInputType: "text",
        required: true,
      },
      {
        name: "end",
        dataType: "string",
        description: "The end of the range",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if date is between start and end (exclusive)",
    example: 'date.isBetween $date $start $end',
  },
  toISO: {
    description: "Convert a date to an ISO 8601 string",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string to convert",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The date as an ISO 8601 string",
    example: 'date.toISO $date',
  },
  toUnix: {
    description: "Convert a date to a Unix timestamp (seconds since epoch)",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string to convert",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Unix timestamp in seconds",
    example: 'date.toUnix $date',
  },
  fromUnix: {
    description: "Convert a Unix timestamp (seconds) to an ISO date string",
    parameters: [
      {
        name: "timestamp",
        dataType: "number",
        description: "Unix timestamp in seconds",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The date as an ISO 8601 string",
    example: 'date.fromUnix 1705276800',
  },
  dayOfWeek: {
    description: "Get the day of the week for a date (0 = Sunday, 6 = Saturday)",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Day of week (0 = Sunday through 6 = Saturday)",
    example: 'date.dayOfWeek $date',
  },
  daysInMonth: {
    description: "Get the number of days in the month of a given date",
    parameters: [
      {
        name: "date",
        dataType: "string",
        description: "The date string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Number of days in the month (28, 29, 30, or 31)",
    example: 'date.daysInMonth $date',
  },
};

export const DateModuleMetadata = {
  description: "Parse, format, manipulate, and compare dates and times",
  methods: [
    "parse",
    "format",
    "add",
    "subtract",
    "diff",
    "startOf",
    "endOf",
    "isAfter",
    "isBefore",
    "isBetween",
    "toISO",
    "toUnix",
    "fromUnix",
    "dayOfWeek",
    "daysInMonth",
  ],
};
