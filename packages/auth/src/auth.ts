import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

// ── Function Handlers ───────────────────────────────────────────────

const basic: BuiltinHandler = (args) => {
  const username = String(args[0] ?? "");
  const password = String(args[1] ?? "");
  const encoded = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${encoded}`;
};

const parseBasic: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const match = header.match(/^Basic\s+(.+)$/i);
  if (!match) throw new Error("Invalid Basic auth header");

  const decoded = Buffer.from(match[1]!, "base64").toString("utf-8");
  const colonIndex = decoded.indexOf(":");
  if (colonIndex === -1) throw new Error("Invalid Basic auth credentials");

  return {
    username: decoded.substring(0, colonIndex),
    password: decoded.substring(colonIndex + 1),
  };
};

const bearer: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  return `Bearer ${token}`;
};

const parseBearer: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error("Invalid Bearer auth header");
  return match[1]!;
};

const apiKey: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const placement = String(args[1] ?? "header");
  const name = String(args[2] ?? "X-API-Key");

  if (placement === "header") {
    return { type: "header", name, value: key };
  }
  if (placement === "query") {
    return { type: "query", name, value: key };
  }
  throw new Error(`Invalid placement: "${placement}". Use "header" or "query".`);
};

const hmacSign: BuiltinHandler = (args) => {
  const payload = String(args[0] ?? "");
  const secret = String(args[1] ?? "");
  const algorithm = String(args[2] ?? "sha256");

  const signature = createHmac(algorithm, secret).update(payload).digest("hex");
  return signature;
};

const hmacVerify: BuiltinHandler = (args) => {
  const payload = String(args[0] ?? "");
  const secret = String(args[1] ?? "");
  const signature = String(args[2] ?? "");
  const algorithm = String(args[3] ?? "sha256");

  const expected = createHmac(algorithm, secret).update(payload).digest("hex");

  // Use timing-safe comparison to prevent timing attacks
  if (expected.length !== signature.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
};

const generateApiKey: BuiltinHandler = (args) => {
  const length = parseInt(String(args[0] ?? "32"), 10);
  const prefix = args[1] != null ? String(args[1]) : "";
  const key = randomBytes(length).toString("hex");
  return prefix ? `${prefix}_${key}` : key;
};

const hashPassword: BuiltinHandler = async (args) => {
  const password = String(args[0] ?? "");
  const salt = randomBytes(16).toString("hex");
  const iterations = parseInt(String(args[1] ?? "100000"), 10);

  // Use PBKDF2 via crypto
  const { pbkdf2 } = await import("node:crypto");
  return new Promise<string>((resolve, reject) => {
    pbkdf2(password, salt, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`${salt}:${iterations}:${derivedKey.toString("hex")}`);
    });
  });
};

const verifyPassword: BuiltinHandler = async (args) => {
  const password = String(args[0] ?? "");
  const hash = String(args[1] ?? "");

  const parts = hash.split(":");
  if (parts.length !== 3) throw new Error("Invalid hash format. Expected salt:iterations:hash");

  const [salt, iterStr, storedHash] = parts as [string, string, string];
  const iterations = parseInt(iterStr, 10);

  const { pbkdf2 } = await import("node:crypto");
  return new Promise<boolean>((resolve, reject) => {
    pbkdf2(password, salt, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      else {
        const derived = derivedKey.toString("hex");
        try {
          resolve(timingSafeEqual(Buffer.from(derived), Buffer.from(storedHash)));
        } catch {
          resolve(false);
        }
      }
    });
  });
};

const buildAuthHeader: BuiltinHandler = (args) => {
  const type = String(args[0] ?? "").toLowerCase();
  const value = args[1];

  switch (type) {
    case "basic": {
      const creds = value as { username?: string; password?: string } | string;
      if (typeof creds === "string") return `Basic ${Buffer.from(creds).toString("base64")}`;
      return `Basic ${Buffer.from(`${creds.username ?? ""}:${creds.password ?? ""}`).toString("base64")}`;
    }
    case "bearer":
      return `Bearer ${String(value ?? "")}`;
    case "apikey":
    case "api-key":
      return String(value ?? "");
    default:
      return `${type} ${String(value ?? "")}`;
  }
};

const parseAuthHeader: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const spaceIndex = header.indexOf(" ");
  if (spaceIndex === -1) return { scheme: header.toLowerCase(), credentials: "" };

  const scheme = header.substring(0, spaceIndex).toLowerCase();
  const credentials = header.substring(spaceIndex + 1);

  if (scheme === "basic") {
    try {
      const decoded = Buffer.from(credentials, "base64").toString("utf-8");
      const colonIndex = decoded.indexOf(":");
      return {
        scheme,
        username: colonIndex >= 0 ? decoded.substring(0, colonIndex) : decoded,
        password: colonIndex >= 0 ? decoded.substring(colonIndex + 1) : "",
      };
    } catch {
      return { scheme, credentials };
    }
  }

  return { scheme, token: credentials };
};

// ── Exports ─────────────────────────────────────────────────────────

export const AuthFunctions: Record<string, BuiltinHandler> = {
  basic,
  parseBasic,
  bearer,
  parseBearer,
  apiKey,
  hmacSign,
  hmacVerify,
  generateApiKey,
  hashPassword,
  verifyPassword,
  buildAuthHeader,
  parseAuthHeader,
};

export const AuthFunctionMetadata: Record<string, FunctionMetadata> = {
  basic: {
    description: "Create a Basic authentication header from username and password",
    parameters: [
      { name: "username", dataType: "string", description: "Username", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "Password", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Basic auth header string (e.g. 'Basic dXNlcjpwYXNz')",
    example: 'auth.basic "user" "pass"',
  },
  parseBasic: {
    description: "Parse a Basic auth header to extract username and password",
    parameters: [
      { name: "header", dataType: "string", description: "The Authorization header value", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{username, password}",
    example: 'auth.parseBasic "Basic dXNlcjpwYXNz"',
  },
  bearer: {
    description: "Create a Bearer authentication header from a token",
    parameters: [
      { name: "token", dataType: "string", description: "The bearer token", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Bearer auth header string",
    example: 'auth.bearer "eyJhbGciOi..."',
  },
  parseBearer: {
    description: "Extract the token from a Bearer auth header",
    parameters: [
      { name: "header", dataType: "string", description: "The Authorization header value", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "The extracted token string",
    example: 'auth.parseBearer "Bearer eyJhbGciOi..."',
  },
  apiKey: {
    description: "Create an API key configuration for header or query parameter placement",
    parameters: [
      { name: "key", dataType: "string", description: "The API key value", formInputType: "text", required: true },
      { name: "placement", dataType: "string", description: "'header' or 'query' (default: header)", formInputType: "text", required: false },
      { name: "name", dataType: "string", description: "Header or query param name (default: X-API-Key)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{type, name, value} object for use in HTTP requests",
    example: 'auth.apiKey "sk-abc123" "header" "Authorization"',
  },
  hmacSign: {
    description: "Create an HMAC signature for a payload",
    parameters: [
      { name: "payload", dataType: "string", description: "The payload to sign", formInputType: "text", required: true },
      { name: "secret", dataType: "string", description: "The secret key", formInputType: "text", required: true },
      { name: "algorithm", dataType: "string", description: "Hash algorithm (default: sha256)", formInputType: "text", required: false },
    ],
    returnType: "string",
    returnDescription: "Hex-encoded HMAC signature",
    example: 'auth.hmacSign "payload" "secret" "sha256"',
  },
  hmacVerify: {
    description: "Verify an HMAC signature using timing-safe comparison",
    parameters: [
      { name: "payload", dataType: "string", description: "The original payload", formInputType: "text", required: true },
      { name: "secret", dataType: "string", description: "The secret key", formInputType: "text", required: true },
      { name: "signature", dataType: "string", description: "The hex signature to verify", formInputType: "text", required: true },
      { name: "algorithm", dataType: "string", description: "Hash algorithm (default: sha256)", formInputType: "text", required: false },
    ],
    returnType: "boolean",
    returnDescription: "True if the signature is valid",
    example: 'auth.hmacVerify "payload" "secret" "abc123def..."',
  },
  generateApiKey: {
    description: "Generate a cryptographically secure random API key",
    parameters: [
      { name: "length", dataType: "number", description: "Key length in bytes (default 32)", formInputType: "text", required: false },
      { name: "prefix", dataType: "string", description: "Optional prefix (e.g. 'sk', 'pk')", formInputType: "text", required: false },
    ],
    returnType: "string",
    returnDescription: "Random hex API key, optionally prefixed",
    example: 'auth.generateApiKey 32 "sk"',
  },
  hashPassword: {
    description: "Hash a password using PBKDF2 with a random salt",
    parameters: [
      { name: "password", dataType: "string", description: "The password to hash", formInputType: "text", required: true },
      { name: "iterations", dataType: "number", description: "PBKDF2 iterations (default 100000)", formInputType: "text", required: false },
    ],
    returnType: "string",
    returnDescription: "Hash string in format salt:iterations:hash",
    example: 'auth.hashPassword "my-secret-password"',
  },
  verifyPassword: {
    description: "Verify a password against a PBKDF2 hash (timing-safe)",
    parameters: [
      { name: "password", dataType: "string", description: "The password to verify", formInputType: "text", required: true },
      { name: "hash", dataType: "string", description: "The stored hash (salt:iterations:hash)", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the password matches the hash",
    example: 'auth.verifyPassword "my-secret-password" $storedHash',
  },
  buildAuthHeader: {
    description: "Build an Authorization header from a type and credentials",
    parameters: [
      { name: "type", dataType: "string", description: "Auth type: basic, bearer, apikey", formInputType: "text", required: true },
      { name: "value", dataType: "any", description: "Token string or {username, password} for basic", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Complete Authorization header value",
    example: 'auth.buildAuthHeader "bearer" $token',
  },
  parseAuthHeader: {
    description: "Parse any Authorization header into its scheme and credentials",
    parameters: [
      { name: "header", dataType: "string", description: "The Authorization header value", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with scheme and decoded credentials",
    example: 'auth.parseAuthHeader $header',
  },
};

export const AuthModuleMetadata: ModuleMetadata = {
  description: "API authentication helpers: Basic, Bearer, API key, HMAC signing, and password hashing",
  methods: ["basic", "parseBasic", "bearer", "parseBearer", "apiKey", "hmacSign", "hmacVerify", "generateApiKey", "hashPassword", "verifyPassword", "buildAuthHeader", "parseAuthHeader"],
};
