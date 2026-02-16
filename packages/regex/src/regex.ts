import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── RobinPath Function Handlers ─────────────────────────────────────

const test: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : "";
  const re = new RegExp(pattern, flags);
  return re.test(str);
};

const match: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : "";
  const re = new RegExp(pattern, flags);
  const m = str.match(re);
  return m ? m[0]! : null;
};

const matchAll: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : "";
  // Ensure 'g' flag is present for matchAll
  const effectiveFlags = flags.includes("g") ? flags : flags + "g";
  const re = new RegExp(pattern, effectiveFlags);
  const matches = [...str.matchAll(re)];
  return matches.map((m) => m[0]!);
};

const replace: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const replacement = String(args[2] ?? "");
  const flags = args[3] != null ? String(args[3]) : "g";
  const re = new RegExp(pattern, flags);
  return str.replace(re, replacement);
};

const split: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : "";
  const re = new RegExp(pattern, flags);
  return str.split(re);
};

const capture: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : "";
  const re = new RegExp(pattern, flags);
  const m = str.match(re);
  if (!m) return null;
  // Return capture groups only (index 1+), excluding the full match at index 0
  const groups = m.slice(1);
  return groups.length > 0 ? groups : null;
};

const escape: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// ── Exports ─────────────────────────────────────────────────────────

export const RegexFunctions: Record<string, BuiltinHandler> = {
  test,
  match,
  matchAll,
  replace,
  split,
  capture,
  escape,
};

export const RegexFunctionMetadata: Record<string, FunctionMetadata> = {
  test: {
    description: "Test if a string matches a regular expression pattern",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to test against the pattern",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (e.g. \"i\" for case-insensitive, \"m\" for multiline)",
        formInputType: "text",
        required: false,
        defaultValue: "",
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string matches the pattern, false otherwise",
    example: 'regex.test "hello world" "^hello"',
  },
  match: {
    description: "Find the first match of a pattern in a string",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to search",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (e.g. \"i\" for case-insensitive, \"m\" for multiline)",
        formInputType: "text",
        required: false,
        defaultValue: "",
      },
    ],
    returnType: "string",
    returnDescription: "The first matching substring, or null if no match",
    example: 'regex.match "abc 123 def 456" "\\d+"',
  },
  matchAll: {
    description: "Find all matches of a pattern in a string",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to search",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (e.g. \"i\" for case-insensitive, \"m\" for multiline). The \"g\" flag is automatically added.",
        formInputType: "text",
        required: false,
        defaultValue: "",
      },
    ],
    returnType: "array",
    returnDescription: "Array of all matching substrings",
    example: 'regex.matchAll "abc 123 def 456" "\\d+"',
  },
  replace: {
    description: "Replace matches of a pattern in a string",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to perform replacements on",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern to match",
        formInputType: "text",
        required: true,
      },
      {
        name: "replacement",
        dataType: "string",
        description: "The replacement string",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (default: \"g\" for global replace)",
        formInputType: "text",
        required: false,
        defaultValue: "g",
      },
    ],
    returnType: "string",
    returnDescription: "The string with matches replaced",
    example: 'regex.replace "abc 123 def 456" "\\d+" "X"',
  },
  split: {
    description: "Split a string by a regular expression pattern",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to split",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern to split on",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (e.g. \"i\" for case-insensitive)",
        formInputType: "text",
        required: false,
        defaultValue: "",
      },
    ],
    returnType: "array",
    returnDescription: "Array of substrings split by the pattern",
    example: 'regex.split "hello   world  foo" "\\s+"',
  },
  capture: {
    description: "Extract capture groups from the first match of a pattern",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to search",
        formInputType: "text",
        required: true,
      },
      {
        name: "pattern",
        dataType: "string",
        description: "The regular expression pattern with capture groups",
        formInputType: "text",
        required: true,
      },
      {
        name: "flags",
        dataType: "string",
        description: "Regex flags (e.g. \"i\" for case-insensitive)",
        formInputType: "text",
        required: false,
        defaultValue: "",
      },
    ],
    returnType: "array",
    returnDescription: "Array of captured group strings, or null if no match",
    example: 'regex.capture "2024-01-15" "(\\d{4})-(\\d{2})-(\\d{2})"',
  },
  escape: {
    description: "Escape special regular expression characters in a string",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to escape",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The string with special regex characters escaped",
    example: 'regex.escape "price is $9.99 (USD)"',
  },
};

export const RegexModuleMetadata: ModuleMetadata = {
  description: "Regular expression operations for pattern matching, searching, and replacing",
  methods: ["test", "match", "matchAll", "replace", "split", "capture", "escape"],
};
