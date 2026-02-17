import type { ModuleAdapter } from "@wiredwp/robinpath";
import { QrFunctions, QrFunctionMetadata, QrModuleMetadata } from "./qr.js";

const QrModule: ModuleAdapter = {
  name: "qr",
  functions: QrFunctions,
  functionMetadata: QrFunctionMetadata as any,
  moduleMetadata: QrModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default QrModule;
export { QrModule };
export { QrFunctions, QrFunctionMetadata, QrModuleMetadata } from "./qr.js";
