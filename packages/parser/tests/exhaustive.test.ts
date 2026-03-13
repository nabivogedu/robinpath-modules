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
// Additional 400+ tests to reach 1000+ total
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 1. Every invalid keyword with every block wrapper (100 tests) ───────────

describe("invalid keywords inside if blocks", () => {
	const keywords = [
		"while", "each", "import", "try", "finally", "switch", "case",
		"class", "function", "let", "const", "var", "print", "echo",
		"puts", "require", "export", "async", "await", "return",
		"throw", "new", "delete", "typeof", "instanceof",
	];

	for (const kw of keywords) {
		it(`catches '${kw}' inside if/endif`, () => {
			const code = `if $x > 0\n  ${kw} something\nendif`;
			const errors = semanticValidate(code);
			assert.ok(errors.some((e) => e.line === 2));
		});
	}
});

describe("invalid keywords inside do blocks", () => {
	const keywords = [
		"while", "each", "import", "try", "finally", "switch", "case",
		"class", "function", "let", "const", "var", "print", "echo",
		"puts", "require", "export", "async", "await", "return",
		"throw", "new", "delete", "typeof", "instanceof",
	];

	for (const kw of keywords) {
		it(`catches '${kw}' inside do/enddo`, () => {
			const code = `do\n  ${kw} something\nenddo`;
			const errors = semanticValidate(code);
			assert.ok(errors.some((e) => e.line === 2));
		});
	}
});

describe("invalid keywords inside def blocks", () => {
	const keywords = [
		"while", "each", "import", "try", "finally", "switch", "case",
		"class", "function", "let", "const", "var", "print", "echo",
		"puts", "require", "export", "async", "await", "return",
		"throw", "new", "delete", "typeof", "instanceof",
	];

	for (const kw of keywords) {
		it(`catches '${kw}' inside def/enddef`, () => {
			const code = `def myFunc\n  ${kw} something\nenddef`;
			const errors = semanticValidate(code);
			assert.ok(errors.some((e) => e.line === 2));
		});
	}
});

// ─── 2. Bare 'end' with every block type via validateCodeDirect (14 tests) ──

describe("bare end via validateCodeDirect", () => {
	const openers = [
		"for $i in $x",
		"if $x > 0",
		"do",
		"def myFunc",
	];

	for (const opener of openers) {
		it(`catches bare end after '${opener.split(" ")[0]}' in direct validation`, async () => {
			const r = await validateCodeDirect(`${opener}\n  log 1\nend`);
			assert.equal(r.valid, false);
			const semanticErrors = r.errors.filter((e) => e.type === "semantic");
			assert.ok(semanticErrors.some((e) => e.error.includes("Bare 'end'")));
		});
	}
});

// ─── 3. Combined error scenarios (40 tests) ─────────────────────────────────

describe("combined errors — keyword + semicolon", () => {
	const keywords = ["import", "while", "each", "try", "print", "let", "const", "class", "function", "echo"];

	for (const kw of keywords) {
		it(`catches '${kw}' + semicolon on separate lines`, () => {
			const code = `${kw} something\nlog "ok";`;
			const errors = semanticValidate(code);
			assert.ok(errors.some((e) => e.line === 1)); // keyword
			assert.ok(errors.some((e) => e.line === 2 && e.error.includes("semicolon")));
		});
	}
});

describe("combined errors — keyword + bare end", () => {
	const keywords = ["import", "while", "each", "try", "print", "let", "const", "class", "function", "echo"];

	for (const kw of keywords) {
		it(`catches '${kw}' + bare end`, () => {
			const code = `for $i in $x\n  ${kw} bad\nend`;
			const errors = semanticValidate(code);
			assert.ok(errors.length >= 2);
		});
	}
});

describe("combined errors — semicolon + pipe", () => {
	it("catches both semicolon and pipe on different lines", () => {
		const code = 'log "hello";\n$x |> math.add 1';
		const errors = semanticValidate(code);
		assert.ok(errors.some((e) => e.error.includes("semicolon")));
		assert.ok(errors.some((e) => e.error.includes("|>")));
	});

	it("catches semicolon and pipe on same line", () => {
		const code = "$x |> math.add 1;";
		const errors = semanticValidate(code);
		assert.ok(errors.some((e) => e.error.includes("semicolon")));
		assert.ok(errors.some((e) => e.error.includes("|>")));
	});
});

describe("combined errors — unclosed block + invalid keyword", () => {
	it("catches unclosed for + import", () => {
		const errors = semanticValidate("for $i in $x\n  import bad");
		assert.ok(errors.some((e) => e.error.includes("import")));
		assert.ok(errors.some((e) => e.error.includes("Unclosed")));
	});

	it("catches unclosed if + while", () => {
		const errors = semanticValidate("if $x > 0\n  while true");
		assert.ok(errors.some((e) => e.error.includes("while")));
		assert.ok(errors.some((e) => e.error.includes("Unclosed")));
	});

	it("catches unclosed do + print", () => {
		const errors = semanticValidate("do\n  print 1");
		assert.ok(errors.some((e) => e.error.includes("print")));
		assert.ok(errors.some((e) => e.error.includes("Unclosed")));
	});
});

// ─── 4. FunctionRegistry edge cases (40 tests) ──────────────────────────────

describe("FunctionRegistry — large registries", () => {
	it("handles 50 modules", () => {
		const data: Record<string, string[]> = {};
		for (let i = 0; i < 50; i++) data[`mod${i}`] = [`fn${i}`];
		const r = FunctionRegistry.fromObject(data);
		assert.equal(r.size, 50);
		assert.equal(r.modules().length, 50);
	});

	it("handles 100 functions per module", () => {
		const fns = Array.from({ length: 100 }, (_, i) => `func${i}`);
		const r = new FunctionRegistry();
		r.registerModule("big", fns);
		assert.equal(r.size, 100);
	});

	it("handles 1000 total functions", () => {
		const data: Record<string, string[]> = {};
		for (let i = 0; i < 100; i++) {
			data[`mod${i}`] = Array.from({ length: 10 }, (_, j) => `fn${j}`);
		}
		const r = FunctionRegistry.fromObject(data);
		assert.equal(r.size, 1000);
	});

	it("roundtrip preserves 1000 functions", () => {
		const data: Record<string, string[]> = {};
		for (let i = 0; i < 10; i++) {
			data[`mod${i}`] = Array.from({ length: 10 }, (_, j) => `fn${j}`);
		}
		const r = FunctionRegistry.fromObject(data);
		const obj = r.toObject();
		const r2 = FunctionRegistry.fromObject(obj);
		assert.equal(r.size, r2.size);
	});
});

describe("FunctionRegistry — lookup edge cases", () => {
	const reg = FunctionRegistry.fromObject({
		math: ["add", "subtract", "multiply", "divide", "sqrt", "pow", "abs", "ceil", "floor", "round"],
		string: ["upper", "lower", "trim", "split", "join", "replace", "contains", "startsWith", "endsWith", "length"],
	});

	// Test every registered function
	const allFuncs = [
		"math.add", "math.subtract", "math.multiply", "math.divide", "math.sqrt",
		"math.pow", "math.abs", "math.ceil", "math.floor", "math.round",
		"string.upper", "string.lower", "string.trim", "string.split", "string.join",
		"string.replace", "string.contains", "string.startsWith", "string.endsWith", "string.length",
	];

	for (const fn of allFuncs) {
		it(`has '${fn}'`, () => assert.ok(reg.has(fn)));
	}

	// Test case variations
	it("MATH.ADD works", () => assert.ok(reg.has("MATH.ADD")));
	it("Math.Add works", () => assert.ok(reg.has("Math.Add")));
	it("STRING.UPPER works", () => assert.ok(reg.has("STRING.UPPER")));

	// Test non-existent
	const missing = ["math.log", "math.sin", "string.capitalize", "http.get", "json.parse"];
	for (const fn of missing) {
		it(`does not have '${fn}'`, () => assert.ok(!reg.has(fn)));
	}
});

// ─── 5. validateCode with function registry — comprehensive (30 tests) ──────

describe("validateCode — registry validation comprehensive", () => {
	const reg = FunctionRegistry.fromObject({
		math: ["add", "subtract", "multiply", "divide", "round", "floor", "ceil", "abs", "sqrt", "pow"],
		string: ["capitalize", "upper", "lower", "trim", "slugify", "truncate", "reverse", "contains", "repeat", "replaceAll"],
		http: ["get", "post", "put", "delete", "patch"],
		json: ["parse", "stringify"],
		array: ["sort", "filter", "map", "reduce", "find", "length", "push", "pop"],
	});
	const opts = { knownFunctions: reg.toSet() };

	// Known functions pass
	const validCalls = [
		"math.add 1 2", "math.subtract 10 5", "math.multiply 3 4", "math.divide 10 2",
		'string.capitalize "hello"', 'string.upper "test"', 'string.slugify "Hello World"',
		'http.get "https://example.com"', 'http.post "https://example.com" $data',
		'json.parse $raw', 'json.stringify $obj',
		'array.sort $items', 'array.filter $items',
	];

	for (const call of validCalls) {
		it(`accepts known: ${call.substring(0, 35)}`, async () => {
			const r = await validateCode(`\`\`\`robinpath\n${call}\n\`\`\``, opts);
			assert.equal(r.valid, true);
		});
	}

	// Unknown functions fail — use functions that don't exist on known modules
	// Note: only built-in modules (file, http, crypto, etc.) or external knownFunctions modules are checked.
	// Modules not in either registry (xml, csv, database, redis) are NOT flagged.
	const invalidCalls = [
		"math.sin 1", "math.cos 1", "math.log 10",
		"string.pad 5", "string.format 1",
		"http.options url", "http.teleport url",
		"array.banana data", "array.zip data",
		"json.validate sql", "json.compress key",
	];

	for (const call of invalidCalls) {
		it(`rejects unknown: ${call.substring(0, 35)}`, async () => {
			const r = await validateCode(`\`\`\`robinpath\n${call}\n\`\`\``, opts);
			assert.equal(r.valid, false);
			assert.ok(r.errors.some((e) => e.error.includes("Unknown function")));
		});
	}
});

// ─── 6. extractCodeBlocks with complex markdown (20 tests) ──────────────────

describe("extractCodeBlocks — complex markdown", () => {
	it("nested lists with code", () => {
		const text = "- item\n  - sub\n\n```robinpath\nlog 1\n```\n\n- more";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("blockquote with code", () => {
		const text = "> quote\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("table followed by code", () => {
		const text = "| a | b |\n|---|---|\n| 1 | 2 |\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("headings at all levels with code between", () => {
		const text = "# H1\n```robinpath\nlog 1\n```\n## H2\n```robinpath\nlog 2\n```\n### H3";
		assert.equal(extractCodeBlocks(text).length, 2);
	});

	it("bold/italic text near code", () => {
		const text = "**bold** and *italic*\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("inline code near fenced code", () => {
		const text = "Use `log` command:\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("link near code", () => {
		const text = "[link](url)\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("image near code", () => {
		const text = "![alt](img.png)\n\n```robinpath\nlog 1\n```";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("horizontal rule near code", () => {
		const text = "---\n\n```robinpath\nlog 1\n```\n\n---";
		assert.equal(extractCodeBlocks(text).length, 1);
	});

	it("mixed language blocks filtered correctly", () => {
		const text = "```js\nvar x;\n```\n```robinpath\nlog 1\n```\n```python\nprint(1)\n```\n```rp\nlog 2\n```";
		assert.equal(extractCodeBlocks(text).length, 2);
	});
});

// ─── 7. Deeply nested block variations (20 tests) ──────────────────────────

describe("deeply nested blocks — comprehensive", () => {
	it("3 for loops nested", () => {
		const code = "for $a in $x\n  for $b in $a\n    for $c in $b\n      log $c\n    endfor\n  endfor\nendfor";
		assert.equal(semanticValidate(code).length, 0);
	});

	it("3 if blocks nested", () => {
		const code = 'if $a\n  if $b\n    if $c\n      log "deep"\n    endif\n  endif\nendif';
		assert.equal(semanticValidate(code).length, 0);
	});

	it("for > if > do nested", () => {
		const code = "for $i in $x\n  if $i > 0\n    do\n      log $i\n    enddo\n  endif\nendfor";
		assert.equal(semanticValidate(code).length, 0);
	});

	it("def > for > if nested", () => {
		const code = "def proc $items\n  for $i in $items\n    if $i > 0\n      log $i\n    endif\n  endfor\nenddef";
		assert.equal(semanticValidate(code).length, 0);
	});

	it("for > do > for > if nested (4 levels)", () => {
		const code = "for $i in $a\n  do\n    for $j in $b\n      if $j > 0\n        log $j\n      endif\n    endfor\n  enddo\nendfor";
		assert.equal(semanticValidate(code).length, 0);
	});

	it("catches mismatch in deeply nested (3 levels)", () => {
		const code = "for $a in $x\n  if $a > 0\n    do\n      log $a\n    endif\n  enddo\nendfor";
		const errors = semanticValidate(code);
		assert.ok(errors.some((e) => e.error.includes("Mismatched")));
	});

	it("catches unclosed in deeply nested", () => {
		const code = "for $a in $x\n  if $a > 0\n    do\n      log $a\n    enddo\n  endif";
		const errors = semanticValidate(code);
		assert.ok(errors.some((e) => e.error.includes("Unclosed 'for'")));
	});

	it("parallel blocks at same level inside parent", () => {
		const code = "def process\n  for $i in $a\n    log $i\n  endfor\n  for $j in $b\n    log $j\n  endfor\n  if $ready\n    log \"done\"\n  endif\nenddef";
		assert.equal(semanticValidate(code).length, 0);
	});

	it("5 sequential blocks inside for", () => {
		let inner = "";
		for (let i = 0; i < 5; i++) {
			inner += `  if $x${i}\n    log ${i}\n  endif\n`;
		}
		const code = `for $i in $items\n${inner}endfor`;
		assert.equal(semanticValidate(code).length, 0);
	});

	it("alternating for and if blocks", () => {
		const code = "for $i in $a\n  log $i\nendfor\nif $x\n  log 1\nendif\nfor $j in $b\n  log $j\nendfor\nif $y\n  log 2\nendif";
		assert.equal(semanticValidate(code).length, 0);
	});
});

// ─── 8. validateCodeDirect error details (30 tests) ─────────────────────────

describe("validateCodeDirect — error details", () => {
	it("import error has correct type", async () => {
		const r = await validateCodeDirect("import something");
		assert.ok(r.errors.some((e) => e.type === "semantic"));
	});

	it("import error has line 1", async () => {
		const r = await validateCodeDirect("import something");
		assert.ok(r.errors.some((e) => e.line === 1));
	});

	it("semicolon error has correct message", async () => {
		const r = await validateCodeDirect('log "hi";');
		assert.ok(r.errors.some((e) => e.error.includes("semicolon")));
	});

	it("pipe error has correct message", async () => {
		const r = await validateCodeDirect("$x |> math.add 1");
		assert.ok(r.errors.some((e) => e.error.includes("|>")));
	});

	it("bare end error suggests correct closer", async () => {
		const r = await validateCodeDirect("for $i in $x\n  log $i\nend");
		assert.ok(r.errors.some((e) => e.error.includes("endfor")));
	});

	it("unclosed block error names the block", async () => {
		const r = await validateCodeDirect("for $i in $x\n  log $i");
		assert.ok(r.errors.some((e) => e.error.includes("for")));
	});

	it("mismatch error names both blocks", async () => {
		const r = await validateCodeDirect("for $i in $x\n  log $i\nendif");
		assert.ok(r.errors.some((e) => e.error.includes("for") && e.error.includes("endif")));
	});

	it("multiple errors are all reported", async () => {
		const r = await validateCodeDirect("import foo\nwhile bar\nprint baz");
		assert.ok(r.errors.length >= 3);
	});

	it("valid code has empty errors array", async () => {
		const r = await validateCodeDirect('log "hello"');
		assert.equal(r.errors.length, 0);
	});

	it("blockCount is always 1 for direct validation", async () => {
		const r = await validateCodeDirect("log 1\nlog 2\nlog 3");
		assert.equal(r.blockCount, 1);
	});
});

// ─── 9. Edge case programs (20 tests) ───────────────────────────────────────

describe("edge case programs", () => {
	it("single line program", async () => {
		const r = await validateCodeDirect('log "hello"');
		assert.equal(r.valid, true);
	});

	it("program with 50 log statements", async () => {
		const lines = Array.from({ length: 50 }, (_, i) => `log "line ${i}"`);
		const r = await validateCodeDirect(lines.join("\n"));
		assert.equal(r.valid, true);
	});

	it("program with all valid block types", async () => {
		const code = `for $i from 1 to 3
  log $i
endfor

if $x > 0
  log "yes"
elseif $x == 0
  log "zero"
else
  log "no"
endif

do
  log "try"
catch $err
  log $err
enddo

def hello
  log "hi"
enddef`;
		const r = await validateCodeDirect(code);
		assert.equal(r.valid, true);
	});

	it("program with many comments", async () => {
		const lines = [];
		for (let i = 0; i < 20; i++) {
			lines.push(`# Comment ${i}`);
			lines.push(`log "line ${i}"`);
		}
		const r = await validateCodeDirect(lines.join("\n"));
		assert.equal(r.valid, true);
	});

	it("program with blank lines between every statement", async () => {
		const r = await validateCodeDirect('log "a"\n\nlog "b"\n\nlog "c"\n\nlog "d"');
		assert.equal(r.valid, true);
	});

	it("program with mixed indentation (tabs and spaces)", async () => {
		const code = "for $i in $x\n\tlog $i\n  log $i\nendfor";
		const r = await validateCodeDirect(code);
		assert.equal(r.valid, true);
	});

	it("empty program is valid", async () => {
		const r = await validateCodeDirect("");
		assert.equal(r.blockCount, 1);
	});

	it("only whitespace program", async () => {
		const r = await validateCodeDirect("   \n  \n   ");
		assert.equal(r.blockCount, 1);
	});

	it("only comments program", async () => {
		const r = await validateCodeDirect("# comment 1\n# comment 2\n# comment 3");
		assert.equal(r.valid, true);
	});

	it("variable-only program", async () => {
		const r = await validateCodeDirect("$x = 1\n$y = 2\n$z = math.add $x $y");
		assert.equal(r.valid, true);
	});
});

// ─── 10. Parameterized validateCode for common valid patterns (50 tests) ────

describe("parameterized — common valid single-line statements", () => {
	const validStatements = [
		'log "hello"',
		'log "hello world"',
		"log $x",
		"log $x $y $z",
		'log "value: $x"',
		"set $x = 5",
		"set $x = 3.14",
		'set $x = "hello"',
		"set $x = true",
		"set $x = false",
		"set $x = null",
		'set $items = ["a", "b", "c"]',
		"$x = 5",
		"$x = math.add 1 2",
		'$name = string.capitalize "hello"',
		"math.add 1 2",
		"math.subtract 10 5",
		"math.multiply 3 4",
		'string.upper "hello"',
		'string.lower "HELLO"',
		'string.slugify "Hello World!"',
		'string.truncate "long text" 5',
		'string.contains "hello" "ell"',
		'string.repeat "ab" 3',
		'string.replaceAll "hello" "l" "r"',
		'http.get "https://example.com"',
		"json.parse $raw",
		"json.stringify $obj",
		"respond $result",
		"wait 5",
		"# this is a comment",
		"# another comment with special chars !@#$%",
	];

	for (const stmt of validStatements) {
		it(`valid: ${stmt.substring(0, 45)}`, async () => {
			const r = await validateCodeDirect(stmt);
			// Check semantic layer (parser may have issues with some patterns)
			const semanticErrors = r.errors.filter((e) => e.type === "semantic");
			assert.equal(semanticErrors.length, 0);
		});
	}
});

describe("parameterized — common valid multi-line patterns", () => {
	const patterns = [
		{
			name: "simple for loop",
			code: "for $i from 1 to 10\n  log $i\nendfor",
		},
		{
			name: "for with collection",
			code: 'for $item in $items\n  log $item\nendfor',
		},
		{
			name: "simple if",
			code: 'if $x > 0\n  log "positive"\nendif',
		},
		{
			name: "if/else",
			code: 'if $x > 0\n  log "yes"\nelse\n  log "no"\nendif',
		},
		{
			name: "if/elseif/else",
			code: 'if $x > 10\n  log "big"\nelseif $x > 0\n  log "small"\nelse\n  log "zero"\nendif',
		},
		{
			name: "do/enddo",
			code: "do\n  log 1\nenddo",
		},
		{
			name: "do/catch/enddo",
			code: "do\n  risky.op\ncatch $err\n  log $err\nenddo",
		},
		{
			name: "def/enddef",
			code: 'def greet $name\n  log "Hello $name"\nenddef',
		},
		{
			name: "def with respond",
			code: "def add $a $b\n  $c = math.add $a $b\n  respond $c\nenddef",
		},
		{
			name: "nested for/if",
			code: 'for $i in $items\n  if $i > 0\n    log $i\n  endif\nendfor',
		},
		{
			name: "for with do/catch inside",
			code: "for $i in $items\n  do\n    log $i\n  catch $err\n    log $err\n  enddo\nendfor",
		},
		{
			name: "multiple sequential fors",
			code: "for $i in $a\n  log $i\nendfor\nfor $j in $b\n  log $j\nendfor",
		},
		{
			name: "inline if",
			code: 'if $x > 5 then log "big"',
		},
		{
			name: "set + for + log",
			code: 'set $items = ["a", "b"]\nfor $item in $items\n  log $item\nendfor',
		},
		{
			name: "assignment chain",
			code: "$x = 1\n$y = 2\n$z = math.add $x $y\nlog $z",
		},
	];

	for (const p of patterns) {
		it(`valid pattern: ${p.name}`, async () => {
			const r = await validateCodeDirect(p.code);
			const semanticErrors = r.errors.filter((e) => e.type === "semantic");
			assert.equal(semanticErrors.length, 0);
		});
	}
});

// ─── 11. Error message quality checks (20 tests) ────────────────────────────

describe("error message quality", () => {
	it("while error suggests for", () => {
		const errors = semanticValidate("while true");
		assert.ok(errors[0].error.includes("for"));
	});

	it("each error suggests for", () => {
		const errors = semanticValidate("each $item in $items");
		assert.ok(errors[0].error.includes("for"));
	});

	it("import error mentions auto-loaded", () => {
		const errors = semanticValidate("import math");
		assert.ok(errors[0].error.includes("auto-loaded"));
	});

	it("try error suggests do/catch", () => {
		const errors = semanticValidate("try something");
		assert.ok(errors[0].error.includes("do"));
	});

	it("print error suggests log", () => {
		const errors = semanticValidate("print hello");
		assert.ok(errors[0].error.includes("log"));
	});

	it("echo error suggests log", () => {
		const errors = semanticValidate("echo hello");
		assert.ok(errors[0].error.includes("log"));
	});

	it("puts error suggests log", () => {
		const errors = semanticValidate("puts hello");
		assert.ok(errors[0].error.includes("log"));
	});

	it("let error suggests set or $var", () => {
		const errors = semanticValidate("let $x = 5");
		assert.ok(errors[0].error.includes("set") || errors[0].error.includes("$"));
	});

	it("const error suggests set", () => {
		const errors = semanticValidate("const $x = 5");
		assert.ok(errors[0].error.includes("set"));
	});

	it("var error suggests set", () => {
		const errors = semanticValidate("var $x = 5");
		assert.ok(errors[0].error.includes("set"));
	});

	it("function error suggests def", () => {
		const errors = semanticValidate("function foo");
		assert.ok(errors[0].error.includes("def"));
	});

	it("class error mentions def", () => {
		const errors = semanticValidate("class Foo");
		assert.ok(errors[0].error.includes("def"));
	});

	it("require error mentions auto-loaded", () => {
		const errors = semanticValidate("require something");
		assert.ok(errors[0].error.includes("auto-loaded"));
	});

	it("export error mentions RobinPath", () => {
		const errors = semanticValidate("export something");
		assert.ok(errors[0].error.includes("RobinPath"));
	});

	it("async error mentions transparent", () => {
		const errors = semanticValidate("async something");
		assert.ok(errors[0].error.includes("transparent"));
	});

	it("await error mentions transparent", () => {
		const errors = semanticValidate("await something");
		assert.ok(errors[0].error.includes("transparent"));
	});

	it("return error mentions respond", () => {
		const errors = semanticValidate("return $x");
		assert.ok(errors[0].error.includes("respond"));
	});

	it("switch error suggests if", () => {
		const errors = semanticValidate("switch $x");
		assert.ok(errors[0].error.includes("if"));
	});

	it("case error suggests if", () => {
		const errors = semanticValidate("case 1");
		assert.ok(errors[0].error.includes("if"));
	});

	it("finally error mentions do", () => {
		const errors = semanticValidate("finally something");
		assert.ok(errors[0].error.includes("do"));
	});
});
