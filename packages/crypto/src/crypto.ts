import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { createHash, createHmac } from "node:crypto";

// -- RobinPath Function Handlers ----------------------------------------

const md5: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return createHash("md5").update(input).digest("hex");
};

const sha1: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return createHash("sha1").update(input).digest("hex");
};

const sha256: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return createHash("sha256").update(input).digest("hex");
};

const sha512: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return createHash("sha512").update(input).digest("hex");
};

const hmac: BuiltinHandler = async (args) => {
  const algorithm = String(args[0] ?? "sha256");
  const message = String(args[1] ?? "");
  const key = String(args[2] ?? "");
  return createHmac(algorithm, key).update(message).digest("hex");
};

const base64Encode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return Buffer.from(input, "utf-8").toString("base64");
};

const base64Decode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return Buffer.from(input, "base64").toString("utf-8");
};

const hexEncode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return Buffer.from(input, "utf-8").toString("hex");
};

const hexDecode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return Buffer.from(input, "hex").toString("utf-8");
};

const urlEncode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return encodeURIComponent(input);
};

const urlDecode: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  return decodeURIComponent(input);
};

// -- Exports ------------------------------------------------------------

export const CryptoFunctions: Record<string, BuiltinHandler> = {
  md5,
  sha1,
  sha256,
  sha512,
  hmac,
  base64Encode,
  base64Decode,
  hexEncode,
  hexDecode,
  urlEncode,
  urlDecode,
};

export const CryptoFunctionMetadata: Record<string, FunctionMetadata> = {
  md5: {
    description: "Compute the MD5 hash of a string",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to hash",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The MD5 hex digest",
    example: 'crypto.md5 "hello"',
  },
  sha1: {
    description: "Compute the SHA-1 hash of a string",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to hash",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The SHA-1 hex digest",
    example: 'crypto.sha1 "hello"',
  },
  sha256: {
    description: "Compute the SHA-256 hash of a string",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to hash",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The SHA-256 hex digest",
    example: 'crypto.sha256 "hello"',
  },
  sha512: {
    description: "Compute the SHA-512 hash of a string",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to hash",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The SHA-512 hex digest",
    example: 'crypto.sha512 "hello"',
  },
  hmac: {
    description: "Compute an HMAC digest using the specified algorithm and secret key",
    parameters: [
      {
        name: "algorithm",
        dataType: "string",
        description: "Hash algorithm to use (e.g. sha256, sha512, md5)",
        formInputType: "text",
        required: true,
      },
      {
        name: "message",
        dataType: "string",
        description: "The message to authenticate",
        formInputType: "text",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "The secret key",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The HMAC hex digest",
    example: 'crypto.hmac "sha256" "message" "secret"',
  },
  base64Encode: {
    description: "Encode a string to Base64",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to encode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The Base64-encoded string",
    example: 'crypto.base64Encode "hello"',
  },
  base64Decode: {
    description: "Decode a Base64 string back to plain text",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The Base64-encoded string to decode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The decoded plain-text string",
    example: 'crypto.base64Decode "aGVsbG8="',
  },
  hexEncode: {
    description: "Encode a string to its hexadecimal representation",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to encode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The hex-encoded string",
    example: 'crypto.hexEncode "hello"',
  },
  hexDecode: {
    description: "Decode a hexadecimal string back to plain text",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The hex-encoded string to decode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The decoded plain-text string",
    example: 'crypto.hexDecode "68656c6c6f"',
  },
  urlEncode: {
    description: "Percent-encode a string for use in a URL",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The string to URL-encode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The URL-encoded string",
    example: 'crypto.urlEncode "hello world"',
  },
  urlDecode: {
    description: "Decode a percent-encoded URL string back to plain text",
    parameters: [
      {
        name: "input",
        dataType: "string",
        description: "The URL-encoded string to decode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The decoded plain-text string",
    example: 'crypto.urlDecode "hello%20world"',
  },
};

export const CryptoModuleMetadata: ModuleMetadata = {
  description: "Hashing, HMAC, and encoding/decoding utilities (MD5, SHA, Base64, Hex, URL)",
  methods: [
    "md5",
    "sha1",
    "sha256",
    "sha512",
    "hmac",
    "base64Encode",
    "base64Decode",
    "hexEncode",
    "hexDecode",
    "urlEncode",
    "urlDecode",
  ],
};
