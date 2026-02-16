import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { promises as dns } from "node:dns";

const resolve: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  const rrtype = String(args[1] ?? "A");
  return await dns.resolve(hostname, rrtype as "A");
};

const resolve4: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolve4(hostname);
};

const resolve6: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolve6(hostname);
};

const reverse: BuiltinHandler = async (args) => {
  const ip = String(args[0] ?? "");
  return await dns.reverse(ip);
};

const lookup: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const family = Number(opts.family ?? 0);
  const result = await dns.lookup(hostname, { family: family as 0 | 4 | 6 });
  return { address: result.address, family: result.family };
};

const mx: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  const records = await dns.resolveMx(hostname);
  return records.sort((a, b) => a.priority - b.priority);
};

const txt: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolveTxt(hostname);
};

const ns: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolveNs(hostname);
};

const srv: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolveSrv(hostname);
};

const soa: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolveSoa(hostname);
};

const cname: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  return await dns.resolveCname(hostname);
};

const isResolvable: BuiltinHandler = async (args) => {
  const hostname = String(args[0] ?? "");
  try { await dns.resolve4(hostname); return true; } catch { return false; }
};

export const DnsFunctions: Record<string, BuiltinHandler> = { resolve, resolve4, resolve6, reverse, lookup, mx, txt, ns, srv, soa, cname, isResolvable };

export const DnsFunctionMetadata: Record<string, FunctionMetadata> = {
  resolve: { description: "Resolve hostname to records by type", parameters: [{ name: "hostname", dataType: "string", description: "Hostname to resolve", formInputType: "text", required: true }, { name: "rrtype", dataType: "string", description: "Record type: A|AAAA|MX|TXT|SRV|NS|CNAME|SOA|PTR", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of DNS records", example: 'dns.resolve "example.com" "A"' },
  resolve4: { description: "Resolve hostname to IPv4 addresses", parameters: [{ name: "hostname", dataType: "string", description: "Hostname", formInputType: "text", required: true }], returnType: "array", returnDescription: "IPv4 addresses", example: 'dns.resolve4 "example.com"' },
  resolve6: { description: "Resolve hostname to IPv6 addresses", parameters: [{ name: "hostname", dataType: "string", description: "Hostname", formInputType: "text", required: true }], returnType: "array", returnDescription: "IPv6 addresses", example: 'dns.resolve6 "example.com"' },
  reverse: { description: "Reverse DNS lookup", parameters: [{ name: "ip", dataType: "string", description: "IP address", formInputType: "text", required: true }], returnType: "array", returnDescription: "Hostnames", example: 'dns.reverse "8.8.8.8"' },
  lookup: { description: "OS-level DNS lookup", parameters: [{ name: "hostname", dataType: "string", description: "Hostname", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{family: 4|6|0}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{address, family}", example: 'dns.lookup "example.com"' },
  mx: { description: "Get MX records sorted by priority", parameters: [{ name: "hostname", dataType: "string", description: "Domain", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {priority, exchange}", example: 'dns.mx "example.com"' },
  txt: { description: "Get TXT records", parameters: [{ name: "hostname", dataType: "string", description: "Domain", formInputType: "text", required: true }], returnType: "array", returnDescription: "TXT record arrays", example: 'dns.txt "example.com"' },
  ns: { description: "Get nameserver records", parameters: [{ name: "hostname", dataType: "string", description: "Domain", formInputType: "text", required: true }], returnType: "array", returnDescription: "Nameserver hostnames", example: 'dns.ns "example.com"' },
  srv: { description: "Get SRV records", parameters: [{ name: "hostname", dataType: "string", description: "Service hostname", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {priority, weight, port, name}", example: 'dns.srv "_http._tcp.example.com"' },
  soa: { description: "Get SOA record", parameters: [{ name: "hostname", dataType: "string", description: "Domain", formInputType: "text", required: true }], returnType: "object", returnDescription: "{nsname, hostmaster, serial, refresh, retry, expire, minttl}", example: 'dns.soa "example.com"' },
  cname: { description: "Get CNAME records", parameters: [{ name: "hostname", dataType: "string", description: "Hostname", formInputType: "text", required: true }], returnType: "array", returnDescription: "Canonical names", example: 'dns.cname "www.example.com"' },
  isResolvable: { description: "Check if hostname resolves", parameters: [{ name: "hostname", dataType: "string", description: "Hostname", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if resolvable", example: 'dns.isResolvable "example.com"' },
};

export const DnsModuleMetadata: ModuleMetadata = {
  description: "DNS lookups: resolve, reverse, MX, TXT, NS, SRV, SOA, CNAME records",
  methods: ["resolve", "resolve4", "resolve6", "reverse", "lookup", "mx", "txt", "ns", "srv", "soa", "cname", "isResolvable"],
};
