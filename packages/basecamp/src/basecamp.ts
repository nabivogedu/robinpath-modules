import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Basecamp: "${key}" not configured. Call basecamp.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://3.basecampapi.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Basecamp API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accountId = args[0] as string;
  const accessToken = args[1] as string;
  if (!accountId || !accessToken) throw new Error("basecamp.setCredentials requires accountId, accessToken.");
  config.set("accountId", accountId);
  config.set("accessToken", accessToken);
  return "Basecamp credentials configured.";
};

const listProjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProjects/${id}` : `/listProjects`);
};

const getProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProject/${id}` : `/getProject`);
};

const createProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createProject`, "POST", typeof data === "object" ? data : { value: data });
};

const updateProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("basecamp.updateProject requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProject/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listTodoLists: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTodoLists/${id}` : `/listTodoLists`);
};

const createTodoList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTodoList`, "POST", typeof data === "object" ? data : { value: data });
};

const listTodos: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTodos/${id}` : `/listTodos`);
};

const createTodo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTodo`, "POST", typeof data === "object" ? data : { value: data });
};

const updateTodo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("basecamp.updateTodo requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTodo/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const completeTodo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("basecamp.completeTodo requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/completeTodo/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listMessages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMessages/${id}` : `/listMessages`);
};

const createMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const listCampfireMessages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCampfireMessages/${id}` : `/listCampfireMessages`);
};

const sendCampfireMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendCampfireMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const listPeople: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPeople/${id}` : `/listPeople`);
};

const getPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPerson/${id}` : `/getPerson`);
};

const listComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listComments/${id}` : `/listComments`);
};

const createComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createComment`, "POST", typeof data === "object" ? data : { value: data });
};

export const BasecampFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProjects, getProject, createProject, updateProject, listTodoLists, createTodoList, listTodos, createTodo, updateTodo, completeTodo, listMessages, createMessage, listCampfireMessages, sendCampfireMessage, listPeople, getPerson, listComments, createComment,
};

export const BasecampFunctionMetadata = {
  setCredentials: { description: "Configure basecamp credentials.", parameters: [{ name: "accountId", dataType: "string", description: "accountId", formInputType: "text", required: true }, { name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProject: { description: "createProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProject: { description: "updateProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTodoLists: { description: "listTodoLists", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTodoList: { description: "createTodoList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTodos: { description: "listTodos", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTodo: { description: "createTodo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTodo: { description: "updateTodo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  completeTodo: { description: "completeTodo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMessages: { description: "listMessages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createMessage: { description: "createMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCampfireMessages: { description: "listCampfireMessages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendCampfireMessage: { description: "sendCampfireMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPeople: { description: "listPeople", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPerson: { description: "getPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createComment: { description: "createComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const BasecampModuleMetadata = {
  description: "Basecamp — projects, to-dos, messages, campfires, and check-ins.",
  methods: Object.keys(BasecampFunctions),
  category: "project-management",
};
