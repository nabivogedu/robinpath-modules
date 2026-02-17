import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { appendFileSync } from "node:fs";

// ── Module-level state ──────────────────────────────────────────────

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3, fatal: 4, silent: 5 } as const;
type LevelName = keyof typeof LEVELS;

let currentLevel: number = LEVELS.info;
let logFile: string | null = null;
let format: "text" | "json" = "text";
let indentDepth: number = 0;
const timers: Map<string, number> = new Map();

// ── Helpers ─────────────────────────────────────────────────────────

function levelName(num: number): LevelName {
  for (const [name, val] of Object.entries(LEVELS)) {
    if (val === num) return name as LevelName;
  }
  return "info";
}

function timestamp(): string {
  return new Date().toISOString();
}

function indent(): string {
  return "  ".repeat(indentDepth);
}

function formatMessage(level: string, message: string): string {
  if (format === "json") {
    return JSON.stringify({ level, timestamp: timestamp(), message });
  }
  return `${indent()}[${level.toUpperCase()}] [${timestamp()}] ${message}`;
}

function emit(level: LevelName, args: unknown[]): boolean {
  if (LEVELS[level] < currentLevel) return true;

  const message = args.map((a: any) => String(a ?? "")).join(" ");
  const line = formatMessage(level, message);

  // debug and info go to stdout; warn, error, fatal go to stderr
  if (level === "debug" || level === "info") {
    process.stdout.write(line + "\n");
  } else {
    process.stderr.write(line + "\n");
  }

  if (logFile) {
    try {
      appendFileSync(logFile, line + "\n", "utf-8");
    } catch {
      // silently ignore file write errors
    }
  }

  return true;
}

// ── RobinPath Function Handlers ─────────────────────────────────────

const debug: BuiltinHandler = (args) => emit("debug", args);

const info: BuiltinHandler = (args) => emit("info", args);

const warn: BuiltinHandler = (args) => emit("warn", args);

const error: BuiltinHandler = (args) => emit("error", args);

const fatal: BuiltinHandler = (args) => emit("fatal", args);

const setLevel: BuiltinHandler = (args) => {
  const lvl = String(args[0] ?? "info").toLowerCase() as LevelName;
  if (!(lvl in LEVELS)) {
    throw new Error(`Invalid log level: ${lvl}. Valid levels: ${Object.keys(LEVELS).join(", ")}`);
  }
  currentLevel = LEVELS[lvl];
  return true;
};

const getLevel: BuiltinHandler = () => {
  return levelName(currentLevel);
};

const setFile: BuiltinHandler = (args) => {
  logFile = String(args[0] ?? "");
  return true;
};

const setFormat: BuiltinHandler = (args) => {
  const fmt = String(args[0] ?? "text").toLowerCase();
  if (fmt !== "text" && fmt !== "json") {
    throw new Error(`Invalid format: ${fmt}. Valid formats: text, json`);
  }
  format = fmt;
  return true;
};

const clear: BuiltinHandler = () => {
  currentLevel = LEVELS.info;
  logFile = null;
  format = "text";
  indentDepth = 0;
  timers.clear();
  return true;
};

const table: BuiltinHandler = (args) => {
  const data = args[0];
  if (!Array.isArray(data) || data.length === 0) {
    process.stdout.write("(empty table)\n");
    return true;
  }

  // Collect all column keys
  const keys = new Set<string>();
  for (const row of data) {
    if (row && typeof row === "object") {
      for (const k of Object.keys(row as Record<string, unknown>)) {
        keys.add(k);
      }
    }
  }
  const columns = Array.from(keys);

  // Calculate column widths
  const widths: Record<string, number> = {};
  for (const col of columns) {
    widths[col] = col.length;
  }
  for (const row of data) {
    if (row && typeof row === "object") {
      for (const col of columns) {
        const val = String((row as Record<string, unknown>)[col] ?? "");
        if (val.length > widths[col]!) {
          widths[col] = val.length;
        }
      }
    }
  }

  // Build header
  const header = columns.map((c: any) => c.padEnd(widths[c]!)).join(" | ");
  const separator = columns.map((c: any) => "-".repeat(widths[c]!)).join("-+-");

  const lines: string[] = [header, separator];

  // Build rows
  for (const row of data) {
    if (row && typeof row === "object") {
      const cells = columns.map((c: any) =>
        String((row as Record<string, unknown>)[c] ?? "").padEnd(widths[c]!),
      );
      lines.push(cells.join(" | "));
    }
  }

  process.stdout.write(lines.join("\n") + "\n");
  return true;
};

const group: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "");
  process.stdout.write(`${indent()}▸ ${label}\n`);
  indentDepth++;
  return true;
};

const groupEnd: BuiltinHandler = () => {
  if (indentDepth > 0) indentDepth--;
  return true;
};

const time: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "default");
  timers.set(label, Date.now());
  return true;
};

const timeEnd: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "default");
  const start = timers.get(label);
  if (start === undefined) {
    throw new Error(`Timer "${label}" does not exist`);
  }
  const elapsed = Date.now() - start;
  timers.delete(label);
  process.stdout.write(`${indent()}[TIMER] ${label}: ${elapsed}ms\n`);
  return elapsed;
};

// ── Exports ─────────────────────────────────────────────────────────

export const LogFunctions: Record<string, BuiltinHandler> = {
  debug,
  info,
  warn,
  error,
  fatal,
  setLevel,
  getLevel,
  setFile,
  setFormat,
  clear,
  table,
  group,
  groupEnd,
  time,
  timeEnd,
};

export const LogFunctionMetadata = {
  debug: {
    description: "Log a message at DEBUG level to stdout",
    parameters: [
      {
        name: "messages",
        dataType: "string",
        description: "One or more messages to log",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after logging",
    example: 'log.debug "variable x =" $x',
  },
  info: {
    description: "Log a message at INFO level to stdout",
    parameters: [
      {
        name: "messages",
        dataType: "string",
        description: "One or more messages to log",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after logging",
    example: 'log.info "Server started on port" $port',
  },
  warn: {
    description: "Log a message at WARN level to stderr",
    parameters: [
      {
        name: "messages",
        dataType: "string",
        description: "One or more messages to log",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after logging",
    example: 'log.warn "Deprecated function called"',
  },
  error: {
    description: "Log a message at ERROR level to stderr",
    parameters: [
      {
        name: "messages",
        dataType: "string",
        description: "One or more messages to log",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after logging",
    example: 'log.error "Failed to connect:" $err',
  },
  fatal: {
    description: "Log a message at FATAL level to stderr",
    parameters: [
      {
        name: "messages",
        dataType: "string",
        description: "One or more messages to log",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after logging",
    example: 'log.fatal "Unrecoverable error, shutting down"',
  },
  setLevel: {
    description: "Set the minimum log level; messages below this level are suppressed",
    parameters: [
      {
        name: "level",
        dataType: "string",
        description: "Log level: debug, info, warn, error, fatal, or silent",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after setting the level",
    example: 'log.setLevel "warn"',
  },
  getLevel: {
    description: "Get the current minimum log level as a string",
    parameters: [],
    returnType: "string",
    returnDescription: "Current log level name (debug, info, warn, error, fatal, or silent)",
    example: "log.getLevel",
  },
  setFile: {
    description: "Set a file path to append log output to in addition to stdout/stderr",
    parameters: [
      {
        name: "filePath",
        dataType: "string",
        description: "Path to the log file",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after setting the file",
    example: 'log.setFile "/tmp/app.log"',
  },
  setFormat: {
    description: "Set the output format for log messages",
    parameters: [
      {
        name: "format",
        dataType: "string",
        description: "Format: text (default) or json",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after setting the format",
    example: 'log.setFormat "json"',
  },
  clear: {
    description: "Reset all log settings to defaults (info level, no file, text format)",
    parameters: [],
    returnType: "boolean",
    returnDescription: "True after resetting",
    example: "log.clear",
  },
  table: {
    description: "Pretty-print an array of objects as a table to stdout",
    parameters: [
      {
        name: "data",
        dataType: "array",
        description: "Array of objects to display as a table",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after printing the table",
    example: "log.table $rows",
  },
  group: {
    description: "Print a group header and increase indentation for subsequent log messages",
    parameters: [
      {
        name: "label",
        dataType: "string",
        description: "Label for the group",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after opening the group",
    example: 'log.group "Request handling"',
  },
  groupEnd: {
    description: "End the current group and decrease indentation",
    parameters: [],
    returnType: "boolean",
    returnDescription: "True after closing the group",
    example: "log.groupEnd",
  },
  time: {
    description: "Start a named timer",
    parameters: [
      {
        name: "label",
        dataType: "string",
        description: "Label for the timer",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True after starting the timer",
    example: 'log.time "db-query"',
  },
  timeEnd: {
    description: "Stop a named timer and log the elapsed time in milliseconds",
    parameters: [
      {
        name: "label",
        dataType: "string",
        description: "Label of the timer to stop",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Elapsed time in milliseconds",
    example: 'log.timeEnd "db-query"',
  },
};

export const LogModuleMetadata = {
  description: "Structured logging with levels, file output, JSON format, timers, and grouping",
  methods: [
    "debug",
    "info",
    "warn",
    "error",
    "fatal",
    "setLevel",
    "getLevel",
    "setFile",
    "setFormat",
    "clear",
    "table",
    "group",
    "groupEnd",
    "time",
    "timeEnd",
  ],
};
