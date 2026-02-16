import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const fromString: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const encoding = (args[1] as BufferEncoding) ?? "utf-8";
  return Buffer.from(str, encoding).toString("base64");
};

const toString: BuiltinHandler = (args) => {
  const b64 = String(args[0] ?? "");
  const encoding = (args[1] as BufferEncoding) ?? "utf-8";
  return Buffer.from(b64, "base64").toString(encoding);
};

const fromHex: BuiltinHandler = (args) => Buffer.from(String(args[0] ?? ""), "hex").toString("base64");
const toHex: BuiltinHandler = (args) => Buffer.from(String(args[0] ?? ""), "base64").toString("hex");
const toBase64: BuiltinHandler = (args) => Buffer.from(String(args[0] ?? ""), "utf-8").toString("base64");
const fromBase64: BuiltinHandler = (args) => Buffer.from(String(args[0] ?? ""), "base64").toString("utf-8");

const toBase64Url: BuiltinHandler = (args) => {
  return Buffer.from(String(args[0] ?? ""), "utf-8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url: BuiltinHandler = (args) => {
  let b64 = String(args[0] ?? "").replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return Buffer.from(b64, "base64").toString("utf-8");
};

const byteLength: BuiltinHandler = (args) => Buffer.byteLength(String(args[0] ?? ""), "utf-8");

const concat: BuiltinHandler = (args) => {
  const buffers = (args as string[]).map((b64) => Buffer.from(String(b64), "base64"));
  return Buffer.concat(buffers).toString("base64");
};

const compare: BuiltinHandler = (args) => {
  const a = Buffer.from(String(args[0] ?? ""), "base64");
  const b = Buffer.from(String(args[1] ?? ""), "base64");
  return Buffer.compare(a, b);
};

const isBase64: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  if (str.length === 0) return true;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length % 4 === 0;
};

export const BufferFunctions: Record<string, BuiltinHandler> = {
  fromString, toString, fromHex, toHex, toBase64, fromBase64, toBase64Url, fromBase64Url, byteLength, concat, compare, isBase64,
};

export const BufferFunctionMetadata: Record<string, FunctionMetadata> = {
  fromString: { description: "Create a base64 buffer from a string", parameters: [{ name: "str", dataType: "string", description: "Input string", formInputType: "text", required: true }, { name: "encoding", dataType: "string", description: "String encoding (default: utf-8)", formInputType: "text", required: false, defaultValue: "utf-8" }], returnType: "string", returnDescription: "Base64-encoded buffer", example: 'buffer.fromString "hello"' },
  toString: { description: "Convert a base64 buffer to string", parameters: [{ name: "base64", dataType: "string", description: "Base64 string", formInputType: "text", required: true }, { name: "encoding", dataType: "string", description: "Output encoding (default: utf-8)", formInputType: "text", required: false, defaultValue: "utf-8" }], returnType: "string", returnDescription: "Decoded string", example: 'buffer.toString "aGVsbG8="' },
  fromHex: { description: "Create base64 from hex string", parameters: [{ name: "hex", dataType: "string", description: "Hex string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Base64 string", example: 'buffer.fromHex "48656c6c6f"' },
  toHex: { description: "Convert base64 to hex string", parameters: [{ name: "base64", dataType: "string", description: "Base64 string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Hex string", example: 'buffer.toHex "aGVsbG8="' },
  toBase64: { description: "Encode string to base64", parameters: [{ name: "str", dataType: "string", description: "Input string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Base64 string", example: 'buffer.toBase64 "hello"' },
  fromBase64: { description: "Decode base64 to string", parameters: [{ name: "base64", dataType: "string", description: "Base64 string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decoded string", example: 'buffer.fromBase64 "aGVsbG8="' },
  toBase64Url: { description: "Encode string to URL-safe base64", parameters: [{ name: "str", dataType: "string", description: "Input string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Base64url string", example: 'buffer.toBase64Url "hello"' },
  fromBase64Url: { description: "Decode URL-safe base64 to string", parameters: [{ name: "base64url", dataType: "string", description: "Base64url string", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decoded string", example: 'buffer.fromBase64Url "aGVsbG8"' },
  byteLength: { description: "Get the byte length of a string", parameters: [{ name: "str", dataType: "string", description: "Input string", formInputType: "text", required: true }], returnType: "number", returnDescription: "Byte length", example: 'buffer.byteLength "hello"' },
  concat: { description: "Concatenate multiple base64 buffers", parameters: [{ name: "buffers", dataType: "string", description: "Base64 strings to concatenate", formInputType: "text", required: true }], returnType: "string", returnDescription: "Concatenated base64 string", example: 'buffer.concat "aGVs" "bG8="' },
  compare: { description: "Compare two base64 buffers", parameters: [{ name: "a", dataType: "string", description: "First base64 string", formInputType: "text", required: true }, { name: "b", dataType: "string", description: "Second base64 string", formInputType: "text", required: true }], returnType: "number", returnDescription: "-1, 0, or 1", example: 'buffer.compare "YQ==" "Yg=="' },
  isBase64: { description: "Check if a string is valid base64", parameters: [{ name: "str", dataType: "string", description: "String to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if valid base64", example: 'buffer.isBase64 "aGVsbG8="' },
};

export const BufferModuleMetadata: ModuleMetadata = {
  description: "Buffer and encoding utilities: base64, base64url, hex, byte operations",
  methods: ["fromString", "toString", "fromHex", "toHex", "toBase64", "fromBase64", "toBase64Url", "fromBase64Url", "byteLength", "concat", "compare", "isBase64"],
};
