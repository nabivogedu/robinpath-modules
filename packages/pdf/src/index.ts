import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PdfFunctions, PdfFunctionMetadata, PdfModuleMetadata } from "./pdf.js";

const PdfModule: ModuleAdapter = {
  name: "pdf",
  functions: PdfFunctions,
  functionMetadata: PdfFunctionMetadata,
  moduleMetadata: PdfModuleMetadata,
  global: false,
};

export default PdfModule;
export { PdfModule };
export { PdfFunctions, PdfFunctionMetadata, PdfModuleMetadata } from "./pdf.js";
