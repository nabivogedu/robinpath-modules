import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Helpers ──────────────────────────────────────────────────────────────────

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

const HTML_UNESCAPE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
};

const XSS_PATTERNS: RegExp[] = [
  /<script[\s>][\s\S]*?<\/script>/gi,
  /javascript\s*:/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /on\w+\s*=\s*[^\s>]+/gi,
  /expression\s*\(/gi,
  /url\s*\(\s*['"]?\s*javascript:/gi,
  /vbscript\s*:/gi,
  /data\s*:\s*text\/html/gi,
];

function toString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "";
  return String(v);
}

// ── Functions ────────────────────────────────────────────────────────────────

function html(args: Value[]): any {
  const input = toString(args[0]);
  const mode = toString(args[1]) || "escape";
  if (mode === "strip") {
    return input.replace(/<[^>]*>/g, "");
  }
  return input.replace(/[&<>"']/g, (ch: any) => HTML_ESCAPE_MAP[ch] ?? ch);
}

function xss(args: Value[]): any {
  let result = toString(args[0]);
  for (const pattern of XSS_PATTERNS) {
    result = result.replace(pattern, "");
  }
  return result;
}

function sql(args: Value[]): any {
  const input = toString(args[0]);
  return input
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\x00/g, "\\0")
    .replace(/\x1a/g, "\\Z")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

function regex(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function filename(args: Value[]): any {
  const input = toString(args[0]);
  const replacement = toString(args[1]) || "_";
  let result = input
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, replacement)
    .replace(/^\.+/, "")
    .replace(/\.+$/, "")
    .trim();
  const reserved = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  if (reserved.test(result)) {
    result = replacement + result;
  }
  if (result.length === 0) {
    result = "untitled";
  }
  return result.slice(0, 255);
}

function path(args: Value[]): any {
  const input = toString(args[0]);
  let result = input
    .replace(/\.\.[/\\]/g, "")
    .replace(/\.\.$/, "")
    .replace(/^[/\\]+/, "")
    .replace(/\x00/g, "");
  result = result.replace(/%2e%2e/gi, "").replace(/%2f/gi, "").replace(/%5c/gi, "");
  return result;
}

function url(args: Value[]): any {
  const input = toString(args[0]).trim();
  const lower = input.toLowerCase().replace(/\s/g, "");
  if (lower.startsWith("javascript:") || lower.startsWith("vbscript:") || lower.startsWith("data:text/html")) {
    return "";
  }
  try {
    const parsed = new URL(input);
    if (!["http:", "https:", "mailto:", "tel:", "ftp:"].includes(parsed.protocol)) {
      return "";
    }
    return parsed.toString();
  } catch {
    if (/^[a-zA-Z0-9]/.test(input) && !input.includes(":")) {
      return input;
    }
    return "";
  }
}

function email(args: Value[]): any {
  const input = toString(args[0]).trim().toLowerCase();
  const parts = input.split("@");
  if (parts.length !== 2) return input;
  let [local, domain] = parts;
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replace(/\./g, "").split("+")[0];
    domain = "gmail.com";
  } else {
    local = local.split("+")[0];
  }
  return `${local}@${domain}`;
}

function stripTags(args: Value[]): any {
  const input = toString(args[0]);
  const allowed = toString(args[1]);
  if (!allowed) {
    return input.replace(/<[^>]*>/g, "");
  }
  const allowedSet = new Set(
    allowed
      .toLowerCase()
      .match(/<\w+>/g)
      ?.map((t: any) => t.slice(1, -1)) ?? []
  );
  return input.replace(/<\/?(\w+)[^>]*>/g, (match: any, tag: any) => {
    return allowedSet.has(tag.toLowerCase()) ? match : "";
  });
}

function escapeHtml(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/[&<>"']/g, (ch: any) => HTML_ESCAPE_MAP[ch] ?? ch);
}

function unescapeHtml(args: Value[]): any {
  const input = toString(args[0]);
  return input.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;/g, (entity: any) => HTML_UNESCAPE_MAP[entity] ?? entity);
}

function trim(args: Value[]): any {
  const value = args[0];
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.map((item: any) => trim([item]));
  }
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      result[k.trim()] = trim([v]);
    }
    return result;
  }
  return value;
}

function truncate(args: Value[]): any {
  const input = toString(args[0]);
  const maxLen = typeof args[1] === "number" ? args[1] : 100;
  const suffix = toString(args[2] ?? "...");
  if (input.length <= maxLen) return input;
  return input.slice(0, maxLen - suffix.length) + suffix;
}

function alphanumeric(args: Value[]): any {
  const input = toString(args[0]);
  const allowSpaces = !!args[1];
  if (allowSpaces) {
    return input.replace(/[^a-zA-Z0-9\s]/g, "");
  }
  return input.replace(/[^a-zA-Z0-9]/g, "");
}

function slug(args: Value[]): any {
  const input = toString(args[0]);
  const separator = toString(args[1]) || "-";
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, separator)
    .replace(new RegExp(`^${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+|${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+$`, "g"), "");
}

// ── Exports ──────────────────────────────────────────────────────────────────

export const SanitizeFunctions = {
  html,
  xss,
  sql,
  regex,
  filename,
  path,
  url,
  email,
  stripTags,
  escapeHtml,
  unescapeHtml,
  trim,
  truncate,
  alphanumeric,
  slug,
};

export const SanitizeFunctionMetadata = {
  html: {
    description: "Strip or escape HTML tags from input",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to sanitize" },
      { name: "mode", dataType: "string", formInputType: "text", required: false, description: "Mode: 'escape' (default) or 'strip'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  xss: {
    description: "Remove XSS attack vectors from input",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to sanitize" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  sql: {
    description: "Escape SQL special characters to prevent injection",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to escape" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  regex: {
    description: "Escape special regex characters in a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to escape" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  filename: {
    description: "Sanitize a string for safe use as a filename",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The filename to sanitize" },
      { name: "replacement", dataType: "string", formInputType: "text", required: false, description: "Replacement character for invalid chars (default: '_')" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  path: {
    description: "Prevent path traversal attacks by sanitizing a file path",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The path to sanitize" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  url: {
    description: "Sanitize a URL, stripping dangerous protocols like javascript:",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The URL to sanitize" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  email: {
    description: "Normalize an email address (lowercase, remove dots/plus aliases for Gmail)",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The email to normalize" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  stripTags: {
    description: "Remove all HTML tags from a string, optionally allowing specific tags",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to strip tags from" },
      { name: "allowed", dataType: "string", formInputType: "text", required: false, description: "Allowed tags, e.g. '<b><i><a>'" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  escapeHtml: {
    description: "Escape HTML special characters: & < > \" '",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to escape" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  unescapeHtml: {
    description: "Unescape HTML entities back to their original characters",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to unescape" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  trim: {
    description: "Deep trim all string values within an object, array, or string",
    parameters: [
      { name: "value", dataType: "any", formInputType: "text", required: true, description: "The value to deep-trim" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  truncate: {
    description: "Truncate a string to a maximum length with a suffix",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to truncate" },
      { name: "maxLength", dataType: "number", formInputType: "number", required: false, description: "Maximum length (default: 100)" },
      { name: "suffix", dataType: "string", formInputType: "text", required: false, description: "Suffix to append when truncated (default: '...')" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  alphanumeric: {
    description: "Strip all non-alphanumeric characters from a string",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to sanitize" },
      { name: "allowSpaces", dataType: "boolean", formInputType: "checkbox", required: false, description: "Whether to allow spaces (default: false)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  slug: {
    description: "Sanitize a string into a URL-safe slug",
    parameters: [
      { name: "input", dataType: "string", formInputType: "text", required: true, description: "The string to slugify" },
      { name: "separator", dataType: "string", formInputType: "text", required: false, description: "Separator character (default: '-')" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const SanitizeModuleMetadata = {
  description: "Input sanitization utilities for security: HTML escaping, XSS prevention, SQL escaping, filename and path sanitization, URL cleaning, and more",
  version: "1.0.0",
  tags: ["security", "sanitize", "escape", "xss", "sql-injection", "html"],
};
