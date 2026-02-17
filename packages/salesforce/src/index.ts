import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SalesforceFunctions, SalesforceFunctionMetadata, SalesforceModuleMetadata } from "./salesforce.js";

const SalesforceModule: ModuleAdapter = {
  name: "salesforce",
  functions: SalesforceFunctions,
  functionMetadata: SalesforceFunctionMetadata as any,
  moduleMetadata: SalesforceModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SalesforceModule;
export { SalesforceModule };
export { SalesforceFunctions, SalesforceFunctionMetadata, SalesforceModuleMetadata } from "./salesforce.js";
