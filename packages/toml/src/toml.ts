import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as TOML from "smol-toml";
import { readFileSync, writeFileSync } from "node:fs";

function resolvePath(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

const parse: BuiltinHandler = (args) => TOML.parse(String(args[0] ?? ""));

const stringify: BuiltinHandler = (args) => TOML.stringify(args[0] as Record<string, unknown>);

const parseFile: BuiltinHandler = (args) => TOML.parse(readFileSync(String(args[0] ?? ""), "utf-8"));

const writeFile: BuiltinHandler = (args) => {
  writeFileSync(String(args[0] ?? ""), TOML.stringify(args[1] as Record<string, unknown>), "utf-8");
  return true;
};

const get: BuiltinHandler = (args) => {
  const obj = TOML.parse(String(args[0] ?? ""));
  return resolvePath(obj, String(args[1] ?? ""));
};

const isValid: BuiltinHandler = (args) => {
  try { TOML.parse(String(args[0] ?? "")); return true; } catch { return false; }
};

const toJSON: BuiltinHandler = (args) => JSON.stringify(TOML.parse(String(args[0] ?? "")), null, 2);

const fromJSON: BuiltinHandler = (args) => TOML.stringify(JSON.parse(String(args[0] ?? "")));

export const TomlFunctions: Record<string, BuiltinHandler> = {
  parse, stringify, parseFile, writeFile, get, isValid, toJSON, fromJSON,
};

export const TomlFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: { description: "Parse a TOML string to object", parameters: [{ name: "tomlString", dataType: "string", description: "TOML string", formInputType: "textarea", required: true }], returnType: "object", returnDescription: "Parsed object", example: 'toml.parse "title = \\"My App\\""' },
  stringify: { description: "Convert object to TOML string", parameters: [{ name: "obj", dataType: "object", description: "Object to convert", formInputType: "json", required: true }], returnType: "string", returnDescription: "TOML string", example: "toml.stringify $config" },
  parseFile: { description: "Read and parse a TOML file", parameters: [{ name: "filePath", dataType: "string", description: "Path to TOML file", formInputType: "text", required: true }], returnType: "object", returnDescription: "Parsed object", example: 'toml.parseFile "config.toml"' },
  writeFile: { description: "Write object as TOML to file", parameters: [{ name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "obj", dataType: "object", description: "Object to write", formInputType: "json", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'toml.writeFile "config.toml" $obj' },
  get: { description: "Get nested value by dot path from TOML string", parameters: [{ name: "tomlString", dataType: "string", description: "TOML string", formInputType: "textarea", required: true }, { name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }], returnType: "any", returnDescription: "Value at path", example: 'toml.get $toml "database.host"' },
  isValid: { description: "Check if string is valid TOML", parameters: [{ name: "str", dataType: "string", description: "String to check", formInputType: "textarea", required: true }], returnType: "boolean", returnDescription: "True if valid TOML", example: 'toml.isValid "key = 1"' },
  toJSON: { description: "Convert TOML string to JSON string", parameters: [{ name: "tomlString", dataType: "string", description: "TOML string", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "JSON string", example: "toml.toJSON $toml" },
  fromJSON: { description: "Convert JSON string to TOML string", parameters: [{ name: "jsonString", dataType: "string", description: "JSON string", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "TOML string", example: "toml.fromJSON $json" },
};

export const TomlModuleMetadata: ModuleMetadata = {
  description: "Parse, stringify, and manipulate TOML configuration files",
  methods: ["parse", "stringify", "parseFile", "writeFile", "get", "isValid", "toJSON", "fromJSON"],
};
