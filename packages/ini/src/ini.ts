import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, writeFileSync } from "node:fs";

function parseIni(content: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  let currentSection = "__global__";
  result[currentSection] = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(";") || trimmed.startsWith("#")) continue;
    const sectionMatch = trimmed.match(/^\[(.+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1]!.trim();
      if (!result[currentSection]) result[currentSection] = {};
      continue;
    }
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[currentSection]![key] = value;
  }
  if (Object.keys(result["__global__"]!).length === 0) delete result["__global__"];
  return result;
}

function stringifyIni(obj: Record<string, Record<string, string>>): string {
  const lines: string[] = [];
  for (const [section, entries] of Object.entries(obj)) {
    if (section !== "__global__") lines.push(`[${section}]`);
    for (const [key, value] of Object.entries(entries)) {
      lines.push(`${key}=${value}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}

const parse: BuiltinHandler = (args) => parseIni(String(args[0] ?? ""));
const stringify: BuiltinHandler = (args) => stringifyIni(args[0] as Record<string, Record<string, string>>);
const parseFile: BuiltinHandler = (args) => parseIni(readFileSync(String(args[0] ?? ""), "utf-8"));
const writeFile: BuiltinHandler = (args) => { writeFileSync(String(args[0] ?? ""), stringifyIni(args[1] as Record<string, Record<string, string>>), "utf-8"); return true; };

const get: BuiltinHandler = (args) => {
  const ini = parseIni(String(args[0] ?? ""));
  const section = String(args[1] ?? "");
  const key = String(args[2] ?? "");
  return ini[section]?.[key] ?? null;
};

const set: BuiltinHandler = (args) => {
  const ini = parseIni(String(args[0] ?? ""));
  const section = String(args[1] ?? "");
  const key = String(args[2] ?? "");
  const value = String(args[3] ?? "");
  if (!ini[section]) ini[section] = {};
  ini[section]![key] = value;
  return stringifyIni(ini);
};

const getSections: BuiltinHandler = (args) => Object.keys(parseIni(String(args[0] ?? "")));

const getKeys: BuiltinHandler = (args) => {
  const ini = parseIni(String(args[0] ?? ""));
  const section = String(args[1] ?? "");
  return Object.keys(ini[section] ?? {});
};

const removeSection: BuiltinHandler = (args) => {
  const ini = parseIni(String(args[0] ?? ""));
  delete ini[String(args[1] ?? "")];
  return stringifyIni(ini);
};

const removeKey: BuiltinHandler = (args) => {
  const ini = parseIni(String(args[0] ?? ""));
  const section = String(args[1] ?? "");
  const key = String(args[2] ?? "");
  if (ini[section]) delete ini[section]![key];
  return stringifyIni(ini);
};

export const IniFunctions: Record<string, BuiltinHandler> = {
  parse, stringify, parseFile, writeFile, get, set, getSections, getKeys, removeSection, removeKey,
};

export const IniFunctionMetadata = {
  parse: { description: "Parse an INI string to object", parameters: [{ name: "iniString", dataType: "string", description: "INI format string", formInputType: "textarea", required: true }], returnType: "object", returnDescription: "Nested object with sections", example: 'ini.parse "[db]\\nhost=localhost"' },
  stringify: { description: "Convert object to INI string", parameters: [{ name: "obj", dataType: "object", description: "Object with sections", formInputType: "json", required: true }], returnType: "string", returnDescription: "INI format string", example: "ini.stringify $config" },
  parseFile: { description: "Read and parse an INI file", parameters: [{ name: "filePath", dataType: "string", description: "Path to INI file", formInputType: "text", required: true }], returnType: "object", returnDescription: "Parsed INI object", example: 'ini.parseFile "config.ini"' },
  writeFile: { description: "Write object as INI to file", parameters: [{ name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "obj", dataType: "object", description: "Object to write", formInputType: "json", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'ini.writeFile "config.ini" $obj' },
  get: { description: "Get value by section and key from INI string", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }, { name: "section", dataType: "string", description: "Section name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key name", formInputType: "text", required: true }], returnType: "string", returnDescription: "Value or null", example: 'ini.get $ini "database" "host"' },
  set: { description: "Set value by section and key, return updated INI", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }, { name: "section", dataType: "string", description: "Section name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key name", formInputType: "text", required: true }, { name: "value", dataType: "string", description: "Value", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated INI string", example: 'ini.set $ini "database" "port" "5432"' },
  getSections: { description: "Get all section names", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of section names", example: "ini.getSections $ini" },
  getKeys: { description: "Get all keys in a section", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }, { name: "section", dataType: "string", description: "Section name", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of keys", example: 'ini.getKeys $ini "database"' },
  removeSection: { description: "Remove a section from INI string", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }, { name: "section", dataType: "string", description: "Section to remove", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated INI string", example: 'ini.removeSection $ini "old_section"' },
  removeKey: { description: "Remove a key from a section", parameters: [{ name: "iniString", dataType: "string", description: "INI string", formInputType: "textarea", required: true }, { name: "section", dataType: "string", description: "Section name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key to remove", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated INI string", example: 'ini.removeKey $ini "database" "old_key"' },
};

export const IniModuleMetadata = {
  description: "Parse, stringify, read, and write INI configuration files",
  methods: ["parse", "stringify", "parseFile", "writeFile", "get", "set", "getSections", "getKeys", "removeSection", "removeKey"],
};
