import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import EnvModule from "../src/index.js";
import { writeFileSync, unlinkSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function createRp() {
  const rp = new RobinPath();
  rp.registerModule(EnvModule.name, EnvModule.functions);
  rp.registerModuleMeta(EnvModule.name, EnvModule.functionMetadata);
  return rp;
}

// Keys used across tests -- saved and restored so tests don't leak state
const TEST_KEYS = [
  "RP_TEST_VAR",
  "RP_TEST_DEFAULT",
  "RP_TEST_HAS",
  "RP_TEST_DELETE",
  "RP_TEST_LOAD_A",
  "RP_TEST_LOAD_B",
  "RP_TEST_LOAD_C",
  "RP_TEST_LOAD_QUOTED",
  "RP_TEST_LOAD_SINGLE",
  "RP_TEST_LOAD_INLINE",
  "RP_TEST_LOAD_SPACES",
  "RP_TEST_EXISTING",
];

let savedEnv: Record<string, string | undefined> = {};

describe("env module", () => {
  beforeEach(() => {
    // Save current values of all test keys
    savedEnv = {};
    for (const key of TEST_KEYS) {
      savedEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    // Restore original values
    for (const key of TEST_KEYS) {
      if (savedEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = savedEnv[key];
      }
    }
  });

  // ── env.set / env.get round-trip ──────────────────────────────────

  it("set then get round-trip", async () => {
    const rp = createRp();
    const setResult = await rp.executeScript('env.set "RP_TEST_VAR" "hello"');
    assert.equal(setResult, true);

    const getResult = await rp.executeScript('env.get "RP_TEST_VAR"');
    assert.equal(getResult, "hello");
  });

  // ── env.get with default value ────────────────────────────────────

  it("get returns default value when var does not exist", async () => {
    const rp = createRp();
    const result = await rp.executeScript('env.get "RP_TEST_DEFAULT" "fallback"');
    assert.equal(result, "fallback");
  });

  it("get returns null when var does not exist and no default", async () => {
    const rp = createRp();
    const result = await rp.executeScript('env.get "RP_TEST_DEFAULT"');
    assert.equal(result, null);
  });

  // ── env.has ────────────────────────────────────────────────────────

  it("has returns true for existing variable", async () => {
    const rp = createRp();
    await rp.executeScript('env.set "RP_TEST_HAS" "yes"');
    const result = await rp.executeScript('env.has "RP_TEST_HAS"');
    assert.equal(result, true);
  });

  it("has returns false for non-existing variable", async () => {
    const rp = createRp();
    const result = await rp.executeScript('env.has "RP_TEST_HAS"');
    assert.equal(result, false);
  });

  // ── env.all ────────────────────────────────────────────────────────

  it("all returns an object containing env vars", async () => {
    const rp = createRp();
    await rp.executeScript('env.set "RP_TEST_VAR" "world"');
    const result = await rp.executeScript("env.all");
    assert.equal(typeof result, "object");
    assert.notEqual(result, null);
    assert.equal((result as Record<string, string>)["RP_TEST_VAR"], "world");
  });

  // ── env.delete ─────────────────────────────────────────────────────

  it("delete removes a variable", async () => {
    const rp = createRp();
    await rp.executeScript('env.set "RP_TEST_DELETE" "temporary"');
    const delResult = await rp.executeScript('env.delete "RP_TEST_DELETE"');
    assert.equal(delResult, true);

    const hasResult = await rp.executeScript('env.has "RP_TEST_DELETE"');
    assert.equal(hasResult, false);
  });

  // ── env.load ───────────────────────────────────────────────────────

  it("load parses a .env file", async () => {
    const tmpDir = mkdtempSync(join(tmpdir(), "rp-env-test-"));
    const envFile = join(tmpDir, ".env");

    writeFileSync(
      envFile,
      [
        "RP_TEST_LOAD_A=hello",
        "RP_TEST_LOAD_B=world",
        "RP_TEST_LOAD_C=123",
      ].join("\n"),
      "utf-8"
    );

    try {
      const rp = createRp();
      // Use JSON-escaped path for Windows backslashes
      const safePath = envFile.replace(/\\/g, "\\\\");
      const result = await rp.executeScript(`env.load "${safePath}"`);
      assert.equal(result, 3);

      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_A"'), "hello");
      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_B"'), "world");
      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_C"'), "123");
    } finally {
      unlinkSync(envFile);
    }
  });

  it("load handles comments and quoted values", async () => {
    const tmpDir = mkdtempSync(join(tmpdir(), "rp-env-test-"));
    const envFile = join(tmpDir, ".env");

    writeFileSync(
      envFile,
      [
        "# This is a comment",
        "",
        'RP_TEST_LOAD_QUOTED="hello world"',
        "RP_TEST_LOAD_SINGLE='single quoted'",
        "RP_TEST_LOAD_INLINE=value # inline comment",
        'RP_TEST_LOAD_SPACES="  padded  "',
      ].join("\n"),
      "utf-8"
    );

    try {
      const rp = createRp();
      const safePath = envFile.replace(/\\/g, "\\\\");
      const result = await rp.executeScript(`env.load "${safePath}"`);
      assert.equal(result, 4);

      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_QUOTED"'), "hello world");
      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_SINGLE"'), "single quoted");
      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_INLINE"'), "value");
      assert.equal(await rp.executeScript('env.get "RP_TEST_LOAD_SPACES"'), "  padded  ");
    } finally {
      unlinkSync(envFile);
    }
  });

  it("load does not override existing env vars", async () => {
    const tmpDir = mkdtempSync(join(tmpdir(), "rp-env-test-"));
    const envFile = join(tmpDir, ".env");

    writeFileSync(envFile, "RP_TEST_EXISTING=from_file\n", "utf-8");

    // Pre-set the variable
    process.env["RP_TEST_EXISTING"] = "original";

    try {
      const rp = createRp();
      const safePath = envFile.replace(/\\/g, "\\\\");
      const result = await rp.executeScript(`env.load "${safePath}"`);
      assert.equal(result, 0);

      assert.equal(await rp.executeScript('env.get "RP_TEST_EXISTING"'), "original");
    } finally {
      unlinkSync(envFile);
    }
  });
});
