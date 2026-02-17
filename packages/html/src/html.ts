import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── RobinPath Function Handlers ─────────────────────────────────────

const stripTags: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  return html.replace(/<[^>]*>/g, "");
};

const extractText: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const tagName = String(args[1] ?? "");
  const re = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`, "gi");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    // Strip any nested tags from the captured content
    results.push(m[1]!.replace(/<[^>]*>/g, "").trim());
  }
  return results;
};

const extractLinks: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const re = /<a\s[^>]*?href\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const results: { href: string; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    results.push({
      href: m[1]!,
      text: m[2]!.replace(/<[^>]*>/g, "").trim(),
    });
  }
  return results;
};

const extractImages: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const re = /<img\s[^>]*?\/?>/gi;
  const results: { src: string; alt: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0]!;
    const srcMatch = tag.match(/src\s*=\s*["']([^"']*?)["']/i);
    const altMatch = tag.match(/alt\s*=\s*["']([^"']*?)["']/i);
    results.push({
      src: srcMatch ? srcMatch[1]! : "",
      alt: altMatch ? altMatch[1]! : "",
    });
  }
  return results;
};

const getAttribute: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const tagName = String(args[1] ?? "");
  const attrName = String(args[2] ?? "");
  const tagRe = new RegExp(`<${tagName}\\s[^>]*?>`, "gi");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    const tag = m[0]!;
    const attrRe = new RegExp(`${attrName}\\s*=\\s*["']([^"']*?)["']`, "i");
    const attrMatch = tag.match(attrRe);
    if (attrMatch) {
      results.push(attrMatch[1]!);
    }
  }
  return results;
};

const escape: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const unescape: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
};

const extractMeta: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const re = /<meta\s[^>]*?name\s*=\s*["']([^"']*?)["'][^>]*?content\s*=\s*["']([^"']*?)["'][^>]*?\/?>/gi;
  const reverseRe = /<meta\s[^>]*?content\s*=\s*["']([^"']*?)["'][^>]*?name\s*=\s*["']([^"']*?)["'][^>]*?\/?>/gi;
  const result: Record<string, string> = {};
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    result[m[1]!] = m[2]!;
  }
  while ((m = reverseRe.exec(html)) !== null) {
    // content is group 1, name is group 2 in the reverse pattern
    if (!(m[2]! in result)) {
      result[m[2]!] = m[1]!;
    }
  }
  return result;
};

const getTitle: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const m = html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i);
  return m ? m[1]!.trim() : null;
};

const extractTables: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  const tableRe = /<table(?:\s[^>]*)?>[\s\S]*?<\/table>/gi;
  const tables: string[][][] = [];
  let tableMatch: RegExpExecArray | null;
  while ((tableMatch = tableRe.exec(html)) !== null) {
    const tableHtml = tableMatch[0]!;
    const rowRe = /<tr(?:\s[^>]*)?>[\s\S]*?<\/tr>/gi;
    const rows: string[][] = [];
    let rowMatch: RegExpExecArray | null;
    while ((rowMatch = rowRe.exec(tableHtml)) !== null) {
      const rowHtml = rowMatch[0]!;
      const cellRe = /<(?:td|th)(?:\s[^>]*)?>[\s\S]*?<\/(?:td|th)>/gi;
      const cells: string[] = [];
      let cellMatch: RegExpExecArray | null;
      while ((cellMatch = cellRe.exec(rowHtml)) !== null) {
        const cellHtml = cellMatch[0]!;
        // Strip the outer td/th tags and any inner tags, then trim
        const content = cellHtml
          .replace(/^<(?:td|th)(?:\s[^>]*)?>/, "")
          .replace(/<\/(?:td|th)>$/, "")
          .replace(/<[^>]*>/g, "")
          .trim();
        cells.push(content);
      }
      rows.push(cells);
    }
    tables.push(rows);
  }
  return tables;
};

const wrap: BuiltinHandler = (args) => {
  const text = String(args[0] ?? "");
  const tagName = String(args[1] ?? "div");
  const attributes = args[2];
  let attrStr = "";
  if (attributes != null && typeof attributes === "object" && !Array.isArray(attributes)) {
    const entries = Object.entries(attributes as Record<string, unknown>);
    for (const [key, value] of entries) {
      attrStr += ` ${key}="${String(value)}"`;
    }
  }
  return `<${tagName}${attrStr}>${text}</${tagName}>`;
};

const minify: BuiltinHandler = (args) => {
  const html = String(args[0] ?? "");
  return html
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "");
};

// ── Exports ─────────────────────────────────────────────────────────

export const HtmlFunctions: Record<string, BuiltinHandler> = {
  stripTags,
  extractText,
  extractLinks,
  extractImages,
  getAttribute,
  escape,
  unescape,
  extractMeta,
  getTitle,
  extractTables,
  wrap,
  minify,
};

export const HtmlFunctionMetadata = {
  stripTags: {
    description: "Remove all HTML tags from a string, returning plain text",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to strip tags from",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "Plain text with all HTML tags removed",
    example: 'html.stripTags "<p>Hello <b>world</b></p>"',
  },
  extractText: {
    description: "Extract the text content of all matching tags by tag name",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to search",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "tagName",
        dataType: "string",
        description: "The tag name to match (e.g. \"p\", \"h1\", \"span\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of text contents from all matching tags",
    example: 'html.extractText "<p>One</p><p>Two</p>" "p"',
  },
  extractLinks: {
    description: "Extract all links (href and text) from anchor tags",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to extract links from",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of objects with href and text properties",
    example: 'html.extractLinks "<a href=\\"https://example.com\\">Example</a>"',
  },
  extractImages: {
    description: "Extract all image sources and alt text from img tags",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to extract images from",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of objects with src and alt properties",
    example: 'html.extractImages "<img src=\\"photo.jpg\\" alt=\\"A photo\\">"',
  },
  getAttribute: {
    description: "Extract attribute values from all matching tags",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to search",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "tagName",
        dataType: "string",
        description: "The tag name to match (e.g. \"div\", \"input\")",
        formInputType: "text",
        required: true,
      },
      {
        name: "attributeName",
        dataType: "string",
        description: "The attribute name to extract (e.g. \"class\", \"id\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of attribute values from matching tags",
    example: 'html.getAttribute "<div class=\\"a\\"></div><div class=\\"b\\"></div>" "div" "class"',
  },
  escape: {
    description: "HTML-escape special characters (&, <, >, \", ')",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string to HTML-escape",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The escaped string safe for use in HTML",
    example: 'html.escape "<script>alert(1)</script>"',
  },
  unescape: {
    description: "Reverse HTML escaping (&amp; &lt; &gt; &quot; &#39;)",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The HTML-escaped string to unescape",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The unescaped string with HTML entities converted back",
    example: 'html.unescape "&lt;p&gt;Hello&lt;/p&gt;"',
  },
  extractMeta: {
    description: "Extract meta tag name-content pairs from HTML",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to extract meta tags from",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "Object mapping meta tag names to their content values",
    example: 'html.extractMeta "<meta name=\\"description\\" content=\\"A page\\">"',
  },
  getTitle: {
    description: "Extract the text content of the <title> tag",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to extract the title from",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The title text, or null if no <title> tag is found",
    example: 'html.getTitle "<html><head><title>My Page</title></head></html>"',
  },
  extractTables: {
    description: "Extract HTML tables as arrays of rows and cells",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string containing table(s)",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of tables, each as an array of rows, each row as an array of cell strings",
    example: 'html.extractTables "<table><tr><td>A</td><td>B</td></tr></table>"',
  },
  wrap: {
    description: "Wrap text in an HTML tag with optional attributes",
    parameters: [
      {
        name: "text",
        dataType: "string",
        description: "The text content to wrap",
        formInputType: "text",
        required: true,
      },
      {
        name: "tagName",
        dataType: "string",
        description: "The tag name to wrap with (e.g. \"div\", \"span\")",
        formInputType: "text",
        required: true,
      },
      {
        name: "attributes",
        dataType: "object",
        description: "Optional object of attribute key-value pairs",
        formInputType: "json",
        required: false,
      },
    ],
    returnType: "string",
    returnDescription: "The HTML string with text wrapped in the specified tag",
    example: 'html.wrap "Hello" "p" {"class": "greeting"}',
  },
  minify: {
    description: "Minify HTML by removing extra whitespace and newlines between tags",
    parameters: [
      {
        name: "htmlString",
        dataType: "string",
        description: "The HTML string to minify",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The minified HTML string",
    example: 'html.minify "<div>\\n  <p> Hello </p>\\n</div>"',
  },
};

export const HtmlModuleMetadata = {
  description: "Parse, extract, escape, and manipulate HTML content using regex-based processing",
  methods: [
    "stripTags",
    "extractText",
    "extractLinks",
    "extractImages",
    "getAttribute",
    "escape",
    "unescape",
    "extractMeta",
    "getTitle",
    "extractTables",
    "wrap",
    "minify",
  ],
};
