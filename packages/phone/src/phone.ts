import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const countryData: Record<string, { code: string; dialCode: string; name: string; format: string; lengths: number[] }> = {
  US: { code: "US", dialCode: "1", name: "United States", format: "(XXX) XXX-XXXX", lengths: [10] },
  CA: { code: "CA", dialCode: "1", name: "Canada", format: "(XXX) XXX-XXXX", lengths: [10] },
  GB: { code: "GB", dialCode: "44", name: "United Kingdom", format: "XXXX XXX XXXX", lengths: [10, 11] },
  DE: { code: "DE", dialCode: "49", name: "Germany", format: "XXXX XXXXXXX", lengths: [10, 11] },
  FR: { code: "FR", dialCode: "33", name: "France", format: "XX XX XX XX XX", lengths: [10] },
  JP: { code: "JP", dialCode: "81", name: "Japan", format: "XXX-XXXX-XXXX", lengths: [10, 11] },
  CN: { code: "CN", dialCode: "86", name: "China", format: "XXX XXXX XXXX", lengths: [11] },
  IN: { code: "IN", dialCode: "91", name: "India", format: "XXXXX XXXXX", lengths: [10] },
  BR: { code: "BR", dialCode: "55", name: "Brazil", format: "(XX) XXXXX-XXXX", lengths: [10, 11] },
  AU: { code: "AU", dialCode: "61", name: "Australia", format: "XXXX XXX XXX", lengths: [9] },
  RU: { code: "RU", dialCode: "7", name: "Russia", format: "(XXX) XXX-XX-XX", lengths: [10] },
  MX: { code: "MX", dialCode: "52", name: "Mexico", format: "XXX XXX XXXX", lengths: [10] },
  KR: { code: "KR", dialCode: "82", name: "South Korea", format: "XXX-XXXX-XXXX", lengths: [10, 11] },
  IT: { code: "IT", dialCode: "39", name: "Italy", format: "XXX XXX XXXX", lengths: [9, 10] },
  ES: { code: "ES", dialCode: "34", name: "Spain", format: "XXX XX XX XX", lengths: [9] },
  NL: { code: "NL", dialCode: "31", name: "Netherlands", format: "XX XXXXXXXX", lengths: [9] },
  SE: { code: "SE", dialCode: "46", name: "Sweden", format: "XXX-XXX XX XX", lengths: [9, 10] },
  NO: { code: "NO", dialCode: "47", name: "Norway", format: "XXX XX XXX", lengths: [8] },
  DK: { code: "DK", dialCode: "45", name: "Denmark", format: "XX XX XX XX", lengths: [8] },
  PL: { code: "PL", dialCode: "48", name: "Poland", format: "XXX XXX XXX", lengths: [9] },
  CH: { code: "CH", dialCode: "41", name: "Switzerland", format: "XXX XXX XX XX", lengths: [9] },
  AT: { code: "AT", dialCode: "43", name: "Austria", format: "XXXX XXXXXX", lengths: [10, 11] },
  PT: { code: "PT", dialCode: "351", name: "Portugal", format: "XXX XXX XXX", lengths: [9] },
  IL: { code: "IL", dialCode: "972", name: "Israel", format: "XXX-XXXXXXX", lengths: [9, 10] },
  SG: { code: "SG", dialCode: "65", name: "Singapore", format: "XXXX XXXX", lengths: [8] },
  NZ: { code: "NZ", dialCode: "64", name: "New Zealand", format: "XXX XXX XXXX", lengths: [9, 10] },
};

const dialCodeToCountry = new Map<string, string>();
for (const [code, data] of Object.entries(countryData)) {
  if (!dialCodeToCountry.has(data.dialCode) || code === "US") dialCodeToCountry.set(data.dialCode, code);
}

const parse: BuiltinHandler = (args) => {
  const phone = String(args[0] ?? "");
  const defaultCountry = String(args[1] ?? "US").toUpperCase();
  let digits = phone.replace(/\D/g, "");
  let detectedCountry = defaultCountry;
  let dialCode = countryData[defaultCountry]?.dialCode ?? "1";

  if (phone.startsWith("+")) {
    for (const len of [3, 2, 1]) {
      const prefix = digits.substring(0, len);
      const country = dialCodeToCountry.get(prefix);
      if (country) { detectedCountry = country; dialCode = prefix; digits = digits.substring(len); break; }
    }
  } else if (digits.startsWith(dialCode) && digits.length > (countryData[defaultCountry]?.lengths[0] ?? 10)) {
    digits = digits.substring(dialCode.length);
  }

  const info = countryData[detectedCountry];
  const isValid = info ? info.lengths.includes(digits.length) : digits.length >= 7 && digits.length <= 15;

  return { countryCode: detectedCountry, dialCode, nationalNumber: digits, e164: `+${dialCode}${digits}`, isValid };
};

const format: BuiltinHandler = (args) => {
  const parsed = parse(args) as { nationalNumber: string; countryCode: string };
  const info = countryData[String(args[1] ?? "US").toUpperCase()];
  if (!info) return parsed.nationalNumber;
  let result = info.format;
  let idx = 0;
  return result.replace(/X/g, () => parsed.nationalNumber[idx++] ?? "");
};

const formatE164: BuiltinHandler = (args) => {
  const parsed = parse(args) as { e164: string };
  return parsed.e164;
};

const formatInternational: BuiltinHandler = (args) => {
  const parsed = parse(args) as { dialCode: string; nationalNumber: string; countryCode: string };
  const formatted = format(args) as string;
  return `+${parsed.dialCode} ${formatted}`;
};

const validate: BuiltinHandler = (args) => {
  const parsed = parse(args) as { isValid: boolean };
  return parsed.isValid;
};

const getCountry: BuiltinHandler = (args) => {
  const phone = String(args[0] ?? "");
  if (!phone.startsWith("+")) return null;
  const digits = phone.replace(/\D/g, "");
  for (const len of [3, 2, 1]) {
    const prefix = digits.substring(0, len);
    const country = dialCodeToCountry.get(prefix);
    if (country) return country;
  }
  return null;
};

const getType: BuiltinHandler = (args) => {
  const parsed = parse(args) as { nationalNumber: string; countryCode: string };
  const first = parsed.nationalNumber[0];
  if (parsed.countryCode === "US" || parsed.countryCode === "CA") {
    return ["2", "3", "4", "5", "6", "7", "8", "9"].includes(first ?? "") ? "mobile" : "unknown";
  }
  if (["6", "7", "8", "9"].includes(first ?? "")) return "mobile";
  return "unknown";
};

const normalize: BuiltinHandler = (args) => String(args[0] ?? "").replace(/\D/g, "");

const mask: BuiltinHandler = (args) => {
  const phone = String(args[0] ?? "");
  const visible = Number(args[1] ?? 4);
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= visible) return digits;
  return "*".repeat(digits.length - visible) + digits.slice(-visible);
};

const dialCode: BuiltinHandler = (args) => countryData[String(args[0] ?? "US").toUpperCase()]?.dialCode ?? null;
const countryInfo: BuiltinHandler = (args) => countryData[String(args[0] ?? "US").toUpperCase()] ?? null;
const listCountries: BuiltinHandler = () => Object.keys(countryData).sort();
const compare: BuiltinHandler = (args) => {
  const country = String(args[2] ?? "US");
  const a = parse([args[0], country]) as { e164: string };
  const b = parse([args[1], country]) as { e164: string };
  return a.e164 === b.e164;
};

export const PhoneFunctions: Record<string, BuiltinHandler> = { parse, format, formatE164, formatInternational, validate, getCountry, getType, normalize, mask, dialCode, countryInfo, listCountries, compare };

export const PhoneFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: { description: "Parse phone number", parameters: [{ name: "phone", dataType: "string", description: "Phone number", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Default country code", formInputType: "text", required: false }], returnType: "object", returnDescription: "{countryCode, dialCode, nationalNumber, e164, isValid}", example: 'phone.parse "+15551234567"' },
  format: { description: "Format phone in national format", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Country code", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted string", example: 'phone.format "5551234567" "US"' },
  formatE164: { description: "Format to E.164", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Country code", formInputType: "text", required: false }], returnType: "string", returnDescription: "E.164 string", example: 'phone.formatE164 "5551234567"' },
  formatInternational: { description: "Format as international", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Country code", formInputType: "text", required: false }], returnType: "string", returnDescription: "International format", example: 'phone.formatInternational "5551234567"' },
  validate: { description: "Validate phone number", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Country code", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if valid", example: 'phone.validate "+15551234567"' },
  getCountry: { description: "Detect country from phone", parameters: [{ name: "phone", dataType: "string", description: "Phone with + prefix", formInputType: "text", required: true }], returnType: "string", returnDescription: "Country code or null", example: 'phone.getCountry "+44123456789"' },
  getType: { description: "Guess phone type", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Country", formInputType: "text", required: false }], returnType: "string", returnDescription: "mobile|landline|unknown", example: 'phone.getType "5551234567"' },
  normalize: { description: "Strip non-digits", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }], returnType: "string", returnDescription: "Digits only", example: 'phone.normalize "(555) 123-4567"' },
  mask: { description: "Mask phone for display", parameters: [{ name: "phone", dataType: "string", description: "Phone", formInputType: "text", required: true }, { name: "visibleDigits", dataType: "number", description: "Visible digits (default 4)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Masked string", example: 'phone.mask "5551234567"' },
  dialCode: { description: "Get dial code for country", parameters: [{ name: "country", dataType: "string", description: "Country code", formInputType: "text", required: true }], returnType: "string", returnDescription: "Dial code", example: 'phone.dialCode "GB"' },
  countryInfo: { description: "Get country phone info", parameters: [{ name: "country", dataType: "string", description: "Country code", formInputType: "text", required: true }], returnType: "object", returnDescription: "Country info", example: 'phone.countryInfo "US"' },
  listCountries: { description: "List supported countries", parameters: [], returnType: "array", returnDescription: "Country codes", example: "phone.listCountries" },
  compare: { description: "Compare two phone numbers", parameters: [{ name: "phone1", dataType: "string", description: "First phone", formInputType: "text", required: true }, { name: "phone2", dataType: "string", description: "Second phone", formInputType: "text", required: true }, { name: "country", dataType: "string", description: "Default country", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if same", example: 'phone.compare "(555) 123-4567" "+15551234567"' },
};

export const PhoneModuleMetadata: ModuleMetadata = {
  description: "Phone number parsing, formatting, validation, country detection, and comparison",
  methods: ["parse", "format", "formatE164", "formatInternational", "validate", "getCountry", "getType", "normalize", "mask", "dialCode", "countryInfo", "listCountries", "compare"],
};
