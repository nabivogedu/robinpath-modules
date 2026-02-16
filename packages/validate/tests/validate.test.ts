import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import ValidateModule from "../src/index.js";

// Helper: create a RobinPath instance with the validate module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(ValidateModule.name, ValidateModule.functions);
  rp.registerModuleMeta(ValidateModule.name, ValidateModule.functionMetadata);
  return rp;
}

// -- validate.isEmail -----------------------------------------------------

describe("validate.isEmail", () => {
  it("returns true for a valid email", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "user@example.com"');
    assert.equal(result, true);
  });

  it("returns true for email with subdomain", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "user@mail.example.com"');
    assert.equal(result, true);
  });

  it("returns true for email with plus addressing", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "user+tag@example.com"');
    assert.equal(result, true);
  });

  it("returns false for missing @", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "userexample.com"');
    assert.equal(result, false);
  });

  it("returns false for missing domain", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "user@"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail ""');
    assert.equal(result, false);
  });

  it("returns false for string with spaces", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmail "user @example.com"');
    assert.equal(result, false);
  });
});

// -- validate.isUrl -------------------------------------------------------

describe("validate.isUrl", () => {
  it("returns true for https URL", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl "https://example.com"');
    assert.equal(result, true);
  });

  it("returns true for http URL", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl "http://example.com"');
    assert.equal(result, true);
  });

  it("returns true for URL with path", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl "https://example.com/path/to/page"');
    assert.equal(result, true);
  });

  it("returns true for URL with query string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl "https://example.com?q=test&page=1"');
    assert.equal(result, true);
  });

  it("returns false for plain string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl "not-a-url"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUrl ""');
    assert.equal(result, false);
  });
});

// -- validate.isIP --------------------------------------------------------

describe("validate.isIP", () => {
  it("returns true for valid IP", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "192.168.1.1"');
    assert.equal(result, true);
  });

  it("returns true for 0.0.0.0", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "0.0.0.0"');
    assert.equal(result, true);
  });

  it("returns true for 255.255.255.255", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "255.255.255.255"');
    assert.equal(result, true);
  });

  it("returns true for loopback", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "127.0.0.1"');
    assert.equal(result, true);
  });

  it("returns false for octet > 255", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "256.1.1.1"');
    assert.equal(result, false);
  });

  it("returns false for too few octets", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "192.168.1"');
    assert.equal(result, false);
  });

  it("returns false for too many octets", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "192.168.1.1.1"');
    assert.equal(result, false);
  });

  it("returns false for non-numeric octets", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP "abc.def.ghi.jkl"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isIP ""');
    assert.equal(result, false);
  });
});

// -- validate.isUUID ------------------------------------------------------

describe("validate.isUUID", () => {
  it("returns true for valid lowercase UUID", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUUID "550e8400-e29b-41d4-a716-446655440000"');
    assert.equal(result, true);
  });

  it("returns true for valid uppercase UUID", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUUID "550E8400-E29B-41D4-A716-446655440000"');
    assert.equal(result, true);
  });

  it("returns false for invalid UUID (wrong length)", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUUID "550e8400-e29b-41d4-a716"');
    assert.equal(result, false);
  });

  it("returns false for UUID without dashes", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUUID "550e8400e29b41d4a716446655440000"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isUUID ""');
    assert.equal(result, false);
  });
});

// -- validate.isDate ------------------------------------------------------

describe("validate.isDate", () => {
  it("returns true for ISO date string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isDate "2024-01-15"');
    assert.equal(result, true);
  });

  it("returns true for ISO datetime string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isDate "2024-01-15T10:30:00Z"');
    assert.equal(result, true);
  });

  it("returns true for common date format", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isDate "January 15, 2024"');
    assert.equal(result, true);
  });

  it("returns false for invalid date string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isDate "not-a-date"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isDate ""');
    assert.equal(result, false);
  });
});

// -- validate.isNumeric ---------------------------------------------------

describe("validate.isNumeric", () => {
  it("returns true for integer string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "123"');
    assert.equal(result, true);
  });

  it("returns true for decimal string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "123.45"');
    assert.equal(result, true);
  });

  it("returns true for negative number string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "-42"');
    assert.equal(result, true);
  });

  it("returns true for zero", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "0"');
    assert.equal(result, true);
  });

  it("returns false for non-numeric string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "abc"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric ""');
    assert.equal(result, false);
  });

  it("returns false for mixed content", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isNumeric "12abc"');
    assert.equal(result, false);
  });
});

// -- validate.isAlpha -----------------------------------------------------

describe("validate.isAlpha", () => {
  it("returns true for lowercase letters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "hello"');
    assert.equal(result, true);
  });

  it("returns true for uppercase letters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "HELLO"');
    assert.equal(result, true);
  });

  it("returns true for mixed case letters", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "Hello"');
    assert.equal(result, true);
  });

  it("returns false for string with digits", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "hello123"');
    assert.equal(result, false);
  });

  it("returns false for string with spaces", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "hello world"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha ""');
    assert.equal(result, false);
  });

  it("returns false for string with symbols", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlpha "hello!"');
    assert.equal(result, false);
  });
});

// -- validate.isAlphanumeric ----------------------------------------------

describe("validate.isAlphanumeric", () => {
  it("returns true for alphanumeric string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric "hello123"');
    assert.equal(result, true);
  });

  it("returns true for letters only", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric "hello"');
    assert.equal(result, true);
  });

  it("returns true for digits only", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric "12345"');
    assert.equal(result, true);
  });

  it("returns false for string with symbols", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric "hello@123"');
    assert.equal(result, false);
  });

  it("returns false for string with spaces", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric "hello 123"');
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isAlphanumeric ""');
    assert.equal(result, false);
  });
});

// -- validate.matches -----------------------------------------------------

describe("validate.matches", () => {
  it("returns true when pattern matches", async () => {
    const rp = createRp();
    rp.registerBuiltin("getStr", () => "123");
    const result = await rp.executeScript([
      "$str = getStr",
      'validate.matches $str "^\\d{3}$"',
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false when pattern does not match", async () => {
    const rp = createRp();
    rp.registerBuiltin("getStr", () => "abc");
    const result = await rp.executeScript([
      "$str = getStr",
      'validate.matches $str "^\\d{3}$"',
    ].join("\n"));
    assert.equal(result, false);
  });

  it("supports flags parameter (case-insensitive)", async () => {
    const rp = createRp();
    rp.registerBuiltin("getStr", () => "Hello");
    const result = await rp.executeScript([
      "$str = getStr",
      'validate.matches $str "^hello$" "i"',
    ].join("\n"));
    assert.equal(result, true);
  });

  it("matches partial string with appropriate pattern", async () => {
    const rp = createRp();
    rp.registerBuiltin("getStr", () => "foo bar baz");
    const result = await rp.executeScript([
      "$str = getStr",
      'validate.matches $str "bar"',
    ].join("\n"));
    assert.equal(result, true);
  });
});

// -- validate.minLength ---------------------------------------------------

describe("validate.minLength", () => {
  it("returns true when length meets minimum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.minLength "hello" 3');
    assert.equal(result, true);
  });

  it("returns true when length equals minimum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.minLength "hello" 5');
    assert.equal(result, true);
  });

  it("returns false when length is below minimum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.minLength "hi" 5');
    assert.equal(result, false);
  });

  it("returns true for empty string with min 0", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.minLength "" 0');
    assert.equal(result, true);
  });
});

// -- validate.maxLength ---------------------------------------------------

describe("validate.maxLength", () => {
  it("returns true when length is within maximum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.maxLength "hi" 5');
    assert.equal(result, true);
  });

  it("returns true when length equals maximum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.maxLength "hello" 5');
    assert.equal(result, true);
  });

  it("returns false when length exceeds maximum", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.maxLength "hello world" 5');
    assert.equal(result, false);
  });

  it("returns true for empty string with max 0", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.maxLength "" 0');
    assert.equal(result, true);
  });
});

// -- validate.inRange -----------------------------------------------------

describe("validate.inRange", () => {
  it("returns true when value is in range", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 5 1 10");
    assert.equal(result, true);
  });

  it("returns true when value equals min", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 1 1 10");
    assert.equal(result, true);
  });

  it("returns true when value equals max", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 10 1 10");
    assert.equal(result, true);
  });

  it("returns false when value is below min", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 0 1 10");
    assert.equal(result, false);
  });

  it("returns false when value is above max", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 11 1 10");
    assert.equal(result, false);
  });

  it("handles negative ranges", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange -5 -10 -1");
    assert.equal(result, true);
  });

  it("returns false for out-of-range negative value", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.inRange 0 -10 -1");
    assert.equal(result, false);
  });
});

// -- validate.isJSON ------------------------------------------------------

describe("validate.isJSON", () => {
  it("returns true for valid JSON object", async () => {
    const rp = createRp();
    rp.registerBuiltin("getJson", () => '{"a":1}');
    const result = await rp.executeScript([
      "$json = getJson",
      "validate.isJSON $json",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns true for valid JSON array", async () => {
    const rp = createRp();
    rp.registerBuiltin("getJson", () => "[1,2,3]");
    const result = await rp.executeScript([
      "$json = getJson",
      "validate.isJSON $json",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns true for valid JSON string", async () => {
    const rp = createRp();
    rp.registerBuiltin("getJson", () => '"hello"');
    const result = await rp.executeScript([
      "$json = getJson",
      "validate.isJSON $json",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns true for valid JSON number", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isJSON "42"');
    assert.equal(result, true);
  });

  it("returns true for valid JSON boolean", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isJSON "true"');
    assert.equal(result, true);
  });

  it("returns true for valid JSON null", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isJSON "null"');
    assert.equal(result, true);
  });

  it("returns false for invalid JSON", async () => {
    const rp = createRp();
    rp.registerBuiltin("getJson", () => "{invalid}");
    const result = await rp.executeScript([
      "$json = getJson",
      "validate.isJSON $json",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isJSON ""');
    assert.equal(result, false);
  });
});

// -- validate.isEmpty -----------------------------------------------------

describe("validate.isEmpty", () => {
  it("returns true for empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmpty ""');
    assert.equal(result, true);
  });

  it("returns true for null", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      "$val = null",
      "validate.isEmpty $val",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns true for empty array", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      "$val = []",
      "validate.isEmpty $val",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns true for empty object", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      "$val = {}",
      "validate.isEmpty $val",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false for non-empty string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('validate.isEmpty "hello"');
    assert.equal(result, false);
  });

  it("returns false for non-empty array", async () => {
    const rp = createRp();
    const result = await rp.executeScript([
      "$val = [1, 2, 3]",
      "validate.isEmpty $val",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false for non-empty object", async () => {
    const rp = createRp();
    rp.registerBuiltin("getObj", () => ({ a: 1 }));
    const result = await rp.executeScript([
      "$val = getObj",
      "validate.isEmpty $val",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false for a number", async () => {
    const rp = createRp();
    const result = await rp.executeScript("validate.isEmpty 42");
    assert.equal(result, false);
  });
});
