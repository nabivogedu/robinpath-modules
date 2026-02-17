import type { ModuleAdapter } from "@wiredwp/robinpath";
import { InvoiceParserFunctions, InvoiceParserFunctionMetadata, InvoiceParserModuleMetadata } from "./invoice-parser.js";

const InvoiceParserModule: ModuleAdapter = {
  name: "invoice-parser",
  functions: InvoiceParserFunctions,
  functionMetadata: InvoiceParserFunctionMetadata as any,
  moduleMetadata: InvoiceParserModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default InvoiceParserModule;
export { InvoiceParserModule };
export { InvoiceParserFunctions, InvoiceParserFunctionMetadata, InvoiceParserModuleMetadata } from "./invoice-parser.js";
