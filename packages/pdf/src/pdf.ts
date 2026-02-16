import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import PDFDocument from "pdfkit";
import pdfParse from "pdf-parse";
import { createWriteStream, readFileSync } from "node:fs";

// ── Function Handlers ───────────────────────────────────────────────

const generate: BuiltinHandler = async (args) => {
  const outputPath = String(args[0] ?? "output.pdf");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  return new Promise<{ path: string; pages: number }>((resolve, reject) => {
    const doc = new PDFDocument({
      size: String(opts.size ?? "A4") as "A4" | "letter",
      margin: Number(opts.margin ?? 50),
    });

    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    // Title
    if (opts.title) {
      doc.fontSize(Number(opts.titleSize ?? 24)).font("Helvetica-Bold").text(String(opts.title), { align: "center" });
      doc.moveDown();
    }

    // Author
    if (opts.author) {
      doc.fontSize(12).font("Helvetica").text(`By: ${opts.author}`, { align: "center" });
      doc.moveDown(2);
    }

    // Content
    if (opts.content) {
      doc.fontSize(Number(opts.fontSize ?? 12)).font("Helvetica").text(String(opts.content));
    }

    // Sections
    if (Array.isArray(opts.sections)) {
      for (const section of opts.sections as Record<string, unknown>[]) {
        if (section.heading) {
          doc.moveDown().fontSize(Number(section.headingSize ?? 18)).font("Helvetica-Bold").text(String(section.heading));
          doc.moveDown(0.5);
        }
        if (section.text) {
          doc.fontSize(Number(section.fontSize ?? 12)).font("Helvetica").text(String(section.text));
        }
        if (section.list && Array.isArray(section.list)) {
          doc.fontSize(12).font("Helvetica");
          for (const item of section.list as string[]) {
            doc.text(`  • ${item}`);
          }
        }
        if (section.pageBreak) doc.addPage();
      }
    }

    // Footer
    if (opts.footer) {
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(10).font("Helvetica").text(String(opts.footer), 50, doc.page.height - 50, { align: "center", width: doc.page.width - 100 });
      }
    }

    doc.end();
    stream.on("finish", () => resolve({ path: outputPath, pages: doc.bufferedPageRange().count }));
    stream.on("error", reject);
  });
};

const parse: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return {
    text: data.text,
    pages: data.numpages,
    info: data.info,
    metadata: data.metadata,
  };
};

const extractText: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
};

const pageCount: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.numpages;
};

const metadata: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return { info: data.info, metadata: data.metadata, pages: data.numpages };
};

const generateTable: BuiltinHandler = async (args) => {
  const outputPath = String(args[0] ?? "table.pdf");
  const headers = Array.isArray(args[1]) ? args[1].map(String) : [];
  const rows = Array.isArray(args[2]) ? args[2] : [];
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  return new Promise<{ path: string }>((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40, layout: opts.landscape ? "landscape" : "portrait" });
    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    if (opts.title) {
      doc.fontSize(16).font("Helvetica-Bold").text(String(opts.title), { align: "center" });
      doc.moveDown();
    }

    const colWidth = (doc.page.width - 80) / headers.length;
    const startX = 40;
    let y = doc.y;

    // Headers
    doc.fontSize(10).font("Helvetica-Bold");
    headers.forEach((h, i) => { doc.text(h, startX + i * colWidth, y, { width: colWidth, align: "left" }); });
    y += 20;
    doc.moveTo(startX, y).lineTo(doc.page.width - 40, y).stroke();
    y += 5;

    // Rows
    doc.font("Helvetica").fontSize(9);
    for (const row of rows) {
      const cells = Array.isArray(row) ? row.map(String) : Object.values(row as Record<string, unknown>).map(String);
      if (y > doc.page.height - 60) { doc.addPage(); y = 40; }
      cells.forEach((cell, i) => { doc.text(cell, startX + i * colWidth, y, { width: colWidth, align: "left" }); });
      y += 18;
    }

    doc.end();
    stream.on("finish", () => resolve({ path: outputPath }));
    stream.on("error", reject);
  });
};

const generateFromHtml: BuiltinHandler = async (args) => {
  const outputPath = String(args[0] ?? "output.pdf");
  const html = String(args[1] ?? "");

  // Simple HTML to text conversion for PDFKit (basic support)
  const text = html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, (_, t) => `\n\n### ${t}\n`)
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, t) => `\n\n## ${t}\n`)
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, (_, t) => `\n# ${t}\n`)
    .replace(/<p[^>]*>(.*?)<\/p>/gi, (_, t) => `${t}\n\n`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, (_, t) => `• ${t}\n`)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

  return await generate([outputPath, { content: text }]);
};

// ── Exports ─────────────────────────────────────────────────────────

export const PdfFunctions: Record<string, BuiltinHandler> = {
  generate, parse, extractText, pageCount, metadata, generateTable, generateFromHtml,
};

export const PdfFunctionMetadata: Record<string, FunctionMetadata> = {
  generate: { description: "Generate a PDF document with title, content, and sections", parameters: [{ name: "outputPath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{title, author, content, sections, footer, size, margin, fontSize}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, pages}", example: 'pdf.generate "./report.pdf" {"title": "Monthly Report", "content": "..."}' },
  parse: { description: "Parse a PDF file and extract text, metadata, and page count", parameters: [{ name: "filePath", dataType: "string", description: "Path to PDF file", formInputType: "text", required: true }], returnType: "object", returnDescription: "{text, pages, info, metadata}", example: 'pdf.parse "./document.pdf"' },
  extractText: { description: "Extract all text from a PDF file", parameters: [{ name: "filePath", dataType: "string", description: "Path to PDF file", formInputType: "text", required: true }], returnType: "string", returnDescription: "Extracted text content", example: 'pdf.extractText "./document.pdf"' },
  pageCount: { description: "Get the number of pages in a PDF", parameters: [{ name: "filePath", dataType: "string", description: "Path to PDF file", formInputType: "text", required: true }], returnType: "number", returnDescription: "Page count", example: 'pdf.pageCount "./document.pdf"' },
  metadata: { description: "Get PDF metadata (author, title, creation date, etc.)", parameters: [{ name: "filePath", dataType: "string", description: "Path to PDF file", formInputType: "text", required: true }], returnType: "object", returnDescription: "{info, metadata, pages}", example: 'pdf.metadata "./document.pdf"' },
  generateTable: { description: "Generate a PDF with a formatted table", parameters: [{ name: "outputPath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "headers", dataType: "array", description: "Column headers", formInputType: "text", required: true }, { name: "rows", dataType: "array", description: "Array of row arrays or objects", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{title, landscape}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path}", example: 'pdf.generateTable "./table.pdf" ["Name","Email"] $rows' },
  generateFromHtml: { description: "Generate a PDF from basic HTML content", parameters: [{ name: "outputPath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "html", dataType: "string", description: "HTML content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, pages}", example: 'pdf.generateFromHtml "./output.pdf" "<h1>Title</h1><p>Content</p>"' },
};

export const PdfModuleMetadata: ModuleMetadata = {
  description: "PDF generation (documents, tables, HTML-to-PDF) and parsing (text extraction, metadata, page count)",
  methods: ["generate", "parse", "extractText", "pageCount", "metadata", "generateTable", "generateFromHtml"],
};
