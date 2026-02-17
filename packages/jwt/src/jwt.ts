import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { createHmac, timingSafeEqual } from "node:crypto";

// -- Base64url helpers ------------------------------------------------------

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf-8") : input;
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlDecode(input: string): Buffer {
  let str = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4;
  if (pad === 2) str += "==";
  else if (pad === 3) str += "=";
  return Buffer.from(str, "base64");
}

// -- Algorithm mapping ------------------------------------------------------

type JwtAlgorithm = "HS256" | "HS384" | "HS512";

const algorithmToHash: Record<JwtAlgorithm, string> = {
  HS256: "sha256",
  HS384: "sha384",
  HS512: "sha512",
};

// -- Internal helpers -------------------------------------------------------

function createSignature(input: string, secret: string, algorithm: JwtAlgorithm): string {
  const hash = algorithmToHash[algorithm];
  if (!hash) {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
  const hmac = createHmac(hash, secret);
  hmac.update(input);
  return base64UrlEncode(hmac.digest());
}

function decodeToken(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string } {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT: token must have three parts separated by dots");
  }
  const header = JSON.parse(base64UrlDecode(parts[0]).toString("utf-8")) as Record<string, unknown>;
  const payload = JSON.parse(base64UrlDecode(parts[1]).toString("utf-8")) as Record<string, unknown>;
  const signature = parts[2];
  return { header, payload, signature };
}

// -- RobinPath Function Handlers --------------------------------------------

const sign: BuiltinHandler = async (args) => {
  const payload = args[0] as Record<string, unknown> | undefined;
  if (!payload || typeof payload !== "object") {
    throw new Error("jwt.sign: first argument must be a payload object");
  }
  const secret = String(args[1] ?? "");
  if (!secret) {
    throw new Error("jwt.sign: second argument must be a non-empty secret string");
  }
  const options = (args[2] ?? {}) as { algorithm?: JwtAlgorithm; expiresIn?: number };
  const algorithm: JwtAlgorithm = options.algorithm ?? "HS256";

  if (!algorithmToHash[algorithm]) {
    throw new Error(`jwt.sign: unsupported algorithm "${algorithm}". Supported: HS256, HS384, HS512`);
  }

  const now = Math.floor(Date.now() / 1000);
  const claims: Record<string, unknown> = { ...payload, iat: now };

  if (options.expiresIn != null) {
    claims.exp = now + options.expiresIn;
  }

  const header = { alg: algorithm, typ: "JWT" };
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(claims));
  const signingInput = `${headerEncoded}.${payloadEncoded}`;
  const signature = createSignature(signingInput, secret, algorithm);

  return `${signingInput}.${signature}`;
};

const verify: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.verify: first argument must be a JWT token string");
  }
  const secret = String(args[1] ?? "");
  if (!secret) {
    throw new Error("jwt.verify: second argument must be a non-empty secret string");
  }
  const options = (args[2] ?? {}) as { algorithms?: string[] };

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("jwt.verify: invalid JWT — token must have three parts");
  }

  const { header, payload } = decodeToken(token);
  const algorithm = header.alg as JwtAlgorithm;

  if (!algorithmToHash[algorithm]) {
    throw new Error(`jwt.verify: unsupported algorithm "${algorithm}"`);
  }

  if (options.algorithms && options.algorithms.length > 0) {
    if (!options.algorithms.includes(algorithm)) {
      throw new Error(`jwt.verify: algorithm "${algorithm}" is not in the allowed list: ${options.algorithms.join(", ")}`);
    }
  }

  const signingInput = `${parts[0]}.${parts[1]}`;
  const expectedSignature = createSignature(signingInput, secret, algorithm);

  const sigBuffer = Buffer.from(parts[2], "utf-8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf-8");

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    throw new Error("jwt.verify: invalid signature");
  }

  if (typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000);
    if (now >= payload.exp) {
      throw new Error("jwt.verify: token has expired");
    }
  }

  return payload;
};

const decode: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.decode: first argument must be a JWT token string");
  }
  const { header, payload, signature } = decodeToken(token);
  return { header, payload, signature };
};

const getHeader: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.getHeader: first argument must be a JWT token string");
  }
  const { header } = decodeToken(token);
  return header;
};

const getPayload: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.getPayload: first argument must be a JWT token string");
  }
  const { payload } = decodeToken(token);
  return payload;
};

const isExpired: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.isExpired: first argument must be a JWT token string");
  }
  const { payload } = decodeToken(token);
  if (typeof payload.exp !== "number") {
    return false;
  }
  const now = Math.floor(Date.now() / 1000);
  return now >= payload.exp;
};

const getExpiration: BuiltinHandler = async (args) => {
  const token = String(args[0] ?? "");
  if (!token) {
    throw new Error("jwt.getExpiration: first argument must be a JWT token string");
  }
  const { payload } = decodeToken(token);
  if (typeof payload.exp === "number") {
    return payload.exp;
  }
  return null;
};

// -- Exports ----------------------------------------------------------------

export const JwtFunctions: Record<string, BuiltinHandler> = {
  sign,
  verify,
  decode,
  getHeader,
  getPayload,
  isExpired,
  getExpiration,
};

export const JwtFunctionMetadata = {
  sign: {
    description: "Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512)",
    parameters: [
      {
        name: "payload",
        dataType: "object",
        description: "The claims object to encode in the JWT",
        formInputType: "text",
        required: true,
      },
      {
        name: "secret",
        dataType: "string",
        description: "The HMAC secret key used to sign the token",
        formInputType: "text",
        required: true,
      },
      {
        name: "options",
        dataType: "object",
        description: "Optional settings: { algorithm: \"HS256\"|\"HS384\"|\"HS512\", expiresIn: seconds }",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "string",
    returnDescription: "The signed JWT token string (header.payload.signature)",
    example: 'jwt.sign {"sub":"1234","name":"Alice"} "my-secret" {"expiresIn":3600}',
  },
  verify: {
    description: "Verify a JWT token signature and expiration, returning the decoded payload",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string to verify",
        formInputType: "text",
        required: true,
      },
      {
        name: "secret",
        dataType: "string",
        description: "The HMAC secret key used to verify the token signature",
        formInputType: "text",
        required: true,
      },
      {
        name: "options",
        dataType: "object",
        description: "Optional settings: { algorithms: [\"HS256\",\"HS384\",\"HS512\"] }",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "object",
    returnDescription: "The decoded payload object if the token is valid",
    example: 'jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"',
  },
  decode: {
    description: "Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only)",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string to decode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object containing { header, payload, signature }",
    example: 'jwt.decode "eyJhbGciOiJIUzI1NiJ9..."',
  },
  getHeader: {
    description: "Extract and decode the header from a JWT token (no verification)",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "The decoded header object (e.g. { alg: \"HS256\", typ: \"JWT\" })",
    example: 'jwt.getHeader "eyJhbGciOiJIUzI1NiJ9..."',
  },
  getPayload: {
    description: "Extract and decode the payload from a JWT token without verification",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "The decoded payload object with all claims",
    example: 'jwt.getPayload "eyJhbGciOiJIUzI1NiJ9..."',
  },
  isExpired: {
    description: "Check whether a JWT token has expired based on its exp claim",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the token is expired, false if it is still valid or has no exp claim",
    example: 'jwt.isExpired "eyJhbGciOiJIUzI1NiJ9..."',
  },
  getExpiration: {
    description: "Get the expiration timestamp (exp claim) from a JWT token",
    parameters: [
      {
        name: "token",
        dataType: "string",
        description: "The JWT token string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The exp timestamp as a number (Unix epoch seconds), or null if not set",
    example: 'jwt.getExpiration "eyJhbGciOiJIUzI1NiJ9..."',
  },
};

export const JwtModuleMetadata = {
  description: "JWT (JSON Web Token) creation, signing, verification, and decoding using HMAC (HS256, HS384, HS512)",
  methods: [
    "sign",
    "verify",
    "decode",
    "getHeader",
    "getPayload",
    "isExpired",
    "getExpiration",
  ],
};
