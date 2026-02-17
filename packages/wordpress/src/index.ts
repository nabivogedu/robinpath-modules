import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WordpressFunctions, WordpressFunctionMetadata, WordpressModuleMetadata } from "./wordpress.js";

const WordpressModule: ModuleAdapter = {
  name: "wordpress",
  functions: WordpressFunctions,
  functionMetadata: WordpressFunctionMetadata as any,
  moduleMetadata: WordpressModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WordpressModule;
export { WordpressModule };
export { WordpressFunctions, WordpressFunctionMetadata, WordpressModuleMetadata } from "./wordpress.js";
