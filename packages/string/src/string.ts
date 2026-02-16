import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Helpers ─────────────────────────────────────────────────────────

function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// ── Handlers ────────────────────────────────────────────────────────

const capitalize: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase: BuiltinHandler = (args) => {
  const words = splitWords(String(args[0] ?? ""));
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
};

const snakeCase: BuiltinHandler = (args) => {
  return splitWords(String(args[0] ?? "")).map((w) => w.toLowerCase()).join("_");
};

const kebabCase: BuiltinHandler = (args) => {
  return splitWords(String(args[0] ?? "")).map((w) => w.toLowerCase()).join("-");
};

const pascalCase: BuiltinHandler = (args) => {
  return splitWords(String(args[0] ?? ""))
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
};

const titleCase: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return str.replace(/\b\w/g, (ch) => ch.toUpperCase());
};

const slugify: BuiltinHandler = (args) => {
  return String(args[0] ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const truncate: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const maxLength = Number(args[1] ?? 100);
  const suffix = args[2] != null ? String(args[2]) : "...";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

const padStart: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const targetLength = Number(args[1] ?? 0);
  const padChar = args[2] != null ? String(args[2]) : " ";
  return str.padStart(targetLength, padChar);
};

const padEnd: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const targetLength = Number(args[1] ?? 0);
  const padChar = args[2] != null ? String(args[2]) : " ";
  return str.padEnd(targetLength, padChar);
};

const reverse: BuiltinHandler = (args) => {
  return String(args[0] ?? "").split("").reverse().join("");
};

const wordCount: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "").trim();
  if (str.length === 0) return 0;
  return str.split(/\s+/).length;
};

const contains: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const sub = String(args[1] ?? "");
  return str.includes(sub);
};

const repeat: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const count = Number(args[1] ?? 1);
  return str.repeat(count);
};

const replaceAll: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const search = String(args[1] ?? "");
  const replacement = String(args[2] ?? "");
  return str.split(search).join(replacement);
};

// ── Exports ─────────────────────────────────────────────────────────

export const StringFunctions: Record<string, BuiltinHandler> = {
  capitalize,
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
  titleCase,
  slugify,
  truncate,
  padStart,
  padEnd,
  reverse,
  wordCount,
  contains,
  repeat,
  replaceAll,
};

export const StringFunctionMetadata: Record<string, FunctionMetadata> = {
  capitalize: {
    description: "Capitalize the first letter of a string",
    parameters: [
      { name: "str", dataType: "string", description: "The string to capitalize", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "String with first letter capitalized",
    example: 'string.capitalize "hello"',
  },
  camelCase: {
    description: "Convert a string to camelCase",
    parameters: [
      { name: "str", dataType: "string", description: "The string to convert", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "camelCase string",
    example: 'string.camelCase "hello world"',
  },
  snakeCase: {
    description: "Convert a string to snake_case",
    parameters: [
      { name: "str", dataType: "string", description: "The string to convert", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "snake_case string",
    example: 'string.snakeCase "helloWorld"',
  },
  kebabCase: {
    description: "Convert a string to kebab-case",
    parameters: [
      { name: "str", dataType: "string", description: "The string to convert", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "kebab-case string",
    example: 'string.kebabCase "helloWorld"',
  },
  pascalCase: {
    description: "Convert a string to PascalCase",
    parameters: [
      { name: "str", dataType: "string", description: "The string to convert", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "PascalCase string",
    example: 'string.pascalCase "hello world"',
  },
  titleCase: {
    description: "Capitalize the first letter of each word",
    parameters: [
      { name: "str", dataType: "string", description: "The string to convert", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Title Case string",
    example: 'string.titleCase "hello world"',
  },
  slugify: {
    description: "Convert a string to a URL-friendly slug",
    parameters: [
      { name: "str", dataType: "string", description: "The string to slugify", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "URL-friendly slug",
    example: 'string.slugify "Hello World!"',
  },
  truncate: {
    description: "Truncate a string to a maximum length with a suffix",
    parameters: [
      { name: "str", dataType: "string", description: "The string to truncate", formInputType: "text", required: true },
      { name: "maxLength", dataType: "number", description: "Maximum length", formInputType: "number", required: true },
      { name: "suffix", dataType: "string", description: "Suffix to append (default: '...')", formInputType: "text", required: false, defaultValue: "..." },
    ],
    returnType: "string",
    returnDescription: "Truncated string",
    example: 'string.truncate "Hello World" 8',
  },
  padStart: {
    description: "Pad the start of a string to a target length",
    parameters: [
      { name: "str", dataType: "string", description: "The string to pad", formInputType: "text", required: true },
      { name: "targetLength", dataType: "number", description: "Target length", formInputType: "number", required: true },
      { name: "padChar", dataType: "string", description: "Pad character (default: space)", formInputType: "text", required: false, defaultValue: " " },
    ],
    returnType: "string",
    returnDescription: "Padded string",
    example: 'string.padStart "5" 3 "0"',
  },
  padEnd: {
    description: "Pad the end of a string to a target length",
    parameters: [
      { name: "str", dataType: "string", description: "The string to pad", formInputType: "text", required: true },
      { name: "targetLength", dataType: "number", description: "Target length", formInputType: "number", required: true },
      { name: "padChar", dataType: "string", description: "Pad character (default: space)", formInputType: "text", required: false, defaultValue: " " },
    ],
    returnType: "string",
    returnDescription: "Padded string",
    example: 'string.padEnd "hi" 5 "."',
  },
  reverse: {
    description: "Reverse a string",
    parameters: [
      { name: "str", dataType: "string", description: "The string to reverse", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Reversed string",
    example: 'string.reverse "hello"',
  },
  wordCount: {
    description: "Count the number of words in a string",
    parameters: [
      { name: "str", dataType: "string", description: "The string to count words in", formInputType: "text", required: true },
    ],
    returnType: "number",
    returnDescription: "Number of words",
    example: 'string.wordCount "hello world"',
  },
  contains: {
    description: "Check if a string contains a substring",
    parameters: [
      { name: "str", dataType: "string", description: "The string to search in", formInputType: "text", required: true },
      { name: "substring", dataType: "string", description: "The substring to search for", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the string contains the substring",
    example: 'string.contains "hello world" "world"',
  },
  repeat: {
    description: "Repeat a string N times",
    parameters: [
      { name: "str", dataType: "string", description: "The string to repeat", formInputType: "text", required: true },
      { name: "count", dataType: "number", description: "Number of repetitions", formInputType: "number", required: true },
    ],
    returnType: "string",
    returnDescription: "Repeated string",
    example: 'string.repeat "ab" 3',
  },
  replaceAll: {
    description: "Replace all occurrences of a search string with a replacement",
    parameters: [
      { name: "str", dataType: "string", description: "The input string", formInputType: "text", required: true },
      { name: "search", dataType: "string", description: "The string to search for", formInputType: "text", required: true },
      { name: "replacement", dataType: "string", description: "The replacement string", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "String with all occurrences replaced",
    example: 'string.replaceAll "hello world" "o" "0"',
  },
};

export const StringModuleMetadata: ModuleMetadata = {
  description: "String manipulation utilities: case conversion, slugify, truncate, pad, reverse, and more",
  methods: ["capitalize", "camelCase", "snakeCase", "kebabCase", "pascalCase", "titleCase", "slugify", "truncate", "padStart", "padEnd", "reverse", "wordCount", "contains", "repeat", "replaceAll"],
};
