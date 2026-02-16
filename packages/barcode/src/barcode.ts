import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import QRCode from "qrcode";

const qrGenerate: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  return await QRCode.toDataURL(text, opts as QRCode.QRCodeToDataURLOptions);
};

const qrToFile: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  const filePath = String(args[1] ?? "qr.png");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  await QRCode.toFile(filePath, text, opts as QRCode.QRCodeToFileOptions);
  return filePath;
};

const qrToSvg: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  return await QRCode.toString(text, { ...opts, type: "svg" } as QRCode.QRCodeToStringOptions);
};

const qrToTerminal: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  return await QRCode.toString(text, { type: "terminal" } as QRCode.QRCodeToStringOptions);
};

function ean13Check(digits: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(digits[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10;
}

const ean13Validate: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "").replace(/\D/g, "");
  if (code.length !== 13) return false;
  return ean13Check(code) === Number(code[12]);
};

const ean13Checksum: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "").replace(/\D/g, "");
  if (code.length < 12) return null;
  return String(ean13Check(code));
};

const upcValidate: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "").replace(/\D/g, "");
  if (code.length !== 12) return false;
  return ean13Check("0" + code) === Number(code[11]);
};

const upcChecksum: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "").replace(/\D/g, "");
  if (code.length < 11) return null;
  return String(ean13Check("0" + code));
};

const isbn10Validate: BuiltinHandler = (args) => {
  const isbn = String(args[0] ?? "").replace(/[-\s]/g, "");
  if (isbn.length !== 10) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const c = isbn[i]!;
    const val = c === "X" || c === "x" ? 10 : Number(c);
    if (isNaN(val)) return false;
    sum += val * (10 - i);
  }
  return sum % 11 === 0;
};

const isbn13Validate: BuiltinHandler = (args) => ean13Validate(args);

const isbn10to13: BuiltinHandler = (args) => {
  const isbn = String(args[0] ?? "").replace(/[-\s]/g, "");
  if (isbn.length !== 10) return null;
  const base = "978" + isbn.substring(0, 9);
  return base + String(ean13Check(base));
};

const isbn13to10: BuiltinHandler = (args) => {
  const isbn = String(args[0] ?? "").replace(/[-\s]/g, "");
  if (isbn.length !== 13 || !isbn.startsWith("978")) return null;
  const base = isbn.substring(3, 12);
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(base[i]) * (10 - i);
  const check = (11 - (sum % 11)) % 11;
  return base + (check === 10 ? "X" : String(check));
};

const luhn: BuiltinHandler = (args) => {
  const num = String(args[0] ?? "").replace(/\D/g, "");
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const luhnGenerate: BuiltinHandler = (args) => {
  const num = String(args[0] ?? "").replace(/\D/g, "");
  for (let d = 0; d <= 9; d++) {
    if (luhn([num + String(d)]) === true) return num + String(d);
  }
  return num + "0";
};

export const BarcodeFunctions: Record<string, BuiltinHandler> = { qrGenerate, qrToFile, qrToSvg, qrToTerminal, ean13Validate, ean13Checksum, upcValidate, upcChecksum, isbn10Validate, isbn13Validate, isbn10to13, isbn13to10, luhn, luhnGenerate };

export const BarcodeFunctionMetadata: Record<string, FunctionMetadata> = {
  qrGenerate: { description: "Generate QR code as data URL", parameters: [{ name: "text", dataType: "string", description: "Text to encode", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{width, margin, color, errorCorrectionLevel}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Data URL (base64 PNG)", example: 'barcode.qrGenerate "https://example.com"' },
  qrToFile: { description: "Generate QR code to file", parameters: [{ name: "text", dataType: "string", description: "Text", formInputType: "text", required: true }, { name: "filePath", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "QR options", formInputType: "text", required: false }], returnType: "string", returnDescription: "File path", example: 'barcode.qrToFile "https://example.com" "./qr.png"' },
  qrToSvg: { description: "Generate QR code as SVG", parameters: [{ name: "text", dataType: "string", description: "Text", formInputType: "text", required: true }], returnType: "string", returnDescription: "SVG string", example: 'barcode.qrToSvg "hello"' },
  qrToTerminal: { description: "Generate QR for terminal", parameters: [{ name: "text", dataType: "string", description: "Text", formInputType: "text", required: true }], returnType: "string", returnDescription: "Terminal string", example: 'barcode.qrToTerminal "hello"' },
  ean13Validate: { description: "Validate EAN-13 barcode", parameters: [{ name: "code", dataType: "string", description: "13-digit code", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'barcode.ean13Validate "4006381333931"' },
  ean13Checksum: { description: "Calculate EAN-13 check digit", parameters: [{ name: "code", dataType: "string", description: "12-digit code", formInputType: "text", required: true }], returnType: "string", returnDescription: "Check digit", example: 'barcode.ean13Checksum "400638133393"' },
  upcValidate: { description: "Validate UPC-A barcode", parameters: [{ name: "code", dataType: "string", description: "12-digit code", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'barcode.upcValidate "012345678905"' },
  upcChecksum: { description: "Calculate UPC-A check digit", parameters: [{ name: "code", dataType: "string", description: "11-digit code", formInputType: "text", required: true }], returnType: "string", returnDescription: "Check digit", example: 'barcode.upcChecksum "01234567890"' },
  isbn10Validate: { description: "Validate ISBN-10", parameters: [{ name: "isbn", dataType: "string", description: "ISBN-10", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'barcode.isbn10Validate "0-306-40615-2"' },
  isbn13Validate: { description: "Validate ISBN-13", parameters: [{ name: "isbn", dataType: "string", description: "ISBN-13", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'barcode.isbn13Validate "978-0-306-40615-7"' },
  isbn10to13: { description: "Convert ISBN-10 to ISBN-13", parameters: [{ name: "isbn10", dataType: "string", description: "ISBN-10", formInputType: "text", required: true }], returnType: "string", returnDescription: "ISBN-13", example: 'barcode.isbn10to13 "0306406152"' },
  isbn13to10: { description: "Convert ISBN-13 to ISBN-10", parameters: [{ name: "isbn13", dataType: "string", description: "ISBN-13", formInputType: "text", required: true }], returnType: "string", returnDescription: "ISBN-10 or null", example: 'barcode.isbn13to10 "9780306406157"' },
  luhn: { description: "Validate Luhn checksum", parameters: [{ name: "number", dataType: "string", description: "Number string", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'barcode.luhn "4539578763621486"' },
  luhnGenerate: { description: "Generate Luhn check digit", parameters: [{ name: "number", dataType: "string", description: "Number without check digit", formInputType: "text", required: true }], returnType: "string", returnDescription: "Number with check digit", example: 'barcode.luhnGenerate "453957876362148"' },
};

export const BarcodeModuleMetadata: ModuleMetadata = {
  description: "QR code generation, EAN/UPC barcode validation, ISBN conversion, and Luhn checksum",
  methods: ["qrGenerate", "qrToFile", "qrToSvg", "qrToTerminal", "ean13Validate", "ean13Checksum", "upcValidate", "upcChecksum", "isbn10Validate", "isbn13Validate", "isbn10to13", "isbn13to10", "luhn", "luhnGenerate"],
};
