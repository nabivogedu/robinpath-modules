import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
	validateCode,
	validateCodeDirect,
	buildFixPrompt,
	extractCodeBlocks,
	semanticValidate,
	FunctionRegistry,
} from "../src/index.js";

// ═══════════════════════════════════════════════════════════════════════════════
// Final 100+ tests to reach 1000+ total
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 1. Parameterized: every invalid keyword via validateCode (25 tests) ────

describe("validateCode — every invalid keyword individually", () => {
	const keywords = [
		"while", "each", "import", "try", "finally", "switch", "case",
		"class", "function", "let", "const", "var", "print", "echo",
		"puts", "require", "export", "async", "await", "return",
		"throw", "new", "delete", "typeof", "instanceof",
	];

	for (const kw of keywords) {
		it(`validateCode rejects '${kw}'`, async () => {
			const r = await validateCode(`\`\`\`robinpath\n${kw} something\n\`\`\``);
			assert.equal(r.valid, false);
			assert.equal(r.blockCount, 1);
			assert.ok(r.errors.length >= 1);
		});
	}
});

// ─── 2. Parameterized: bare end after N lines of valid code (10 tests) ──────

describe("bare end at various positions", () => {
	for (let n = 0; n < 10; n++) {
		it(`bare end after ${n} log lines`, () => {
			const lines = Array.from({ length: n }, (_, i) => `  log "line ${i}"`);
			const code = `for $i in $x\n${lines.join("\n")}${lines.length ? "\n" : ""}end`;
			const errors = semanticValidate(code);
			assert.ok(errors.some((e) => e.error.includes("Bare 'end'")));
		});
	}
});

// ─── 3. Parameterized: semicolons at various positions (10 tests) ───────────

describe("semicolons at various line positions", () => {
	for (let pos = 1; pos <= 10; pos++) {
		it(`semicolon on line ${pos} of ${pos} lines`, () => {
			const lines = Array.from({ length: pos }, (_, i) =>
				i === pos - 1 ? 'log "bad";' : 'log "ok"',
			);
			const errors = semanticValidate(lines.join("\n"));
			assert.ok(errors.some((e) => e.line === pos && e.error.includes("semicolon")));
		});
	}
});

// ─── 4. Multiple errors in sequence — exact count (10 tests) ────────────────

describe("exact error count for N invalid lines", () => {
	const pool = ["import a", "while b", "each c", "try d", "print e",
		"echo f", "let g", "const h", "class i", "function j",
		"puts k", "require l", "export m", "async n", "await o"];

	for (let n = 1; n <= 10; n++) {
		it(`${n} invalid lines → exactly ${n} errors`, () => {
			const lines = pool.slice(0, n);
			const errors = semanticValidate(lines.join("\n"));
			assert.equal(errors.length, n);
		});
	}
});

// ─── 5. FunctionRegistry — roundtrip for various sizes (10 tests) ───────────

describe("FunctionRegistry roundtrip at various sizes", () => {
	for (let modules = 1; modules <= 10; modules++) {
		it(`roundtrip with ${modules} modules x 5 funcs`, () => {
			const data: Record<string, string[]> = {};
			for (let i = 0; i < modules; i++) {
				data[`m${i}`] = ["a", "b", "c", "d", "e"];
			}
			const r1 = FunctionRegistry.fromObject(data);
			const serialized = r1.toObject();
			const r2 = FunctionRegistry.fromObject(serialized);
			assert.equal(r1.size, r2.size);
			assert.equal(r1.modules().length, r2.modules().length);
		});
	}
});

// ─── 6. buildFixPrompt with various error counts (10 tests) ─────────────────

describe("buildFixPrompt — error count variations", () => {
	for (let n = 1; n <= 10; n++) {
		it(`prompt with ${n} errors lists all`, () => {
			const errors = Array.from({ length: n }, (_, i) => ({
				line: i * 3 + 1,
				type: "semantic" as const,
				error: `Problem #${i + 1}`,
			}));
			const prompt = buildFixPrompt(errors);
			for (let i = 0; i < n; i++) {
				assert.ok(prompt.includes(`Problem #${i + 1}`));
				assert.ok(prompt.includes(`Line ${i * 3 + 1}`));
			}
		});
	}
});

// ─── 7. Block depth via validateCodeDirect (8 tests) ────────────────────────

describe("validateCodeDirect — block depths", () => {
	for (let depth = 1; depth <= 8; depth++) {
		it(`${depth}-deep for nesting validates`, async () => {
			let code = "";
			for (let i = 0; i < depth; i++) code += "  ".repeat(i) + `for $v${i} in $items\n`;
			code += "  ".repeat(depth) + 'log "deep"\n';
			for (let i = depth - 1; i >= 0; i--) code += "  ".repeat(i) + "endfor\n";
			const r = await validateCodeDirect(code);
			const semErrors = r.errors.filter((e) => e.type === "semantic");
			assert.equal(semErrors.length, 0);
		});
	}
});

// ─── 8. extractCodeBlocks — parameterized N blocks (10 tests) ───────────────

describe("extractCodeBlocks — N blocks", () => {
	for (let n = 1; n <= 10; n++) {
		it(`extracts exactly ${n} blocks`, () => {
			let text = "";
			for (let i = 0; i < n; i++) text += `\`\`\`robinpath\nlog ${i}\n\`\`\`\n`;
			assert.equal(extractCodeBlocks(text).length, n);
		});
	}
});

// ─── 9. Registry validation with mixed valid/invalid calls (10 tests) ───────

describe("registry — mixed valid/invalid in same block", () => {
	const reg = FunctionRegistry.fromObject({
		math: ["add", "subtract"],
		string: ["upper", "lower"],
	});
	const opts = { knownFunctions: reg.toSet() };

	const scenarios = [
		{ valid: "math.add 1 2", invalid: "math.divide 1 2" },
		{ valid: "string.upper $x", invalid: "string.slugify $x" },
		{ valid: "math.subtract 5 3", invalid: "math.power 2 8" },
		{ valid: "string.lower $x", invalid: "string.trim $data" },
		{ valid: "math.add $a $b", invalid: "math.floor 3.5" },
	];

	for (const s of scenarios) {
		it(`accepts '${s.valid}' but rejects '${s.invalid}'`, async () => {
			// Valid alone
			const r1 = await validateCode(`\`\`\`robinpath\n${s.valid}\n\`\`\``, opts);
			assert.equal(r1.valid, true);
			// Invalid alone
			const r2 = await validateCode(`\`\`\`robinpath\n${s.invalid}\n\`\`\``, opts);
			assert.equal(r2.valid, false);
		});
	}

	for (const s of scenarios) {
		it(`mixed block: '${s.valid}' + '${s.invalid}'`, async () => {
			const r = await validateCode(`\`\`\`robinpath\n${s.valid}\n${s.invalid}\n\`\`\``, opts);
			assert.equal(r.valid, false);
			assert.ok(r.errors.some((e) => e.error.includes("Unknown function")));
		});
	}
});
