import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HtmlFunctions, HtmlFunctionMetadata, HtmlModuleMetadata } from "./html.js";

const HtmlModule: ModuleAdapter = {
  name: "html",
  functions: HtmlFunctions,
  functionMetadata: HtmlFunctionMetadata as any,
  moduleMetadata: HtmlModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default HtmlModule;
export { HtmlModule };
export { HtmlFunctions, HtmlFunctionMetadata, HtmlModuleMetadata } from "./html.js";
