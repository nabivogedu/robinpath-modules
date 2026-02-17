import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";

// ── HTML Escaping ───────────────────────────────────────────────────

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_ESCAPE_RE = /[&<>"']/g;

function escapeHtml(str: string): string {
  return str.replace(HTML_ESCAPE_RE, (ch: any) => HTML_ESCAPE_MAP[ch]!);
}

// ── Dot-notation property access ────────────────────────────────────

function resolvePath(obj: unknown, path: string): any {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

// ── Mustache-like Template Engine ───────────────────────────────────

/**
 * Render a Mustache-like template string against a data object.
 *
 * Supported syntax:
 *  - {{variable}}          HTML-escaped variable substitution
 *  - {{{variable}}}        Unescaped variable substitution
 *  - {{#section}}...{{/section}}  Conditional / loop block
 *  - {{^section}}...{{/section}}  Inverted (falsy/empty) block
 *  - {{! comment }}        Comment (removed from output)
 *  - Dot notation: {{a.b.c}}
 */
function renderTemplate(template: string, data: Record<string, unknown>): string {
  return renderTokens(template, data);
}

function renderTokens(template: string, context: Record<string, unknown>): string {
  let result = "";
  let pos = 0;

  while (pos < template.length) {
    // Find the next opening tag
    const openIdx = template.indexOf("{{", pos);
    if (openIdx === -1) {
      // No more tags — append the rest as literal text
      result += template.slice(pos);
      break;
    }

    // Append literal text before the tag
    result += template.slice(pos, openIdx);

    // Check for triple-stash {{{...}}}
    if (template[openIdx + 2] === "{") {
      const closeIdx = template.indexOf("}}}", openIdx + 3);
      if (closeIdx === -1) {
        throw new Error(`Unclosed unescaped tag starting at position ${openIdx}`);
      }
      const key = template.slice(openIdx + 3, closeIdx).trim();
      const value = resolvePath(context, key);
      result += value != null ? String(value) : "";
      pos = closeIdx + 3;
      continue;
    }

    const closeIdx = template.indexOf("}}", openIdx + 2);
    if (closeIdx === -1) {
      throw new Error(`Unclosed tag starting at position ${openIdx}`);
    }

    const tag = template.slice(openIdx + 2, closeIdx).trim();

    // Comment tag: {{! ... }}
    if (tag.startsWith("!")) {
      pos = closeIdx + 2;
      continue;
    }

    // Section opening tag: {{#name}}
    if (tag.startsWith("#")) {
      const name = tag.slice(1).trim();
      const { body, pos: afterClose } = extractSection(template, name, closeIdx + 2);
      const value = resolvePath(context, name);

      if (Array.isArray(value)) {
        // Loop: repeat the body for each item
        for (const item of value) {
          const itemContext =
            item != null && typeof item === "object" && !Array.isArray(item)
              ? { ...context, ...(item as Record<string, unknown>) }
              : { ...context, ".": item };
          result += renderTokens(body, itemContext);
        }
      } else if (value) {
        // Truthy: render the body once
        const innerContext =
          value != null && typeof value === "object" && !Array.isArray(value)
            ? { ...context, ...(value as Record<string, unknown>) }
            : context;
        result += renderTokens(body, innerContext);
      }
      // Falsy: skip the body entirely

      pos = afterClose;
      continue;
    }

    // Inverted section: {{^name}}
    if (tag.startsWith("^")) {
      const name = tag.slice(1).trim();
      const { body, pos: afterClose } = extractSection(template, name, closeIdx + 2);
      const value = resolvePath(context, name);

      // Render only when falsy or empty array
      const isEmpty = !value || (Array.isArray(value) && value.length === 0);
      if (isEmpty) {
        result += renderTokens(body, context);
      }

      pos = afterClose;
      continue;
    }

    // Closing section tag should never appear here at top level
    if (tag.startsWith("/")) {
      throw new Error(`Unexpected closing tag {{/${tag.slice(1).trim()}}} at position ${openIdx}`);
    }

    // Variable tag: {{name}} — HTML-escaped
    const value = resolvePath(context, tag);
    result += value != null ? escapeHtml(String(value)) : "";
    pos = closeIdx + 2;
  }

  return result;
}

/**
 * Extract the body of a section from the template, handling nesting.
 * `startPos` is the position immediately after the opening tag's `}}`.
 * Returns the body text and the position immediately after the closing `{{/name}}`.
 */
function extractSection(
  template: string,
  name: string,
  startPos: number,
): { body: string; pos: number } {
  let depth = 1;
  let pos = startPos;

  while (pos < template.length) {
    const nextOpen = template.indexOf("{{", pos);
    if (nextOpen === -1) {
      throw new Error(`Unclosed section "{{#${name}}}": no matching "{{/${name}}}" found`);
    }

    const closeTag = template.indexOf("}}", nextOpen + 2);
    if (closeTag === -1) {
      throw new Error(`Unclosed tag starting at position ${nextOpen}`);
    }

    const inner = template.slice(nextOpen + 2, closeTag).trim();

    if (inner === `#${name}` || inner === `^ ${name}`) {
      depth++;
    } else if (inner === `/${name}`) {
      depth--;
      if (depth === 0) {
        const body = template.slice(startPos, nextOpen);
        return { body, pos: closeTag + 2 };
      }
    }

    pos = closeTag + 2;
  }

  throw new Error(`Unclosed section "{{#${name}}}": no matching "{{/${name}}}" found`);
}

// ── Syntax Validation ───────────────────────────────────────────────

function validateTemplate(template: string): true {
  const sectionStack: { name: string; pos: number }[] = [];
  let pos = 0;

  while (pos < template.length) {
    const openIdx = template.indexOf("{{", pos);
    if (openIdx === -1) break;

    // Triple stash
    if (template[openIdx + 2] === "{") {
      const closeIdx = template.indexOf("}}}", openIdx + 3);
      if (closeIdx === -1) {
        throw new Error(`Unclosed unescaped tag "{{{" at position ${openIdx}`);
      }
      pos = closeIdx + 3;
      continue;
    }

    const closeIdx = template.indexOf("}}", openIdx + 2);
    if (closeIdx === -1) {
      throw new Error(`Unclosed tag "{{" at position ${openIdx}`);
    }

    const tag = template.slice(openIdx + 2, closeIdx).trim();

    if (tag.startsWith("#") || tag.startsWith("^")) {
      const name = tag.slice(1).trim();
      if (!name) {
        throw new Error(`Empty section name at position ${openIdx}`);
      }
      sectionStack.push({ name, pos: openIdx });
    } else if (tag.startsWith("/")) {
      const name = tag.slice(1).trim();
      if (!name) {
        throw new Error(`Empty closing tag at position ${openIdx}`);
      }
      if (sectionStack.length === 0) {
        throw new Error(`Unexpected closing tag "{{/${name}}}" at position ${openIdx} with no matching opening tag`);
      }
      const top = sectionStack.pop()!;
      if (top.name !== name) {
        throw new Error(
          `Mismatched section tags: opened "{{#${top.name}}}" at position ${top.pos} but closed with "{{/${name}}}" at position ${openIdx}`,
        );
      }
    }
    // Comments and variables don't need stack tracking

    pos = closeIdx + 2;
  }

  if (sectionStack.length > 0) {
    const unclosed = sectionStack[sectionStack.length - 1]!;
    throw new Error(
      `Unclosed section "{{#${unclosed.name}}}" opened at position ${unclosed.pos}`,
    );
  }

  return true;
}

// ── Variable Extraction ─────────────────────────────────────────────

function extractVars(template: string): string[] {
  const vars = new Set<string>();
  let pos = 0;

  while (pos < template.length) {
    const openIdx = template.indexOf("{{", pos);
    if (openIdx === -1) break;

    // Triple stash
    if (template[openIdx + 2] === "{") {
      const closeIdx = template.indexOf("}}}", openIdx + 3);
      if (closeIdx === -1) {
        pos = openIdx + 3;
        continue;
      }
      const key = template.slice(openIdx + 3, closeIdx).trim();
      if (key) vars.add(key);
      pos = closeIdx + 3;
      continue;
    }

    const closeIdx = template.indexOf("}}", openIdx + 2);
    if (closeIdx === -1) {
      pos = openIdx + 2;
      continue;
    }

    const tag = template.slice(openIdx + 2, closeIdx).trim();

    if (tag.startsWith("!")) {
      // Comment — skip
    } else if (tag.startsWith("#") || tag.startsWith("^")) {
      const name = tag.slice(1).trim();
      if (name) vars.add(name);
    } else if (tag.startsWith("/")) {
      // Closing tag — skip
    } else if (tag) {
      vars.add(tag);
    }

    pos = closeIdx + 2;
  }

  return [...vars];
}

// ── Simple ${key} interpolation ─────────────────────────────────────

function interpolateString(str: string, data: Record<string, unknown>): string {
  return str.replace(/\$\{([^}]+)\}/g, (_match, key: string) => {
    const value = resolvePath(data, key.trim());
    return value != null ? String(value) : "";
  });
}

// ── RobinPath Function Handlers ─────────────────────────────────────

const render: BuiltinHandler = (args) => {
  const template = String(args[0] ?? "");
  const data = (args[1] != null && typeof args[1] === "object" && !Array.isArray(args[1]))
    ? (args[1] as Record<string, unknown>)
    : {};
  return renderTemplate(template, data);
};

const renderFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const data = (args[1] != null && typeof args[1] === "object" && !Array.isArray(args[1]))
    ? (args[1] as Record<string, unknown>)
    : {};
  const template = readFileSync(filePath, "utf-8");
  return renderTemplate(template, data);
};

const escape: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  return escapeHtml(str);
};

const compile: BuiltinHandler = (args) => {
  const template = String(args[0] ?? "");
  return validateTemplate(template);
};

const extractVariables: BuiltinHandler = (args) => {
  const template = String(args[0] ?? "");
  return extractVars(template);
};

const renderString: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "");
  const data = (args[1] != null && typeof args[1] === "object" && !Array.isArray(args[1]))
    ? (args[1] as Record<string, unknown>)
    : {};
  return interpolateString(str, data);
};

// ── Exports ─────────────────────────────────────────────────────────

export const TemplateFunctions: Record<string, BuiltinHandler> = {
  render,
  renderFile,
  escape,
  compile,
  extractVariables,
  renderString,
};

export const TemplateFunctionMetadata = {
  render: {
    description: "Render a Mustache-like template string with variable substitution, sections, and loops",
    parameters: [
      {
        name: "template",
        dataType: "string",
        description: "The template string containing {{variable}}, {{{unescaped}}}, {{#section}}...{{/section}}, {{^inverted}}...{{/inverted}}, and {{! comment }} tags",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "data",
        dataType: "object",
        description: "Key-value data object for variable substitution. Supports nested objects via dot notation.",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The rendered template string with all tags resolved",
    example: 'template.render "Hello, {{name}}!" { "name": "World" }',
  },
  renderFile: {
    description: "Read a template from a file and render it with the provided data object",
    parameters: [
      {
        name: "templateFilePath",
        dataType: "string",
        description: "Absolute or relative path to the template file",
        formInputType: "text",
        required: true,
      },
      {
        name: "data",
        dataType: "object",
        description: "Key-value data object for variable substitution. Supports nested objects via dot notation.",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The rendered template string with all tags resolved",
    example: 'template.renderFile "/tmp/greeting.mustache" { "name": "World" }',
  },
  escape: {
    description: "HTML-escape a string, converting &, <, >, \", and ' to their HTML entity equivalents",
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
    returnDescription: "The HTML-escaped string",
    example: 'template.escape "<script>alert(1)</script>"',
  },
  compile: {
    description: "Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors",
    parameters: [
      {
        name: "template",
        dataType: "string",
        description: "The template string to validate",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the template syntax is valid. Throws an error with details if invalid.",
    example: 'template.compile "{{#items}}{{name}}{{/items}}"',
  },
  extractVariables: {
    description: "Extract all unique variable and section names used in a template",
    parameters: [
      {
        name: "template",
        dataType: "string",
        description: "The template string to analyze",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Deduplicated array of all variable and section names found in the template",
    example: 'template.extractVariables "{{greeting}}, {{name}}! {{#show}}Visible{{/show}}"',
  },
  renderString: {
    description: "Simple string interpolation using ${key} placeholders (no sections or loops)",
    parameters: [
      {
        name: "string",
        dataType: "string",
        description: "The string containing ${key} placeholders for substitution",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "data",
        dataType: "object",
        description: "Key-value data object for placeholder substitution. Supports dot notation.",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The string with all ${key} placeholders replaced by their values",
    example: 'template.renderString "Hello, ${name}!" { "name": "World" }',
  },
};

export const TemplateModuleMetadata = {
  description: "Mustache-like template engine with variable substitution, conditional sections, loops, and simple string interpolation",
  methods: ["render", "renderFile", "escape", "compile", "extractVariables", "renderString"],
};
