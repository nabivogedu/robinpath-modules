import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GeoFunctions, GeoFunctionMetadata, GeoModuleMetadata } from "./geo.js";
const GeoModule: ModuleAdapter = { name: "geo", functions: GeoFunctions, functionMetadata: GeoFunctionMetadata as any, moduleMetadata: GeoModuleMetadata as any, global: false };
export default GeoModule;
export { GeoModule };
export { GeoFunctions, GeoFunctionMetadata, GeoModuleMetadata } from "./geo.js";
