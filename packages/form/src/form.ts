import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, statSync } from "node:fs";
import { basename } from "node:path";

const create: BuiltinHandler = (args) => {
  const data = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(key, String(value));
  }
  return form;
};

const addField: BuiltinHandler = (args) => {
  const form = args[0] as FormData;
  const name = String(args[1] ?? "");
  const value = String(args[2] ?? "");
  if (!(form instanceof FormData)) throw new Error("First argument must be a FormData object");
  form.append(name, value);
  return form;
};

const addFile: BuiltinHandler = (args) => {
  const form = args[0] as FormData;
  const fieldName = String(args[1] ?? "file");
  const filePath = String(args[2] ?? "");
  const fileName = String(args[3] ?? basename(filePath));

  if (!(form instanceof FormData)) throw new Error("First argument must be a FormData object");

  const content = readFileSync(filePath);
  const blob = new Blob([content]);
  form.append(fieldName, blob, fileName);
  return form;
};

const submit: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const form = args[1] as FormData;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!url) throw new Error("URL is required");

  const headers: Record<string, string> = {};
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) headers[k] = String(v);
  }

  const method = String(opts.method ?? "POST").toUpperCase();
  const body = form instanceof FormData ? form : (() => {
    const f = new FormData();
    if (typeof form === "object" && form !== null) {
      for (const [k, v] of Object.entries(form as Record<string, unknown>)) f.append(k, String(v));
    }
    return f;
  })();

  const response = await fetch(url, { method, headers, body });
  const contentType = response.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("json") ? await response.json() : await response.text();

  return { status: response.status, ok: response.ok, body: responseBody };
};

const encode: BuiltinHandler = (args) => {
  const data = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v));
    } else {
      params.append(key, String(value ?? ""));
    }
  }
  return params.toString();
};

const decode: BuiltinHandler = (args) => {
  const body = String(args[0] ?? "");
  const params = new URLSearchParams(body);
  const result: Record<string, string | string[]> = {};
  for (const key of params.keys()) {
    const values = params.getAll(key);
    result[key] = values.length === 1 ? values[0]! : values;
  }
  return result;
};

const uploadFile: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const fieldName = String(opts.fieldName ?? "file");
  const fileName = String(opts.fileName ?? basename(filePath));
  const headers: Record<string, string> = {};
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) headers[k] = String(v);
  }

  const content = readFileSync(filePath);
  const form = new FormData();
  form.append(fieldName, new Blob([content]), fileName);

  // Add extra fields
  if (typeof opts.fields === "object" && opts.fields !== null) {
    for (const [k, v] of Object.entries(opts.fields as Record<string, unknown>)) form.append(k, String(v));
  }

  const response = await fetch(url, { method: "POST", headers, body: form });
  const contentType = response.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("json") ? await response.json() : await response.text();

  return { status: response.status, ok: response.ok, body: responseBody, fileName, size: statSync(filePath).size };
};

const parseMultipart: BuiltinHandler = (args) => {
  const body = String(args[0] ?? "");
  const boundary = String(args[1] ?? "");
  if (!boundary) throw new Error("Boundary is required");

  const parts: { name: string; filename?: string; contentType?: string; value: string }[] = [];
  const segments = body.split(`--${boundary}`);

  for (const segment of segments) {
    if (segment.trim() === "" || segment.trim() === "--") continue;
    const headerEnd = segment.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;
    const headerStr = segment.substring(0, headerEnd);
    const value = segment.substring(headerEnd + 4).replace(/\r\n$/, "");

    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const fileMatch = headerStr.match(/filename="([^"]+)"/);
    const ctMatch = headerStr.match(/Content-Type:\s*(.+)/i);

    if (nameMatch) {
      parts.push({ name: nameMatch[1]!, filename: fileMatch?.[1], contentType: ctMatch?.[1]?.trim(), value });
    }
  }

  return parts;
};

export const FormFunctions: Record<string, BuiltinHandler> = { create, addField, addFile, submit, encode, decode, uploadFile, parseMultipart };

export const FormFunctionMetadata: Record<string, FunctionMetadata> = {
  create: { description: "Create a FormData object from key-value pairs", parameters: [{ name: "data", dataType: "object", description: "Key-value pairs", formInputType: "text", required: false }], returnType: "object", returnDescription: "FormData object", example: 'form.create {"name": "Alice", "email": "alice@example.com"}' },
  addField: { description: "Add a text field to a FormData", parameters: [{ name: "form", dataType: "object", description: "FormData", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "value", dataType: "string", description: "Field value", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated FormData", example: 'form.addField $form "name" "Alice"' },
  addFile: { description: "Add a file to a FormData", parameters: [{ name: "form", dataType: "object", description: "FormData", formInputType: "text", required: true }, { name: "fieldName", dataType: "string", description: "Form field name", formInputType: "text", required: true }, { name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "fileName", dataType: "string", description: "Override filename", formInputType: "text", required: false }], returnType: "object", returnDescription: "Updated FormData", example: 'form.addFile $form "avatar" "./photo.jpg"' },
  submit: { description: "Submit a FormData to a URL", parameters: [{ name: "url", dataType: "string", description: "Target URL", formInputType: "text", required: true }, { name: "form", dataType: "object", description: "FormData or key-value object", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{method, headers}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{status, ok, body}", example: 'form.submit "https://api.example.com/upload" $form' },
  encode: { description: "URL-encode an object as application/x-www-form-urlencoded", parameters: [{ name: "data", dataType: "object", description: "Key-value pairs", formInputType: "text", required: true }], returnType: "string", returnDescription: "URL-encoded string", example: 'form.encode {"name": "Alice", "age": "30"}' },
  decode: { description: "Decode a URL-encoded form body", parameters: [{ name: "body", dataType: "string", description: "URL-encoded string", formInputType: "text", required: true }], returnType: "object", returnDescription: "Decoded key-value pairs", example: 'form.decode "name=Alice&age=30"' },
  uploadFile: { description: "Upload a file to a URL as multipart form", parameters: [{ name: "url", dataType: "string", description: "Upload URL", formInputType: "text", required: true }, { name: "filePath", dataType: "string", description: "Local file path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{fieldName, fileName, headers, fields}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{status, ok, body, fileName, size}", example: 'form.uploadFile "https://api.example.com/upload" "./report.pdf"' },
  parseMultipart: { description: "Parse a multipart form body", parameters: [{ name: "body", dataType: "string", description: "Raw multipart body", formInputType: "text", required: true }, { name: "boundary", dataType: "string", description: "Multipart boundary string", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {name, filename, contentType, value}", example: 'form.parseMultipart $rawBody $boundary' },
};

export const FormModuleMetadata: ModuleMetadata = {
  description: "Multipart form data builder, file uploads, URL encoding/decoding, and form submission",
  methods: ["create", "addField", "addFile", "submit", "encode", "decode", "uploadFile", "parseMultipart"],
};
