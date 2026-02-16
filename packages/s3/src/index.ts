import type { ModuleAdapter } from "@wiredwp/robinpath";
import { S3Functions, S3FunctionMetadata, S3ModuleMetadata } from "./s3.js";

const S3Module: ModuleAdapter = { name: "s3", functions: S3Functions, functionMetadata: S3FunctionMetadata, moduleMetadata: S3ModuleMetadata, global: false };

export default S3Module;
export { S3Module };
export { S3Functions, S3FunctionMetadata, S3ModuleMetadata } from "./s3.js";
