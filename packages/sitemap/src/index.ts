import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SitemapFunctions, SitemapFunctionMetadata, SitemapModuleMetadata } from "./sitemap.js";
const SitemapModule: ModuleAdapter = { name: "sitemap", functions: SitemapFunctions, functionMetadata: SitemapFunctionMetadata as any, moduleMetadata: SitemapModuleMetadata as any, global: false };
export default SitemapModule;
export { SitemapModule };
export { SitemapFunctions, SitemapFunctionMetadata, SitemapModuleMetadata } from "./sitemap.js";
