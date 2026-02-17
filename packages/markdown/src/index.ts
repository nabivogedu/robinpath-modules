import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MarkdownFunctions, MarkdownFunctionMetadata, MarkdownModuleMetadata } from "./markdown.js";

const MarkdownModule: ModuleAdapter = {
  name: "markdown",
  functions: MarkdownFunctions,
  functionMetadata: MarkdownFunctionMetadata as any,
  moduleMetadata: MarkdownModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default MarkdownModule;
export { MarkdownModule };
export { MarkdownFunctions, MarkdownFunctionMetadata, MarkdownModuleMetadata } from "./markdown.js";
