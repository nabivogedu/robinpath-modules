import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Pinterest: "${key}" not configured. Call pinterest.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.pinterest.com/v5${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Pinterest API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("pinterest.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Pinterest credentials configured.";
};

const listBoards: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBoards/${id}` : `/listBoards`);
};

const getBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getBoard/${id}` : `/getBoard`);
};

const createBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBoard`, "POST", typeof data === "object" ? data : { value: data });
};

const updateBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pinterest.updateBoard requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateBoard/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pinterest.deleteBoard requires an ID.");
  return apiCall(`/deleteBoard/${id}`, "DELETE");
};

const listBoardPins: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBoardPins/${id}` : `/listBoardPins`);
};

const listPins: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPins/${id}` : `/listPins`);
};

const getPin: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPin/${id}` : `/getPin`);
};

const createPin: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPin`, "POST", typeof data === "object" ? data : { value: data });
};

const updatePin: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pinterest.updatePin requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updatePin/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deletePin: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pinterest.deletePin requires an ID.");
  return apiCall(`/deletePin/${id}`, "DELETE");
};

const listBoardSections: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBoardSections/${id}` : `/listBoardSections`);
};

const createBoardSection: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBoardSection`, "POST", typeof data === "object" ? data : { value: data });
};

const getUserAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserAccount/${id}` : `/getUserAccount`);
};

const getPinAnalytics: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPinAnalytics/${id}` : `/getPinAnalytics`);
};

const getBoardAnalytics: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getBoardAnalytics/${id}` : `/getBoardAnalytics`);
};

export const PinterestFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listBoards, getBoard, createBoard, updateBoard, deleteBoard, listBoardPins, listPins, getPin, createPin, updatePin, deletePin, listBoardSections, createBoardSection, getUserAccount, getPinAnalytics, getBoardAnalytics,
};

export const PinterestFunctionMetadata = {
  setCredentials: { description: "Configure pinterest credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listBoards: { description: "listBoards", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getBoard: { description: "getBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBoard: { description: "createBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateBoard: { description: "updateBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteBoard: { description: "deleteBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBoardPins: { description: "listBoardPins", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPins: { description: "listPins", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPin: { description: "getPin", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPin: { description: "createPin", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updatePin: { description: "updatePin", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deletePin: { description: "deletePin", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBoardSections: { description: "listBoardSections", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBoardSection: { description: "createBoardSection", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserAccount: { description: "getUserAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPinAnalytics: { description: "getPinAnalytics", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getBoardAnalytics: { description: "getBoardAnalytics", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const PinterestModuleMetadata = {
  description: "Pinterest — pins, boards, sections, analytics, and catalogs.",
  methods: Object.keys(PinterestFunctions),
  category: "social",
};
