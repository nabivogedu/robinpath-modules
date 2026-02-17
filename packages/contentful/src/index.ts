import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ContentfulFunctions, ContentfulFunctionMetadata, ContentfulModuleMetadata } from "./contentful.js";

const ContentfulModule: ModuleAdapter = {
  name: "contentful",
  functions: ContentfulFunctions,
  functionMetadata: ContentfulFunctionMetadata as any,
  moduleMetadata: ContentfulModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ContentfulModule;
export { ContentfulModule };
export { ContentfulFunctions, ContentfulFunctionMetadata, ContentfulModuleMetadata } from "./contentful.js";
