import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { createCipheriv, createDecipheriv, randomBytes, generateKeyPairSync, publicEncrypt, privateDecrypt, createHash, scryptSync } from "node:crypto";

// ── AES ─────────────────────────────────────────────────────────────

const aesEncrypt: BuiltinHandler = (args) => {
  const plaintext = String(args[0] ?? "");
  const password = String(args[1] ?? "");
  const algorithm = String(args[2] ?? "aes-256-gcm");

  const salt = randomBytes(16);
  const key = scryptSync(password, salt, 32);
  const iv = randomBytes(algorithm.includes("gcm") ? 12 : 16);

  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const result: Record<string, string> = {
    encrypted,
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
    algorithm,
  };

  if (algorithm.includes("gcm")) {
    result.tag = (cipher as ReturnType<typeof createCipheriv>).getAuthTag().toString("hex");
  }

  return result;
};

const aesDecrypt: BuiltinHandler = (args) => {
  const data = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, string>;
  const password = String(args[1] ?? "");

  const algorithm = data.algorithm ?? "aes-256-gcm";
  const salt = Buffer.from(data.salt ?? "", "hex");
  const iv = Buffer.from(data.iv ?? "", "hex");
  const key = scryptSync(password, salt, 32);

  const decipher = createDecipheriv(algorithm, key, iv);
  if (algorithm.includes("gcm") && data.tag) {
    (decipher as ReturnType<typeof createDecipheriv>).setAuthTag(Buffer.from(data.tag, "hex"));
  }

  let decrypted = decipher.update(data.encrypted ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const aesEncryptRaw: BuiltinHandler = (args) => {
  const plaintext = String(args[0] ?? "");
  const keyHex = String(args[1] ?? "");
  const algorithm = String(args[2] ?? "aes-256-gcm");

  const key = Buffer.from(keyHex, "hex");
  const iv = randomBytes(algorithm.includes("gcm") ? 12 : 16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const result: Record<string, string> = { encrypted, iv: iv.toString("hex"), algorithm };
  if (algorithm.includes("gcm")) {
    result.tag = (cipher as ReturnType<typeof createCipheriv>).getAuthTag().toString("hex");
  }
  return result;
};

const generateKey: BuiltinHandler = (args) => {
  const bits = parseInt(String(args[0] ?? "256"), 10);
  const bytes = bits / 8;
  return randomBytes(bytes).toString("hex");
};

// ── RSA ─────────────────────────────────────────────────────────────

const rsaGenerateKeys: BuiltinHandler = (args) => {
  const bits = parseInt(String(args[0] ?? "2048"), 10);
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: bits,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  return { publicKey, privateKey };
};

const rsaEncrypt: BuiltinHandler = (args) => {
  const plaintext = String(args[0] ?? "");
  const publicKey = String(args[1] ?? "");
  const encrypted = publicEncrypt(publicKey, Buffer.from(plaintext, "utf8"));
  return encrypted.toString("base64");
};

const rsaDecrypt: BuiltinHandler = (args) => {
  const ciphertext = String(args[0] ?? "");
  const privateKey = String(args[1] ?? "");
  const decrypted = privateDecrypt(privateKey, Buffer.from(ciphertext, "base64"));
  return decrypted.toString("utf8");
};

// ── Hashing Helpers ─────────────────────────────────────────────────

const hash: BuiltinHandler = (args) => {
  const data = String(args[0] ?? "");
  const algorithm = String(args[1] ?? "sha256");
  return createHash(algorithm).update(data).digest("hex");
};

const deriveKey: BuiltinHandler = (args) => {
  const password = String(args[0] ?? "");
  const salt = args[1] != null ? String(args[1]) : randomBytes(16).toString("hex");
  const keyLength = parseInt(String(args[2] ?? "32"), 10);
  const key = scryptSync(password, salt, keyLength);
  return { key: key.toString("hex"), salt };
};

const randomIv: BuiltinHandler = (args) => {
  const bytes = parseInt(String(args[0] ?? "16"), 10);
  return randomBytes(bytes).toString("hex");
};

// ── Exports ─────────────────────────────────────────────────────────

export const EncryptFunctions: Record<string, BuiltinHandler> = {
  aesEncrypt, aesDecrypt, aesEncryptRaw, generateKey, rsaGenerateKeys, rsaEncrypt, rsaDecrypt, hash, deriveKey, randomIv,
};

export const EncryptFunctionMetadata: Record<string, FunctionMetadata> = {
  aesEncrypt: { description: "Encrypt text with AES using a password (auto-generates salt/IV)", parameters: [{ name: "plaintext", dataType: "string", description: "Text to encrypt", formInputType: "text", required: true }, { name: "password", dataType: "string", description: "Encryption password", formInputType: "text", required: true }, { name: "algorithm", dataType: "string", description: "AES algorithm (default aes-256-gcm)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{encrypted, iv, salt, algorithm, tag}", example: 'encrypt.aesEncrypt "secret data" "my-password"' },
  aesDecrypt: { description: "Decrypt AES-encrypted data using a password", parameters: [{ name: "data", dataType: "object", description: "Encrypted data object from aesEncrypt", formInputType: "text", required: true }, { name: "password", dataType: "string", description: "Decryption password", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decrypted plaintext", example: 'encrypt.aesDecrypt $encryptedData "my-password"' },
  aesEncryptRaw: { description: "Encrypt text with a raw hex key (for advanced use)", parameters: [{ name: "plaintext", dataType: "string", description: "Text to encrypt", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Hex-encoded key (32 bytes for AES-256)", formInputType: "text", required: true }, { name: "algorithm", dataType: "string", description: "AES algorithm", formInputType: "text", required: false }], returnType: "object", returnDescription: "{encrypted, iv, algorithm, tag}", example: 'encrypt.aesEncryptRaw "data" $hexKey' },
  generateKey: { description: "Generate a cryptographically secure random key", parameters: [{ name: "bits", dataType: "number", description: "Key size in bits (128, 192, 256)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Hex-encoded random key", example: "encrypt.generateKey 256" },
  rsaGenerateKeys: { description: "Generate an RSA key pair", parameters: [{ name: "bits", dataType: "number", description: "Key size (2048, 4096)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{publicKey, privateKey} in PEM format", example: "encrypt.rsaGenerateKeys 4096" },
  rsaEncrypt: { description: "Encrypt text with an RSA public key", parameters: [{ name: "plaintext", dataType: "string", description: "Text to encrypt", formInputType: "text", required: true }, { name: "publicKey", dataType: "string", description: "PEM-encoded public key", formInputType: "text", required: true }], returnType: "string", returnDescription: "Base64-encoded ciphertext", example: 'encrypt.rsaEncrypt "secret" $publicKey' },
  rsaDecrypt: { description: "Decrypt RSA-encrypted text with a private key", parameters: [{ name: "ciphertext", dataType: "string", description: "Base64-encoded ciphertext", formInputType: "text", required: true }, { name: "privateKey", dataType: "string", description: "PEM-encoded private key", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decrypted plaintext", example: 'encrypt.rsaDecrypt $encrypted $privateKey' },
  hash: { description: "Hash a string (sha256, sha512, md5, etc.)", parameters: [{ name: "data", dataType: "string", description: "Data to hash", formInputType: "text", required: true }, { name: "algorithm", dataType: "string", description: "Hash algorithm (default sha256)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Hex digest", example: 'encrypt.hash "my data" "sha512"' },
  deriveKey: { description: "Derive an encryption key from a password using scrypt", parameters: [{ name: "password", dataType: "string", description: "Password", formInputType: "text", required: true }, { name: "salt", dataType: "string", description: "Salt (auto-generated if omitted)", formInputType: "text", required: false }, { name: "keyLength", dataType: "number", description: "Key length in bytes (default 32)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{key, salt}", example: 'encrypt.deriveKey "my-password"' },
  randomIv: { description: "Generate a random initialization vector", parameters: [{ name: "bytes", dataType: "number", description: "IV size in bytes (default 16)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Hex-encoded IV", example: "encrypt.randomIv 12" },
};

export const EncryptModuleMetadata: ModuleMetadata = {
  description: "AES-256-GCM and RSA encryption/decryption with key generation, password-based key derivation, and hashing",
  methods: ["aesEncrypt", "aesDecrypt", "aesEncryptRaw", "generateKey", "rsaGenerateKeys", "rsaEncrypt", "rsaDecrypt", "hash", "deriveKey", "randomIv"],
};
