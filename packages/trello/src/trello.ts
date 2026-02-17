import type { BuiltinHandler, Value, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Trello: "${key}" not configured. Call trello.setCredentials first.`);
  return val;
}

async function trelloApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const apiKey = getConfig("apiKey");
  const token = getConfig("token");
  const sep = path.includes("?") ? "&" : "?";
  const url = `https://api.trello.com/1${path}${sep}key=${apiKey}&token=${token}`;
  const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Trello API error (${res.status}): ${text}`);
  }
  if (res.status === 204 || res.headers.get("content-length") === "0") return { success: true };
  return res.json();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  const token = args[1] as string;
  if (!apiKey || !token) throw new Error("trello.setCredentials requires apiKey and token.");
  config.set("apiKey", apiKey);
  config.set("token", token);
  return "Trello credentials configured.";
};

const listBoards: BuiltinHandler = async () => {
  return trelloApi("/members/me/boards?fields=id,name,desc,url,closed");
};

const getBoard: BuiltinHandler = async (args) => {
  const boardId = args[0] as string;
  if (!boardId) throw new Error("trello.getBoard requires a boardId.");
  return trelloApi(`/boards/${boardId}`);
};

const listLists: BuiltinHandler = async (args) => {
  const boardId = args[0] as string;
  if (!boardId) throw new Error("trello.listLists requires a boardId.");
  return trelloApi(`/boards/${boardId}/lists`);
};

const createList: BuiltinHandler = async (args) => {
  const boardId = args[0] as string;
  const name = args[1] as string;
  if (!boardId || !name) throw new Error("trello.createList requires boardId and name.");
  return trelloApi("/lists", "POST", { name, idBoard: boardId });
};

const listCards: BuiltinHandler = async (args) => {
  const listId = args[0] as string;
  if (!listId) throw new Error("trello.listCards requires a listId.");
  return trelloApi(`/lists/${listId}/cards`);
};

const getCard: BuiltinHandler = async (args) => {
  const cardId = args[0] as string;
  if (!cardId) throw new Error("trello.getCard requires a cardId.");
  return trelloApi(`/cards/${cardId}`);
};

const createCard: BuiltinHandler = async (args) => {
  const listId = args[0] as string;
  const name = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!listId || !name) throw new Error("trello.createCard requires listId and name.");
  const payload: Record<string, unknown> = { idList: listId, name };
  if (opts.desc) payload.desc = opts.desc;
  if (opts.due) payload.due = opts.due;
  if (opts.idMembers) payload.idMembers = opts.idMembers;
  if (opts.idLabels) payload.idLabels = opts.idLabels;
  if (opts.pos) payload.pos = opts.pos;
  return trelloApi("/cards", "POST", payload);
};

const updateCard: BuiltinHandler = async (args) => {
  const cardId = args[0] as string;
  const updates = args[1] as Record<string, unknown>;
  if (!cardId || !updates) throw new Error("trello.updateCard requires cardId and updates.");
  return trelloApi(`/cards/${cardId}`, "PUT", updates);
};

const moveCard: BuiltinHandler = async (args) => {
  const cardId = args[0] as string;
  const listId = args[1] as string;
  if (!cardId || !listId) throw new Error("trello.moveCard requires cardId and listId.");
  return trelloApi(`/cards/${cardId}`, "PUT", { idList: listId });
};

const deleteCard: BuiltinHandler = async (args) => {
  const cardId = args[0] as string;
  if (!cardId) throw new Error("trello.deleteCard requires a cardId.");
  await trelloApi(`/cards/${cardId}`, "DELETE");
  return "Card deleted.";
};

const addComment: BuiltinHandler = async (args) => {
  const cardId = args[0] as string;
  const text = args[1] as string;
  if (!cardId || !text) throw new Error("trello.addComment requires cardId and text.");
  return trelloApi(`/cards/${cardId}/actions/comments`, "POST", { text });
};

export const TrelloFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  listBoards,
  getBoard,
  listLists,
  createList,
  listCards,
  getCard,
  createCard,
  updateCard,
  moveCard,
  deleteCard,
  addComment,
};

export const TrelloFunctionMetadata = {
  setCredentials: {
    description: "Set Trello API key and token.",
    parameters: [
      { name: "apiKey", dataType: "string", description: "Trello API key", formInputType: "text", required: true },
      { name: "token", dataType: "string", description: "Trello API token", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'trello.setCredentials "api_key" "token"',
  },
  listBoards: {
    description: "List all boards for the authenticated user.",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of board objects.",
    example: "trello.listBoards",
  },
  getBoard: {
    description: "Get a board by ID.",
    parameters: [
      { name: "boardId", dataType: "string", description: "Board ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Board object.",
    example: 'trello.getBoard "board-id"',
  },
  listLists: {
    description: "List all lists in a board.",
    parameters: [
      { name: "boardId", dataType: "string", description: "Board ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of list objects.",
    example: 'trello.listLists "board-id"',
  },
  createList: {
    description: "Create a new list in a board.",
    parameters: [
      { name: "boardId", dataType: "string", description: "Board ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "List name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Created list object.",
    example: 'trello.createList "board-id" "Done"',
  },
  listCards: {
    description: "List all cards in a list.",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of card objects.",
    example: 'trello.listCards "list-id"',
  },
  getCard: {
    description: "Get a card by ID.",
    parameters: [
      { name: "cardId", dataType: "string", description: "Card ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Card object.",
    example: 'trello.getCard "card-id"',
  },
  createCard: {
    description: "Create a new card in a list.",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID to add the card to", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Card title", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: desc, due, idMembers, idLabels, pos", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created card object.",
    example: 'trello.createCard "list-id" "Fix login bug" {"desc":"Users cannot log in","due":"2025-12-31"}',
  },
  updateCard: {
    description: "Update a card's properties.",
    parameters: [
      { name: "cardId", dataType: "string", description: "Card ID", formInputType: "text", required: true },
      { name: "updates", dataType: "object", description: "Fields to update (name, desc, due, closed, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated card object.",
    example: 'trello.updateCard "card-id" {"name":"Updated Title","closed":false}',
  },
  moveCard: {
    description: "Move a card to a different list.",
    parameters: [
      { name: "cardId", dataType: "string", description: "Card ID", formInputType: "text", required: true },
      { name: "listId", dataType: "string", description: "Target list ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated card object.",
    example: 'trello.moveCard "card-id" "done-list-id"',
  },
  deleteCard: {
    description: "Delete a card permanently.",
    parameters: [
      { name: "cardId", dataType: "string", description: "Card ID to delete", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'trello.deleteCard "card-id"',
  },
  addComment: {
    description: "Add a comment to a card.",
    parameters: [
      { name: "cardId", dataType: "string", description: "Card ID", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Comment text", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created comment action.",
    example: 'trello.addComment "card-id" "This is done!"',
  },
};

export const TrelloModuleMetadata = {
  description: "Manage Trello boards, lists, and cards via the Trello REST API.",
  category: "project-management",
  methods: Object.keys(TrelloFunctions),
};
