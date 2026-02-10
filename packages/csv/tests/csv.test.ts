import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import CsvModule from "../src/index.js";

// Helper: create a RobinPath instance with the CSV module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(CsvModule.name, CsvModule.functions);
  rp.registerModuleMeta(CsvModule.name, CsvModule.functionMetadata);
  return rp;
}

// Helper: inject multiline string data as a builtin
// (RobinPath string literals don't interpret \n as newlines)
function withCsv(rp: InstanceType<typeof RobinPath>, name: string, data: string) {
  rp.registerBuiltin(name, () => data);
}

// ── csv.parse ───────────────────────────────────────────────────────

describe("csv.parse", () => {
  it("parses simple CSV into objects", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  it("handles quoted fields with commas", async () => {
    const rp = createRp();
    withCsv(rp, "input", 'name,address\nAlice,"123 Main St, Apt 4"\nBob,"456 Oak Ave"');

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [
      { name: "Alice", address: "123 Main St, Apt 4" },
      { name: "Bob", address: "456 Oak Ave" },
    ]);
  });

  it("handles escaped quotes", async () => {
    const rp = createRp();
    withCsv(rp, "input", 'greeting\n"say ""hello"""');

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [{ greeting: 'say "hello"' }]);
  });

  it("handles newlines inside quoted fields", async () => {
    const rp = createRp();
    withCsv(rp, "input", 'name,bio\nAlice,"line1\nline2"');

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [{ name: "Alice", bio: "line1\nline2" }]);
  });

  it("handles custom delimiter", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name;age\nAlice;30");

    const result = await rp.executeScript([
      "$csv = input",
      'csv.parse $csv ";"',
    ].join("\n"));

    assert.deepEqual(result, [{ name: "Alice", age: "30" }]);
  });

  it("trims whitespace around values", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name , age \n Alice , 30 ");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [{ name: "Alice", age: "30" }]);
  });

  it("returns empty array for header-only CSV", async () => {
    const rp = createRp();
    const result = await rp.executeScript('csv.parse "name,age"');
    assert.deepEqual(result, []);
  });

  it("returns empty array for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('csv.parse ""');
    assert.deepEqual(result, []);
  });

  it("handles \\r\\n line endings", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\r\nAlice,30\r\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.parse $csv",
    ].join("\n"));

    assert.deepEqual(result, [
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });
});

// ── csv.stringify ───────────────────────────────────────────────────

describe("csv.stringify", () => {
  it("converts objects to CSV string via round-trip", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      "$data = csv.parse $csv",
      "csv.stringify $data",
    ].join("\n"));

    assert.equal(result, "name,age\nAlice,30\nBob,25");
  });

  it("uses custom delimiter via round-trip", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name;age\nAlice;30");

    const result = await rp.executeScript([
      "$csv = input",
      '$data = csv.parse $csv ";"',
      'csv.stringify $data ";"',
    ].join("\n"));

    assert.equal(result, "name;age\nAlice;30");
  });

  it("returns empty string for empty array", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      "$data = []",
      "csv.stringify $data",
    ].join("\n"));

    assert.equal(result, "");
  });
});

// ── csv.headers ─────────────────────────────────────────────────────

describe("csv.headers", () => {
  it("extracts header names", async () => {
    const rp = createRp();
    const result = await rp.executeScript('csv.headers "name,age,email"');
    assert.deepEqual(result, ["name", "age", "email"]);
  });

  it("extracts headers from multiline CSV", async () => {
    const rp = createRp();
    withCsv(rp, "input", "id,name,score\n1,Alice,95\n2,Bob,87");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.headers $csv",
    ].join("\n"));

    assert.deepEqual(result, ["id", "name", "score"]);
  });

  it("returns empty array for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('csv.headers ""');
    assert.deepEqual(result, []);
  });
});

// ── csv.column ──────────────────────────────────────────────────────

describe("csv.column", () => {
  it("extracts a column by name", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      'csv.column $csv "name"',
    ].join("\n"));

    assert.deepEqual(result, ["Alice", "Bob"]);
  });

  it("extracts a numeric column", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      'csv.column $csv "age"',
    ].join("\n"));

    assert.deepEqual(result, ["30", "25"]);
  });

  it("returns empty array for non-existent column", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30");

    const result = await rp.executeScript([
      "$csv = input",
      'csv.column $csv "email"',
    ].join("\n"));

    assert.deepEqual(result, []);
  });
});

// ── csv.rows ────────────────────────────────────────────────────────

describe("csv.rows", () => {
  it("parses CSV into array of arrays", async () => {
    const rp = createRp();
    withCsv(rp, "input", "name,age\nAlice,30\nBob,25");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.rows $csv",
    ].join("\n"));

    assert.deepEqual(result, [
      ["name", "age"],
      ["Alice", "30"],
      ["Bob", "25"],
    ]);
  });

  it("includes header row as first element", async () => {
    const rp = createRp();
    withCsv(rp, "input", "a,b\n1,2");

    const result = await rp.executeScript([
      "$csv = input",
      "csv.rows $csv",
    ].join("\n")) as string[][];

    assert.equal(result[0]![0], "a");
    assert.equal(result[0]![1], "b");
    assert.equal(result[1]![0], "1");
    assert.equal(result[1]![1], "2");
  });

  it("works with custom delimiter", async () => {
    const rp = createRp();
    withCsv(rp, "input", "a|b\n1|2");

    const result = await rp.executeScript([
      "$csv = input",
      'csv.rows $csv "|"',
    ].join("\n"));

    assert.deepEqual(result, [["a", "b"], ["1", "2"]]);
  });
});
