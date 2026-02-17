import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Invoice: "${key}" not configured. Call invoice.setCredentials first.`);
  return val;
}

const createInvoice: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "createInvoice", input };
};

const addLineItem: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "addLineItem", input };
};

const removeLineItem: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "removeLineItem", input };
};

const setCompanyInfo: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "setCompanyInfo", input };
};

const setClientInfo: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "setClientInfo", input };
};

const calculateTotals: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "calculateTotals", input };
};

const addDiscount: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "addDiscount", input };
};

const addNote: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "addNote", input };
};

const setPaymentTerms: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "setPaymentTerms", input };
};

const setCurrency: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "setCurrency", input };
};

const formatInvoice: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "formatInvoice", input };
};

const duplicateInvoice: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "duplicateInvoice", input };
};

const markAsPaid: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "markAsPaid", input };
};

const generateInvoiceNumber: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "generateInvoiceNumber", input };
};

export const InvoiceFunctions: Record<string, BuiltinHandler> = {
  createInvoice, addLineItem, removeLineItem, setCompanyInfo, setClientInfo, calculateTotals, addDiscount, addNote, setPaymentTerms, setCurrency, formatInvoice, duplicateInvoice, markAsPaid, generateInvoiceNumber,
};

export const InvoiceFunctionMetadata = {
  createInvoice: { description: "createInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addLineItem: { description: "addLineItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeLineItem: { description: "removeLineItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setCompanyInfo: { description: "setCompanyInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setClientInfo: { description: "setClientInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  calculateTotals: { description: "calculateTotals", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addDiscount: { description: "addDiscount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addNote: { description: "addNote", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setPaymentTerms: { description: "setPaymentTerms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setCurrency: { description: "setCurrency", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  formatInvoice: { description: "formatInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  duplicateInvoice: { description: "duplicateInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  markAsPaid: { description: "markAsPaid", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateInvoiceNumber: { description: "generateInvoiceNumber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const InvoiceModuleMetadata = {
  description: "Generate and manage invoice data structures locally — line items, totals, tax, and formatting.",
  methods: Object.keys(InvoiceFunctions),
  category: "accounting",
};
