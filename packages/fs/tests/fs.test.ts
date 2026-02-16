import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import FsModule from "../src/index.js";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

// Helper: create a RobinPath instance with the fs module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(FsModule.name, FsModule.functions);
  rp.registerModuleMeta(FsModule.name, FsModule.functionMetadata);
  return rp;
}

// -- fs.write & fs.read round-trip --------------------------------------

describe("fs.write and fs.read", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-rw-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("writes a file then reads it back", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "hello.txt");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        'fs.write $path "hello world"',
        "fs.read $path",
      ].join("\n"),
    );

    assert.equal(result, "hello world");
  });

  it("overwrites existing file content", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "overwrite.txt");
    writeFileSync(filePath, "old content", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        'fs.write $path "new content"',
        "fs.read $path",
      ].join("\n"),
    );

    assert.equal(result, "new content");
  });
});

// -- fs.append ----------------------------------------------------------

describe("fs.append", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-append-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("appends content to an existing file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "append.txt");
    writeFileSync(filePath, "line1", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    await rp.executeScript(
      [
        "$path = testPath",
        'fs.append $path "line2"',
      ].join("\n"),
    );

    const content = readFileSync(filePath, "utf-8");
    assert.equal(content, "line1line2");
  });

  it("creates a file if it does not exist", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "new-append.txt");
    rp.registerBuiltin("testPath", () => filePath);

    await rp.executeScript(
      [
        "$path = testPath",
        'fs.append $path "first"',
      ].join("\n"),
    );

    const content = readFileSync(filePath, "utf-8");
    assert.equal(content, "first");
  });
});

// -- fs.exists ----------------------------------------------------------

describe("fs.exists", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-exists-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns true for an existing file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "exists.txt");
    writeFileSync(filePath, "data", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.exists $path",
      ].join("\n"),
    );

    assert.equal(result, true);
  });

  it("returns false for a non-existent path", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "nope.txt");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.exists $path",
      ].join("\n"),
    );

    assert.equal(result, false);
  });
});

// -- fs.delete ----------------------------------------------------------

describe("fs.delete", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-delete-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("deletes a file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "to-delete.txt");
    writeFileSync(filePath, "bye", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.delete $path",
      ].join("\n"),
    );

    assert.equal(result, true);
    assert.equal(existsSync(filePath), false);
  });
});

// -- fs.copy ------------------------------------------------------------

describe("fs.copy", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-copy-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("copies a file to a new location", async () => {
    const rp = createRp();
    const srcPath = join(tmpDir, "original.txt");
    const destPath = join(tmpDir, "copy.txt");
    writeFileSync(srcPath, "copy me", "utf-8");
    rp.registerBuiltin("srcPath", () => srcPath);
    rp.registerBuiltin("destPath", () => destPath);

    const result = await rp.executeScript(
      [
        "$src = srcPath",
        "$dest = destPath",
        "fs.copy $src $dest",
      ].join("\n"),
    );

    assert.equal(result, true);
    assert.equal(readFileSync(destPath, "utf-8"), "copy me");
    // Original should still exist
    assert.equal(existsSync(srcPath), true);
  });
});

// -- fs.move ------------------------------------------------------------

describe("fs.move", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-move-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("moves a file to a new location", async () => {
    const rp = createRp();
    const srcPath = join(tmpDir, "moveme.txt");
    const destPath = join(tmpDir, "moved.txt");
    writeFileSync(srcPath, "move me", "utf-8");
    rp.registerBuiltin("srcPath", () => srcPath);
    rp.registerBuiltin("destPath", () => destPath);

    const result = await rp.executeScript(
      [
        "$src = srcPath",
        "$dest = destPath",
        "fs.move $src $dest",
      ].join("\n"),
    );

    assert.equal(result, true);
    assert.equal(readFileSync(destPath, "utf-8"), "move me");
    assert.equal(existsSync(srcPath), false);
  });
});

// -- fs.list ------------------------------------------------------------

describe("fs.list", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-list-"));
    writeFileSync(join(tmpDir, "a.txt"), "a", "utf-8");
    writeFileSync(join(tmpDir, "b.txt"), "b", "utf-8");
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns directory contents as an array", async () => {
    const rp = createRp();
    rp.registerBuiltin("dirPath", () => tmpDir);

    const result = await rp.executeScript(
      [
        "$dir = dirPath",
        "fs.list $dir",
      ].join("\n"),
    );

    assert.ok(Array.isArray(result));
    const entries = result as string[];
    assert.ok(entries.includes("a.txt"));
    assert.ok(entries.includes("b.txt"));
  });
});

// -- fs.mkdir -----------------------------------------------------------

describe("fs.mkdir", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-mkdir-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("creates a directory recursively", async () => {
    const rp = createRp();
    const nestedDir = join(tmpDir, "a", "b", "c");
    rp.registerBuiltin("dirPath", () => nestedDir);

    const result = await rp.executeScript(
      [
        "$dir = dirPath",
        "fs.mkdir $dir",
      ].join("\n"),
    );

    assert.equal(result, true);
    assert.equal(existsSync(nestedDir), true);
  });
});

// -- fs.rmdir -----------------------------------------------------------

describe("fs.rmdir", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-rmdir-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("removes a directory and its contents", async () => {
    const rp = createRp();
    const dirToRemove = join(tmpDir, "removeme");
    const nestedFile = join(dirToRemove, "inner.txt");
    mkdirSync(dirToRemove, { recursive: true });
    writeFileSync(nestedFile, "nested", "utf-8");
    rp.registerBuiltin("dirPath", () => dirToRemove);

    const result = await rp.executeScript(
      [
        "$dir = dirPath",
        "fs.rmdir $dir",
      ].join("\n"),
    );

    assert.equal(result, true);
    assert.equal(existsSync(dirToRemove), false);
  });
});

// -- fs.stat ------------------------------------------------------------

describe("fs.stat", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-stat-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns stats for a file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "stats.txt");
    writeFileSync(filePath, "some content", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.stat $path",
      ].join("\n"),
    );

    assert.ok(result != null && typeof result === "object");
    const stats = result as Record<string, unknown>;
    assert.equal(stats.isFile, true);
    assert.equal(stats.isDirectory, false);
    assert.equal(typeof stats.size, "number");
    assert.ok((stats.size as number) > 0);
    assert.equal(typeof stats.created, "string");
    assert.equal(typeof stats.modified, "string");
  });

  it("returns stats for a directory", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => tmpDir);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.stat $path",
      ].join("\n"),
    );

    const stats = result as Record<string, unknown>;
    assert.equal(stats.isFile, false);
    assert.equal(stats.isDirectory, true);
  });
});

// -- fs.isFile & fs.isDir -----------------------------------------------

describe("fs.isFile", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-isfile-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns true for a file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "check.txt");
    writeFileSync(filePath, "x", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isFile $path",
      ].join("\n"),
    );

    assert.equal(result, true);
  });

  it("returns false for a directory", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => tmpDir);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isFile $path",
      ].join("\n"),
    );

    assert.equal(result, false);
  });

  it("returns false for a non-existent path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => join(tmpDir, "nope.txt"));

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isFile $path",
      ].join("\n"),
    );

    assert.equal(result, false);
  });
});

describe("fs.isDir", () => {
  let tmpDir: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "rp-fs-isdir-"));
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns true for a directory", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => tmpDir);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isDir $path",
      ].join("\n"),
    );

    assert.equal(result, true);
  });

  it("returns false for a file", async () => {
    const rp = createRp();
    const filePath = join(tmpDir, "not-a-dir.txt");
    writeFileSync(filePath, "x", "utf-8");
    rp.registerBuiltin("testPath", () => filePath);

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isDir $path",
      ].join("\n"),
    );

    assert.equal(result, false);
  });

  it("returns false for a non-existent path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => join(tmpDir, "ghost"));

    const result = await rp.executeScript(
      [
        "$path = testPath",
        "fs.isDir $path",
      ].join("\n"),
    );

    assert.equal(result, false);
  });
});
