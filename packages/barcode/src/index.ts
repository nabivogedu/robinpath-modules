import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BarcodeFunctions, BarcodeFunctionMetadata, BarcodeModuleMetadata } from "./barcode.js";
const BarcodeModule: ModuleAdapter = { name: "barcode", functions: BarcodeFunctions, functionMetadata: BarcodeFunctionMetadata, moduleMetadata: BarcodeModuleMetadata, global: false };
export default BarcodeModule;
export { BarcodeModule };
export { BarcodeFunctions, BarcodeFunctionMetadata, BarcodeModuleMetadata } from "./barcode.js";
