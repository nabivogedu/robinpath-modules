import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { randomUUID, createHash } from "node:crypto";

// -- Helpers ----------------------------------------------------------------

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Convert a UUID string (with hyphens) to a 16-byte Buffer.
 */
function uuidToBytes(uuid: string): Buffer {
  return Buffer.from(uuid.replace(/-/g, ""), "hex");
}

/**
 * Convert a 16-byte Buffer to a UUID string (with hyphens).
 */
function bytesToUuid(buf: Buffer): string {
  const hex = buf.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

// -- RobinPath Function Handlers --------------------------------------------

const v4: BuiltinHandler = async (_args) => {
  return randomUUID();
};

const v5: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const namespace = String(args[1] ?? "");

  if (!UUID_REGEX.test(namespace)) {
    throw new Error(`Invalid namespace UUID: ${namespace}`);
  }

  const nsBytes = uuidToBytes(namespace);
  const nameBytes = Buffer.from(name, "utf-8");

  const hash = createHash("sha1").update(nsBytes).update(nameBytes).digest();

  // Set version 5 — high nibble of byte 6
  hash[6] = (hash[6] & 0x0f) | 0x50;
  // Set variant 10xx — high bits of byte 8
  hash[8] = (hash[8] & 0x3f) | 0x80;

  // UUID v5 uses only the first 16 bytes of the SHA-1 digest
  return bytesToUuid(hash.subarray(0, 16));
};

const isValid: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  return UUID_REGEX.test(value);
};

const version: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  if (!UUID_REGEX.test(value)) {
    throw new Error(`Invalid UUID: ${value}`);
  }
  // The version nibble is the first hex digit of the third group (index 14 in the no-hyphen hex string)
  const versionNibble = parseInt(value.replace(/-/g, "")[12], 16);
  return versionNibble;
};

const parse: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  if (!UUID_REGEX.test(value)) {
    throw new Error(`Invalid UUID: ${value}`);
  }

  const hex = value.replace(/-/g, "");
  const versionNibble = parseInt(hex[12], 16);

  // Variant is determined by the high bits of byte 8 (hex chars at index 16-17)
  const variantByte = parseInt(hex.slice(16, 18), 16);
  let variant: string;
  if ((variantByte & 0x80) === 0) {
    variant = "NCS";
  } else if ((variantByte & 0xc0) === 0x80) {
    variant = "RFC4122";
  } else if ((variantByte & 0xe0) === 0xc0) {
    variant = "Microsoft";
  } else {
    variant = "Future";
  }

  return {
    version: versionNibble,
    variant,
    time: null,
    bytes: hex.toLowerCase(),
  };
};

const generate: BuiltinHandler = async (args) => {
  const count = Math.max(1, Math.floor(Number(args[0] ?? 1)));
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(randomUUID());
  }
  return result;
};

const nil: BuiltinHandler = (_args) => {
  return "00000000-0000-0000-0000-000000000000";
};

// -- Exports ----------------------------------------------------------------

export const UuidFunctions: Record<string, BuiltinHandler> = {
  v4,
  v5,
  isValid,
  version,
  parse,
  generate,
  nil,
};

export const UuidFunctionMetadata = {
  v4: {
    description: "Generate a random UUID v4",
    parameters: [],
    returnType: "string",
    returnDescription: "A random UUID v4 string",
    example: "uuid.v4",
  },
  v5: {
    description: "Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "The name to hash into the UUID",
        formInputType: "text",
        required: true,
      },
      {
        name: "namespace",
        dataType: "string",
        description: "The namespace UUID (e.g. a well-known DNS or URL namespace)",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "A deterministic UUID v5 string",
    example: 'uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"',
  },
  isValid: {
    description: "Check whether a string is a valid UUID format",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to validate",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string matches the UUID pattern",
    example: 'uuid.isValid "550e8400-e29b-41d4-a716-446655440000"',
  },
  version: {
    description: "Extract the version number from a UUID string",
    parameters: [
      {
        name: "uuid",
        dataType: "string",
        description: "A valid UUID string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The UUID version number (1-5)",
    example: 'uuid.version "550e8400-e29b-41d4-a716-446655440000"',
  },
  parse: {
    description: "Parse a UUID into its component parts (version, variant, time, bytes)",
    parameters: [
      {
        name: "uuid",
        dataType: "string",
        description: "A valid UUID string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object with version, variant, time (null for non-v1), and bytes (hex string of 16 bytes)",
    example: 'uuid.parse "550e8400-e29b-41d4-a716-446655440000"',
  },
  generate: {
    description: "Generate one or more random UUID v4 strings",
    parameters: [
      {
        name: "count",
        dataType: "number",
        description: "The number of UUIDs to generate (default 1)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "array",
    returnDescription: "An array of random UUID v4 strings",
    example: "uuid.generate 5",
  },
  nil: {
    description: "Return the nil UUID (all zeros)",
    parameters: [],
    returnType: "string",
    returnDescription: 'The nil UUID "00000000-0000-0000-0000-000000000000"',
    example: "uuid.nil",
  },
};

export const UuidModuleMetadata = {
  description: "UUID generation, parsing, and validation utilities (v4, v5, nil)",
  methods: [
    "v4",
    "v5",
    "isValid",
    "version",
    "parse",
    "generate",
    "nil",
  ],
};
