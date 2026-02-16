import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FeedFunctions, FeedFunctionMetadata, FeedModuleMetadata } from "./feed.js";
const FeedModule: ModuleAdapter = { name: "feed", functions: FeedFunctions, functionMetadata: FeedFunctionMetadata, moduleMetadata: FeedModuleMetadata, global: false };
export default FeedModule;
export { FeedModule };
export { FeedFunctions, FeedFunctionMetadata, FeedModuleMetadata } from "./feed.js";
