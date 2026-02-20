#!/usr/bin/env node
/**
 * generate-readmes.mjs
 *
 * Processes all @robinpath/* packages:
 *   1. Reads DOCS.md (frontmatter + content)
 *   2. Renames DOCS.md → MODULE.md
 *   3. Generates a professional README.md for npm
 */

import { readdir, readFile, rename, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const PACKAGES_DIR = join(import.meta.dirname, "packages");

// ─── Category display names & related module map ────────────────────────────

const CATEGORY_LABELS = {
  utility: "Utility",
  web: "Web",
  messaging: "Messaging",
  database: "Database",
  cms: "CMS",
  cloud: "Cloud",
  ai: "AI",
  devops: "DevOps",
  crm: "CRM",
  ecommerce: "E-Commerce",
  productivity: "Productivity",
  finance: "Finance",
  analytics: "Analytics",
  storage: "Storage",
  security: "Security",
  communication: "Communication",
  marketing: "Marketing",
  social: "Social",
  testing: "Testing",
  auth: "Auth",
  network: "Network",
  file: "File",
  data: "Data",
  email: "Email",
};

const AUTH_LABELS = {
  none: "No Auth",
  "api-key": "API Key",
  "bearer-token": "Bearer Token",
  oauth: "OAuth",
  "basic-auth": "Basic Auth",
};

// ─── Parsing helpers ────────────────────────────────────────────────────────

/** Normalize Windows \r\n to \n */
function normalize(content) {
  return content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    // Strip quotes
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    // Handle arrays like [a, b]
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    }
    fm[key] = val;
  }
  return fm;
}

function extractSection(content, heading) {
  // Use indexOf-based approach to avoid multiline regex issues
  const marker = `## ${heading}`;
  const startIdx = content.indexOf(`\n${marker}`);
  if (startIdx === -1) {
    // Could be at the very start of content
    if (!content.startsWith(marker)) return "";
  }
  const headingStart = startIdx === -1 ? 0 : startIdx + 1;
  // Find end of heading line
  const lineEnd = content.indexOf("\n", headingStart);
  if (lineEnd === -1) return "";
  const contentStart = lineEnd + 1;
  // Find next ## heading
  const nextH2 = content.indexOf("\n## ", contentStart);
  const sectionEnd = nextH2 === -1 ? content.length : nextH2;
  return content.slice(contentStart, sectionEnd).trim();
}

function extractAuthBlock(content) {
  const section = extractSection(content, "Authentication");
  if (!section || section.includes("No authentication required")) return null;
  const codeMatch = section.match(/```robinpath\n([\s\S]*?)```/);
  return codeMatch ? codeMatch[1].trim() : null;
}

function extractUseCases(content) {
  const section = extractSection(content, "Use Cases");
  if (!section) return [];
  // Extract bullet items: - **bold text** -- description
  const items = [];
  for (const line of section.split("\n")) {
    const m = line.match(/^- \*\*(.+?)\*\*\s*--\s*Use `(.+?)`/);
    if (m) {
      items.push({ description: m[1], func: m[2] });
    }
  }
  return items;
}

function extractQuickReference(content) {
  const section = extractSection(content, "Quick Reference");
  if (!section) return [];
  const rows = [];
  for (const line of section.split("\n")) {
    // Match table rows: | [`name`](#anchor) | description | returns |
    const m = line.match(
      /\|\s*\[`(.+?)`\]\(#.+?\)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/
    );
    if (m) {
      rows.push({ name: m[1], description: m[2].trim(), returns: m[3].trim() });
    }
  }
  return rows;
}

function extractFunctionExamples(content, moduleName) {
  const section = extractSection(content, "Functions");
  if (!section) return [];
  // Split by ### to get individual functions
  const blocks = section.split(/\n### /).filter(Boolean);
  const examples = [];
  for (const block of blocks) {
    const nameMatch = block.match(/^(\w+)/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    const descMatch = block.match(/\n\n(.+?)\n/);
    const desc = descMatch ? descMatch[1].trim() : "";
    const codeMatch = block.match(/```robinpath\n([\s\S]*?)```/);
    if (codeMatch) {
      examples.push({
        name,
        description: desc,
        code: codeMatch[1].trim(),
      });
    }
  }
  return examples;
}

function extractRelatedModules(content) {
  const section = extractSection(content, "Related Modules");
  if (!section) return [];
  const modules = [];
  for (const line of section.split("\n")) {
    const m = line.match(/^- \*\*(\w[\w-]*)\*\*\s*--\s*(.+)/);
    if (m) {
      modules.push({ name: m[1], description: m[2].trim() });
    }
  }
  return modules;
}

// ─── README generation ──────────────────────────────────────────────────────

function generateReadme(fm, content) {
  const mod = fm.module || "unknown";
  const pkg = fm.package || `@robinpath/${mod}`;
  const desc = fm.description || `${fm.title} module for RobinPath`;
  const category = fm.category || "utility";
  const categoryLabel = CATEGORY_LABELS[category] || capitalize(category);
  const funcCount = fm.functionCount || "0";
  const authType = fm.auth || "none";
  const authLabel = AUTH_LABELS[authType] || authType;

  const authBlock = extractAuthBlock(content);
  const useCases = extractUseCases(content);
  const quickRef = extractQuickReference(content);
  const examples = extractFunctionExamples(content, mod);
  const related = extractRelatedModules(content);

  // Pick 2-3 best examples (skip setCredentials/setToken, prefer variety)
  const exampleFuncs = examples.filter(
    (e) =>
      !e.name.startsWith("set") ||
      (!e.name.toLowerCase().includes("credential") &&
        !e.name.toLowerCase().includes("token"))
  );
  const selectedExamples = exampleFuncs.slice(0, 3);

  // Build the first example for Quick Start
  const quickStartExample = selectedExamples[0] || examples[0];

  const lines = [];

  // ── Title & description
  lines.push(`# ${pkg}`);
  lines.push("");
  lines.push(`> ${desc}`);
  lines.push("");

  // ── Badges
  const badges = [];
  badges.push(
    `![Category](https://img.shields.io/badge/category-${encodeURIComponent(categoryLabel)}-blue)`
  );
  badges.push(
    `![Functions](https://img.shields.io/badge/functions-${funcCount}-green)`
  );
  if (authType !== "none") {
    badges.push(
      `![Auth](https://img.shields.io/badge/auth-${encodeURIComponent(authLabel)}-orange)`
    );
  } else {
    badges.push(
      `![Auth](https://img.shields.io/badge/auth-none-lightgrey)`
    );
  }
  badges.push(
    `![License](https://img.shields.io/badge/license-MIT-brightgreen)`
  );
  lines.push(badges.join(" "));
  lines.push("");

  // ── Why use this module?
  lines.push("## Why use this module?");
  lines.push("");
  if (useCases.length > 0) {
    lines.push(
      `The \`${mod}\` module lets you:`
    );
    lines.push("");
    for (const uc of useCases.slice(0, 5)) {
      lines.push(`- ${uc.description}`);
    }
    lines.push("");
    lines.push(
      `All functions are callable directly from RobinPath scripts with a simple, consistent API.`
    );
  } else {
    lines.push(
      `Use the \`${mod}\` module to integrate ${categoryLabel.toLowerCase()} capabilities into your RobinPath scripts.`
    );
  }
  lines.push("");

  // ── Installation
  lines.push("## Installation");
  lines.push("");
  lines.push("```bash");
  lines.push(`npm install ${pkg}`);
  lines.push("```");
  lines.push("");

  // ── Quick Start
  lines.push("## Quick Start");
  lines.push("");
  if (authBlock) {
    lines.push("**1. Set up credentials**");
    lines.push("");
    lines.push("```robinpath");
    lines.push(authBlock);
    lines.push("```");
    lines.push("");
    if (quickStartExample) {
      lines.push(`**2. ${quickStartExample.description || `Use ${mod}.${quickStartExample.name}`}**`);
      lines.push("");
      lines.push("```robinpath");
      lines.push(quickStartExample.code);
      lines.push("```");
    }
  } else {
    lines.push("No credentials needed — start using it right away:");
    lines.push("");
    if (quickStartExample) {
      lines.push("```robinpath");
      lines.push(quickStartExample.code);
      lines.push("```");
    }
  }
  lines.push("");

  // ── Available Functions
  lines.push("## Available Functions");
  lines.push("");
  if (quickRef.length > 0) {
    lines.push("| Function | Description |");
    lines.push("|----------|-------------|");
    for (const row of quickRef) {
      lines.push(`| \`${mod}.${row.name}\` | ${row.description} |`);
    }
  }
  lines.push("");

  // ── Examples
  if (selectedExamples.length > 0) {
    lines.push("## Examples");
    lines.push("");
    for (let i = 0; i < selectedExamples.length; i++) {
      const ex = selectedExamples[i];
      lines.push(
        `### ${ex.description || `${mod}.${ex.name}`}`
      );
      lines.push("");
      lines.push("```robinpath");
      lines.push(ex.code);
      lines.push("```");
      lines.push("");
    }
  }

  // ── Integration with RobinPath
  lines.push("## Integration with RobinPath");
  lines.push("");
  lines.push("```typescript");
  lines.push(`import { RobinPath } from "@wiredwp/robinpath";`);
  lines.push(`import Module from "${pkg}";`);
  lines.push("");
  lines.push("const rp = new RobinPath();");
  lines.push(`rp.registerModule(Module.name, Module.functions);`);
  lines.push(`rp.registerModuleMeta(Module.name, Module.functionMetadata);`);
  lines.push("");
  lines.push(`const result = await rp.executeScript(\``);
  if (authBlock) {
    // Show a condensed version of auth + first function
    lines.push(`  ${authBlock.split("\n")[0]}`);
    if (quickStartExample) {
      lines.push(`  ${quickStartExample.code.split("\n")[0]}`);
    }
  } else if (quickStartExample) {
    lines.push(`  ${quickStartExample.code.split("\n")[0]}`);
  } else {
    lines.push(`  ${mod}.help`);
  }
  lines.push(`\`);`);
  lines.push("```");
  lines.push("");

  // ── Full API Reference
  lines.push("## Full API Reference");
  lines.push("");
  lines.push(
    `See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.`
  );
  lines.push("");

  // ── Related Modules
  if (related.length > 0) {
    lines.push("## Related Modules");
    lines.push("");
    for (const rel of related) {
      lines.push(`- [\`@robinpath/${rel.name}\`](../${rel.name}) — ${rel.description}`);
    }
    lines.push("");
  }

  // ── License
  lines.push("## License");
  lines.push("");
  lines.push("MIT");
  lines.push("");

  return lines.join("\n");
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const dirs = await readdir(PACKAGES_DIR);
  let processed = 0;
  let skipped = 0;
  const errors = [];

  for (const dir of dirs.sort()) {
    const pkgDir = join(PACKAGES_DIR, dir);
    const docsPath = join(pkgDir, "DOCS.md");
    const modulePath = join(pkgDir, "MODULE.md");
    const readmePath = join(pkgDir, "README.md");

    // Read from MODULE.md (already renamed) or DOCS.md
    let sourcePath;
    let needsRename = false;
    try {
      await access(modulePath);
      sourcePath = modulePath;
    } catch {
      try {
        await access(docsPath);
        sourcePath = docsPath;
        needsRename = true;
      } catch {
        skipped++;
        continue;
      }
    }

    try {
      const raw = await readFile(sourcePath, "utf-8");
      const content = normalize(raw);
      const fm = parseFrontmatter(content);

      // Generate README
      const readme = generateReadme(fm, content);
      await writeFile(readmePath, readme, "utf-8");

      // Rename DOCS.md → MODULE.md if not already done
      if (needsRename) {
        await rename(docsPath, modulePath);
      }

      processed++;
      if (processed % 20 === 0) {
        console.log(`  ... ${processed} packages processed`);
      }
    } catch (err) {
      errors.push({ dir, error: err.message });
    }
  }

  console.log(`\nDone!`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Skipped (no DOCS.md): ${skipped}`);
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    for (const e of errors) {
      console.log(`    - ${e.dir}: ${e.error}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
