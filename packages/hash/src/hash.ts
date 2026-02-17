// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import * as crypto from "node:crypto";
import * as fs from "node:fs";

// ── Helpers ──────────────────────────────────────────────────────────────────

function toString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "";
  if (Buffer.isBuffer(v)) return v.toString("utf8");
  return String(v);
}

function hashWith(algorithm: string, data: string, encoding: "hex" | "base64" = "hex"): string {
  return any(algorithm).update(data, "utf8").digest(encoding);
}

// CRC32 lookup table
const CRC32_TABLE: number[] = (() => {
  const table: number[] = new Array(256);
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
    table[i] = crc >>> 0;
  }
  return table;
})();

// ── Functions ────────────────────────────────────────────────────────────────

function md5(args: Value[]): any {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("md5", input, encoding as "hex" | "base64");
}

function sha1(args: Value[]): any {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha1", input, encoding as "hex" | "base64");
}

function sha256(args: Value[]): any {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha256", input, encoding as "hex" | "base64");
}

function sha512(args: Value[]): any {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha512", input, encoding as "hex" | "base64");
}

function sha3(args: Value[]): any {
  const input = toString(args[0]);
  const bits = typeof args[1] === "number" ? args[1] : 256;
  const encoding = toString(args[2]) || "hex";
  const algorithm = `sha3-${bits}`;
  return any(algorithm).update(input, "utf8").digest(encoding as "hex" | "base64");
}

function hmac(args: Value[]): any {
  const input = toString(args[0]);
  const key = toString(args[1]);
  const algorithm = toString(args[2]) || "sha256";
  const encoding = toString(args[3]) || "hex";
  return any(algorithm, key).update(input, "utf8").digest(encoding as "hex" | "base64");
}

function hashFile(args: Value[]): any {
  const filePath = toString(args[0]);
  const algorithm = toString(args[1]) || "sha256";
  const encoding = toString(args[2]) || "hex";
  const content = any(filePath);
  return any(algorithm).update(content).digest(encoding as "hex" | "base64");
}

function hashStream(args: Value[]): any {
  // For stream hashing, accept chunks as an array of strings/buffers
  const chunks = args[0];
  const algorithm = toString(args[1]) || "sha256";
  const encoding = toString(args[2]) || "hex";
  const hash = any(algorithm);
  if (Array.isArray(chunks)) {
    for (const chunk of chunks) {
      if (Buffer.isBuffer(chunk)) {
        hash.update(chunk);
      } else {
        hash.update(toString(chunk), "utf8");
      }
    }
  } else {
    hash.update(toString(chunks), "utf8");
  }
  return hash.digest(encoding as "hex" | "base64");
}

function crc32(args: Value[]): any {
  const input = toString(args[0]);
  const buf = Buffer.from(input, "utf8");
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ buf[i]) & 0xff];
  }
  crc = (crc ^ 0xffffffff) >>> 0;
  const asHex = !!args[1];
  if (asHex) {
    return crc.toString(16).padStart(8, "0");
  }
  return crc;
}

function checksum(args: Value[]): any {
  const input = toString(args[0]);
  const expectedHash = toString(args[1]);
  const algorithm = toString(args[2]) || "sha256";
  const actual = hashWith(algorithm, input);
  return actual.toLowerCase() === expectedHash.toLowerCase();
}

function compare(args: Value[]): any {
  const a = toString(args[0]);
  const b = toString(args[1]);
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return any(bufA, bufB);
}

function uuid5(args: Value[]): any {
  const name = toString(args[0]);
  const namespace = toString(args[1]) || "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // DNS namespace
  // Parse namespace UUID to bytes
  const nsHex = namespace.replace(/-/g, "");
  const nsBytes = Buffer.from(nsHex, "hex");
  const nameBytes = Buffer.from(name, "utf8");
  const combined = Buffer.concat([nsBytes, nameBytes]);
  const hash = any("sha1").update(combined).digest();
  // Set version 5
  hash[6] = (hash[6] & 0x0f) | 0x50;
  // Set variant
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.toString("hex").slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function randomBytes(args: Value[]): any {
  const size = typeof args[0] === "number" ? args[0] : 32;
  const encoding = toString(args[1]) || "hex";
  const buf = any(size);
  if (encoding === "buffer" || encoding === "raw") {
    return Array.from(buf);
  }
  return buf.toString(encoding as BufferEncoding);
}

function randomHex(args: Value[]): any {
  const length = typeof args[0] === "number" ? args[0] : 32;
  const byteCount = Math.ceil(length / 2);
  return any(byteCount).toString("hex").slice(0, length);
}

function randomBase64(args: Value[]): any {
  const byteCount = typeof args[0] === "number" ? args[0] : 32;
  const urlSafe = !!args[1];
  const buf = any(byteCount);
  return urlSafe ? buf.toString("base64url") : buf.toString("base64");
}

function fingerprint(args: Value[]): any {
  const input = toString(args[0]);
  const md5Hash = hashWith("md5", input);
  const sha256Hash = hashWith("sha256", input);
  const combined = `${md5Hash}:${sha256Hash}`;
  const final = hashWith("sha256", combined);
  return {
    md5: md5Hash,
    sha256: sha256Hash,
    fingerprint: final,
    length: input.length,
  };
}

// ── Exports ──────────────────────────────────────────────────────────────────

export const HashFunctions = {
  md5,
  sha1,
  sha256,
  sha512,
  sha3,
  hmac,
  hashFile,
  hashStream,
  crc32,
  checksum,
  compare,
  uuid5,
  randomBytes,
  randomHex,
  randomBase64,
  fingerprint,
};

export const HashFunctionMetadata = {
  md5: {
    description: "Compute MD5 hash of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  sha1: {
    description: "Compute SHA-1 hash of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  sha256: {
    description: "Compute SHA-256 hash of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  sha512: {
    description: "Compute SHA-512 hash of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  sha3: {
    description: "Compute SHA-3 hash of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "bits", dataType: "number", formInputType: "number", required: false, description: "Hash bit length: 224, 256 (default), 384, or 512" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  hmac: {
    description: "Compute HMAC of a string with a secret key",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to hash" },
      { name: "key", dataType: "string", formInputType: "text", required: true, description: "The secret key" },
      { name: "algorithm", dataType: "string", formInputType: "text", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  hashFile: {
    description: "Compute the hash of a file's contents",
    parameters: [
      { name: "filePath", dataType: "string", formInputType: "text", required: true, description: "Absolute path to the file" },
      { name: "algorithm", dataType: "string", formInputType: "text", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  hashStream: {
    description: "Compute a hash from an array of data chunks (simulates stream hashing)",
    parameters: [
      { name: "chunks", dataType: "array", formInputType: "json", required: true, description: "Array of strings or buffers to hash" },
      { name: "algorithm", dataType: "string", formInputType: "text", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  crc32: {
    description: "Compute CRC32 checksum of a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to checksum" },
      { name: "asHex", dataType: "boolean", formInputType: "checkbox", required: false, description: "Return as hex string instead of number (default: false)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  checksum: {
    description: "Verify that a string matches an expected hash",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to verify" },
      { name: "expectedHash", dataType: "string", formInputType: "text", required: true, description: "The expected hash value" },
      { name: "algorithm", dataType: "string", formInputType: "text", required: false, description: "Hash algorithm (default: 'sha256')" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  compare: {
    description: "Timing-safe comparison of two strings to prevent timing attacks",
    parameters: [
      { name: "a", dataType: "string", formInputType: "text", required: true, description: "First string" },
      { name: "b", dataType: "string", formInputType: "text", required: true, description: "Second string" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  uuid5: {
    description: "Generate a deterministic UUID v5 from a name and namespace",
    parameters: [
      { name: "name", dataType: "string", formInputType: "text", required: true, description: "The name to generate UUID from" },
      { name: "namespace", dataType: "string", formInputType: "text", required: false, description: "Namespace UUID (default: DNS namespace)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  randomBytes: {
    description: "Generate cryptographically secure random bytes",
    parameters: [
      { name: "size", dataType: "number", formInputType: "number", required: false, description: "Number of bytes (default: 32)" },
      { name: "encoding", dataType: "string", formInputType: "text", required: false, description: "Output encoding: 'hex' (default), 'base64', 'buffer'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  randomHex: {
    description: "Generate a random hexadecimal string of specified length",
    parameters: [
      { name: "length", dataType: "number", formInputType: "number", required: false, description: "Length of hex string (default: 32)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  randomBase64: {
    description: "Generate a random Base64-encoded string",
    parameters: [
      { name: "byteCount", dataType: "number", formInputType: "number", required: false, description: "Number of random bytes (default: 32)" },
      { name: "urlSafe", dataType: "boolean", formInputType: "checkbox", required: false, description: "Use URL-safe Base64 (default: false)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  fingerprint: {
    description: "Generate a content fingerprint combining MD5 and SHA-256 hashes",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The content to fingerprint" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const HashModuleMetadata = {
  description: "Cryptographic hashing utilities: MD5, SHA family, HMAC, CRC32, file hashing, UUID v5 generation, secure random bytes, and content fingerprinting",
  version: "1.0.0",
  tags: ["hash", "crypto", "checksum", "hmac", "uuid", "random", "fingerprint", "security"],
};
