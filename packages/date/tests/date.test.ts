import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import DateModule from "../src/index.js";

// Helper: create a RobinPath instance with the Date module loaded
function createRp(): InstanceType<typeof RobinPath> {
  const rp = new RobinPath();
  rp.registerModule(DateModule.name, DateModule.functions);
  rp.registerModuleMeta(DateModule.name, DateModule.functionMetadata);
  return rp;
}

// ── date.parse ─────────────────────────────────────────────────────

describe("date.parse", () => {
  it("parses an ISO date string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.parse "2024-01-15"');
    assert.equal(result, new Date("2024-01-15").toISOString());
  });

  it("parses an ISO datetime string", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.parse "2024-06-15T10:30:00Z"');
    assert.equal(result, "2024-06-15T10:30:00.000Z");
  });

  it("parses a date with time and timezone", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.parse "2024-03-20T15:45:00.000Z"');
    assert.equal(result, "2024-03-20T15:45:00.000Z");
  });
});

// ── date.format ────────────────────────────────────────────────────

describe("date.format", () => {
  it("formats with YYYY-MM-DD pattern", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-06-15T10:30:00.000Z" "YYYY-MM-DD"');
    assert.equal(result, "2024-06-15");
  });

  it("formats with HH:mm:ss pattern", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-06-15T10:30:45.000Z" "HH:mm:ss"');
    assert.equal(result, "10:30:45");
  });

  it("formats with full pattern YYYY-MM-DD HH:mm:ss", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-01-05T08:05:09.000Z" "YYYY-MM-DD HH:mm:ss"');
    assert.equal(result, "2024-01-05 08:05:09");
  });

  it("formats with ddd weekday token", async () => {
    const rp = createRp();
    // 2024-01-15 is a Monday
    const result = await rp.executeScript('date.format "2024-01-15T00:00:00.000Z" "ddd"');
    assert.equal(result, "Mon");
  });

  it("formats with MMMM full month token", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-06-15T00:00:00.000Z" "MMMM"');
    assert.equal(result, "June");
  });

  it("formats with MMM short month token", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-12-25T00:00:00.000Z" "MMM"');
    assert.equal(result, "Dec");
  });

  it("formats with compound pattern DD MMM YYYY", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.format "2024-03-07T00:00:00.000Z" "DD MMM YYYY"');
    assert.equal(result, "07 Mar 2024");
  });
});

// ── date.add ───────────────────────────────────────────────────────

describe("date.add", () => {
  it("adds days", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 5 "days"',
    ].join("\n"));
    assert.equal(result, "2024-01-20T00:00:00.000Z");
  });

  it("adds months", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 2 "months"',
    ].join("\n"));
    assert.equal(result, "2024-03-15T00:00:00.000Z");
  });

  it("adds years", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 3 "years"',
    ].join("\n"));
    assert.equal(result, "2027-01-15T00:00:00.000Z");
  });

  it("adds hours", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 10 "hours"',
    ].join("\n"));
    assert.equal(result, "2024-01-15T10:00:00.000Z");
  });

  it("adds minutes", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T12:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 30 "minutes"',
    ].join("\n"));
    assert.equal(result, "2024-01-15T12:30:00.000Z");
  });

  it("adds seconds", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T12:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.add $dt 45 "seconds"',
    ].join("\n"));
    assert.equal(result, "2024-01-15T12:00:45.000Z");
  });
});

// ── date.subtract ──────────────────────────────────────────────────

describe("date.subtract", () => {
  it("subtracts days", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.subtract $dt 5 "days"',
    ].join("\n"));
    assert.equal(result, "2024-01-10T00:00:00.000Z");
  });

  it("subtracts months", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.subtract $dt 3 "months"',
    ].join("\n"));
    assert.equal(result, "2024-03-15T00:00:00.000Z");
  });

  it("subtracts years", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.subtract $dt 2 "years"',
    ].join("\n"));
    assert.equal(result, "2022-01-15T00:00:00.000Z");
  });
});

// ── date.diff ──────────────────────────────────────────────────────

describe("date.diff", () => {
  it("calculates difference in days", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-20T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      'date.diff $a $b "days"',
    ].join("\n"));
    assert.equal(result, 5);
  });

  it("calculates difference in hours", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-15T12:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      'date.diff $a $b "hours"',
    ].join("\n"));
    assert.equal(result, 12);
  });

  it("calculates difference in months", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-06-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      'date.diff $a $b "months"',
    ].join("\n"));
    assert.equal(result, 5);
  });

  it("returns negative when date1 is before date2", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-10T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      'date.diff $a $b "days"',
    ].join("\n"));
    assert.equal(result, -5);
  });
});

// ── date.startOf ───────────────────────────────────────────────────

describe("date.startOf", () => {
  it("returns start of month", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.startOf $dt "month"',
    ].join("\n"));
    assert.equal(result, "2024-06-01T00:00:00.000Z");
  });

  it("returns start of year", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.startOf $dt "year"',
    ].join("\n"));
    assert.equal(result, "2024-01-01T00:00:00.000Z");
  });

  it("returns start of day", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:45.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.startOf $dt "day"',
    ].join("\n"));
    assert.equal(result, "2024-06-15T00:00:00.000Z");
  });

  it("returns start of hour", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:45.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.startOf $dt "hour"',
    ].join("\n"));
    assert.equal(result, "2024-06-15T14:00:00.000Z");
  });

  it("returns start of minute", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:45.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.startOf $dt "minute"',
    ].join("\n"));
    assert.equal(result, "2024-06-15T14:30:00.000Z");
  });
});

// ── date.endOf ─────────────────────────────────────────────────────

describe("date.endOf", () => {
  it("returns end of month", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.endOf $dt "month"',
    ].join("\n"));
    assert.equal(result, "2024-06-30T23:59:59.999Z");
  });

  it("returns end of year", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.endOf $dt "year"',
    ].join("\n"));
    assert.equal(result, "2024-12-31T23:59:59.999Z");
  });

  it("returns end of day", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-15T14:30:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.endOf $dt "day"',
    ].join("\n"));
    assert.equal(result, "2024-06-15T23:59:59.999Z");
  });

  it("returns end of February in leap year", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-02-10T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.endOf $dt "month"',
    ].join("\n"));
    assert.equal(result, "2024-02-29T23:59:59.999Z");
  });

  it("returns end of February in non-leap year", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2023-02-10T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      'date.endOf $dt "month"',
    ].join("\n"));
    assert.equal(result, "2023-02-28T23:59:59.999Z");
  });
});

// ── date.isAfter ───────────────────────────────────────────────────

describe("date.isAfter", () => {
  it("returns true when date1 is after date2", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-06-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isAfter $a $b",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false when date1 is before date2", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-06-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isAfter $a $b",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false when dates are equal", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isAfter $a $b",
    ].join("\n"));
    assert.equal(result, false);
  });
});

// ── date.isBefore ──────────────────────────────────────────────────

describe("date.isBefore", () => {
  it("returns true when date1 is before date2", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-06-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isBefore $a $b",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false when date1 is after date2", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-06-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isBefore $a $b",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false when dates are equal", async () => {
    const rp = createRp();
    rp.registerBuiltin("d1", () => "2024-01-15T00:00:00.000Z");
    rp.registerBuiltin("d2", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$a = d1",
      "$b = d2",
      "date.isBefore $a $b",
    ].join("\n"));
    assert.equal(result, false);
  });
});

// ── date.isBetween ─────────────────────────────────────────────────

describe("date.isBetween", () => {
  it("returns true when date is between start and end", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-03-15T00:00:00.000Z");
    rp.registerBuiltin("s", () => "2024-01-01T00:00:00.000Z");
    rp.registerBuiltin("e", () => "2024-06-30T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "$start = s",
      "$end = e",
      "date.isBetween $dt $start $end",
    ].join("\n"));
    assert.equal(result, true);
  });

  it("returns false when date is before start", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2023-12-01T00:00:00.000Z");
    rp.registerBuiltin("s", () => "2024-01-01T00:00:00.000Z");
    rp.registerBuiltin("e", () => "2024-06-30T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "$start = s",
      "$end = e",
      "date.isBetween $dt $start $end",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false when date is after end", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-07-15T00:00:00.000Z");
    rp.registerBuiltin("s", () => "2024-01-01T00:00:00.000Z");
    rp.registerBuiltin("e", () => "2024-06-30T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "$start = s",
      "$end = e",
      "date.isBetween $dt $start $end",
    ].join("\n"));
    assert.equal(result, false);
  });

  it("returns false when date equals start (exclusive)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-01T00:00:00.000Z");
    rp.registerBuiltin("s", () => "2024-01-01T00:00:00.000Z");
    rp.registerBuiltin("e", () => "2024-06-30T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "$start = s",
      "$end = e",
      "date.isBetween $dt $start $end",
    ].join("\n"));
    assert.equal(result, false);
  });
});

// ── date.toUnix / date.fromUnix ────────────────────────────────────

describe("date.toUnix / date.fromUnix", () => {
  it("converts date to unix timestamp", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.toUnix $dt",
    ].join("\n"));
    assert.equal(result, Math.floor(new Date("2024-01-15T00:00:00.000Z").getTime() / 1000));
  });

  it("converts unix timestamp back to ISO string", async () => {
    const rp = createRp();
    const ts = Math.floor(new Date("2024-01-15T00:00:00.000Z").getTime() / 1000);
    const result = await rp.executeScript(`date.fromUnix ${ts}`);
    assert.equal(result, "2024-01-15T00:00:00.000Z");
  });

  it("round-trips through toUnix and fromUnix", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-07-04T12:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "$ts = date.toUnix $dt",
      "date.fromUnix $ts",
    ].join("\n"));
    assert.equal(result, "2024-07-04T12:00:00.000Z");
  });
});

// ── date.toISO ─────────────────────────────────────────────────────

describe("date.toISO", () => {
  it("converts a date string to ISO format", async () => {
    const rp = createRp();
    const result = await rp.executeScript('date.toISO "2024-01-15T00:00:00.000Z"');
    assert.equal(result, "2024-01-15T00:00:00.000Z");
  });
});

// ── date.dayOfWeek ─────────────────────────────────────────────────

describe("date.dayOfWeek", () => {
  it("returns 1 for Monday (2024-01-15)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.dayOfWeek $dt",
    ].join("\n"));
    assert.equal(result, 1); // Monday
  });

  it("returns 0 for Sunday (2024-01-14)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-14T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.dayOfWeek $dt",
    ].join("\n"));
    assert.equal(result, 0); // Sunday
  });

  it("returns 6 for Saturday (2024-01-13)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-13T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.dayOfWeek $dt",
    ].join("\n"));
    assert.equal(result, 6); // Saturday
  });

  it("returns 3 for Wednesday (2024-01-17)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-17T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.dayOfWeek $dt",
    ].join("\n"));
    assert.equal(result, 3); // Wednesday
  });
});

// ── date.daysInMonth ───────────────────────────────────────────────

describe("date.daysInMonth", () => {
  it("returns 31 for January", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-01-15T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 31);
  });

  it("returns 29 for February in leap year (2024)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-02-10T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 29);
  });

  it("returns 28 for February in non-leap year (2023)", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2023-02-10T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 28);
  });

  it("returns 30 for April", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-04-10T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 30);
  });

  it("returns 30 for June", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-06-20T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 30);
  });

  it("returns 31 for December", async () => {
    const rp = createRp();
    rp.registerBuiltin("d", () => "2024-12-25T00:00:00.000Z");
    const result = await rp.executeScript([
      "$dt = d",
      "date.daysInMonth $dt",
    ].join("\n"));
    assert.equal(result, 31);
  });
});
