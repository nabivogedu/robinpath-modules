import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
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
  return crypto.createHash(algorithm).update(data, "utf8").digest(encoding);
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

function md5(args: unknown[]): unknown {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("md5", input, encoding as "hex" | "base64");
}

function sha1(args: unknown[]): unknown {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha1", input, encoding as "hex" | "base64");
}

function sha256(args: unknown[]): unknown {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha256", input, encoding as "hex" | "base64");
}

function sha512(args: unknown[]): unknown {
  const input = toString(args[0]);
  const encoding = toString(args[1]) || "hex";
  return hashWith("sha512", input, encoding as "hex" | "base64");
}

function sha3(args: unknown[]): unknown {
  const input = toString(args[0]);
  const bits = typeof args[1] === "number" ? args[1] : 256;
  const encoding = toString(args[2]) || "hex";
  const algorithm = `sha3-${bits}`;
  return crypto.createHash(algorithm).update(input, "utf8").digest(encoding as "hex" | "base64");
}

function hmac(args: unknown[]): unknown {
  const input = toString(args[0]);
  const key = toString(args[1]);
  const algorithm = toString(args[2]) || "sha256";
  const encoding = toString(args[3]) || "hex";
  return crypto.createHmac(algorithm, key).update(input, "utf8").digest(encoding as "hex" | "base64");
}

function hashFile(args: unknown[]): unknown {
  const filePath = toString(args[0]);
  const algorithm = toString(args[1]) || "sha256";
  const encoding = toString(args[2]) || "hex";
  const content = fs.readFileSync(filePath);
  return crypto.createHash(algorithm).update(content).digest(encoding as "hex" | "base64");
}

function hashStream(args: unknown[]): unknown {
  // For stream hashing, accept chunks as an array of strings/buffers
  const chunks = args[0];
  const algorithm = toString(args[1]) || "sha256";
  const encoding = toString(args[2]) || "hex";
  const hash = crypto.createHash(algorithm);
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

function crc32(args: unknown[]): unknown {
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

function checksum(args: unknown[]): unknown {
  const input = toString(args[0]);
  const expectedHash = toString(args[1]);
  const algorithm = toString(args[2]) || "sha256";
  const actual = hashWith(algorithm, input);
  return actual.toLowerCase() === expectedHash.toLowerCase();
}

function compare(args: unknown[]): unknown {
  const a = toString(args[0]);
  const b = toString(args[1]);
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

function uuid5(args: unknown[]): unknown {
  const name = toString(args[0]);
  const namespace = toString(args[1]) || "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // DNS namespace
  // Parse namespace UUID to bytes
  const nsHex = namespace.replace(/-/g, "");
  const nsBytes = Buffer.from(nsHex, "hex");
  const nameBytes = Buffer.from(name, "utf8");
  const combined = Buffer.concat([nsBytes, nameBytes]);
  const hash = crypto.createHash("sha1").update(combined).digest();
  // Set version 5
  hash[6] = (hash[6] & 0x0f) | 0x50;
  // Set variant
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.toString("hex").slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function randomBytes(args: unknown[]): unknown {
  const size = typeof args[0] === "number" ? args[0] : 32;
  const encoding = toString(args[1]) || "hex";
  const buf = crypto.randomBytes(size);
  if (encoding === "buffer" || encoding === "raw") {
    return Array.from(buf);
  }
  return buf.toString(encoding as BufferEncoding);
}

function randomHex(args: unknown[]): unknown {
  const length = typeof args[0] === "number" ? args[0] : 32;
  const byteCount = Math.ceil(length / 2);
  return crypto.randomBytes(byteCount).toString("hex").slice(0, length);
}

function randomBase64(args: unknown[]): unknown {
  const byteCount = typeof args[0] === "number" ? args[0] : 32;
  const urlSafe = !!args[1];
  const buf = crypto.randomBytes(byteCount);
  return urlSafe ? buf.toString("base64url") : buf.toString("base64");
}

function fingerprint(args: unknown[]): unknown {
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

export const HashFunctions: Record<string, BuiltinHandler> = {
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

export const HashFunctionMetadata: Record<string, FunctionMetadata> = {
  md5: {
    description: "Compute MD5 hash of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "MD5 hash" },
  },
  sha1: {
    description: "Compute SHA-1 hash of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "SHA-1 hash" },
  },
  sha256: {
    description: "Compute SHA-256 hash of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "SHA-256 hash" },
  },
  sha512: {
    description: "Compute SHA-512 hash of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "SHA-512 hash" },
  },
  sha3: {
    description: "Compute SHA-3 hash of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "bits", type: "number", required: false, description: "Hash bit length: 224, 256 (default), 384, or 512" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "SHA-3 hash" },
  },
  hmac: {
    description: "Compute HMAC of a string with a secret key",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to hash" },
      { name: "key", type: "string", required: true, description: "The secret key" },
      { name: "algorithm", type: "string", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "HMAC hash" },
  },
  hashFile: {
    description: "Compute the hash of a file's contents",
    parameters: [
      { name: "filePath", type: "string", required: true, description: "Absolute path to the file" },
      { name: "algorithm", type: "string", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "File hash" },
  },
  hashStream: {
    description: "Compute a hash from an array of data chunks (simulates stream hashing)",
    parameters: [
      { name: "chunks", type: "array", required: true, description: "Array of strings or buffers to hash" },
      { name: "algorithm", type: "string", required: false, description: "Hash algorithm (default: 'sha256')" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default) or 'base64'" },
    ],
    returns: { type: "string", description: "Hash of all chunks combined" },
  },
  crc32: {
    description: "Compute CRC32 checksum of a string",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to checksum" },
      { name: "asHex", type: "boolean", required: false, description: "Return as hex string instead of number (default: false)" },
    ],
    returns: { type: "number|string", description: "CRC32 checksum" },
  },
  checksum: {
    description: "Verify that a string matches an expected hash",
    parameters: [
      { name: "input", type: "string", required: true, description: "The string to verify" },
      { name: "expectedHash", type: "string", required: true, description: "The expected hash value" },
      { name: "algorithm", type: "string", required: false, description: "Hash algorithm (default: 'sha256')" },
    ],
    returns: { type: "boolean", description: "True if the hash matches" },
  },
  compare: {
    description: "Timing-safe comparison of two strings to prevent timing attacks",
    parameters: [
      { name: "a", type: "string", required: true, description: "First string" },
      { name: "b", type: "string", required: true, description: "Second string" },
    ],
    returns: { type: "boolean", description: "True if the strings are equal" },
  },
  uuid5: {
    description: "Generate a deterministic UUID v5 from a name and namespace",
    parameters: [
      { name: "name", type: "string", required: true, description: "The name to generate UUID from" },
      { name: "namespace", type: "string", required: false, description: "Namespace UUID (default: DNS namespace)" },
    ],
    returns: { type: "string", description: "UUID v5 string" },
  },
  randomBytes: {
    description: "Generate cryptographically secure random bytes",
    parameters: [
      { name: "size", type: "number", required: false, description: "Number of bytes (default: 32)" },
      { name: "encoding", type: "string", required: false, description: "Output encoding: 'hex' (default), 'base64', 'buffer'" },
    ],
    returns: { type: "string|array", description: "Random bytes in requested encoding" },
  },
  randomHex: {
    description: "Generate a random hexadecimal string of specified length",
    parameters: [
      { name: "length", type: "number", required: false, description: "Length of hex string (default: 32)" },
    ],
    returns: { type: "string", description: "Random hex string" },
  },
  randomBase64: {
    description: "Generate a random Base64-encoded string",
    parameters: [
      { name: "byteCount", type: "number", required: false, description: "Number of random bytes (default: 32)" },
      { name: "urlSafe", type: "boolean", required: false, description: "Use URL-safe Base64 (default: false)" },
    ],
    returns: { type: "string", description: "Random Base64 string" },
  },
  fingerprint: {
    description: "Generate a content fingerprint combining MD5 and SHA-256 hashes",
    parameters: [
      { name: "input", type: "string", required: true, description: "The content to fingerprint" },
    ],
    returns: { type: "object", description: "Object with md5, sha256, fingerprint, and length fields" },
  },
};

export const HashModuleMetadata: ModuleMetadata = {
  name: "hash",
  description: "Cryptographic hashing utilities: MD5, SHA family, HMAC, CRC32, file hashing, UUID v5 generation, secure random bytes, and content fingerprinting",
  version: "1.0.0",
  tags: ["hash", "crypto", "checksum", "hmac", "uuid", "random", "fingerprint", "security"],
};
