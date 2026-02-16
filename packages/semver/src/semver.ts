import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Types ─────────────────────────────────────────────────────────

interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
  build: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────

const SEMVER_RE =
  /^v?(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([\w.]+))?(?:\+([\w.]+))?$/;

function parseSemVer(input: unknown): SemVer {
  const raw = String(input ?? "").trim();
  const m = SEMVER_RE.exec(raw);
  if (!m) {
    throw new Error(`Invalid semver version: ${raw}`);
  }
  return {
    major: Number(m[1]),
    minor: m[2] !== undefined ? Number(m[2]) : 0,
    patch: m[3] !== undefined ? Number(m[3]) : 0,
    prerelease: m[4] ?? null,
    build: m[5] ?? null,
  };
}

function isValidSemVer(input: unknown): boolean {
  try {
    parseSemVer(input);
    return true;
  } catch {
    return false;
  }
}

function formatSemVer(v: SemVer): string {
  let s = `${v.major}.${v.minor}.${v.patch}`;
  if (v.prerelease !== null) s += `-${v.prerelease}`;
  if (v.build !== null) s += `+${v.build}`;
  return s;
}

/**
 * Compare two prerelease strings according to semver spec.
 * A version without prerelease has higher precedence than one with prerelease.
 * Identifiers are compared left-to-right; numeric identifiers are compared as
 * integers, alphanumeric identifiers are compared lexically. A shorter set of
 * identifiers has lower precedence if all preceding identifiers are equal.
 */
function comparePre(a: string | null, b: string | null): number {
  // Both have no prerelease => equal
  if (a === null && b === null) return 0;
  // No prerelease > has prerelease
  if (a === null) return 1;
  if (b === null) return -1;

  const aParts = a.split(".");
  const bParts = b.split(".");
  const len = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < len; i++) {
    const ap = aParts[i];
    const bp = bParts[i];

    // Fewer fields => lower precedence
    if (ap === undefined && bp !== undefined) return -1;
    if (ap !== undefined && bp === undefined) return 1;

    const aNum = /^\d+$/.test(ap!) ? Number(ap) : null;
    const bNum = /^\d+$/.test(bp!) ? Number(bp) : null;

    // Both numeric
    if (aNum !== null && bNum !== null) {
      if (aNum < bNum) return -1;
      if (aNum > bNum) return 1;
      continue;
    }
    // Numeric < string
    if (aNum !== null) return -1;
    if (bNum !== null) return 1;
    // Both string
    if (ap! < bp!) return -1;
    if (ap! > bp!) return 1;
  }
  return 0;
}

/**
 * Full semver comparison (ignoring build metadata per spec).
 * Returns -1, 0, or 1.
 */
function compareSemVer(a: SemVer, b: SemVer): -1 | 0 | 1 {
  if (a.major !== b.major) return a.major < b.major ? -1 : 1;
  if (a.minor !== b.minor) return a.minor < b.minor ? -1 : 1;
  if (a.patch !== b.patch) return a.patch < b.patch ? -1 : 1;
  const preCmp = comparePre(a.prerelease, b.prerelease);
  if (preCmp < 0) return -1;
  if (preCmp > 0) return 1;
  return 0;
}

// ── Range satisfaction ─────────────────────────────────────────────

type Comparator = (v: SemVer) => boolean;

function parseComparator(raw: string): Comparator {
  const s = raw.trim();
  if (!s || s === "*") return () => true;

  // Tilde ranges: ~1.2.3 means >=1.2.3 <1.3.0; ~1.2 means >=1.2.0 <1.3.0
  if (s.startsWith("~")) {
    const v = parseSemVer(s.slice(1));
    return (t) =>
      compareSemVer(t, { major: v.major, minor: v.minor, patch: v.patch, prerelease: v.prerelease, build: null }) >= 0 &&
      compareSemVer(t, { major: v.major, minor: v.minor + 1, patch: 0, prerelease: "0", build: null }) < 0;
  }

  // Caret ranges: ^1.2.3 means >=1.2.3 <2.0.0; ^0.2.3 means >=0.2.3 <0.3.0; ^0.0.3 means >=0.0.3 <0.0.4
  if (s.startsWith("^")) {
    const v = parseSemVer(s.slice(1));
    let upper: SemVer;
    if (v.major !== 0) {
      upper = { major: v.major + 1, minor: 0, patch: 0, prerelease: "0", build: null };
    } else if (v.minor !== 0) {
      upper = { major: 0, minor: v.minor + 1, patch: 0, prerelease: "0", build: null };
    } else {
      upper = { major: 0, minor: 0, patch: v.patch + 1, prerelease: "0", build: null };
    }
    return (t) =>
      compareSemVer(t, { major: v.major, minor: v.minor, patch: v.patch, prerelease: v.prerelease, build: null }) >= 0 &&
      compareSemVer(t, upper) < 0;
  }

  // Hyphen ranges: 1.2.3 - 2.3.4  =>  >=1.2.3 <=2.3.4
  if (s.includes(" - ")) {
    const [lo, hi] = s.split(" - ").map((p) => parseSemVer(p.trim()));
    return (t) => compareSemVer(t, lo!) >= 0 && compareSemVer(t, hi!) <= 0;
  }

  // Operators: >=, <=, >, <, =
  const opMatch = /^(>=|<=|>|<|=)\s*(.+)$/.exec(s);
  if (opMatch) {
    const op = opMatch[1]!;
    const v = parseSemVer(opMatch[2]!);
    switch (op) {
      case ">=": return (t) => compareSemVer(t, v) >= 0;
      case "<=": return (t) => compareSemVer(t, v) <= 0;
      case ">":  return (t) => compareSemVer(t, v) > 0;
      case "<":  return (t) => compareSemVer(t, v) < 0;
      case "=":  return (t) => compareSemVer(t, v) === 0;
    }
  }

  // X-ranges: 1.x, 1.2.x, 1.*, 1.2.*
  const xMatch = /^(\d+)(?:\.(x|\*|\d+))?(?:\.(x|\*|\d+))?$/.exec(s);
  if (xMatch) {
    const maj = Number(xMatch[1]);
    const minRaw = xMatch[2];
    const patRaw = xMatch[3];

    if (minRaw === undefined || minRaw === "x" || minRaw === "*") {
      // 1.x or 1.* => >=1.0.0 <2.0.0
      return (t) => t.major === maj;
    }
    const min = Number(minRaw);
    if (patRaw === undefined || patRaw === "x" || patRaw === "*") {
      // 1.2.x => >=1.2.0 <1.3.0
      return (t) => t.major === maj && t.minor === min;
    }
    // Exact match
    const pat = Number(patRaw);
    const exact: SemVer = { major: maj, minor: min, patch: pat, prerelease: null, build: null };
    return (t) => compareSemVer(t, exact) === 0;
  }

  // Plain version (exact match)
  const v = parseSemVer(s);
  return (t) => compareSemVer(t, v) === 0;
}

function satisfiesRange(version: SemVer, range: string): boolean {
  // Split on || for union ranges
  const orParts = range.split("||").map((p) => p.trim());
  return orParts.some((orPart) => {
    // Within an OR-group, split on whitespace for intersection (AND)
    // But first handle hyphen ranges (they contain spaces around " - ")
    if (orPart.includes(" - ")) {
      return parseComparator(orPart)(version);
    }
    const andParts = orPart.split(/\s+/).filter(Boolean);
    return andParts.every((part) => parseComparator(part)(version));
  });
}

// ── Increment helper ───────────────────────────────────────────────

type ReleaseType = "major" | "minor" | "patch" | "prerelease";

function incrementVersion(v: SemVer, release: ReleaseType): SemVer {
  switch (release) {
    case "major":
      return { major: v.major + 1, minor: 0, patch: 0, prerelease: null, build: null };
    case "minor":
      return { major: v.major, minor: v.minor + 1, patch: 0, prerelease: null, build: null };
    case "patch":
      // If the version has a prerelease, incrementing patch just drops the prerelease
      if (v.prerelease !== null) {
        return { major: v.major, minor: v.minor, patch: v.patch, prerelease: null, build: null };
      }
      return { major: v.major, minor: v.minor, patch: v.patch + 1, prerelease: null, build: null };
    case "prerelease": {
      if (v.prerelease !== null) {
        // Try to increment the last numeric identifier in the prerelease
        const parts = v.prerelease.split(".");
        let incremented = false;
        for (let i = parts.length - 1; i >= 0; i--) {
          if (/^\d+$/.test(parts[i]!)) {
            parts[i] = String(Number(parts[i]) + 1);
            incremented = true;
            break;
          }
        }
        if (!incremented) {
          parts.push("0");
        }
        return { major: v.major, minor: v.minor, patch: v.patch, prerelease: parts.join("."), build: null };
      }
      // No prerelease: bump patch and add prerelease .0
      return { major: v.major, minor: v.minor, patch: v.patch + 1, prerelease: "0", build: null };
    }
  }
}

// ── Coerce helper ──────────────────────────────────────────────────

function coerceVersion(input: unknown): string {
  const raw = String(input ?? "").trim();
  // Try to extract leading numeric version-like pattern
  const m = /v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(raw);
  if (!m) {
    throw new Error(`Cannot coerce to semver: ${raw}`);
  }
  const major = Number(m[1]);
  const minor = m[2] !== undefined ? Number(m[2]) : 0;
  const patch = m[3] !== undefined ? Number(m[3]) : 0;
  return `${major}.${minor}.${patch}`;
}

// ── Diff helper ────────────────────────────────────────────────────

function diffVersions(a: SemVer, b: SemVer): string | null {
  if (a.major !== b.major) return "major";
  if (a.minor !== b.minor) return "minor";
  if (a.patch !== b.patch) return "patch";
  if (a.prerelease !== b.prerelease) return "prerelease";
  return null;
}

// ── RobinPath Function Handlers ────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const v = parseSemVer(args[0]);
  return {
    major: v.major,
    minor: v.minor,
    patch: v.patch,
    prerelease: v.prerelease,
    build: v.build,
  };
};

const isValid: BuiltinHandler = (args) => {
  return isValidSemVer(args[0]);
};

const compare: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b);
};

const gt: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b) > 0;
};

const lt: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b) < 0;
};

const eq: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b) === 0;
};

const gte: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b) >= 0;
};

const lte: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return compareSemVer(a, b) <= 0;
};

const satisfies: BuiltinHandler = (args) => {
  const v = parseSemVer(args[0]);
  const range = String(args[1] ?? "");
  return satisfiesRange(v, range);
};

const inc: BuiltinHandler = (args) => {
  const v = parseSemVer(args[0]);
  const release = String(args[1] ?? "patch") as ReleaseType;
  if (!["major", "minor", "patch", "prerelease"].includes(release)) {
    throw new Error(`Invalid release type: ${release}. Must be one of: major, minor, patch, prerelease`);
  }
  return formatSemVer(incrementVersion(v, release));
};

const major: BuiltinHandler = (args) => {
  return parseSemVer(args[0]).major;
};

const minor: BuiltinHandler = (args) => {
  return parseSemVer(args[0]).minor;
};

const patch: BuiltinHandler = (args) => {
  return parseSemVer(args[0]).patch;
};

const coerce: BuiltinHandler = (args) => {
  return coerceVersion(args[0]);
};

const diff: BuiltinHandler = (args) => {
  const a = parseSemVer(args[0]);
  const b = parseSemVer(args[1]);
  return diffVersions(a, b);
};

// ── Exports ────────────────────────────────────────────────────────

export const SemverFunctions: Record<string, BuiltinHandler> = {
  parse,
  isValid,
  compare,
  gt,
  lt,
  eq,
  gte,
  lte,
  satisfies,
  inc,
  major,
  minor,
  patch,
  coerce,
  diff,
};

export const SemverFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: {
    description: "Parse a semver version string into its components (major, minor, patch, prerelease, build)",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The semver version string to parse (e.g. \"1.2.3-beta.1+build.42\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object with major, minor, patch (numbers), prerelease and build (string or null)",
    example: 'semver.parse "1.2.3-beta.1+build.42"',
  },
  isValid: {
    description: "Check whether a string is a valid semver version",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string to validate",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid semver version",
    example: 'semver.isValid "1.2.3"',
  },
  compare: {
    description: "Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2)",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "-1 if v1 < v2, 0 if equal, 1 if v1 > v2",
    example: 'semver.compare "1.2.3" "1.3.0"',
  },
  gt: {
    description: "Check if the first version is greater than the second",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if v1 is greater than v2",
    example: 'semver.gt "2.0.0" "1.9.9"',
  },
  lt: {
    description: "Check if the first version is less than the second",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if v1 is less than v2",
    example: 'semver.lt "1.0.0" "2.0.0"',
  },
  eq: {
    description: "Check if two versions are equal (ignoring build metadata)",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if v1 equals v2 (build metadata is ignored)",
    example: 'semver.eq "1.2.3" "1.2.3+build.1"',
  },
  gte: {
    description: "Check if the first version is greater than or equal to the second",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if v1 is greater than or equal to v2",
    example: 'semver.gte "1.2.3" "1.2.3"',
  },
  lte: {
    description: "Check if the first version is less than or equal to the second",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if v1 is less than or equal to v2",
    example: 'semver.lte "1.2.3" "1.3.0"',
  },
  satisfies: {
    description: "Check if a version satisfies a semver range (supports ^, ~, >=, <=, >, <, =, x wildcard, ||)",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string to test",
        formInputType: "text",
        required: true,
      },
      {
        name: "range",
        dataType: "string",
        description: "The semver range expression (e.g. \"^1.2.0\", \">=1.0.0 <2.0.0\", \"1.x || 2.x\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the version satisfies the range",
    example: 'semver.satisfies "1.2.3" "^1.0.0"',
  },
  inc: {
    description: "Increment a version by the specified release type (major, minor, patch, or prerelease)",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string to increment",
        formInputType: "text",
        required: true,
      },
      {
        name: "release",
        dataType: "string",
        description: "The release type: \"major\", \"minor\", \"patch\", or \"prerelease\"",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The incremented version string",
    example: 'semver.inc "1.2.3" "minor"',
  },
  major: {
    description: "Extract the major version number from a semver string",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The major version number",
    example: 'semver.major "1.2.3"',
  },
  minor: {
    description: "Extract the minor version number from a semver string",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The minor version number",
    example: 'semver.minor "1.2.3"',
  },
  patch: {
    description: "Extract the patch version number from a semver string",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "The version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "The patch version number",
    example: 'semver.patch "1.2.3"',
  },
  coerce: {
    description: "Coerce a loose version string into a clean semver string (e.g. \"v1\" becomes \"1.0.0\")",
    parameters: [
      {
        name: "version",
        dataType: "string",
        description: "A loose version string (e.g. \"v1\", \"1.2\", \"42\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "A clean semver version string (e.g. \"1.0.0\", \"1.2.0\", \"42.0.0\")",
    example: 'semver.coerce "v1"',
  },
  diff: {
    description: "Determine the type of difference between two versions (major, minor, patch, prerelease, or null)",
    parameters: [
      {
        name: "v1",
        dataType: "string",
        description: "The first version string",
        formInputType: "text",
        required: true,
      },
      {
        name: "v2",
        dataType: "string",
        description: "The second version string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The difference type: \"major\", \"minor\", \"patch\", \"prerelease\", or null if equal",
    example: 'semver.diff "1.0.0" "2.0.0"',
  },
};

export const SemverModuleMetadata: ModuleMetadata = {
  description: "Parse, compare, validate, and manipulate semantic version strings (semver 2.0.0 compliant)",
  methods: [
    "parse",
    "isValid",
    "compare",
    "gt",
    "lt",
    "eq",
    "gte",
    "lte",
    "satisfies",
    "inc",
    "major",
    "minor",
    "patch",
    "coerce",
    "diff",
  ],
};
