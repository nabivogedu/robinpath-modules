import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FeedFunctions, FeedFunctionMetadata, FeedModuleMetadata } from "./feed.js";
const FeedModule: ModuleAdapter = { name: "feed", functions: FeedFunctions, functionMetadata: FeedFunctionMetadata as any, moduleMetadata: FeedModuleMetadata as any, global: false };
export default FeedModule;
export { FeedModule };
export { FeedFunctions, FeedFunctionMetadata, FeedModuleMetadata } from "./feed.js";
