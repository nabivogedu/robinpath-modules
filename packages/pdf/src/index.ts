import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PdfFunctions, PdfFunctionMetadata, PdfModuleMetadata } from "./pdf.js";

const PdfModule: ModuleAdapter = {
  name: "pdf",
  functions: PdfFunctions,
  functionMetadata: PdfFunctionMetadata as any,
  moduleMetadata: PdfModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default PdfModule;
export { PdfModule };
export { PdfFunctions, PdfFunctionMetadata, PdfModuleMetadata } from "./pdf.js";
