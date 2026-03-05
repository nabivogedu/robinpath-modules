import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { RobinPath } from "@wiredwp/robinpath";
import FormModule from "../src/index.js";
import { FormFunctions } from "../src/form.js";

const fn = (name: string) => FormFunctions[name]!;

/** Simulate exactly what the CDN does: form.reset + user code + form.getForm */
async function getFormSchemaFromCode(code: string) {
	const rp = new RobinPath();
	rp.registerModule(FormModule.name, FormModule.functions);
	const script = "form.reset\n" + code + "\nform.getForm";
	return rp.executeScript(script) as Promise<{ config: Record<string, unknown>; fields: Array<Record<string, unknown>> }>;
}

describe("form module", () => {
  beforeEach(() => {
    fn("reset")([]);
  });

  // ── Config ──────────────────────────────────────────────────────
  describe("config", () => {
    it("sets form title and submitLabel", () => {
      fn("config")([{ title: "Contact Us", submitLabel: "Send" }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.title, "Contact Us");
      assert.equal(schema.config.submitLabel, "Send");
    });

    it("sets all config options", () => {
      fn("config")([{
        title: "Test",
        description: "A form",
        submitLabel: "Go",
        successMessage: "Done!",
        errorMessage: "Oops",
        theme: { primary: "#ff0000" },
      }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.title, "Test");
      assert.equal(schema.config.description, "A form");
      assert.equal(schema.config.submitLabel, "Go");
      assert.equal(schema.config.successMessage, "Done!");
      assert.equal(schema.config.errorMessage, "Oops");
      assert.deepEqual(schema.config.theme, { primary: "#ff0000" });
    });
  });

  // ── Field Types ─────────────────────────────────────────────────
  describe("field types", () => {
    const fieldTypes = [
      "text", "textarea", "number", "email", "url", "phone", "password",
      "select", "multiselect", "checkbox", "radio",
      "date", "time", "datetime",
      "file", "hidden", "color", "range", "json",
    ];

    for (const type of fieldTypes) {
      it(`${type}: registers field and returns null by default`, () => {
        const result = fn(type)([`${type}Field`, { label: `${type} label` }]);
        assert.equal(result, null);
        const schema = fn("getForm")([]) as any;
        assert.equal(schema.fields.length, 1);
        assert.equal(schema.fields[0].name, `${type}Field`);
        assert.equal(schema.fields[0].type, type);
        assert.equal(schema.fields[0].label, `${type} label`);
      });
    }

    it("returns defaultValue when no data submitted", () => {
      const result = fn("text")(["username", { label: "Name", defaultValue: "Alice" }]);
      assert.equal(result, "Alice");
    });

    it("returns submitted value after setData", () => {
      fn("setData")([{ name: "Bob" }]);
      const result = fn("text")(["name", { label: "Name", defaultValue: "Alice" }]);
      assert.equal(result, "Bob");
    });

    it("registers select with options", () => {
      fn("select")(["plan", { label: "Plan", options: ["free", "pro", "enterprise"] }]);
      const schema = fn("getForm")([]) as any;
      assert.deepEqual(schema.fields[0].options, [
        { value: "free", label: "free" },
        { value: "pro", label: "pro" },
        { value: "enterprise", label: "enterprise" },
      ]);
    });

    it("registers select with object options", () => {
      fn("select")(["plan", { label: "Plan", options: [{ value: "f", label: "Free" }, { value: "p", label: "Pro" }] }]);
      const schema = fn("getForm")([]) as any;
      assert.deepEqual(schema.fields[0].options, [
        { value: "f", label: "Free" },
        { value: "p", label: "Pro" },
      ]);
    });

    it("registers number with min/max/step", () => {
      fn("number")(["age", { label: "Age", min: 0, max: 120, step: 1 }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields[0].min, 0);
      assert.equal(schema.fields[0].max, 120);
      assert.equal(schema.fields[0].step, 1);
    });

    it("registers range with min/max/step", () => {
      fn("range")(["budget", { label: "Budget", min: 0, max: 10000, step: 100 }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields[0].min, 0);
      assert.equal(schema.fields[0].max, 10000);
      assert.equal(schema.fields[0].step, 100);
    });

    it("registers file with accept and maxSize", () => {
      fn("file")(["doc", { label: "Document", accept: ".pdf,.doc", maxSize: 5000000 }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields[0].accept, ".pdf,.doc");
      assert.equal(schema.fields[0].maxSize, 5000000);
    });

    it("registers hidden with defaultValue", () => {
      const result = fn("hidden")(["source", { defaultValue: "website" }]);
      assert.equal(result, "website");
    });

    it("preserves field order", () => {
      fn("text")(["first", {}]);
      fn("email")(["second", {}]);
      fn("number")(["third", {}]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields[0].name, "first");
      assert.equal(schema.fields[0].order, 0);
      assert.equal(schema.fields[1].name, "second");
      assert.equal(schema.fields[1].order, 1);
      assert.equal(schema.fields[2].name, "third");
      assert.equal(schema.fields[2].order, 2);
    });
  });

  // ── Duplicate Field Names ───────────────────────────────────────
  describe("duplicate field names", () => {
    it("throws on duplicate field name", () => {
      fn("text")(["name", { label: "Name" }]);
      assert.throws(() => fn("text")(["name", { label: "Name Again" }]), /Duplicate field name "name"/);
    });
  });

  // ── Invalid Field Names ─────────────────────────────────────────
  describe("invalid field names", () => {
    it("throws on empty name", () => {
      assert.throws(() => fn("text")(["", {}]), /Field name is required/);
    });

    it("throws on name starting with number", () => {
      assert.throws(() => fn("text")(["123abc", {}]), /Invalid field name/);
    });

    it("throws on name with special characters", () => {
      assert.throws(() => fn("text")(["my-field", {}]), /Invalid field name/);
    });

    it("accepts underscore-prefixed name", () => {
      const result = fn("text")(["_internal", {}]);
      assert.equal(result, null);
    });
  });

  // ── setData & getForm ───────────────────────────────────────────
  describe("setData", () => {
    it("makes fields return submitted values", () => {
      fn("setData")([{ name: "Alice", email: "alice@co.com", agree: true }]);
      const name = fn("text")(["name", { label: "Name" }]);
      const email = fn("email")(["email", { label: "Email" }]);
      const agree = fn("checkbox")(["agree", { label: "Agree" }]);
      assert.equal(name, "Alice");
      assert.equal(email, "alice@co.com");
      assert.equal(agree, true);
    });
  });

  describe("getForm", () => {
    it("returns complete schema", () => {
      fn("config")([{ title: "Test Form", submitLabel: "Submit" }]);
      fn("text")(["name", { label: "Name", required: true }]);
      fn("email")(["email", { label: "Email", required: true }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.title, "Test Form");
      assert.equal(schema.config.submitLabel, "Submit");
      assert.equal(schema.fields.length, 2);
      assert.equal(schema.fields[0].name, "name");
      assert.equal(schema.fields[0].required, true);
      assert.equal(schema.fields[1].name, "email");
    });
  });

  // ── Validate ────────────────────────────────────────────────────
  describe("validate", () => {
    it("passes valid data", () => {
      fn("text")(["name", { label: "Name", required: true }]);
      fn("email")(["email", { label: "Email", required: true }]);
      const result = fn("validate")([{ name: "Alice", email: "alice@co.com" }]) as any;
      assert.equal(result.valid, true);
      assert.deepEqual(result.errors, {});
    });

    it("catches missing required fields", () => {
      fn("text")(["name", { label: "Name", required: true }]);
      const result = fn("validate")([{}]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.name);
      assert.ok(result.errors.name[0].includes("required"));
    });

    it("catches invalid email", () => {
      fn("email")(["email", { label: "Email" }]);
      const result = fn("validate")([{ email: "not-an-email" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.email[0].includes("valid email"));
    });

    it("catches invalid URL", () => {
      fn("url")(["website", { label: "Website" }]);
      const result = fn("validate")([{ website: "not-a-url" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.website[0].includes("valid URL"));
    });

    it("validates number min/max", () => {
      fn("number")(["age", { label: "Age", min: 0, max: 120 }]);
      const result = fn("validate")([{ age: -5 }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.age[0].includes("at least"));
    });

    it("validates string minLength/maxLength", () => {
      fn("text")(["name", { label: "Name", minLength: 2, maxLength: 5 }]);
      const result = fn("validate")([{ name: "A" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.name[0].includes("at least 2"));
    });

    it("validates string maxLength", () => {
      fn("text")(["name", { label: "Name", maxLength: 5 }]);
      const result = fn("validate")([{ name: "Too Long Name" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.name[0].includes("at most 5"));
    });

    it("validates regex pattern", () => {
      fn("text")(["code", { label: "Code", pattern: "^[A-Z]{3}$" }]);
      const result = fn("validate")([{ code: "abc" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.code[0].includes("pattern"));
    });

    it("passes valid regex pattern", () => {
      fn("text")(["code", { label: "Code", pattern: "^[A-Z]{3}$" }]);
      const result = fn("validate")([{ code: "ABC" }]) as any;
      assert.equal(result.valid, true);
    });

    it("validates select options", () => {
      fn("select")(["plan", { label: "Plan", options: ["free", "pro"] }]);
      const result = fn("validate")([{ plan: "enterprise" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.plan[0].includes("Invalid option"));
    });

    it("validates multiselect options", () => {
      fn("multiselect")(["tags", { label: "Tags", options: ["a", "b", "c"] }]);
      const result = fn("validate")([{ tags: ["a", "d"] }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.tags[0].includes("Invalid option"));
    });

    it("validates multiselect requires array", () => {
      fn("multiselect")(["tags", { label: "Tags", options: ["a", "b"] }]);
      const result = fn("validate")([{ tags: "not-array" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.tags[0].includes("array"));
    });

    it("validates number type", () => {
      fn("number")(["count", { label: "Count" }]);
      const result = fn("validate")([{ count: "abc" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.count[0].includes("number"));
    });

    it("validates JSON field", () => {
      fn("json")(["meta", { label: "Metadata" }]);
      const result = fn("validate")([{ meta: "{invalid" }]) as any;
      assert.equal(result.valid, false);
      assert.ok(result.errors.meta[0].includes("valid JSON"));
    });

    it("passes valid JSON field", () => {
      fn("json")(["meta", { label: "Metadata" }]);
      const result = fn("validate")([{ meta: '{"key":"value"}' }]) as any;
      assert.equal(result.valid, true);
    });

    it("skips validation for blank optional fields", () => {
      fn("email")(["email", { label: "Email" }]);
      const result = fn("validate")([{}]) as any;
      assert.equal(result.valid, true);
    });

    it("uses custom validation message", () => {
      fn("text")(["code", { label: "Code", validation: { pattern: "^[A-Z]+$", message: "Only uppercase letters" } }]);
      const result = fn("validate")([{ code: "abc" }]) as any;
      assert.equal(result.errors.code[0], "Only uppercase letters");
    });
  });

  // ── Reset ───────────────────────────────────────────────────────
  describe("reset", () => {
    it("clears all state", () => {
      fn("config")([{ title: "Test" }]);
      fn("text")(["name", { label: "Name" }]);
      fn("setData")([{ name: "Alice" }]);
      fn("reset")([]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields.length, 0);
      assert.equal(schema.config.title, undefined);
    });
  });

  // ── Group ───────────────────────────────────────────────────────
  describe("group", () => {
    it("adds group to config", () => {
      fn("group")(["personal", { label: "Personal Info", fields: ["name", "email"] }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.groups.length, 1);
      assert.equal(schema.config.groups[0].name, "personal");
      assert.equal(schema.config.groups[0].label, "Personal Info");
      assert.deepEqual(schema.config.groups[0].fields, ["name", "email"]);
    });

    it("throws on empty group name", () => {
      assert.throws(() => fn("group")(["", {}]), /Group name is required/);
    });
  });

  // ── Step ────────────────────────────────────────────────────────
  describe("step", () => {
    it("adds step to config", () => {
      fn("step")(["Step 1", { fields: ["name", "email"] }]);
      fn("step")(["Step 2", { fields: ["phone"] }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.steps.length, 2);
      assert.equal(schema.config.steps[0].name, "Step 1");
      assert.deepEqual(schema.config.steps[0].fields, ["name", "email"]);
      assert.equal(schema.config.steps[1].name, "Step 2");
    });

    it("throws on empty step name", () => {
      assert.throws(() => fn("step")(["", {}]), /Step name is required/);
    });

    it("enforces max steps limit", () => {
      for (let i = 0; i < 10; i++) {
        fn("step")([`Step ${i}`, { fields: [] }]);
      }
      assert.throws(() => fn("step")(["Step 11", { fields: [] }]), /Maximum 10 steps/);
    });
  });

  // ── toEmbed ─────────────────────────────────────────────────────
  describe("toEmbed", () => {
    it("generates embed snippets", () => {
      const result = fn("toEmbed")(["https://rpshotter.example.com"]) as any;
      assert.ok(result.iframe.includes("iframe"));
      assert.ok(result.iframe.includes("https://rpshotter.example.com/form"));
      assert.ok(result.script.includes("script"));
      assert.ok(result.webComponent.includes("robinpath-form"));
    });

    it("throws on empty URL", () => {
      assert.throws(() => fn("toEmbed")([""]));
    });
  });

  // ── Field Limits ────────────────────────────────────────────────
  describe("limits", () => {
    it("enforces max 50 fields", () => {
      for (let i = 0; i < 50; i++) {
        fn("text")([`field_${i}`, {}]);
      }
      assert.throws(() => fn("text")(["field_50", {}]), /Maximum 50 fields/);
    });

    it("enforces max 100 options", () => {
      const opts = Array.from({ length: 101 }, (_, i) => `opt${i}`);
      assert.throws(() => fn("select")(["sel", { options: opts }]), /Maximum 100 options/);
    });
  });

  // ── Validation Rules in nested object ───────────────────────────
  describe("validation object", () => {
    it("supports nested validation object", () => {
      fn("text")(["code", { label: "Code", validation: { pattern: "^[A-Z]+$", minLength: 2, maxLength: 10 } }]);
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.fields[0].validation.pattern, "^[A-Z]+$");
      assert.equal(schema.fields[0].validation.minLength, 2);
      assert.equal(schema.fields[0].validation.maxLength, 10);
    });

    it("rejects invalid regex", () => {
      assert.throws(() => fn("text")(["bad", { validation: { pattern: "[invalid" } }]), /Invalid regex/);
    });
  });

  // ── Full Integration ────────────────────────────────────────────
  describe("full integration", () => {
    it("simulates a complete form lifecycle", () => {
      // Phase 1: Define form
      fn("config")([{ title: "Contact Us", submitLabel: "Send" }]);
      const name = fn("text")(["name", { label: "Full Name", required: true }]);
      const email = fn("email")(["email", { label: "Email", required: true }]);
      const plan = fn("select")(["plan", { label: "Plan", options: ["free", "pro"] }]);

      assert.equal(name, null);
      assert.equal(email, null);
      assert.equal(plan, null);

      // Phase 1: Get schema
      const schema = fn("getForm")([]) as any;
      assert.equal(schema.config.title, "Contact Us");
      assert.equal(schema.fields.length, 3);

      // Phase 2: Reset and re-run with data
      fn("reset")([]);
      fn("config")([{ title: "Contact Us", submitLabel: "Send" }]);
      fn("setData")([{ name: "Alice", email: "alice@co.com", plan: "pro" }]);

      const name2 = fn("text")(["name", { label: "Full Name", required: true }]);
      const email2 = fn("email")(["email", { label: "Email", required: true }]);
      const plan2 = fn("select")(["plan", { label: "Plan", options: ["free", "pro"] }]);

      assert.equal(name2, "Alice");
      assert.equal(email2, "alice@co.com");
      assert.equal(plan2, "pro");

      // Validate
      const validation = fn("validate")([{ name: "Alice", email: "alice@co.com", plan: "pro" }]) as any;
      assert.equal(validation.valid, true);
    });
  });
});

// ══════════════════════════════════════════════════════════════════
// CDN Integration Tests — simulate the exact CDN iframe flow
// These run real RobinPath scripts through the interpreter
// ══════════════════════════════════════════════════════════════════

describe("CDN iframe flow (RobinPath execution)", () => {

  it("basic contact form generates valid schema", async () => {
    const code = `form.config {"title": "Contact Us", "submitLabel": "Send"}
form.text "name" {"label": "Full Name", "required": true}
form.email "email" {"label": "Email", "required": true}
form.textarea "message" {"label": "Message", "placeholder": "Your message...", "required": true}`;

    const schema = await getFormSchemaFromCode(code);

    assert.ok(schema, "Schema should not be null");
    assert.ok(schema.config, "Schema should have config");
    assert.ok(Array.isArray(schema.fields), "Schema should have fields array");
    assert.equal(schema.config.title, "Contact Us");
    assert.equal(schema.config.submitLabel, "Send");
    assert.equal(schema.fields.length, 3);
    assert.equal(schema.fields[0].name, "name");
    assert.equal(schema.fields[0].type, "text");
    assert.equal(schema.fields[0].required, true);
    assert.equal(schema.fields[1].name, "email");
    assert.equal(schema.fields[1].type, "email");
    assert.equal(schema.fields[2].name, "message");
    assert.equal(schema.fields[2].type, "textarea");
  });

  it("form with select and checkbox fields", async () => {
    const code = `form.config {"title": "Survey", "description": "Quick survey"}
form.text "name" {"label": "Your Name", "required": true}
form.select "topic" {"label": "Topic", "options": ["General", "Support", "Sales"]}
form.checkbox "agree" {"label": "I agree to the terms"}`;

    const schema = await getFormSchemaFromCode(code);

    assert.equal(schema.config.title, "Survey");
    assert.equal(schema.config.description, "Quick survey");
    assert.equal(schema.fields.length, 3);
    assert.equal(schema.fields[1].type, "select");
    assert.equal((schema.fields[1] as any).options.length, 3);
    assert.equal(schema.fields[2].type, "checkbox");
  });

  it("form with number, date, and range fields", async () => {
    const code = `form.config {"title": "Booking"}
form.text "name" {"label": "Name", "required": true}
form.number "guests" {"label": "Number of Guests", "min": 1, "max": 20}
form.date "check_in" {"label": "Check-in Date", "required": true}
form.range "budget" {"label": "Budget", "min": 0, "max": 10000, "step": 100}`;

    const schema = await getFormSchemaFromCode(code);

    assert.equal(schema.fields.length, 4);
    assert.equal(schema.fields[1].type, "number");
    assert.equal((schema.fields[1] as any).min, 1);
    assert.equal((schema.fields[1] as any).max, 20);
    assert.equal(schema.fields[2].type, "date");
    assert.equal(schema.fields[3].type, "range");
    assert.equal((schema.fields[3] as any).step, 100);
  });

  it("non-form code returns empty schema", async () => {
    // Simulating a script that doesn't use form.* commands
    const code = `set $x = 42`;

    const schema = await getFormSchemaFromCode(code);

    // getForm always returns {config, fields} but with empty fields
    assert.ok(schema.config !== undefined);
    assert.ok(Array.isArray(schema.fields));
    assert.equal(schema.fields.length, 0);
  });

  it("form.reset between runs clears previous state", async () => {
    // First run
    const schema1 = await getFormSchemaFromCode(`form.text "first_field" {"label": "First"}`);
    assert.equal(schema1.fields.length, 1);
    assert.equal(schema1.fields[0].name, "first_field");

    // Second run (CDN always prepends form.reset, so state should be fresh)
    const schema2 = await getFormSchemaFromCode(`form.text "second_field" {"label": "Second"}`);
    assert.equal(schema2.fields.length, 1);
    assert.equal(schema2.fields[0].name, "second_field");
  });

  it("form with all common field types renders valid schema", async () => {
    const code = `form.config {"title": "Full Form", "submitLabel": "Submit All"}
form.text "name" {"label": "Name", "required": true, "placeholder": "John Doe"}
form.email "email" {"label": "Email", "required": true}
form.phone "phone" {"label": "Phone"}
form.url "website" {"label": "Website"}
form.textarea "bio" {"label": "Bio", "maxLength": 500}
form.number "age" {"label": "Age", "min": 18, "max": 120}
form.select "country" {"label": "Country", "options": ["US", "UK", "DE", "FR"]}
form.radio "gender" {"label": "Gender", "options": ["Male", "Female", "Other"]}
form.checkbox "terms" {"label": "Accept Terms", "required": true}
form.date "birthday" {"label": "Birthday"}
form.color "fav_color" {"label": "Favorite Color"}
form.hidden "source" {"defaultValue": "web"}`;

    const schema = await getFormSchemaFromCode(code);

    assert.equal(schema.config.title, "Full Form");
    assert.equal(schema.config.submitLabel, "Submit All");
    assert.equal(schema.fields.length, 12);

    // Verify CDN renderer would render this (non-hidden fields > 0)
    const visibleFields = schema.fields.filter((f: any) => f.type !== "hidden");
    assert.ok(visibleFields.length > 0, "Should have visible fields for CDN to render");
  });

  it("CDN hasForm check — fields with only hidden returns no form", async () => {
    const code = `form.hidden "source" {"defaultValue": "api"}
form.hidden "ref" {"defaultValue": "campaign1"}`;

    const schema = await getFormSchemaFromCode(code);

    // CDN renderer checks: schema.fields.filter(f => f.type !== "hidden").length > 0
    const visibleFields = schema.fields.filter((f: any) => f.type !== "hidden");
    assert.equal(visibleFields.length, 0, "Only hidden fields should show 'no form' message");
  });
});
