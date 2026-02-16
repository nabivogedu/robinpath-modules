import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

type DiffType = "added" | "removed" | "unchanged";

function lcs(a: string[], b: string[]): string[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j] = a[i - 1] === b[j - 1] ? dp[i - 1]![j - 1]! + 1 : Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
    }
  }
  const result: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { result.unshift(a[i - 1]!); i--; j--; }
    else if (dp[i - 1]![j]! > dp[i]![j - 1]!) i--;
    else j--;
  }
  return result;
}

function diffTokens(a: string[], b: string[]): Array<{ type: DiffType; value: string }> {
  const common = lcs(a, b);
  const result: Array<{ type: DiffType; value: string }> = [];
  let ai = 0, bi = 0, ci = 0;
  while (ci < common.length) {
    while (ai < a.length && a[ai] !== common[ci]) { result.push({ type: "removed", value: a[ai]! }); ai++; }
    while (bi < b.length && b[bi] !== common[ci]) { result.push({ type: "added", value: b[bi]! }); bi++; }
    result.push({ type: "unchanged", value: common[ci]! });
    ai++; bi++; ci++;
  }
  while (ai < a.length) { result.push({ type: "removed", value: a[ai]! }); ai++; }
  while (bi < b.length) { result.push({ type: "added", value: b[bi]! }); bi++; }
  return result;
}

const lines: BuiltinHandler = (args) => diffTokens(String(args[0] ?? "").split("\n"), String(args[1] ?? "").split("\n"));
const chars: BuiltinHandler = (args) => diffTokens(String(args[0] ?? "").split(""), String(args[1] ?? "").split(""));
const words: BuiltinHandler = (args) => diffTokens(String(args[0] ?? "").split(/\s+/), String(args[1] ?? "").split(/\s+/));

const objects: BuiltinHandler = (args) => {
  const a = args[0] as Record<string, unknown>;
  const b = args[1] as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})]);
  const diffs: Array<{ path: string; type: string; oldValue?: unknown; newValue?: unknown }> = [];
  for (const key of allKeys) {
    if (!(key in (a ?? {}))) diffs.push({ path: key, type: "added", newValue: b?.[key] });
    else if (!(key in (b ?? {}))) diffs.push({ path: key, type: "removed", oldValue: a?.[key] });
    else if (JSON.stringify(a?.[key]) !== JSON.stringify(b?.[key])) diffs.push({ path: key, type: "changed", oldValue: a?.[key], newValue: b?.[key] });
  }
  return diffs;
};

const arrays: BuiltinHandler = (args) => {
  const a = (args[0] as unknown[]) ?? [];
  const b = (args[1] as unknown[]) ?? [];
  const aSet = new Set(a.map((v) => JSON.stringify(v)));
  const bSet = new Set(b.map((v) => JSON.stringify(v)));
  return {
    added: b.filter((v) => !aSet.has(JSON.stringify(v))),
    removed: a.filter((v) => !bSet.has(JSON.stringify(v))),
    common: a.filter((v) => bSet.has(JSON.stringify(v))),
  };
};

const patch: BuiltinHandler = (args) => {
  const diffResult = args[0] as Array<{ type: DiffType; value: string }>;
  return diffResult.filter((d) => d.type !== "removed").map((d) => d.value).join("\n");
};

const unified: BuiltinHandler = (args) => {
  const a = String(args[0] ?? "");
  const b = String(args[1] ?? "");
  const d = diffTokens(a.split("\n"), b.split("\n")) as Array<{ type: DiffType; value: string }>;
  const output: string[] = ["--- a", "+++ b"];
  for (const entry of d) {
    if (entry.type === "removed") output.push(`-${entry.value}`);
    else if (entry.type === "added") output.push(`+${entry.value}`);
    else output.push(` ${entry.value}`);
  }
  return output.join("\n");
};

const isEqual: BuiltinHandler = (args) => JSON.stringify(args[0]) === JSON.stringify(args[1]);

const stats: BuiltinHandler = (args) => {
  const d = args[0] as Array<{ type: DiffType }>;
  if (!Array.isArray(d)) return { additions: 0, deletions: 0, unchanged: 0 };
  return {
    additions: d.filter((e) => e.type === "added").length,
    deletions: d.filter((e) => e.type === "removed").length,
    unchanged: d.filter((e) => e.type === "unchanged").length,
  };
};

export const DiffFunctions: Record<string, BuiltinHandler> = {
  lines, chars, words, objects, arrays, patch, unified, isEqual, stats,
};

export const DiffFunctionMetadata: Record<string, FunctionMetadata> = {
  lines: { description: "Diff two strings line by line", parameters: [{ name: "a", dataType: "string", description: "Original text", formInputType: "textarea", required: true }, { name: "b", dataType: "string", description: "Modified text", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {type, value}", example: "diff.lines $old $new" },
  chars: { description: "Diff two strings character by character", parameters: [{ name: "a", dataType: "string", description: "Original", formInputType: "text", required: true }, { name: "b", dataType: "string", description: "Modified", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {type, value}", example: 'diff.chars "cat" "car"' },
  words: { description: "Diff two strings word by word", parameters: [{ name: "a", dataType: "string", description: "Original", formInputType: "textarea", required: true }, { name: "b", dataType: "string", description: "Modified", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {type, value}", example: "diff.words $old $new" },
  objects: { description: "Diff two objects", parameters: [{ name: "a", dataType: "object", description: "Original object", formInputType: "json", required: true }, { name: "b", dataType: "object", description: "Modified object", formInputType: "json", required: true }], returnType: "array", returnDescription: "Array of {path, type, oldValue?, newValue?}", example: "diff.objects $obj1 $obj2" },
  arrays: { description: "Diff two arrays", parameters: [{ name: "a", dataType: "array", description: "Original array", formInputType: "json", required: true }, { name: "b", dataType: "array", description: "Modified array", formInputType: "json", required: true }], returnType: "object", returnDescription: "{added, removed, common}", example: "diff.arrays $arr1 $arr2" },
  patch: { description: "Apply a line diff to produce the new string", parameters: [{ name: "diff", dataType: "array", description: "Diff result from lines()", formInputType: "json", required: true }], returnType: "string", returnDescription: "Patched string", example: "diff.patch $lineDiff" },
  unified: { description: "Generate unified diff format (like git diff)", parameters: [{ name: "a", dataType: "string", description: "Original text", formInputType: "textarea", required: true }, { name: "b", dataType: "string", description: "Modified text", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "Unified diff string", example: "diff.unified $old $new" },
  isEqual: { description: "Deep equality check", parameters: [{ name: "a", dataType: "any", description: "First value", formInputType: "json", required: true }, { name: "b", dataType: "any", description: "Second value", formInputType: "json", required: true }], returnType: "boolean", returnDescription: "True if deeply equal", example: "diff.isEqual $a $b" },
  stats: { description: "Get diff statistics from a diff result", parameters: [{ name: "diff", dataType: "array", description: "Diff result", formInputType: "json", required: true }], returnType: "object", returnDescription: "{additions, deletions, unchanged}", example: "diff.stats $lineDiff" },
};

export const DiffModuleMetadata: ModuleMetadata = {
  description: "Text and data diffing: line, word, character, object, and array diffs with unified output",
  methods: ["lines", "chars", "words", "objects", "arrays", "patch", "unified", "isEqual", "stats"],
};
