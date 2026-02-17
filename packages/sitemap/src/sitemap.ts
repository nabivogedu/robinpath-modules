import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  images?: { loc: string; title?: string; caption?: string }[];
  videos?: { contentLoc: string; title?: string; description?: string; thumbnailLoc?: string }[];
  alternates?: { hreflang: string; href: string }[];
}

const create: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const hasImages = urls.some((u: any) => u.images?.length);
  const hasVideos = urls.some((u: any) => u.videos?.length);
  const hasAlternates = urls.some((u: any) => u.alternates?.length);
  let nsExtra = "";
  if (hasImages) nsExtra += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  if (hasVideos) nsExtra += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';
  if (hasAlternates) nsExtra += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
  const lines = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${nsExtra}>`];
  for (const u of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(u.loc)}</loc>`);
    if (u.lastmod) lines.push(`    <lastmod>${escapeXml(u.lastmod)}</lastmod>`);
    if (u.changefreq) lines.push(`    <changefreq>${escapeXml(u.changefreq)}</changefreq>`);
    if (u.priority !== undefined) lines.push(`    <priority>${u.priority}</priority>`);
    if (u.images) for (const img of u.images) {
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${escapeXml(img.loc)}</image:loc>`);
      if (img.title) lines.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
      if (img.caption) lines.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`);
      lines.push("    </image:image>");
    }
    if (u.videos) for (const vid of u.videos) {
      lines.push("    <video:video>");
      lines.push(`      <video:content_loc>${escapeXml(vid.contentLoc)}</video:content_loc>`);
      if (vid.title) lines.push(`      <video:title>${escapeXml(vid.title)}</video:title>`);
      if (vid.description) lines.push(`      <video:description>${escapeXml(vid.description)}</video:description>`);
      if (vid.thumbnailLoc) lines.push(`      <video:thumbnail_loc>${escapeXml(vid.thumbnailLoc)}</video:thumbnail_loc>`);
      lines.push("    </video:video>");
    }
    if (u.alternates) for (const alt of u.alternates) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`);
    }
    lines.push("  </url>");
  }
  lines.push("</urlset>");
  return (opts.pretty === false) ? lines.join("") : lines.join("\n");
};

const createIndex: BuiltinHandler = (args) => {
  const sitemaps = (Array.isArray(args[0]) ? args[0] : []) as { loc: string; lastmod?: string }[];
  const lines = [`<?xml version="1.0" encoding="UTF-8"?>`, `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`];
  for (const s of sitemaps) {
    lines.push("  <sitemap>");
    lines.push(`    <loc>${escapeXml(s.loc)}</loc>`);
    if (s.lastmod) lines.push(`    <lastmod>${escapeXml(s.lastmod)}</lastmod>`);
    lines.push("  </sitemap>");
  }
  lines.push("</sitemapindex>");
  return lines.join("\n");
};

const parse: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const urls: SitemapUrl[] = [];
  const urlBlocks = xml.split(/<url>/i).slice(1);
  for (const block of urlBlocks) {
    const endIdx = block.indexOf("</url>");
    const content = endIdx >= 0 ? block.substring(0, endIdx) : block;
    const loc = content.match(/<loc>(.*?)<\/loc>/i)?.[1] ?? "";
    const lastmod = content.match(/<lastmod>(.*?)<\/lastmod>/i)?.[1];
    const changefreq = content.match(/<changefreq>(.*?)<\/changefreq>/i)?.[1];
    const priorityM = content.match(/<priority>(.*?)<\/priority>/i);
    const priority = priorityM ? parseFloat(priorityM[1]!) : undefined;
    const images: SitemapUrl["images"] = [];
    const imgRe = /<image:image>([\s\S]*?)<\/image:image>/gi;
    let imgM: RegExpExecArray | null;
    while ((imgM = imgRe.exec(content)) !== null) {
      images.push({
        loc: imgM[1]!.match(/<image:loc>(.*?)<\/image:loc>/i)?.[1] ?? "",
        title: imgM[1]!.match(/<image:title>(.*?)<\/image:title>/i)?.[1],
        caption: imgM[1]!.match(/<image:caption>(.*?)<\/image:caption>/i)?.[1],
      });
    }
    urls.push({ loc, lastmod, changefreq, priority, images: images.length ? images : undefined });
  }
  return urls;
};

const parseIndex: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const sitemaps: { loc: string; lastmod?: string }[] = [];
  const blocks = xml.split(/<sitemap>/i).slice(1);
  for (const block of blocks) {
    const endIdx = block.indexOf("</sitemap>");
    const content = endIdx >= 0 ? block.substring(0, endIdx) : block;
    sitemaps.push({
      loc: content.match(/<loc>(.*?)<\/loc>/i)?.[1] ?? "",
      lastmod: content.match(/<lastmod>(.*?)<\/lastmod>/i)?.[1],
    });
  }
  return sitemaps;
};

const addUrl: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const url = (typeof args[1] === "object" && args[1] !== null ? args[1] : { loc: "" }) as SitemapUrl;
  const single = create([[url]]) as string;
  const urlBlock = single.split("<url>")[1]?.split("</url>")[0] ?? "";
  return xml.replace("</urlset>", `  <url>${urlBlock}</url>\n</urlset>`);
};

const removeUrl: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const loc = String(args[1] ?? "");
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return xml.replace(new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, "i"), "");
};

const filterByChangefreq: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  const freq = String(args[1] ?? "");
  return urls.filter((u: any) => u.changefreq === freq);
};

const filterByPriority: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  const min = Number(args[1] ?? 0);
  const max = Number(args[2] ?? 1);
  return urls.filter((u: any) => (u.priority ?? 0.5) >= min && (u.priority ?? 0.5) <= max);
};

const sortByPriority: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  const desc = args[1] !== false;
  return [...urls].sort((a, b) => desc ? (b.priority ?? 0.5) - (a.priority ?? 0.5) : (a.priority ?? 0.5) - (b.priority ?? 0.5));
};

const sortByLastmod: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  const desc = args[1] !== false;
  return [...urls].sort((a: any, b: any) => {
    const da = a.lastmod ? new Date(a.lastmod).getTime() : 0;
    const db = b.lastmod ? new Date(b.lastmod).getTime() : 0;
    return desc ? db - da : da - db;
  });
};

const count: BuiltinHandler = (args) => {
  const urls = Array.isArray(args[0]) ? args[0] : [];
  return urls.length;
};

const extractLocs: BuiltinHandler = (args) => {
  const urls = (Array.isArray(args[0]) ? args[0] : []) as SitemapUrl[];
  return urls.map((u: any) => u.loc);
};

const validate: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const errors: string[] = [];
  if (!xml.includes("<urlset")) errors.push("Missing <urlset> root element");
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) errors.push("Missing sitemap namespace");
  const urls = parse([xml]) as SitemapUrl[];
  if (urls.length === 0) errors.push("No URLs found");
  if (urls.length > 50000) errors.push(`Exceeds 50,000 URL limit (found ${urls.length})`);
  const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
  for (const u of urls) {
    if (!u.loc) errors.push("URL missing <loc>");
    if (u.changefreq && !validFreqs.includes(u.changefreq)) errors.push(`Invalid changefreq: ${u.changefreq}`);
    if (u.priority !== undefined && (u.priority < 0 || u.priority > 1)) errors.push(`Invalid priority: ${u.priority}`);
  }
  return { valid: errors.length === 0, errors, urlCount: urls.length };
};

export const SitemapFunctions: Record<string, BuiltinHandler> = { create, createIndex, parse, parseIndex, addUrl, removeUrl, filterByChangefreq, filterByPriority, sortByPriority, sortByLastmod, count, extractLocs, validate };

export const SitemapFunctionMetadata = {
  create: { description: "Create XML sitemap", parameters: [{ name: "urls", dataType: "array", description: "Array of {loc, lastmod, changefreq, priority, images, videos, alternates}", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{pretty}", formInputType: "text", required: false }], returnType: "string", returnDescription: "XML sitemap", example: 'sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]' },
  createIndex: { description: "Create sitemap index", parameters: [{ name: "sitemaps", dataType: "array", description: "Array of {loc, lastmod}", formInputType: "text", required: true }], returnType: "string", returnDescription: "XML sitemap index", example: 'sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]' },
  parse: { description: "Parse XML sitemap", parameters: [{ name: "xml", dataType: "string", description: "XML sitemap content", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of URL objects", example: 'sitemap.parse $xml' },
  parseIndex: { description: "Parse sitemap index", parameters: [{ name: "xml", dataType: "string", description: "XML sitemap index", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {loc, lastmod}", example: 'sitemap.parseIndex $xml' },
  addUrl: { description: "Add URL to sitemap XML", parameters: [{ name: "xml", dataType: "string", description: "Existing sitemap XML", formInputType: "text", required: true }, { name: "url", dataType: "object", description: "URL object", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated XML", example: 'sitemap.addUrl $xml {"loc": "https://example.com/new"}' },
  removeUrl: { description: "Remove URL from sitemap XML", parameters: [{ name: "xml", dataType: "string", description: "Sitemap XML", formInputType: "text", required: true }, { name: "loc", dataType: "string", description: "URL to remove", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated XML", example: 'sitemap.removeUrl $xml "https://example.com/old"' },
  filterByChangefreq: { description: "Filter URLs by change frequency", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }, { name: "changefreq", dataType: "string", description: "Frequency", formInputType: "text", required: true }], returnType: "array", returnDescription: "Filtered URLs", example: 'sitemap.filterByChangefreq $urls "daily"' },
  filterByPriority: { description: "Filter URLs by priority range", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }, { name: "min", dataType: "number", description: "Min priority", formInputType: "text", required: true }, { name: "max", dataType: "number", description: "Max priority", formInputType: "text", required: false }], returnType: "array", returnDescription: "Filtered URLs", example: 'sitemap.filterByPriority $urls 0.8 1.0' },
  sortByPriority: { description: "Sort URLs by priority", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }, { name: "descending", dataType: "boolean", description: "Descending (default true)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Sorted URLs", example: 'sitemap.sortByPriority $urls' },
  sortByLastmod: { description: "Sort URLs by last modified", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }, { name: "descending", dataType: "boolean", description: "Descending (default true)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Sorted URLs", example: 'sitemap.sortByLastmod $urls' },
  count: { description: "Count URLs in sitemap", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }], returnType: "number", returnDescription: "URL count", example: 'sitemap.count $urls' },
  extractLocs: { description: "Extract all loc URLs", parameters: [{ name: "urls", dataType: "array", description: "Parsed URLs", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of URL strings", example: 'sitemap.extractLocs $urls' },
  validate: { description: "Validate sitemap XML", parameters: [{ name: "xml", dataType: "string", description: "Sitemap XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{valid, errors[], urlCount}", example: 'sitemap.validate $xml' },
};

export const SitemapModuleMetadata = {
  description: "XML sitemap generation, parsing, validation, and manipulation with image/video/alternate support",
  methods: ["create", "createIndex", "parse", "parseIndex", "addUrl", "removeUrl", "filterByChangefreq", "filterByPriority", "sortByPriority", "sortByLastmod", "count", "extractLocs", "validate"],
};
