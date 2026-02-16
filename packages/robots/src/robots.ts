import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

interface RobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

interface RobotsFile {
  rules: RobotsRule[];
  sitemaps: string[];
  host?: string;
}

const parse: BuiltinHandler = (args) => {
  const text = String(args[0] ?? "");
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let host: string | undefined;
  let current: RobotsRule | null = null;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx < 0) continue;
    const key = line.substring(0, colonIdx).trim().toLowerCase();
    const value = line.substring(colonIdx + 1).trim();
    if (key === "user-agent") {
      current = { userAgent: value, allow: [], disallow: [] };
      rules.push(current);
    } else if (key === "allow" && current) {
      current.allow.push(value);
    } else if (key === "disallow" && current) {
      current.disallow.push(value);
    } else if (key === "crawl-delay" && current) {
      current.crawlDelay = parseFloat(value);
    } else if (key === "sitemap") {
      sitemaps.push(value);
    } else if (key === "host") {
      host = value;
    }
  }
  return { rules, sitemaps, host } satisfies RobotsFile as unknown as RobotsFile;
};

const create: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Partial<RobotsFile>;
  const lines: string[] = [];
  const rules = config.rules ?? [];
  for (const rule of rules) {
    lines.push(`User-agent: ${rule.userAgent}`);
    for (const d of rule.disallow ?? []) lines.push(`Disallow: ${d}`);
    for (const a of rule.allow ?? []) lines.push(`Allow: ${a}`);
    if (rule.crawlDelay !== undefined) lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    lines.push("");
  }
  for (const s of config.sitemaps ?? []) lines.push(`Sitemap: ${s}`);
  if (config.host) lines.push(`Host: ${config.host}`);
  return lines.join("\n").trim();
};

function pathMatches(pattern: string, path: string): boolean {
  if (!pattern) return false;
  let re = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  if (re.endsWith("$")) re = re;
  else re = re + ".*";
  return new RegExp("^" + re).test(path);
}

const isAllowed: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const url = String(args[1] ?? "/");
  const agent = String(args[2] ?? "*").toLowerCase();
  const path = url.startsWith("http") ? new URL(url).pathname : url;
  const applicableRules = robotsTxt.rules.filter((r) => r.userAgent === "*" || r.userAgent.toLowerCase() === agent);
  if (applicableRules.length === 0) return true;
  let bestMatch = "";
  let allowed = true;
  for (const rule of applicableRules) {
    for (const pattern of rule.allow) {
      if (pathMatches(pattern, path) && pattern.length > bestMatch.length) { bestMatch = pattern; allowed = true; }
    }
    for (const pattern of rule.disallow) {
      if (pathMatches(pattern, path) && pattern.length > bestMatch.length) { bestMatch = pattern; allowed = false; }
    }
  }
  return allowed;
};

const isDisallowed: BuiltinHandler = (args) => !isAllowed(args);

const getCrawlDelay: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const agent = String(args[1] ?? "*").toLowerCase();
  for (const rule of robotsTxt.rules) {
    if (rule.userAgent.toLowerCase() === agent && rule.crawlDelay !== undefined) return rule.crawlDelay;
  }
  for (const rule of robotsTxt.rules) {
    if (rule.userAgent === "*" && rule.crawlDelay !== undefined) return rule.crawlDelay;
  }
  return null;
};

const getSitemaps: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  return robotsTxt.sitemaps;
};

const getRules: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const agent = args[1] ? String(args[1]).toLowerCase() : undefined;
  if (!agent) return robotsTxt.rules;
  return robotsTxt.rules.filter((r) => r.userAgent === "*" || r.userAgent.toLowerCase() === agent);
};

const addRule: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const rule = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Partial<RobotsRule>;
  const newRule: RobotsRule = { userAgent: rule.userAgent ?? "*", allow: rule.allow ?? [], disallow: rule.disallow ?? [], crawlDelay: rule.crawlDelay };
  return { ...robotsTxt, rules: [...robotsTxt.rules, newRule] };
};

const removeRule: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const agent = String(args[1] ?? "*").toLowerCase();
  return { ...robotsTxt, rules: robotsTxt.rules.filter((r) => r.userAgent.toLowerCase() !== agent) };
};

const addSitemap: BuiltinHandler = (args) => {
  const robotsTxt = (typeof args[0] === "object" && args[0] !== null ? args[0] : parse([String(args[0] ?? "")])) as RobotsFile;
  const url = String(args[1] ?? "");
  if (robotsTxt.sitemaps.includes(url)) return robotsTxt;
  return { ...robotsTxt, sitemaps: [...robotsTxt.sitemaps, url] };
};

const allowAll: BuiltinHandler = (args) => {
  const agent = String(args[0] ?? "*");
  return create([{ rules: [{ userAgent: agent, allow: ["/"], disallow: [] }], sitemaps: [] }]);
};

const disallowAll: BuiltinHandler = (args) => {
  const agent = String(args[0] ?? "*");
  return create([{ rules: [{ userAgent: agent, allow: [], disallow: ["/"] }], sitemaps: [] }]);
};

const fetchRobots: BuiltinHandler = async (args) => {
  const baseUrl = String(args[0] ?? "").replace(/\/+$/, "");
  const url = baseUrl.includes("robots.txt") ? baseUrl : `${baseUrl}/robots.txt`;
  const res = await fetch(url);
  if (!res.ok) return { found: false, status: res.status, parsed: null, raw: "" };
  const text = await res.text();
  return { found: true, status: res.status, parsed: parse([text]), raw: text };
};

export const RobotsFunctions: Record<string, BuiltinHandler> = { parse, create, isAllowed, isDisallowed, getCrawlDelay, getSitemaps, getRules, addRule, removeRule, addSitemap, allowAll, disallowAll, fetch: fetchRobots };

export const RobotsFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: { description: "Parse robots.txt content", parameters: [{ name: "text", dataType: "string", description: "robots.txt content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{rules[], sitemaps[], host}", example: 'robots.parse $text' },
  create: { description: "Generate robots.txt", parameters: [{ name: "config", dataType: "object", description: "{rules[], sitemaps[], host}", formInputType: "text", required: true }], returnType: "string", returnDescription: "robots.txt content", example: 'robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}' },
  isAllowed: { description: "Check if URL is allowed", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots or raw text", formInputType: "text", required: true }, { name: "url", dataType: "string", description: "URL or path", formInputType: "text", required: true }, { name: "userAgent", dataType: "string", description: "Bot name (default *)", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if allowed", example: 'robots.isAllowed $robots "/page" "Googlebot"' },
  isDisallowed: { description: "Check if URL is disallowed", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots or raw text", formInputType: "text", required: true }, { name: "url", dataType: "string", description: "URL or path", formInputType: "text", required: true }, { name: "userAgent", dataType: "string", description: "Bot name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if disallowed", example: 'robots.isDisallowed $robots "/admin"' },
  getCrawlDelay: { description: "Get crawl delay for agent", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }, { name: "userAgent", dataType: "string", description: "Bot name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Delay in seconds or null", example: 'robots.getCrawlDelay $robots "Googlebot"' },
  getSitemaps: { description: "Get sitemap URLs", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }], returnType: "array", returnDescription: "Sitemap URLs", example: 'robots.getSitemaps $robots' },
  getRules: { description: "Get rules for agent", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }, { name: "userAgent", dataType: "string", description: "Bot name (all if omitted)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Matching rules", example: 'robots.getRules $robots "Googlebot"' },
  addRule: { description: "Add rule to robots config", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }, { name: "rule", dataType: "object", description: "{userAgent, allow[], disallow[], crawlDelay}", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated config", example: 'robots.addRule $robots {"userAgent": "BadBot", "disallow": ["/"]}' },
  removeRule: { description: "Remove rule by user agent", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }, { name: "userAgent", dataType: "string", description: "Bot name", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated config", example: 'robots.removeRule $robots "BadBot"' },
  addSitemap: { description: "Add sitemap URL", parameters: [{ name: "robots", dataType: "object", description: "Parsed robots", formInputType: "text", required: true }, { name: "url", dataType: "string", description: "Sitemap URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated config", example: 'robots.addSitemap $robots "https://example.com/sitemap.xml"' },
  allowAll: { description: "Generate allow-all robots.txt", parameters: [{ name: "userAgent", dataType: "string", description: "Bot name (default *)", formInputType: "text", required: false }], returnType: "string", returnDescription: "robots.txt", example: 'robots.allowAll' },
  disallowAll: { description: "Generate disallow-all robots.txt", parameters: [{ name: "userAgent", dataType: "string", description: "Bot name (default *)", formInputType: "text", required: false }], returnType: "string", returnDescription: "robots.txt", example: 'robots.disallowAll' },
  fetch: { description: "Fetch and parse robots.txt from URL", parameters: [{ name: "url", dataType: "string", description: "Site URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "{found, status, parsed, raw}", example: 'robots.fetch "https://example.com"' },
};

export const RobotsModuleMetadata: ModuleMetadata = {
  description: "robots.txt parsing, generation, URL permission checking, and crawl configuration",
  methods: ["parse", "create", "isAllowed", "isDisallowed", "getCrawlDelay", "getSitemaps", "getRules", "addRule", "removeRule", "addSitemap", "allowAll", "disallowAll", "fetch"],
};
