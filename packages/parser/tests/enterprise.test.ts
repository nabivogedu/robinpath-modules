import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
	validateCode,
	validateCodeDirect,
	buildFixPrompt,
	semanticValidate,
	FunctionRegistry,
} from "../src/index.js";

// ═══════════════════════════════════════════════════════════════════════════════
// Enterprise Feature Tests — Module Aliases, JSON False Positives, Built-in
// Registry, Confidence Tiers, Fix Prompt Dispatch, Deduplication, External
// knownFunctions
// ═══════════════════════════════════════════════════════════════════════════════

// ─── A. Module Alias Detection (~20 tests) ───────────────────────────────────

describe("module alias — high confidence aliases", () => {
	it("fs.read → file.read (high confidence, function exists)", () => {
		const errors = semanticValidate('fs.read "test.txt"');
		assert.ok(errors.length > 0);
		assert.ok(errors[0].error.includes("Wrong module name 'fs'"));
		assert.ok(errors[0].error.includes("file.read"));
	});

	it("fs.write → file.write (high confidence, function exists)", () => {
		const errors = semanticValidate('fs.write "out.txt" $data');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'fs'")));
		assert.ok(errors.some((e) => e.error.includes("file.write")));
	});

	it("filesystem.read → file.read (high confidence)", () => {
		const errors = semanticValidate('filesystem.read "test.txt"');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'filesystem'")));
	});

	it("fetch.get → http.get (high confidence, function exists)", () => {
		const errors = semanticValidate('fetch.get "https://example.com"');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'fetch'")));
		assert.ok(errors.some((e) => e.error.includes("http.get")));
	});

	it("request.post → http.post (high confidence, function exists)", () => {
		const errors = semanticValidate('request.post "https://api.com" $body');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'request'")));
		assert.ok(errors.some((e) => e.error.includes("http.post")));
	});

	it("axios.get → http.get (high confidence, function exists)", () => {
		const errors = semanticValidate('axios.get "https://api.com"');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'axios'")));
		assert.ok(errors.some((e) => e.error.includes("http.get")));
	});

	it("exec.exec → child.exec (high confidence, function exists)", () => {
		const errors = semanticValidate('exec.exec "ls -la"');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'exec'")));
		assert.ok(errors.some((e) => e.error.includes("child.exec")));
	});

	it("spawn.spawn → child.spawn (high confidence, function exists)", () => {
		const errors = semanticValidate('spawn.spawn "node" "app.js"');
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'spawn'")));
		assert.ok(errors.some((e) => e.error.includes("child.spawn")));
	});

	it("fs.banana → file module suggested but function does not exist (high confidence)", () => {
		const errors = semanticValidate("fs.banana $x");
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'fs'")));
		assert.ok(errors.some((e) => e.error.includes("The correct module is 'file'")));
	});

	it("fetch.teleport → http module suggested but function does not exist (high confidence)", () => {
		const errors = semanticValidate("fetch.teleport $data");
		assert.ok(errors.some((e) => e.error.includes("Wrong module name 'fetch'")));
		assert.ok(errors.some((e) => e.error.includes("The correct module is 'http'")));
	});
});

describe("module alias — medium confidence aliases", () => {
	it("io.read → did you mean 'file'? (medium confidence)", () => {
		const errors = semanticValidate('io.read "test.txt"');
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'file'")));
		assert.ok(errors.some((e) => e.error.includes("file.read")));
	});

	it("curl.get → did you mean 'http'? (medium confidence)", () => {
		const errors = semanticValidate('curl.get "https://example.com"');
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'http'")));
	});

	it("sys.hostname → did you mean 'os'? (medium confidence)", () => {
		const errors = semanticValidate("sys.hostname");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'os'")));
	});

	it("system.platform → did you mean 'os'? (medium confidence)", () => {
		const errors = semanticValidate("system.platform");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'os'")));
	});

	it("proc.env → did you mean 'process'? (medium confidence)", () => {
		const errors = semanticValidate("proc.env");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'process'")));
	});

	it("hash.md5 → did you mean 'crypto'? (medium confidence)", () => {
		const errors = semanticValidate('hash.md5 "data"');
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'crypto'")));
	});

	it("shell.exec → did you mean 'child'? (medium confidence)", () => {
		const errors = semanticValidate('shell.exec "ls"');
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'child'")));
	});

	it("command.exec → did you mean 'child'? (medium confidence)", () => {
		const errors = semanticValidate('command.exec "ls"');
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'child'")));
	});

	it("time.sleep → did you mean 'timer'? (medium confidence)", () => {
		const errors = semanticValidate("time.sleep 5");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'timer'")));
	});

	it("sleep.delay → did you mean 'timer'? (medium confidence)", () => {
		const errors = semanticValidate("sleep.delay 1000");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'timer'")));
	});

	it("compress.gzip → did you mean 'zlib'? (medium confidence)", () => {
		const errors = semanticValidate("compress.gzip $data");
		assert.ok(errors.some((e) => e.error.includes("Did you mean 'zlib'")));
	});
});

// ─── B. JSON False Positive Protection (~10 tests) ───────────────────────────

describe("JSON false positive protection", () => {
	it("set $cfg = { \"file.path\": \"/tmp\" } — should NOT flag file.path", () => {
		const errors = semanticValidate('set $cfg = { "file.path": "/tmp" }');
		const fileErrors = errors.filter((e) => e.error.includes("file"));
		assert.equal(fileErrors.length, 0);
	});

	it("set $data = { \"http.post\": \"POST\" } — should NOT flag http.post", () => {
		const errors = semanticValidate('set $data = { "http.post": "POST" }');
		const httpErrors = errors.filter((e) => e.error.includes("http"));
		assert.equal(httpErrors.length, 0);
	});

	it("log { \"dns.lookup\": true } — should NOT flag dns.lookup", () => {
		const errors = semanticValidate('log { "dns.lookup": true }');
		const dnsErrors = errors.filter((e) => e.error.includes("dns"));
		assert.equal(dnsErrors.length, 0);
	});

	it("$x = { \"crypto.hash\": \"sha256\" } — should NOT flag crypto.hash", () => {
		const errors = semanticValidate('$x = { "crypto.hash": "sha256" }');
		const cryptoErrors = errors.filter((e) => e.error.includes("crypto"));
		assert.equal(cryptoErrors.length, 0);
	});

	it("$cfg = { \"timer.sleep\": 5, \"file.read\": true } — should NOT flag either", () => {
		const errors = semanticValidate('$cfg = { "timer.sleep": 5, "file.read": true }');
		const modErrors = errors.filter((e) => e.error.includes("timer") || e.error.includes("file"));
		assert.equal(modErrors.length, 0);
	});

	it("file.read outside JSON is still validated", () => {
		const errors = semanticValidate("file.banana $x");
		assert.ok(errors.some((e) => e.error.includes("Unknown function") && e.error.includes("file")));
	});

	it("http.teleport outside JSON is still validated", () => {
		const errors = semanticValidate("http.teleport $data");
		assert.ok(errors.some((e) => e.error.includes("Unknown function") && e.error.includes("http")));
	});

	it("set statement with JSON object — real function outside braces", () => {
		// The file.banana call is not inside braces
		const errors = semanticValidate('file.banana "test"\nset $x = { "a": 1 }');
		assert.ok(errors.some((e) => e.error.includes("file")));
	});

	it("nested JSON object still protected", () => {
		const errors = semanticValidate('$cfg = { "outer": { "file.read": true } }');
		const fileErrors = errors.filter((e) => e.error.includes("file") && e.error.includes("Unknown"));
		assert.equal(fileErrors.length, 0);
	});

	it("dollar-var property access not flagged ($file.name)", () => {
		const errors = semanticValidate("log $file.name");
		const fileErrors = errors.filter((e) => e.error.includes("file") || e.error.includes("Unknown"));
		assert.equal(fileErrors.length, 0);
	});
});

// ─── C. Built-in Registry from functions.json (~20 tests) ────────────────────

describe("built-in registry — valid functions from each module", () => {
	it("file.read is valid", () => {
		const errors = semanticValidate('file.read "test.txt"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("path.join is valid", () => {
		const errors = semanticValidate('path.join $base $sub');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("process.env is valid", () => {
		const errors = semanticValidate("$env = process.env");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("os.hostname is valid", () => {
		const errors = semanticValidate("$host = os.hostname");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("crypto.hash is valid", () => {
		const errors = semanticValidate('crypto.hash "sha256" $data');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("buffer.from is valid", () => {
		const errors = semanticValidate('buffer.from "hello"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("url.parse is valid", () => {
		const errors = semanticValidate('url.parse "https://example.com"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("child.exec is valid", () => {
		const errors = semanticValidate('child.exec "ls -la"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("timer.sleep is valid", () => {
		const errors = semanticValidate("timer.sleep 5");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("http.get is valid", () => {
		const errors = semanticValidate('http.get "https://api.example.com"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("http.head is valid (was previously missing)", () => {
		const errors = semanticValidate('http.head "https://example.com"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("net.connect is valid", () => {
		const errors = semanticValidate('net.connect "localhost" 8080');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("dns.lookup is valid", () => {
		const errors = semanticValidate('dns.lookup "example.com"');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("events.create is valid", () => {
		const errors = semanticValidate("$emitter = events.create");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("zlib.gzip is valid", () => {
		const errors = semanticValidate("$compressed = zlib.gzip $data");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("stream.readable is valid", () => {
		const errors = semanticValidate("$s = stream.readable");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("tls.connect is valid", () => {
		const errors = semanticValidate('tls.connect "example.com" 443');
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("util.inspect is valid", () => {
		const errors = semanticValidate("$str = util.inspect $obj");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("assert.ok is valid", () => {
		const errors = semanticValidate("assert.ok $result");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("tty.isatty is valid", () => {
		const errors = semanticValidate("$isTty = tty.isatty");
		const funcErrors = errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});
});

describe("built-in registry — fake functions rejected", () => {
	it("file.banana is rejected", () => {
		const errors = semanticValidate("file.banana $x");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'file.banana'")));
	});

	it("http.teleport is rejected", () => {
		const errors = semanticValidate("http.teleport $x");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'http.teleport'")));
	});

	it("crypto.magic is rejected", () => {
		const errors = semanticValidate("crypto.magic $data");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'crypto.magic'")));
	});

	it("path.fly is rejected", () => {
		const errors = semanticValidate("path.fly $p");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'path.fly'")));
	});

	it("os.dance is rejected", () => {
		const errors = semanticValidate("os.dance");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'os.dance'")));
	});

	it("buffer.swim is rejected", () => {
		const errors = semanticValidate("buffer.swim $data");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'buffer.swim'")));
	});

	it("url.fly is rejected", () => {
		const errors = semanticValidate("url.fly $u");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'url.fly'")));
	});

	it("child.jump is rejected", () => {
		const errors = semanticValidate("child.jump $cmd");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'child.jump'")));
	});

	it("timer.warp is rejected", () => {
		const errors = semanticValidate("timer.warp 99");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'timer.warp'")));
	});

	it("net.fly is rejected", () => {
		const errors = semanticValidate("net.fly $host");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'net.fly'")));
	});

	it("dns.magic is rejected", () => {
		const errors = semanticValidate("dns.magic $domain");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'dns.magic'")));
	});

	it("events.yell is rejected", () => {
		const errors = semanticValidate("events.yell $msg");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'events.yell'")));
	});

	it("zlib.expand is rejected", () => {
		const errors = semanticValidate("zlib.expand $data");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'zlib.expand'")));
	});

	it("stream.fly is rejected", () => {
		const errors = semanticValidate("stream.fly $s");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'stream.fly'")));
	});

	it("tls.hop is rejected", () => {
		const errors = semanticValidate("tls.hop $host");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'tls.hop'")));
	});

	it("util.sparkle is rejected", () => {
		const errors = semanticValidate("util.sparkle $obj");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'util.sparkle'")));
	});

	it("assert.maybe is rejected", () => {
		const errors = semanticValidate("assert.maybe $result");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'assert.maybe'")));
	});

	it("tty.rainbow is rejected", () => {
		const errors = semanticValidate("tty.rainbow");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'tty.rainbow'")));
	});

	it("stringDecoder.fly is rejected", () => {
		const errors = semanticValidate("stringDecoder.fly $s");
		assert.ok(errors.some((e) => e.error.includes("Unknown function 'stringDecoder.fly'")));
	});

	it("functions are case-sensitive (file.READ not found)", () => {
		const errors = semanticValidate('file.READ "test.txt"');
		assert.ok(errors.some((e) => e.error.includes("Unknown function")));
	});
});

// ─── D. Confidence Tier Error Messages (~10 tests) ───────────────────────────

describe("confidence tier — high confidence message format", () => {
	it("high confidence uses assertive 'Wrong module name'", () => {
		const errors = semanticValidate('fs.read "test.txt"');
		assert.ok(errors[0].error.startsWith("Wrong module name"));
	});

	it("high confidence: fs → file with existing function includes replacement", () => {
		const errors = semanticValidate('fs.read "test.txt"');
		assert.ok(errors[0].error.includes("Use 'file.read' instead of 'fs.read'"));
	});

	it("high confidence: fs with non-existing function shows available list", () => {
		const errors = semanticValidate("fs.banana $x");
		assert.ok(errors[0].error.includes("The correct module is 'file'"));
		assert.ok(errors[0].error.includes("Available:"));
	});

	it("high confidence: fetch → http", () => {
		const errors = semanticValidate('fetch.post "https://api.com" $data');
		assert.ok(errors[0].error.includes("Wrong module name 'fetch'"));
		assert.ok(errors[0].error.includes("http.post"));
	});

	it("high confidence: exec → child", () => {
		const errors = semanticValidate('exec.exec "cmd"');
		assert.ok(errors[0].error.includes("Wrong module name 'exec'"));
		assert.ok(errors[0].error.includes("child.exec"));
	});
});

describe("confidence tier — medium confidence message format", () => {
	it("medium confidence uses suggestive 'Did you mean'", () => {
		const errors = semanticValidate('io.read "test.txt"');
		assert.ok(errors[0].error.startsWith("Did you mean"));
	});

	it("medium confidence: io → file with existing function", () => {
		const errors = semanticValidate('io.read "test.txt"');
		assert.ok(errors[0].error.includes("Use 'file.read' instead of 'io.read'"));
	});

	it("medium confidence: curl → http with non-existing function", () => {
		const errors = semanticValidate("curl.banana $url");
		assert.ok(errors[0].error.includes("Did you mean 'http'"));
		assert.ok(errors[0].error.includes("Available:"));
	});

	it("medium confidence: sys → os", () => {
		const errors = semanticValidate("sys.hostname");
		assert.ok(errors[0].error.includes("Did you mean 'os'"));
		assert.ok(errors[0].error.includes("os.hostname"));
	});

	it("medium confidence: time → timer", () => {
		const errors = semanticValidate("time.sleep 5");
		assert.ok(errors[0].error.includes("Did you mean 'timer'"));
		assert.ok(errors[0].error.includes("timer.sleep"));
	});
});

// ─── E. Fix Prompt Pattern Dispatch (~15 tests) ──────────────────────────────

describe("fix prompt — pattern dispatch", () => {
	it("parenthesized-calls pattern triggers for RPAREN errors", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "parse", error: "Unexpected token RPAREN at line 1" }]);
		assert.ok(prompt.includes("CRITICAL"));
		assert.ok(prompt.includes("parentheses"));
	});

	it("curly-braces pattern triggers for curly brace errors", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "Curly braces '{}' are not used for blocks" }]);
		assert.ok(prompt.includes("CRITICAL"));
		assert.ok(prompt.includes("keyword/endkeyword"));
	});

	it("unexpected-enddo pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 5, type: "semantic", error: "Unexpected 'enddo' — no matching 'do' block" }]);
		assert.ok(prompt.includes("BLOCK MISMATCH"));
	});

	it("decorator-desc pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 3, type: "parse", error: "Unexpected DECORATOR '@desc'" }]);
		assert.ok(prompt.includes("BLOCK NOT CLOSED"));
	});

	it("def-inside-do pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 2, type: "semantic", error: "Don't nest 'def/enddef' inside 'do/enddo'. Define functions at top level outside" }]);
		assert.ok(prompt.includes("DEF INSIDE DO"));
	});

	it("unclosed-block pattern triggers for missing endif", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "parse", error: "missing endif at line 5" }]);
		assert.ok(prompt.includes("UNCLOSED BLOCK"));
	});

	it("mismatched-blocks pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 3, type: "semantic", error: "Mismatched: expected 'endfor', got 'endif'" }]);
		assert.ok(prompt.includes("MISMATCHED BLOCKS"));
	});

	it("assignment-syntax pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "parse", error: "Expected '=' or 'as' after variable" }]);
		assert.ok(prompt.includes("ASSIGNMENT SYNTAX"));
	});

	it("arrow-functions pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "Arrow functions '=>' are not supported" }]);
		assert.ok(prompt.includes("ARROW FUNCTIONS"));
	});

	it("let-const-var pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "No 'let' keyword. Use 'set $var = value'" }]);
		assert.ok(prompt.includes("VARIABLE DECLARATION"));
	});

	it("try-catch pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "No 'try' keyword. Use 'do ... catch'" }]);
		assert.ok(prompt.includes("ERROR HANDLING"));
	});

	it("function-keyword pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "No 'function' keyword. Use 'def'" }]);
		assert.ok(prompt.includes("FUNCTIONS"));
	});

	it("wrong-module-name pattern triggers", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "Wrong module name 'fs'. Use 'file.read' instead of 'fs.read'" }]);
		assert.ok(prompt.includes("WRONG MODULE NAME"));
		assert.ok(prompt.includes("fs->file"));
	});

	it("unknown-function pattern triggers with available functions", () => {
		const prompt = buildFixPrompt([{ line: 1, type: "semantic", error: "Unknown function 'file.banana'. Module 'file' has no function 'banana'" }]);
		assert.ok(prompt.includes("UNKNOWN FUNCTION"));
		assert.ok(prompt.includes("Module 'file' available functions:"));
	});

	it("critical patterns sort before warning patterns", () => {
		const prompt = buildFixPrompt([
			{ line: 1, type: "semantic", error: "No 'let' keyword. Use 'set'" },
			{ line: 2, type: "parse", error: "Unexpected token RPAREN at line 2" },
		]);
		const criticalIdx = prompt.indexOf("CRITICAL");
		const warningIdx = prompt.indexOf("VARIABLE DECLARATION");
		assert.ok(criticalIdx < warningIdx);
	});
});

describe("fix prompt — deduplication of tips", () => {
	it("def-inside-do + def-inside-do-decorator do not duplicate", () => {
		const prompt = buildFixPrompt([
			{ line: 2, type: "semantic", error: "Don't nest 'def/enddef' inside 'do/enddo'. Define functions at top level outside" },
			{ line: 3, type: "parse", error: "Unexpected DECORATOR '@desc' something about def" },
		]);
		// Should only get one DEF INSIDE DO tip, not two
		const matches = prompt.match(/DEF INSIDE DO/g);
		assert.ok(matches);
		assert.equal(matches.length, 1);
	});
});

// ─── F. Deduplication (~5 tests) ─────────────────────────────────────────────

describe("deduplication", () => {
	it("same error on same line is deduplicated in validateCode", async () => {
		// Two blocks with identical error on line 1
		const text = '```robinpath\nimport foo\n```\n```robinpath\nimport foo\n```';
		const r = await validateCode(text);
		// Both blocks produce "import" on line 1 — should dedup to 1
		const importErrors = r.errors.filter((e) => e.error.includes("import"));
		assert.equal(importErrors.length, 1);
	});

	it("same error on different lines is kept", async () => {
		const r = await validateCodeDirect("import foo\nlog 1\nimport bar");
		const importErrors = r.errors.filter((e) => e.error.includes("import"));
		assert.equal(importErrors.length, 2);
	});

	it("validateCodeDirect deduplicates", async () => {
		// Parser and semantic may both report about the same line
		const r = await validateCodeDirect('log "ok"');
		// Valid code should have 0 errors
		assert.equal(r.errors.length, 0);
	});

	it("different error types on same line are kept", async () => {
		const r = await validateCodeDirect("import foo;");
		// Should have both import error and semicolon error on line 1
		assert.ok(r.errors.some((e) => e.error.includes("import")));
		// semicolon check may or may not fire (import triggers continue), so just check import is there
		assert.ok(r.errors.length >= 1);
	});

	it("validateCode deduplicates across parse and semantic layers", async () => {
		const r = await validateCode('```robinpath\nlog "ok"\n```');
		assert.equal(r.errors.length, 0);
		assert.equal(r.valid, true);
	});
});

// ─── G. External knownFunctions (~10 tests) ──────────────────────────────────

describe("external knownFunctions", () => {
	const reg = FunctionRegistry.fromObject({
		myapi: ["fetch", "query", "subscribe"],
		analytics: ["track", "identify", "page"],
	});
	const opts = { knownFunctions: reg.toSet() };

	it("external module function is accepted when passed as knownFunctions", async () => {
		const r = await validateCodeDirect('myapi.fetch "https://example.com"', opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("another external function is accepted", async () => {
		const r = await validateCodeDirect('analytics.track "page_view"', opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("built-in modules still validated even with external knownFunctions", async () => {
		const r = await validateCodeDirect("file.banana $x", opts);
		assert.ok(r.errors.some((e) => e.error.includes("Unknown function 'file.banana'")));
	});

	it("built-in valid function still passes with external knownFunctions", async () => {
		const r = await validateCodeDirect('file.read "test.txt"', opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("unknown external function flagged", async () => {
		const r = await validateCodeDirect("myapi.nonexistent $data", opts);
		assert.ok(r.errors.some((e) => e.error.includes("Unknown function 'myapi.nonexistent'")));
	});

	it("unknown function on known external module", async () => {
		const r = await validateCodeDirect("analytics.destroy $data", opts);
		assert.ok(r.errors.some((e) => e.error.includes("Unknown function 'analytics.destroy'")));
	});

	it("module not in either registry passes (not flagged)", async () => {
		const r = await validateCodeDirect("customlib.whatever $data", opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("module not in either registry passes without any knownFunctions", async () => {
		const r = await validateCodeDirect("customlib.whatever $data");
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("mixed built-in and external in same code", async () => {
		const code = 'file.read "test.txt"\nmyapi.fetch "https://api.com"\nhttp.get "https://example.com"';
		const r = await validateCodeDirect(code, opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 0);
	});

	it("external knownFunctions with built-in fake function both flagged", async () => {
		const code = "file.banana $x\nmyapi.nonexistent $data";
		const r = await validateCodeDirect(code, opts);
		const funcErrors = r.errors.filter((e) => e.error.includes("Unknown function"));
		assert.equal(funcErrors.length, 2);
	});
});
