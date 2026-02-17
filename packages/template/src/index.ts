import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TemplateFunctions, TemplateFunctionMetadata, TemplateModuleMetadata } from "./template.js";

const TemplateModule: ModuleAdapter = {
  name: "template",
  functions: TemplateFunctions,
  functionMetadata: TemplateFunctionMetadata as any,
  moduleMetadata: TemplateModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TemplateModule;
export { TemplateModule };
export { TemplateFunctions, TemplateFunctionMetadata, TemplateModuleMetadata } from "./template.js";
