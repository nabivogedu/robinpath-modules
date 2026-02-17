import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { execSync } from "child_process";

function exec(cmd: string, cwd?: string): string {
  const opts: Record<string, unknown> = { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 };
  if (cwd) opts.cwd = cwd;
  return (execSync(cmd, opts).toString().trim()).trim();
}

export const GitFunctions: Record<string, BuiltinHandler> = {
  clone: (args: Value[]) => {
    const url = args[0] as string;
    const dest = (args[1] as string) ?? undefined;
    const cwd = (args[2] as string) ?? undefined;
    const cmd = dest ? `git clone ${url} ${dest}` : `git clone ${url}`;
    return exec(cmd, cwd);
  },

  init: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const bare = (args[1] as boolean) ?? false;
    const cmd = bare ? "git init --bare" : "git init";
    return exec(cmd, cwd);
  },

  status: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const short = (args[1] as boolean) ?? false;
    const cmd = short ? "git status --short" : "git status";
    return exec(cmd, cwd);
  },

  add: (args: Value[]) => {
    const files = args[0] as string | string[];
    const cwd = (args[1] as string) ?? undefined;
    const fileArg = Array.isArray(files) ? files.join(" ") : files;
    return exec(`git add ${fileArg}`, cwd);
  },

  commit: (args: Value[]) => {
    const message = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const amend = (args[2] as boolean) ?? false;
    const escapedMsg = message.replace(/"/g, '\\"');
    const cmd = amend ? `git commit --amend -m "${escapedMsg}"` : `git commit -m "${escapedMsg}"`;
    return exec(cmd, cwd);
  },

  push: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const remote = (args[1] as string) ?? "origin";
    const branch = (args[2] as string) ?? undefined;
    const force = (args[3] as boolean) ?? false;
    let cmd = `git push ${remote}`;
    if (branch) cmd += ` ${branch}`;
    if (force) cmd += " --force";
    return exec(cmd, cwd);
  },

  pull: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const remote = (args[1] as string) ?? "origin";
    const branch = (args[2] as string) ?? undefined;
    const rebase = (args[3] as boolean) ?? false;
    let cmd = `git pull ${remote}`;
    if (branch) cmd += ` ${branch}`;
    if (rebase) cmd += " --rebase";
    return exec(cmd, cwd);
  },

  branch: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const name = (args[1] as string) ?? undefined;
    const deleteBranch = (args[2] as boolean) ?? false;
    if (name && deleteBranch) return exec(`git branch -d ${name}`, cwd);
    if (name) return exec(`git branch ${name}`, cwd);
    return exec("git branch -a", cwd);
  },

  checkout: (args: Value[]) => {
    const target = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const create = (args[2] as boolean) ?? false;
    const cmd = create ? `git checkout -b ${target}` : `git checkout ${target}`;
    return exec(cmd, cwd);
  },

  log: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const count = (args[1] as number) ?? 10;
    const oneline = (args[2] as boolean) ?? true;
    const format = oneline ? "--oneline" : '--format="%H %an %s"';
    return exec(`git log -${count} ${format}`, cwd);
  },

  diff: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const staged = (args[1] as boolean) ?? false;
    const ref = (args[2] as string) ?? undefined;
    let cmd = "git diff";
    if (staged) cmd += " --staged";
    if (ref) cmd += ` ${ref}`;
    return exec(cmd, cwd);
  },

  tag: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const name = (args[1] as string) ?? undefined;
    const message = (args[2] as string) ?? undefined;
    if (!name) return exec("git tag -l", cwd);
    if (message) {
      const escapedMsg = message.replace(/"/g, '\\"');
      return exec(`git tag -a ${name} -m "${escapedMsg}"`, cwd);
    }
    return exec(`git tag ${name}`, cwd);
  },

  remote: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const verbose = (args[1] as boolean) ?? true;
    return exec(verbose ? "git remote -v" : "git remote", cwd);
  },

  merge: (args: Value[]) => {
    const branch = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const noFf = (args[2] as boolean) ?? false;
    const cmd = noFf ? `git merge --no-ff ${branch}` : `git merge ${branch}`;
    return exec(cmd, cwd);
  },

  stash: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const action = (args[1] as string) ?? "push";
    const message = (args[2] as string) ?? undefined;
    if (action === "pop") return exec("git stash pop", cwd);
    if (action === "list") return exec("git stash list", cwd);
    if (action === "drop") return exec("git stash drop", cwd);
    if (action === "apply") return exec("git stash apply", cwd);
    if (message) {
      const escapedMsg = message.replace(/"/g, '\\"');
      return exec(`git stash push -m "${escapedMsg}"`, cwd);
    }
    return exec("git stash push", cwd);
  },

  reset: (args: Value[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const ref = (args[1] as string) ?? "HEAD";
    const mode = (args[2] as string) ?? "mixed";
    return exec(`git reset --${mode} ${ref}`, cwd);
  },
};

export const GitFunctionMetadata = {
  clone: {
    description: "Clone a git repository",
    parameters: [
      { name: "url", dataType: "string", formInputType: "text", required: true, description: "Repository URL to clone" },
      { name: "dest", dataType: "string", formInputType: "text", required: false, description: "Destination directory" },
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Working directory" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  init: {
    description: "Initialize a new git repository",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Directory to initialize" },
      { name: "bare", dataType: "boolean", formInputType: "checkbox", required: false, description: "Create a bare repository" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  status: {
    description: "Get the working tree status",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "short", dataType: "boolean", formInputType: "checkbox", required: false, description: "Show short status" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  add: {
    description: "Stage files for commit",
    parameters: [
      { name: "files", dataType: "string | string[]", required: true, description: "Files to stage (path or array of paths, use '.' for all)" },
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  commit: {
    description: "Create a commit with the staged changes",
    parameters: [
      { name: "message", dataType: "string", formInputType: "text", required: true, description: "Commit message" },
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "amend", dataType: "boolean", formInputType: "checkbox", required: false, description: "Amend the previous commit" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  push: {
    description: "Push commits to a remote repository",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "remote", dataType: "string", formInputType: "text", required: false, description: "Remote name (default: origin)" },
      { name: "branch", dataType: "string", formInputType: "text", required: false, description: "Branch to push" },
      { name: "force", dataType: "boolean", formInputType: "checkbox", required: false, description: "Force push" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  pull: {
    description: "Pull changes from a remote repository",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "remote", dataType: "string", formInputType: "text", required: false, description: "Remote name (default: origin)" },
      { name: "branch", dataType: "string", formInputType: "text", required: false, description: "Branch to pull" },
      { name: "rebase", dataType: "boolean", formInputType: "checkbox", required: false, description: "Rebase instead of merge" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  branch: {
    description: "List, create, or delete branches",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "name", dataType: "string", formInputType: "text", required: false, description: "Branch name to create (omit to list)" },
      { name: "deleteBranch", dataType: "boolean", formInputType: "checkbox", required: false, description: "Delete the named branch" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  checkout: {
    description: "Switch branches or restore working tree files",
    parameters: [
      { name: "target", dataType: "string", formInputType: "text", required: true, description: "Branch or commit to checkout" },
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "create", dataType: "boolean", formInputType: "checkbox", required: false, description: "Create a new branch" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  log: {
    description: "Show the commit log",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "count", dataType: "number", formInputType: "number", required: false, description: "Number of commits to show (default: 10)" },
      { name: "oneline", dataType: "boolean", formInputType: "checkbox", required: false, description: "One line per commit (default: true)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  diff: {
    description: "Show changes between commits, working tree, etc.",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "staged", dataType: "boolean", formInputType: "checkbox", required: false, description: "Show staged changes" },
      { name: "ref", dataType: "string", formInputType: "text", required: false, description: "Reference to diff against" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  tag: {
    description: "Create or list tags",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "name", dataType: "string", formInputType: "text", required: false, description: "Tag name (omit to list)" },
      { name: "message", dataType: "string", formInputType: "text", required: false, description: "Tag message (creates annotated tag)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  remote: {
    description: "List remote repositories",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "verbose", dataType: "boolean", formInputType: "checkbox", required: false, description: "Show URLs (default: true)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  merge: {
    description: "Merge a branch into the current branch",
    parameters: [
      { name: "branch", dataType: "string", formInputType: "text", required: true, description: "Branch to merge" },
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "noFf", dataType: "boolean", formInputType: "checkbox", required: false, description: "Create a merge commit even for fast-forward" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  stash: {
    description: "Stash or restore uncommitted changes",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "action", dataType: "string", formInputType: "text", required: false, description: "Action: push, pop, list, drop, apply (default: push)" },
      { name: "message", dataType: "string", formInputType: "text", required: false, description: "Stash message (for push)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  reset: {
    description: "Reset the current HEAD to a specified state",
    parameters: [
      { name: "cwd", dataType: "string", formInputType: "text", required: false, description: "Repository path" },
      { name: "ref", dataType: "string", formInputType: "text", required: false, description: "Commit reference (default: HEAD)" },
      { name: "mode", dataType: "string", formInputType: "text", required: false, description: "Reset mode: soft, mixed, hard (default: mixed)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const GitModuleMetadata = {
  description: "Git version control operations using the system git binary",
  version: "1.0.0",
  dependencies: [],
};
