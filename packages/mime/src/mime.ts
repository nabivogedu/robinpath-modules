import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

const mimeTypes: Record<string, string> = {
  ".html": "text/html", ".htm": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".mjs": "application/javascript", ".cjs": "application/javascript", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain", ".csv": "text/csv", ".tsv": "text/tab-separated-values",
  ".md": "text/markdown", ".yaml": "application/x-yaml", ".yml": "application/x-yaml",
  ".toml": "application/toml", ".ini": "text/plain", ".env": "text/plain", ".log": "text/plain",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon", ".bmp": "image/bmp",
  ".tiff": "image/tiff", ".tif": "image/tiff", ".avif": "image/avif", ".heic": "image/heic",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg", ".flac": "audio/flac",
  ".aac": "audio/aac", ".m4a": "audio/mp4", ".wma": "audio/x-ms-wma", ".opus": "audio/opus",
  ".mp4": "video/mp4", ".webm": "video/webm", ".avi": "video/x-msvideo", ".mov": "video/quicktime",
  ".mkv": "video/x-matroska", ".wmv": "video/x-ms-wmv", ".flv": "video/x-flv", ".m4v": "video/mp4",
  ".pdf": "application/pdf", ".zip": "application/zip", ".gz": "application/gzip",
  ".tar": "application/x-tar", ".rar": "application/vnd.rar", ".7z": "application/x-7z-compressed",
  ".bz2": "application/x-bzip2", ".xz": "application/x-xz", ".zst": "application/zstd",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".wasm": "application/wasm", ".ts": "application/typescript", ".tsx": "application/typescript",
  ".jsx": "text/jsx", ".vue": "text/x-vue", ".svelte": "text/x-svelte",
  ".sh": "application/x-sh", ".bash": "application/x-sh", ".zsh": "application/x-sh",
  ".py": "text/x-python", ".rb": "text/x-ruby", ".java": "text/x-java-source",
  ".c": "text/x-c", ".cpp": "text/x-c++src", ".h": "text/x-c", ".hpp": "text/x-c++src",
  ".go": "text/x-go", ".rs": "text/x-rustsrc", ".swift": "text/x-swift",
  ".kt": "text/x-kotlin", ".scala": "text/x-scala", ".r": "text/x-r",
  ".sql": "application/sql", ".graphql": "application/graphql", ".gql": "application/graphql",
  ".ics": "text/calendar", ".vcf": "text/vcard",
  ".rtf": "application/rtf", ".ps": "application/postscript", ".eps": "application/postscript",
  ".swf": "application/x-shockwave-flash", ".jar": "application/java-archive",
  ".apk": "application/vnd.android.package-archive",
  ".dmg": "application/x-apple-diskimage", ".iso": "application/x-iso9660-image",
  ".deb": "application/x-debian-package", ".rpm": "application/x-rpm",
  ".exe": "application/x-msdownload", ".msi": "application/x-msdownload",
  ".bin": "application/octet-stream", ".dll": "application/x-msdownload",
  ".pem": "application/x-pem-file", ".crt": "application/x-x509-ca-cert",
  ".key": "application/x-pem-file",
};

const reverseMap: Record<string, string> = {};
for (const [ext, mime] of Object.entries(mimeTypes)) {
  if (!reverseMap[mime]) reverseMap[mime] = ext;
}

const magicBytes: { bytes: number[]; offset: number; mime: string }[] = [
  { bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A], offset: 0, mime: "image/png" },
  { bytes: [0xFF, 0xD8, 0xFF], offset: 0, mime: "image/jpeg" },
  { bytes: [0x47, 0x49, 0x46, 0x38], offset: 0, mime: "image/gif" },
  { bytes: [0x52, 0x49, 0x46, 0x46], offset: 0, mime: "image/webp" },
  { bytes: [0x25, 0x50, 0x44, 0x46], offset: 0, mime: "application/pdf" },
  { bytes: [0x50, 0x4B, 0x03, 0x04], offset: 0, mime: "application/zip" },
  { bytes: [0x1F, 0x8B], offset: 0, mime: "application/gzip" },
  { bytes: [0x42, 0x5A, 0x68], offset: 0, mime: "application/x-bzip2" },
  { bytes: [0xFD, 0x37, 0x7A, 0x58, 0x5A], offset: 0, mime: "application/x-xz" },
  { bytes: [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C], offset: 0, mime: "application/x-7z-compressed" },
  { bytes: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07], offset: 0, mime: "application/vnd.rar" },
  { bytes: [0x49, 0x44, 0x33], offset: 0, mime: "audio/mpeg" },
  { bytes: [0xFF, 0xFB], offset: 0, mime: "audio/mpeg" },
  { bytes: [0x4F, 0x67, 0x67, 0x53], offset: 0, mime: "audio/ogg" },
  { bytes: [0x66, 0x4C, 0x61, 0x43], offset: 0, mime: "audio/flac" },
  { bytes: [0x00, 0x00, 0x00], offset: 0, mime: "video/mp4" },
  { bytes: [0x1A, 0x45, 0xDF, 0xA3], offset: 0, mime: "video/webm" },
  { bytes: [0x00, 0x61, 0x73, 0x6D], offset: 0, mime: "application/wasm" },
];

const lookup: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");
  const ext = input.startsWith(".") ? String(input).toLowerCase() : extname(input).toLowerCase();
  return mimeTypes[ext] ?? null;
};

const extension: BuiltinHandler = (args) => {
  const mime = String(args[0] ?? "").toLowerCase();
  return reverseMap[mime] ?? null;
};

const detect: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const buffer = readFileSync(filePath);
  for (const magic of magicBytes) {
    if (buffer.length < magic.offset + magic.bytes.length) continue;
    let match = true;
    for (let i = 0; i < magic.bytes.length; i++) {
      if (buffer[magic.offset + i] !== magic.bytes[i]) { match = false; break; }
    }
    if (match) return magic.mime;
  }
  return lookup([filePath]);
};

const charset: BuiltinHandler = (args) => {
  const mime = String(args[0] ?? "").toLowerCase();
  if (mime.startsWith("text/") || mime.includes("json") || mime.includes("xml") || mime.includes("javascript") || mime.includes("typescript")) return "UTF-8";
  return null;
};

const isText: BuiltinHandler = (args) => { const m = String(args[0] ?? "").toLowerCase(); return m.startsWith("text/") || m.includes("json") || m.includes("xml") || m.includes("javascript") || m.includes("typescript"); };
const isImage: BuiltinHandler = (args) => String(args[0] ?? "").toLowerCase().startsWith("image/");
const isAudio: BuiltinHandler = (args) => String(args[0] ?? "").toLowerCase().startsWith("audio/");
const isVideo: BuiltinHandler = (args) => String(args[0] ?? "").toLowerCase().startsWith("video/");
const isFont: BuiltinHandler = (args) => { const m = String(args[0] ?? "").toLowerCase(); return m.startsWith("font/") || m.includes("fontobject"); };
const isArchive: BuiltinHandler = (args) => { const m = String(args[0] ?? "").toLowerCase(); return m.includes("zip") || m.includes("tar") || m.includes("gzip") || m.includes("rar") || m.includes("7z") || m.includes("bzip") || m.includes("compress"); };

const contentType: BuiltinHandler = (args) => {
  const mime = lookup(args) as string | null;
  if (!mime) return null;
  const cs = charset([mime]);
  return cs ? `${mime}; charset=${String(cs).toLowerCase()}` : mime;
};

const allTypes: BuiltinHandler = () => ({ ...mimeTypes });

export const MimeFunctions: Record<string, BuiltinHandler> = { lookup, extension, detect, charset, isText, isImage, isAudio, isVideo, isFont, isArchive, contentType, allTypes };

export const MimeFunctionMetadata = {
  lookup: { description: "Get MIME type from file extension", parameters: [{ name: "pathOrExt", dataType: "string", description: "File path or extension", formInputType: "text", required: true }], returnType: "string", returnDescription: "MIME type or null", example: 'mime.lookup "photo.png"' },
  extension: { description: "Get extension from MIME type", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "string", returnDescription: "Extension or null", example: 'mime.extension "image/png"' },
  detect: { description: "Detect MIME type from file content (magic bytes)", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }], returnType: "string", returnDescription: "Detected MIME type", example: 'mime.detect "./unknown_file"' },
  charset: { description: "Get charset for MIME type", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "string", returnDescription: "UTF-8 or null", example: 'mime.charset "text/html"' },
  isText: { description: "Check if MIME type is text-based", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if text", example: 'mime.isText "application/json"' },
  isImage: { description: "Check if MIME type is image", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if image", example: 'mime.isImage "image/png"' },
  isAudio: { description: "Check if MIME type is audio", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if audio", example: 'mime.isAudio "audio/mpeg"' },
  isVideo: { description: "Check if MIME type is video", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if video", example: 'mime.isVideo "video/mp4"' },
  isFont: { description: "Check if MIME type is font", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if font", example: 'mime.isFont "font/woff2"' },
  isArchive: { description: "Check if MIME type is archive", parameters: [{ name: "mimeType", dataType: "string", description: "MIME type", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if archive", example: 'mime.isArchive "application/zip"' },
  contentType: { description: "Build Content-Type header with charset", parameters: [{ name: "pathOrExt", dataType: "string", description: "File path or extension", formInputType: "text", required: true }], returnType: "string", returnDescription: "Content-Type header value", example: 'mime.contentType "index.html"' },
  allTypes: { description: "Get all known MIME type mappings", parameters: [], returnType: "object", returnDescription: "Extension-to-MIME map", example: "mime.allTypes" },
};

export const MimeModuleMetadata = {
  description: "MIME type detection from extensions and file content, type classification, Content-Type building",
  methods: ["lookup", "extension", "detect", "charset", "isText", "isImage", "isAudio", "isVideo", "isFont", "isArchive", "contentType", "allTypes"],
};
