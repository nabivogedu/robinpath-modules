import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Jira: "${key}" not configured. Call jira.setCredentials first.`);
  return val;
}

function getAuthHeader(): string {
  const email = getConfig("email");
  const apiToken = getConfig("apiToken");
  return "Basic " + btoa(`${email}:${apiToken}`);
}

async function jiraApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const domain = getConfig("domain");
  const res = await fetch(`https://${domain}/rest/api/3${path}`, {
    method,
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira API error (${res.status}): ${text}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

async function jiraAgileApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const domain = getConfig("domain");
  const res = await fetch(`https://${domain}/rest/agile/1.0${path}`, {
    method,
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira Agile API error (${res.status}): ${text}`);
  }
  return res.json();
}

// --- Functions ---

const setCredentials: BuiltinHandler = (args) => {
  const domain = args[0] as string;
  const email = args[1] as string;
  const apiToken = args[2] as string;
  if (!domain || !email || !apiToken) throw new Error("jira.setCredentials requires domain, email, and apiToken.");
  config.set("domain", domain);
  config.set("email", email);
  config.set("apiToken", apiToken);
  return "Jira credentials configured.";
};

const createIssue: BuiltinHandler = async (args) => {
  const projectKey = args[0] as string;
  const issueType = args[1] as string;
  const summary = args[2] as string;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!projectKey || !issueType || !summary) throw new Error("jira.createIssue requires projectKey, issueType, and summary.");
  const fields: Record<string, unknown> = {
    project: { key: projectKey },
    issuetype: { name: issueType },
    summary,
  };
  if (opts.description) {
    fields.description = {
      type: "doc",
      version: 1,
      content: [{ type: "paragraph", content: [{ type: "text", text: opts.description as string }] }],
    };
  }
  if (opts.priority) fields.priority = { name: opts.priority as string };
  if (opts.labels) fields.labels = opts.labels;
  if (opts.assignee) fields.assignee = { accountId: opts.assignee as string };
  if (opts.components) fields.components = (opts.components as string[]).map((c: any) => ({ name: c }));
  return jiraApi("/issue", "POST", { fields });
};

const getIssue: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  if (!issueKey) throw new Error("jira.getIssue requires an issueKey.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}`);
};

const updateIssue: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const fields = args[1] as Record<string, unknown>;
  if (!issueKey || !fields) throw new Error("jira.updateIssue requires issueKey and fields.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}`, "PUT", { fields });
};

const deleteIssue: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  if (!issueKey) throw new Error("jira.deleteIssue requires an issueKey.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}`, "DELETE");
};

const assignIssue: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const accountId = args[1] as string;
  if (!issueKey || !accountId) throw new Error("jira.assignIssue requires issueKey and accountId.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/assignee`, "PUT", { accountId });
};

const transitionIssue: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const transitionId = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!issueKey || !transitionId) throw new Error("jira.transitionIssue requires issueKey and transitionId.");
  const payload: Record<string, unknown> = { transition: { id: transitionId } };
  if (opts.fields) payload.fields = opts.fields;
  if (opts.update) payload.update = opts.update;
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/transitions`, "POST", payload);
};

const addComment: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const body = args[1] as string;
  if (!issueKey || !body) throw new Error("jira.addComment requires issueKey and body.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/comment`, "POST", {
    body: {
      type: "doc",
      version: 1,
      content: [{ type: "paragraph", content: [{ type: "text", text: body }] }],
    },
  });
};

const getComments: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  if (!issueKey) throw new Error("jira.getComments requires an issueKey.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/comment`);
};

const searchIssues: BuiltinHandler = async (args) => {
  const jql = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!jql) throw new Error("jira.searchIssues requires a JQL query.");
  const payload: Record<string, unknown> = { jql };
  if (opts.maxResults !== undefined) payload.maxResults = opts.maxResults;
  if (opts.startAt !== undefined) payload.startAt = opts.startAt;
  if (opts.fields) payload.fields = opts.fields;
  return jiraApi("/search", "POST", payload);
};

const listProjects: BuiltinHandler = async () => {
  return jiraApi("/project");
};

const getProject: BuiltinHandler = async (args) => {
  const projectKey = args[0] as string;
  if (!projectKey) throw new Error("jira.getProject requires a projectKey.");
  return jiraApi(`/project/${encodeURIComponent(projectKey)}`);
};

const listBoards: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.projectKeyOrId) params.set("projectKeyOrId", String(opts.projectKeyOrId));
  if (opts.type) params.set("type", String(opts.type));
  if (opts.startAt !== undefined) params.set("startAt", String(opts.startAt));
  if (opts.maxResults !== undefined) params.set("maxResults", String(opts.maxResults));
  const qs = params.toString();
  return jiraAgileApi(`/board${qs ? `?${qs}` : ""}`);
};

const getBoardSprints: BuiltinHandler = async (args) => {
  const boardId = args[0] as number;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (boardId === undefined || boardId === null) throw new Error("jira.getBoardSprints requires a boardId.");
  const params = new URLSearchParams();
  if (opts.state) params.set("state", String(opts.state));
  if (opts.startAt !== undefined) params.set("startAt", String(opts.startAt));
  if (opts.maxResults !== undefined) params.set("maxResults", String(opts.maxResults));
  const qs = params.toString();
  return jiraAgileApi(`/board/${encodeURIComponent(String(boardId))}/sprint${qs ? `?${qs}` : ""}`);
};

const getSprintIssues: BuiltinHandler = async (args) => {
  const sprintId = args[0] as number;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (sprintId === undefined || sprintId === null) throw new Error("jira.getSprintIssues requires a sprintId.");
  const params = new URLSearchParams();
  if (opts.startAt !== undefined) params.set("startAt", String(opts.startAt));
  if (opts.maxResults !== undefined) params.set("maxResults", String(opts.maxResults));
  if (opts.fields) params.set("fields", String(opts.fields));
  const qs = params.toString();
  return jiraAgileApi(`/sprint/${encodeURIComponent(String(sprintId))}/issue${qs ? `?${qs}` : ""}`);
};

const addLabel: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const label = args[1] as string;
  if (!issueKey || !label) throw new Error("jira.addLabel requires issueKey and label.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}`, "PUT", {
    update: { labels: [{ add: label }] },
  });
};

const removeLabel: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const label = args[1] as string;
  if (!issueKey || !label) throw new Error("jira.removeLabel requires issueKey and label.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}`, "PUT", {
    update: { labels: [{ remove: label }] },
  });
};

const getTransitions: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  if (!issueKey) throw new Error("jira.getTransitions requires an issueKey.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/transitions`);
};

const addAttachment: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const filePath = args[1] as string;
  if (!issueKey || !filePath) throw new Error("jira.addAttachment requires issueKey and filePath.");
  const domain = getConfig("domain");
  const fs = await import("fs");
  const path = await import("path");
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const boundary = "----RobinPathBoundary" + Date.now();
  const crlf = "\r\n";
  const bodyParts = [
    `--${boundary}${crlf}`,
    `Content-Disposition: form-data; name="file"; filename="${fileName}"${crlf}`,
    `Content-Type: application/octet-stream${crlf}${crlf}`,
  ];
  const header = Buffer.from(bodyParts.join(""));
  const footer = Buffer.from(`${crlf}--${boundary}--${crlf}`);
  const multipartBody = Buffer.concat([header, fileBuffer, footer]);
  const res = await fetch(`https://${domain}/rest/api/3/issue/${encodeURIComponent(issueKey)}/attachments`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "X-Atlassian-Token": "no-check",
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    },
    body: multipartBody,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira API error (${res.status}): ${text}`);
  }
  return res.json();
};

const listUsers: BuiltinHandler = async (args) => {
  const query = args[0] as string | undefined;
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  const qs = params.toString();
  return jiraApi(`/users/search${qs ? `?${qs}` : ""}`);
};

const getUser: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  if (!accountId) throw new Error("jira.getUser requires an accountId.");
  return jiraApi(`/user?accountId=${encodeURIComponent(accountId)}`);
};

const addWatcher: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const accountId = args[1] as string;
  if (!issueKey || !accountId) throw new Error("jira.addWatcher requires issueKey and accountId.");
  const domain = getConfig("domain");
  const res = await fetch(`https://${domain}/rest/api/3/issue/${encodeURIComponent(issueKey)}/watchers`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountId),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira API error (${res.status}): ${text}`);
  }
  return "Watcher added.";
};

const removeWatcher: BuiltinHandler = async (args) => {
  const issueKey = args[0] as string;
  const accountId = args[1] as string;
  if (!issueKey || !accountId) throw new Error("jira.removeWatcher requires issueKey and accountId.");
  return jiraApi(`/issue/${encodeURIComponent(issueKey)}/watchers?accountId=${encodeURIComponent(accountId)}`, "DELETE");
};

const listPriorities: BuiltinHandler = async () => {
  return jiraApi("/priority");
};

const listIssueTypes: BuiltinHandler = async (args) => {
  const projectKey = args[0] as string | undefined;
  if (projectKey) {
    return jiraApi(`/issue/createmeta/${encodeURIComponent(projectKey)}/issuetypes`);
  }
  return jiraApi("/issuetype");
};

// --- Exports ---

export const JiraFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  createIssue,
  getIssue,
  updateIssue,
  deleteIssue,
  assignIssue,
  transitionIssue,
  addComment,
  getComments,
  searchIssues,
  listProjects,
  getProject,
  listBoards,
  getBoardSprints,
  getSprintIssues,
  addLabel,
  removeLabel,
  getTransitions,
  addAttachment,
  listUsers,
  getUser,
  addWatcher,
  removeWatcher,
  listPriorities,
  listIssueTypes,
};

export const JiraFunctionMetadata = {
  setCredentials: {
    description: "Set Jira Cloud credentials for API access.",
    parameters: [
      { name: "domain", dataType: "string", description: "Jira cloud domain (e.g. mycompany.atlassian.net)", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Atlassian account email", formInputType: "text", required: true },
      { name: "apiToken", dataType: "string", description: "Atlassian API token", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'jira.setCredentials "mycompany.atlassian.net" "user@example.com" "your-api-token"',
  },
  createIssue: {
    description: "Create a new Jira issue.",
    parameters: [
      { name: "projectKey", dataType: "string", description: "Project key (e.g. PROJ)", formInputType: "text", required: true },
      { name: "issueType", dataType: "string", description: "Issue type name (e.g. Task, Bug, Story)", formInputType: "text", required: true },
      { name: "summary", dataType: "string", description: "Issue summary/title", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Optional fields: description, priority, labels, assignee, components", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created issue response with key and id.",
    example: 'jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}',
  },
  getIssue: {
    description: "Get a Jira issue by key.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Issue details.",
    example: 'jira.getIssue "PROJ-123"',
  },
  updateIssue: {
    description: "Update fields on a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Update response.",
    example: 'jira.updateIssue "PROJ-123" {"summary":"Updated summary","priority":{"name":"High"}}',
  },
  deleteIssue: {
    description: "Delete a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Deletion confirmation.",
    example: 'jira.deleteIssue "PROJ-123"',
  },
  assignIssue: {
    description: "Assign a Jira issue to a user.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "accountId", dataType: "string", description: "Atlassian account ID of the assignee", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Assignment response.",
    example: 'jira.assignIssue "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"',
  },
  transitionIssue: {
    description: "Transition a Jira issue to a new status.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "transitionId", dataType: "string", description: "Transition ID (use getTransitions to find available IDs)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Optional: fields, update", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Transition response.",
    example: 'jira.transitionIssue "PROJ-123" "31"',
  },
  addComment: {
    description: "Add a comment to a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "body", dataType: "string", description: "Comment text", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created comment.",
    example: 'jira.addComment "PROJ-123" "This issue needs further investigation."',
  },
  getComments: {
    description: "List comments on a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Comments list.",
    example: 'jira.getComments "PROJ-123"',
  },
  searchIssues: {
    description: "Search Jira issues using JQL.",
    parameters: [
      { name: "jql", dataType: "string", description: "JQL query string", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "Options: maxResults, startAt, fields", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results with issues array.",
    example: 'jira.searchIssues "project = PROJ AND status = Open" {"maxResults":10}',
  },
  listProjects: {
    description: "List all accessible Jira projects.",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of project objects.",
    example: "jira.listProjects",
  },
  getProject: {
    description: "Get details of a Jira project.",
    parameters: [
      { name: "projectKey", dataType: "string", description: "Project key (e.g. PROJ)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Project details.",
    example: 'jira.getProject "PROJ"',
  },
  listBoards: {
    description: "List Jira agile boards.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: projectKeyOrId, type, startAt, maxResults", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Board list with pagination.",
    example: 'jira.listBoards {"projectKeyOrId":"PROJ"}',
  },
  getBoardSprints: {
    description: "Get sprints for a Jira board.",
    parameters: [
      { name: "boardId", dataType: "number", description: "Board ID", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "Options: state (future, active, closed), startAt, maxResults", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Sprint list with pagination.",
    example: 'jira.getBoardSprints 42 {"state":"active"}',
  },
  getSprintIssues: {
    description: "Get issues in a sprint.",
    parameters: [
      { name: "sprintId", dataType: "number", description: "Sprint ID", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "Options: startAt, maxResults, fields", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Issues in the sprint.",
    example: 'jira.getSprintIssues 100 {"maxResults":25}',
  },
  addLabel: {
    description: "Add a label to a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "label", dataType: "string", description: "Label to add", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Update response.",
    example: 'jira.addLabel "PROJ-123" "urgent"',
  },
  removeLabel: {
    description: "Remove a label from a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "label", dataType: "string", description: "Label to remove", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Update response.",
    example: 'jira.removeLabel "PROJ-123" "urgent"',
  },
  getTransitions: {
    description: "Get available status transitions for a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Available transitions.",
    example: 'jira.getTransitions "PROJ-123"',
  },
  addAttachment: {
    description: "Add a file attachment to a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Local file path to attach", formInputType: "file", required: true },
    ],
    returnType: "object",
    returnDescription: "Attachment details.",
    example: 'jira.addAttachment "PROJ-123" "/path/to/report.pdf"',
  },
  listUsers: {
    description: "Search for Jira users.",
    parameters: [
      { name: "query", dataType: "string", description: "Search query (name or email)", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of user objects.",
    example: 'jira.listUsers "john"',
  },
  getUser: {
    description: "Get a Jira user by account ID.",
    parameters: [
      { name: "accountId", dataType: "string", description: "Atlassian account ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "User details.",
    example: 'jira.getUser "5b10ac8d82e05b22cc7d4ef5"',
  },
  addWatcher: {
    description: "Add a watcher to a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "accountId", dataType: "string", description: "Atlassian account ID of the watcher", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'jira.addWatcher "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"',
  },
  removeWatcher: {
    description: "Remove a watcher from a Jira issue.",
    parameters: [
      { name: "issueKey", dataType: "string", description: "Issue key (e.g. PROJ-123)", formInputType: "text", required: true },
      { name: "accountId", dataType: "string", description: "Atlassian account ID of the watcher", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Removal confirmation.",
    example: 'jira.removeWatcher "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"',
  },
  listPriorities: {
    description: "List all available Jira priorities.",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of priority objects.",
    example: "jira.listPriorities",
  },
  listIssueTypes: {
    description: "List available issue types, optionally filtered by project.",
    parameters: [
      { name: "projectKey", dataType: "string", description: "Optional project key to filter issue types", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of issue type objects.",
    example: 'jira.listIssueTypes "PROJ"',
  },
};

export const JiraModuleMetadata = {
  description: "Create, update, search, and manage Jira issues, projects, boards, sprints, and users via the Jira Cloud REST API.",
  methods: Object.keys(JiraFunctions),
  category: "project-management",
};
