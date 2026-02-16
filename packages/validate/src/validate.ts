import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// -- RobinPath Function Handlers ----------------------------------------

const isEmail: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isUrl: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const isIP: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const num = Number(part);
    return num >= 0 && num <= 255;
  });
};

const isUUID: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
};

const isDate: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  if (value.trim() === "") return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
};

const isNumeric: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  if (value.trim() === "") return false;
  return !isNaN(Number(value));
};

const isAlpha: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  return /^[a-zA-Z]+$/.test(value);
};

const isAlphanumeric: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  return /^[a-zA-Z0-9]+$/.test(value);
};

const matches: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  const pattern = String(args[1] ?? "");
  const flags = args[2] != null ? String(args[2]) : undefined;
  const regex = new RegExp(pattern, flags);
  return regex.test(value);
};

const minLength: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  const min = Number(args[1] ?? 0);
  return value.length >= min;
};

const maxLength: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  const max = Number(args[1] ?? 0);
  return value.length <= max;
};

const inRange: BuiltinHandler = (args) => {
  const value = Number(args[0] ?? 0);
  const min = Number(args[1] ?? 0);
  const max = Number(args[2] ?? 0);
  return value >= min && value <= max;
};

const isJSON: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const isEmpty: BuiltinHandler = (args) => {
  const value = args[0];
  if (value == null) return true;
  if (typeof value === "string") return value === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value as object).length === 0;
  return false;
};

// -- Exports ------------------------------------------------------------

export const ValidateFunctions: Record<string, BuiltinHandler> = {
  isEmail,
  isUrl,
  isIP,
  isUUID,
  isDate,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  matches,
  minLength,
  maxLength,
  inRange,
  isJSON,
  isEmpty,
};

export const ValidateFunctionMetadata: Record<string, FunctionMetadata> = {
  isEmail: {
    description: "Validate email format",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate as an email address",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid email format",
    example: 'validate.isEmail "user@example.com"',
  },
  isUrl: {
    description: "Validate URL format",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate as a URL",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid URL",
    example: 'validate.isUrl "https://example.com"',
  },
  isIP: {
    description: "Validate IPv4 address format",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate as an IPv4 address",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid IPv4 address",
    example: 'validate.isIP "192.168.1.1"',
  },
  isUUID: {
    description: "Validate UUID format",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate as a UUID",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid UUID",
    example: 'validate.isUUID "550e8400-e29b-41d4-a716-446655440000"',
  },
  isDate: {
    description: "Check if a string is a valid date",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate as a date",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string can be parsed as a valid date",
    example: 'validate.isDate "2024-01-15"',
  },
  isNumeric: {
    description: "Check if a string is numeric",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string represents a valid number",
    example: 'validate.isNumeric "123.45"',
  },
  isAlpha: {
    description: "Check if a string contains only letters",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string contains only alphabetic characters",
    example: 'validate.isAlpha "hello"',
  },
  isAlphanumeric: {
    description: "Check if a string contains only letters and digits",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string contains only alphanumeric characters",
    example: 'validate.isAlphanumeric "hello123"',
  },
  matches: {
    description: "Test a string against a regular expression pattern",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to test",
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
        description: "Optional regex flags (e.g. \"i\" for case-insensitive)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string matches the pattern",
    example: 'validate.matches $str "^\\\\d{3}$"',
  },
  minLength: {
    description: "Check if a string meets a minimum length",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "text",
        required: true,
      },
      {
        name: "min",
        dataType: "number",
        description: "The minimum required length",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string length is >= min",
    example: 'validate.minLength "hello" 3',
  },
  maxLength: {
    description: "Check if a string does not exceed a maximum length",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "text",
        required: true,
      },
      {
        name: "max",
        dataType: "number",
        description: "The maximum allowed length",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string length is <= max",
    example: 'validate.maxLength "hi" 5',
  },
  inRange: {
    description: "Check if a number is within a range (inclusive)",
    parameters: [
      {
        name: "value",
        dataType: "number",
        description: "The number to check",
        formInputType: "text",
        required: true,
      },
      {
        name: "min",
        dataType: "number",
        description: "The minimum value (inclusive)",
        formInputType: "text",
        required: true,
      },
      {
        name: "max",
        dataType: "number",
        description: "The maximum value (inclusive)",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if value >= min and value <= max",
    example: "validate.inRange 5 1 10",
  },
  isJSON: {
    description: "Check if a string is valid JSON",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to check",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string can be parsed as valid JSON",
    example: "validate.isJSON '{\"a\":1}'",
  },
  isEmpty: {
    description: "Check if a value is empty (null, undefined, empty string, empty array, or empty object)",
    parameters: [
      {
        name: "value",
        dataType: "any",
        description: "The value to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the value is considered empty",
    example: 'validate.isEmpty ""',
  },
};

export const ValidateModuleMetadata: ModuleMetadata = {
  description: "Validate strings, numbers, and data formats (email, URL, IP, UUID, JSON, etc.)",
  methods: [
    "isEmail",
    "isUrl",
    "isIP",
    "isUUID",
    "isDate",
    "isNumeric",
    "isAlpha",
    "isAlphanumeric",
    "matches",
    "minLength",
    "maxLength",
    "inRange",
    "isJSON",
    "isEmpty",
  ],
};
