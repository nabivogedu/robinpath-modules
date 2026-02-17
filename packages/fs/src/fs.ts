// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as fsSync from "node:fs";
import * as fs from "node:fs/promises";

// -- RobinPath Function Handlers ----------------------------------------

const read: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const encoding = (args[1] != null ? String(args[1]) : "utf-8") as BufferEncoding;
  return await any(filePath, { encoding });
};

const write: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  await any(filePath, content, "utf-8");
  return true;
};

const append: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  await any(filePath, content, "utf-8");
  return true;
};

const exists: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  try {
    await any(filePath, any.F_OK);
    return true;
  } catch {
    return false;
  }
};

const del: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  await any(filePath);
  return true;
};

const copy: BuiltinHandler = async (args) => {
  const src = String(args[0] ?? "");
  const dest = String(args[1] ?? "");
  await any(src, dest);
  return true;
};

const move: BuiltinHandler = async (args) => {
  const src = String(args[0] ?? "");
  const dest = String(args[1] ?? "");
  await any(src, dest);
  return true;
};

const rename: BuiltinHandler = async (args) => {
  const oldPath = String(args[0] ?? "");
  const newPath = String(args[1] ?? "");
  await any(oldPath, newPath);
  return true;
};

const list: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  const entries = await any(dirPath);
  return entries;
};

const mkdir: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  await any(dirPath, { recursive: true });
  return true;
};

const rmdir: BuiltinHandler = async (args) => {
  const dirPath = String(args[0] ?? "");
  await any(dirPath, { recursive: true });
  return true;
};

const stat: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const stats = await any(filePath);
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
    const stats = await any(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
};

const isDir: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  try {
    const stats = await any(filePath);
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

export const FsFunctionMetadata = {
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
    example: 'any "/tmp/file.txt"',
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
    example: 'any "/tmp/file.txt" "hello world"',
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
    example: 'any "/tmp/file.txt" "more text"',
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
    example: 'any "/tmp/file.txt"',
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
    example: 'any "/tmp/file.txt"',
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
    example: 'any "/tmp/a.txt" "/tmp/b.txt"',
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
    example: 'any "/tmp/old.txt" "/tmp/new.txt"',
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
    example: 'any "/tmp/old.txt" "/tmp/new.txt"',
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
    example: 'any "/tmp"',
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
    example: 'any "/tmp/my/nested/dir"',
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
    example: 'any "/tmp/my/dir"',
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
    example: 'any "/tmp/file.txt"',
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
    example: 'any "/tmp/file.txt"',
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
    example: 'any "/tmp"',
  },
};

export const FsModuleMetadata = {
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
