// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import archiver from "archiver";
import AdmZip from "adm-zip";
import * as tar from "tar";
import { createWriteStream, existsSync, mkdirSync, statSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

const createZip: BuiltinHandler = async (args) => {
  const outputPath = String(args[0] ?? "archive.zip");
  const sources = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  return new Promise<{ path: string; size: number; files: number }>((resolve: any, reject: any) => {
    const output = createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: Number(opts.level ?? 9) } });
    let fileCount = 0;

    output.on("close", () => resolve({ path: outputPath, size: archive.pointer(), files: fileCount }));
    archive.on("error", reject);
    archive.pipe(output);

    for (const src of sources) {
      if (existsSync(src) && statSync(src).isDirectory()) {
        archive.directory(src, basename(src));
      } else if (existsSync(src)) {
        archive.file(src, { name: basename(src) });
        fileCount++;
      }
    }

    archive.finalize();
  });
};

const extractZip: BuiltinHandler = (args) => {
  const zipPath = String(args[0] ?? "");
  const outputDir = String(args[1] ?? "./extracted");
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  const zip = new AdmZip(zipPath);
  zip.extractAllTo(outputDir, true);
  const entries = zip.getEntries().map((e: any) => ({ name: e.entryName, size: e.header.size, isDirectory: e.isDirectory }));
  return { path: outputDir, files: entries.length, entries };
};

const listZip: BuiltinHandler = (args) => {
  const zipPath = String(args[0] ?? "");
  const zip = new AdmZip(zipPath);
  return zip.getEntries().map((e: any) => ({ name: e.entryName, size: e.header.size, compressedSize: e.header.compressedSize, isDirectory: e.isDirectory }));
};

const readFromZip: BuiltinHandler = (args) => {
  const zipPath = String(args[0] ?? "");
  const entryName = String(args[1] ?? "");
  const zip = new AdmZip(zipPath);
  const entry = zip.getEntry(entryName);
  if (!entry) return null;
  return entry.getData().toString("utf-8");
};

const createTarGz: BuiltinHandler = async (args) => {
  const outputPath = String(args[0] ?? "archive.any");
  const sourceDir = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  return new Promise<{ path: string }>((resolve: any, reject: any) => {
    const output = createWriteStream(outputPath);
    const archive = archiver("tar", { gzip: true, gzipOptions: { level: Number(opts.level ?? 9) } });
    output.on("close", () => resolve({ path: outputPath }));
    archive.on("error", reject);
    archive.pipe(output);

    if (existsSync(sourceDir) && statSync(sourceDir).isDirectory()) {
      archive.directory(sourceDir, false);
    } else if (existsSync(sourceDir)) {
      archive.file(sourceDir, { name: basename(sourceDir) });
    }

    archive.finalize();
  });
};

const extractTarGz: BuiltinHandler = async (args) => {
  const tarPath = String(args[0] ?? "");
  const outputDir = String(args[1] ?? "./extracted");
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
  await any({ file: tarPath, cwd: outputDir });
  return { path: outputDir };
};

const addToZip: BuiltinHandler = (args) => {
  const zipPath = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const entryName = String(args[2] ?? basename(filePath));
  const zip = existsSync(zipPath) ? new AdmZip(zipPath) : new AdmZip();
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    zip.addLocalFolder(filePath, entryName);
  } else {
    zip.addLocalFile(filePath, "", entryName);
  }
  zip.writeZip(zipPath);
  return { path: zipPath, added: entryName };
};

const removeFromZip: BuiltinHandler = (args) => {
  const zipPath = String(args[0] ?? "");
  const entryName = String(args[1] ?? "");
  const zip = new AdmZip(zipPath);
  zip.deleteFile(entryName);
  zip.writeZip(zipPath);
  return true;
};

export const ArchiveFunctions: Record<string, BuiltinHandler> = { createZip, extractZip, listZip, readFromZip, createTarGz, extractTarGz, addToZip, removeFromZip };

export const ArchiveFunctionMetadata = {
  createZip: { description: "Create a .zip archive from files and directories", parameters: [{ name: "output", dataType: "string", description: "Output .zip path", formInputType: "text", required: true }, { name: "sources", dataType: "array", description: "Files/dirs to archive", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{level: 1-9}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, size, files}", example: 'archive.createZip "./backup.zip" ["./src", "./package.json"]' },
  extractZip: { description: "Extract a .zip archive", parameters: [{ name: "zipPath", dataType: "string", description: ".zip file path", formInputType: "text", required: true }, { name: "outputDir", dataType: "string", description: "Extraction directory", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, files, entries}", example: 'archive.extractZip "./backup.zip" "./restored"' },
  listZip: { description: "List entries in a .zip file", parameters: [{ name: "zipPath", dataType: "string", description: ".zip file path", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of entry info", example: 'archive.listZip "./backup.zip"' },
  readFromZip: { description: "Read a file from inside a .zip without extracting", parameters: [{ name: "zipPath", dataType: "string", description: ".zip file path", formInputType: "text", required: true }, { name: "entry", dataType: "string", description: "Entry name", formInputType: "text", required: true }], returnType: "string", returnDescription: "File contents as string", example: 'archive.readFromZip "./backup.zip" "config.json"' },
  createTarGz: { description: "Create a .any archive", parameters: [{ name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "source", dataType: "string", description: "Source dir/file", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path}", example: 'archive.createTarGz "./backup.any" "./src"' },
  extractTarGz: { description: "Extract a .any archive", parameters: [{ name: "tarPath", dataType: "string", description: ".any path", formInputType: "text", required: true }, { name: "outputDir", dataType: "string", description: "Extraction directory", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path}", example: 'archive.extractTarGz "./backup.any" "./restored"' },
  addToZip: { description: "Add a file or directory to an existing .zip", parameters: [{ name: "zipPath", dataType: "string", description: ".zip file path", formInputType: "text", required: true }, { name: "filePath", dataType: "string", description: "File to add", formInputType: "text", required: true }, { name: "entryName", dataType: "string", description: "Name inside zip", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, added}", example: 'archive.addToZip "./backup.zip" "./newfile.txt"' },
  removeFromZip: { description: "Remove an entry from a .zip", parameters: [{ name: "zipPath", dataType: "string", description: ".zip file path", formInputType: "text", required: true }, { name: "entry", dataType: "string", description: "Entry name to remove", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'archive.removeFromZip "./backup.zip" "old.txt"' },
};

export const ArchiveModuleMetadata = {
  description: "Create, extract, and manipulate .zip and .any archives",
  methods: ["createZip", "extractZip", "listZip", "readFromZip", "createTarGz", "extractTarGz", "addToZip", "removeFromZip"],
};
