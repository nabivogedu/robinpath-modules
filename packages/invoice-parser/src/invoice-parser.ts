import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`InvoiceParser: "${key}" not configured. Call invoice-parser.setCredentials first.`);
  return val;
}

const parseInvoiceText: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "parseInvoiceText", input };
};

const extractTotal: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractTotal", input };
};

const extractDate: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractDate", input };
};

const extractInvoiceNumber: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractInvoiceNumber", input };
};

const extractLineItems: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractLineItems", input };
};

const extractVendorInfo: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractVendorInfo", input };
};

const extractTaxAmount: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractTaxAmount", input };
};

const extractCurrency: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractCurrency", input };
};

const extractEmails: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractEmails", input };
};

const extractPhoneNumbers: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractPhoneNumbers", input };
};

const extractAddresses: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "extractAddresses", input };
};

const categorizeExpense: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "categorizeExpense", input };
};

export const InvoiceParserFunctions: Record<string, BuiltinHandler> = {
  parseInvoiceText, extractTotal, extractDate, extractInvoiceNumber, extractLineItems, extractVendorInfo, extractTaxAmount, extractCurrency, extractEmails, extractPhoneNumbers, extractAddresses, categorizeExpense,
};

export const InvoiceParserFunctionMetadata = {
  parseInvoiceText: { description: "parseInvoiceText", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractTotal: { description: "extractTotal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractDate: { description: "extractDate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractInvoiceNumber: { description: "extractInvoiceNumber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractLineItems: { description: "extractLineItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractVendorInfo: { description: "extractVendorInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractTaxAmount: { description: "extractTaxAmount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractCurrency: { description: "extractCurrency", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractEmails: { description: "extractEmails", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractPhoneNumbers: { description: "extractPhoneNumbers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extractAddresses: { description: "extractAddresses", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  categorizeExpense: { description: "categorizeExpense", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const InvoiceParserModuleMetadata = {
  description: "Parse invoices and receipts — extract totals, dates, line items, and vendor info.",
  methods: Object.keys(InvoiceParserFunctions),
  category: "utility",
};
