import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HtmlFunctions, HtmlFunctionMetadata, HtmlModuleMetadata } from "./html.js";

const HtmlModule: ModuleAdapter = {
  name: "html",
  functions: HtmlFunctions,
  functionMetadata: HtmlFunctionMetadata,
  moduleMetadata: HtmlModuleMetadata,
  global: false,
};

export default HtmlModule;
export { HtmlModule };
export { HtmlFunctions, HtmlFunctionMetadata, HtmlModuleMetadata } from "./html.js";
