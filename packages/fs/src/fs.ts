import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as fsSync from "node:fs";
import * as fs from "node:fs/promises";

// -- RobinPath Function Handlers ----------------------------------------

const read: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const encoding = (args[1] != null ? String(args[1]) : "utf-8") as BufferEncoding;
  return await fs.readFile(filePath, { encoding });
};

const write: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  await fs.writeFile(filePath, content, "utf-8");
  return true;
};

const append: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  await fs.appendFile(filePath, content, "utf-8");
  return true;
};

const exists: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  try {
    await fs.access(filePath, fsSync.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const del: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  await fs.unlink(filePath);
  return true;
};

const copy: BuiltinHandler = async (args) => {
  const src = String(args[0] ?? "");
  const dest = String(args[1] ?? "");
  await fs.copyFile(src, dest);
  return true;
};

const move: BuiltinHandler = async (args) => {
  const src = String(args[0] ?? "");
  const dest = String(args[1] ?? "");
  await fs.rename(src, dest);
  return true;
};

const rename: BuiltinHandler = async (args) => {
  const oldPath = String(args[0] ?? "");
  const newPath = String(args[1] ?? "");
  await fs.rename(oldPath, newPath);
  return true;
};

const list: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  const entries = await fs.readdir(dirPath);
  return entries;
};

const mkdir: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  await fs.mkdir(dirPath, { recursive: true });
  return true;
};

const rmdir: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  await fs.rm(dirPath, { recursive: true });
  return true;
};

const stat: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const stats = await fs.stat(filePath);
  return {
    size: stats.size,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    created: stats.birthtime.toISOString(),
    modified: stats.mtime.toISOString(),
  };
};

const isFile: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
};

const isDir: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  try {
    const stats = await fs.stat(filePath);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

// -- Exports ------------------------------------------------------------

export const FsFunctions: Record<string, BuiltinHandler> = {
  read,
  write,
  append,
  exists,
  delete: del,
  copy,
  move,
  rename,
  list,
  mkdir,
  rmdir,
  stat,
  isFile,
  isDir,
};

export const FsFunctionMetadata: Record<string, FunctionMetadata> = {
  read: {
    description: "Read the contents of a file as a string",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Absolute or relative path to the file",
        formInputType: "text",
        required: true,
      },
      {
        name: "encoding",
        dataType: "string",
        description: "Character encoding (default: utf-8)",
        formInputType: "text",
        required: false,
        defaultValue: "utf-8",
      },
    ],
    returnType: "string",
    returnDescription: "The file contents as a string",
    example: 'fs.read "/tmp/file.txt"',
  },
  write: {
    description: "Write content to a file, creating or overwriting it",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Absolute or relative path to the file",
        formInputType: "text",
        required: true,
      },
      {
        name: "content",
        dataType: "string",
        description: "The content to write",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the write succeeded",
    example: 'fs.write "/tmp/file.txt" "hello world"',
  },
  append: {
    description: "Append content to the end of a file",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Absolute or relative path to the file",
        formInputType: "text",
        required: true,
      },
      {
        name: "content",
        dataType: "string",
        description: "The content to append",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the append succeeded",
    example: 'fs.append "/tmp/file.txt" "more text"',
  },
  exists: {
    description: "Check whether a file or directory exists at the given path",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Absolute or relative path to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the path exists, false otherwise",
    example: 'fs.exists "/tmp/file.txt"',
  },
  delete: {
    description: "Delete a file",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Absolute or relative path to the file to delete",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the file was deleted",
    example: 'fs.delete "/tmp/file.txt"',
  },
  copy: {
    description: "Copy a file from source to destination",
    parameters: [
      {
        name: "src",
        dataType: "string",
        description: "Path to the source file",
        formInputType: "text",
        required: true,
      },
      {
        name: "dest",
        dataType: "string",
        description: "Path to the destination file",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the copy succeeded",
    example: 'fs.copy "/tmp/a.txt" "/tmp/b.txt"',
  },
  move: {
    description: "Move or rename a file from source to destination",
    parameters: [
      {
        name: "src",
        dataType: "string",
        description: "Path to the source file",
        formInputType: "text",
        required: true,
      },
      {
        name: "dest",
        dataType: "string",
        description: "Path to the destination file",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the move succeeded",
    example: 'fs.move "/tmp/old.txt" "/tmp/new.txt"',
  },
  rename: {
    description: "Rename a file (alias for move)",
    parameters: [
      {
        name: "oldPath",
        dataType: "string",
        description: "Current file path",
        formInputType: "text",
        required: true,
      },
      {
        name: "newPath",
        dataType: "string",
        description: "New file path",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the rename succeeded",
    example: 'fs.rename "/tmp/old.txt" "/tmp/new.txt"',
  },
  list: {
    description: "List the contents of a directory",
    parameters: [
      {
        name: "dir",
        dataType: "string",
        description: "Path to the directory to list",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of filenames in the directory",
    example: 'fs.list "/tmp"',
  },
  mkdir: {
    description: "Create a directory (recursively creates parent directories)",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path of the directory to create",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the directory was created",
    example: 'fs.mkdir "/tmp/my/nested/dir"',
  },
  rmdir: {
    description: "Remove a directory and its contents",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path of the directory to remove",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the directory was removed",
    example: 'fs.rmdir "/tmp/my/dir"',
  },
  stat: {
    description: "Get file or directory statistics",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path to the file or directory",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "Object with size, isFile, isDirectory, created, and modified properties",
    example: 'fs.stat "/tmp/file.txt"',
  },
  isFile: {
    description: "Check whether a path points to a regular file",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the path is a regular file, false otherwise",
    example: 'fs.isFile "/tmp/file.txt"',
  },
  isDir: {
    description: "Check whether a path points to a directory",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the path is a directory, false otherwise",
    example: 'fs.isDir "/tmp"',
  },
};

export const FsModuleMetadata: ModuleMetadata = {
  description: "Read, write, copy, move, and manage files and directories",
  methods: [
    "read",
    "write",
    "append",
    "exists",
    "delete",
    "copy",
    "move",
    "rename",
    "list",
    "mkdir",
    "rmdir",
    "stat",
    "isFile",
    "isDir",
  ],
};
