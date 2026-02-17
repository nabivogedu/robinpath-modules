import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const toHtml: BuiltinHandler = (args) => {
  let md = String(args[0] ?? "");
  // Code blocks first (before other transformations)
  md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="language-${lang}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre>`);
  // Inline code
  md = md.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Headings
  md = md.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  md = md.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  md = md.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  md = md.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  md = md.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  md = md.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  // HR
  md = md.replace(/^---+$/gm, "<hr>");
  // Blockquote
  md = md.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");
  // Bold and italic
  md = md.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  md = md.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  md = md.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Images (before links)
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  // Links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Unordered lists
  md = md.replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");
  // Paragraphs for remaining lines
  md = md.replace(/^(?!<[a-z]|<\/|$)(.+)$/gm, "<p>$1</p>");
  return md.trim();
};

const extractHeadings: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const headings: Array<{ level: number; text: string }> = [];
  for (const match of md.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
    headings.push({ level: match[1]!.length, text: match[2]!.trim() });
  }
  return headings;
};

const extractLinks: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const links: Array<{ text: string; url: string }> = [];
  for (const match of md.matchAll(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g)) {
    links.push({ text: match[1]!, url: match[2]! });
  }
  return links;
};

const extractImages: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const images: Array<{ alt: string; src: string }> = [];
  for (const match of md.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    images.push({ alt: match[1]!, src: match[2]! });
  }
  return images;
};

const extractCodeBlocks: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const blocks: Array<{ language: string; code: string }> = [];
  for (const match of md.matchAll(/```(\w*)\n([\s\S]*?)```/g)) {
    blocks.push({ language: match[1] || "", code: match[2]!.trim() });
  }
  return blocks;
};

const stripMarkdown: BuiltinHandler = (args) => {
  let md = String(args[0] ?? "");
  md = md.replace(/```[\s\S]*?```/g, "");
  md = md.replace(/`([^`]+)`/g, "$1");
  md = md.replace(/#{1,6}\s+/g, "");
  md = md.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  md = md.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  md = md.replace(/\*\*\*(.+?)\*\*\*/g, "$1");
  md = md.replace(/\*\*(.+?)\*\*/g, "$1");
  md = md.replace(/\*(.+?)\*/g, "$1");
  md = md.replace(/^[-*]\s+/gm, "");
  md = md.replace(/^>\s+/gm, "");
  md = md.replace(/^---+$/gm, "");
  return md.trim();
};

const extractFrontmatter: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const result: Record<string, string> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
};

const extractTodos: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const todos: Array<{ text: string; checked: boolean }> = [];
  for (const match of md.matchAll(/^[-*]\s+\[([ xX])\]\s+(.+)$/gm)) {
    todos.push({ text: match[2]!.trim(), checked: match[1] !== " " });
  }
  return todos;
};

const tableToArray: BuiltinHandler = (args) => {
  const md = String(args[0] ?? "");
  const lines = md.split(/\r?\n/).filter((l: any) => l.trim().startsWith("|"));
  if (lines.length < 2) return [];
  const parseRow = (line: string) => line.split("|").map((c: any) => c.trim()).filter(Boolean);
  const headers = parseRow(lines[0]!);
  const result: Record<string, string>[] = [];
  for (let i = 2; i < lines.length; i++) {
    const cells = parseRow(lines[i]!);
    const row: Record<string, string> = {};
    headers.forEach((h: any, j: any) => { row[h] = cells[j] ?? ""; });
    result.push(row);
  }
  return result;
};

const wordCount: BuiltinHandler = (args) => {
  const plain = stripMarkdown(args) as string;
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
};

export const MarkdownFunctions: Record<string, BuiltinHandler> = {
  toHtml, extractHeadings, extractLinks, extractImages, extractCodeBlocks, stripMarkdown, extractFrontmatter, extractTodos, tableToArray, wordCount,
};

export const MarkdownFunctionMetadata = {
  toHtml: { description: "Convert markdown to basic HTML", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "HTML string", example: 'markdown.toHtml "# Hello"' },
  extractHeadings: { description: "Extract all headings with their levels", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {level, text}", example: "markdown.extractHeadings $md" },
  extractLinks: { description: "Extract all links", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {text, url}", example: "markdown.extractLinks $md" },
  extractImages: { description: "Extract all images", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {alt, src}", example: "markdown.extractImages $md" },
  extractCodeBlocks: { description: "Extract fenced code blocks", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {language, code}", example: "markdown.extractCodeBlocks $md" },
  stripMarkdown: { description: "Strip all markdown formatting to plain text", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "Plain text", example: "markdown.stripMarkdown $md" },
  extractFrontmatter: { description: "Parse YAML frontmatter from markdown", parameters: [{ name: "markdown", dataType: "string", description: "Markdown with frontmatter", formInputType: "textarea", required: true }], returnType: "object", returnDescription: "Key-value object or null", example: "markdown.extractFrontmatter $md" },
  extractTodos: { description: "Extract task list items", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of {text, checked}", example: "markdown.extractTodos $md" },
  tableToArray: { description: "Parse a markdown table into array of objects", parameters: [{ name: "markdown", dataType: "string", description: "Markdown table", formInputType: "textarea", required: true }], returnType: "array", returnDescription: "Array of row objects", example: "markdown.tableToArray $table" },
  wordCount: { description: "Count words in markdown (stripping formatting)", parameters: [{ name: "markdown", dataType: "string", description: "Markdown string", formInputType: "textarea", required: true }], returnType: "number", returnDescription: "Word count", example: "markdown.wordCount $md" },
};

export const MarkdownModuleMetadata = {
  description: "Markdown processing: convert to HTML, extract headings, links, images, code blocks, frontmatter, and tables",
  methods: ["toHtml", "extractHeadings", "extractLinks", "extractImages", "extractCodeBlocks", "stripMarkdown", "extractFrontmatter", "extractTodos", "tableToArray", "wordCount"],
};
