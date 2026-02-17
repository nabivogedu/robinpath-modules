import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

type Value = string | number | boolean | null | object;

// ── Internal State ──────────────────────────────────────────────────

let storedToken = "";

const API_BASE = "https://api.github.com";

// ── Helper ──────────────────────────────────────────────────────────

function getToken(): string {
  if (!storedToken) {
    throw new Error("GitHub token not set. Call github.setToken first.");
  }
  return storedToken;
}

function defaultHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${getToken()}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function ghRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<Value> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const opts: RequestInit = {
    method,
    headers: defaultHeaders(),
  };
  if (body !== undefined && body !== null) {
    opts.body = JSON.stringify(body);
  }

  const response = await fetch(url, opts);

  if (response.status === 204) {
    return { ok: true, status: 204 };
  }

  const contentType = response.headers.get("content-type") ?? "";
  let data: Value;
  if (contentType.includes("json")) {
    data = (await response.json()) as Value;
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const msg = typeof data === "object" && data !== null
      ? (data as Record<string, unknown>).message ?? JSON.stringify(data)
      : String(data);
    throw new Error(`GitHub API ${method} ${path} failed (${response.status}): ${String(msg)}`);
  }

  return data;
}

function buildQuery(params: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null && val !== "") {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
    }
  }
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  if (!token) throw new Error("Token is required");
  storedToken = token;
  return { ok: true, message: "GitHub token stored" };
};

// ── Repositories ────────────────────────────────────────────────────

const getRepo: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}`);
};

const listRepos: BuiltinHandler = async (args) => {
  const owner = args[0] ? String(args[0]) : undefined;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const query = buildQuery({
    type: opts.type,
    sort: opts.sort,
    direction: opts.direction,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  if (owner) {
    return ghRequest("GET", `/users/${owner}/repos${query}`);
  }
  return ghRequest("GET", `/user/repos${query}`);
};

const createRepo: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!name) throw new Error("Repository name is required");
  const body: Record<string, unknown> = { name };
  if (opts.description !== undefined) body.description = String(opts.description);
  if (opts.private !== undefined) body.private = Boolean(opts.private);
  if (opts.autoInit !== undefined) body.auto_init = Boolean(opts.autoInit);
  return ghRequest("POST", "/user/repos", body);
};

const deleteRepo: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("DELETE", `/repos/${owner}/${repo}`);
};

// ── Branches ────────────────────────────────────────────────────────

const listBranches: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/branches`);
};

const getBranch: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const branch = String(args[2] ?? "");
  if (!owner || !repo || !branch) throw new Error("owner, repo, and branch are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/branches/${encodeURIComponent(branch)}`);
};

const createBranch: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const branchName = String(args[2] ?? "");
  const fromBranch = String(args[3] ?? "main");
  if (!owner || !repo || !branchName) throw new Error("owner, repo, and branchName are required");

  // Get the SHA of the source branch
  const ref = (await ghRequest("GET", `/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(fromBranch)}`)) as Record<string, unknown>;
  const sha = ((ref.object as Record<string, unknown>)?.sha as string) ?? "";

  return ghRequest("POST", `/repos/${owner}/${repo}/git/refs`, {
    ref: `refs/heads/${branchName}`,
    sha,
  });
};

// ── Commits ─────────────────────────────────────────────────────────

const listCommits: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!owner || !repo) throw new Error("owner and repo are required");
  const query = buildQuery({
    sha: opts.sha,
    path: opts.path,
    since: opts.since,
    until: opts.until,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  return ghRequest("GET", `/repos/${owner}/${repo}/commits${query}`);
};

const getCommit: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const sha = String(args[2] ?? "");
  if (!owner || !repo || !sha) throw new Error("owner, repo, and sha are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/commits/${sha}`);
};

// ── Issues ──────────────────────────────────────────────────────────

const listIssues: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!owner || !repo) throw new Error("owner and repo are required");
  const query = buildQuery({
    state: opts.state,
    labels: opts.labels,
    assignee: opts.assignee,
    sort: opts.sort,
    direction: opts.direction,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  return ghRequest("GET", `/repos/${owner}/${repo}/issues${query}`);
};

const createIssue: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const title = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo || !title) throw new Error("owner, repo, and title are required");
  const body: Record<string, unknown> = { title };
  if (opts.body !== undefined) body.body = String(opts.body);
  if (opts.labels !== undefined) body.labels = opts.labels;
  if (opts.assignees !== undefined) body.assignees = opts.assignees;
  if (opts.milestone !== undefined) body.milestone = Number(opts.milestone);
  return ghRequest("POST", `/repos/${owner}/${repo}/issues`, body);
};

const updateIssue: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const issueNumber = Number(args[2] ?? 0);
  const fields = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo || !issueNumber) throw new Error("owner, repo, and issueNumber are required");
  return ghRequest("PATCH", `/repos/${owner}/${repo}/issues/${issueNumber}`, fields);
};

const closeIssue: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const issueNumber = Number(args[2] ?? 0);
  if (!owner || !repo || !issueNumber) throw new Error("owner, repo, and issueNumber are required");
  return ghRequest("PATCH", `/repos/${owner}/${repo}/issues/${issueNumber}`, { state: "closed" });
};

const addIssueComment: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const issueNumber = Number(args[2] ?? 0);
  const body = String(args[3] ?? "");
  if (!owner || !repo || !issueNumber) throw new Error("owner, repo, and issueNumber are required");
  if (!body) throw new Error("Comment body is required");
  return ghRequest("POST", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, { body });
};

const listIssueComments: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const issueNumber = Number(args[2] ?? 0);
  if (!owner || !repo || !issueNumber) throw new Error("owner, repo, and issueNumber are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
};

// ── Pull Requests ───────────────────────────────────────────────────

const listPullRequests: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!owner || !repo) throw new Error("owner and repo are required");
  const query = buildQuery({
    state: opts.state,
    head: opts.head,
    base: opts.base,
    sort: opts.sort,
    direction: opts.direction,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  return ghRequest("GET", `/repos/${owner}/${repo}/pulls${query}`);
};

const createPullRequest: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const title = String(args[2] ?? "");
  const head = String(args[3] ?? "");
  const base = String(args[4] ?? "");
  const opts = (typeof args[5] === "object" && args[5] !== null ? args[5] : {}) as Record<string, unknown>;
  if (!owner || !repo || !title || !head || !base) {
    throw new Error("owner, repo, title, head, and base are required");
  }
  const body: Record<string, unknown> = { title, head, base };
  if (opts.body !== undefined) body.body = String(opts.body);
  if (opts.draft !== undefined) body.draft = Boolean(opts.draft);
  return ghRequest("POST", `/repos/${owner}/${repo}/pulls`, body);
};

const mergePullRequest: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const prNumber = Number(args[2] ?? 0);
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo || !prNumber) throw new Error("owner, repo, and prNumber are required");
  const body: Record<string, unknown> = {};
  if (opts.commitTitle !== undefined) body.commit_title = String(opts.commitTitle);
  if (opts.commitMessage !== undefined) body.commit_message = String(opts.commitMessage);
  if (opts.method !== undefined) body.merge_method = String(opts.method);
  return ghRequest("PUT", `/repos/${owner}/${repo}/pulls/${prNumber}/merge`, body);
};

// ── Releases ────────────────────────────────────────────────────────

const listReleases: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/releases`);
};

const createRelease: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const tagName = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo || !tagName) throw new Error("owner, repo, and tagName are required");
  const body: Record<string, unknown> = { tag_name: tagName };
  if (opts.name !== undefined) body.name = String(opts.name);
  if (opts.body !== undefined) body.body = String(opts.body);
  if (opts.draft !== undefined) body.draft = Boolean(opts.draft);
  if (opts.prerelease !== undefined) body.prerelease = Boolean(opts.prerelease);
  if (opts.targetCommitish !== undefined) body.target_commitish = String(opts.targetCommitish);
  return ghRequest("POST", `/repos/${owner}/${repo}/releases`, body);
};

// ── GitHub Actions ──────────────────────────────────────────────────

const listWorkflows: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/actions/workflows`);
};

const triggerWorkflow: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const workflowId = args[2];
  const ref = String(args[3] ?? "");
  const inputs = (typeof args[4] === "object" && args[4] !== null ? args[4] : undefined) as Record<string, unknown> | undefined;
  if (!owner || !repo || !workflowId || !ref) {
    throw new Error("owner, repo, workflowId, and ref are required");
  }
  const body: Record<string, unknown> = { ref };
  if (inputs) body.inputs = inputs;
  return ghRequest("POST", `/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, body);
};

const listWorkflowRuns: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const workflowId = args[2] ?? undefined;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo) throw new Error("owner and repo are required");
  const query = buildQuery({
    status: opts.status,
    branch: opts.branch,
    event: opts.event,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  if (workflowId) {
    return ghRequest("GET", `/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs${query}`);
  }
  return ghRequest("GET", `/repos/${owner}/${repo}/actions/runs${query}`);
};

// ── Users ───────────────────────────────────────────────────────────

const getUser: BuiltinHandler = async (args) => {
  const username = args[0] ? String(args[0]) : undefined;
  if (username) {
    return ghRequest("GET", `/users/${username}`);
  }
  return ghRequest("GET", "/user");
};

// ── Search ──────────────────────────────────────────────────────────

const searchRepos: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!query) throw new Error("Search query is required");
  const qs = buildQuery({
    q: query,
    sort: opts.sort,
    order: opts.order,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  return ghRequest("GET", `/search/repositories${qs}`);
};

const searchCode: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!query) throw new Error("Search query is required");
  const qs = buildQuery({
    q: query,
    sort: opts.sort,
    order: opts.order,
    per_page: opts.perPage ?? opts.per_page,
    page: opts.page,
  });
  return ghRequest("GET", `/search/code${qs}`);
};

// ── Labels ──────────────────────────────────────────────────────────

const listLabels: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/labels`);
};

const createLabel: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const name = String(args[2] ?? "");
  const color = String(args[3] ?? "");
  const description = args[4] ? String(args[4]) : undefined;
  if (!owner || !repo || !name || !color) throw new Error("owner, repo, name, and color are required");
  const body: Record<string, unknown> = { name, color: color.replace(/^#/, "") };
  if (description !== undefined) body.description = description;
  return ghRequest("POST", `/repos/${owner}/${repo}/labels`, body);
};

const addLabels: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const issueNumber = Number(args[2] ?? 0);
  const labels = args[3] as string[];
  if (!owner || !repo || !issueNumber) throw new Error("owner, repo, and issueNumber are required");
  if (!Array.isArray(labels) || labels.length === 0) throw new Error("labels array is required");
  return ghRequest("POST", `/repos/${owner}/${repo}/issues/${issueNumber}/labels`, { labels });
};

// ── Milestones ──────────────────────────────────────────────────────

const listMilestones: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  if (!owner || !repo) throw new Error("owner and repo are required");
  return ghRequest("GET", `/repos/${owner}/${repo}/milestones`);
};

const createMilestone: BuiltinHandler = async (args) => {
  const owner = String(args[0] ?? "");
  const repo = String(args[1] ?? "");
  const title = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!owner || !repo || !title) throw new Error("owner, repo, and title are required");
  const body: Record<string, unknown> = { title };
  if (opts.description !== undefined) body.description = String(opts.description);
  if (opts.state !== undefined) body.state = String(opts.state);
  if (opts.dueOn !== undefined) body.due_on = String(opts.dueOn);
  return ghRequest("POST", `/repos/${owner}/${repo}/milestones`, body);
};

// ── Exports ─────────────────────────────────────────────────────────

export const GithubFunctions: Record<string, BuiltinHandler> = {
  setToken,
  getRepo,
  listRepos,
  createRepo,
  deleteRepo,
  listBranches,
  getBranch,
  createBranch,
  listCommits,
  getCommit,
  listIssues,
  createIssue,
  updateIssue,
  closeIssue,
  addIssueComment,
  listIssueComments,
  listPullRequests,
  createPullRequest,
  mergePullRequest,
  listReleases,
  createRelease,
  listWorkflows,
  triggerWorkflow,
  listWorkflowRuns,
  getUser,
  searchRepos,
  searchCode,
  listLabels,
  createLabel,
  addLabels,
  listMilestones,
  createMilestone,
};

export const GithubFunctionMetadata = {
  setToken: {
    description: "Store a GitHub personal access token for authentication",
    parameters: [
      { name: "token", dataType: "string", description: "GitHub personal access token (ghp_... or fine-grained token)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, message}",
    example: 'github.setToken "ghp_xxxxxxxxxxxx"',
  },
  getRepo: {
    description: "Get repository information",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner (user or org)", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Repository object with name, description, stars, forks, etc.",
    example: 'github.getRepo "octocat" "Hello-World"',
  },
  listRepos: {
    description: "List repositories for a user or the authenticated user",
    parameters: [
      { name: "owner", dataType: "string", description: "Username (omit for authenticated user)", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{type?, sort?, direction?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of repository objects",
    example: 'github.listRepos "octocat"',
  },
  createRepo: {
    description: "Create a new repository for the authenticated user",
    parameters: [
      { name: "name", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{description?, private?, autoInit?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created repository object",
    example: 'github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}',
  },
  deleteRepo: {
    description: "Delete a repository (requires delete_repo scope)",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, status}",
    example: 'github.deleteRepo "myuser" "old-repo"',
  },
  listBranches: {
    description: "List branches in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of branch objects with name and commit info",
    example: 'github.listBranches "octocat" "Hello-World"',
  },
  getBranch: {
    description: "Get details for a specific branch",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "branch", dataType: "string", description: "Branch name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Branch object with name, commit, and protection status",
    example: 'github.getBranch "octocat" "Hello-World" "main"',
  },
  createBranch: {
    description: "Create a new branch from an existing branch ref",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "branchName", dataType: "string", description: "Name for the new branch", formInputType: "text", required: true },
      { name: "fromBranch", dataType: "string", description: "Source branch (default: main)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Git reference object for the new branch",
    example: 'github.createBranch "myuser" "my-repo" "feature-x" "main"',
  },
  listCommits: {
    description: "List commits in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sha?, path?, since?, until?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of commit objects",
    example: 'github.listCommits "octocat" "Hello-World" {"sha": "main", "perPage": 5}',
  },
  getCommit: {
    description: "Get a single commit by SHA",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "sha", dataType: "string", description: "Commit SHA", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Commit object with files, stats, and metadata",
    example: 'github.getCommit "octocat" "Hello-World" "abc1234"',
  },
  listIssues: {
    description: "List issues in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{state?, labels?, assignee?, sort?, direction?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of issue objects",
    example: 'github.listIssues "octocat" "Hello-World" {"state": "open", "labels": "bug"}',
  },
  createIssue: {
    description: "Create a new issue in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "title", dataType: "string", description: "Issue title", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{body?, labels?, assignees?, milestone?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created issue object",
    example: 'github.createIssue "myuser" "my-repo" "Bug report" {"body": "Steps to reproduce...", "labels": ["bug"]}',
  },
  updateIssue: {
    description: "Update an existing issue",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "issueNumber", dataType: "number", description: "Issue number", formInputType: "number", required: true },
      { name: "fields", dataType: "object", description: "Fields to update: {title?, body?, state?, labels?, assignees?, milestone?}", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated issue object",
    example: 'github.updateIssue "myuser" "my-repo" 42 {"title": "Updated title", "labels": ["bug", "priority"]}',
  },
  closeIssue: {
    description: "Close an issue",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "issueNumber", dataType: "number", description: "Issue number", formInputType: "number", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated issue object with state 'closed'",
    example: 'github.closeIssue "myuser" "my-repo" 42',
  },
  addIssueComment: {
    description: "Add a comment to an issue or pull request",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "issueNumber", dataType: "number", description: "Issue or PR number", formInputType: "number", required: true },
      { name: "body", dataType: "string", description: "Comment body (Markdown supported)", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created comment object",
    example: 'github.addIssueComment "myuser" "my-repo" 42 "This is fixed in v2.0"',
  },
  listIssueComments: {
    description: "List comments on an issue or pull request",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "issueNumber", dataType: "number", description: "Issue or PR number", formInputType: "number", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of comment objects",
    example: 'github.listIssueComments "octocat" "Hello-World" 1',
  },
  listPullRequests: {
    description: "List pull requests in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{state?, head?, base?, sort?, direction?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of pull request objects",
    example: 'github.listPullRequests "octocat" "Hello-World" {"state": "open"}',
  },
  createPullRequest: {
    description: "Create a new pull request",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "title", dataType: "string", description: "PR title", formInputType: "text", required: true },
      { name: "head", dataType: "string", description: "Branch containing changes", formInputType: "text", required: true },
      { name: "base", dataType: "string", description: "Branch to merge into", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{body?, draft?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created pull request object",
    example: 'github.createPullRequest "myuser" "my-repo" "Add feature X" "feature-x" "main" {"body": "Description here", "draft": false}',
  },
  mergePullRequest: {
    description: "Merge a pull request",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "prNumber", dataType: "number", description: "Pull request number", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "{commitTitle?, commitMessage?, method?} method: merge|squash|rebase", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Merge result with SHA and message",
    example: 'github.mergePullRequest "myuser" "my-repo" 10 {"method": "squash"}',
  },
  listReleases: {
    description: "List releases in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of release objects",
    example: 'github.listReleases "octocat" "Hello-World"',
  },
  createRelease: {
    description: "Create a new release from a tag",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "tagName", dataType: "string", description: "Tag name for the release (e.g. v1.0.0)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{name?, body?, draft?, prerelease?, targetCommitish?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created release object",
    example: 'github.createRelease "myuser" "my-repo" "v1.0.0" {"name": "Version 1.0", "body": "Release notes", "prerelease": false}',
  },
  listWorkflows: {
    description: "List GitHub Actions workflows in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Workflows object with total_count and workflows array",
    example: 'github.listWorkflows "myuser" "my-repo"',
  },
  triggerWorkflow: {
    description: "Trigger a GitHub Actions workflow dispatch event",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "workflowId", dataType: "string", description: "Workflow ID or filename (e.g. deploy.yml)", formInputType: "text", required: true },
      { name: "ref", dataType: "string", description: "Branch or tag ref to run on", formInputType: "text", required: true },
      { name: "inputs", dataType: "object", description: "Workflow input parameters", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok, status}",
    example: 'github.triggerWorkflow "myuser" "my-repo" "deploy.yml" "main" {"environment": "production"}',
  },
  listWorkflowRuns: {
    description: "List workflow runs for a repository or specific workflow",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "workflowId", dataType: "string", description: "Workflow ID or filename (omit for all workflows)", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{status?, branch?, event?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Workflow runs object with total_count and workflow_runs array",
    example: 'github.listWorkflowRuns "myuser" "my-repo" "ci.yml" {"status": "completed"}',
  },
  getUser: {
    description: "Get a user profile or the authenticated user",
    parameters: [
      { name: "username", dataType: "string", description: "GitHub username (omit for authenticated user)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "User profile object",
    example: 'github.getUser "octocat"',
  },
  searchRepos: {
    description: "Search GitHub repositories",
    parameters: [
      { name: "query", dataType: "string", description: "Search query (GitHub search syntax)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sort?, order?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results with total_count and items array",
    example: 'github.searchRepos "language:typescript stars:>1000" {"sort": "stars"}',
  },
  searchCode: {
    description: "Search code across GitHub repositories",
    parameters: [
      { name: "query", dataType: "string", description: "Search query (GitHub code search syntax)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sort?, order?, perPage?, page?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results with total_count and items array",
    example: 'github.searchCode "addClass repo:jquery/jquery" {"sort": "indexed"}',
  },
  listLabels: {
    description: "List labels in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of label objects with name, color, and description",
    example: 'github.listLabels "octocat" "Hello-World"',
  },
  createLabel: {
    description: "Create a new label in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Label name", formInputType: "text", required: true },
      { name: "color", dataType: "string", description: "Label color hex (e.g. 'ff0000' or '#ff0000')", formInputType: "text", required: true },
      { name: "description", dataType: "string", description: "Label description", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Created label object",
    example: 'github.createLabel "myuser" "my-repo" "priority:high" "ff0000" "High priority issues"',
  },
  addLabels: {
    description: "Add labels to an issue or pull request",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "issueNumber", dataType: "number", description: "Issue or PR number", formInputType: "number", required: true },
      { name: "labels", dataType: "array", description: "Array of label names to add", formInputType: "json", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of label objects now on the issue",
    example: 'github.addLabels "myuser" "my-repo" 42 ["bug", "priority:high"]',
  },
  listMilestones: {
    description: "List milestones in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of milestone objects",
    example: 'github.listMilestones "octocat" "Hello-World"',
  },
  createMilestone: {
    description: "Create a new milestone in a repository",
    parameters: [
      { name: "owner", dataType: "string", description: "Repository owner", formInputType: "text", required: true },
      { name: "repo", dataType: "string", description: "Repository name", formInputType: "text", required: true },
      { name: "title", dataType: "string", description: "Milestone title", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{description?, state?, dueOn?} dueOn is ISO 8601 date", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created milestone object",
    example: 'github.createMilestone "myuser" "my-repo" "v2.0" {"description": "Version 2.0 release", "dueOn": "2025-06-01T00:00:00Z"}',
  },
};

export const GithubModuleMetadata = {
  description: "GitHub REST API v3 client for repositories, issues, pull requests, releases, actions, labels, milestones, and search",
  methods: Object.keys(GithubFunctions),
  category: "development",
};
