import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  ImageRun, PageBreak, TabStopPosition, TabStopType,
  ShadingType, convertInchesToTwip, LevelFormat,
  NumberFormat, Footer, Header, PageNumber, PageNumberSeparator,
  // Enterprise features
  ExternalHyperlink, BookmarkStart, BookmarkEnd,
  TableOfContents, FootnoteReferenceRun,
  CommentRangeStart, CommentRangeEnd, CommentReference, Comment,
  SectionType, PageOrientation,
  patchDocument, PatchType,
} from "docx";
import { readFileSync, writeFileSync } from "fs";
import { extname } from "path";
import mammoth from "mammoth";
import ExcelJS from "exceljs";
import PptxGenJS from "pptxgenjs";

// ── Types ──────────────────────────────────────────────────────────

type Opts = Record<string, unknown>;

interface SectionState {
  children: (Paragraph | Table | TableOfContents)[];
  properties: Record<string, unknown>;
  headers?: { default?: Header; first?: Header; even?: Header };
  footers?: { default?: Footer; first?: Footer; even?: Footer };
}

interface DocState {
  sections: SectionState[];
  activeSection: number;
  options: Opts;
  defaults: {
    font?: string;
    fontSize?: number;
    color?: string;
    lineSpacing?: number;
    firstLineIndent?: number; // cm
    alignment?: string;
  };
  footnotes: Record<number, { children: Paragraph[] }>;
  footnoteCounter: number;
  comments: Array<{ id: number; author: string; date: Date; children: Paragraph[] }>;
  commentCounter: number;
  styles: { paragraph: Record<string, unknown>[]; character: Record<string, unknown>[] };
  properties: { title?: string; author?: string; subject?: string; keywords?: string; description?: string };
}

// mm → twip conversion (1 mm = 56.7 twip, or 1440 twip / 25.4 mm)
function mmToTwip(mm: number): number {
  return Math.round(mm * 56.692913);
}

// ── Internal State ──────────────────────────────────────────────────

const docs = new Map<string, DocState>();
const workbooks = new Map<string, ExcelJS.Workbook>();
const presentations = new Map<string, PptxGenJS>();
const presSlides = new Map<string, PptxGenJS.Slide[]>();

// ── Shared Helpers ──────────────────────────────────────────────────

function getOpts(arg: unknown): Opts {
  return (typeof arg === "object" && arg !== null ? arg : {}) as Opts;
}

function getActiveSection(doc: DocState): SectionState {
  return doc.sections[doc.activeSection]!;
}

function colLetterToNumber(col: string): number {
  let num = 0;
  for (let i = 0; i < col.length; i++) {
    num = num * 26 + (col.toUpperCase().charCodeAt(i) - 64);
  }
  return num;
}

function colNumberToLetter(num: number): string {
  let result = "";
  while (num > 0) {
    num--;
    result = String.fromCharCode(65 + (num % 26)) + result;
    num = Math.floor(num / 26);
  }
  return result;
}

function toAlignment(val: unknown): (typeof AlignmentType)[keyof typeof AlignmentType] | undefined {
  switch (String(val ?? "").toLowerCase()) {
    case "center": return AlignmentType.CENTER;
    case "right": return AlignmentType.RIGHT;
    case "justify": return AlignmentType.JUSTIFIED;
    case "left": return AlignmentType.LEFT;
    default: return undefined;
  }
}

function toHeadingLevel(level: number): (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined {
  switch (level) {
    case 1: return HeadingLevel.HEADING_1;
    case 2: return HeadingLevel.HEADING_2;
    case 3: return HeadingLevel.HEADING_3;
    case 4: return HeadingLevel.HEADING_4;
    case 5: return HeadingLevel.HEADING_5;
    case 6: return HeadingLevel.HEADING_6;
    default: return undefined;
  }
}

function buildTextRun(text: string, opts: Opts, docDefaults?: DocState["defaults"]): TextRun {
  const runOpts: Record<string, unknown> = { text };
  if (opts.bold) runOpts.bold = true;
  if (opts.italic) runOpts.italics = true;
  if (opts.underline) runOpts.underline = {};
  if (opts.strike) runOpts.strike = true;
  // Font size: use explicit > doc default
  const fontSize = opts.fontSize ? Number(opts.fontSize) : docDefaults?.fontSize;
  if (fontSize) runOpts.size = fontSize * 2; // half-points
  // Font family
  const font = opts.font ? String(opts.font) : docDefaults?.font;
  if (font) runOpts.font = font;
  // Color
  const color = opts.color ? String(opts.color).replace("#", "") : docDefaults?.color;
  if (color) runOpts.color = color;
  if (opts.highlight) runOpts.highlight = String(opts.highlight);
  if (opts.superscript) runOpts.superScript = true;
  if (opts.subscript) runOpts.subScript = true;
  if (opts.allCaps) runOpts.allCaps = true;
  return new TextRun(runOpts as ConstructorParameters<typeof TextRun>[0]);
}

function buildParagraphOpts(opts: Opts, docDefaults?: DocState["defaults"]): Record<string, unknown> {
  const pOpts: Record<string, unknown> = {};
  const alignment = toAlignment(opts.alignment ?? opts.align ?? docDefaults?.alignment);
  if (alignment) pOpts.alignment = alignment;

  // Spacing: explicit > doc default
  if (opts.spacing || docDefaults?.lineSpacing) {
    const sp = getOpts(opts.spacing ?? {});
    const lineSpacing = sp.line ? Number(sp.line) : docDefaults?.lineSpacing;
    pOpts.spacing = {
      before: sp.before ? Number(sp.before) : undefined,
      after: sp.after ? Number(sp.after) : undefined,
      line: lineSpacing ? Number(lineSpacing) : undefined,
    };
  }

  // Indent: explicit > doc default firstLineIndent
  if (opts.indent || docDefaults?.firstLineIndent) {
    const ind = getOpts(opts.indent ?? {});
    const firstLine = ind.firstLine
      ? convertInchesToTwip(Number(ind.firstLine))
      : docDefaults?.firstLineIndent
        ? mmToTwip(docDefaults.firstLineIndent * 10) // cm to mm
        : undefined;
    pOpts.indent = {
      left: ind.left ? convertInchesToTwip(Number(ind.left)) : undefined,
      right: ind.right ? convertInchesToTwip(Number(ind.right)) : undefined,
      firstLine,
    };
  }

  if (opts.backgroundColor || opts.bgColor) {
    pOpts.shading = {
      type: ShadingType.SOLID,
      color: String(opts.backgroundColor ?? opts.bgColor).replace("#", ""),
    };
  }

  // keepNext: prevent title from appearing at bottom without following text
  if (opts.keepNext) pOpts.keepNext = true;
  // keepLines: keep all lines of paragraph together
  if (opts.keepLines) pOpts.keepLines = true;
  // pageBreakBefore: start on new page
  if (opts.pageBreakBefore) pOpts.pageBreakBefore = true;
  // widowControl
  if (opts.widowControl !== undefined) pOpts.widowControl = Boolean(opts.widowControl);

  return pOpts;
}

// ══════════════════════════════════════════════════════════════════
//  WORD (DOCX) FUNCTIONS
// ══════════════════════════════════════════════════════════════════

const createDoc: BuiltinHandler = (args) => {
  const id = String(args[0] ?? `doc_${Date.now()}`);
  const opts = getOpts(args[1]);

  // Extract default styling
  const defaultStyle = getOpts(opts.defaultStyle ?? opts.defaults ?? {});
  const defaults = {
    font: defaultStyle.font ? String(defaultStyle.font) : undefined,
    fontSize: defaultStyle.fontSize ? Number(defaultStyle.fontSize) : undefined,
    color: defaultStyle.color ? String(defaultStyle.color).replace("#", "") : undefined,
    lineSpacing: defaultStyle.lineSpacing ? Number(defaultStyle.lineSpacing) : undefined,
    firstLineIndent: defaultStyle.firstLineIndent ? Number(defaultStyle.firstLineIndent) : undefined,
    alignment: defaultStyle.alignment ? String(defaultStyle.alignment) : undefined,
  };

  docs.set(id, {
    sections: [{ children: [], properties: {}, headers: undefined, footers: undefined }],
    activeSection: 0,
    options: opts,
    defaults,
    footnotes: {},
    footnoteCounter: 0,
    comments: [],
    commentCounter: 0,
    styles: { paragraph: [], character: [] },
    properties: {},
  });
  return id;
};

const readDoc: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const format = String(args[1] ?? "text").toLowerCase();
  const buffer = readFileSync(filePath);
  if (format === "html") {
    const result = await mammoth.convertToHtml({ buffer });
    return result.value;
  }
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

const addHeading: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const level = Number(args[2] ?? 1);
  const opts = getOpts(args[3]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  // Headings auto-get keepNext (prevents title at bottom without following text)
  if (opts.keepNext === undefined) opts.keepNext = true;

  const pOpts = buildParagraphOpts(opts, doc.defaults);
  pOpts.heading = toHeadingLevel(level);
  // For headings, don't apply default firstLineIndent (headings shouldn't be indented)
  if (pOpts.indent) {
    const indent = pOpts.indent as Record<string, unknown>;
    if (!opts.indent) delete indent.firstLine;
  }
  pOpts.children = [buildTextRun(text, opts)];

  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const addParagraph: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  // Support multiple text runs via "runs" array
  const runs = Array.isArray(opts.runs) ? opts.runs as Opts[] : null;

  const pOpts = buildParagraphOpts(opts, doc.defaults);
  if (runs) {
    pOpts.children = runs.map((r) => buildTextRun(String(r.text ?? ""), r, doc.defaults));
  } else {
    pOpts.children = [buildTextRun(text, opts, doc.defaults)];
  }

  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const addTable: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const data = args[1];
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  if (!Array.isArray(data) || data.length === 0) throw new Error("Table data must be a non-empty array");

  const headerStyle = getOpts(opts.headerStyle);
  const cellStyle = getOpts(opts.cellStyle);
  const columnWidths = Array.isArray(opts.columnWidths) ? opts.columnWidths.map(Number) : null;
  const showBorders = opts.borders !== false;

  const borderConfig = showBorders ? {
    top: { style: BorderStyle.SINGLE, size: 1 },
    bottom: { style: BorderStyle.SINGLE, size: 1 },
    left: { style: BorderStyle.SINGLE, size: 1 },
    right: { style: BorderStyle.SINGLE, size: 1 },
  } : undefined;

  // If data is array of objects, extract headers
  const isObjectArray = typeof data[0] === "object" && !Array.isArray(data[0]);
  const headers = isObjectArray ? Object.keys(data[0] as Opts) : null;
  const rows: TableRow[] = [];

  // Header row
  if (headers) {
    rows.push(new TableRow({
      children: headers.map((h, ci) => new TableCell({
        children: [new Paragraph({
          alignment: toAlignment(headerStyle.alignment ?? "center"),
          children: [buildTextRun(h, {
            bold: headerStyle.bold !== false,
            fontSize: headerStyle.fontSize,
            font: headerStyle.font,
            color: headerStyle.fontColor ?? headerStyle.color ?? "FFFFFF",
          })],
        })],
        width: columnWidths ? { size: columnWidths[ci] ?? 20, type: WidthType.PERCENTAGE } : undefined,
        shading: headerStyle.fillColor ? {
          type: ShadingType.SOLID,
          color: String(headerStyle.fillColor).replace("#", ""),
        } : { type: ShadingType.SOLID, color: "2196F3" },
        borders: borderConfig,
      })),
    }));
  }

  // Data rows
  const dataRows = isObjectArray
    ? (data as Opts[]).map((row) => headers!.map((h) => String(row[h] ?? "")))
    : (data as unknown[][]).map((row) => (Array.isArray(row) ? row.map(String) : [String(row)]));

  for (let ri = 0; ri < dataRows.length; ri++) {
    const row = dataRows[ri]!;
    const isAlt = ri % 2 === 1;
    rows.push(new TableRow({
      children: row.map((cell, ci) => new TableCell({
        children: [new Paragraph({
          alignment: toAlignment(cellStyle.alignment),
          children: [buildTextRun(cell, {
            fontSize: cellStyle.fontSize,
            font: cellStyle.font,
            color: cellStyle.fontColor ?? cellStyle.color,
          })],
        })],
        width: columnWidths ? { size: columnWidths[ci] ?? 20, type: WidthType.PERCENTAGE } : undefined,
        shading: (opts.alternateRows && isAlt) ? { type: ShadingType.SOLID, color: "F5F5F5" } : undefined,
        borders: borderConfig,
      })),
    }));
  }

  getActiveSection(doc).children.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
  return true;
};

const addImage: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const imagePath = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const imageData = readFileSync(imagePath);
  const width = Number(opts.width ?? 400);
  const height = Number(opts.height ?? 300);

  const pOpts = buildParagraphOpts(opts);
  pOpts.children = [new ImageRun({
    data: imageData,
    transformation: { width, height },
    type: "png",
  })];

  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const addPageBreak: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);
  getActiveSection(doc).children.push(new Paragraph({ children: [new PageBreak()] }));
  return true;
};

const addList: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const items = args[1];
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  if (!Array.isArray(items)) throw new Error("List items must be an array");

  const isOrdered = opts.ordered === true || opts.type === "numbered";
  const level = Number(opts.level ?? 0);

  for (const item of items) {
    const listPOpts = buildParagraphOpts(opts, doc.defaults);
    // List items shouldn't have firstLineIndent (numbering handles indentation)
    if (listPOpts.indent) {
      const indent = listPOpts.indent as Record<string, unknown>;
      delete indent.firstLine;
    }
    getActiveSection(doc).children.push(new Paragraph({
      children: [buildTextRun(String(item), opts, doc.defaults)],
      numbering: { reference: isOrdered ? "ordered-list" : "bullet-list", level },
      ...listPOpts,
    } as ConstructorParameters<typeof Paragraph>[0]));
  }

  return true;
};

const addHyperlink: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const url = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const pOpts = buildParagraphOpts(opts, doc.defaults);
  const link = new ExternalHyperlink({
    children: [buildTextRun(text, { ...opts, color: opts.color ?? "0563C1", underline: opts.underline !== false }, doc.defaults)],
    link: url,
  });
  pOpts.children = [link];
  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const addBookmark: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const text = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const bookmarkId = Date.now() % 1000000;
  const pOpts = buildParagraphOpts(opts, doc.defaults);
  pOpts.children = [
    new BookmarkStart(name, bookmarkId),
    buildTextRun(text, opts, doc.defaults),
    new BookmarkEnd(bookmarkId),
  ];
  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const addTableOfContents: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = getOpts(args[1]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const tocAlias = String(opts.heading ?? "Table of Contents");
  const toc = new TableOfContents(tocAlias, {
    hyperlink: opts.hyperlink !== false,
    headingStyleRange: String(opts.headingRange ?? "1-5"),
  });
  getActiveSection(doc).children.push(toc);
  return true;
};

const addFootnote: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const footnoteText = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  doc.footnoteCounter++;
  const fnId = doc.footnoteCounter;
  doc.footnotes[fnId] = {
    children: [new Paragraph({ children: [buildTextRun(footnoteText, opts, doc.defaults)] })],
  };

  const pOpts = buildParagraphOpts(opts, doc.defaults);
  pOpts.children = [
    buildTextRun(text, opts, doc.defaults),
    new FootnoteReferenceRun(fnId),
  ];
  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return fnId;
};

const addComment: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const commentText = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const commentId = doc.commentCounter++;
  const author = String(opts.author ?? "RobinPath");
  doc.comments.push({
    id: commentId,
    author,
    date: new Date(),
    children: [new Paragraph({ children: [new TextRun(commentText)] })],
  });

  const pOpts = buildParagraphOpts(opts, doc.defaults);
  pOpts.children = [
    new CommentRangeStart(commentId),
    buildTextRun(text, opts, doc.defaults),
    new CommentRangeEnd(commentId),
    new CommentReference(commentId),
  ];
  getActiveSection(doc).children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return commentId;
};

const addSection: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = getOpts(args[1]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const sectionProps: Record<string, unknown> = {};
  const typeStr = String(opts.type ?? "nextPage").toLowerCase();
  const typeMap: Record<string, unknown> = {
    nextpage: SectionType.NEXT_PAGE,
    continuous: SectionType.CONTINUOUS,
    evenpage: SectionType.EVEN_PAGE,
    oddpage: SectionType.ODD_PAGE,
  };
  if (typeMap[typeStr]) sectionProps.type = typeMap[typeStr];

  if (opts.orientation) {
    const orient = String(opts.orientation).toLowerCase();
    sectionProps.page = {
      size: {
        orientation: orient === "landscape" ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT,
      },
    };
  }

  if (opts.columns) {
    sectionProps.column = { space: 720, count: Number(opts.columns) };
  }

  if (opts.margins) {
    const m = getOpts(opts.margins);
    const unit = String(opts.marginsUnit ?? "in");
    const conv = (v: unknown) => {
      const n = Number(v);
      return unit === "mm" ? mmToTwip(n) : convertInchesToTwip(n);
    };
    const page = (sectionProps.page ?? {}) as Record<string, unknown>;
    page.margin = {
      top: m.top ? conv(m.top) : undefined,
      bottom: m.bottom ? conv(m.bottom) : undefined,
      left: m.left ? conv(m.left) : undefined,
      right: m.right ? conv(m.right) : undefined,
    };
    sectionProps.page = page;
  }

  doc.sections.push({ children: [], properties: sectionProps, headers: undefined, footers: undefined });
  doc.activeSection = doc.sections.length - 1;
  return doc.activeSection;
};

const setDocProperties: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = getOpts(args[1]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  if (opts.title) doc.properties.title = String(opts.title);
  if (opts.author) doc.properties.author = String(opts.author);
  if (opts.subject) doc.properties.subject = String(opts.subject);
  if (opts.keywords) doc.properties.keywords = String(opts.keywords);
  if (opts.description) doc.properties.description = String(opts.description);
  return true;
};

const addDocStyle: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const styleName = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const styleType = String(opts.type ?? "paragraph").toLowerCase();
  const styleDef: Record<string, unknown> = {
    id: styleName.replace(/\s+/g, ""),
    name: styleName,
    basedOn: opts.basedOn ? String(opts.basedOn) : "Normal",
    next: opts.next ? String(opts.next) : "Normal",
    quickFormat: opts.quickFormat !== false,
    run: {} as Record<string, unknown>,
    paragraph: {} as Record<string, unknown>,
  };

  const runDef = styleDef.run as Record<string, unknown>;
  if (opts.font) runDef.font = String(opts.font);
  if (opts.fontSize) runDef.size = Number(opts.fontSize) * 2;
  if (opts.bold) runDef.bold = true;
  if (opts.italic) runDef.italics = true;
  if (opts.color) runDef.color = String(opts.color).replace("#", "");

  const paraDef = styleDef.paragraph as Record<string, unknown>;
  if (opts.alignment) paraDef.alignment = toAlignment(opts.alignment);
  if (opts.spacing) {
    const sp = getOpts(opts.spacing);
    paraDef.spacing = { before: sp.before ? Number(sp.before) : undefined, after: sp.after ? Number(sp.after) : undefined, line: sp.line ? Number(sp.line) : undefined };
  }

  if (styleType === "character") {
    doc.styles.character.push(styleDef);
  } else {
    doc.styles.paragraph.push(styleDef);
  }
  return true;
};

const addHeader: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const headerType = String(opts.type ?? "default") as "default" | "first" | "even";
  const section = getActiveSection(doc);
  const children: Paragraph[] = [
    new Paragraph({
      alignment: toAlignment(opts.alignment ?? "center"),
      children: [buildTextRun(text, opts, doc.defaults)],
    } as ConstructorParameters<typeof Paragraph>[0]),
  ];
  const header = new Header({ children });
  if (!section.headers) section.headers = {};
  section.headers[headerType] = header;
  return true;
};

const addFooter: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const footerType = String(opts.type ?? "default") as "default" | "first" | "even";
  const section = getActiveSection(doc);
  const paragraphs: Paragraph[] = [];

  if (text) {
    paragraphs.push(new Paragraph({
      alignment: toAlignment(opts.alignment ?? "center"),
      children: [buildTextRun(text, opts, doc.defaults)],
    } as ConstructorParameters<typeof Paragraph>[0]));
  }

  if (opts.pageNumbers) {
    paragraphs.push(new Paragraph({
      alignment: toAlignment(opts.pageNumberAlignment ?? opts.alignment ?? "center"),
      children: [new TextRun({
        children: [PageNumber.CURRENT],
        font: doc.defaults.font,
        size: doc.defaults.fontSize ? doc.defaults.fontSize * 2 : undefined,
      })],
    }));
  }

  const footer = new Footer({ children: paragraphs });
  if (!section.footers) section.footers = {};
  section.footers[footerType] = footer;
  return true;
};

const patchDoc: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputPath = String(args[1] ?? "");
  const patches = getOpts(args[2]);
  const opts = getOpts(args[3]);

  const processedPatches: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patches)) {
    if (typeof value === "string") {
      processedPatches[key] = { type: PatchType.PARAGRAPH, children: [new TextRun(value)] };
    } else if (typeof value === "object" && value !== null) {
      const p = value as Opts;
      if (p.type === "document" || p.type === "DOCUMENT") {
        const children = Array.isArray(p.children) ? (p.children as Opts[]).map((c) => {
          if (c.type === "paragraph" || !c.type) {
            return new Paragraph({ children: [new TextRun(String(c.text ?? ""))] });
          }
          return new Paragraph({ children: [new TextRun(String(c.text ?? ""))] });
        }) : [];
        processedPatches[key] = { type: PatchType.DOCUMENT, children };
      } else {
        const runs = Array.isArray(p.runs) ? (p.runs as Opts[]).map((r) => buildTextRun(String(r.text ?? ""), r)) : [new TextRun(String(p.text ?? value))];
        processedPatches[key] = { type: PatchType.PARAGRAPH, children: runs };
      }
    }
  }

  const data = readFileSync(inputPath);
  const result = await patchDocument({
    outputType: "nodebuffer" as const,
    data,
    patches: processedPatches as Record<string, any>,
    ...(opts.keepStyles !== false ? {} : {}),
  });
  writeFileSync(outputPath, result as Buffer);
  return { path: outputPath };
};

const addCheckbox: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const label = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const doc = docs.get(id);
  if (!doc) throw new Error(`Document "${id}" not found`);

  const checked = Boolean(opts.checked);
  const checkChar = checked ? "\u2611" : "\u2610";
  const section = getActiveSection(doc);
  const pOpts = buildParagraphOpts(opts, doc.defaults);
  pOpts.children = [buildTextRun(checkChar + " " + label, opts, doc.defaults)];
  section.children.push(new Paragraph(pOpts as ConstructorParameters<typeof Paragraph>[0]));
  return true;
};

const saveDoc: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const docState = docs.get(id);
  if (!docState) throw new Error(`Document "${id}" not found`);

  const margins = getOpts(docState.options.margins ?? {});
  const marginsUnit = String(docState.options.marginsUnit ?? "in");
  const toMargin = (val: unknown) => {
    const n = Number(val);
    return marginsUnit === "mm" ? mmToTwip(n) : convertInchesToTwip(n);
  };

  // Page size (default A4)
  const pageSize = getOpts(docState.options.pageSize ?? {});
  const sizeConfig: Record<string, unknown> = {};
  if (pageSize.width) sizeConfig.width = mmToTwip(Number(pageSize.width));
  if (pageSize.height) sizeConfig.height = mmToTwip(Number(pageSize.height));
  if (String(docState.options.pageFormat ?? "").toUpperCase() === "A4" || (!pageSize.width && !pageSize.height)) {
    sizeConfig.width = mmToTwip(210);
    sizeConfig.height = mmToTwip(297);
  }

  const pageNumbers = docState.options.pageNumbers !== false;
  const pageNumberStart = docState.options.pageNumberStart ? Number(docState.options.pageNumberStart) : undefined;

  const defaultPageConfig: Record<string, unknown> = {
    size: sizeConfig,
    margin: {
      top: margins.top ? toMargin(margins.top) : undefined,
      bottom: margins.bottom ? toMargin(margins.bottom) : undefined,
      left: margins.left ? toMargin(margins.left) : undefined,
      right: margins.right ? toMargin(margins.right) : undefined,
    },
    pageNumbers: pageNumberStart ? { start: pageNumberStart } : undefined,
  };

  // Default page number footer
  const defaultPageNumberFooter = pageNumbers ? new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        children: [PageNumber.CURRENT],
        font: docState.defaults.font,
        size: docState.defaults.fontSize ? docState.defaults.fontSize * 2 : undefined,
      })],
    })],
  }) : undefined;

  // Build sections from doc.sections
  const sections = docState.sections.map((section, idx) => {
    const sectionResult: Record<string, unknown> = {
      properties: {
        page: idx === 0 ? defaultPageConfig : { ...defaultPageConfig },
        ...section.properties,
      },
      children: section.children,
    };
    // Headers
    if (section.headers) sectionResult.headers = section.headers;
    // Footers: custom > default page numbers
    if (section.footers) {
      sectionResult.footers = section.footers;
    } else if (defaultPageNumberFooter) {
      sectionResult.footers = { default: defaultPageNumberFooter };
    }
    return sectionResult;
  });

  const docOptions: Record<string, unknown> = {
    numbering: {
      config: [
        {
          reference: "bullet-list",
          levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) } } } }],
        },
        {
          reference: "ordered-list",
          levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) } } } }],
        },
      ],
    },
    sections,
  };

  // Footnotes
  if (Object.keys(docState.footnotes).length > 0) {
    docOptions.footnotes = docState.footnotes;
  }
  // Comments (Comments wrapper re-creates Comment from plain objects)
  if (docState.comments.length > 0) {
    docOptions.comments = {
      children: docState.comments.map((c) => ({
        id: c.id,
        author: c.author,
        date: c.date,
        children: c.children,
      })),
    };
  }
  // Styles
  if (docState.styles.paragraph.length > 0 || docState.styles.character.length > 0) {
    docOptions.styles = {
      paragraphStyles: docState.styles.paragraph,
      characterStyles: docState.styles.character,
    };
  }
  // Document properties
  if (docState.properties.title) docOptions.title = docState.properties.title;
  if (docState.properties.author) docOptions.creator = docState.properties.author;
  if (docState.properties.subject) docOptions.subject = docState.properties.subject;
  if (docState.properties.keywords) docOptions.keywords = docState.properties.keywords;
  if (docState.properties.description) docOptions.description = docState.properties.description;

  const document = new Document(docOptions as ConstructorParameters<typeof Document>[0]);
  const buffer = await Packer.toBuffer(document);
  writeFileSync(filePath, buffer);
  docs.delete(id);
  return { path: filePath, size: buffer.length };
};

// ══════════════════════════════════════════════════════════════════
//  EXCEL (XLSX) FUNCTIONS
// ══════════════════════════════════════════════════════════════════

function applyExcelStyle(cell: ExcelJS.Cell, style: Opts): void {
  if (style.bold || style.italic || style.fontSize || style.font || style.color || style.underline) {
    cell.font = {
      bold: style.bold ? true : undefined,
      italic: style.italic ? true : undefined,
      underline: style.underline ? true : undefined,
      size: style.fontSize ? Number(style.fontSize) : undefined,
      name: style.font ? String(style.font) : undefined,
      color: style.color ? { argb: String(style.color).replace("#", "").padStart(8, "FF") } : undefined,
    };
  }

  if (style.alignment || style.align || style.verticalAlign || style.wrapText) {
    cell.alignment = {
      horizontal: (style.alignment ?? style.align) ? String(style.alignment ?? style.align) as ExcelJS.Alignment["horizontal"] : undefined,
      vertical: style.verticalAlign ? String(style.verticalAlign) as ExcelJS.Alignment["vertical"] : undefined,
      wrapText: style.wrapText ? true : undefined,
    };
  }

  if (style.fillColor || style.bgColor || style.backgroundColor) {
    const color = String(style.fillColor ?? style.bgColor ?? style.backgroundColor).replace("#", "").padStart(8, "FF");
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: color } };
  }

  if (style.borders || style.border) {
    const borderStyle = String(style.borderStyle ?? "thin") as ExcelJS.BorderStyle;
    const borderColor = style.borderColor ? { argb: String(style.borderColor).replace("#", "").padStart(8, "FF") } : undefined;
    cell.border = {
      top: { style: borderStyle, color: borderColor },
      bottom: { style: borderStyle, color: borderColor },
      left: { style: borderStyle, color: borderColor },
      right: { style: borderStyle, color: borderColor },
    };
  }

  if (style.numberFormat) {
    cell.numFmt = String(style.numberFormat);
  }
}

const createSheet: BuiltinHandler = (args) => {
  const id = String(args[0] ?? `wb_${Date.now()}`);
  const opts = getOpts(args[1]);
  const wb = new ExcelJS.Workbook();
  if (opts.creator) wb.creator = String(opts.creator);
  if (opts.title) wb.title = String(opts.title);
  const sheetName = String(opts.sheetName ?? "Sheet1");
  wb.addWorksheet(sheetName);
  workbooks.set(id, wb);
  return id;
};

const readSheet: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const sheetName = args[1] != null ? String(args[1]) : undefined;
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);
  const ws = sheetName ? wb.getWorksheet(sheetName) : wb.worksheets[0];
  if (!ws) throw new Error(`Worksheet not found`);

  const rows: Record<string, unknown>[] = [];
  const headers: string[] = [];

  ws.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber - 1] = String(cell.value ?? `col${colNumber}`);
      });
    } else {
      const obj: Record<string, unknown> = {};
      row.eachCell((cell, colNumber) => {
        const key = headers[colNumber - 1] ?? `col${colNumber}`;
        obj[key] = cell.value;
      });
      rows.push(obj);
    }
  });

  return rows as Value;
};

const addRow: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const sheetName = String(args[1] ?? "Sheet1");
  const values = args[2];
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  const rowValues = Array.isArray(values) ? values : [values];
  const row = ws.addRow(rowValues as ExcelJS.CellValue[]);

  // Apply style to all cells in the row
  if (Object.keys(opts).length > 0) {
    row.eachCell((cell) => applyExcelStyle(cell, opts));
  }

  return row.number;
};

const writeData: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const sheetName = String(args[1] ?? "Sheet1");
  const data = args[2];
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  if (!Array.isArray(data) || data.length === 0) return 0;

  const headerStyle = getOpts(opts.headerStyle);
  const cellStyle = getOpts(opts.cellStyle);

  // Write headers
  const headers = Object.keys(data[0] as Opts);
  const headerRow = ws.addRow(headers);
  if (Object.keys(headerStyle).length > 0 || !opts.noHeaderStyle) {
    headerRow.eachCell((cell) => {
      applyExcelStyle(cell, {
        bold: headerStyle.bold !== false ? true : undefined,
        fillColor: headerStyle.fillColor ?? "2196F3",
        color: headerStyle.color ?? headerStyle.fontColor ?? "FFFFFF",
        fontSize: headerStyle.fontSize,
        font: headerStyle.font,
        alignment: headerStyle.alignment ?? "center",
        borders: true,
        ...headerStyle,
      });
    });
  }

  // Write data rows
  for (const item of data as Opts[]) {
    const values = headers.map((h) => item[h] ?? "");
    const row = ws.addRow(values as ExcelJS.CellValue[]);
    if (Object.keys(cellStyle).length > 0) {
      row.eachCell((cell) => applyExcelStyle(cell, cellStyle));
    }
  }

  // Auto-width columns
  if (opts.autoWidth !== false) {
    for (let i = 1; i <= headers.length; i++) {
      const col = ws.getColumn(i);
      let maxLen = headers[i - 1]!.length;
      for (const item of data as Opts[]) {
        const val = String(item[headers[i - 1]!] ?? "");
        if (val.length > maxLen) maxLen = val.length;
      }
      col.width = Math.min(Math.max(maxLen + 4, 10), 50);
    }
  }

  // Column widths override
  if (Array.isArray(opts.columnWidths)) {
    for (let i = 0; i < opts.columnWidths.length; i++) {
      ws.getColumn(i + 1).width = Number((opts.columnWidths as unknown[])[i]);
    }
  }

  return (data as unknown[]).length;
};

const writeCell: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const value = args[2];
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  const sheetName = String(opts.sheet ?? "Sheet1");
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  const cell = ws.getCell(cellRef);
  cell.value = value as ExcelJS.CellValue;

  if (Object.keys(opts).length > 0) {
    applyExcelStyle(cell, opts);
  }

  return true;
};

const styleRange: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const range = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  // Parse range like "A1:D10" or "AA1:AZ100"
  const match = range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);
  if (!match) throw new Error(`Invalid range: "${range}". Use format like "A1:D10"`);

  const startColNum = colLetterToNumber(match[1]!);
  const startRow = parseInt(match[2]!);
  const endColNum = colLetterToNumber(match[3]!);
  const endRow = parseInt(match[4]!);

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startColNum; c <= endColNum; c++) {
      const ref = colNumberToLetter(c) + r;
      applyExcelStyle(ws.getCell(ref), opts);
    }
  }

  return true;
};

const addFormula: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const formula = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  const sheetName = String(opts.sheet ?? "Sheet1");
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  ws.getCell(cellRef).value = { formula } as ExcelJS.CellFormulaValue;
  if (Object.keys(opts).length > 0) applyExcelStyle(ws.getCell(cellRef), opts);

  return true;
};

const setColumnWidth: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const columns = args[1];
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  if (typeof columns === "object" && columns !== null && !Array.isArray(columns)) {
    for (const [col, width] of Object.entries(columns as Opts)) {
      ws.getColumn(col).width = Number(width);
    }
  }

  return true;
};

const mergeCells: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const range = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  ws.mergeCells(range);
  return true;
};

const loadSheet: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const id = String(args[1] ?? `wb_${Date.now()}`);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);
  workbooks.set(id, wb);
  return id;
};

const addWorksheet: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const name = String(args[1] ?? `Sheet${Date.now()}`);
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const ws = wb.addWorksheet(name);
  if (opts.tabColor) {
    ws.properties.tabColor = { argb: String(opts.tabColor).replace("#", "").padStart(8, "FF") };
  }
  return name;
};

const freezePanes: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const rows = Number(args[1] ?? 1);
  const cols = Number(args[2] ?? 0);
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const topLeftCell = colNumberToLetter(cols + 1) + (rows + 1);
  ws.views = [{ state: "frozen" as const, xSplit: cols, ySplit: rows, topLeftCell, activeCell: topLeftCell }];
  return true;
};

const setAutoFilter: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const range = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  ws.autoFilter = range;
  return true;
};

const addConditionalFormat: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const range = String(args[1] ?? "");
  const rules = args[2];
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const ruleList = Array.isArray(rules) ? rules as Opts[] : [rules as Opts];
  const processedRules = ruleList.map((rule) => {
    const ruleType = String(rule.type ?? "cellIs");
    if (ruleType === "colorScale") {
      return {
        type: "colorScale" as const,
        cfvo: Array.isArray(rule.cfvo) ? rule.cfvo : [{ type: "min" as const }, { type: "max" as const }],
        color: Array.isArray(rule.color) ? rule.color : [{ argb: "FFF8696B" }, { argb: "FF63BE7B" }],
      };
    }
    if (ruleType === "dataBar") {
      return {
        type: "dataBar" as const,
        cfvo: Array.isArray(rule.cfvo) ? rule.cfvo : [{ type: "min" as const }, { type: "max" as const }],
        color: rule.color ? { argb: String(rule.color).replace("#", "").padStart(8, "FF") } : { argb: "FF638EC6" },
      };
    }
    if (ruleType === "iconSet") {
      return {
        type: "iconSet" as const,
        iconSet: rule.iconSet ?? "3TrafficLights",
        cfvo: Array.isArray(rule.cfvo) ? rule.cfvo : [{ type: "percent" as const, value: 0 }, { type: "percent" as const, value: 33 }, { type: "percent" as const, value: 67 }],
      };
    }
    // Default: cellIs
    return {
      type: "cellIs" as const,
      operator: String(rule.operator ?? "greaterThan"),
      formulae: Array.isArray(rule.formulae) ? rule.formulae : [rule.value ?? 0],
      style: {
        fill: rule.fillColor ? { type: "pattern" as const, pattern: "solid" as const, bgColor: { argb: String(rule.fillColor).replace("#", "").padStart(8, "FF") } } : undefined,
        font: rule.fontColor ? { color: { argb: String(rule.fontColor).replace("#", "").padStart(8, "FF") } } : undefined,
      },
    };
  });

  ws.addConditionalFormatting({ ref: range, rules: processedRules as any });
  return true;
};

const addDataValidation: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  const valType = String(opts.type ?? "list");
  const validation: Record<string, unknown> = {
    type: valType,
    allowBlank: opts.allowBlank !== false,
  };

  if (valType === "list" && opts.values) {
    const vals = Array.isArray(opts.values) ? (opts.values as unknown[]).join(",") : String(opts.values);
    validation.formulae = [`"${vals}"`];
  } else if (opts.formulae) {
    validation.formulae = Array.isArray(opts.formulae) ? opts.formulae : [opts.formulae];
  } else if (opts.min !== undefined || opts.max !== undefined) {
    const formulae: unknown[] = [];
    if (opts.min !== undefined) formulae.push(Number(opts.min));
    if (opts.max !== undefined) formulae.push(Number(opts.max));
    validation.formulae = formulae;
    if (opts.operator) validation.operator = String(opts.operator);
    else if (opts.min !== undefined && opts.max !== undefined) validation.operator = "between";
    else if (opts.min !== undefined) validation.operator = "greaterThanOrEqual";
    else validation.operator = "lessThanOrEqual";
  }

  if (opts.showErrorMessage !== false) validation.showErrorMessage = true;
  if (opts.errorTitle) validation.errorTitle = String(opts.errorTitle);
  if (opts.error) validation.error = String(opts.error);
  if (opts.promptTitle) validation.promptTitle = String(opts.promptTitle);
  if (opts.prompt) { validation.showInputMessage = true; validation.prompt = String(opts.prompt); }

  ws.getCell(cellRef).dataValidation = validation as unknown as ExcelJS.DataValidation;
  return true;
};

const addCellComment: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const cellRef = String(args[1] ?? "A1");
  const text = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  const cell = ws.getCell(cellRef);
  if (opts.author) {
    cell.note = {
      texts: [{ font: { bold: true, size: 9, name: "Tahoma" }, text: String(opts.author) + ":\n" }, { font: { size: 9, name: "Tahoma" }, text }],
      margins: { insetmode: "custom" as const, inset: [0.25, 0.25, 0.35, 0.25] },
    } as ExcelJS.Comment;
  } else {
    cell.note = text;
  }
  return true;
};

const addSheetImage: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "");
  const imagePath = String(args[1] ?? "");
  const range = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  let ws = wb.getWorksheet(sheetName);
  if (!ws) ws = wb.addWorksheet(sheetName);

  const ext = (extname(imagePath).replace(".", "").toLowerCase() || "png") as "png" | "jpeg" | "gif";
  const imgBuf = readFileSync(imagePath);
  const imageId = wb.addImage({ buffer: imgBuf as any, extension: ext });

  if (range && range.includes(":")) {
    ws.addImage(imageId, range);
  } else {
    const col = Number(opts.col ?? 0);
    const row = Number(opts.row ?? 0);
    const width = Number(opts.width ?? 200);
    const height = Number(opts.height ?? 200);
    ws.addImage(imageId, { tl: { col, row } as any, ext: { width, height } });
  }
  return true;
};

const addNamedRange: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const range = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");

  wb.definedNames.add(`'${sheetName}'!${range}`, name);
  return true;
};

const protectSheet: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "");
  const password = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const protOpts: Record<string, boolean> = {};
  if (opts.selectLockedCells !== undefined) protOpts.selectLockedCells = Boolean(opts.selectLockedCells);
  if (opts.selectUnlockedCells !== undefined) protOpts.selectUnlockedCells = Boolean(opts.selectUnlockedCells);
  if (opts.formatCells !== undefined) protOpts.formatCells = Boolean(opts.formatCells);
  if (opts.formatColumns !== undefined) protOpts.formatColumns = Boolean(opts.formatColumns);
  if (opts.formatRows !== undefined) protOpts.formatRows = Boolean(opts.formatRows);
  if (opts.insertColumns !== undefined) protOpts.insertColumns = Boolean(opts.insertColumns);
  if (opts.insertRows !== undefined) protOpts.insertRows = Boolean(opts.insertRows);
  if (opts.insertHyperlinks !== undefined) protOpts.insertHyperlinks = Boolean(opts.insertHyperlinks);
  if (opts.deleteColumns !== undefined) protOpts.deleteColumns = Boolean(opts.deleteColumns);
  if (opts.deleteRows !== undefined) protOpts.deleteRows = Boolean(opts.deleteRows);
  if (opts.sort !== undefined) protOpts.sort = Boolean(opts.sort);
  if (opts.autoFilter !== undefined) protOpts.autoFilter = Boolean(opts.autoFilter);

  await ws.protect(password, protOpts);
  return true;
};

const hideRowsColumns: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const targets = getOpts(args[1]);
  const opts = getOpts(args[2]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const hidden = opts.hidden !== false;
  if (targets.rows) {
    const rows = Array.isArray(targets.rows) ? targets.rows : [targets.rows];
    for (const r of rows) ws.getRow(Number(r)).hidden = hidden;
  }
  if (targets.columns) {
    const cols = Array.isArray(targets.columns) ? targets.columns : [targets.columns];
    for (const c of cols) ws.getColumn(String(c)).hidden = hidden;
  }
  return true;
};

// ── Cross-format functions ──

const setSheetPrint: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = getOpts(args[1]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const pageSetup: Record<string, unknown> = {};
  if (opts.paperSize) pageSetup.paperSize = Number(opts.paperSize);
  if (opts.orientation) pageSetup.orientation = String(opts.orientation);
  if (opts.fitToPage) pageSetup.fitToPage = true;
  if (opts.fitToWidth) pageSetup.fitToWidth = Number(opts.fitToWidth);
  if (opts.fitToHeight) pageSetup.fitToHeight = Number(opts.fitToHeight);
  if (opts.printArea) pageSetup.printArea = String(opts.printArea);
  if (opts.horizontalCentered) pageSetup.horizontalCentered = true;
  if (opts.verticalCentered) pageSetup.verticalCentered = true;
  if (opts.printTitlesRow) pageSetup.printTitlesRow = String(opts.printTitlesRow);

  ws.pageSetup = pageSetup as unknown as ExcelJS.PageSetup;

  if (opts.margins) {
    const m = getOpts(opts.margins);
    ws.pageSetup.margins = {
      left: m.left ? Number(m.left) : 0.7,
      right: m.right ? Number(m.right) : 0.7,
      top: m.top ? Number(m.top) : 0.75,
      bottom: m.bottom ? Number(m.bottom) : 0.75,
      header: m.header ? Number(m.header) : 0.3,
      footer: m.footer ? Number(m.footer) : 0.3,
    };
  }
  return true;
};

const groupRows: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const start = Number(args[1] ?? 1);
  const end = Number(args[2] ?? 1);
  const opts = getOpts(args[3]);
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);
  const sheetName = String(opts.sheet ?? "Sheet1");
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Worksheet "${sheetName}" not found`);

  const level = Number(opts.level ?? 1);
  const collapsed = Boolean(opts.collapsed);
  for (let r = start; r <= end; r++) {
    const row = ws.getRow(r);
    row.outlineLevel = level;
    if (collapsed) row.hidden = true;
  }

  if (opts.columns) {
    const colStart = Number((opts.columns as Opts).start ?? 1);
    const colEnd = Number((opts.columns as Opts).end ?? 1);
    const colLevel = Number((opts.columns as Opts).level ?? 1);
    for (let c = colStart; c <= colEnd; c++) {
      ws.getColumn(c).outlineLevel = colLevel;
    }
  }
  return true;
};

const saveSheet: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const wb = workbooks.get(id);
  if (!wb) throw new Error(`Workbook "${id}" not found`);

  await wb.xlsx.writeFile(filePath);
  workbooks.delete(id);
  return { path: filePath };
};

// ══════════════════════════════════════════════════════════════════
//  POWERPOINT (PPTX) FUNCTIONS
// ══════════════════════════════════════════════════════════════════

const createSlides: BuiltinHandler = (args) => {
  const id = String(args[0] ?? `ppt_${Date.now()}`);
  const opts = getOpts(args[1]);
  const ppt = new PptxGenJS();
  if (opts.title) ppt.title = String(opts.title);
  if (opts.author) ppt.author = String(opts.author);
  if (opts.subject) ppt.subject = String(opts.subject);
  if (opts.layout) ppt.layout = String(opts.layout) as "LAYOUT_16x9";
  presentations.set(id, ppt);
  presSlides.set(id, []);
  return id;
};

const addSlide: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = getOpts(args[1]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);

  const slide = ppt.addSlide();

  if (opts.backgroundColor || opts.bgColor) {
    slide.background = { color: String(opts.backgroundColor ?? opts.bgColor).replace("#", "") };
  }

  // Quick add title/subtitle
  if (opts.title) {
    slide.addText(String(opts.title), {
      x: 0.5, y: 0.5, w: 9, h: 1,
      fontSize: Number(opts.titleSize ?? 32),
      bold: true,
      color: String(opts.titleColor ?? "333333").replace("#", ""),
      align: "center",
    });
  }
  if (opts.subtitle) {
    slide.addText(String(opts.subtitle), {
      x: 0.5, y: 1.6, w: 9, h: 0.8,
      fontSize: Number(opts.subtitleSize ?? 18),
      color: String(opts.subtitleColor ?? "666666").replace("#", ""),
      align: "center",
    });
  }

  // Track slides manually
  const slides = presSlides.get(id) ?? [];
  slides.push(slide);
  presSlides.set(id, slides);
  return slides.length - 1;
};

const addSlideText: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const text = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  const textOpts: PptxGenJS.TextPropsOptions = {
    x: Number(opts.x ?? 0.5),
    y: Number(opts.y ?? 0.5),
    w: Number(opts.w ?? opts.width ?? 9),
    h: Number(opts.h ?? opts.height ?? 1),
    fontSize: Number(opts.fontSize ?? 14),
    fontFace: opts.font ? String(opts.font) : undefined,
    bold: opts.bold ? true : undefined,
    italic: opts.italic ? true : undefined,
    underline: opts.underline ? { style: "sng" as const } : undefined,
    color: opts.color ? String(opts.color).replace("#", "") : undefined,
    align: opts.alignment ?? opts.align ? String(opts.alignment ?? opts.align) as PptxGenJS.HAlign : undefined,
    valign: opts.verticalAlign ? String(opts.verticalAlign) as PptxGenJS.VAlign : undefined,
    fill: opts.fillColor ? { color: String(opts.fillColor).replace("#", "") } : undefined,
    margin: opts.margin ? Number(opts.margin) : undefined,
    lineSpacing: opts.lineSpacing ? Number(opts.lineSpacing) : undefined,
    paraSpaceAfter: opts.spaceAfter ? Number(opts.spaceAfter) : undefined,
    paraSpaceBefore: opts.spaceBefore ? Number(opts.spaceBefore) : undefined,
  };

  // Support bullet points
  if (opts.bullet) {
    textOpts.bullet = opts.bullet === true ? true : opts.bullet as { type?: "bullet" | "number" };
  }

  slide.addText(text, textOpts);
  return true;
};

const addSlideImage: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const imagePath = String(args[2] ?? "");
  const opts = getOpts(args[3]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  const imgOpts: PptxGenJS.ImageProps = {
    path: imagePath,
    x: Number(opts.x ?? 1),
    y: Number(opts.y ?? 1),
    w: Number(opts.w ?? opts.width ?? 4),
    h: Number(opts.h ?? opts.height ?? 3),
  };

  if (opts.rounding) imgOpts.rounding = true;
  if (opts.hyperlink) imgOpts.hyperlink = { url: String(opts.hyperlink) };

  slide.addImage(imgOpts);
  return true;
};

const addSlideTable: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const data = args[2];
  const opts = getOpts(args[3]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  if (!Array.isArray(data) || data.length === 0) throw new Error("Table data required");

  const headerStyle = getOpts(opts.headerStyle);
  const cellStyleOpts = getOpts(opts.cellStyle);

  // Build table rows
  const isObjectArray = typeof data[0] === "object" && !Array.isArray(data[0]);
  const headers = isObjectArray ? Object.keys(data[0] as Opts) : null;
  const tableRows: PptxGenJS.TableRow[] = [];

  // Header row
  if (headers) {
    tableRows.push(headers.map((h) => ({
      text: h,
      options: {
        bold: true,
        fontSize: Number(headerStyle.fontSize ?? 12),
        color: String(headerStyle.color ?? headerStyle.fontColor ?? "FFFFFF").replace("#", ""),
        fill: { color: String(headerStyle.fillColor ?? "2196F3").replace("#", "") },
        align: (headerStyle.alignment ?? "center") as "left" | "center" | "right",
      },
    } as PptxGenJS.TableCell)));
  }

  // Data rows
  const dataRows = isObjectArray
    ? (data as Opts[]).map((row) => headers!.map((h) => String(row[h] ?? "")))
    : (data as unknown[][]).map((row) => (Array.isArray(row) ? row.map(String) : [String(row)]));

  for (let ri = 0; ri < dataRows.length; ri++) {
    const isAlt = ri % 2 === 1;
    tableRows.push(dataRows[ri]!.map((cell) => ({
      text: cell,
      options: {
        fontSize: Number(cellStyleOpts.fontSize ?? 10),
        color: cellStyleOpts.color ? String(cellStyleOpts.color).replace("#", "") : undefined,
        fill: (opts.alternateRows && isAlt) ? { color: "F5F5F5" } : undefined,
        align: cellStyleOpts.alignment ? String(cellStyleOpts.alignment) as "left" | "center" | "right" : undefined,
      },
    } as PptxGenJS.TableCell)));
  }

  const tableOpts: PptxGenJS.TableProps = {
    x: Number(opts.x ?? 0.5),
    y: Number(opts.y ?? 1.5),
    w: Number(opts.w ?? opts.width ?? 9),
    fontSize: Number(opts.fontSize ?? 10),
    border: opts.borders !== false ? { type: "solid", pt: 0.5, color: "CCCCCC" } : undefined,
    autoPage: true,
  };

  if (Array.isArray(opts.columnWidths)) {
    tableOpts.colW = (opts.columnWidths as unknown[]).map(Number);
  }

  slide.addTable(tableRows, tableOpts);
  return true;
};

const addSlideChart: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const chartData = args[2];
  const opts = getOpts(args[3]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  const chartType = String(opts.type ?? "bar").toUpperCase();
  const typeMap: Record<string, PptxGenJS.CHART_NAME> = {
    BAR: ppt.ChartType.bar,
    LINE: ppt.ChartType.line,
    PIE: ppt.ChartType.pie,
    DOUGHNUT: ppt.ChartType.doughnut,
    AREA: ppt.ChartType.area,
    SCATTER: ppt.ChartType.scatter,
  };

  const type = typeMap[chartType] ?? ppt.ChartType.bar;
  const data = Array.isArray(chartData) ? chartData as PptxGenJS.OptsChartData[] : [chartData as PptxGenJS.OptsChartData];

  slide.addChart(type, data, {
    x: Number(opts.x ?? 0.5),
    y: Number(opts.y ?? 1.5),
    w: Number(opts.w ?? opts.width ?? 8),
    h: Number(opts.h ?? opts.height ?? 4),
    showTitle: opts.title ? true : false,
    title: opts.title ? String(opts.title) : undefined,
    showLegend: opts.legend !== false,
    showValue: opts.showValues ? true : false,
  });

  return true;
};

const addSlideShape: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const opts = getOpts(args[2]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  const shapeType = String(opts.shape ?? "rect").toLowerCase();
  const shapeMap: Record<string, PptxGenJS.SHAPE_NAME> = {
    rect: ppt.ShapeType.rect,
    ellipse: ppt.ShapeType.ellipse,
    roundrect: ppt.ShapeType.roundRect,
    line: ppt.ShapeType.line,
    triangle: ppt.ShapeType.triangle,
  };

  slide.addShape(shapeMap[shapeType] ?? ppt.ShapeType.rect, {
    x: Number(opts.x ?? 1),
    y: Number(opts.y ?? 1),
    w: Number(opts.w ?? opts.width ?? 2),
    h: Number(opts.h ?? opts.height ?? 2),
    fill: opts.fillColor ? { color: String(opts.fillColor).replace("#", "") } : undefined,
    line: opts.lineColor ? { color: String(opts.lineColor).replace("#", ""), width: Number(opts.lineWidth ?? 1) } : undefined,
  });

  return true;
};

const addSlideNotes: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const text = String(args[2] ?? "");
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  slide.addNotes(text);
  return true;
};

const addSlideMultiText: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const runs = args[2];
  const opts = getOpts(args[3]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  if (!Array.isArray(runs)) throw new Error("runs must be an array of text run objects");

  const textRuns = (runs as Opts[]).map((r) => ({
    text: String(r.text ?? ""),
    options: {
      fontSize: r.fontSize ? Number(r.fontSize) : undefined,
      fontFace: r.font ? String(r.font) : undefined,
      bold: r.bold ? true : undefined,
      italic: r.italic ? true : undefined,
      underline: r.underline ? { style: "sng" as const } : undefined,
      color: r.color ? String(r.color).replace("#", "") : undefined,
      strike: r.strike ? true : undefined,
      superscript: r.superscript ? true : undefined,
      subscript: r.subscript ? true : undefined,
      hyperlink: r.hyperlink ? { url: String(r.hyperlink) } : undefined,
      breakType: r.breakType === "line" ? "break" as const : undefined,
    },
  }));

  slide.addText(textRuns, {
    x: Number(opts.x ?? 0.5),
    y: Number(opts.y ?? 0.5),
    w: Number(opts.w ?? opts.width ?? 9),
    h: Number(opts.h ?? opts.height ?? 1),
    align: opts.alignment ?? opts.align ? String(opts.alignment ?? opts.align) as PptxGenJS.HAlign : undefined,
    valign: opts.verticalAlign ? String(opts.verticalAlign) as PptxGenJS.VAlign : undefined,
    fill: opts.fillColor ? { color: String(opts.fillColor).replace("#", "") } : undefined,
    lineSpacing: opts.lineSpacing ? Number(opts.lineSpacing) : undefined,
    margin: opts.margin ? Number(opts.margin) : undefined,
  });
  return true;
};

const setSlideNumber: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const slideIdx = Number(args[1] ?? 0);
  const opts = getOpts(args[2]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);
  const slides = presSlides.get(id) ?? [];
  const slide = slides[slideIdx];
  if (!slide) throw new Error(`Slide ${slideIdx} not found`);

  slide.slideNumber = {
    x: opts.x !== undefined ? Number(opts.x) : 0.3,
    y: opts.y !== undefined ? String(opts.y) : "95%",
    color: opts.color ? String(opts.color).replace("#", "") : "696969",
    fontSize: opts.fontSize ? Number(opts.fontSize) : 10,
  } as any;
  return true;
};

const defineSlideMaster: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);

  const masterDef: Record<string, unknown> = { title: name };

  if (opts.background || opts.bgColor) {
    masterDef.background = { fill: String(opts.background ?? opts.bgColor).replace("#", "") };
  }

  if (opts.margin) masterDef.margin = opts.margin;

  if (opts.slideNumber) {
    const sn = getOpts(opts.slideNumber);
    masterDef.slideNumber = {
      x: sn.x ?? 0.3,
      y: sn.y ?? "95%",
      color: sn.color ? String(sn.color).replace("#", "") : "696969",
      fontSize: sn.fontSize ? Number(sn.fontSize) : 8,
    };
  }

  // Build objects array
  const objects: Record<string, unknown>[] = [];
  if (Array.isArray(opts.objects)) {
    for (const obj of opts.objects as Opts[]) {
      if (obj.rect) {
        const r = getOpts(obj.rect);
        objects.push({ rect: { x: r.x ?? 0, y: r.y ?? 0, w: r.w ?? "100%", h: r.h ?? 0.5, fill: r.fillColor ? { color: String(r.fillColor).replace("#", "") } : r.fill } });
      } else if (obj.text) {
        const t = getOpts(obj.text);
        objects.push({ text: { text: String(t.text ?? ""), options: { x: t.x, y: t.y, w: t.w, h: t.h, color: t.color ? String(t.color).replace("#", "") : undefined, fontSize: t.fontSize ? Number(t.fontSize) : undefined, bold: t.bold, align: t.alignment ?? t.align } } });
      } else if (obj.image) {
        const im = getOpts(obj.image);
        objects.push({ image: { x: im.x, y: im.y, w: im.w, h: im.h, path: String(im.path ?? "") } });
      } else if (obj.placeholder) {
        objects.push({ placeholder: obj.placeholder });
      }
    }
  }
  if (objects.length > 0) masterDef.objects = objects;

  ppt.defineSlideMaster(masterDef as any);
  return true;
};

const addSlideFromMaster: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const masterName = String(args[1] ?? "");
  const opts = getOpts(args[2]);
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);

  const slide = ppt.addSlide({ masterName } as any);

  if (opts.backgroundColor || opts.bgColor) {
    slide.background = { color: String(opts.backgroundColor ?? opts.bgColor).replace("#", "") };
  }

  const slides = presSlides.get(id) ?? [];
  slides.push(slide);
  presSlides.set(id, slides);
  return slides.length - 1;
};

const saveSlides: BuiltinHandler = async (args) => {
  const id = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const ppt = presentations.get(id);
  if (!ppt) throw new Error(`Presentation "${id}" not found`);

  await ppt.writeFile({ fileName: filePath });
  presentations.delete(id);
  presSlides.delete(id);
  return { path: filePath };
};

// ── Exports ─────────────────────────────────────────────────────────

export const OfficeFunctions: Record<string, BuiltinHandler> = {
  // Word (21)
  createDoc, readDoc, addHeading, addParagraph, addTable, addImage, addPageBreak, addList,
  addHyperlink, addBookmark, addTableOfContents, addFootnote, addComment, addSection,
  setDocProperties, addDocStyle, addHeader, addFooter, patchDoc, addCheckbox, saveDoc,
  // Excel (21)
  createSheet, readSheet, addRow, writeData, writeCell, styleRange, addFormula, setColumnWidth, mergeCells,
  loadSheet, addWorksheet, freezePanes, setAutoFilter, addConditionalFormat, addDataValidation,
  addCellComment, addSheetImage, addNamedRange, protectSheet, hideRowsColumns, saveSheet,
  // PowerPoint (13)
  createSlides, addSlide, addSlideText, addSlideImage, addSlideTable, addSlideChart, addSlideShape,
  addSlideNotes, addSlideMultiText, setSlideNumber, defineSlideMaster, addSlideFromMaster, saveSlides,
  // Cross-format (2)
  setSheetPrint, groupRows,
};

export const OfficeFunctionMetadata: Record<string, FunctionMetadata> = {
  // ── Word ──
  createDoc: {
    description: "Create a new Word document",
    parameters: [
      { name: "id", dataType: "string", description: "Document ID", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{margins: {top, bottom, left, right}}", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Document ID",
    example: 'office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc',
  },
  readDoc: {
    description: "Read text or HTML from an existing Word document",
    parameters: [
      { name: "filePath", dataType: "string", description: "Path to .docx file", formInputType: "text", required: true },
      { name: "format", dataType: "string", description: "'text' (default) or 'html'", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "Document content as text or HTML",
    example: 'office.readDoc "./contract.docx" "text" into $content',
  },
  addHeading: {
    description: "Add a heading with level and formatting",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Heading text", formInputType: "text", required: true },
      { name: "level", dataType: "number", description: "Heading level 1-6", formInputType: "number", required: false },
      { name: "options", dataType: "object", description: "{bold, italic, fontSize, font, color, alignment, spacing}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addHeading $doc "Sales Report" 1 {"color": "#2196F3", "alignment": "center"}',
  },
  addParagraph: {
    description: "Add a paragraph with rich text formatting",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Paragraph text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{bold, italic, underline, fontSize, font, color, alignment, spacing, indent, runs: [{text, bold, color}]}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addParagraph $doc "Revenue increased by 23%" {"bold": true, "fontSize": 12, "alignment": "justify", "spacing": {"after": 200}}',
  },
  addTable: {
    description: "Add a table with full styling (headers, borders, colors, widths)",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "data", dataType: "array", description: "Array of objects or array of arrays", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{headerStyle: {bold, fillColor, fontColor}, cellStyle, columnWidths, borders, alternateRows}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addTable $doc $data {"headerStyle": {"fillColor": "#2196F3", "fontColor": "#FFFFFF"}, "alternateRows": true}',
  },
  addImage: {
    description: "Add an image to the document",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "imagePath", dataType: "string", description: "Path to image file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{width, height, alignment}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addImage $doc "./chart.png" {"width": 500, "height": 300, "alignment": "center"}',
  },
  addPageBreak: {
    description: "Add a page break",
    parameters: [{ name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true }],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addPageBreak $doc',
  },
  addList: {
    description: "Add a bulleted or numbered list",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "items", dataType: "array", description: "Array of strings", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{ordered: bool, bold, fontSize, font, color}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addList $doc ["Item 1", "Item 2", "Item 3"] {"ordered": true, "fontSize": 11}',
  },
  addHyperlink: {
    description: "Add a clickable hyperlink to the document",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Display text", formInputType: "text", required: true },
      { name: "url", dataType: "string", description: "Target URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{color, bold, fontSize, font, underline, alignment}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addHyperlink $doc "Visit our site" "https://example.com" {"bold": true}',
  },
  addBookmark: {
    description: "Add a named bookmark for cross-references",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Bookmark name", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Bookmark text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{bold, fontSize, font, color}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addBookmark $doc "section1" "Introduction" {"bold": true}',
  },
  addTableOfContents: {
    description: "Add an auto-generated table of contents from headings",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{heading, hyperlink, headingRange: '1-5'}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addTableOfContents $doc {"heading": "Contents", "headingRange": "1-3"}',
  },
  addFootnote: {
    description: "Add a footnote reference in text with footnote content at bottom",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Paragraph text", formInputType: "text", required: true },
      { name: "footnoteText", dataType: "string", description: "Footnote content", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{bold, fontSize, font, color, alignment}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Footnote ID",
    example: 'office.addFootnote $doc "See reference" "Source: IEEE 2024 paper" {}',
  },
  addComment: {
    description: "Add a comment annotation on a text range",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Commented text", formInputType: "text", required: true },
      { name: "commentText", dataType: "string", description: "Comment content", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{author, bold, fontSize}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Comment ID",
    example: 'office.addComment $doc "This needs review" "Please verify the figures" {"author": "Editor"}',
  },
  addSection: {
    description: "Add a new document section with separate formatting (orientation, columns, margins)",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{type: nextPage|continuous|evenPage|oddPage, orientation: portrait|landscape, columns, margins}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Section index",
    example: 'office.addSection $doc {"orientation": "landscape", "type": "nextPage"}',
  },
  setDocProperties: {
    description: "Set document metadata properties (title, author, keywords)",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{title, author, subject, keywords, description}", formInputType: "json", required: true },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.setDocProperties $doc {"title": "Annual Report", "author": "Finance Dept"}',
  },
  addDocStyle: {
    description: "Define a reusable named paragraph or character style",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "styleName", dataType: "string", description: "Style name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{type: paragraph|character, font, fontSize, bold, italic, color, alignment, spacing, basedOn}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addDocStyle $doc "Code Block" {"font": "Courier New", "fontSize": 10, "color": "333333"}',
  },
  addHeader: {
    description: "Add a custom header to the current section",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Header text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{type: default|first|even, alignment, bold, fontSize, font, color}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addHeader $doc "Company Report 2026" {"alignment": "right", "fontSize": 9}',
  },
  addFooter: {
    description: "Add a custom footer with optional page numbers",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Footer text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{type: default|first|even, alignment, pageNumbers: bool, pageNumberAlignment}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addFooter $doc "Confidential" {"pageNumbers": true, "alignment": "center"}',
  },
  patchDoc: {
    description: "Modify an existing .docx by replacing placeholders with new content",
    parameters: [
      { name: "inputPath", dataType: "string", description: "Path to existing .docx", formInputType: "text", required: true },
      { name: "outputPath", dataType: "string", description: "Output .docx path", formInputType: "text", required: true },
      { name: "patches", dataType: "object", description: '{"{{PLACEHOLDER}}": "replacement text"} or {"{{KEY}}": {runs: [{text, bold, color}]}}', formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{keepStyles}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{path}",
    example: 'office.patchDoc "./template.docx" "./output.docx" {"{{NAME}}": "John", "{{DATE}}": "2026-01-15"}',
  },
  addCheckbox: {
    description: "Add a checkbox with label text",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "label", dataType: "string", description: "Checkbox label", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{checked: bool, bold, fontSize, font, color}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addCheckbox $doc "I agree to the terms" {"checked": false}',
  },
  saveDoc: {
    description: "Save the Word document to a .docx file",
    parameters: [
      { name: "docId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Output .docx path", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{path, size}",
    example: 'office.saveDoc $doc "./report.docx"',
  },
  // ── Excel ──
  createSheet: {
    description: "Create a new Excel workbook",
    parameters: [
      { name: "id", dataType: "string", description: "Workbook ID", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{creator, title, sheetName}", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Workbook ID",
    example: 'office.createSheet "data" {"sheetName": "Products"} into $wb',
  },
  readSheet: {
    description: "Read data from an existing Excel file",
    parameters: [
      { name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true },
      { name: "sheetName", dataType: "string", description: "Sheet name (optional, defaults to first)", formInputType: "text", required: false },
    ],
    returnType: "array", returnDescription: "Array of row objects (header row becomes keys)",
    example: 'office.readSheet "./data.xlsx" "Sheet1" into $rows',
  },
  addRow: {
    description: "Add a row with optional styling",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "sheet", dataType: "string", description: "Sheet name", formInputType: "text", required: true },
      { name: "values", dataType: "array", description: "Row values", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{bold, fontSize, color, fillColor, alignment, borders}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Row number",
    example: 'office.addRow $wb "Sheet1" ["Name", "Price"] {"bold": true, "fillColor": "#2196F3", "color": "#FFFFFF"}',
  },
  writeData: {
    description: "Write array of objects to sheet with auto-headers and styling",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "sheet", dataType: "string", description: "Sheet name", formInputType: "text", required: true },
      { name: "data", dataType: "array", description: "Array of objects", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{headerStyle, cellStyle, columnWidths, autoWidth}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Number of rows written",
    example: 'office.writeData $wb "Sheet1" $products {"headerStyle": {"fillColor": "#FF5722", "bold": true}}',
  },
  writeCell: {
    description: "Write a value to a specific cell with formatting",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "cell", dataType: "string", description: "Cell reference (e.g. A1)", formInputType: "text", required: true },
      { name: "value", dataType: "any", description: "Cell value", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, bold, fontSize, color, fillColor, alignment, borders, numberFormat}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.writeCell $wb "A1" "Total:" {"bold": true, "fontSize": 14}',
  },
  styleRange: {
    description: "Apply formatting to a range of cells",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Cell range (e.g. A1:D10)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, bold, fontSize, color, fillColor, alignment, borders}", formInputType: "json", required: true },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.styleRange $wb "A1:D1" {"bold": true, "fillColor": "#2196F3", "color": "#FFFFFF"}',
  },
  addFormula: {
    description: "Add a formula to a cell",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "cell", dataType: "string", description: "Cell reference", formInputType: "text", required: true },
      { name: "formula", dataType: "string", description: "Excel formula (e.g. SUM(A1:A10))", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, bold, numberFormat}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addFormula $wb "B11" "SUM(B2:B10)" {"bold": true, "numberFormat": "#,##0.00"}',
  },
  setColumnWidth: {
    description: "Set column widths",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "columns", dataType: "object", description: "Column widths object {A: 20, B: 30}", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.setColumnWidth $wb {"A": 25, "B": 15, "C": 40}',
  },
  mergeCells: {
    description: "Merge a range of cells",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Cell range (e.g. A1:D1)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.mergeCells $wb "A1:D1"',
  },
  loadSheet: {
    description: "Load an existing Excel file for editing",
    parameters: [
      { name: "filePath", dataType: "string", description: "Path to .xlsx file", formInputType: "text", required: true },
      { name: "id", dataType: "string", description: "Workbook ID", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "Workbook ID",
    example: 'office.loadSheet "./data.xlsx" "wb1" into $wb',
  },
  addWorksheet: {
    description: "Add a new worksheet to an existing workbook",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Sheet name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{tabColor}", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Sheet name",
    example: 'office.addWorksheet $wb "Revenue" {"tabColor": "#FF5722"}',
  },
  freezePanes: {
    description: "Freeze header rows and/or columns",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "rows", dataType: "number", description: "Number of rows to freeze", formInputType: "number", required: true },
      { name: "cols", dataType: "number", description: "Number of columns to freeze", formInputType: "number", required: false },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.freezePanes $wb 1 0 {"sheet": "Sheet1"}',
  },
  setAutoFilter: {
    description: "Add filter dropdowns on header columns",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Range for filter (e.g. A1:D1)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.setAutoFilter $wb "A1:D1" {"sheet": "Products"}',
  },
  addConditionalFormat: {
    description: "Add conditional formatting rules (color scales, data bars, icon sets, cell rules)",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Cell range", formInputType: "text", required: true },
      { name: "rules", dataType: "array", description: "Rules: [{type: cellIs|colorScale|dataBar|iconSet, operator, value, fillColor}]", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addConditionalFormat $wb "B2:B20" [{"type": "cellIs", "operator": "greaterThan", "value": 100, "fillColor": "#00FF00"}]',
  },
  addDataValidation: {
    description: "Add data validation (dropdowns, number/date constraints) to a cell",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "cellRef", dataType: "string", description: "Cell reference", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, type: list|whole|decimal|date, values: [...], min, max, operator, error, prompt}", formInputType: "json", required: true },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addDataValidation $wb "C2" {"type": "list", "values": ["Active", "Inactive", "Pending"], "sheet": "Sheet1"}',
  },
  addCellComment: {
    description: "Add a comment/note to a cell",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "cellRef", dataType: "string", description: "Cell reference", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Comment text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, author}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addCellComment $wb "A1" "This value needs verification" {"author": "Reviewer"}',
  },
  addSheetImage: {
    description: "Embed an image in a spreadsheet",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "imagePath", dataType: "string", description: "Path to image file", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Cell range (e.g. A1:D10) or empty for position", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{sheet, col, row, width, height}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSheetImage $wb "./chart.png" "E1:H10" {"sheet": "Sheet1"}',
  },
  addNamedRange: {
    description: "Define a named range for formulas",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Range name", formInputType: "text", required: true },
      { name: "range", dataType: "string", description: "Cell range (e.g. $A$1:$A$10)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addNamedRange $wb "Prices" "$B$2:$B$100" {"sheet": "Products"}',
  },
  protectSheet: {
    description: "Protect a worksheet with a password and permission options",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "Protection password", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, selectLockedCells, formatCells, insertRows, deleteRows, sort, autoFilter}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.protectSheet $wb "secret123" {"sheet": "Sheet1", "selectLockedCells": true, "sort": true}',
  },
  hideRowsColumns: {
    description: "Hide or show rows and columns",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "targets", dataType: "object", description: "{rows: [1,2,3], columns: ['C','D']}", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{sheet, hidden: bool}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.hideRowsColumns $wb {"rows": [5, 6], "columns": ["D"]} {"sheet": "Sheet1"}',
  },
  saveSheet: {
    description: "Save the workbook to an .xlsx file",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Output .xlsx path", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{path}",
    example: 'office.saveSheet $wb "./data.xlsx"',
  },
  // ── PowerPoint ──
  createSlides: {
    description: "Create a new PowerPoint presentation",
    parameters: [
      { name: "id", dataType: "string", description: "Presentation ID", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{title, author, layout}", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Presentation ID",
    example: 'office.createSlides "deck" {"title": "Q4 Report"} into $ppt',
  },
  addSlide: {
    description: "Add a slide with optional title/subtitle and background",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{title, subtitle, titleSize, backgroundColor}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Slide index",
    example: 'office.addSlide $ppt {"title": "Overview", "subtitle": "Q4 2026", "backgroundColor": "#1a1a2e"} into $slideIdx',
  },
  addSlideText: {
    description: "Add a text box to a slide with full formatting",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "text", dataType: "string", description: "Text content", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{x, y, w, h, fontSize, font, bold, italic, color, alignment, fillColor, bullet, lineSpacing}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideText $ppt 0 "Revenue: +23%" {"x": 1, "y": 3, "fontSize": 24, "bold": true, "color": "#27ae60"}',
  },
  addSlideImage: {
    description: "Add an image to a slide with positioning",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "imagePath", dataType: "string", description: "Path to image", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{x, y, w, h, rounding, hyperlink}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideImage $ppt 0 "./chart.png" {"x": 1, "y": 2, "w": 6, "h": 4}',
  },
  addSlideTable: {
    description: "Add a data table to a slide with styling",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "data", dataType: "array", description: "Array of objects or arrays", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{x, y, w, headerStyle, cellStyle, columnWidths, alternateRows, borders}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideTable $ppt 1 $data {"headerStyle": {"fillColor": "#2196F3"}, "alternateRows": true}',
  },
  addSlideChart: {
    description: "Add a chart to a slide",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "chartData", dataType: "array", description: "Chart data series [{name, labels, values}]", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{type: bar|line|pie|doughnut|area, x, y, w, h, title, legend, showValues}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideChart $ppt 2 $chartData {"type": "bar", "title": "Sales by Region"}',
  },
  addSlideShape: {
    description: "Add a shape to a slide",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "{shape: rect|ellipse|roundRect|line|triangle, x, y, w, h, fillColor, lineColor, lineWidth}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideShape $ppt 0 {"shape": "rect", "x": 0, "y": 0, "w": 10, "h": 0.5, "fillColor": "#2196F3"}',
  },
  addSlideNotes: {
    description: "Add speaker notes to a slide",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "text", dataType: "string", description: "Speaker notes text", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideNotes $ppt 0 "Remember to mention Q4 targets"',
  },
  addSlideMultiText: {
    description: "Add rich text with mixed formatting (bold/italic/color) in one text box",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "runs", dataType: "array", description: "Array of text runs [{text, bold, italic, color, fontSize, font, hyperlink}]", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{x, y, w, h, alignment, fillColor, lineSpacing, margin}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.addSlideMultiText $ppt 0 [{"text": "Revenue: ", "bold": true}, {"text": "+23%", "color": "#27ae60", "bold": true}] {"x": 1, "y": 3}',
  },
  setSlideNumber: {
    description: "Add a slide number to a slide",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "slideIndex", dataType: "number", description: "Slide index", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "{x, y, color, fontSize}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.setSlideNumber $ppt 0 {"x": 9.5, "y": "95%", "color": "#888888", "fontSize": 10}',
  },
  defineSlideMaster: {
    description: "Define a reusable slide master template with logo, background, and placeholders",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Master template name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{background, bgColor, margin, slideNumber, objects: [{rect: {...}}, {text: {...}}, {image: {...}}]}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.defineSlideMaster $ppt "BRAND" {"bgColor": "#FFFFFF", "objects": [{"rect": {"x": 0, "y": 0, "w": "100%", "h": 0.5, "fillColor": "#003366"}}]}',
  },
  addSlideFromMaster: {
    description: "Create a new slide from a defined master template",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "masterName", dataType: "string", description: "Master template name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{backgroundColor}", formInputType: "json", required: false },
    ],
    returnType: "number", returnDescription: "Slide index",
    example: 'office.addSlideFromMaster $ppt "BRAND" {} into $slideIdx',
  },
  saveSlides: {
    description: "Save the presentation to a .pptx file",
    parameters: [
      { name: "pptId", dataType: "string", description: "Presentation ID", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Output .pptx path", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{path}",
    example: 'office.saveSlides $ppt "./presentation.pptx"',
  },
  // ── Cross-format ──
  setSheetPrint: {
    description: "Configure print layout: paper size, orientation, print area, margins",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sheet, paperSize: 9=A4, orientation, fitToPage, fitToWidth, fitToHeight, printArea, margins: {left, right, top, bottom, header, footer}, printTitlesRow}", formInputType: "json", required: true },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.setSheetPrint $wb {"sheet": "Sheet1", "paperSize": 9, "orientation": "landscape", "printArea": "A1:F20"}',
  },
  groupRows: {
    description: "Group rows (or columns) into collapsible outline groups",
    parameters: [
      { name: "wbId", dataType: "string", description: "Workbook ID", formInputType: "text", required: true },
      { name: "start", dataType: "number", description: "Start row number", formInputType: "number", required: true },
      { name: "end", dataType: "number", description: "End row number", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "{sheet, level, collapsed, columns: {start, end, level}}", formInputType: "json", required: false },
    ],
    returnType: "boolean", returnDescription: "true",
    example: 'office.groupRows $wb 2 10 {"sheet": "Sheet1", "collapsed": false}',
  },
};

export const OfficeModuleMetadata: ModuleMetadata = {
  description: "Enterprise Microsoft Office suite — Word (.docx), Excel (.xlsx), PowerPoint (.pptx) with 57 functions: hyperlinks, TOC, footnotes, comments, sections, headers/footers, doc patching, conditional formatting, data validation, sheet protection, slide masters, and more",
  methods: [
    // Word (21)
    "createDoc", "readDoc", "addHeading", "addParagraph", "addTable", "addImage", "addPageBreak", "addList",
    "addHyperlink", "addBookmark", "addTableOfContents", "addFootnote", "addComment", "addSection",
    "setDocProperties", "addDocStyle", "addHeader", "addFooter", "patchDoc", "addCheckbox", "saveDoc",
    // Excel (21)
    "createSheet", "readSheet", "addRow", "writeData", "writeCell", "styleRange", "addFormula", "setColumnWidth", "mergeCells",
    "loadSheet", "addWorksheet", "freezePanes", "setAutoFilter", "addConditionalFormat", "addDataValidation",
    "addCellComment", "addSheetImage", "addNamedRange", "protectSheet", "hideRowsColumns", "saveSheet",
    // PowerPoint (13)
    "createSlides", "addSlide", "addSlideText", "addSlideImage", "addSlideTable", "addSlideChart", "addSlideShape",
    "addSlideNotes", "addSlideMultiText", "setSlideNumber", "defineSlideMaster", "addSlideFromMaster", "saveSlides",
    // Cross-format (2)
    "setSheetPrint", "groupRows",
  ],
};
