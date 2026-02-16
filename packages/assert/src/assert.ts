import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
  }
  return false;
}

const equal: BuiltinHandler = (args) => {
  if (args[0] !== args[1]) throw new Error(`Expected ${JSON.stringify(args[0])} to equal ${JSON.stringify(args[1])}`);
  return true;
};

const notEqual: BuiltinHandler = (args) => {
  if (args[0] === args[1]) throw new Error(`Expected values to not be equal: ${JSON.stringify(args[0])}`);
  return true;
};

const deepEqualHandler: BuiltinHandler = (args) => {
  if (!deepEqual(args[0], args[1])) throw new Error(`Expected deep equality.\nActual: ${JSON.stringify(args[0])}\nExpected: ${JSON.stringify(args[1])}`);
  return true;
};

const truthy: BuiltinHandler = (args) => {
  if (!args[0]) throw new Error(`Expected truthy value, got: ${JSON.stringify(args[0])}`);
  return true;
};

const falsy: BuiltinHandler = (args) => {
  if (args[0]) throw new Error(`Expected falsy value, got: ${JSON.stringify(args[0])}`);
  return true;
};

const isNull: BuiltinHandler = (args) => {
  if (args[0] != null) throw new Error(`Expected null/undefined, got: ${JSON.stringify(args[0])}`);
  return true;
};

const isNotNull: BuiltinHandler = (args) => {
  if (args[0] == null) throw new Error("Expected non-null value, got null/undefined");
  return true;
};

const isType: BuiltinHandler = (args) => {
  const actual = typeof args[0];
  const expected = String(args[1] ?? "");
  if (actual !== expected) throw new Error(`Expected type "${expected}", got "${actual}"`);
  return true;
};

const includes: BuiltinHandler = (args) => {
  const haystack = args[0];
  const needle = args[1];
  if (typeof haystack === "string") {
    if (!haystack.includes(String(needle))) throw new Error(`Expected string to include "${needle}"`);
  } else if (Array.isArray(haystack)) {
    if (!haystack.includes(needle)) throw new Error(`Expected array to include ${JSON.stringify(needle)}`);
  } else {
    throw new Error("First argument must be a string or array");
  }
  return true;
};

const matches: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const pattern = new RegExp(String(args[1] ?? ""));
  if (!pattern.test(str)) throw new Error(`Expected "${str}" to match pattern ${pattern}`);
  return true;
};

const throws: BuiltinHandler = (args) => {
  const fn = args[0];
  if (typeof fn === "function") {
    try { fn(); return false; } catch { return true; }
  }
  throw new Error("First argument must be a function");
};

const lengthOf: BuiltinHandler = (args) => {
  const value = args[0];
  const expected = Number(args[1]);
  const actual = typeof value === "string" ? value.length : Array.isArray(value) ? value.length : -1;
  if (actual !== expected) throw new Error(`Expected length ${expected}, got ${actual}`);
  return true;
};

const hasProperty: BuiltinHandler = (args) => {
  const obj = args[0] as Record<string, unknown>;
  const prop = String(args[1] ?? "");
  if (!obj || typeof obj !== "object" || !(prop in obj)) throw new Error(`Expected object to have property "${prop}"`);
  return true;
};

const isAbove: BuiltinHandler = (args) => {
  const value = Number(args[0]);
  const threshold = Number(args[1]);
  if (value <= threshold) throw new Error(`Expected ${value} to be above ${threshold}`);
  return true;
};

const isBelow: BuiltinHandler = (args) => {
  const value = Number(args[0]);
  const threshold = Number(args[1]);
  if (value >= threshold) throw new Error(`Expected ${value} to be below ${threshold}`);
  return true;
};

export const AssertFunctions: Record<string, BuiltinHandler> = {
  equal, notEqual, deepEqual: deepEqualHandler, truthy, falsy, isNull, isNotNull, isType, includes, matches, throws, lengthOf, hasProperty, isAbove, isBelow,
};

export const AssertFunctionMetadata: Record<string, FunctionMetadata> = {
  equal: { description: "Assert two values are strictly equal (===)", parameters: [{ name: "actual", dataType: "any", description: "Actual value", formInputType: "text", required: true }, { name: "expected", dataType: "any", description: "Expected value", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if equal, throws otherwise", example: "assert.equal $a $b" },
  notEqual: { description: "Assert two values are not equal", parameters: [{ name: "actual", dataType: "any", description: "Actual value", formInputType: "text", required: true }, { name: "expected", dataType: "any", description: "Value to not match", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if not equal", example: "assert.notEqual $a $b" },
  deepEqual: { description: "Assert deep equality of two values", parameters: [{ name: "actual", dataType: "any", description: "Actual value", formInputType: "json", required: true }, { name: "expected", dataType: "any", description: "Expected value", formInputType: "json", required: true }], returnType: "boolean", returnDescription: "True if deeply equal", example: "assert.deepEqual $obj1 $obj2" },
  truthy: { description: "Assert value is truthy", parameters: [{ name: "value", dataType: "any", description: "Value to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if truthy", example: "assert.truthy $val" },
  falsy: { description: "Assert value is falsy", parameters: [{ name: "value", dataType: "any", description: "Value to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if falsy", example: "assert.falsy $val" },
  isNull: { description: "Assert value is null or undefined", parameters: [{ name: "value", dataType: "any", description: "Value to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if null/undefined", example: "assert.isNull $val" },
  isNotNull: { description: "Assert value is not null/undefined", parameters: [{ name: "value", dataType: "any", description: "Value to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if not null", example: "assert.isNotNull $val" },
  isType: { description: "Assert typeof value matches expected type", parameters: [{ name: "value", dataType: "any", description: "Value to check", formInputType: "text", required: true }, { name: "type", dataType: "string", description: "Expected type string", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if type matches", example: 'assert.isType $val "string"' },
  includes: { description: "Assert array/string includes a value", parameters: [{ name: "haystack", dataType: "any", description: "Array or string to search", formInputType: "text", required: true }, { name: "needle", dataType: "any", description: "Value to find", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if includes", example: 'assert.includes "hello" "ell"' },
  matches: { description: "Assert string matches a regex pattern", parameters: [{ name: "str", dataType: "string", description: "String to test", formInputType: "text", required: true }, { name: "pattern", dataType: "string", description: "Regex pattern", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if matches", example: 'assert.matches "hello" "^h"' },
  throws: { description: "Assert that a function throws", parameters: [{ name: "fn", dataType: "function", description: "Function to call", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if throws", example: "assert.throws $fn" },
  lengthOf: { description: "Assert array/string has specific length", parameters: [{ name: "value", dataType: "any", description: "Array or string", formInputType: "text", required: true }, { name: "length", dataType: "number", description: "Expected length", formInputType: "number", required: true }], returnType: "boolean", returnDescription: "True if length matches", example: "assert.lengthOf $arr 3" },
  hasProperty: { description: "Assert object has a specific property", parameters: [{ name: "obj", dataType: "object", description: "Object to check", formInputType: "json", required: true }, { name: "property", dataType: "string", description: "Property name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if has property", example: 'assert.hasProperty $obj "name"' },
  isAbove: { description: "Assert number is above threshold", parameters: [{ name: "value", dataType: "number", description: "Number to check", formInputType: "number", required: true }, { name: "threshold", dataType: "number", description: "Threshold", formInputType: "number", required: true }], returnType: "boolean", returnDescription: "True if above", example: "assert.isAbove 5 3" },
  isBelow: { description: "Assert number is below threshold", parameters: [{ name: "value", dataType: "number", description: "Number to check", formInputType: "number", required: true }, { name: "threshold", dataType: "number", description: "Threshold", formInputType: "number", required: true }], returnType: "boolean", returnDescription: "True if below", example: "assert.isBelow 3 5" },
};

export const AssertModuleMetadata: ModuleMetadata = {
  description: "Testing assertions: equal, deepEqual, truthy, falsy, type checks, includes, matches, throws, and more",
  methods: ["equal", "notEqual", "deepEqual", "truthy", "falsy", "isNull", "isNotNull", "isType", "includes", "matches", "throws", "lengthOf", "hasProperty", "isAbove", "isBelow"],
};
