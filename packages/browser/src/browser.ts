// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import puppeteer, { type Browser, type Page } from "puppeteer";

const browsers = new Map<string, Browser>();
const pages = new Map<string, Page>();

const launch: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const browser = await puppeteer.launch({ headless: opts.headless !== false, args: Array.isArray(opts.args) ? opts.args.map(String) : [] });
  browsers.set(id, browser);
  return { id };
};

const newPage: BuiltinHandler = async (args) => {
  const browserId = String(args[0] ?? "default");
  const pageId = String(args[1] ?? "page-" + Date.now());
  const browser = browsers.get(browserId);
  if (!browser) throw new Error(`Browser "${browserId}" not found`);
  const page = await browser.newPage();
  pages.set(pageId, page);
  return { pageId };
};

const goto: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const url = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const response = await page.goto(url, { waitUntil: (opts.waitUntil as "load" | "domcontentloaded" | "networkidle0" | "networkidle2") ?? "load" });
  return { url: page.url(), status: response?.status() ?? null };
};

const click: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  await page.click(selector);
  return true;
};

const type: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const text = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  await page.type(selector, text, { delay: opts.delay ? Number(opts.delay) : undefined });
  return true;
};

const select: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const values = Array.isArray(args[2]) ? args[2].map(String) : [String(args[2] ?? "")];
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const selected = await page.select(selector, ...values);
  return { selected };
};

const screenshot: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const screenshotOpts: Record<string, unknown> = { fullPage: Boolean(opts.fullPage), type: String(opts.type ?? "png") };
  if (opts.path) {
    screenshotOpts.path = String(opts.path);
    await page.screenshot(screenshotOpts);
    return { path: screenshotOpts.path };
  }
  screenshotOpts.encoding = "base64";
  const base64 = await page.screenshot(screenshotOpts);
  return { base64 };
};

const pdf: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const pdfOpts: Record<string, unknown> = {};
  if (opts.path) pdfOpts.path = String(opts.path);
  if (opts.format) pdfOpts.format = String(opts.format);
  const buffer = await page.pdf(pdfOpts);
  if (opts.path) return { path: String(opts.path) };
  return { base64: Buffer.from(buffer).toString("base64") };
};

const evaluate: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const script = String(args[1] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const result = await page.evaluate(new Function(script) as () => unknown);
  return result;
};

const content: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  return await page.content();
};

const title: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  return await page.title();
};

const url: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  return page.url();
};

const waitFor: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  await page.waitForSelector(selector, { timeout: opts.timeout ? Number(opts.timeout) : undefined });
  return true;
};

const querySelector: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const attribute = args[2] != null ? String(args[2]) : undefined;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const result = await page.evaluate((sel: string, attr?: string) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    if (attr) return el.getAttribute(attr);
    return el.textContent;
  }, selector, attribute);
  return result;
};

const querySelectorAll: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const selector = String(args[1] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  const results = await page.evaluate((sel: string) => {
    return Array.from(document.querySelectorAll(sel)).map((el: any) => el.textContent ?? "");
  }, selector);
  return results;
};

const cookies: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  return await page.cookies();
};

const setCookie: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const cookie = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  await page.setCookie(cookie as unknown as Parameters<Page["setCookie"]>[0]);
  return true;
};

const close: BuiltinHandler = async (args) => {
  const pageId = String(args[0] ?? "");
  const page = pages.get(pageId);
  if (!page) throw new Error(`Page "${pageId}" not found`);
  await page.close();
  pages.delete(pageId);
  return true;
};

const closeBrowser: BuiltinHandler = async (args) => {
  const browserId = String(args[0] ?? "default");
  const browser = browsers.get(browserId);
  if (!browser) throw new Error(`Browser "${browserId}" not found`);
  await browser.close();
  browsers.delete(browserId);
  return true;
};

const scrape: BuiltinHandler = async (args) => {
  const targetUrl = String(args[0] ?? "");
  const selectors = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, string>;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const browser = await puppeteer.launch({ headless: true, args: Array.isArray(opts.args) ? opts.args.map(String) : ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: (opts.waitUntil as "load" | "domcontentloaded" | "networkidle0" | "networkidle2") ?? "networkidle2" });

    const data: Record<string, string | string[] | null> = {};
    for (const [key, selector] of Object.entries(selectors)) {
      const elements = await page.evaluate((sel: string) => {
        const els = document.querySelectorAll(sel);
        return Array.from(els).map((el: any) => el.textContent?.trim() ?? "");
      }, selector);
      data[key] = elements.length === 1 ? elements[0] : elements.length === 0 ? null : elements;
    }

    return { url: targetUrl, data };
  } finally {
    await browser.close();
  }
};

export const BrowserFunctions: Record<string, BuiltinHandler> = { launch, newPage, goto, click, type, select, screenshot, pdf, evaluate, content, title, url, waitFor, querySelector, querySelectorAll, cookies, setCookie, close, closeBrowser, scrape };

export const BrowserFunctionMetadata = {
  launch: { description: "Launch a headless browser instance", parameters: [{ name: "id", dataType: "string", description: "Browser instance name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{headless, args}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{id}", example: 'browser.launch "main" {"headless": true}' },
  newPage: { description: "Open a new page in a browser instance", parameters: [{ name: "browserId", dataType: "string", description: "Browser instance name", formInputType: "text", required: true }, { name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "object", returnDescription: "{pageId}", example: 'browser.newPage "main" "page1"' },
  goto: { description: "Navigate a page to a URL", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "url", dataType: "string", description: "Target URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{waitUntil: load|domcontentloaded|networkidle0|networkidle2}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{url, status}", example: 'browser.goto "page1" "https://example.com" {"waitUntil": "networkidle2"}' },
  click: { description: "Click an element on the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'browser.click "page1" "#submit-btn"' },
  type: { description: "Type text into an input element", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Text to type", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{delay: ms between keystrokes}", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "True", example: 'browser.type "page1" "#search" "hello" {"delay": 50}' },
  select: { description: "Select a dropdown option by value", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }, { name: "values", dataType: "array", description: "Value(s) to select", formInputType: "text", required: true }], returnType: "object", returnDescription: "{selected}", example: 'browser.select "page1" "#country" "US"' },
  screenshot: { description: "Take a screenshot of the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{path, fullPage, type: png|jpeg}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path} or {base64}", example: 'browser.screenshot "page1" {"path": "./shot.png", "fullPage": true}' },
  pdf: { description: "Generate a PDF from the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{path, format}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path} or {base64}", example: 'browser.pdf "page1" {"path": "./page.pdf", "format": "A4"}' },
  evaluate: { description: "Execute JavaScript in the page context", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "script", dataType: "string", description: "JavaScript code to evaluate", formInputType: "text", required: true }], returnType: "any", returnDescription: "Result of the evaluated script", example: 'browser.evaluate "page1" "return document.title"' },
  content: { description: "Get the full HTML content of the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "string", returnDescription: "HTML string", example: 'browser.content "page1"' },
  title: { description: "Get the page title", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "string", returnDescription: "Page title", example: 'browser.title "page1"' },
  url: { description: "Get the current URL of the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "string", returnDescription: "Current URL", example: 'browser.url "page1"' },
  waitFor: { description: "Wait for a selector to appear on the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{timeout: ms}", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "True", example: 'browser.waitFor "page1" ".loaded" {"timeout": 5000}' },
  querySelector: { description: "Get text content or attribute of an element", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }, { name: "attribute", dataType: "string", description: "Attribute name (optional, defaults to textContent)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Text content or attribute value", example: 'browser.querySelector "page1" "h1"' },
  querySelectorAll: { description: "Get text content of all matching elements", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "selector", dataType: "string", description: "CSS selector", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of text content strings", example: 'browser.querySelectorAll "page1" "li.item"' },
  cookies: { description: "Get all cookies for the current page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of cookie objects", example: 'browser.cookies "page1"' },
  setCookie: { description: "Set a cookie on the page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }, { name: "cookie", dataType: "object", description: "{name, value, domain, path, ...}", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'browser.setCookie "page1" {"name": "session", "value": "abc123", "domain": "example.com"}' },
  close: { description: "Close a page", parameters: [{ name: "pageId", dataType: "string", description: "Page identifier", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'browser.close "page1"' },
  closeBrowser: { description: "Close a browser instance and all its pages", parameters: [{ name: "browserId", dataType: "string", description: "Browser instance name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'browser.closeBrowser "main"' },
  scrape: { description: "High-level scrape: navigate to URL and extract data by CSS selectors", parameters: [{ name: "url", dataType: "string", description: "Target URL", formInputType: "text", required: true }, { name: "selectors", dataType: "object", description: "Map of name to CSS selector", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{waitUntil, args}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{url, data}", example: 'browser.scrape "https://example.com" {"title": "h1", "links": "a"}' },
};

export const BrowserModuleMetadata = {
  description: "Headless browser automation with Puppeteer: launch browsers, navigate pages, interact with elements, take screenshots, generate PDFs, and scrape data",
  methods: ["launch", "newPage", "goto", "click", "type", "select", "screenshot", "pdf", "evaluate", "content", "title", "url", "waitFor", "querySelector", "querySelectorAll", "cookies", "setCookie", "close", "closeBrowser", "scrape"],
};
