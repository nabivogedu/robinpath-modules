import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Function Handlers ──────────────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const u = new URL(urlString);
  return {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
    origin: u.origin,
    href: u.href,
  };
};

const format: BuiltinHandler = (args) => {
  const parts = args[0] as Record<string, unknown> | undefined;
  if (!parts || typeof parts !== "object") {
    throw new Error("format requires an object argument with URL components");
  }
  const protocol = String(parts.protocol ?? "https:");
  const hostname = String(parts.hostname ?? "");
  const port = parts.port != null && parts.port !== "" ? String(parts.port) : "";
  const pathname = String(parts.pathname ?? "/");
  const search = String(parts.search ?? "");
  const hash = String(parts.hash ?? "");

  const normalizedProtocol = protocol.endsWith(":") ? protocol : protocol + ":";
  const host = port ? `${hostname}:${port}` : hostname;
  const normalizedSearch = search && !search.startsWith("?") ? "?" + search : search;
  const normalizedHash = hash && !hash.startsWith("#") ? "#" + hash : hash;

  return `${normalizedProtocol}//${host}${pathname}${normalizedSearch}${normalizedHash}`;
};

const resolve: BuiltinHandler = (args) => {
  const base = String(args[0] ?? "");
  const relative = String(args[1] ?? "");
  return new URL(relative, base).href;
};

const getParam: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const paramName = String(args[1] ?? "");
  const u = new URL(urlString);
  return u.searchParams.get(paramName);
};

const setParam: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const paramName = String(args[1] ?? "");
  const value = String(args[2] ?? "");
  const u = new URL(urlString);
  u.searchParams.set(paramName, value);
  return u.href;
};

const removeParam: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const paramName = String(args[1] ?? "");
  const u = new URL(urlString);
  u.searchParams.delete(paramName);
  return u.href;
};

const getParams: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const u = new URL(urlString);
  const result: Record<string, string> = {};
  u.searchParams.forEach((value: any, key: any) => {
    result[key] = value;
  });
  return result;
};

const setParams: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  const params = args[1] as Record<string, unknown> | undefined;
  const u = new URL(urlString);
  if (params && typeof params === "object") {
    for (const [key, value] of Object.entries(params)) {
      u.searchParams.set(key, String(value ?? ""));
    }
  }
  return u.href;
};

const getHostname: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  return new URL(urlString).hostname;
};

const getPathname: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  return new URL(urlString).pathname;
};

const getProtocol: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  return new URL(urlString).protocol;
};

const isValid: BuiltinHandler = (args) => {
  const urlString = String(args[0] ?? "");
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

const encode: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return encodeURIComponent(str);
};

const decode: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return decodeURIComponent(str);
};

// ── Exports ────────────────────────────────────────────────────────

export const UrlFunctions: Record<string, BuiltinHandler> = {
  parse,
  format,
  resolve,
  getParam,
  setParam,
  removeParam,
  getParams,
  setParams,
  getHostname,
  getPathname,
  getProtocol,
  isValid,
  encode,
  decode,
};

export const UrlFunctionMetadata = {
  parse: {
    description: "Parse a URL string into its component parts",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string to parse",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object with protocol, hostname, port, pathname, search, hash, origin, and href",
    example: 'url.parse "https://example.com:8080/path?q=1#frag"',
  },
  format: {
    description: "Format URL component parts into a URL string",
    parameters: [
      {
        name: "parts",
        dataType: "object",
        description: "An object with protocol, hostname, port, pathname, search, and hash properties",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The formatted URL string",
    example: 'url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }',
  },
  resolve: {
    description: "Resolve a relative URL against a base URL",
    parameters: [
      {
        name: "base",
        dataType: "string",
        description: "The base URL",
        formInputType: "text",
        required: true,
      },
      {
        name: "relative",
        dataType: "string",
        description: "The relative URL to resolve",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The resolved absolute URL string",
    example: 'url.resolve "https://example.com/a/b" "../c"',
  },
  getParam: {
    description: "Get the value of a single query parameter from a URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
      {
        name: "paramName",
        dataType: "string",
        description: "The name of the query parameter to retrieve",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The value of the query parameter, or null if not found",
    example: 'url.getParam "https://example.com?foo=bar" "foo"',
  },
  setParam: {
    description: "Set a query parameter on a URL, replacing any existing value",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
      {
        name: "paramName",
        dataType: "string",
        description: "The name of the query parameter to set",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "string",
        description: "The value to set for the query parameter",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The URL string with the parameter set",
    example: 'url.setParam "https://example.com" "page" "2"',
  },
  removeParam: {
    description: "Remove a query parameter from a URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
      {
        name: "paramName",
        dataType: "string",
        description: "The name of the query parameter to remove",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The URL string without the specified parameter",
    example: 'url.removeParam "https://example.com?foo=bar&baz=1" "foo"',
  },
  getParams: {
    description: "Get all query parameters from a URL as a plain object",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object containing all query parameter key-value pairs",
    example: 'url.getParams "https://example.com?foo=bar&baz=1"',
  },
  setParams: {
    description: "Set multiple query parameters on a URL at once",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
      {
        name: "params",
        dataType: "object",
        description: "An object of key-value pairs to set as query parameters",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The URL string with all specified parameters set",
    example: 'url.setParams "https://example.com" { page: "2", limit: "10" }',
  },
  getHostname: {
    description: "Extract the hostname from a URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The hostname portion of the URL",
    example: 'url.getHostname "https://example.com:8080/path"',
  },
  getPathname: {
    description: "Extract the pathname from a URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The pathname portion of the URL",
    example: 'url.getPathname "https://example.com/a/b/c"',
  },
  getProtocol: {
    description: "Extract the protocol from a URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The URL string",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The protocol of the URL including the trailing colon (e.g. \"https:\")",
    example: 'url.getProtocol "https://example.com"',
  },
  isValid: {
    description: "Check whether a string is a valid URL",
    parameters: [
      {
        name: "urlString",
        dataType: "string",
        description: "The string to validate as a URL",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the string is a valid URL, false otherwise",
    example: 'url.isValid "https://example.com"',
  },
  encode: {
    description: "Encode a string for safe use in a URL component",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The string to encode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The URI-encoded string",
    example: 'url.encode "hello world&foo=bar"',
  },
  decode: {
    description: "Decode a URI-encoded string",
    parameters: [
      {
        name: "value",
        dataType: "string",
        description: "The URI-encoded string to decode",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The decoded string",
    example: 'url.decode "hello%20world%26foo%3Dbar"',
  },
};

export const UrlModuleMetadata = {
  description: "URL parsing, formatting, and query parameter manipulation utilities using the built-in URL API",
  methods: [
    "parse",
    "format",
    "resolve",
    "getParam",
    "setParam",
    "removeParam",
    "getParams",
    "setParams",
    "getHostname",
    "getPathname",
    "getProtocol",
    "isValid",
    "encode",
    "decode",
  ],
};
