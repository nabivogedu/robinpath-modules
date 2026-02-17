import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SupabaseFunctions, SupabaseFunctionMetadata, SupabaseModuleMetadata } from "./supabase.js";

const SupabaseModule: ModuleAdapter = {
  name: "supabase",
  functions: SupabaseFunctions,
  functionMetadata: SupabaseFunctionMetadata as any,
  moduleMetadata: SupabaseModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SupabaseModule;
export { SupabaseModule };
export { SupabaseFunctions, SupabaseFunctionMetadata, SupabaseModuleMetadata } from "./supabase.js";
