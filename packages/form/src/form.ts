import type { BuiltinHandler } from "@wiredwp/robinpath";

// ── Limits ──────────────────────────────────────────────────────────
const MAX_FIELDS = 50;
const MAX_STEPS = 10;
const MAX_OPTIONS = 100;
const MAX_REGEX_LEN = 500;
const FIELD_NAME_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// ── Types ───────────────────────────────────────────────────────────
interface ValidationRule {
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  message?: string;
}

interface OptionItem {
  value: string;
  label: string;
}

interface FieldDef {
  name: string;
  type: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;
  disabled?: boolean;
  options?: OptionItem[];
  validation?: ValidationRule;
  accept?: string;
  maxSize?: number;
  step?: number;
  min?: number | string;
  max?: number | string;
  group?: string;
  order: number;
}

interface StepDef {
  name: string;
  description?: string;
  fields: string[];
}

interface GroupDef {
  name: string;
  label: string;
  description?: string;
  fields: string[];
}

interface FormConfig {
  title?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  theme?: Record<string, string>;
  steps?: StepDef[];
  groups?: GroupDef[];
}

interface FormSchema {
  config: FormConfig;
  fields: FieldDef[];
}

// ── Module State ────────────────────────────────────────────────────
let fields: FieldDef[] = [];
let formConfig: FormConfig = {};
const submittedData = new Map<string, unknown>();
let formSubmitted = false;

// ── Helpers ─────────────────────────────────────────────────────────
function parseOpts(raw: unknown): Record<string, unknown> {
  return typeof raw === "object" && raw !== null ? raw as Record<string, unknown> : {};
}

function normalizeOptions(raw: unknown): OptionItem[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  if (raw.length > MAX_OPTIONS) throw new Error(`Maximum ${MAX_OPTIONS} options allowed`);
  return raw.map((o) => {
    if (typeof o === "object" && o !== null && "value" in o) {
      return { value: String((o as Record<string, unknown>).value), label: String((o as Record<string, unknown>).label ?? (o as Record<string, unknown>).value) };
    }
    return { value: String(o), label: String(o) };
  });
}

function registerField(name: string, type: string, opts: Record<string, unknown>): unknown {
  if (!name) throw new Error("Field name is required");
  if (!FIELD_NAME_RE.test(name)) throw new Error(`Invalid field name "${name}": must be alphanumeric/underscore, starting with letter or underscore`);
  if (fields.some((f) => f.name === name)) throw new Error(`Duplicate field name "${name}"`);
  if (fields.length >= MAX_FIELDS) throw new Error(`Maximum ${MAX_FIELDS} fields per form`);

  const validation: ValidationRule = {};
  if (opts.validation && typeof opts.validation === "object") {
    const v = opts.validation as Record<string, unknown>;
    if (v.pattern != null) {
      const pat = String(v.pattern);
      if (pat.length > MAX_REGEX_LEN) throw new Error(`Regex pattern exceeds ${MAX_REGEX_LEN} characters`);
      try { new RegExp(pat); } catch { throw new Error(`Invalid regex pattern: ${pat}`); }
      validation.pattern = pat;
    }
    if (v.min != null) validation.min = Number(v.min);
    if (v.max != null) validation.max = Number(v.max);
    if (v.minLength != null) validation.minLength = Number(v.minLength);
    if (v.maxLength != null) validation.maxLength = Number(v.maxLength);
    if (v.message != null) validation.message = String(v.message);
  }

  // Lift top-level min/max/minLength/maxLength/pattern into validation
  if (opts.min != null && validation.min == null) validation.min = Number(opts.min);
  if (opts.max != null && validation.max == null) validation.max = Number(opts.max);
  if (opts.minLength != null && validation.minLength == null) validation.minLength = Number(opts.minLength);
  if (opts.maxLength != null && validation.maxLength == null) validation.maxLength = Number(opts.maxLength);
  if (opts.pattern != null && validation.pattern == null) {
    const pat = String(opts.pattern);
    if (pat.length > MAX_REGEX_LEN) throw new Error(`Regex pattern exceeds ${MAX_REGEX_LEN} characters`);
    try { new RegExp(pat); } catch { throw new Error(`Invalid regex pattern: ${pat}`); }
    validation.pattern = pat;
  }

  const field: FieldDef = {
    name,
    type,
    order: fields.length,
  };

  if (opts.label != null) field.label = String(opts.label);
  if (opts.description != null) field.description = String(opts.description);
  if (opts.placeholder != null) field.placeholder = String(opts.placeholder);
  if (opts.required != null) field.required = Boolean(opts.required);
  if (opts.defaultValue !== undefined) field.defaultValue = opts.defaultValue;
  if (opts.disabled != null) field.disabled = Boolean(opts.disabled);
  if (opts.accept != null) field.accept = String(opts.accept);
  if (opts.maxSize != null) field.maxSize = Number(opts.maxSize);
  if (opts.step != null) field.step = Number(opts.step);
  if (opts.min != null) field.min = type === "date" || type === "time" || type === "datetime" ? String(opts.min) : Number(opts.min);
  if (opts.max != null) field.max = type === "date" || type === "time" || type === "datetime" ? String(opts.max) : Number(opts.max);
  if (opts.group != null) field.group = String(opts.group);

  const normalizedOpts = normalizeOptions(opts.options);
  if (normalizedOpts) field.options = normalizedOpts;

  if (Object.keys(validation).length > 0) field.validation = validation;

  fields.push(field);

  // Return submitted value or default
  if (formSubmitted && submittedData.has(name)) {
    return submittedData.get(name);
  }
  return field.defaultValue ?? null;
}

function makeFieldHandler(type: string): BuiltinHandler {
  return (args) => {
    const name = String(args[0] ?? "");
    const opts = parseOpts(args[1]);
    return registerField(name, type, opts);
  };
}

// ── Validation Engine ───────────────────────────────────────────────
function validateField(field: FieldDef, value: unknown): string[] {
  const errors: string[] = [];
  const isBlank = value === null || value === undefined || value === "";

  if (field.required && isBlank) {
    errors.push(field.validation?.message ?? `${field.label ?? field.name} is required`);
    return errors;
  }

  if (isBlank) return errors;

  const v = field.validation;

  // Type-specific checks
  switch (field.type) {
    case "email": {
      const s = String(value);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) {
        errors.push(v?.message ?? `${field.label ?? field.name} must be a valid email`);
      }
      break;
    }
    case "url": {
      const s = String(value);
      try { new URL(s); } catch {
        errors.push(v?.message ?? `${field.label ?? field.name} must be a valid URL`);
      }
      break;
    }
    case "number":
    case "range": {
      const n = Number(value);
      if (isNaN(n)) {
        errors.push(v?.message ?? `${field.label ?? field.name} must be a number`);
      } else {
        if (v?.min != null && n < v.min) errors.push(v?.message ?? `${field.label ?? field.name} must be at least ${v.min}`);
        if (v?.max != null && n > v.max) errors.push(v?.message ?? `${field.label ?? field.name} must be at most ${v.max}`);
        if (field.min != null && n < Number(field.min)) errors.push(v?.message ?? `${field.label ?? field.name} must be at least ${field.min}`);
        if (field.max != null && n > Number(field.max)) errors.push(v?.message ?? `${field.label ?? field.name} must be at most ${field.max}`);
      }
      break;
    }
    case "checkbox": {
      // Boolean field — no string validations needed
      break;
    }
    case "multiselect": {
      if (!Array.isArray(value)) {
        errors.push(v?.message ?? `${field.label ?? field.name} must be an array`);
      } else if (field.options) {
        const valid = new Set(field.options.map((o) => o.value));
        for (const item of value) {
          if (!valid.has(String(item))) {
            errors.push(v?.message ?? `Invalid option "${item}" for ${field.label ?? field.name}`);
          }
        }
      }
      break;
    }
    case "select":
    case "radio": {
      if (field.options) {
        const valid = new Set(field.options.map((o) => o.value));
        if (!valid.has(String(value))) {
          errors.push(v?.message ?? `Invalid option "${value}" for ${field.label ?? field.name}`);
        }
      }
      break;
    }
    case "json": {
      if (typeof value === "string") {
        try { JSON.parse(value); } catch {
          errors.push(v?.message ?? `${field.label ?? field.name} must be valid JSON`);
        }
      }
      break;
    }
    case "file": {
      if (typeof value === "object" && value !== null) {
        const f = value as Record<string, unknown>;
        if (field.maxSize != null && typeof f.size === "number" && f.size > field.maxSize) {
          errors.push(v?.message ?? `${field.label ?? field.name} exceeds max file size of ${field.maxSize} bytes`);
        }
      }
      break;
    }
  }

  // String validations (for text-like types)
  if (typeof value === "string") {
    if (v?.minLength != null && value.length < v.minLength) {
      errors.push(v?.message ?? `${field.label ?? field.name} must be at least ${v.minLength} characters`);
    }
    if (v?.maxLength != null && value.length > v.maxLength) {
      errors.push(v?.message ?? `${field.label ?? field.name} must be at most ${v.maxLength} characters`);
    }
    if (v?.pattern) {
      if (!new RegExp(v.pattern).test(value)) {
        errors.push(v?.message ?? `${field.label ?? field.name} does not match required pattern`);
      }
    }
  }

  return errors;
}

// ── Field Type Handlers (19) ────────────────────────────────────────
const text = makeFieldHandler("text");
const textarea = makeFieldHandler("textarea");
const number = makeFieldHandler("number");
const email = makeFieldHandler("email");
const url = makeFieldHandler("url");
const phone = makeFieldHandler("phone");
const password = makeFieldHandler("password");
const select = makeFieldHandler("select");
const multiselect = makeFieldHandler("multiselect");
const checkbox = makeFieldHandler("checkbox");
const radio = makeFieldHandler("radio");
const date = makeFieldHandler("date");
const time = makeFieldHandler("time");
const datetime = makeFieldHandler("datetime");
const file = makeFieldHandler("file");
const hidden = makeFieldHandler("hidden");
const color = makeFieldHandler("color");
const range = makeFieldHandler("range");
const json = makeFieldHandler("json");

// ── Utility Handlers (8) ────────────────────────────────────────────
const config: BuiltinHandler = (args) => {
  const opts = parseOpts(args[0]);
  if (opts.title != null) formConfig.title = String(opts.title);
  if (opts.description != null) formConfig.description = String(opts.description);
  if (opts.submitLabel != null) formConfig.submitLabel = String(opts.submitLabel);
  if (opts.successMessage != null) formConfig.successMessage = String(opts.successMessage);
  if (opts.errorMessage != null) formConfig.errorMessage = String(opts.errorMessage);
  if (opts.theme != null && typeof opts.theme === "object") {
    formConfig.theme = {} as Record<string, string>;
    for (const [k, v] of Object.entries(opts.theme as Record<string, unknown>)) {
      formConfig.theme[k] = String(v);
    }
  }
  return true;
};

const getForm: BuiltinHandler = () => {
  const schema: FormSchema = {
    config: { ...formConfig },
    fields: fields.map((f) => ({ ...f })),
  };
  return schema;
};

const validate: BuiltinHandler = (args) => {
  const data = parseOpts(args[0]);
  const allErrors: Record<string, string[]> = {};
  let valid = true;

  for (const field of fields) {
    const value = data[field.name] ?? null;
    const fieldErrors = validateField(field, value);
    if (fieldErrors.length > 0) {
      allErrors[field.name] = fieldErrors;
      valid = false;
    }
  }

  return { valid, errors: valid ? {} : allErrors };
};

const setData: BuiltinHandler = (args) => {
  const data = parseOpts(args[0]);
  for (const [key, value] of Object.entries(data)) {
    submittedData.set(key, value);
  }
  formSubmitted = true;
  return true;
};

const reset: BuiltinHandler = () => {
  fields = [];
  formConfig = {};
  submittedData.clear();
  formSubmitted = false;
  return true;
};

const group: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const opts = parseOpts(args[1]);
  if (!name) throw new Error("Group name is required");

  if (!formConfig.groups) formConfig.groups = [];
  const groupFields = Array.isArray(opts.fields) ? opts.fields.map(String) : [];

  formConfig.groups.push({
    name,
    label: String(opts.label ?? name),
    description: opts.description != null ? String(opts.description) : undefined,
    fields: groupFields,
  });

  return true;
};

const step: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const opts = parseOpts(args[1]);
  if (!name) throw new Error("Step name is required");

  if (!formConfig.steps) formConfig.steps = [];
  if (formConfig.steps.length >= MAX_STEPS) throw new Error(`Maximum ${MAX_STEPS} steps per form`);

  const stepFields = Array.isArray(opts.fields) ? opts.fields.map(String) : [];

  formConfig.steps.push({
    name,
    description: opts.description != null ? String(opts.description) : undefined,
    fields: stepFields,
  });

  return true;
};

const toEmbed: BuiltinHandler = (args) => {
  const baseUrl = String(args[0] ?? "");
  if (!baseUrl) throw new Error("Base URL is required");

  const iframe = `<iframe src="${baseUrl}/form" style="width:100%;min-height:500px;border:none;" loading="lazy"></iframe>`;
  const script = `<script src="${baseUrl}/form.js" async></script>\n<robinpath-form src="${baseUrl}/form"></robinpath-form>`;
  const webComponent = `<robinpath-form src="${baseUrl}/form"></robinpath-form>`;

  return { iframe, script, webComponent };
};

// ── Exports ─────────────────────────────────────────────────────────
export const FormFunctions: Record<string, BuiltinHandler> = {
  text, textarea, number, email, url, phone, password,
  select, multiselect, checkbox, radio,
  date, time, datetime,
  file, hidden, color, range, json,
  config, getForm, validate, setData, reset, group, step, toEmbed,
};

export const FormFunctionMetadata = {
  text: { description: "Declare a text input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, placeholder, required, defaultValue, validation}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.text "name" {"label": "Full Name", "required": true}' },
  textarea: { description: "Declare a multi-line text field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, maxLength, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.textarea "bio" {"label": "Bio", "maxLength": 1000}' },
  number: { description: "Declare a number input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, min, max, step, required}", formInputType: "text", required: false }], returnType: "number", returnDescription: "Submitted value or default", example: 'form.number "age" {"label": "Age", "min": 0, "max": 120}' },
  email: { description: "Declare an email input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.email "email" {"label": "Email", "required": true}' },
  url: { description: "Declare a URL input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.url "website" {"label": "Website"}' },
  phone: { description: "Declare a phone number input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.phone "phone" {"label": "Phone Number"}' },
  password: { description: "Declare a password input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required, minLength}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.password "secret" {"label": "Password"}' },
  select: { description: "Declare a single-select dropdown field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, options, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.select "plan" {"label": "Plan", "options": ["free","pro","enterprise"]}' },
  multiselect: { description: "Declare a multi-select field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, options, required}", formInputType: "text", required: false }], returnType: "array", returnDescription: "Submitted values or default", example: 'form.multiselect "tags" {"label": "Tags", "options": ["a","b","c"]}' },
  checkbox: { description: "Declare a checkbox field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required}", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "Submitted value or default", example: 'form.checkbox "agree" {"label": "I agree to terms"}' },
  radio: { description: "Declare a radio button group", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, options, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.radio "tier" {"label": "Tier", "options": ["basic","premium"]}' },
  date: { description: "Declare a date input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, min, max, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.date "birthday" {"label": "Birthday"}' },
  time: { description: "Declare a time input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, min, max, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.time "meetingTime" {"label": "Meeting Time"}' },
  datetime: { description: "Declare a date-time input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, min, max, required}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted value or default", example: 'form.datetime "eventStart" {"label": "Event Start"}' },
  file: { description: "Declare a file upload field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, accept, maxSize, required}", formInputType: "text", required: false }], returnType: "object", returnDescription: "Submitted file object or null", example: 'form.file "resume" {"label": "Upload Resume", "accept": ".pdf,.doc"}' },
  hidden: { description: "Declare a hidden field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{defaultValue}", formInputType: "text", required: false }], returnType: "any", returnDescription: "Submitted value or default", example: 'form.hidden "source" {"defaultValue": "website"}' },
  color: { description: "Declare a color picker field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, defaultValue}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Submitted color value or default", example: 'form.color "brandColor" {"label": "Brand Color"}' },
  range: { description: "Declare a range slider field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, min, max, step, required}", formInputType: "text", required: false }], returnType: "number", returnDescription: "Submitted value or default", example: 'form.range "budget" {"label": "Budget", "min": 0, "max": 10000, "step": 100}' },
  json: { description: "Declare a JSON input field", parameters: [{ name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, required}", formInputType: "text", required: false }], returnType: "object", returnDescription: "Submitted JSON value or default", example: 'form.json "metadata" {"label": "Custom Data"}' },
  config: { description: "Set form-level configuration", parameters: [{ name: "options", dataType: "object", description: "{title, description, submitLabel, successMessage, errorMessage, theme}", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'form.config {"title": "Contact Us", "submitLabel": "Send"}' },
  getForm: { description: "Get the complete form schema with config and fields", parameters: [], returnType: "object", returnDescription: "{config, fields}", example: "form.getForm" },
  validate: { description: "Validate data against declared fields", parameters: [{ name: "data", dataType: "object", description: "Key-value pairs to validate", formInputType: "text", required: true }], returnType: "object", returnDescription: "{valid, errors}", example: 'form.validate $formData' },
  setData: { description: "Inject submitted form data so field calls return real values", parameters: [{ name: "data", dataType: "object", description: "Submitted key-value pairs", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'form.setData $submittedValues' },
  reset: { description: "Clear all fields, config, and data", parameters: [], returnType: "boolean", returnDescription: "true", example: "form.reset" },
  group: { description: "Define a visual field group", parameters: [{ name: "name", dataType: "string", description: "Group name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{label, description, fields[]}", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'form.group "personal" {"label": "Personal Info", "fields": ["name","email","phone"]}' },
  step: { description: "Define a multi-step wizard step", parameters: [{ name: "name", dataType: "string", description: "Step name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{description, fields[]}", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'form.step "Step 1" {"fields": ["name","email"]}' },
  toEmbed: { description: "Generate embed code for the form", parameters: [{ name: "baseUrl", dataType: "string", description: "Base URL for the form endpoint", formInputType: "text", required: true }], returnType: "object", returnDescription: "{iframe, script, webComponent}", example: 'form.toEmbed "https://rpshotter.example.com"' },
};

export const FormModuleMetadata = {
  description: "Declarative form builder — define fields inline in RobinPath scripts to generate form schemas, validate submissions, and embed forms anywhere",
  methods: [
    "text", "textarea", "number", "email", "url", "phone", "password",
    "select", "multiselect", "checkbox", "radio",
    "date", "time", "datetime",
    "file", "hidden", "color", "range", "json",
    "config", "getForm", "validate", "setData", "reset", "group", "step", "toEmbed",
  ],
};
