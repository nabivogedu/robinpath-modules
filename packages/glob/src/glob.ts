import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readdirSync, statSync } from "node:fs";
import nodePath from "node:path";

function globToRegex(pattern: string): RegExp {
  let regex = "";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i]!;
    if (ch === "*") {
      if (pattern[i + 1] === "*") {
        if (pattern[i + 2] === "/" || i + 2 >= pattern.length) {
          regex += "(?:.+/)?";
          i += pattern[i + 2] === "/" ? 3 : 2;
          continue;
        }
      }
      regex += "[^/]*";
      i++;
    } else if (ch === "?") {
      regex += "[^/]";
      i++;
    } else if (ch === "{") {
      const close = pattern.indexOf("}", i);
      if (close !== -1) {
        const alternatives = pattern.slice(i + 1, close).split(",").map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
        regex += `(?:${alternatives})`;
        i = close + 1;
      } else {
        regex += "\\{";
        i++;
      }
    } else if (ch === "[") {
      const close = pattern.indexOf("]", i);
      if (close !== -1) {
        regex += pattern.slice(i, close + 1);
        i = close + 1;
      } else {
        regex += "\\[";
        i++;
      }
    } else if (".+^${}()|[]\\".includes(ch)) {
      regex += "\\" + ch;
      i++;
    } else {
      regex += ch;
      i++;
    }
  }
  return new RegExp("^" + regex + "$");
}

function walkDir(dir: string): string[] {
  const results: string[] = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = nodePath.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...walkDir(fullPath));
      } else {
        results.push(fullPath);
      }
    }
  } catch { /* skip inaccessible dirs */ }
  return results;
}

const match: BuiltinHandler = (args) => {
  const pattern = String(args[0] ?? "");
  const cwd = String(args[1] ?? ".");
  const regex = globToRegex(pattern);
  const files = walkDir(cwd);
  return files.filter((f) => {
    const relative = nodePath.relative(cwd, f).replace(/\\/g, "/");
    return regex.test(relative);
  }).map((f) => nodePath.relative(cwd, f).replace(/\\/g, "/"));
};

const isMatch: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "").replace(/\\/g, "/");
  const pattern = String(args[1] ?? "");
  return globToRegex(pattern).test(filePath);
};

const toRegex: BuiltinHandler = (args) => globToRegex(String(args[0] ?? "")).source;

const expand: BuiltinHandler = (args) => {
  const pattern = String(args[0] ?? "");
  const braceMatch = pattern.match(/^(.*)\{([^}]+)\}(.*)$/);
  if (!braceMatch) return [pattern];
  const [, prefix, alts, suffix] = braceMatch;
  return alts!.split(",").map((alt) => `${prefix}${alt.trim()}${suffix}`);
};

const base: BuiltinHandler = (args) => {
  const pattern = String(args[0] ?? "");
  const parts = pattern.split("/");
  const baseParts: string[] = [];
  for (const part of parts) {
    if (part.includes("*") || part.includes("?") || part.includes("{") || part.includes("[")) break;
    baseParts.push(part);
  }
  return baseParts.join("/") || ".";
};

const hasMagic: BuiltinHandler = (args) => /[*?{[\]]/.test(String(args[0] ?? ""));

export const GlobFunctions: Record<string, BuiltinHandler> = {
  match, isMatch, toRegex, expand, base, hasMagic,
};

export const GlobFunctionMetadata: Record<string, FunctionMetadata> = {
  match: { description: "Find files matching a glob pattern", parameters: [{ name: "pattern", dataType: "string", description: "Glob pattern (e.g. **/*.ts)", formInputType: "text", required: true }, { name: "cwd", dataType: "string", description: "Working directory (default: .)", formInputType: "text", required: false, defaultValue: "." }], returnType: "array", returnDescription: "Array of matching file paths", example: 'glob.match "src/**/*.ts"' },
  isMatch: { description: "Test if a path matches a glob pattern", parameters: [{ name: "filePath", dataType: "string", description: "File path to test", formInputType: "text", required: true }, { name: "pattern", dataType: "string", description: "Glob pattern", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if matches", example: 'glob.isMatch "src/index.ts" "**/*.ts"' },
  toRegex: { description: "Convert a glob pattern to a regex string", parameters: [{ name: "pattern", dataType: "string", description: "Glob pattern", formInputType: "text", required: true }], returnType: "string", returnDescription: "Regex source string", example: 'glob.toRegex "*.ts"' },
  expand: { description: "Expand brace pattern into array", parameters: [{ name: "pattern", dataType: "string", description: "Pattern with braces (e.g. {a,b,c})", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of expanded strings", example: 'glob.expand "file.{ts,js}"' },
  base: { description: "Extract non-glob base directory from pattern", parameters: [{ name: "pattern", dataType: "string", description: "Glob pattern", formInputType: "text", required: true }], returnType: "string", returnDescription: "Base directory path", example: 'glob.base "src/**/*.ts"' },
  hasMagic: { description: "Check if string contains glob characters", parameters: [{ name: "str", dataType: "string", description: "String to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if contains glob chars", example: 'glob.hasMagic "*.ts"' },
};

export const GlobModuleMetadata: ModuleMetadata = {
  description: "File pattern matching: find files by glob patterns, test matches, expand braces",
  methods: ["match", "isMatch", "toRegex", "expand", "base", "hasMagic"],
};
