import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ImageFunctions, ImageFunctionMetadata, ImageModuleMetadata } from "./image.js";
const ImageModule: ModuleAdapter = { name: "image", functions: ImageFunctions, functionMetadata: ImageFunctionMetadata, moduleMetadata: ImageModuleMetadata, global: false };
export default ImageModule;
export { ImageModule };
export { ImageFunctions, ImageFunctionMetadata, ImageModuleMetadata } from "./image.js";
