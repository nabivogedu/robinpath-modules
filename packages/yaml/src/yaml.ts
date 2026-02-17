import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
// @ts-ignore
import yaml from "js-yaml";
import { readFileSync, writeFileSync } from "node:fs";

// ── Helper ────────────────────────────────────────────────────────────

function resolveDotPath(obj: unknown, dotPath: string): any {
  const keys = dotPath.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

// ── RobinPath Function Handlers ───────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const yamlString = String(args[0] ?? "");
  return yaml.load(yamlString);
};

const stringify: BuiltinHandler = (args) => {
  const value = args[0];
  const indent = args[1] != null ? Number(args[1]) : 2;
  return yaml.dump(value, { indent });
};

const parseFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const content = readFileSync(filePath, "utf-8");
  return yaml.load(content);
};

const writeFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const value = args[1];
  const indent = args[2] != null ? Number(args[2]) : 2;
  const output = yaml.dump(value, { indent });
  writeFileSync(filePath, output, "utf-8");
  return true;
};

const parseAll: BuiltinHandler = (args) => {
  const yamlString = String(args[0] ?? "");
  const docs: unknown[] = [];
  yaml.loadAll(yamlString, (doc: any) => {
    docs.push(doc);
  });
  return docs;
};

const isValid: BuiltinHandler = (args) => {
  const yamlString = String(args[0] ?? "");
  try {
    yaml.load(yamlString);
    return true;
  } catch {
    return false;
  }
};

const get: BuiltinHandler = (args) => {
  const yamlString = String(args[0] ?? "");
  const dotPath = String(args[1] ?? "");
  const parsed = yaml.load(yamlString);
  return resolveDotPath(parsed, dotPath);
};

const toJSON: BuiltinHandler = (args) => {
  const yamlString = String(args[0] ?? "");
  const parsed = yaml.load(yamlString);
  return JSON.stringify(parsed);
};

const fromJSON: BuiltinHandler = (args) => {
  const jsonString = String(args[0] ?? "");
  const parsed = JSON.parse(jsonString);
  return yaml.dump(parsed);
};

// ── Exports ───────────────────────────────────────────────────────────

export const YamlFunctions: Record<string, BuiltinHandler> = {
  parse,
  stringify,
  parseFile,
  writeFile,
  parseAll,
  isValid,
  get,
  toJSON,
  fromJSON,
};

export const YamlFunctionMetadata = {
  parse: {
    description: "Parse a YAML string into a JavaScript object, array, or value",
    parameters: [
      {
        name: "yamlString",
        dataType: "string",
        description: "The YAML string to parse",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "Parsed JavaScript value (object, array, string, number, etc.)",
    example: 'yaml.parse "name: Alice\\nage: 30"',
  },
  stringify: {
    description: "Convert a JavaScript value into a YAML string",
    parameters: [
      {
        name: "value",
        dataType: "any",
        description: "The value to convert to YAML",
        formInputType: "json",
        required: true,
      },
      {
        name: "indent",
        dataType: "number",
        description: "Number of spaces for indentation (default: 2)",
        formInputType: "text",
        required: false,
        defaultValue: 2,
      },
    ],
    returnType: "string",
    returnDescription: "YAML formatted string",
    example: "yaml.stringify $data",
  },
  parseFile: {
    description: "Read and parse a YAML file from disk",
    parameters: [
      {
        name: "filePath",
        dataType: "string",
        description: "Path to the YAML file to read",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "Parsed JavaScript value from the YAML file",
    example: 'yaml.parseFile "config.yaml"',
  },
  writeFile: {
    description: "Write a value as YAML to a file on disk",
    parameters: [
      {
        name: "filePath",
        dataType: "string",
        description: "Path to the file to write",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "The value to serialize as YAML",
        formInputType: "json",
        required: true,
      },
      {
        name: "indent",
        dataType: "number",
        description: "Number of spaces for indentation (default: 2)",
        formInputType: "text",
        required: false,
        defaultValue: 2,
      },
    ],
    returnType: "boolean",
    returnDescription: "true on successful write",
    example: 'yaml.writeFile "output.yaml" $data',
  },
  parseAll: {
    description: "Parse a multi-document YAML string into an array of documents",
    parameters: [
      {
        name: "yamlString",
        dataType: "string",
        description: "Multi-document YAML string (documents separated by ---)",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of parsed documents",
    example: 'yaml.parseAll "---\\nname: Alice\\n---\\nname: Bob"',
  },
  isValid: {
    description: "Check whether a string is valid YAML",
    parameters: [
      {
        name: "yamlString",
        dataType: "string",
        description: "The YAML string to validate",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "true if the string is valid YAML, false otherwise",
    example: 'yaml.isValid "key: value"',
  },
  get: {
    description: "Parse YAML and retrieve a nested value by dot-path",
    parameters: [
      {
        name: "yamlString",
        dataType: "string",
        description: "The YAML string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "dotPath",
        dataType: "string",
        description: "Dot-separated path to the desired value (e.g. \"database.host\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "The value at the specified path, or undefined if not found",
    example: 'yaml.get "database:\\n  host: localhost" "database.host"',
  },
  toJSON: {
    description: "Convert a YAML string to a JSON string",
    parameters: [
      {
        name: "yamlString",
        dataType: "string",
        description: "The YAML string to convert",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "JSON string representation of the YAML data",
    example: 'yaml.toJSON "name: Alice\\nage: 30"',
  },
  fromJSON: {
    description: "Convert a JSON string to a YAML string",
    parameters: [
      {
        name: "jsonString",
        dataType: "string",
        description: "The JSON string to convert",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "YAML string representation of the JSON data",
    example: 'yaml.fromJSON \'{"name":"Alice","age":30}\'',
  },
};

export const YamlModuleMetadata = {
  description: "Parse, stringify, and manipulate YAML data",
  methods: ["parse", "stringify", "parseFile", "writeFile", "parseAll", "isValid", "get", "toJSON", "fromJSON"],
};
