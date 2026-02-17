import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function cdata(s: string): string { return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`; }
function rfc822(iso: string): string { return new Date(iso).toUTCString(); }
function iso8601(iso: string): string { return new Date(iso).toISOString(); }

interface FeedItem {
  title: string;
  link: string;
  description?: string;
  content?: string;
  author?: string;
  categories?: string[];
  pubDate?: string;
  guid?: string;
  enclosure?: { url: string; type?: string; length?: number };
}

interface FeedConfig {
  title: string;
  link: string;
  description?: string;
  language?: string;
  copyright?: string;
  author?: string;
  updated?: string;
  feedUrl?: string;
  image?: { url: string; title?: string; link?: string };
  items: FeedItem[];
}

const createRss: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as FeedConfig;
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">`,
    `  <channel>`,
    `    <title>${esc(config.title ?? "")}</title>`,
    `    <link>${esc(config.link ?? "")}</link>`,
    `    <description>${esc(config.description ?? "")}</description>`,
  ];
  if (config.language) lines.push(`    <language>${esc(config.language)}</language>`);
  if (config.copyright) lines.push(`    <copyright>${esc(config.copyright)}</copyright>`);
  if (config.author) lines.push(`    <managingEditor>${esc(config.author)}</managingEditor>`);
  if (config.updated) lines.push(`    <lastBuildDate>${rfc822(config.updated)}</lastBuildDate>`);
  if (config.feedUrl) lines.push(`    <atom:link href="${esc(config.feedUrl)}" rel="self" type="application/rss+xml"/>`);
  if (config.image) {
    lines.push(`    <image>`);
    lines.push(`      <url>${esc(config.image.url)}</url>`);
    lines.push(`      <title>${esc(config.image.title ?? config.title ?? "")}</title>`);
    lines.push(`      <link>${esc(config.image.link ?? config.link ?? "")}</link>`);
    lines.push(`    </image>`);
  }
  for (const item of config.items ?? []) {
    lines.push(`    <item>`);
    lines.push(`      <title>${esc(item.title)}</title>`);
    lines.push(`      <link>${esc(item.link)}</link>`);
    if (item.description) lines.push(`      <description>${cdata(item.description)}</description>`);
    if (item.content) lines.push(`      <content:encoded>${cdata(item.content)}</content:encoded>`);
    if (item.author) lines.push(`      <author>${esc(item.author)}</author>`);
    if (item.categories) for (const c of item.categories) lines.push(`      <category>${esc(c)}</category>`);
    if (item.pubDate) lines.push(`      <pubDate>${rfc822(item.pubDate)}</pubDate>`);
    lines.push(`      <guid isPermaLink="${item.guid ? "false" : "true"}">${esc(item.guid ?? item.link)}</guid>`);
    if (item.enclosure) lines.push(`      <enclosure url="${esc(item.enclosure.url)}" type="${esc(item.enclosure.type ?? "application/octet-stream")}" length="${item.enclosure.length ?? 0}"/>`);
    lines.push(`    </item>`);
  }
  lines.push(`  </channel>`);
  lines.push(`</rss>`);
  return lines.join("\n");
};

const createAtom: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as FeedConfig;
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<feed xmlns="http://www.w3.org/2005/Atom">`,
    `  <title>${esc(config.title ?? "")}</title>`,
    `  <link href="${esc(config.link ?? "")}"/>`,
    `  <id>${esc(config.feedUrl ?? config.link ?? "")}</id>`,
    `  <updated>${iso8601(config.updated ?? new Date().toISOString())}</updated>`,
  ];
  if (config.description) lines.push(`  <subtitle>${esc(config.description)}</subtitle>`);
  if (config.feedUrl) lines.push(`  <link href="${esc(config.feedUrl)}" rel="self" type="application/atom+xml"/>`);
  if (config.author) lines.push(`  <author><name>${esc(config.author)}</name></author>`);
  if (config.copyright) lines.push(`  <rights>${esc(config.copyright)}</rights>`);
  for (const item of config.items ?? []) {
    lines.push(`  <entry>`);
    lines.push(`    <title>${esc(item.title)}</title>`);
    lines.push(`    <link href="${esc(item.link)}"/>`);
    lines.push(`    <id>${esc(item.guid ?? item.link)}</id>`);
    lines.push(`    <updated>${iso8601(item.pubDate ?? new Date().toISOString())}</updated>`);
    if (item.description) lines.push(`    <summary>${cdata(item.description)}</summary>`);
    if (item.content) lines.push(`    <content type="html">${cdata(item.content)}</content>`);
    if (item.author) lines.push(`    <author><name>${esc(item.author)}</name></author>`);
    if (item.categories) for (const c of item.categories) lines.push(`    <category term="${esc(c)}"/>`);
    lines.push(`  </entry>`);
  }
  lines.push(`</feed>`);
  return lines.join("\n");
};

const createJson: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as FeedConfig;
  return JSON.stringify({
    version: "https://jsonfeed.org/version/1.1",
    title: config.title ?? "",
    home_page_url: config.link,
    feed_url: config.feedUrl,
    description: config.description,
    language: config.language,
    authors: config.author ? [{ name: config.author }] : undefined,
    items: (config.items ?? []).map((item: any) => ({
      id: item.guid ?? item.link,
      url: item.link,
      title: item.title,
      summary: item.description,
      content_html: item.content,
      date_published: item.pubDate ? iso8601(item.pubDate) : undefined,
      authors: item.author ? [{ name: item.author }] : undefined,
      tags: item.categories,
      attachments: item.enclosure ? [{ url: item.enclosure.url, mime_type: item.enclosure.type ?? "application/octet-stream", size_in_bytes: item.enclosure.length }] : undefined,
    })),
  }, null, 2);
};

function extractTag(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return undefined;
  return m[1]!.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function extractAttr(xml: string, tag: string, attr: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  return xml.match(re)?.[1];
}

const parseRss: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const channel = xml.match(/<channel>([\s\S]*)<\/channel>/i)?.[1] ?? "";
  const title = extractTag(channel, "title");
  const link = extractTag(channel, "link");
  const description = extractTag(channel, "description");
  const language = extractTag(channel, "language");
  const items: FeedItem[] = [];
  const itemBlocks = channel.split(/<item>/i).slice(1);
  for (const block of itemBlocks) {
    const content = block.split(/<\/item>/i)[0] ?? "";
    const cats: string[] = [];
    const catRe = /<category[^>]*>([\s\S]*?)<\/category>/gi;
    let cm: RegExpExecArray | null;
    while ((cm = catRe.exec(content)) !== null) cats.push(cm[1]!.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim());
    const encUrl = extractAttr(content, "enclosure", "url");
    items.push({
      title: extractTag(content, "title") ?? "",
      link: extractTag(content, "link") ?? "",
      description: extractTag(content, "description"),
      content: extractTag(content, "content:encoded"),
      author: extractTag(content, "author") ?? extractTag(content, "dc:creator"),
      categories: cats.length ? cats : undefined,
      pubDate: extractTag(content, "pubDate"),
      guid: extractTag(content, "guid"),
      enclosure: encUrl ? { url: encUrl, type: extractAttr(content, "enclosure", "type"), length: Number(extractAttr(content, "enclosure", "length") ?? 0) } : undefined,
    });
  }
  return { type: "rss", title, link, description, language, items };
};

const parseAtom: BuiltinHandler = (args) => {
  const xml = String(args[0] ?? "");
  const title = extractTag(xml, "title");
  const link = extractAttr(xml, "link", "href");
  const description = extractTag(xml, "subtitle");
  const items: FeedItem[] = [];
  const entryBlocks = xml.split(/<entry>/i).slice(1);
  for (const block of entryBlocks) {
    const content = block.split(/<\/entry>/i)[0] ?? "";
    const cats: string[] = [];
    const catRe = /<category[^>]*term="([^"]*)"/gi;
    let cm: RegExpExecArray | null;
    while ((cm = catRe.exec(content)) !== null) cats.push(cm[1]!);
    items.push({
      title: extractTag(content, "title") ?? "",
      link: extractAttr(content, "link", "href") ?? "",
      description: extractTag(content, "summary"),
      content: extractTag(content, "content"),
      author: extractTag(content, "name"),
      categories: cats.length ? cats : undefined,
      pubDate: extractTag(content, "updated") ?? extractTag(content, "published"),
      guid: extractTag(content, "id"),
    });
  }
  return { type: "atom", title, link, description, items };
};

const parseJson: BuiltinHandler = (args) => {
  const input = typeof args[0] === "string" ? JSON.parse(args[0]) : args[0];
  const feed = input as unknown as Record<string, unknown>;
  const items = (Array.isArray(feed.items) ? feed.items : []) as unknown as Record<string, unknown>[];
  return {
    type: "json",
    title: feed.title,
    link: feed.home_page_url,
    description: feed.description,
    language: feed.language,
    items: items.map((item: any) => ({
      title: item.title ?? "",
      link: item.url ?? "",
      description: item.summary,
      content: item.content_html ?? item.content_text,
      author: Array.isArray(item.authors) ? (item.authors[0] as unknown as Record<string, unknown>)?.name : undefined,
      categories: item.tags,
      pubDate: item.date_published,
      guid: item.id,
    })),
  };
};

const detect: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");
  if (input.trim().startsWith("{")) return "json";
  if (/<feed/i.test(input)) return "atom";
  if (/<rss/i.test(input)) return "rss";
  return "unknown";
};

const parseFeed: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");
  const type = detect([input]) as string;
  if (type === "json") return parseJson([input]);
  if (type === "atom") return parseAtom([input]);
  if (type === "rss") return parseRss([input]);
  return { type: "unknown", title: null, link: null, description: null, items: [] };
};

const addItem: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as FeedConfig;
  const item = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as FeedItem;
  return { ...config, items: [...(config.items ?? []), item] };
};

const removeItem: BuiltinHandler = (args) => {
  const config = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as FeedConfig;
  const guid = String(args[1] ?? "");
  return { ...config, items: (config.items ?? []).filter((i: any) => (i.guid ?? i.link) !== guid) };
};

const sortItems: BuiltinHandler = (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as FeedItem[];
  const desc = args[1] !== false;
  return [...items].sort((a: any, b: any) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return desc ? db - da : da - db;
  });
};

const filterItems: BuiltinHandler = (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as FeedItem[];
  const field = String(args[1] ?? "title");
  const pattern = String(args[2] ?? "");
  const re = new RegExp(pattern, "i");
  return items.filter((item: any) => {
    const val = (item as unknown as Record<string, unknown>)[field];
    return typeof val === "string" && re.test(val);
  });
};

const mergeFeeds: BuiltinHandler = (args) => {
  const feeds = (Array.isArray(args[0]) ? args[0] : []) as FeedConfig[];
  const allItems: FeedItem[] = [];
  for (const feed of feeds) allItems.push(...(feed.items ?? []));
  allItems.sort((a: any, b: any) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
  return { title: "Merged Feed", link: "", items: allItems };
};

const fetchFeed: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const res = await fetch(url);
  if (!res.ok) return { ok: false, status: res.status, feed: null };
  const text = await res.text();
  return { ok: true, status: res.status, feed: parseFeed([text]) };
};

export const FeedFunctions: Record<string, BuiltinHandler> = { createRss, createAtom, createJson, parseRss, parseAtom, parseJson, detect, parse: parseFeed, addItem, removeItem, sortItems, filterItems, mergeFeeds, fetch: fetchFeed };

export const FeedFunctionMetadata = {
  createRss: { description: "Create RSS 2.0 feed", parameters: [{ name: "config", dataType: "object", description: "{title, link, description, language, items[]}", formInputType: "text", required: true }], returnType: "string", returnDescription: "RSS XML", example: 'feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}' },
  createAtom: { description: "Create Atom feed", parameters: [{ name: "config", dataType: "object", description: "{title, link, description, items[]}", formInputType: "text", required: true }], returnType: "string", returnDescription: "Atom XML", example: 'feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}' },
  createJson: { description: "Create JSON Feed", parameters: [{ name: "config", dataType: "object", description: "{title, link, description, items[]}", formInputType: "text", required: true }], returnType: "string", returnDescription: "JSON Feed string", example: 'feed.createJson {"title": "My Blog", "items": [...]}' },
  parseRss: { description: "Parse RSS feed", parameters: [{ name: "xml", dataType: "string", description: "RSS XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{type, title, link, items[]}", example: 'feed.parseRss $xml' },
  parseAtom: { description: "Parse Atom feed", parameters: [{ name: "xml", dataType: "string", description: "Atom XML", formInputType: "text", required: true }], returnType: "object", returnDescription: "{type, title, link, items[]}", example: 'feed.parseAtom $xml' },
  parseJson: { description: "Parse JSON Feed", parameters: [{ name: "json", dataType: "string", description: "JSON Feed", formInputType: "text", required: true }], returnType: "object", returnDescription: "{type, title, link, items[]}", example: 'feed.parseJson $json' },
  detect: { description: "Detect feed format", parameters: [{ name: "content", dataType: "string", description: "Feed content", formInputType: "text", required: true }], returnType: "string", returnDescription: "rss | atom | json | unknown", example: 'feed.detect $content' },
  parse: { description: "Auto-detect and parse any feed", parameters: [{ name: "content", dataType: "string", description: "Feed content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{type, title, link, items[]}", example: 'feed.parse $content' },
  addItem: { description: "Add item to feed config", parameters: [{ name: "config", dataType: "object", description: "Feed config", formInputType: "text", required: true }, { name: "item", dataType: "object", description: "{title, link, description, pubDate, ...}", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated config", example: 'feed.addItem $config {"title": "New Post", "link": "..."}' },
  removeItem: { description: "Remove item by guid", parameters: [{ name: "config", dataType: "object", description: "Feed config", formInputType: "text", required: true }, { name: "guid", dataType: "string", description: "Item GUID or link", formInputType: "text", required: true }], returnType: "object", returnDescription: "Updated config", example: 'feed.removeItem $config "https://example.com/old-post"' },
  sortItems: { description: "Sort items by date", parameters: [{ name: "items", dataType: "array", description: "Feed items", formInputType: "text", required: true }, { name: "descending", dataType: "boolean", description: "Newest first (default true)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Sorted items", example: 'feed.sortItems $items' },
  filterItems: { description: "Filter items by field regex", parameters: [{ name: "items", dataType: "array", description: "Feed items", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "pattern", dataType: "string", description: "Regex pattern", formInputType: "text", required: true }], returnType: "array", returnDescription: "Matching items", example: 'feed.filterItems $items "title" "javascript"' },
  mergeFeeds: { description: "Merge multiple feeds", parameters: [{ name: "feeds", dataType: "array", description: "Array of feed configs", formInputType: "text", required: true }], returnType: "object", returnDescription: "Merged feed config", example: 'feed.mergeFeeds [$feed1, $feed2]' },
  fetch: { description: "Fetch and parse feed from URL", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status, feed}", example: 'feed.fetch "https://example.com/feed.xml"' },
};

export const FeedModuleMetadata = {
  description: "RSS, Atom, and JSON Feed creation, parsing, manipulation, and auto-detection",
  methods: ["createRss", "createAtom", "createJson", "parseRss", "parseAtom", "parseJson", "detect", "parse", "addItem", "removeItem", "sortItems", "filterItems", "mergeFeeds", "fetch"],
};
