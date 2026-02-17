import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

interface Schema { type?: string | string[]; minLength?: number; maxLength?: number; min?: number; max?: number; integer?: boolean; pattern?: string; enum?: unknown[]; items?: Schema; properties?: Record<string, Schema>; required?: string[]; nullable?: boolean; oneOf?: Schema[]; }

function validateValue(value: unknown, schema: Schema, path: string): string[] {
  const errors: string[] = [];
  if (schema.nullable && value === null) return errors;
  if (schema.oneOf) {
    const anyValid = schema.oneOf.some((s: any) => validateValue(value, s, path).length === 0);
    if (!anyValid) errors.push(`${path}: does not match any of the oneOf schemas`);
    return errors;
  }
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actualType = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
    if (!types.includes(actualType)) {
      errors.push(`${path}: expected type ${types.join("|")}, got ${actualType}`);
      return errors;
    }
  }
  if (typeof value === "string") {
    if (schema.minLength != null && value.length < schema.minLength) errors.push(`${path}: string length ${value.length} is below minimum ${schema.minLength}`);
    if (schema.maxLength != null && value.length > schema.maxLength) errors.push(`${path}: string length ${value.length} exceeds maximum ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${path}: does not match pattern ${schema.pattern}`);
  }
  if (typeof value === "number") {
    if (schema.min != null && value < schema.min) errors.push(`${path}: ${value} is below minimum ${schema.min}`);
    if (schema.max != null && value > schema.max) errors.push(`${path}: ${value} exceeds maximum ${schema.max}`);
    if (schema.integer && !Number.isInteger(value)) errors.push(`${path}: expected integer, got float`);
  }
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: value not in enum [${schema.enum.join(", ")}]`);
  if (Array.isArray(value) && schema.items) {
    value.forEach((item, i) => errors.push(...validateValue(item, schema.items!, `${path}[${i}]`)));
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value) && schema.properties) {
    const obj = value as Record<string, unknown>;
    if (schema.required) {
      for (const key of schema.required) { if (!(key in obj)) errors.push(`${path}.${key}: required property missing`); }
    }
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in obj) errors.push(...validateValue(obj[key], propSchema, `${path}.${key}`));
    }
  }
  return errors;
}

const validate: BuiltinHandler = (args) => {
  const errors = validateValue(args[0], args[1] as Schema, "$");
  return { valid: errors.length === 0, errors };
};

const isValid: BuiltinHandler = (args) => validateValue(args[0], args[1] as Schema, "$").length === 0;

const string: BuiltinHandler = (args) => {
  const opts = (args[0] as Record<string, unknown>) ?? {};
  const schema: Schema = { type: "string" };
  if (opts.minLength != null) schema.minLength = Number(opts.minLength);
  if (opts.maxLength != null) schema.maxLength = Number(opts.maxLength);
  if (opts.pattern) schema.pattern = String(opts.pattern);
  if (opts.enum) schema.enum = opts.enum as unknown[];
  return schema;
};

const number: BuiltinHandler = (args) => {
  const opts = (args[0] as Record<string, unknown>) ?? {};
  const schema: Schema = { type: "number" };
  if (opts.min != null) schema.min = Number(opts.min);
  if (opts.max != null) schema.max = Number(opts.max);
  if (opts.integer) schema.integer = true;
  return schema;
};

const boolean: BuiltinHandler = () => ({ type: "boolean" });

const array: BuiltinHandler = (args) => {
  const opts = (args[0] as Record<string, unknown>) ?? {};
  const schema: Schema = { type: "array" };
  if (opts.items) schema.items = opts.items as Schema;
  return schema;
};

const object: BuiltinHandler = (args) => {
  const opts = (args[0] as Record<string, unknown>) ?? {};
  const schema: Schema = { type: "object" };
  if (opts.properties) schema.properties = opts.properties as Record<string, Schema>;
  if (opts.required) schema.required = opts.required as string[];
  return schema;
};

const nullable: BuiltinHandler = (args) => ({ ...(args[0] as Schema), nullable: true });

const oneOf: BuiltinHandler = (args) => ({ oneOf: args as Schema[] });

const getErrors: BuiltinHandler = (args) => validateValue(args[0], args[1] as Schema, "$");

export const SchemaFunctions: Record<string, BuiltinHandler> = {
  validate, isValid, string, number, boolean, array, object, nullable, oneOf, getErrors,
};

export const SchemaFunctionMetadata = {
  validate: { description: "Validate data against a schema", parameters: [{ name: "data", dataType: "any", description: "Data to validate", formInputType: "json", required: true }, { name: "schema", dataType: "object", description: "Schema object", formInputType: "json", required: true }], returnType: "object", returnDescription: "{valid: boolean, errors: string[]}", example: "schema.validate $data $schema" },
  isValid: { description: "Check if data matches schema (boolean)", parameters: [{ name: "data", dataType: "any", description: "Data to validate", formInputType: "json", required: true }, { name: "schema", dataType: "object", description: "Schema object", formInputType: "json", required: true }], returnType: "boolean", returnDescription: "True if valid", example: "schema.isValid $data $schema" },
  string: { description: "Create a string schema", parameters: [{ name: "options", dataType: "object", description: "Options: {minLength, maxLength, pattern, enum}", formInputType: "json", required: false }], returnType: "object", returnDescription: "String schema object", example: 'schema.string {"minLength": 1}' },
  number: { description: "Create a number schema", parameters: [{ name: "options", dataType: "object", description: "Options: {min, max, integer}", formInputType: "json", required: false }], returnType: "object", returnDescription: "Number schema object", example: 'schema.number {"min": 0, "max": 100}' },
  boolean: { description: "Create a boolean schema", parameters: [], returnType: "object", returnDescription: "Boolean schema object", example: "schema.boolean" },
  array: { description: "Create an array schema", parameters: [{ name: "options", dataType: "object", description: "Options: {items}", formInputType: "json", required: false }], returnType: "object", returnDescription: "Array schema object", example: 'schema.array {"items": {"type": "string"}}' },
  object: { description: "Create an object schema", parameters: [{ name: "options", dataType: "object", description: "Options: {properties, required}", formInputType: "json", required: true }], returnType: "object", returnDescription: "Object schema object", example: "schema.object $opts" },
  nullable: { description: "Make a schema also accept null", parameters: [{ name: "schema", dataType: "object", description: "Schema to wrap", formInputType: "json", required: true }], returnType: "object", returnDescription: "Nullable schema", example: "schema.nullable $stringSchema" },
  oneOf: { description: "Create a schema matching one of several schemas", parameters: [{ name: "schemas", dataType: "object", description: "Schemas (pass as multiple args)", formInputType: "json", required: true }], returnType: "object", returnDescription: "OneOf schema", example: "schema.oneOf $schema1 $schema2" },
  getErrors: { description: "Validate and return only the errors array", parameters: [{ name: "data", dataType: "any", description: "Data to validate", formInputType: "json", required: true }, { name: "schema", dataType: "object", description: "Schema object", formInputType: "json", required: true }], returnType: "array", returnDescription: "Array of error strings", example: "schema.getErrors $data $schema" },
};

export const SchemaModuleMetadata = {
  description: "Lightweight schema validation: validate data against type schemas with constraints",
  methods: ["validate", "isValid", "string", "number", "boolean", "array", "object", "nullable", "oneOf", "getErrors"],
};
