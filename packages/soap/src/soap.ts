import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function jsToXml(value: unknown, tag?: string): string {
  if (value === null || value === undefined) return tag ? `<${tag} xsi:nil="true"/>` : "";
  if (typeof value === "boolean" || typeof value === "number") return tag ? `<${tag}>${value}</${tag}>` : String(value);
  if (typeof value === "string") return tag ? `<${tag}>${escapeXml(value)}</${tag}>` : escapeXml(value);
  if (Array.isArray(value)) return value.map((v: any) => jsToXml(v, tag)).join("");
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const inner = entries.map(([k, v]) => jsToXml(v, k)).join("");
    return tag ? `<${tag}>${inner}</${tag}>` : inner;
  }
  return tag ? `<${tag}>${String(value)}</${tag}>` : String(value);
}

function xmlToJs(xml: string): any {
  const trimmed = xml.trim();
  if (!trimmed.startsWith("<")) return trimmed;
  const results: Record<string, unknown> = {};
  const tagRe = /<([a-zA-Z0-9_:.-]+)([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g;
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(trimmed)) !== null) {
    const tag = match[1]!;
    const attrs = match[2] ?? "";
    if (attrs.includes('xsi:nil="true"')) { results[tag] = null; continue; }
    const body = match[3];
    if (body === undefined || body === "") { results[tag] = ""; continue; }
    const parsed = xmlToJs(body);
    if (results[tag] !== undefined) {
      if (Array.isArray(results[tag])) (results[tag] as unknown[]).push(parsed);
      else results[tag] = [results[tag], parsed];
    } else {
      results[tag] = parsed;
    }
  }
  if (Object.keys(results).length === 0) return trimmed.replace(/<[^>]+>/g, "").trim();
  return results;
}

const buildEnvelope: BuiltinHandler = (args) => {
  const method = String(args[0] ?? "");
  const params = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const ns = args[2] ? String(args[2]) : undefined;
  const nsAttr = ns ? ` xmlns="${escapeXml(ns)}"` : "";
  const body = jsToXml(params);
  return `<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Header/><soap:Body><${method}${nsAttr}>${body}</${method}></soap:Body></soap:Envelope>`;
};

const parseEnvelope: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const bodyMatch = xml.match(/<(?:soap:|SOAP-ENV:)?Body[^>]*>([\s\S]*?)<\/(?:soap:|SOAP-ENV:)?Body>/i);
  if (!bodyMatch) return { fault: null, result: null };
  const bodyXml = bodyMatch[1]!;
  const faultMatch = bodyXml.match(/<(?:soap:|SOAP-ENV:)?Fault[^>]*>([\s\S]*?)<\/(?:soap:|SOAP-ENV:)?Fault>/i);
  if (faultMatch) {
    const fault = xmlToJs(faultMatch[1]!);
    return { fault, result: null };
  }
  return { fault: null, result: xmlToJs(bodyXml) };
};

const call: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const method = String(args[1] ?? "");
  const params = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const ns = opts.namespace ? String(opts.namespace) : undefined;
  const envelope = buildEnvelope([method, params, ns]) as string;
  const headers: Record<string, string> = { "Content-Type": "text/xml; charset=utf-8" };
  if (opts.soapAction !== undefined) headers["SOAPAction"] = String(opts.soapAction);
  else headers["SOAPAction"] = ns ? `${ns}/${method}` : method;
  if (opts.headers && typeof opts.headers === "object") Object.assign(headers, opts.headers);
  const res = await fetch(url, { method: "POST", headers, body: envelope, signal: opts.timeout ? AbortSignal.timeout(Number(opts.timeout)) : undefined });
  const text = await res.text();
  const parsed = parseEnvelope([text]) as { fault: unknown; result: unknown };
  return { status: res.status, ok: res.ok, ...parsed, raw: text };
};

const buildXmlRpc: BuiltinHandler = (args) => {
  const method = String(args[0] ?? "");
  const params = Array.isArray(args[1]) ? args[1] : [];
  function valueToXml(v: unknown): string {
    if (v === null || v === undefined) return "<value><nil/></value>";
    if (typeof v === "boolean") return `<value><boolean>${v ? 1 : 0}</boolean></value>`;
    if (typeof v === "number") return Number.isInteger(v) ? `<value><int>${v}</int></value>` : `<value><double>${v}</double></value>`;
    if (typeof v === "string") return `<value><string>${escapeXml(v)}</string></value>`;
    if (Array.isArray(v)) return `<value><array><data>${v.map(valueToXml).join("")}</data></array></value>`;
    if (typeof v === "object") {
      const members = Object.entries(v as Record<string, unknown>).map(([k, val]) => `<member><name>${escapeXml(k)}</name>${valueToXml(val)}</member>`).join("");
      return `<value><struct>${members}</struct></value>`;
    }
    return `<value><string>${escapeXml(String(v))}</string></value>`;
  }
  const paramXml = params.map((p: unknown) => `<param>${valueToXml(p)}</param>`).join("");
  return `<?xml version="1.0"?><methodCall><methodName>${escapeXml(method)}</methodName><params>${paramXml}</params></methodCall>`;
};

function parseXmlRpcValue(xml: string): any {
  const trimmed = xml.trim();
  const intM = trimmed.match(/<(?:int|i4)>(.*?)<\/(?:int|i4)>/); if (intM) return parseInt(intM[1]!, 10);
  const dblM = trimmed.match(/<double>(.*?)<\/double>/); if (dblM) return parseFloat(dblM[1]!);
  const boolM = trimmed.match(/<boolean>(.*?)<\/boolean>/); if (boolM) return boolM[1] === "1";
  const strM = trimmed.match(/<string>(.*?)<\/string>/s); if (strM) return strM[1]!;
  if (trimmed.includes("<nil")) return null;
  const arrM = trimmed.match(/<array>\s*<data>([\s\S]*?)<\/data>\s*<\/array>/);
  if (arrM) {
    const vals: unknown[] = [];
    const valRe = /<value>([\s\S]*?)<\/value>/g;
    let vm: RegExpExecArray | null;
    while ((vm = valRe.exec(arrM[1]!)) !== null) vals.push(parseXmlRpcValue(vm[1]!));
    return vals;
  }
  const structM = trimmed.match(/<struct>([\s\S]*?)<\/struct>/);
  if (structM) {
    const obj: Record<string, unknown> = {};
    const memRe = /<member>\s*<name>(.*?)<\/name>\s*<value>([\s\S]*?)<\/value>\s*<\/member>/g;
    let mm: RegExpExecArray | null;
    while ((mm = memRe.exec(structM[1]!)) !== null) obj[mm[1]!] = parseXmlRpcValue(mm[2]!);
    return obj;
  }
  return trimmed.replace(/<[^>]+>/g, "").trim();
}

const parseXmlRpc: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const faultM = xml.match(/<fault>\s*<value>([\s\S]*?)<\/value>\s*<\/fault>/);
  if (faultM) return { fault: parseXmlRpcValue(faultM[1]!), params: null };
  const params: unknown[] = [];
  const paramRe = /<param>\s*<value>([\s\S]*?)<\/value>\s*<\/param>/g;
  let pm: RegExpExecArray | null;
  while ((pm = paramRe.exec(xml)) !== null) params.push(parseXmlRpcValue(pm[1]!));
  return { fault: null, params };
};

const xmlRpc: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const method = String(args[1] ?? "");
  const params = Array.isArray(args[2]) ? args[2] : [];
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const body = buildXmlRpc([method, params]) as string;
  const headers: Record<string, string> = { "Content-Type": "text/xml; charset=utf-8" };
  if (opts.headers && typeof opts.headers === "object") Object.assign(headers, opts.headers);
  const res = await fetch(url, { method: "POST", headers, body, signal: opts.timeout ? AbortSignal.timeout(Number(opts.timeout)) : undefined });
  const text = await res.text();
  const parsed = parseXmlRpc([text]) as { fault: unknown; params: unknown };
  return { status: res.status, ok: res.ok, ...parsed, raw: text };
};

const wsdl: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const res = await fetch(url, { signal: opts.timeout ? AbortSignal.timeout(Number(opts.timeout)) : undefined });
  const text = await res.text();
  const services: string[] = [];
  const svcRe = /<wsdl:service[^>]*name="([^"]+)"/g;
  let sm: RegExpExecArray | null;
  while ((sm = svcRe.exec(text)) !== null) services.push(sm[1]!);
  const operations: string[] = [];
  const opRe = /<wsdl:operation[^>]*name="([^"]+)"/g;
  let om: RegExpExecArray | null;
  while ((om = opRe.exec(text)) !== null) if (!operations.includes(om[1]!)) operations.push(om[1]!);
  const bindings: string[] = [];
  const bRe = /<wsdl:binding[^>]*name="([^"]+)"/g;
  let bm: RegExpExecArray | null;
  while ((bm = bRe.exec(text)) !== null) bindings.push(bm[1]!);
  return { services, operations, bindings, raw: text };
};

const fault: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "Server");
  const message = String(args[1] ?? "Internal Error");
  const detail = args[2] ? String(args[2]) : undefined;
  return `<soap:Fault><faultcode>${escapeXml(code)}</faultcode><faultstring>${escapeXml(message)}</faultstring>${detail ? `<detail>${escapeXml(detail)}</detail>` : ""}</soap:Fault>`;
};

const getFault: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const faultM = xml.match(/<(?:soap:|SOAP-ENV:)?Fault[^>]*>([\s\S]*?)<\/(?:soap:|SOAP-ENV:)?Fault>/i);
  if (!faultM) return null;
  const code = faultM[1]!.match(/<faultcode[^>]*>(.*?)<\/faultcode>/i)?.[1] ?? null;
  const message = faultM[1]!.match(/<faultstring[^>]*>(.*?)<\/faultstring>/i)?.[1] ?? null;
  const detail = faultM[1]!.match(/<detail[^>]*>([\s\S]*?)<\/detail>/i)?.[1] ?? null;
  return { code, message, detail };
};

export const SoapFunctions: Record<string, BuiltinHandler> = { call, buildEnvelope, parseEnvelope, xmlRpc, buildXmlRpc, parseXmlRpc, wsdl, fault, getFault };

export const SoapFunctionMetadata = {
  call: { description: "Call a SOAP web service", parameters: [{ name: "url", dataType: "string", description: "Service URL", formInputType: "text", required: true }, { name: "method", dataType: "string", description: "Method name", formInputType: "text", required: true }, { name: "params", dataType: "object", description: "Parameters", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{namespace, soapAction, headers, timeout}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{status, ok, fault, result, raw}", example: 'soap.call "http://example.com/ws" "GetUser" {"id": 1} {"namespace": "http://example.com"}' },
  buildEnvelope: { description: "Build SOAP XML envelope", parameters: [{ name: "method", dataType: "string", description: "Method name", formInputType: "text", required: true }, { name: "params", dataType: "object", description: "Parameters", formInputType: "text", required: false }, { name: "namespace", dataType: "string", description: "XML namespace", formInputType: "text", required: false }], returnType: "string", returnDescription: "SOAP XML", example: 'soap.buildEnvelope "GetUser" {"id": 1}' },
  parseEnvelope: { description: "Parse SOAP XML response", parameters: [{ name: "xml", dataType: "string", description: "SOAP XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{fault, result}", example: 'soap.parseEnvelope $xml' },
  xmlRpc: { description: "Call XML-RPC service", parameters: [{ name: "url", dataType: "string", description: "Service URL", formInputType: "text", required: true }, { name: "method", dataType: "string", description: "Method name", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "Parameters array", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{headers, timeout}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{status, ok, fault, params, raw}", example: 'soap.xmlRpc "http://example.com/rpc" "system.listMethods" []' },
  buildXmlRpc: { description: "Build XML-RPC request", parameters: [{ name: "method", dataType: "string", description: "Method name", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "Parameters", formInputType: "text", required: false }], returnType: "string", returnDescription: "XML-RPC XML", example: 'soap.buildXmlRpc "getUser" [1, "admin"]' },
  parseXmlRpc: { description: "Parse XML-RPC response", parameters: [{ name: "xml", dataType: "string", description: "XML-RPC XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{fault, params}", example: 'soap.parseXmlRpc $xml' },
  wsdl: { description: "Fetch and parse WSDL", parameters: [{ name: "url", dataType: "string", description: "WSDL URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{timeout}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{services, operations, bindings, raw}", example: 'soap.wsdl "http://example.com/ws?wsdl"' },
  fault: { description: "Create SOAP fault XML", parameters: [{ name: "code", dataType: "string", description: "Fault code", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Fault message", formInputType: "text", required: true }, { name: "detail", dataType: "string", description: "Detail", formInputType: "text", required: false }], returnType: "string", returnDescription: "Fault XML", example: 'soap.fault "Client" "Invalid request"' },
  getFault: { description: "Extract fault from SOAP XML", parameters: [{ name: "xml", dataType: "string", description: "SOAP XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{code, message, detail} or null", example: 'soap.getFault $xml' },
};

export const SoapModuleMetadata = {
  description: "SOAP web service client, XML-RPC support, WSDL parsing, and envelope building",
  methods: ["call", "buildEnvelope", "parseEnvelope", "xmlRpc", "buildXmlRpc", "parseXmlRpc", "wsdl", "fault", "getFault"],
};
