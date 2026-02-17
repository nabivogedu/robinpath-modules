import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import Parser from "rss-parser";

const parser = new Parser();
const feedCache = new Map<string, { items: unknown[]; lastFetched: number }>();

const parse: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const feed = await parser.parseURL(url);
  feedCache.set(url, { items: feed.items, lastFetched: Date.now() });
  return { title: feed.title, description: feed.description, link: feed.link, language: feed.language, lastBuildDate: feed.lastBuildDate, items: feed.items.map((i: any) => ({ title: i.title, link: i.link, pubDate: i.pubDate, content: i.contentSnippet ?? i.content, author: i.creator ?? i.author, categories: i.categories, guid: i.guid })) };
};

const parseString: BuiltinHandler = async (args) => {
  const xml = String(args[0] ?? "");
  const feed = await parser.parseString(xml);
  return { title: feed.title, description: feed.description, items: feed.items.map((i: any) => ({ title: i.title, link: i.link, pubDate: i.pubDate, content: i.contentSnippet, author: i.creator })) };
};

const getItems: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const limit = parseInt(String(args[1] ?? "10"), 10);
  const feed = await parser.parseURL(url);
  return feed.items.slice(0, limit).map((i: any) => ({ title: i.title, link: i.link, pubDate: i.pubDate, content: i.contentSnippet ?? i.content, author: i.creator }));
};

const getNew: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const since = args[1] != null ? new Date(String(args[1])).getTime() : undefined;
  const cached = feedCache.get(url);
  const feed = await parser.parseURL(url);
  const currentItems = feed.items.map((i: any) => ({ title: i.title, link: i.link, pubDate: i.pubDate, content: i.contentSnippet, guid: i.guid }));

  let newItems;
  if (since) {
    newItems = currentItems.filter((i: any) => i.pubDate && new Date(i.pubDate).getTime() > since);
  } else if (cached) {
    const cachedGuids = new Set(cached.items.map((i: any) => i.guid ?? i.link));
    newItems = currentItems.filter((i: any) => !cachedGuids.has(i.guid ?? i.link));
  } else {
    newItems = currentItems;
  }

  feedCache.set(url, { items: currentItems, lastFetched: Date.now() });
  return newItems;
};

const getLatest: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const feed = await parser.parseURL(url);
  const item = feed.items[0];
  if (!item) return null;
  return { title: item.title, link: item.link, pubDate: item.pubDate, content: item.contentSnippet ?? item.content, author: item.creator };
};

const feedInfo: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const feed = await parser.parseURL(url);
  return { title: feed.title, description: feed.description, link: feed.link, language: feed.language, lastBuildDate: feed.lastBuildDate, itemCount: feed.items.length };
};

export const RssFunctions: Record<string, BuiltinHandler> = { parse, parseString, getItems, getNew, getLatest, feedInfo };

export const RssFunctionMetadata = {
  parse: { description: "Parse an RSS/Atom feed from a URL", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "{title, description, link, items}", example: 'rss.parse "https://blog.example.com/feed"' },
  parseString: { description: "Parse RSS/Atom XML from a string", parameters: [{ name: "xml", dataType: "string", description: "XML content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{title, items}", example: 'rss.parseString $xmlContent' },
  getItems: { description: "Get feed items with a limit", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }, { name: "limit", dataType: "number", description: "Max items (default 10)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of items", example: 'rss.getItems "https://blog.example.com/feed" 5' },
  getNew: { description: "Get only new items since last check or since a date", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }, { name: "since", dataType: "string", description: "ISO date (optional, uses cache if omitted)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of new items", example: 'rss.getNew "https://blog.example.com/feed" "2025-01-01"' },
  getLatest: { description: "Get the most recent item from a feed", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "Latest item or null", example: 'rss.getLatest "https://blog.example.com/feed"' },
  feedInfo: { description: "Get feed metadata without items", parameters: [{ name: "url", dataType: "string", description: "Feed URL", formInputType: "text", required: true }], returnType: "object", returnDescription: "{title, description, link, itemCount}", example: 'rss.feedInfo "https://blog.example.com/feed"' },
};

export const RssModuleMetadata = {
  description: "Parse RSS and Atom feeds, detect new entries, and get feed metadata",
  methods: ["parse", "parseString", "getItems", "getNew", "getLatest", "feedInfo"],
};
