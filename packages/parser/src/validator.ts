/**
 * Enterprise RobinPath Code Validator
 *
 * Two-layer validation:
 * 1. Parser validation — uses the real @wiredwp/robinpath Parser (catches structural errors)
 * 2. Semantic validation — catches patterns the parser accepts but fail at runtime
 *
 * Common LLM mistakes caught:
 * - Bare `end` instead of `endfor`/`endif`/`enddo`/`endon`/`enddef`
 * - Invalid keywords: `while`, `each`, `import`, `try` (parser accepts as commands)
 * - Unclosed blocks, mismatched block pairs
 * - Non-existent function calls (checked against known function index)
 * - Wrong call style: parenthesized calls like fn(a, b) instead of fn a b
 * - Pipe operator |> (not in language)
 * - Semicolons at end of lines
 */

import { Parser } from "@wiredwp/robinpath";
// @ts-ignore — JSON import works with resolveJsonModule, suppress module resolution warning
import builtinRegistry from "./functions.json";

// ─── Named Regex Constants ──────────────────────────────────────────────────

const RE_CODE_BLOCK = /```(?:robinpath|robin|rp)\s*\n([\s\S]*?)```/g;
const RE_PAREN_CALL = /([a-zA-Z_]\w*\.[a-zA-Z_]\w*)\s*\(/;
const RE_ARROW_FN = /=>/;
const RE_FUNC_CALL = /(?<!\$)\b([a-zA-Z_]\w*\.[a-zA-Z_]\w*)\b/g;
const RE_LINE_NUM = /line (\d+)/i;
const RE_MISSING_ENDIF = /missing endif/i;
const RE_IF_FN_COND = /^if\s+[a-zA-Z]\w*\.?\w*\s+\$/i;
const RE_IF_DOLLAR = /^if\s+\$/;
const RE_IF_NOT_DOLLAR = /^if\s+not\s+\$/i;
const RE_DECORATOR_DESC = /DECORATOR '@desc'/;
const RE_RPAREN = /RPAREN|Unexpected token.*\)/;
const RE_PAREN_FN_LINE = /([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?)\s*\(/;
const RE_INVALID_PROP_ACCESS = /Invalid property access.*\.\./;
const RE_EXPECTED_EQ_AS = /Expected '=' or 'as' after variable/;
const RE_IF_ELSEIF = /^(if|elseif)\s+/i;
const RE_IF_ELSEIF_DOLLAR = /^(if|elseif)\s+\$/i;
const RE_IF_ELSEIF_NOT_DOLLAR = /^(if|elseif)\s+not\s+\$/i;
const RE_IF_COND_WORD = /^(?:if|elseif)\s+([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?)/i;
const RE_AND_OR_FN_CALL = /\b(and|or)\s+[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)\s+\$/;
const RE_FOR_PAREN_RANGE = /^for\s+\$\w+\s+in\s+\(/;
const RE_FOR_IN_RANGE = /^for\s+\$\w+\s+in\s+range\b/i;
const RE_FOR_DOTDOT = /^for\s+.*\.\./;
const RE_MATH_PARENS = /\w\s+\([^)]*[\+\-\*\/][^)]*\)/;
const RE_NESTED_CALL_PARENS = /^[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?\s+.*\([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?\s+\$/;
const RE_INLINE_ARITH = /^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?)\s+.*\$\w+\s*[\+\-]\s*\d+\s*$/;
const RE_STRIP_DBL_QUOTES = /"(?:[^"\\]|\\.)*"/g;
const RE_STRIP_SGL_QUOTES = /'(?:[^'\\]|\\.)*'/g;
const RE_STRIP_BACKTICKS = /`(?:[^`\\]|\\.)*`/g;

// ─── Built-in Module Registry ────────────────────────────────────────────────
// Loaded from functions.json — 20 native modules bundled with the CLI.

const BUILTIN_MODULES: Record<string, string[]> = builtinRegistry.modules;

// Build a Set of "module.function" strings for fast lookup
const BUILTIN_FUNCTIONS: Set<string> = new Set();
for (const [mod, fns] of Object.entries(BUILTIN_MODULES)) {
	for (const fn of fns) {
		BUILTIN_FUNCTIONS.add(`${mod}.${fn}`);
	}
}

// Set of known module names (for suggesting corrections)
const BUILTIN_MODULE_NAMES = new Set(Object.keys(BUILTIN_MODULES));

// ─── Module Aliases with Confidence Tiers ────────────────────────────────────

interface ModuleAlias {
	target: string;
	confidence: "high" | "medium";
}

const MODULE_ALIASES: Record<string, ModuleAlias> = {
	fs: { target: "file", confidence: "high" },
	filesystem: { target: "file", confidence: "high" },
	io: { target: "file", confidence: "medium" },
	fetch: { target: "http", confidence: "high" },
	request: { target: "http", confidence: "high" },
	axios: { target: "http", confidence: "high" },
	curl: { target: "http", confidence: "medium" },
	sys: { target: "os", confidence: "medium" },
	system: { target: "os", confidence: "medium" },
	proc: { target: "process", confidence: "medium" },
	hash: { target: "crypto", confidence: "medium" },
	exec: { target: "child", confidence: "high" },
	spawn: { target: "child", confidence: "high" },
	shell: { target: "child", confidence: "medium" },
	command: { target: "child", confidence: "medium" },
	time: { target: "timer", confidence: "medium" },
	wait: { target: "timer", confidence: "medium" },
	sleep: { target: "timer", confidence: "medium" },
	compress: { target: "zlib", confidence: "medium" },
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ValidationError {
	line: number;
	type: "parse" | "semantic";
	error: string;
}

export interface ValidationResult {
	valid: boolean;
	blockCount: number;
	errors: ValidationError[];
}

export interface ValidatorOptions {
	/** Known function names for registry validation (e.g. ["math.add", "string.capitalize"]) */
	knownFunctions?: Set<string>;
}

// ─── Code block extraction ───────────────────────────────────────────────────

export function extractCodeBlocks(text: string): string[] {
	const blocks: string[] = [];
	let match: RegExpExecArray | null;
	RE_CODE_BLOCK.lastIndex = 0;
	while ((match = RE_CODE_BLOCK.exec(text)) !== null) {
		blocks.push(match[1].trim());
	}
	return blocks;
}

// ─── Layer 1: Parser validation ──────────────────────────────────────────────

export async function parserValidate(
	code: string,
): Promise<ValidationError[]> {
	try {
		const parser = new Parser(code);
		await parser.parse();
		return [];
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		const lineMatch = msg.match(RE_LINE_NUM);
		const line = lineMatch ? parseInt(lineMatch[1], 10) : 1;
		return [{ line, type: "parse", error: enrichParserError(msg, code, line) }];
	}
}

/** Rewrite cryptic parser errors into actionable messages */
function enrichParserError(msg: string, code: string, line: number): string {
	const lines = code.split("\n");
	const srcLine = (lines[line - 1] || "").trim();

	// "missing endif" when the real problem is function-call in if condition
	if (RE_MISSING_ENDIF.test(msg) && RE_IF_FN_COND.test(srcLine) && !RE_IF_DOLLAR.test(srcLine) && !RE_IF_NOT_DOLLAR.test(srcLine)) {
		return `${msg}. Line ${line} uses a function call as if-condition ('${srcLine.slice(0, 50)}...'). Compute the result into a variable first, then use 'if $var ...'`;
	}

	// DECORATOR '@desc' inside unclosed block — usually def nested inside do
	if (RE_DECORATOR_DESC.test(msg)) {
		// Scan earlier lines for def inside do
		const priorLines = lines.slice(0, line - 1);
		let inDo = false;
		let defInsideDo = false;
		for (const pl of priorLines) {
			const t = pl.trim().split(/\s/)[0]?.toLowerCase();
			if (t === "do") inDo = true;
			if (t === "enddo") inDo = false;
			if (t === "def" && inDo) defInsideDo = true;
		}
		if (defInsideDo) {
			return `${msg}. You nested a 'def' block inside a 'do' block — this is not allowed. Move 'def/enddef' OUTSIDE of 'do/enddo'. Define functions separately, then call them from inside 'do' blocks`;
		}
		return `${msg}. Make sure every 'do' block is closed with 'enddo' BEFORE starting a new @desc section`;
	}

	// RPAREN — parenthesized function calls
	if (RE_RPAREN.test(msg)) {
		const parenMatch = srcLine.match(RE_PAREN_FN_LINE);
		if (parenMatch) {
			return `${msg}. Do NOT use parentheses for function calls. Write '${parenMatch[1]} arg1 arg2' instead of '${parenMatch[1]}(arg1, arg2)'`;
		}
	}

	// "Invalid property access: .." — usually range syntax like [$x..$y]
	if (RE_INVALID_PROP_ACCESS.test(msg)) {
		return `${msg}. The '..' range operator does not exist. Use 'for $i from $start to $end'. If you need $n-1, compute first: 'math.subtract $n 1 into $limit'`;
	}

	// "Expected '=' or 'as' after variable" — usually wrong assignment syntax
	if (RE_EXPECTED_EQ_AS.test(msg)) {
		return `${msg}. To capture output, use 'command arg1 arg2 into $var' — not '$var = command(args)' or '$var command args'`;
	}

	return msg;
}

// ─── Layer 2: Semantic validation ────────────────────────────────────────────

/** Keywords that LLMs generate but don't exist in RobinPath */
const INVALID_FIRST_WORDS: Record<string, string> = {
	while: "No 'while' keyword in RobinPath. Use 'for $i from 1 to N ... endfor'",
	each: "No 'each' keyword. Use 'for $item in $collection ... endfor'",
	import: "No 'import' keyword. Installed modules are auto-loaded",
	try: "No 'try' keyword. Use 'do ... catch $err ... enddo' for error handling",
	finally: "No 'finally' keyword. Use 'do ... enddo'",
	switch: "No 'switch' keyword. Use if/elseif/else/endif",
	case: "No 'case' keyword. Use if/elseif/else/endif",
	class: "No 'class' keyword. RobinPath uses 'def' for functions",
	function: "No 'function' keyword. Use 'def name ... enddef'",
	fn: "No 'fn' keyword. Use 'def name ... enddef'",
	endfn: "No 'endfn' keyword. Use 'enddef' to close a 'def' block",
	let: "No 'let' keyword. Use 'set $var = value' or '$var = value'",
	const: "No 'const' as statement. Use 'set $var = value'",
	var: "No 'var' as statement. Use 'set $var = value'",
	print: "No 'print' command. Use 'log' instead",
	echo: "No 'echo' command. Use 'log' instead",
	puts: "No 'puts' command. Use 'log' instead",
	"console.log": "No 'console.log'. Use 'log' instead",
	require: "No 'require'. Modules are auto-loaded when installed",
	export: "No 'export' keyword in RobinPath scripts",
	async: "No 'async' keyword. RobinPath handles async transparently",
	await: "No 'await' keyword. RobinPath handles async transparently",
	return: "No 'return' keyword. Use 'respond' inside 'def' blocks",
	throw: "No 'throw' keyword. Errors propagate automatically or use 'do/catch/enddo'",
	new: "No 'new' keyword. RobinPath is not object-oriented",
	delete: "No 'delete' keyword.",
	typeof: "No 'typeof' keyword.",
	instanceof: "No 'instanceof' keyword.",
	"endif;": "Remove the semicolon — RobinPath doesn't use semicolons",
	"endfor;": "Remove the semicolon — RobinPath doesn't use semicolons",
	"enddo;": "Remove the semicolon — RobinPath doesn't use semicolons",
};

/** Block opener → expected closer */
const BLOCK_OPENERS: Record<string, string> = {
	for: "endfor",
	if: "endif",
	do: "enddo",
	on: "endon",
	def: "enddef",
	define: "enddef",
	together: "endtogether",
	with: "endwith",
};

const BLOCK_CLOSERS = new Set(Object.values(BLOCK_OPENERS));

/** Strip string literals to avoid false positives */
function stripStrings(line: string): string {
	return line
		.replace(RE_STRIP_DBL_QUOTES, '""')
		.replace(RE_STRIP_SGL_QUOTES, "''")
		.replace(RE_STRIP_BACKTICKS, "``");
}

/**
 * Check if a match position falls inside a JSON object literal (between { and }).
 * Used to prevent false positives in Check 6 for patterns like: set $cfg = { "file.path": "/tmp" }
 */
function isInsideJsonObject(text: string, matchIndex: number): boolean {
	let depth = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === "{") depth++;
		if (text[i] === "}") depth--;
		if (i === matchIndex && depth > 0) return true;
	}
	return false;
}

export function semanticValidate(
	code: string,
	options?: ValidatorOptions,
): ValidationError[] {
	const errors: ValidationError[] = [];
	const lines = code.split("\n");
	const blockStack: { keyword: string; line: number }[] = [];

	for (let i = 0; i < lines.length; i++) {
		const trimmed = lines[i].trim();
		const lineNum = i + 1;

		// Skip comments and empty lines
		if (trimmed === "" || trimmed.startsWith("#")) continue;

		const noStrings = stripStrings(trimmed);
		const firstWord = noStrings.split(/[\s(]/)[0].toLowerCase();

		// ── Check 1: Invalid keywords ──
		if (firstWord in INVALID_FIRST_WORDS) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: INVALID_FIRST_WORDS[firstWord],
			});
			continue;
		}

		// ── Check 2: Bare 'end' keyword ──
		if (firstWord === "end" && noStrings === "end") {
			if (blockStack.length > 0) {
				const top = blockStack[blockStack.length - 1];
				const expected = BLOCK_OPENERS[top.keyword];
				errors.push({
					line: lineNum,
					type: "semantic",
					error: `Bare 'end' is invalid. Use '${expected}' to close the '${top.keyword}' block from line ${top.line}`,
				});
			} else {
				errors.push({
					line: lineNum,
					type: "semantic",
					error: "Bare 'end' is invalid. Use 'endfor', 'endif', 'enddo', 'endon', or 'enddef'",
				});
			}
			continue;
		}

		// ── Check 3: Semicolons at end of line ──
		if (noStrings.endsWith(";") && !noStrings.startsWith("#")) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Remove the semicolon — RobinPath does not use semicolons",
			});
		}

		// ── Check 4: Pipe operator |> ──
		if (noStrings.includes("|>")) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Pipe operator '|>' is not supported. Chain operations with variables instead",
			});
		}

		// ── Check 5: Function call in if condition ──
		// Catches: if isEqual $x $y, if array.length $arr < 5, if string.contains $s "x"
		if (RE_IF_ELSEIF.test(noStrings) && !RE_IF_ELSEIF_DOLLAR.test(noStrings) && !RE_IF_ELSEIF_NOT_DOLLAR.test(noStrings)) {
			const condMatch = noStrings.match(RE_IF_COND_WORD);
			if (condMatch) {
				const condWord = condMatch[1].toLowerCase();
				if (!["true", "false", "not"].includes(condWord)) {
					const isModuleCall = condMatch[1].includes(".");
					errors.push({
						line: lineNum,
						type: "semantic",
						error: isModuleCall
							? `Don't use function calls in if conditions. Compute first: '${condMatch[1]} ... into $result', then 'if $result ...'`
							: `Don't use function calls in if conditions. Use operators: 'if $x == $y', 'if $x > 5' — not 'if ${condMatch[1]} $x $y'`,
					});
				}
			}
		}

		// ── Check 5a2: Function call after and/or in if conditions ──
		if (/^(if|elseif)\s+/.test(noStrings) && RE_AND_OR_FN_CALL.test(noStrings)) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Don't use function calls inside if conditions (even after 'and'/'or'). Compute each value first into a variable, then compare variables in the if",
			});
		}

		// ── Check 5b: Parenthesized range/expression in for loops ──
		if (RE_FOR_PAREN_RANGE.test(noStrings)) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Don't use parenthesized expressions in 'for'. Use 'for $i from 0 to $n' instead of 'for $i in (0..$n)' or 'for $i in (range 0 $n)'",
			});
		}

		// ── Check 5b2: for ... in range — 'range' is not a keyword ──
		if (RE_FOR_IN_RANGE.test(noStrings)) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "No 'range' keyword in RobinPath. Use 'for $i from 0 to $n' instead of 'for $i in range 0 $n'. If you need ($n-1), compute it first: 'math.subtract $n 1 into $limit', then 'for $i from 0 to $limit'",
			});
		}

		// ── Check 5b3: for ... in [$x..$y] — '..' range syntax not supported ──
		if (RE_FOR_DOTDOT.test(noStrings)) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Range syntax '..' is not supported. Use 'for $i from $start to $end' instead of 'for $i in [$start..$end]'",
			});
		}

		// ── Check 5c: Parenthesized subexpression as function argument ──
		// Catches: array.get $arr ($i+1), math.subtract (array.length $arr) 1, fn (call + 1)
		if (!noStrings.startsWith("if") && !noStrings.startsWith("elseif")) {
			const hasMathParens = RE_MATH_PARENS.test(noStrings);
			const hasNestedCallParens = RE_NESTED_CALL_PARENS.test(noStrings);
			if (hasMathParens || hasNestedCallParens) {
				const isForLine = noStrings.startsWith("for");
				errors.push({
					line: lineNum,
					type: "semantic",
					error: isForLine
						? "Don't use parenthesized math in 'for' ranges. Compute the limit BEFORE the loop: 'math.subtract $n 1 into $limit', then 'for $i from 0 to $limit'"
						: "Don't use parenthesized expressions as arguments. Compute each step separately: 'array.length $arr into $len', then 'math.subtract $len 1 into $result'",
				});
			}
		}

		// ── Check 5c1.5: Arrow functions => ──
		if (RE_ARROW_FN.test(noStrings) && !noStrings.startsWith("#")) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Arrow functions '=>' are not supported in RobinPath. Use 'for $item in $list ... endfor' for iteration or 'def name ... enddef' for functions",
			});
		}

		// ── Check 5c2: Parenthesized function calls — module.fn(...) ──
		// Catches: csv.parse(...), json.stringify($obj), api.get("url"), uuid.uuid()
		// But NOT: $obj.prop (variable access), assignments with JSON objects
		{
			const parenCallMatch = noStrings.match(RE_PAREN_CALL);
			if (
				parenCallMatch &&
				!noStrings.startsWith("$") &&
				!noStrings.startsWith("set ") &&
				!noStrings.startsWith("if ") &&
				!noStrings.startsWith("elseif ")
			) {
				const fn = parenCallMatch[1];
				errors.push({
					line: lineNum,
					type: "semantic",
					error: `Do NOT use parentheses for function calls. Write '${fn} arg1 arg2' instead of '${fn}(arg1, arg2)'`,
				});
			}
		}

		// ── Check 5e: Inline arithmetic in function call arguments ──
		// Catches: quicksort $arr $low $pi - 1, array.get $arr $j + 1
		// But NOT: if $x > 5, set $x = $y + 1, $x = $y - 1 (those are valid)
		if (
			!noStrings.startsWith("if") &&
			!noStrings.startsWith("elseif") &&
			!noStrings.startsWith("set ") &&
			!noStrings.startsWith("$") &&
			!/\binto\b/.test(noStrings)
		) {
			const inlineArithMatch = noStrings.match(RE_INLINE_ARITH);
			if (inlineArithMatch) {
				errors.push({
					line: lineNum,
					type: "semantic",
					error: `Don't use inline arithmetic in function arguments. Compute first: 'math.subtract $var 1 into $temp', then pass $temp to '${inlineArithMatch[1]}'`,
				});
			}
		}

		// ── Check 5d: def nested inside do block ──
		if (firstWord === "def" && blockStack.some((b) => b.keyword === "do")) {
			errors.push({
				line: lineNum,
				type: "semantic",
				error: "Don't nest 'def/enddef' inside 'do/enddo'. Define functions at the top level in their own @desc section, then call them from 'do' blocks",
			});
		}

		// ── Check 6: Curly braces (JS/JSON style blocks) ──
		if (
			(noStrings.includes("{") || noStrings.includes("}")) &&
			!noStrings.startsWith("set ") &&
			!noStrings.startsWith("$") &&
			!noStrings.startsWith("log") &&
			!noStrings.includes("=")
		) {
			// Allow braces in assignments and log statements (JSON data)
			const braceContext =
				noStrings.startsWith("if") ||
				noStrings.startsWith("for") ||
				noStrings.startsWith("do") ||
				noStrings.startsWith("def");
			if (braceContext) {
				errors.push({
					line: lineNum,
					type: "semantic",
					error: "Curly braces '{}' are not used for blocks. Use keyword/endkeyword pairs",
				});
			}
		}

		// ── Check 7: Function registry validation ──
		// Checks both built-in functions AND external knownFunctions (from ingested docs)
		// Matches module.func anywhere in the line (not preceded by $)
		if (noStrings.includes(".") && !trimmed.startsWith("$")) {
			// Merge built-in + external registries
			const externalFns = options?.knownFunctions;
			const externalModules = externalFns
				? new Set([...externalFns].map(f => f.split(".")[0]))
				: new Set<string>();

			const allCalls = noStrings.matchAll(RE_FUNC_CALL);
			for (const callMatch of allCalls) {
				const raw = callMatch[1];
				const matchIndex = callMatch.index!;

				// Skip matches inside JSON object literals to avoid false positives
				if (isInsideJsonObject(noStrings, matchIndex)) continue;

				const moduleName = raw.split(".")[0];
				const funcName = raw.split(".")[1];
				const lookupKey = `${moduleName}.${funcName}`;

				// Check for common LLM module name mistakes (fs → file, fetch → http, etc.)
				const alias = MODULE_ALIASES[moduleName];
				if (alias && BUILTIN_MODULE_NAMES.has(alias.target)) {
					const correctKey = `${alias.target}.${funcName}`;
					const hasFunc = BUILTIN_FUNCTIONS.has(correctKey);
					if (alias.confidence === "high") {
						errors.push({
							line: lineNum,
							type: "semantic",
							error: hasFunc
								? `Wrong module name '${moduleName}'. Use '${alias.target}.${funcName}' instead of '${raw}'`
								: `Wrong module name '${moduleName}'. The correct module is '${alias.target}'. Available: ${BUILTIN_MODULES[alias.target].slice(0, 10).join(", ")}`,
						});
					} else {
						errors.push({
							line: lineNum,
							type: "semantic",
							error: hasFunc
								? `Did you mean '${alias.target}'? Use '${alias.target}.${funcName}' instead of '${raw}'`
								: `Did you mean '${alias.target}'? The correct module is '${alias.target}'. Available: ${BUILTIN_MODULES[alias.target].slice(0, 10).join(", ")}`,
						});
					}
				} else if (BUILTIN_MODULE_NAMES.has(moduleName)) {
					// Built-in module — check against built-in registry
					if (!BUILTIN_FUNCTIONS.has(lookupKey)) {
						errors.push({
							line: lineNum,
							type: "semantic",
							error: `Unknown function '${raw}'. Module '${moduleName}' has no function '${funcName}'`,
						});
					}
				} else if (externalFns && externalModules.has(moduleName)) {
					// External module (from ingested docs) — check against external registry
					if (!externalFns.has(lookupKey)) {
						errors.push({
							line: lineNum,
							type: "semantic",
							error: `Unknown function '${raw}'. Module '${moduleName}' has no function '${funcName}'`,
						});
					}
				}
				// If module is not in either registry, skip (could be user-defined)
			}
		}

		// ── Track block structure ──
		if (firstWord in BLOCK_OPENERS) {
			// Inline if with 'then' on same line (action after then, no block opened)
			if (
				firstWord === "if" &&
				noStrings.includes(" then ") &&
				!noStrings.endsWith(" then")
			) {
				continue; // inline if — no endif needed
			}
			blockStack.push({ keyword: firstWord, line: lineNum });
		}

		// Track closers
		if (BLOCK_CLOSERS.has(firstWord)) {
			if (blockStack.length === 0) {
				const opener =
					Object.entries(BLOCK_OPENERS).find(
						([, v]) => v === firstWord,
					)?.[0] || "?";
				errors.push({
					line: lineNum,
					type: "semantic",
					error: `Unexpected '${firstWord}' — no matching '${opener}' block is open`,
				});
			} else {
				const top = blockStack[blockStack.length - 1];
				const expected = BLOCK_OPENERS[top.keyword];
				if (firstWord === expected) {
					blockStack.pop();
				} else {
					errors.push({
						line: lineNum,
						type: "semantic",
						error: `Mismatched: expected '${expected}' to close '${top.keyword}' (line ${top.line}), got '${firstWord}'`,
					});
					blockStack.pop(); // pop to avoid cascading
				}
			}
		}

		// 'else', 'elseif', 'catch' are valid mid-block keywords, no stack change
	}

	// Unclosed blocks
	for (const open of blockStack) {
		errors.push({
			line: open.line,
			type: "semantic",
			error: `Unclosed '${open.keyword}' block — missing '${BLOCK_OPENERS[open.keyword]}'`,
		});
	}

	return errors;
}

// ─── Shared deduplication ────────────────────────────────────────────────────

function deduplicateErrors(errors: ValidationError[]): ValidationError[] {
	const seen = new Set<string>();
	return errors.filter((e) => {
		const key = `${e.line}:${e.error}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

// ─── Combined validation ─────────────────────────────────────────────────────

/**
 * Validate all RobinPath code blocks in an LLM response.
 * Runs both parser (structural) and semantic (runtime-safety) checks.
 */
export async function validateCode(
	text: string,
	options?: ValidatorOptions,
): Promise<ValidationResult> {
	const blocks = extractCodeBlocks(text);
	if (blocks.length === 0)
		return { valid: true, blockCount: 0, errors: [] };

	const allErrors: ValidationError[] = [];

	for (const block of blocks) {
		// Layer 1: Real parser
		const parseErrors = await parserValidate(block);
		allErrors.push(...parseErrors);

		// Layer 2: Semantic checks (always run — catches what parser misses)
		const semanticErrors = semanticValidate(block, options);
		allErrors.push(...semanticErrors);
	}

	const deduped = deduplicateErrors(allErrors);

	return {
		valid: deduped.length === 0,
		blockCount: blocks.length,
		errors: deduped,
	};
}

/**
 * Validate a single code string directly (not wrapped in markdown fences).
 */
export async function validateCodeDirect(
	code: string,
	options?: ValidatorOptions,
): Promise<ValidationResult> {
	const allErrors: ValidationError[] = [];

	const parseErrors = await parserValidate(code);
	allErrors.push(...parseErrors);

	const semanticErrors = semanticValidate(code, options);
	allErrors.push(...semanticErrors);

	const deduped = deduplicateErrors(allErrors);

	return { valid: deduped.length === 0, blockCount: 1, errors: deduped };
}

// ─── Fix prompt builder — Pattern dispatch table ─────────────────────────────

interface FixPattern {
	id: string;
	severity: "critical" | "warning";
	test: RegExp;
	tip: (allErrors: string) => string;
}

const FIX_PATTERNS: FixPattern[] = [
	{
		id: "parenthesized-calls",
		severity: "critical",
		test: /RPAREN|Expected '\)'|Do NOT use parentheses/,
		tip: () =>
			`CRITICAL: You used parentheses for function calls. RobinPath uses SPACE-SEPARATED arguments, NEVER parentheses.
  WRONG: http.get("https://api.example.com")
  WRONG: math.add(1, 2)
  WRONG: string.length("hello")
  RIGHT: http.get "https://api.example.com"
  RIGHT: math.add 1 2
  RIGHT: string.length "hello"
  RIGHT: array.filter $items (condition) — only use parens for inline expressions, never for function calls`,
	},
	{
		id: "curly-braces",
		severity: "critical",
		test: /[Cc]urly brace/,
		tip: () =>
			`CRITICAL: You used curly braces {} for blocks. RobinPath uses keyword/endkeyword pairs.
  WRONG: if $x > 5 { log "big" }
  WRONG: for $i in $items { log $i }
  RIGHT: if $x > 5 \\n  log "big" \\n endif
  RIGHT: for $i in $items \\n  log $i \\n endfor`,
	},
	{
		id: "unexpected-enddo",
		severity: "critical",
		test: /[Uu]nexpected 'enddo'|no matching 'do'/,
		tip: () =>
			`BLOCK MISMATCH: You have an 'enddo' without a matching 'do'. Count your blocks carefully:
  - Every 'do' needs exactly one 'enddo'
  - Every 'if' needs exactly one 'endif'
  - Every 'for' needs exactly one 'endfor'
  - Close the current block BEFORE starting a new @desc section
  - do/catch uses: do ... catch $err ... enddo (ONE enddo, not two)`,
	},
	{
		id: "decorator-desc",
		severity: "critical",
		test: /DECORATOR '@desc'/,
		tip: () =>
			`BLOCK NOT CLOSED: You have @desc inside an unclosed block. You MUST close the previous block before starting a new section.
  WRONG:
    @desc "Step 1"
    do
      log "hello"
      @desc "Step 2"    <- ERROR: previous do block not closed!
      do
  RIGHT:
    @desc "Step 1"
    do
      log "hello"
    enddo                <- close first!
    @desc "Step 2"
    do`,
	},
	{
		id: "def-inside-do",
		severity: "critical",
		test: /nest.*def.*inside.*do|def\/enddef.*outside/i,
		tip: () =>
			`DEF INSIDE DO: You nested a function definition inside a 'do' block. This is NOT allowed.
  WRONG:
    @desc "My function"
    do
      def myFunc $arg
        log $arg
      enddef
    enddo
  RIGHT:
    @desc "My function"
    def myFunc $arg
      log $arg
    enddef
  Functions (def/enddef) must be at the TOP LEVEL, not inside do/enddo blocks. Define them in their own @desc section.`,
	},
	{
		id: "def-inside-do-decorator",
		severity: "critical",
		test: /(?=.*DECORATOR '@desc')(?=.*def)/,
		tip: () =>
			`DEF INSIDE DO: You nested a function definition inside a 'do' block. This is NOT allowed.
  WRONG:
    @desc "My function"
    do
      def myFunc $arg
        log $arg
      enddef
    enddo
  RIGHT:
    @desc "My function"
    def myFunc $arg
      log $arg
    enddef
  Functions (def/enddef) must be at the TOP LEVEL, not inside do/enddo blocks. Define them in their own @desc section.`,
	},
	{
		id: "unclosed-block",
		severity: "critical",
		test: /missing end(if|for|do)/,
		tip: () =>
			`UNCLOSED BLOCK: You opened a block but never closed it. Make sure every block has its closing keyword:
  if -> endif, for -> endfor, do -> enddo, def -> enddef
  Check nested blocks carefully — each one needs its own closing keyword.`,
	},
	{
		id: "mismatched-blocks",
		severity: "critical",
		test: /[Mm]ismatched/,
		tip: () =>
			`MISMATCHED BLOCKS: Your closing keywords don't match the opening keywords.
  WRONG: do ... endfor (should be enddo)
  WRONG: for ... enddo (should be endfor)
  Make sure each closing keyword matches its opening keyword exactly.`,
	},
	{
		id: "assignment-syntax",
		severity: "warning",
		test: /Expected '=' or 'as' after variable/,
		tip: () =>
			`ASSIGNMENT SYNTAX: Variable assignment must use 'set $var as value' or '$var = value'.
  WRONG: $result http.get "url"
  RIGHT: http.get "url" into $result
  RIGHT: set $result as http.get "url"
  To capture function output, use 'into $var' at the end of the command.`,
	},
	{
		id: "arrow-functions",
		severity: "warning",
		test: /[Aa]rrow function/,
		tip: () =>
			`ARROW FUNCTIONS: The '=>' operator does not exist in RobinPath.
  WRONG: collection.each $items (item) => { log item }
  WRONG: $items.forEach(item => { log item })
  RIGHT: for $item in $items
           log $item
         endfor
  Use 'for $item in $collection ... endfor' for iteration.`,
	},
	{
		id: "let-const-var",
		severity: "warning",
		test: /No 'let' keyword|No 'const'|No 'var'/,
		tip: () =>
			`VARIABLE DECLARATION: No 'let', 'const', or 'var' keywords in RobinPath.
  WRONG: let x = 5
  WRONG: const name = "test"
  RIGHT: set $x = 5
  RIGHT: $name = "test"
  Variables always start with $ and use 'set' or direct assignment.`,
	},
	{
		id: "try-catch",
		severity: "warning",
		test: /No 'try' keyword/,
		tip: () =>
			`ERROR HANDLING: No 'try/catch' in RobinPath. Use 'do/catch/enddo'.
  WRONG: try { risky() } catch (e) { log(e) }
  RIGHT: do
           risky.operation "arg"
         catch $err
           log $err
         enddo`,
	},
	{
		id: "function-keyword",
		severity: "warning",
		test: /No 'function' keyword|No 'fn' keyword/,
		tip: () =>
			`FUNCTIONS: No 'function' or 'fn' keyword in RobinPath. Use 'def/enddef'.
  WRONG: function greet(name) { log(name) }
  RIGHT: def greet $name
           log $name
         enddef
  Use 'respond $value' instead of 'return value'.`,
	},
	{
		id: "wrong-module-name",
		severity: "warning",
		test: /Wrong module name|Did you mean/,
		tip: (allErrors: string) => {
			const aliasMatches = allErrors.match(/(?:Wrong module name|Did you mean) '(\w+)'[\.\?] (?:Use '([^']+)'|The correct module is '(\w+)')/g);
			if (aliasMatches) {
				const fixes: string[] = [];
				for (const m of aliasMatches) {
					const parts = m.match(/(?:Wrong module name|Did you mean) '(\w+)'[\.\?] (?:Use '([^']+)'|The correct module is '(\w+)')/);
					if (parts) {
						const wrong = parts[1];
						const correct = parts[2] || parts[3];
						fixes.push(`WRONG: ${wrong}.xxx  ->  RIGHT: ${correct}`);
					}
				}
				return `WRONG MODULE NAME: RobinPath uses different module names than Node.js.\n  ${fixes.join("\n  ")}\n  Common mappings: fs->file, fetch/request->http, sys->os, exec/spawn->child, time/wait->timer, hash->crypto`;
			}
			return `WRONG MODULE NAME: RobinPath uses different module names than Node.js.\n  Common mappings: fs->file, fetch/request->http, sys->os, exec/spawn->child, time/wait->timer, hash->crypto`;
		},
	},
	{
		id: "unknown-function",
		severity: "warning",
		test: /Unknown function/,
		tip: (allErrors: string) => {
			const modMatches = allErrors.match(/Module '(\w+)' has no function '(\w+)'/g);
			if (modMatches) {
				const suggestions: string[] = [];
				const seenMods = new Set<string>();
				for (const m of modMatches) {
					const parts = m.match(/Module '(\w+)' has no function '(\w+)'/);
					if (parts && !seenMods.has(parts[1])) {
						seenMods.add(parts[1]);
						const mod = parts[1];
						const fns = BUILTIN_MODULES[mod];
						if (fns) {
							suggestions.push(`Module '${mod}' available functions: ${fns.slice(0, 15).join(", ")}${fns.length > 15 ? ", ..." : ""}`);
						}
					}
				}
				if (suggestions.length > 0) {
					return `UNKNOWN FUNCTION: You called a function that doesn't exist on the module. Use only real functions.\n  ${suggestions.join("\n  ")}`;
				}
			}
			return `UNKNOWN FUNCTION: You called a function that doesn't exist on the module. Check available functions in the module documentation.`;
		},
	},
	{
		id: "parenthesized-expressions",
		severity: "warning",
		test: /parenthesized|in \(|range/,
		tip: () =>
			`PARENTHESIZED EXPRESSIONS: Don't wrap expressions in parentheses.
  WRONG: for $i in (0..$n)
  WRONG: array.get $arr ($i+1)
  WRONG: for $i in (range 0 $n)
  RIGHT: for $i from 0 to $n
  RIGHT: math.add $i 1 into $next \\n array.get $arr $next
  Compute complex expressions into a variable first, then use that variable.`,
	},
	{
		id: "comma-issues",
		severity: "warning",
		test: /expected comma|COMMA/,
		tip: () =>
			`OBJECT SYNTAX: Object properties MUST be separated by commas.
  WRONG: { "name": "test" "age": 25 }
  RIGHT: { "name": "test", "age": 25 }`,
	},
];

/**
 * Build a prompt instructing the LLM to fix validation errors.
 * Used for auto-retry when validation fails.
 */
export function buildFixPrompt(errors: ValidationError[]): string {
	const errorDetails = errors
		.map((e) => `Line ${e.line} [${e.type}]: ${e.error}`)
		.join("\n");

	// Detect specific error patterns to give targeted fix instructions
	const allErrors = errors.map((e) => e.error).join(" ");

	// Deduplicate tips by id (def-inside-do and def-inside-do-decorator can overlap)
	const seenIds = new Set<string>();
	const tips = FIX_PATTERNS
		.filter((p) => p.test.test(allErrors))
		.sort((a, b) => (a.severity === "critical" ? -1 : 1) - (b.severity === "critical" ? -1 : 1))
		.filter((p) => {
			// Deduplicate by prefix id (def-inside-do and def-inside-do-decorator produce same tip)
			const baseId = p.id.replace(/-decorator$/, "");
			if (seenIds.has(baseId)) return false;
			seenIds.add(baseId);
			return true;
		})
		.map((p) => p.tip(allErrors));

	const tipsBlock = tips.length > 0 ? `\n\nSPECIFIC FIXES NEEDED:\n${tips.join("\n\n")}` : "";

	return `Your RobinPath code has ${errors.length} error${errors.length > 1 ? "s" : ""}. Fix ALL errors and regenerate the COMPLETE corrected response.

Errors found:
${errorDetails}${tipsBlock}

RobinPath syntax reminder:
- COMMAND-STYLE calls: module.fn arg1 arg2 — NEVER use parentheses like module.fn(arg1, arg2)
- Capture results: command arg1 arg2 into $result
- Blocks: for/endfor, if/elseif/else/endif, do/catch/enddo, on/endon, def/enddef
- Close EVERY block before starting a new @desc section
- Variables always start with $
- No semicolons, no curly braces for blocks, no pipe operator
- Output: use 'log' — not print, echo, or console.log`;
}
