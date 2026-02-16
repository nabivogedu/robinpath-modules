import { describe, it } from "node:test";
import assert from "node:assert/strict";
import nodePath from "node:path";
import { RobinPath } from "@wiredwp/robinpath";
import PathModule from "../src/index.js";

function createRp(): RobinPath {
  const rp = new RobinPath();
  rp.registerModule(PathModule.name, PathModule.functions);
  rp.registerModuleMeta(PathModule.name, PathModule.functionMetadata);
  return rp;
}

describe("path.join", () => {
  it("combines two segments", async () => {
    const rp = createRp();
    rp.registerBuiltin("testA", () => "/usr");
    rp.registerBuiltin("testB", () => "local");
    const result = await rp.executeScript(
      '$a = testA\n$b = testB\npath.join $a $b'
    );
    assert.equal(result, nodePath.join("/usr", "local"));
  });

  it("combines multiple segments", async () => {
    const rp = createRp();
    rp.registerBuiltin("testA", () => "/usr");
    rp.registerBuiltin("testB", () => "local");
    rp.registerBuiltin("testC", () => "bin");
    const result = await rp.executeScript(
      '$a = testA\n$b = testB\n$c = testC\npath.join $a $b $c'
    );
    assert.equal(result, nodePath.join("/usr", "local", "bin"));
  });
});

describe("path.resolve", () => {
  it("produces an absolute path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "src");
    const result = await rp.executeScript(
      '$p = testPath\npath.resolve $p'
    );
    const expected = nodePath.resolve("src");
    assert.equal(result, expected);
  });

  it("resolves multiple segments to absolute path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testA", () => "src");
    rp.registerBuiltin("testB", () => "index.ts");
    const result = await rp.executeScript(
      '$a = testA\n$b = testB\npath.resolve $a $b'
    );
    const expected = nodePath.resolve("src", "index.ts");
    assert.equal(result, expected);
  });
});

describe("path.dirname", () => {
  it("extracts the directory name", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/usr/local/bin/node");
    const result = await rp.executeScript(
      '$p = testPath\npath.dirname $p'
    );
    assert.equal(result, nodePath.dirname("/usr/local/bin/node"));
  });
});

describe("path.basename", () => {
  it("extracts the filename", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/usr/local/bin/node");
    const result = await rp.executeScript(
      '$p = testPath\npath.basename $p'
    );
    assert.equal(result, "node");
  });

  it("removes the extension when specified", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/home/user/file.txt");
    rp.registerBuiltin("testExt", () => ".txt");
    const result = await rp.executeScript(
      '$p = testPath\n$e = testExt\npath.basename $p $e'
    );
    assert.equal(result, "file");
  });
});

describe("path.extname", () => {
  it("extracts the file extension", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "index.html");
    const result = await rp.executeScript(
      '$p = testPath\npath.extname $p'
    );
    assert.equal(result, ".html");
  });

  it("returns empty string for no extension", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "Makefile");
    const result = await rp.executeScript(
      '$p = testPath\npath.extname $p'
    );
    assert.equal(result, "");
  });
});

describe("path.normalize", () => {
  it("cleans up a path with double dots", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/usr/local/../bin");
    const result = await rp.executeScript(
      '$p = testPath\npath.normalize $p'
    );
    assert.equal(result, nodePath.normalize("/usr/local/../bin"));
  });

  it("cleans up a path with redundant separators", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/usr//local/./bin");
    const result = await rp.executeScript(
      '$p = testPath\npath.normalize $p'
    );
    assert.equal(result, nodePath.normalize("/usr//local/./bin"));
  });
});

describe("path.isAbsolute", () => {
  it("returns true for an absolute path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/usr/local");
    const result = await rp.executeScript(
      '$p = testPath\npath.isAbsolute $p'
    );
    assert.equal(result, true);
  });

  it("returns false for a relative path", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "src/index.ts");
    const result = await rp.executeScript(
      '$p = testPath\npath.isAbsolute $p'
    );
    assert.equal(result, false);
  });
});

describe("path.relative", () => {
  it("computes the relative path between two paths", async () => {
    const rp = createRp();
    rp.registerBuiltin("testFrom", () => "/usr/local");
    rp.registerBuiltin("testTo", () => "/usr/local/bin/node");
    const result = await rp.executeScript(
      '$from = testFrom\n$to = testTo\npath.relative $from $to'
    );
    const expected = nodePath.relative("/usr/local", "/usr/local/bin/node");
    assert.equal(result, expected);
  });
});

describe("path.parse", () => {
  it("returns a parsed path object", async () => {
    const rp = createRp();
    rp.registerBuiltin("testPath", () => "/home/user/file.txt");
    const result = await rp.executeScript(
      '$p = testPath\npath.parse $p'
    );
    const expected = nodePath.parse("/home/user/file.txt");
    assert.ok(typeof result === "object" && result !== null);
    const obj = result as Record<string, unknown>;
    assert.equal(obj.root, expected.root);
    assert.equal(obj.dir, expected.dir);
    assert.equal(obj.base, expected.base);
    assert.equal(obj.ext, expected.ext);
    assert.equal(obj.name, expected.name);
  });
});

describe("path.separator", () => {
  it("returns the platform path separator", async () => {
    const rp = createRp();
    const result = await rp.executeScript("path.separator");
    const sep = nodePath.sep;
    assert.equal(result, sep);
    assert.ok(result === "/" || result === "\\");
  });
});
