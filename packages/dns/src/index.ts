import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DnsFunctions, DnsFunctionMetadata, DnsModuleMetadata } from "./dns.js";
const DnsModule: ModuleAdapter = { name: "dns", functions: DnsFunctions, functionMetadata: DnsFunctionMetadata as any, moduleMetadata: DnsModuleMetadata as any, global: false };
export default DnsModule;
export { DnsModule };
export { DnsFunctions, DnsFunctionMetadata, DnsModuleMetadata } from "./dns.js";
