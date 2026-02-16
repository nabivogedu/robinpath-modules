import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RedisFunctions, RedisFunctionMetadata, RedisModuleMetadata } from "./redis.js";
const RedisModule: ModuleAdapter = { name: "redis", functions: RedisFunctions, functionMetadata: RedisFunctionMetadata, moduleMetadata: RedisModuleMetadata, global: false };
export default RedisModule;
export { RedisModule };
export { RedisFunctions, RedisFunctionMetadata, RedisModuleMetadata } from "./redis.js";
