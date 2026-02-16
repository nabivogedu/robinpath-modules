import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import CryptoModule from "../src/index.js";

// Helper: create a RobinPath instance with the crypto module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(CryptoModule.name, CryptoModule.functions);
  rp.registerModuleMeta(CryptoModule.name, CryptoModule.functionMetadata);
  return rp;
}

// ── crypto.md5 ─────────────────────────────────────────────────────

describe("crypto.md5", () => {
  it("hashes 'hello' to known MD5 digest", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.md5 "hello"');
    assert.equal(result, "5d41402abc4b2a76b9719d911017c592");
  });

  it("hashes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.md5 ""');
    assert.equal(result, "d41d8cd98f00b204e9800998ecf8427e");
  });

  it("hashes a longer string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.md5 "The quick brown fox jumps over the lazy dog"');
    assert.equal(result, "9e107d9d372bb6826bd81d3542a419d6");
  });
});

// ── crypto.sha1 ────────────────────────────────────────────────────

describe("crypto.sha1", () => {
  it("hashes 'hello' to known SHA-1 digest", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha1 "hello"');
    assert.equal(result, "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
  });

  it("hashes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha1 ""');
    assert.equal(result, "da39a3ee5e6b4b0d3255bfef95601890afd80709");
  });
});

// ── crypto.sha256 ──────────────────────────────────────────────────

describe("crypto.sha256", () => {
  it("hashes 'hello' to known SHA-256 digest", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha256 "hello"');
    assert.equal(result, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });

  it("hashes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha256 ""');
    assert.equal(result, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });
});

// ── crypto.sha512 ──────────────────────────────────────────────────

describe("crypto.sha512", () => {
  it("hashes 'hello' to known SHA-512 digest", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha512 "hello"');
    assert.equal(
      result,
      "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
    );
  });

  it("hashes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.sha512 ""');
    assert.equal(
      result,
      "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e",
    );
  });
});

// ── crypto.hmac ────────────────────────────────────────────────────

describe("crypto.hmac", () => {
  it("computes HMAC-SHA256 for known inputs", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hmac "sha256" "message" "secret"');
    assert.equal(result, "8b5f48702995c1598c573db1e21866a9b825d4a794d169d7060a03605796360b");
  });

  it("computes HMAC-SHA512", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hmac "sha512" "message" "secret"');
    assert.equal(typeof result, "string");
    assert.equal((result as string).length, 128); // SHA-512 hex is 128 chars
  });

  it("computes HMAC-MD5", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hmac "md5" "message" "secret"');
    assert.equal(typeof result, "string");
    assert.equal((result as string).length, 32); // MD5 hex is 32 chars
  });
});

// ── crypto.base64Encode / crypto.base64Decode ──────────────────────

describe("crypto.base64Encode", () => {
  it("encodes 'hello' to Base64", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.base64Encode "hello"');
    assert.equal(result, "aGVsbG8=");
  });

  it("encodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.base64Encode ""');
    assert.equal(result, "");
  });

  it("encodes string with special characters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.base64Encode "hello world!"');
    assert.equal(result, "aGVsbG8gd29ybGQh");
  });
});

describe("crypto.base64Decode", () => {
  it("decodes 'aGVsbG8=' back to 'hello'", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.base64Decode "aGVsbG8="');
    assert.equal(result, "hello");
  });

  it("decodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.base64Decode ""');
    assert.equal(result, "");
  });
});

describe("base64 round-trip", () => {
  it("encode then decode returns original string", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      '$encoded = crypto.base64Encode "RobinPath rocks!"',
      "crypto.base64Decode $encoded",
    ].join("\n"));
    assert.equal(result, "RobinPath rocks!");
  });
});

// ── crypto.hexEncode / crypto.hexDecode ────────────────────────────

describe("crypto.hexEncode", () => {
  it("encodes 'hello' to hex", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hexEncode "hello"');
    assert.equal(result, "68656c6c6f");
  });

  it("encodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hexEncode ""');
    assert.equal(result, "");
  });
});

describe("crypto.hexDecode", () => {
  it("decodes '68656c6c6f' back to 'hello'", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hexDecode "68656c6c6f"');
    assert.equal(result, "hello");
  });

  it("decodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.hexDecode ""');
    assert.equal(result, "");
  });
});

describe("hex round-trip", () => {
  it("encode then decode returns original string", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      '$encoded = crypto.hexEncode "RobinPath"',
      "crypto.hexDecode $encoded",
    ].join("\n"));
    assert.equal(result, "RobinPath");
  });
});

// ── crypto.urlEncode / crypto.urlDecode ────────────────────────────

describe("crypto.urlEncode", () => {
  it("encodes 'hello world' with percent encoding", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlEncode "hello world"');
    assert.equal(result, "hello%20world");
  });

  it("encodes special characters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlEncode "a=1&b=2"');
    assert.equal(result, "a%3D1%26b%3D2");
  });

  it("encodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlEncode ""');
    assert.equal(result, "");
  });
});

describe("crypto.urlDecode", () => {
  it("decodes 'hello%20world' back to 'hello world'", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlDecode "hello%20world"');
    assert.equal(result, "hello world");
  });

  it("decodes special characters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlDecode "a%3D1%26b%3D2"');
    assert.equal(result, "a=1&b=2");
  });

  it("decodes empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('crypto.urlDecode ""');
    assert.equal(result, "");
  });
});

describe("url round-trip", () => {
  it("encode then decode returns original string", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      '$encoded = crypto.urlEncode "key=value&foo=bar baz"',
      "crypto.urlDecode $encoded",
    ].join("\n"));
    assert.equal(result, "key=value&foo=bar baz");
  });
});

// ── module structure ───────────────────────────────────────────────

describe("CryptoModule adapter", () => {
  it("has correct module name", () => {
    assert.equal(CryptoModule.name, "crypto");
  });

  it("is not global", () => {
    assert.equal(CryptoModule.global, false);
  });

  it("exports all 11 functions", () => {
    const names = Object.keys(CryptoModule.functions);
    assert.equal(names.length, 11);
    assert.deepEqual(names.sort(), [
      "base64Decode",
      "base64Encode",
      "hexDecode",
      "hexEncode",
      "hmac",
      "md5",
      "sha1",
      "sha256",
      "sha512",
      "urlDecode",
      "urlEncode",
    ]);
  });

  it("has metadata for every function", () => {
    for (const name of Object.keys(CryptoModule.functions)) {
      assert.ok(
        CryptoModule.functionMetadata[name],
        `Missing metadata for function: ${name}`,
      );
    }
  });

  it("moduleMetadata lists all methods", () => {
    assert.equal(CryptoModule.moduleMetadata.methods.length, 11);
  });
});
