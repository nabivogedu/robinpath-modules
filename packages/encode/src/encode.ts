import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { Buffer } from "node:buffer";

// ── Helpers ──────────────────────────────────────────────────────────────────

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function toString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "";
  if (Buffer.isBuffer(v)) return v.toString("utf8");
  return String(v);
}

function toBuffer(v: unknown): Buffer {
  if (Buffer.isBuffer(v)) return v;
  return Buffer.from(toString(v), "utf8");
}

const HTML_ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

// ── Functions ────────────────────────────────────────────────────────────────

function base64Encode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  return buf.toString("base64");
}

function base64Decode(args: Value[]): any {
  const input = toString(args[0]);
  return Buffer.from(input, "base64").toString("utf8");
}

function base64UrlEncode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  return buf.toString("base64url");
}

function base64UrlDecode(args: Value[]): any {
  const input = toString(args[0]);
  return Buffer.from(input, "base64url").toString("utf8");
}

function hexEncode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  return buf.toString("hex");
}

function hexDecode(args: Value[]): any {
  const input = toString(args[0]);
  return Buffer.from(input, "hex").toString("utf8");
}

function base32Encode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  let bits = "";
  for (let i = 0; i < buf.length; i++) {
    bits += buf[i].toString(2).padStart(8, "0");
  }
  let result = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, "0");
    result += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  const padLen = [0, 6, 4, 3, 1][buf.length % 5];
  result += "=".repeat(padLen);
  return result;
}

function base32Decode(args: Value[]): any {
  const input = toString(args[0]).replace(/=+$/, "").toUpperCase();
  let bits = "";
  for (const ch of input) {
    const idx = BASE32_ALPHABET.indexOf(ch);
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes).toString("utf8");
}

function urlEncode(args: Value[]): any {
  return encodeURIComponent(toString(args[0]));
}

function urlDecode(args: Value[]): any {
  return decodeURIComponent(toString(args[0]));
}

function htmlEncode(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/[&<>"']/g, (ch: any) => HTML_ENTITY_MAP[ch] ?? ch);
}

function htmlDecode(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;/g, (entity: any) => HTML_DECODE_MAP[entity] ?? entity);
}

function utf8Encode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  const result: number[] = [];
  for (let i = 0; i < buf.length; i++) {
    result.push(buf[i]);
  }
  return result;
}

function utf8Decode(args: Value[]): any {
  const input = args[0];
  if (Array.isArray(input)) {
    return Buffer.from(input as number[]).toString("utf8");
  }
  return toString(input);
}

function binaryEncode(args: Value[]): any {
  const buf = toBuffer(args[0]);
  const separator = toString(args[1]) || " ";
  const result: string[] = [];
  for (let i = 0; i < buf.length; i++) {
    result.push(buf[i].toString(2).padStart(8, "0"));
  }
  return result.join(separator);
}

function binaryDecode(args: Value[]): any {
  const input = toString(args[0]).replace(/[^01]/g, "");
  const bytes: number[] = [];
  for (let i = 0; i < input.length; i += 8) {
    const chunk = input.slice(i, i + 8);
    if (chunk.length === 8) {
      bytes.push(parseInt(chunk, 2));
    }
  }
  return Buffer.from(bytes).toString("utf8");
}

function asciiToChar(args: Value[]): any {
  const code = typeof args[0] === "number" ? args[0] : parseInt(toString(args[0]), 10);
  if (isNaN(code) || code < 0 || code > 127) return "";
  return String.fromCharCode(code);
}

function charToAscii(args: Value[]): any {
  const input = toString(args[0]);
  if (input.length === 0) return -1;
  return input.charCodeAt(0);
}

function rot13(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/[a-zA-Z]/g, (ch: any) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function percentEncode(args: Value[]): any {
  const input = toString(args[0]);
  return Array.from(Buffer.from(input, "utf8"))
    .map((byte: any) => "%" + byte.toString(16).toUpperCase().padStart(2, "0"))
    .join("");
}

function percentDecode(args: Value[]): any {
  const input = toString(args[0]);
  const bytes: number[] = [];
  let i = 0;
  while (i < input.length) {
    if (input[i] === "%" && i + 2 < input.length) {
      const hex = input.slice(i + 1, i + 3);
      const val = parseInt(hex, 16);
      if (!isNaN(val)) {
        bytes.push(val);
        i += 3;
        continue;
      }
    }
    bytes.push(input.charCodeAt(i));
    i++;
  }
  return Buffer.from(bytes).toString("utf8");
}

// ── Exports ──────────────────────────────────────────────────────────────────

export const EncodeFunctions = {
  base64Encode,
  base64Decode,
  base64UrlEncode,
  base64UrlDecode,
  hexEncode,
  hexDecode,
  base32Encode,
  base32Decode,
  urlEncode,
  urlDecode,
  htmlEncode,
  htmlDecode,
  utf8Encode,
  utf8Decode,
  binaryEncode,
  binaryDecode,
  asciiToChar,
  charToAscii,
  rot13,
  percentEncode,
  percentDecode,
};

export const EncodeFunctionMetadata = {
  base64Encode: {
    description: "Encode a string or buffer to Base64",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The data to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  base64Decode: {
    description: "Decode a Base64-encoded string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The Base64 string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  base64UrlEncode: {
    description: "Encode a string to URL-safe Base64 (no padding, +/ replaced with -_)",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The data to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  base64UrlDecode: {
    description: "Decode a URL-safe Base64 string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The URL-safe Base64 string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  hexEncode: {
    description: "Encode a string to hexadecimal representation",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The data to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  hexDecode: {
    description: "Decode a hexadecimal string back to UTF-8",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The hex string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  base32Encode: {
    description: "Encode a string to Base32 (RFC 4648)",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The data to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  base32Decode: {
    description: "Decode a Base32-encoded string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The Base32 string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  urlEncode: {
    description: "Encode a string using encodeURIComponent",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to URL-encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  urlDecode: {
    description: "Decode a URL-encoded string using decodeURIComponent",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The URL-encoded string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  htmlEncode: {
    description: "Encode HTML special characters into entities",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  htmlDecode: {
    description: "Decode HTML entities back to characters",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The HTML-encoded string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  utf8Encode: {
    description: "Encode a string to an array of UTF-8 byte values",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  utf8Decode: {
    description: "Decode an array of UTF-8 byte values back to a string",
    parameters: [
      { name: "input", dataType: "array", formInputType: "json", required: true, description: "Array of byte values" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  binaryEncode: {
    description: "Encode a string to its binary (0s and 1s) representation",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to encode" },
      { name: "separator", dataType: "string", formInputType: "text", required: false, description: "Separator between bytes (default: ' ')" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  binaryDecode: {
    description: "Decode a binary (0s and 1s) string back to text",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The binary string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  asciiToChar: {
    description: "Convert an ASCII code to its character",
    parameters: [
      { name: "code", dataType: "number", formInputType: "number", required: true, description: "ASCII code (0-127)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  charToAscii: {
    description: "Convert a character to its ASCII code",
    parameters: [
      { name: "char", dataType: "string", formInputType: "text", required: true, description: "A single character" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  rot13: {
    description: "Apply ROT13 substitution cipher to a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to transform" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  percentEncode: {
    description: "Percent-encode every byte of a string (e.g. 'A' becomes '%41')",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to encode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  percentDecode: {
    description: "Decode a percent-encoded string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The percent-encoded string to decode" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const EncodeModuleMetadata = {
  description: "Encoding and decoding conversions: Base64, Base32, hex, URL encoding, HTML entities, binary, ROT13, percent-encoding, and more",
  version: "1.0.0",
  tags: ["encode", "decode", "base64", "hex", "url", "html", "binary", "conversion"],
};
