import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AirtableFunctions, AirtableFunctionMetadata, AirtableModuleMetadata } from "./airtable.js";

const AirtableModule: ModuleAdapter = {
  name: "airtable",
  functions: AirtableFunctions,
  functionMetadata: AirtableFunctionMetadata as any,
  moduleMetadata: AirtableModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AirtableModule;
export { AirtableModule };
export { AirtableFunctions, AirtableFunctionMetadata, AirtableModuleMetadata } from "./airtable.js";
