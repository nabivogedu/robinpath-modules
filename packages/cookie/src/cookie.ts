import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { createHmac } from "node:crypto";

interface Cookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

const parse: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const cookies: Record<string, string> = {};
  for (const pair of header.split(";")) {
    const eq = pair.indexOf("=");
    if (eq < 0) continue;
    const name = pair.substring(0, eq).trim();
    const value = pair.substring(eq + 1).trim();
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
};

const serialize: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const value = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (opts.domain) cookie += `; Domain=${opts.domain}`;
  if (opts.path) cookie += `; Path=${opts.path}`;
  if (opts.expires) cookie += `; Expires=${new Date(String(opts.expires)).toUTCString()}`;
  if (opts.maxAge !== undefined) cookie += `; Max-Age=${Number(opts.maxAge)}`;
  if (opts.secure) cookie += "; Secure";
  if (opts.httpOnly) cookie += "; HttpOnly";
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
  return cookie;
};

const sign: BuiltinHandler = (args) => {
  const value = String(args[0] ?? "");
  const secret = String(args[1] ?? "");
  const sig = createHmac("sha256", secret).update(value).digest("base64url");
  return `${value}.${sig}`;
};

const unsign: BuiltinHandler = (args) => {
  const signed = String(args[0] ?? "");
  const secret = String(args[1] ?? "");
  const lastDot = signed.lastIndexOf(".");
  if (lastDot < 0) return null;
  const value = signed.substring(0, lastDot);
  const sig = signed.substring(lastDot + 1);
  const expected = createHmac("sha256", secret).update(value).digest("base64url");
  if (sig !== expected) return null;
  return value;
};

const get: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const cookies = parse([header]) as Record<string, string>;
  return cookies[name] ?? null;
};

const remove: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  return serialize([name, "", { ...opts, maxAge: 0, expires: "Thu, 01 Jan 1970 00:00:00 GMT" }]);
};

const parseSetCookie: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const parts = header.split(";").map((s: any) => s.trim());
  if (parts.length === 0) return null;
  const first = parts[0]!;
  const eq = first.indexOf("=");
  if (eq < 0) return null;
  const cookie: Cookie = { name: decodeURIComponent(first.substring(0, eq).trim()), value: decodeURIComponent(first.substring(eq + 1).trim()) };
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]!;
    const peq = part.indexOf("=");
    const key = (peq >= 0 ? part.substring(0, peq) : part).trim().toLowerCase();
    const val = peq >= 0 ? part.substring(peq + 1).trim() : "";
    if (key === "domain") cookie.domain = val;
    else if (key === "path") cookie.path = val;
    else if (key === "expires") cookie.expires = val;
    else if (key === "max-age") cookie.maxAge = parseInt(val, 10);
    else if (key === "secure") cookie.secure = true;
    else if (key === "httponly") cookie.httpOnly = true;
    else if (key === "samesite") cookie.sameSite = val as Cookie["sameSite"];
  }
  return cookie;
};

const isExpired: BuiltinHandler = (args) => {
  const cookie = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Cookie;
  if (cookie.maxAge !== undefined && cookie.maxAge <= 0) return true;
  if (cookie.expires) return new Date(cookie.expires).getTime() < Date.now();
  return false;
};

const jar: BuiltinHandler = () => ({ cookies: {} as Record<string, Cookie>, add(name: string, cookie: Cookie) { (this as { cookies: Record<string, Cookie> }).cookies[name] = cookie; }, toHeader() { return Object.entries((this as { cookies: Record<string, Cookie> }).cookies).map(([n, c]) => `${encodeURIComponent(n)}=${encodeURIComponent(c.value)}`).join("; "); } });

const toHeader: BuiltinHandler = (args) => {
  const cookies = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, string>;
  return Object.entries(cookies).map(([n, v]) => `${encodeURIComponent(n)}=${encodeURIComponent(v)}`).join("; ");
};

const encode: BuiltinHandler = (args) => encodeURIComponent(String(args[0] ?? ""));
const decode: BuiltinHandler = (args) => decodeURIComponent(String(args[0] ?? ""));

export const CookieFunctions: Record<string, BuiltinHandler> = { parse, serialize, sign, unsign, get, remove, parseSetCookie, isExpired, jar, toHeader, encode, decode };

export const CookieFunctionMetadata = {
  parse: { description: "Parse Cookie header string", parameters: [{ name: "header", dataType: "string", description: "Cookie header value", formInputType: "text", required: true }], returnType: "object", returnDescription: "Name-value pairs", example: 'cookie.parse "session=abc; theme=dark"' },
  serialize: { description: "Serialize Set-Cookie header", parameters: [{ name: "name", dataType: "string", description: "Cookie name", formInputType: "text", required: true }, { name: "value", dataType: "string", description: "Cookie value", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{domain, path, expires, maxAge, secure, httpOnly, sameSite}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Set-Cookie header value", example: 'cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}' },
  sign: { description: "Sign cookie value with HMAC", parameters: [{ name: "value", dataType: "string", description: "Value to sign", formInputType: "text", required: true }, { name: "secret", dataType: "string", description: "Signing secret", formInputType: "text", required: true }], returnType: "string", returnDescription: "Signed value", example: 'cookie.sign "userId=123" "my-secret"' },
  unsign: { description: "Verify and unsign cookie", parameters: [{ name: "signed", dataType: "string", description: "Signed value", formInputType: "text", required: true }, { name: "secret", dataType: "string", description: "Signing secret", formInputType: "text", required: true }], returnType: "string", returnDescription: "Original value or null", example: 'cookie.unsign $signed "my-secret"' },
  get: { description: "Get single cookie from header", parameters: [{ name: "header", dataType: "string", description: "Cookie header", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Cookie name", formInputType: "text", required: true }], returnType: "string", returnDescription: "Value or null", example: 'cookie.get $header "session"' },
  remove: { description: "Generate removal Set-Cookie", parameters: [{ name: "name", dataType: "string", description: "Cookie name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{domain, path}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Set-Cookie header", example: 'cookie.remove "session"' },
  parseSetCookie: { description: "Parse Set-Cookie header", parameters: [{ name: "header", dataType: "string", description: "Set-Cookie header", formInputType: "text", required: true }], returnType: "object", returnDescription: "Cookie object with attributes", example: 'cookie.parseSetCookie "session=abc; HttpOnly; Max-Age=3600"' },
  isExpired: { description: "Check if cookie is expired", parameters: [{ name: "cookie", dataType: "object", description: "Cookie object", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if expired", example: 'cookie.isExpired $cookie' },
  jar: { description: "Create cookie jar", parameters: [], returnType: "object", returnDescription: "Cookie jar object", example: 'cookie.jar' },
  toHeader: { description: "Build Cookie header from pairs", parameters: [{ name: "cookies", dataType: "object", description: "Name-value pairs", formInputType: "text", required: true }], returnType: "string", returnDescription: "Cookie header string", example: 'cookie.toHeader {"session": "abc", "theme": "dark"}' },
  encode: { description: "URL-encode cookie value", parameters: [{ name: "value", dataType: "string", description: "Value", formInputType: "text", required: true }], returnType: "string", returnDescription: "Encoded value", example: 'cookie.encode "hello world"' },
  decode: { description: "URL-decode cookie value", parameters: [{ name: "value", dataType: "string", description: "Encoded value", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decoded value", example: 'cookie.decode "hello%20world"' },
};

export const CookieModuleMetadata = {
  description: "HTTP cookie parsing, serialization, signing/verification, Set-Cookie handling, and cookie jar management",
  methods: ["parse", "serialize", "sign", "unsign", "get", "remove", "parseSetCookie", "isExpired", "jar", "toHeader", "encode", "decode"],
};
