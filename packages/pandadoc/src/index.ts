import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PandadocFunctions, PandadocFunctionMetadata, PandadocModuleMetadata } from "./pandadoc.js";

const PandadocModule: ModuleAdapter = {
  name: "pandadoc",
  functions: PandadocFunctions,
  functionMetadata: PandadocFunctionMetadata as any,
  moduleMetadata: PandadocModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default PandadocModule;
export { PandadocModule };
export { PandadocFunctions, PandadocFunctionMetadata, PandadocModuleMetadata } from "./pandadoc.js";
