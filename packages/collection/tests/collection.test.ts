import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import CollectionModule from "../src/index.js";

// Helper: create a RobinPath instance with the collection module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(CollectionModule.name, CollectionModule.functions);
  rp.registerModuleMeta(CollectionModule.name, CollectionModule.functionMetadata);
  return rp;
}

// ── collection.pluck ────────────────────────────────────────────────

describe("collection.pluck", () => {
  it("plucks property from objects", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.pluck $arr "name"',
    ].join("\n"));
    assert.deepEqual(result, ["Alice", "Bob"]);
  });

  it("returns null for missing properties", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice" },
      { age: 25 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.pluck $arr "name"',
    ].join("\n"));
    assert.deepEqual(result, ["Alice", null]);
  });

  it("returns empty array for non-array input", async () => {
    const rp = createRp();
    const result = await rp.executeScript('collection.pluck "notarray" "key"');
    assert.deepEqual(result, []);
  });
});

// ── collection.where ────────────────────────────────────────────────

describe("collection.where", () => {
  it("filters objects where property equals value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.where $arr "age" 30',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 30 },
    ]);
  });

  it("filters by string value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { role: "admin", name: "Alice" },
      { role: "user", name: "Bob" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.where $arr "role" "admin"',
    ].join("\n"));
    assert.deepEqual(result, [{ role: "admin", name: "Alice" }]);
  });

  it("returns empty array when no matches", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.where $arr "age" 99',
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.whereGt ──────────────────────────────────────────────

describe("collection.whereGt", () => {
  it("filters where property > value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereGt $arr "age" 25',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ]);
  });

  it("excludes values equal to threshold", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { score: 10 },
      { score: 20 },
      { score: 30 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereGt $arr "score" 20',
    ].join("\n"));
    assert.deepEqual(result, [{ score: 30 }]);
  });
});

// ── collection.whereLt ──────────────────────────────────────────────

describe("collection.whereLt", () => {
  it("filters where property < value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereLt $arr "age" 30',
    ].join("\n"));
    assert.deepEqual(result, [{ name: "Bob", age: 25 }]);
  });

  it("excludes values equal to threshold", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { score: 10 },
      { score: 20 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereLt $arr "score" 10',
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.whereGte ─────────────────────────────────────────────

describe("collection.whereGte", () => {
  it("filters where property >= value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereGte $arr "age" 30',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ]);
  });
});

// ── collection.whereLte ─────────────────────────────────────────────

describe("collection.whereLte", () => {
  it("filters where property <= value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereLte $arr "age" 30',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
  });
});

// ── collection.whereNot ─────────────────────────────────────────────

describe("collection.whereNot", () => {
  it("filters where property != value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { role: "admin", name: "Alice" },
      { role: "user", name: "Bob" },
      { role: "user", name: "Charlie" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereNot $arr "role" "admin"',
    ].join("\n"));
    assert.deepEqual(result, [
      { role: "user", name: "Bob" },
      { role: "user", name: "Charlie" },
    ]);
  });

  it("returns all items when no matches to exclude", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { role: "user", name: "Alice" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.whereNot $arr "role" "admin"',
    ].join("\n"));
    assert.deepEqual(result, [{ role: "user", name: "Alice" }]);
  });
});

// ── collection.sortBy ───────────────────────────────────────────────

describe("collection.sortBy", () => {
  it("sorts objects by string property ascending", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Charlie" },
      { name: "Alice" },
      { name: "Bob" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.sortBy $arr "name"',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ]);
  });

  it("sorts objects by numeric property ascending", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.sortBy $arr "age"',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ]);
  });

  it("does not mutate original array", async () => {
    const rp = createRp();
    const original = [{ v: 3 }, { v: 1 }, { v: 2 }];
    rp.registerBuiltin("data", () => original);
    await rp.executeScript([
      "$arr = data",
      'collection.sortBy $arr "v"',
    ].join("\n"));
    assert.deepEqual(original, [{ v: 3 }, { v: 1 }, { v: 2 }]);
  });
});

// ── collection.sortByDesc ───────────────────────────────────────────

describe("collection.sortByDesc", () => {
  it("sorts objects by numeric property descending", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.sortByDesc $arr "age"',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Charlie", age: 35 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
  });

  it("sorts objects by string property descending", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { name: "Alice" },
      { name: "Charlie" },
      { name: "Bob" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.sortByDesc $arr "name"',
    ].join("\n"));
    assert.deepEqual(result, [
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
    ]);
  });
});

// ── collection.unique ───────────────────────────────────────────────

describe("collection.unique", () => {
  it("removes duplicate primitives", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 2, 3, 3, 3]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.unique $arr",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3]);
  });

  it("removes duplicate strings", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["a", "b", "a", "c", "b"]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.unique $arr",
    ].join("\n"));
    assert.deepEqual(result, ["a", "b", "c"]);
  });

  it("removes duplicate objects", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { id: 1 },
      { id: 2 },
      { id: 1 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.unique $arr",
    ].join("\n"));
    assert.deepEqual(result, [{ id: 1 }, { id: 2 }]);
  });
});

// ── collection.flatten ──────────────────────────────────────────────

describe("collection.flatten", () => {
  it("flattens nested arrays one level", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [[1, 2], [3, 4], [5]]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.flatten $arr",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  it("handles mixed nested and non-nested items", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, [2, 3], 4, [5, 6]]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.flatten $arr",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
  });

  it("only flattens one level deep", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [[1, [2, 3]], [4]]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.flatten $arr",
    ].join("\n"));
    assert.deepEqual(result, [1, [2, 3], 4]);
  });
});

// ── collection.reverse ──────────────────────────────────────────────

describe("collection.reverse", () => {
  it("reverses array order", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3, 4, 5]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.reverse $arr",
    ].join("\n"));
    assert.deepEqual(result, [5, 4, 3, 2, 1]);
  });

  it("does not mutate original array", async () => {
    const rp = createRp();
    const original = [1, 2, 3];
    rp.registerBuiltin("data", () => original);
    await rp.executeScript([
      "$arr = data",
      "collection.reverse $arr",
    ].join("\n"));
    assert.deepEqual(original, [1, 2, 3]);
  });

  it("handles empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.reverse $arr",
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.chunk ────────────────────────────────────────────────

describe("collection.chunk", () => {
  it("splits array into chunks of N", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3, 4, 5]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.chunk $arr 2",
    ].join("\n"));
    assert.deepEqual(result, [[1, 2], [3, 4], [5]]);
  });

  it("handles chunk size larger than array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.chunk $arr 10",
    ].join("\n"));
    assert.deepEqual(result, [[1, 2]]);
  });

  it("handles chunk size of 1", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.chunk $arr 1",
    ].join("\n"));
    assert.deepEqual(result, [[1], [2], [3]]);
  });
});

// ── collection.first ────────────────────────────────────────────────

describe("collection.first", () => {
  it("returns first element", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["a", "b", "c"]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.first $arr",
    ].join("\n"));
    assert.equal(result, "a");
  });

  it("returns null for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.first $arr",
    ].join("\n"));
    assert.equal(result, null);
  });
});

// ── collection.last ─────────────────────────────────────────────────

describe("collection.last", () => {
  it("returns last element", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["a", "b", "c"]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.last $arr",
    ].join("\n"));
    assert.equal(result, "c");
  });

  it("returns null for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.last $arr",
    ].join("\n"));
    assert.equal(result, null);
  });
});

// ── collection.count ────────────────────────────────────────────────

describe("collection.count", () => {
  it("counts elements in array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3, 4, 5]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.count $arr",
    ].join("\n"));
    assert.equal(result, 5);
  });

  it("returns 0 for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.count $arr",
    ].join("\n"));
    assert.equal(result, 0);
  });

  it("returns 0 for non-array input", async () => {
    const rp = createRp();
    const result = await rp.executeScript('collection.count "string"');
    assert.equal(result, 0);
  });
});

// ── collection.sum ──────────────────────────────────────────────────

describe("collection.sum", () => {
  it("sums a numeric property", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { price: 10 },
      { price: 20 },
      { price: 30 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.sum $arr "price"',
    ].join("\n"));
    assert.equal(result, 60);
  });

  it("sums array values directly when no key given", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [10, 20, 30]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.sum $arr",
    ].join("\n"));
    assert.equal(result, 60);
  });

  it("returns 0 for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.sum $arr",
    ].join("\n"));
    assert.equal(result, 0);
  });
});

// ── collection.avg ──────────────────────────────────────────────────

describe("collection.avg", () => {
  it("averages a numeric property", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { score: 80 },
      { score: 90 },
      { score: 100 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.avg $arr "score"',
    ].join("\n"));
    assert.equal(result, 90);
  });

  it("averages array values directly when no key given", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [10, 20, 30]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.avg $arr",
    ].join("\n"));
    assert.equal(result, 20);
  });

  it("returns 0 for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.avg $arr",
    ].join("\n"));
    assert.equal(result, 0);
  });
});

// ── collection.min ──────────────────────────────────────────────────

describe("collection.min", () => {
  it("finds minimum of a numeric property", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { price: 30 },
      { price: 10 },
      { price: 20 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.min $arr "price"',
    ].join("\n"));
    assert.equal(result, 10);
  });

  it("finds minimum of direct array values", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [5, 3, 8, 1, 9]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.min $arr",
    ].join("\n"));
    assert.equal(result, 1);
  });

  it("returns 0 for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.min $arr",
    ].join("\n"));
    assert.equal(result, 0);
  });
});

// ── collection.max ──────────────────────────────────────────────────

describe("collection.max", () => {
  it("finds maximum of a numeric property", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { price: 30 },
      { price: 10 },
      { price: 20 },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.max $arr "price"',
    ].join("\n"));
    assert.equal(result, 30);
  });

  it("finds maximum of direct array values", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [5, 3, 8, 1, 9]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.max $arr",
    ].join("\n"));
    assert.equal(result, 9);
  });

  it("returns 0 for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.max $arr",
    ].join("\n"));
    assert.equal(result, 0);
  });
});

// ── collection.groupBy ──────────────────────────────────────────────

describe("collection.groupBy", () => {
  it("groups objects by a property", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [
      { category: "fruit", name: "apple" },
      { category: "veggie", name: "carrot" },
      { category: "fruit", name: "banana" },
      { category: "veggie", name: "broccoli" },
    ]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.groupBy $arr "category"',
    ].join("\n"));
    assert.deepEqual(result, {
      fruit: [
        { category: "fruit", name: "apple" },
        { category: "fruit", name: "banana" },
      ],
      veggie: [
        { category: "veggie", name: "carrot" },
        { category: "veggie", name: "broccoli" },
      ],
    });
  });

  it("returns empty object for empty array", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => []);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.groupBy $arr "key"',
    ].join("\n"));
    assert.deepEqual(result, {});
  });
});

// ── collection.compact ──────────────────────────────────────────────

describe("collection.compact", () => {
  it("removes falsy values", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [0, 1, false, 2, "", 3, null, undefined]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.compact $arr",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3]);
  });

  it("keeps truthy values intact", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["hello", true, 42, { a: 1 }]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.compact $arr",
    ].join("\n"));
    assert.deepEqual(result, ["hello", true, 42, { a: 1 }]);
  });
});

// ── collection.zip ──────────────────────────────────────────────────

describe("collection.zip", () => {
  it("zips two arrays into pairs", async () => {
    const rp = createRp();
    rp.registerBuiltin("keys", () => ["name", "age", "city"]);
    rp.registerBuiltin("vals", () => ["Alice", 30, "NYC"]);
    const result = await rp.executeScript([
      "$a = keys",
      "$b = vals",
      "collection.zip $a $b",
    ].join("\n"));
    assert.deepEqual(result, [
      ["name", "Alice"],
      ["age", 30],
      ["city", "NYC"],
    ]);
  });

  it("truncates to shorter array length", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2, 3]);
    rp.registerBuiltin("b", () => ["x", "y"]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.zip $a $b",
    ].join("\n"));
    assert.deepEqual(result, [[1, "x"], [2, "y"]]);
  });

  it("returns empty array when either input is empty", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => []);
    rp.registerBuiltin("b", () => [1, 2]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.zip $a $b",
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.difference ───────────────────────────────────────────

describe("collection.difference", () => {
  it("returns elements in a not in b", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2, 3, 4, 5]);
    rp.registerBuiltin("b", () => [3, 4, 5, 6, 7]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.difference $a $b",
    ].join("\n"));
    assert.deepEqual(result, [1, 2]);
  });

  it("returns all elements when b is empty", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2, 3]);
    rp.registerBuiltin("b", () => []);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.difference $a $b",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3]);
  });

  it("returns empty array when all elements are in b", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2]);
    rp.registerBuiltin("b", () => [1, 2, 3]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.difference $a $b",
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.intersection ─────────────────────────────────────────

describe("collection.intersection", () => {
  it("returns elements in both arrays", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2, 3, 4, 5]);
    rp.registerBuiltin("b", () => [3, 4, 5, 6, 7]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.intersection $a $b",
    ].join("\n"));
    assert.deepEqual(result, [3, 4, 5]);
  });

  it("returns empty array when no common elements", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2]);
    rp.registerBuiltin("b", () => [3, 4]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.intersection $a $b",
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.union ────────────────────────────────────────────────

describe("collection.union", () => {
  it("combines arrays with unique elements", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [1, 2, 3]);
    rp.registerBuiltin("b", () => [3, 4, 5]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.union $a $b",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  it("preserves order (a first, then b)", async () => {
    const rp = createRp();
    rp.registerBuiltin("a", () => [3, 1]);
    rp.registerBuiltin("b", () => [2, 1, 4]);
    const result = await rp.executeScript([
      "$a = a",
      "$b = b",
      "collection.union $a $b",
    ].join("\n"));
    assert.deepEqual(result, [3, 1, 2, 4]);
  });
});

// ── collection.take ─────────────────────────────────────────────────

describe("collection.take", () => {
  it("takes first N elements", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3, 4, 5]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.take $arr 3",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3]);
  });

  it("returns whole array when N > length", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.take $arr 10",
    ].join("\n"));
    assert.deepEqual(result, [1, 2]);
  });

  it("returns empty array when N is 0", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.take $arr 0",
    ].join("\n"));
    assert.deepEqual(result, []);
  });
});

// ── collection.skip ─────────────────────────────────────────────────

describe("collection.skip", () => {
  it("skips first N elements", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3, 4, 5]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.skip $arr 2",
    ].join("\n"));
    assert.deepEqual(result, [3, 4, 5]);
  });

  it("returns empty when N >= length", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.skip $arr 5",
    ].join("\n"));
    assert.deepEqual(result, []);
  });

  it("returns full array when N is 0", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [1, 2, 3]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.skip $arr 0",
    ].join("\n"));
    assert.deepEqual(result, [1, 2, 3]);
  });
});

// ── collection.contains ─────────────────────────────────────────────

describe("collection.contains", () => {
  it("returns true when value exists", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["apple", "banana", "cherry"]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.contains $arr "banana"',
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false when value does not exist", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["apple", "banana"]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.contains $arr "grape"',
    ].join("\n"));
    assert.equal(result, false);
  });

  it("works with numeric values", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => [10, 20, 30]);
    const result = await rp.executeScript([
      "$arr = data",
      "collection.contains $arr 20",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false for non-array input", async () => {
    const rp = createRp();
    const result = await rp.executeScript('collection.contains "notarray" "value"');
    assert.equal(result, false);
  });
});

// ── collection.indexOf ──────────────────────────────────────────────

describe("collection.indexOf", () => {
  it("returns index of existing value", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["apple", "banana", "cherry"]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.indexOf $arr "banana"',
    ].join("\n"));
    assert.equal(result, 1);
  });

  it("returns -1 when value not found", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["apple", "banana"]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.indexOf $arr "grape"',
    ].join("\n"));
    assert.equal(result, -1);
  });

  it("returns first occurrence index", async () => {
    const rp = createRp();
    rp.registerBuiltin("data", () => ["a", "b", "a", "c"]);
    const result = await rp.executeScript([
      "$arr = data",
      'collection.indexOf $arr "a"',
    ].join("\n"));
    assert.equal(result, 0);
  });

  it("returns -1 for non-array input", async () => {
    const rp = createRp();
    const result = await rp.executeScript('collection.indexOf "notarray" "val"');
    assert.equal(result, -1);
  });
});

// ── Module adapter structure ────────────────────────────────────────

describe("CollectionModule adapter", () => {
  it("exports correct module name", () => {
    assert.equal(CollectionModule.name, "collection");
  });

  it("has global set to false", () => {
    assert.equal(CollectionModule.global, false);
  });

  it("has all 30 functions registered", () => {
    const funcNames = Object.keys(CollectionModule.functions);
    assert.equal(funcNames.length, 30);
  });

  it("has metadata for all functions", () => {
    const funcNames = Object.keys(CollectionModule.functions);
    const metaNames = Object.keys(CollectionModule.functionMetadata);
    assert.deepEqual(funcNames.sort(), metaNames.sort());
  });

  it("has moduleMetadata with all method names", () => {
    const methods = CollectionModule.moduleMetadata.methods;
    assert.equal(methods.length, 30);
    assert.ok(methods.includes("pluck"));
    assert.ok(methods.includes("where"));
    assert.ok(methods.includes("indexOf"));
  });
});
