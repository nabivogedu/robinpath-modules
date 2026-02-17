import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RssFunctions, RssFunctionMetadata, RssModuleMetadata } from "./rss.js";
const RssModule: ModuleAdapter = { name: "rss", functions: RssFunctions, functionMetadata: RssFunctionMetadata as any, moduleMetadata: RssModuleMetadata as any, global: false };
export default RssModule;
export { RssModule };
export { RssFunctions, RssFunctionMetadata, RssModuleMetadata } from "./rss.js";
