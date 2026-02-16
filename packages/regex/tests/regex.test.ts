import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import RegexModule from "../src/index.js";

// Helper: create a RobinPath instance with the Regex module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(RegexModule.name, RegexModule.functions);
  rp.registerModuleMeta(RegexModule.name, RegexModule.functionMetadata);
  return rp;
}

// Helper: inject a string value as a builtin
// (useful for strings containing special characters or newlines
//  that can't be easily expressed in RobinPath string literals)
function withStr(rp: InstanceType<typeof RobinPath>, name: string, data: string) {
  rp.registerBuiltin(name, () => data);
}

// ── regex.test ──────────────────────────────────────────────────────

describe("regex.test", () => {
  it("returns true when the pattern matches", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "hello world" "^hello"');
    assert.equal(result, true);
  });

  it("returns false when the pattern does not match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "hello world" "^world"');
    assert.equal(result, false);
  });

  it("supports case-insensitive flag", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "Hello World" "^hello" "i"');
    assert.equal(result, true);
  });

  it("is case-sensitive by default", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "Hello World" "^hello"');
    assert.equal(result, false);
  });

  it("matches digit patterns", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "abc123" "\\d+"');
    assert.equal(result, true);
  });

  it("returns false for no digit in alphabetic string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.test "abcdef" "\\d+"');
    assert.equal(result, false);
  });

  it("works with multiline flag on multiline input", async () => {
    const rp = createRp();
    withStr(rp, "input", "first\nsecond\nthird");

    const result = await rp.executeScript([
      "$str = input",
      'regex.test $str "^second" "m"',
    ].join("\n"));

    assert.equal(result, true);
  });
});

// ── regex.match ─────────────────────────────────────────────────────

describe("regex.match", () => {
  it("returns the first match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.match "abc 123 def 456" "\\d+"');
    assert.equal(result, "123");
  });

  it("returns null when there is no match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.match "abcdef" "\\d+"');
    assert.equal(result, null);
  });

  it("supports case-insensitive flag", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.match "Hello World" "hello" "i"');
    assert.equal(result, "Hello");
  });

  it("matches word patterns", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.match "foo-bar-baz" "[a-z]+"');
    assert.equal(result, "foo");
  });
});

// ── regex.matchAll ──────────────────────────────────────────────────

describe("regex.matchAll", () => {
  it("returns all matches", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.matchAll "abc 123 def 456" "\\d+"');
    assert.deepEqual(result, ["123", "456"]);
  });

  it("returns empty array when there are no matches", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.matchAll "abcdef" "\\d+"');
    assert.deepEqual(result, []);
  });

  it("works with case-insensitive flag", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.matchAll "Hello hello HELLO" "hello" "i"');
    assert.deepEqual(result, ["Hello", "hello", "HELLO"]);
  });

  it("finds all word matches", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.matchAll "foo-bar-baz" "[a-z]+"');
    assert.deepEqual(result, ["foo", "bar", "baz"]);
  });
});

// ── regex.replace ───────────────────────────────────────────────────

describe("regex.replace", () => {
  it("replaces all matches globally by default", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.replace "abc 123 def 456" "\\d+" "X"');
    assert.equal(result, "abc X def X");
  });

  it("replaces only the first match when no g flag is given", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.replace "abc 123 def 456" "\\d+" "X" ""');
    assert.equal(result, "abc X def 456");
  });

  it("supports case-insensitive replacement", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.replace "Hello hello" "hello" "hi" "gi"');
    assert.equal(result, "hi hi");
  });

  it("handles replacement with empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.replace "abc123def456" "\\d+" ""');
    assert.equal(result, "abcdef");
  });

  it("returns original string when pattern does not match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.replace "abcdef" "\\d+" "X"');
    assert.equal(result, "abcdef");
  });
});

// ── regex.split ─────────────────────────────────────────────────────

describe("regex.split", () => {
  it("splits by whitespace pattern", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.split "hello   world  foo" "\\s+"');
    assert.deepEqual(result, ["hello", "world", "foo"]);
  });

  it("splits by comma and optional whitespace", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.split "a, b,c ,d" ",\\s*"');
    assert.deepEqual(result, ["a", "b", "c ", "d"]);
  });

  it("splits by digit pattern", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.split "abc1def2ghi" "\\d"');
    assert.deepEqual(result, ["abc", "def", "ghi"]);
  });

  it("returns single-element array when pattern not found", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.split "hello" "\\d+"');
    assert.deepEqual(result, ["hello"]);
  });
});

// ── regex.capture ───────────────────────────────────────────────────

describe("regex.capture", () => {
  it("extracts capture groups from a match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "2024-01-15" "(\\d{4})-(\\d{2})-(\\d{2})"');
    assert.deepEqual(result, ["2024", "01", "15"]);
  });

  it("returns null when there is no match", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "no-match-here" "(\\d{4})-(\\d{2})-(\\d{2})"');
    assert.equal(result, null);
  });

  it("extracts two capture groups from a range pattern", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "range: 10-20" "(\\d+)-(\\d+)"');
    assert.deepEqual(result, ["10", "20"]);
  });

  it("extracts a single capture group", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "hello world" "hello (\\w+)"');
    assert.deepEqual(result, ["world"]);
  });

  it("supports case-insensitive flag", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "Hello World" "hello (\\w+)" "i"');
    assert.deepEqual(result, ["World"]);
  });

  it("returns null when pattern matches but has no capture groups", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.capture "hello" "hello"');
    assert.equal(result, null);
  });
});

// ── regex.escape ────────────────────────────────────────────────────

describe("regex.escape", () => {
  it("escapes special regex characters", async () => {
    const rp = createRp();
    withStr(rp, "input", "price is $9.99 (USD)");

    const result = await rp.executeScript([
      "$str = input",
      "regex.escape $str",
    ].join("\n"));

    assert.equal(result, "price is \\$9\\.99 \\(USD\\)");
  });

  it("escapes brackets and braces", async () => {
    const rp = createRp();
    withStr(rp, "input", "[foo]{bar}");

    const result = await rp.executeScript([
      "$str = input",
      "regex.escape $str",
    ].join("\n"));

    assert.equal(result, "\\[foo\\]\\{bar\\}");
  });

  it("escapes asterisk, plus, and question mark", async () => {
    const rp = createRp();
    withStr(rp, "input", "a*b+c?");

    const result = await rp.executeScript([
      "$str = input",
      "regex.escape $str",
    ].join("\n"));

    assert.equal(result, "a\\*b\\+c\\?");
  });

  it("escapes pipe and caret and backslash", async () => {
    const rp = createRp();
    withStr(rp, "input", "a|b^c\\d");

    const result = await rp.executeScript([
      "$str = input",
      "regex.escape $str",
    ].join("\n"));

    assert.equal(result, "a\\|b\\^c\\\\d");
  });

  it("returns plain string unchanged", async () => {
    const rp = createRp();
    const result = await rp.executeScript('regex.escape "hello"');
    assert.equal(result, "hello");
  });

  it("escaped string can be used as a literal regex pattern", async () => {
    const rp = createRp();
    withStr(rp, "input", "Is the price $9.99?");
    withStr(rp, "needle", "$9.99");

    const result = await rp.executeScript([
      "$str = input",
      "$pattern = needle",
      "$escaped = regex.escape $pattern",
      "regex.test $str $escaped",
    ].join("\n"));

    assert.equal(result, true);
  });
});
