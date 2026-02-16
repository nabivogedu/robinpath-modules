import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { execSync } from "child_process";

function exec(cmd: string, cwd?: string): string {
  const opts: Record<string, unknown> = { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 };
  if (cwd) opts.cwd = cwd;
  return (execSync(cmd, opts) as string).trim();
}

export const GitFunctions: Record<string, BuiltinHandler> = {
  clone: (args: unknown[]) => {
    const url = args[0] as string;
    const dest = (args[1] as string) ?? undefined;
    const cwd = (args[2] as string) ?? undefined;
    const cmd = dest ? `git clone ${url} ${dest}` : `git clone ${url}`;
    return exec(cmd, cwd);
  },

  init: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const bare = (args[1] as boolean) ?? false;
    const cmd = bare ? "git init --bare" : "git init";
    return exec(cmd, cwd);
  },

  status: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const short = (args[1] as boolean) ?? false;
    const cmd = short ? "git status --short" : "git status";
    return exec(cmd, cwd);
  },

  add: (args: unknown[]) => {
    const files = args[0] as string | string[];
    const cwd = (args[1] as string) ?? undefined;
    const fileArg = Array.isArray(files) ? files.join(" ") : files;
    return exec(`git add ${fileArg}`, cwd);
  },

  commit: (args: unknown[]) => {
    const message = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const amend = (args[2] as boolean) ?? false;
    const escapedMsg = message.replace(/"/g, '\\"');
    const cmd = amend ? `git commit --amend -m "${escapedMsg}"` : `git commit -m "${escapedMsg}"`;
    return exec(cmd, cwd);
  },

  push: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const remote = (args[1] as string) ?? "origin";
    const branch = (args[2] as string) ?? undefined;
    const force = (args[3] as boolean) ?? false;
    let cmd = `git push ${remote}`;
    if (branch) cmd += ` ${branch}`;
    if (force) cmd += " --force";
    return exec(cmd, cwd);
  },

  pull: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const remote = (args[1] as string) ?? "origin";
    const branch = (args[2] as string) ?? undefined;
    const rebase = (args[3] as boolean) ?? false;
    let cmd = `git pull ${remote}`;
    if (branch) cmd += ` ${branch}`;
    if (rebase) cmd += " --rebase";
    return exec(cmd, cwd);
  },

  branch: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const name = (args[1] as string) ?? undefined;
    const deleteBranch = (args[2] as boolean) ?? false;
    if (name && deleteBranch) return exec(`git branch -d ${name}`, cwd);
    if (name) return exec(`git branch ${name}`, cwd);
    return exec("git branch -a", cwd);
  },

  checkout: (args: unknown[]) => {
    const target = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const create = (args[2] as boolean) ?? false;
    const cmd = create ? `git checkout -b ${target}` : `git checkout ${target}`;
    return exec(cmd, cwd);
  },

  log: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const count = (args[1] as number) ?? 10;
    const oneline = (args[2] as boolean) ?? true;
    const format = oneline ? "--oneline" : '--format="%H %an %s"';
    return exec(`git log -${count} ${format}`, cwd);
  },

  diff: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const staged = (args[1] as boolean) ?? false;
    const ref = (args[2] as string) ?? undefined;
    let cmd = "git diff";
    if (staged) cmd += " --staged";
    if (ref) cmd += ` ${ref}`;
    return exec(cmd, cwd);
  },

  tag: (args: unknown[]) => {
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

  remote: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const verbose = (args[1] as boolean) ?? true;
    return exec(verbose ? "git remote -v" : "git remote", cwd);
  },

  merge: (args: unknown[]) => {
    const branch = args[0] as string;
    const cwd = (args[1] as string) ?? undefined;
    const noFf = (args[2] as boolean) ?? false;
    const cmd = noFf ? `git merge --no-ff ${branch}` : `git merge ${branch}`;
    return exec(cmd, cwd);
  },

  stash: (args: unknown[]) => {
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

  reset: (args: unknown[]) => {
    const cwd = (args[0] as string) ?? undefined;
    const ref = (args[1] as string) ?? "HEAD";
    const mode = (args[2] as string) ?? "mixed";
    return exec(`git reset --${mode} ${ref}`, cwd);
  },
};

export const GitFunctionMetadata: Record<string, FunctionMetadata> = {
  clone: {
    description: "Clone a git repository",
    parameters: [
      { name: "url", type: "string", required: true, description: "Repository URL to clone" },
      { name: "dest", type: "string", required: false, description: "Destination directory" },
      { name: "cwd", type: "string", required: false, description: "Working directory" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  init: {
    description: "Initialize a new git repository",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Directory to initialize" },
      { name: "bare", type: "boolean", required: false, description: "Create a bare repository" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  status: {
    description: "Get the working tree status",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "short", type: "boolean", required: false, description: "Show short status" },
    ],
    returns: { type: "string", description: "Status output" },
  },
  add: {
    description: "Stage files for commit",
    parameters: [
      { name: "files", type: "string | string[]", required: true, description: "Files to stage (path or array of paths, use '.' for all)" },
      { name: "cwd", type: "string", required: false, description: "Repository path" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  commit: {
    description: "Create a commit with the staged changes",
    parameters: [
      { name: "message", type: "string", required: true, description: "Commit message" },
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "amend", type: "boolean", required: false, description: "Amend the previous commit" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  push: {
    description: "Push commits to a remote repository",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "remote", type: "string", required: false, description: "Remote name (default: origin)" },
      { name: "branch", type: "string", required: false, description: "Branch to push" },
      { name: "force", type: "boolean", required: false, description: "Force push" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  pull: {
    description: "Pull changes from a remote repository",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "remote", type: "string", required: false, description: "Remote name (default: origin)" },
      { name: "branch", type: "string", required: false, description: "Branch to pull" },
      { name: "rebase", type: "boolean", required: false, description: "Rebase instead of merge" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  branch: {
    description: "List, create, or delete branches",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "name", type: "string", required: false, description: "Branch name to create (omit to list)" },
      { name: "deleteBranch", type: "boolean", required: false, description: "Delete the named branch" },
    ],
    returns: { type: "string", description: "Branch list or command output" },
  },
  checkout: {
    description: "Switch branches or restore working tree files",
    parameters: [
      { name: "target", type: "string", required: true, description: "Branch or commit to checkout" },
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "create", type: "boolean", required: false, description: "Create a new branch" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  log: {
    description: "Show the commit log",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "count", type: "number", required: false, description: "Number of commits to show (default: 10)" },
      { name: "oneline", type: "boolean", required: false, description: "One line per commit (default: true)" },
    ],
    returns: { type: "string", description: "Log output" },
  },
  diff: {
    description: "Show changes between commits, working tree, etc.",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "staged", type: "boolean", required: false, description: "Show staged changes" },
      { name: "ref", type: "string", required: false, description: "Reference to diff against" },
    ],
    returns: { type: "string", description: "Diff output" },
  },
  tag: {
    description: "Create or list tags",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "name", type: "string", required: false, description: "Tag name (omit to list)" },
      { name: "message", type: "string", required: false, description: "Tag message (creates annotated tag)" },
    ],
    returns: { type: "string", description: "Tag list or command output" },
  },
  remote: {
    description: "List remote repositories",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "verbose", type: "boolean", required: false, description: "Show URLs (default: true)" },
    ],
    returns: { type: "string", description: "Remote list" },
  },
  merge: {
    description: "Merge a branch into the current branch",
    parameters: [
      { name: "branch", type: "string", required: true, description: "Branch to merge" },
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "noFf", type: "boolean", required: false, description: "Create a merge commit even for fast-forward" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  stash: {
    description: "Stash or restore uncommitted changes",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "action", type: "string", required: false, description: "Action: push, pop, list, drop, apply (default: push)" },
      { name: "message", type: "string", required: false, description: "Stash message (for push)" },
    ],
    returns: { type: "string", description: "Command output" },
  },
  reset: {
    description: "Reset the current HEAD to a specified state",
    parameters: [
      { name: "cwd", type: "string", required: false, description: "Repository path" },
      { name: "ref", type: "string", required: false, description: "Commit reference (default: HEAD)" },
      { name: "mode", type: "string", required: false, description: "Reset mode: soft, mixed, hard (default: mixed)" },
    ],
    returns: { type: "string", description: "Command output" },
  },
};

export const GitModuleMetadata: ModuleMetadata = {
  name: "git",
  description: "Git version control operations using the system git binary",
  version: "1.0.0",
  dependencies: [],
};
