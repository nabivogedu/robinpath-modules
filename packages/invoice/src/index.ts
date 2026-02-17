import type { ModuleAdapter } from "@wiredwp/robinpath";
import { InvoiceFunctions, InvoiceFunctionMetadata, InvoiceModuleMetadata } from "./invoice.js";

const InvoiceModule: ModuleAdapter = {
  name: "invoice",
  functions: InvoiceFunctions,
  functionMetadata: InvoiceFunctionMetadata as any,
  moduleMetadata: InvoiceModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default InvoiceModule;
export { InvoiceModule };
export { InvoiceFunctions, InvoiceFunctionMetadata, InvoiceModuleMetadata } from "./invoice.js";
