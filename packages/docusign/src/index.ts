import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DocusignFunctions, DocusignFunctionMetadata, DocusignModuleMetadata } from "./docusign.js";

const DocusignModule: ModuleAdapter = {
  name: "docusign",
  functions: DocusignFunctions,
  functionMetadata: DocusignFunctionMetadata as any,
  moduleMetadata: DocusignModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DocusignModule;
export { DocusignModule };
export { DocusignFunctions, DocusignFunctionMetadata, DocusignModuleMetadata } from "./docusign.js";
