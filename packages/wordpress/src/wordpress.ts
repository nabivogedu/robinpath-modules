import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`WordPress: "${key}" not configured. Call wordpress.setCredentials first.`);
  return val;
}

function getAuth(): string {
  const username = getConfig("username");
  const appPassword = getConfig("appPassword");
  return btoa(`${username}:${appPassword}`);
}

function getBaseUrl(): string {
  return getConfig("siteUrl").replace(/\/+$/, "");
}

async function wpApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const res = await fetch(`${getBaseUrl()}/wp-json/wp/v2${path}`, {
    method,
    headers: {
      Authorization: `Basic ${getAuth()}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WordPress API error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
}

function buildQs(opts: Record<string, unknown>, keys: string[]): string {
  const params = new URLSearchParams();
  for (const k of keys) {
    if (opts[k] !== undefined && opts[k] !== null) params.set(k, String(opts[k]));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// ── Credentials ─────────────────────────────────────────────────────

const setCredentials: BuiltinHandler = (args) => {
  const siteUrl = args[0] as string;
  const username = args[1] as string;
  const appPassword = args[2] as string;
  if (!siteUrl || !username || !appPassword) throw new Error("wordpress.setCredentials requires siteUrl, username, and appPassword.");
  config.set("siteUrl", siteUrl);
  config.set("username", username);
  config.set("appPassword", appPassword);
  return "WordPress credentials configured.";
};

// ── Posts ────────────────────────────────────────────────────────────

const listPosts: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/posts${buildQs(opts, ["per_page", "page", "status", "search", "categories", "tags", "orderby", "order", "author"])}`);
};

const getPost: BuiltinHandler = async (args) => {
  const postId = args[0] as string;
  if (!postId) throw new Error("wordpress.getPost requires a postId.");
  return wpApi(`/posts/${postId}`);
};

const createPost: BuiltinHandler = async (args) => {
  const post = args[0] as Record<string, unknown>;
  if (!post) throw new Error("wordpress.createPost requires a post object.");
  return wpApi("/posts", "POST", post);
};

const updatePost: BuiltinHandler = async (args) => {
  const postId = args[0] as string;
  const post = args[1] as Record<string, unknown>;
  if (!postId || !post) throw new Error("wordpress.updatePost requires postId and post object.");
  return wpApi(`/posts/${postId}`, "POST", post);
};

const deletePost: BuiltinHandler = async (args) => {
  const postId = args[0] as string;
  const force = (args[1] as boolean) ?? false;
  if (!postId) throw new Error("wordpress.deletePost requires a postId.");
  return wpApi(`/posts/${postId}?force=${force}`, "DELETE");
};

// ── Pages ───────────────────────────────────────────────────────────

const listPages: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/pages${buildQs(opts, ["per_page", "page", "status", "search", "parent", "orderby", "order"])}`);
};

const createPage: BuiltinHandler = async (args) => {
  const page = args[0] as Record<string, unknown>;
  if (!page) throw new Error("wordpress.createPage requires a page object.");
  return wpApi("/pages", "POST", page);
};

const updatePage: BuiltinHandler = async (args) => {
  const pageId = args[0] as string;
  const page = args[1] as Record<string, unknown>;
  if (!pageId || !page) throw new Error("wordpress.updatePage requires pageId and page object.");
  return wpApi(`/pages/${pageId}`, "POST", page);
};

const deletePage: BuiltinHandler = async (args) => {
  const pageId = args[0] as string;
  const force = (args[1] as boolean) ?? false;
  if (!pageId) throw new Error("wordpress.deletePage requires a pageId.");
  return wpApi(`/pages/${pageId}?force=${force}`, "DELETE");
};

// ── Categories ──────────────────────────────────────────────────────

const listCategories: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/categories${buildQs(opts, ["per_page", "page", "search", "parent", "orderby", "order"])}`);
};

const createCategory: BuiltinHandler = async (args) => {
  const name = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!name) throw new Error("wordpress.createCategory requires a name.");
  const payload: Record<string, unknown> = { name };
  if (opts.description) payload.description = opts.description;
  if (opts.parent) payload.parent = opts.parent;
  if (opts.slug) payload.slug = opts.slug;
  return wpApi("/categories", "POST", payload);
};

const deleteCategory: BuiltinHandler = async (args) => {
  const categoryId = args[0] as string;
  if (!categoryId) throw new Error("wordpress.deleteCategory requires a categoryId.");
  return wpApi(`/categories/${categoryId}?force=true`, "DELETE");
};

// ── Tags ────────────────────────────────────────────────────────────

const listTags: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/tags${buildQs(opts, ["per_page", "page", "search", "orderby", "order"])}`);
};

const createTag: BuiltinHandler = async (args) => {
  const name = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!name) throw new Error("wordpress.createTag requires a name.");
  const payload: Record<string, unknown> = { name };
  if (opts.description) payload.description = opts.description;
  if (opts.slug) payload.slug = opts.slug;
  return wpApi("/tags", "POST", payload);
};

const deleteTag: BuiltinHandler = async (args) => {
  const tagId = args[0] as string;
  if (!tagId) throw new Error("wordpress.deleteTag requires a tagId.");
  return wpApi(`/tags/${tagId}?force=true`, "DELETE");
};

// ── Comments ────────────────────────────────────────────────────────

const listComments: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/comments${buildQs(opts, ["per_page", "page", "post", "status", "search", "author", "orderby", "order"])}`);
};

const getComment: BuiltinHandler = async (args) => {
  const commentId = args[0] as string;
  if (!commentId) throw new Error("wordpress.getComment requires a commentId.");
  return wpApi(`/comments/${commentId}`);
};

const createComment: BuiltinHandler = async (args) => {
  const comment = args[0] as Record<string, unknown>;
  if (!comment) throw new Error("wordpress.createComment requires a comment object.");
  return wpApi("/comments", "POST", comment);
};

const updateComment: BuiltinHandler = async (args) => {
  const commentId = args[0] as string;
  const updates = args[1] as Record<string, unknown>;
  if (!commentId || !updates) throw new Error("wordpress.updateComment requires commentId and updates.");
  return wpApi(`/comments/${commentId}`, "POST", updates);
};

const deleteComment: BuiltinHandler = async (args) => {
  const commentId = args[0] as string;
  const force = (args[1] as boolean) ?? false;
  if (!commentId) throw new Error("wordpress.deleteComment requires a commentId.");
  return wpApi(`/comments/${commentId}?force=${force}`, "DELETE");
};

const moderateComment: BuiltinHandler = async (args) => {
  const commentId = args[0] as string;
  const status = args[1] as string;
  if (!commentId || !status) throw new Error("wordpress.moderateComment requires commentId and status (approved, hold, spam, trash).");
  return wpApi(`/comments/${commentId}`, "POST", { status });
};

// ── Media ───────────────────────────────────────────────────────────

const listMedia: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/media${buildQs(opts, ["per_page", "page", "search", "media_type", "mime_type", "orderby", "order"])}`);
};

const getMedia: BuiltinHandler = async (args) => {
  const mediaId = args[0] as string;
  if (!mediaId) throw new Error("wordpress.getMedia requires a mediaId.");
  return wpApi(`/media/${mediaId}`);
};

const uploadMedia: BuiltinHandler = async (args) => {
  const filename = args[0] as string;
  const content = args[1] as string;
  const mimeType = (args[2] as string) ?? "image/png";
  if (!filename || content === undefined) throw new Error("wordpress.uploadMedia requires filename and content.");
  const res = await fetch(`${getBaseUrl()}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getAuth()}`,
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
    body: content,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WordPress media upload error (${res.status}): ${text}`);
  }
  return res.json();
};

const updateMedia: BuiltinHandler = async (args) => {
  const mediaId = args[0] as string;
  const updates = args[1] as Record<string, unknown>;
  if (!mediaId || !updates) throw new Error("wordpress.updateMedia requires mediaId and updates.");
  return wpApi(`/media/${mediaId}`, "POST", updates);
};

const deleteMedia: BuiltinHandler = async (args) => {
  const mediaId = args[0] as string;
  const force = (args[1] as boolean) ?? true;
  if (!mediaId) throw new Error("wordpress.deleteMedia requires a mediaId.");
  return wpApi(`/media/${mediaId}?force=${force}`, "DELETE");
};

// ── Users ───────────────────────────────────────────────────────────

const listUsers: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return wpApi(`/users${buildQs(opts, ["per_page", "page", "search", "roles", "orderby", "order"])}`);
};

const getUser: BuiltinHandler = async (args) => {
  const userId = args[0] as string;
  if (!userId) throw new Error("wordpress.getUser requires a userId.");
  return wpApi(`/users/${userId}`);
};

const createUser: BuiltinHandler = async (args) => {
  const user = args[0] as Record<string, unknown>;
  if (!user) throw new Error("wordpress.createUser requires a user object.");
  if (!user.username || !user.email || !user.password) throw new Error("wordpress.createUser requires username, email, and password.");
  return wpApi("/users", "POST", user);
};

const updateUser: BuiltinHandler = async (args) => {
  const userId = args[0] as string;
  const updates = args[1] as Record<string, unknown>;
  if (!userId || !updates) throw new Error("wordpress.updateUser requires userId and updates.");
  return wpApi(`/users/${userId}`, "POST", updates);
};

const deleteUser: BuiltinHandler = async (args) => {
  const userId = args[0] as string;
  const reassignTo = args[1] as string;
  if (!userId) throw new Error("wordpress.deleteUser requires a userId.");
  if (!reassignTo) throw new Error("wordpress.deleteUser requires a reassignTo userId (WordPress requires content reassignment).");
  return wpApi(`/users/${userId}?force=true&reassign=${reassignTo}`, "DELETE");
};

// ── Post/Page Meta (Custom Fields) ─────────────────────────────────

const getMeta: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  if (!postId) throw new Error("wordpress.getMeta requires postId.");
  return wpApi(`/${postType}/${postId}?_fields=meta`);
};

const updateMeta: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  const meta = args[2] as Record<string, unknown>;
  if (!postId || !meta) throw new Error("wordpress.updateMeta requires postId and meta object.");
  return wpApi(`/${postType}/${postId}`, "POST", { meta });
};

const deleteMeta: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  const metaKey = args[2] as string;
  if (!postId || !metaKey) throw new Error("wordpress.deleteMeta requires postId and metaKey.");
  return wpApi(`/${postType}/${postId}`, "POST", { meta: { [metaKey]: null } });
};

// ── Revisions ───────────────────────────────────────────────────────

const listRevisions: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  if (!postId) throw new Error("wordpress.listRevisions requires postId.");
  return wpApi(`/${postType}/${postId}/revisions`);
};

const getRevision: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  const revisionId = args[2] as string;
  if (!postId || !revisionId) throw new Error("wordpress.getRevision requires postId and revisionId.");
  return wpApi(`/${postType}/${postId}/revisions/${revisionId}`);
};

const deleteRevision: BuiltinHandler = async (args) => {
  const postType = (args[0] as string) ?? "posts";
  const postId = args[1] as string;
  const revisionId = args[2] as string;
  if (!postId || !revisionId) throw new Error("wordpress.deleteRevision requires postId and revisionId.");
  return wpApi(`/${postType}/${postId}/revisions/${revisionId}?force=true`, "DELETE");
};

// ── Taxonomies (Custom) ─────────────────────────────────────────────

const listTaxonomies: BuiltinHandler = async () => {
  return wpApi("/taxonomies");
};

const listTerms: BuiltinHandler = async (args) => {
  const taxonomy = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!taxonomy) throw new Error("wordpress.listTerms requires a taxonomy slug.");
  return wpApi(`/${taxonomy}${buildQs(opts, ["per_page", "page", "search", "parent", "orderby", "order"])}`);
};

const createTerm: BuiltinHandler = async (args) => {
  const taxonomy = args[0] as string;
  const name = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!taxonomy || !name) throw new Error("wordpress.createTerm requires taxonomy and name.");
  const payload: Record<string, unknown> = { name };
  if (opts.description) payload.description = opts.description;
  if (opts.parent) payload.parent = opts.parent;
  if (opts.slug) payload.slug = opts.slug;
  return wpApi(`/${taxonomy}`, "POST", payload);
};

// ── Plugins (WP 5.5+) ──────────────────────────────────────────────

const listPlugins: BuiltinHandler = async () => {
  return wpApi("/plugins");
};

const activatePlugin: BuiltinHandler = async (args) => {
  const plugin = args[0] as string;
  if (!plugin) throw new Error("wordpress.activatePlugin requires a plugin slug.");
  return wpApi(`/plugins/${plugin}`, "POST", { status: "active" });
};

const deactivatePlugin: BuiltinHandler = async (args) => {
  const plugin = args[0] as string;
  if (!plugin) throw new Error("wordpress.deactivatePlugin requires a plugin slug.");
  return wpApi(`/plugins/${plugin}`, "POST", { status: "inactive" });
};

const installPlugin: BuiltinHandler = async (args) => {
  const slug = args[0] as string;
  const activate = (args[1] as boolean) ?? false;
  if (!slug) throw new Error("wordpress.installPlugin requires a plugin slug from wordpress.org.");
  const result = await wpApi("/plugins", "POST", { slug, status: activate ? "active" : "inactive" });
  return result;
};

const deletePlugin: BuiltinHandler = async (args) => {
  const plugin = args[0] as string;
  if (!plugin) throw new Error("wordpress.deletePlugin requires a plugin slug.");
  const res = await fetch(`${getBaseUrl()}/wp-json/wp/v2/plugins/${plugin}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${getAuth()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WordPress plugin delete error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
};

// ── Themes ──────────────────────────────────────────────────────────

const listThemes: BuiltinHandler = async () => {
  return wpApi("/themes");
};

const activateTheme: BuiltinHandler = async (args) => {
  const theme = args[0] as string;
  if (!theme) throw new Error("wordpress.activateTheme requires a theme stylesheet slug.");
  return wpApi(`/themes/${theme}`, "POST", { status: "active" });
};

// ── Site Settings ───────────────────────────────────────────────────

const getSettings: BuiltinHandler = async () => {
  return wpApi("/settings");
};

const updateSettings: BuiltinHandler = async (args) => {
  const settings = args[0] as Record<string, unknown>;
  if (!settings) throw new Error("wordpress.updateSettings requires a settings object.");
  return wpApi("/settings", "POST", settings);
};

// ── Search ──────────────────────────────────────────────────────────

const search: BuiltinHandler = async (args) => {
  const query = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!query) throw new Error("wordpress.search requires a query.");
  const allOpts = { ...opts, search: query };
  return wpApi(`/search${buildQs(allOpts, ["search", "per_page", "page", "type", "subtype"])}`);
};

// ── Bulk Operations ─────────────────────────────────────────────────

const bulkUpdatePosts: BuiltinHandler = async (args) => {
  const postIds = args[0] as string[];
  const updates = args[1] as Record<string, unknown>;
  if (!postIds?.length || !updates) throw new Error("wordpress.bulkUpdatePosts requires postIds array and updates object.");
  const results: unknown[] = [];
  for (const id of postIds) {
    results.push(await wpApi(`/posts/${id}`, "POST", updates));
  }
  return results;
};

const bulkDeletePosts: BuiltinHandler = async (args) => {
  const postIds = args[0] as string[];
  const force = (args[1] as boolean) ?? false;
  if (!postIds?.length) throw new Error("wordpress.bulkDeletePosts requires a postIds array.");
  const results: unknown[] = [];
  for (const id of postIds) {
    results.push(await wpApi(`/posts/${id}?force=${force}`, "DELETE"));
  }
  return results;
};

// ── Exports ─────────────────────────────────────────────────────────

export const WordpressFunctions: Record<string, BuiltinHandler> = {
  // Credentials
  setCredentials,
  // Posts
  listPosts, getPost, createPost, updatePost, deletePost,
  // Pages
  listPages, createPage, updatePage, deletePage,
  // Categories
  listCategories, createCategory, deleteCategory,
  // Tags
  listTags, createTag, deleteTag,
  // Comments
  listComments, getComment, createComment, updateComment, deleteComment, moderateComment,
  // Media
  listMedia, getMedia, uploadMedia, updateMedia, deleteMedia,
  // Users
  listUsers, getUser, createUser, updateUser, deleteUser,
  // Meta
  getMeta, updateMeta, deleteMeta,
  // Revisions
  listRevisions, getRevision, deleteRevision,
  // Taxonomies
  listTaxonomies, listTerms, createTerm,
  // Plugins
  listPlugins, activatePlugin, deactivatePlugin, installPlugin, deletePlugin,
  // Themes
  listThemes, activateTheme,
  // Settings
  getSettings, updateSettings,
  // Search
  search,
  // Bulk
  bulkUpdatePosts, bulkDeletePosts,
};

export const WordpressFunctionMetadata: Record<string, FunctionMetadata> = {
  // ── Credentials ─────────────────────────────────────────────────
  setCredentials: {
    description: "Set WordPress site URL and Application Password credentials.",
    parameters: [
      { name: "siteUrl", dataType: "string", description: "WordPress site URL (e.g. https://mysite.com)", formInputType: "text", required: true },
      { name: "username", dataType: "string", description: "WordPress username", formInputType: "text", required: true },
      { name: "appPassword", dataType: "string", description: "Application Password (WP Admin > Users > Application Passwords)", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'wordpress.setCredentials "https://mysite.com" "admin" "xxxx xxxx xxxx xxxx"',
  },
  // ── Posts ────────────────────────────────────────────────────────
  listPosts: {
    description: "List posts with optional filters.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, status, search, categories, tags, orderby, order, author", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of post objects.",
    example: 'wordpress.listPosts {"per_page":5,"status":"publish"}',
  },
  getPost: {
    description: "Get a single post by ID.",
    parameters: [
      { name: "postId", dataType: "string", description: "Post ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Post object.",
    example: 'wordpress.getPost "123"',
  },
  createPost: {
    description: "Create a new post.",
    parameters: [
      { name: "post", dataType: "object", description: "Post object (title, content, status, categories, tags, featured_media, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created post object.",
    example: 'wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}',
  },
  updatePost: {
    description: "Update an existing post.",
    parameters: [
      { name: "postId", dataType: "string", description: "Post ID", formInputType: "text", required: true },
      { name: "post", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated post object.",
    example: 'wordpress.updatePost "123" {"title":"Updated","status":"publish"}',
  },
  deletePost: {
    description: "Delete a post (trash or force-delete).",
    parameters: [
      { name: "postId", dataType: "string", description: "Post ID", formInputType: "text", required: true },
      { name: "force", dataType: "boolean", description: "Permanently delete (default: false = trash)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "Deleted/trashed post object.",
    example: 'wordpress.deletePost "123"',
  },
  // ── Pages ───────────────────────────────────────────────────────
  listPages: {
    description: "List pages with optional filters.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, status, search, parent, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of page objects.",
    example: 'wordpress.listPages {"per_page":10}',
  },
  createPage: {
    description: "Create a new page.",
    parameters: [
      { name: "page", dataType: "object", description: "Page object (title, content, status, parent, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created page object.",
    example: 'wordpress.createPage {"title":"About","content":"<p>About us</p>","status":"publish"}',
  },
  updatePage: {
    description: "Update an existing page.",
    parameters: [
      { name: "pageId", dataType: "string", description: "Page ID", formInputType: "text", required: true },
      { name: "page", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated page object.",
    example: 'wordpress.updatePage "456" {"content":"<p>Updated</p>"}',
  },
  deletePage: {
    description: "Delete a page (trash or force-delete).",
    parameters: [
      { name: "pageId", dataType: "string", description: "Page ID", formInputType: "text", required: true },
      { name: "force", dataType: "boolean", description: "Permanently delete (default: false = trash)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "Deleted/trashed page object.",
    example: 'wordpress.deletePage "456" true',
  },
  // ── Categories ──────────────────────────────────────────────────
  listCategories: {
    description: "List post categories.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, search, parent, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of category objects.",
    example: "wordpress.listCategories",
  },
  createCategory: {
    description: "Create a new category.",
    parameters: [
      { name: "name", dataType: "string", description: "Category name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: description, parent, slug", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created category object.",
    example: 'wordpress.createCategory "Technology"',
  },
  deleteCategory: {
    description: "Permanently delete a category.",
    parameters: [
      { name: "categoryId", dataType: "string", description: "Category ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deleteCategory "12"',
  },
  // ── Tags ────────────────────────────────────────────────────────
  listTags: {
    description: "List post tags.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, search, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of tag objects.",
    example: 'wordpress.listTags {"search":"javascript"}',
  },
  createTag: {
    description: "Create a new tag.",
    parameters: [
      { name: "name", dataType: "string", description: "Tag name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: description, slug", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created tag object.",
    example: 'wordpress.createTag "react"',
  },
  deleteTag: {
    description: "Permanently delete a tag.",
    parameters: [
      { name: "tagId", dataType: "string", description: "Tag ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deleteTag "34"',
  },
  // ── Comments ────────────────────────────────────────────────────
  listComments: {
    description: "List comments with optional filters.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, post, status (approved, hold, spam, trash), search, author, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of comment objects.",
    example: 'wordpress.listComments {"post":"123","status":"approved"}',
  },
  getComment: {
    description: "Get a single comment by ID.",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Comment object.",
    example: 'wordpress.getComment "456"',
  },
  createComment: {
    description: "Create a new comment.",
    parameters: [
      { name: "comment", dataType: "object", description: "Comment object (post, content, author_name, author_email, parent, status)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created comment object.",
    example: 'wordpress.createComment {"post":123,"content":"Great article!","author_name":"John"}',
  },
  updateComment: {
    description: "Update an existing comment.",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID", formInputType: "text", required: true },
      { name: "updates", dataType: "object", description: "Fields to update (content, status, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated comment object.",
    example: 'wordpress.updateComment "456" {"content":"Edited comment"}',
  },
  deleteComment: {
    description: "Delete a comment (trash or force-delete).",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID", formInputType: "text", required: true },
      { name: "force", dataType: "boolean", description: "Permanently delete (default: false = trash)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "Deleted/trashed comment.",
    example: 'wordpress.deleteComment "456"',
  },
  moderateComment: {
    description: "Change a comment's moderation status.",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID", formInputType: "text", required: true },
      { name: "status", dataType: "string", description: "New status: approved, hold, spam, trash", formInputType: "select", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated comment object.",
    example: 'wordpress.moderateComment "456" "approved"',
  },
  // ── Media ───────────────────────────────────────────────────────
  listMedia: {
    description: "List media library items.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, search, media_type (image, video, audio, application), mime_type, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of media objects.",
    example: 'wordpress.listMedia {"media_type":"image","per_page":20}',
  },
  getMedia: {
    description: "Get a media item by ID.",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Media object with source_url, dimensions, etc.",
    example: 'wordpress.getMedia "789"',
  },
  uploadMedia: {
    description: "Upload a media file.",
    parameters: [
      { name: "filename", dataType: "string", description: "File name", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "File content", formInputType: "textarea", required: true },
      { name: "mimeType", dataType: "string", description: "MIME type (default: image/png)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Uploaded media object with source_url.",
    example: 'wordpress.uploadMedia "photo.png" content "image/png"',
  },
  updateMedia: {
    description: "Update media metadata (title, alt_text, caption, description).",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID", formInputType: "text", required: true },
      { name: "updates", dataType: "object", description: "Fields: title, alt_text, caption, description", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated media object.",
    example: 'wordpress.updateMedia "789" {"alt_text":"Hero image","caption":"Homepage banner"}',
  },
  deleteMedia: {
    description: "Permanently delete a media item.",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID", formInputType: "text", required: true },
      { name: "force", dataType: "boolean", description: "Force permanent deletion (default: true)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deleteMedia "789"',
  },
  // ── Users ───────────────────────────────────────────────────────
  listUsers: {
    description: "List users on the site.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: per_page, page, search, roles, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of user objects.",
    example: 'wordpress.listUsers {"roles":"administrator"}',
  },
  getUser: {
    description: "Get a user by ID.",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "User object.",
    example: 'wordpress.getUser "1"',
  },
  createUser: {
    description: "Create a new user.",
    parameters: [
      { name: "user", dataType: "object", description: "User object (username, email, password required; also: first_name, last_name, roles, description)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created user object.",
    example: 'wordpress.createUser {"username":"john","email":"john@example.com","password":"SecureP@ss","roles":["editor"]}',
  },
  updateUser: {
    description: "Update a user's profile.",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "updates", dataType: "object", description: "Fields to update (first_name, last_name, email, roles, description, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated user object.",
    example: 'wordpress.updateUser "2" {"roles":["administrator"],"first_name":"John"}',
  },
  deleteUser: {
    description: "Delete a user and reassign their content.",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID to delete", formInputType: "text", required: true },
      { name: "reassignTo", dataType: "string", description: "User ID to reassign content to (required by WordPress)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deleteUser "5" "1"',
  },
  // ── Meta ────────────────────────────────────────────────────────
  getMeta: {
    description: "Get custom fields/meta for a post or page.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint: 'posts' or 'pages' (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object containing meta fields.",
    example: 'wordpress.getMeta "posts" "123"',
  },
  updateMeta: {
    description: "Update custom fields/meta on a post or page.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint: 'posts' or 'pages' (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
      { name: "meta", dataType: "object", description: "Meta key-value pairs to set", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated post/page object.",
    example: 'wordpress.updateMeta "posts" "123" {"custom_field":"value","price":"29.99"}',
  },
  deleteMeta: {
    description: "Remove a custom field/meta key from a post or page.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint: 'posts' or 'pages' (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
      { name: "metaKey", dataType: "string", description: "Meta key to remove", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated post/page object.",
    example: 'wordpress.deleteMeta "posts" "123" "custom_field"',
  },
  // ── Revisions ───────────────────────────────────────────────────
  listRevisions: {
    description: "List revisions for a post or page.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint: 'posts' or 'pages' (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of revision objects.",
    example: 'wordpress.listRevisions "posts" "123"',
  },
  getRevision: {
    description: "Get a specific revision.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
      { name: "revisionId", dataType: "string", description: "Revision ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Revision object with content diff.",
    example: 'wordpress.getRevision "posts" "123" "456"',
  },
  deleteRevision: {
    description: "Permanently delete a revision.",
    parameters: [
      { name: "postType", dataType: "string", description: "Post type endpoint (default: posts)", formInputType: "text", required: false },
      { name: "postId", dataType: "string", description: "Post/Page ID", formInputType: "text", required: true },
      { name: "revisionId", dataType: "string", description: "Revision ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deleteRevision "posts" "123" "456"',
  },
  // ── Taxonomies ──────────────────────────────────────────────────
  listTaxonomies: {
    description: "List all registered taxonomies.",
    parameters: [],
    returnType: "object",
    returnDescription: "Object of taxonomy definitions.",
    example: "wordpress.listTaxonomies",
  },
  listTerms: {
    description: "List terms for any taxonomy.",
    parameters: [
      { name: "taxonomy", dataType: "string", description: "Taxonomy REST slug (e.g. 'categories', 'tags', or custom)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: per_page, page, search, parent, orderby, order", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of term objects.",
    example: 'wordpress.listTerms "categories" {"search":"tech"}',
  },
  createTerm: {
    description: "Create a term in any taxonomy.",
    parameters: [
      { name: "taxonomy", dataType: "string", description: "Taxonomy REST slug", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Term name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: description, parent, slug", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created term object.",
    example: 'wordpress.createTerm "categories" "DevOps" {"slug":"devops"}',
  },
  // ── Plugins ─────────────────────────────────────────────────────
  listPlugins: {
    description: "List all installed plugins with status.",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of plugin objects with name, status, version.",
    example: "wordpress.listPlugins",
  },
  activatePlugin: {
    description: "Activate a plugin.",
    parameters: [
      { name: "plugin", dataType: "string", description: "Plugin slug (e.g. 'akismet/akismet')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated plugin object.",
    example: 'wordpress.activatePlugin "akismet/akismet"',
  },
  deactivatePlugin: {
    description: "Deactivate a plugin.",
    parameters: [
      { name: "plugin", dataType: "string", description: "Plugin slug (e.g. 'akismet/akismet')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated plugin object.",
    example: 'wordpress.deactivatePlugin "akismet/akismet"',
  },
  installPlugin: {
    description: "Install a plugin from the WordPress.org marketplace.",
    parameters: [
      { name: "slug", dataType: "string", description: "Plugin slug from wordpress.org", formInputType: "text", required: true },
      { name: "activate", dataType: "boolean", description: "Activate immediately after install (default: false)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "Installed plugin object with name, version, status.",
    example: 'wordpress.installPlugin "plugin-slug" true',
  },
  deletePlugin: {
    description: "Delete (uninstall) a plugin. Plugin must be deactivated first.",
    parameters: [
      { name: "plugin", dataType: "string", description: "Plugin slug with folder (e.g. 'folder/plugin-file')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation.",
    example: 'wordpress.deletePlugin "folder/plugin-file"',
  },
  // ── Themes ──────────────────────────────────────────────────────
  listThemes: {
    description: "List all installed themes.",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of theme objects.",
    example: "wordpress.listThemes",
  },
  activateTheme: {
    description: "Activate a theme.",
    parameters: [
      { name: "theme", dataType: "string", description: "Theme stylesheet slug (e.g. 'twentytwentyfour')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated theme object.",
    example: 'wordpress.activateTheme "twentytwentyfour"',
  },
  // ── Settings ────────────────────────────────────────────────────
  getSettings: {
    description: "Get site settings (title, description, timezone, etc.).",
    parameters: [],
    returnType: "object",
    returnDescription: "Site settings object.",
    example: "wordpress.getSettings",
  },
  updateSettings: {
    description: "Update site settings.",
    parameters: [
      { name: "settings", dataType: "object", description: "Settings to update (title, description, timezone_string, date_format, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated settings object.",
    example: 'wordpress.updateSettings {"title":"My Enterprise Site","description":"The best site"}',
  },
  // ── Search ──────────────────────────────────────────────────────
  search: {
    description: "Global search across all content types.",
    parameters: [
      { name: "query", dataType: "string", description: "Search query", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: per_page, page, type (post, term, post-format), subtype", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of search result objects with title, url, type.",
    example: 'wordpress.search "migration guide"',
  },
  // ── Bulk Operations ─────────────────────────────────────────────
  bulkUpdatePosts: {
    description: "Update multiple posts at once with the same changes.",
    parameters: [
      { name: "postIds", dataType: "array", description: "Array of post IDs to update", formInputType: "json", required: true },
      { name: "updates", dataType: "object", description: "Fields to apply to all posts", formInputType: "json", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of updated post objects.",
    example: 'wordpress.bulkUpdatePosts ["1","2","3"] {"status":"publish","categories":[5]}',
  },
  bulkDeletePosts: {
    description: "Delete multiple posts at once.",
    parameters: [
      { name: "postIds", dataType: "array", description: "Array of post IDs to delete", formInputType: "json", required: true },
      { name: "force", dataType: "boolean", description: "Permanently delete (default: false = trash)", formInputType: "checkbox", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of deletion results.",
    example: 'wordpress.bulkDeletePosts ["10","11","12"]',
  },
};

export const WordpressModuleMetadata: ModuleMetadata = {
  description: "Enterprise WordPress management — posts, pages, comments, media, users, categories, tags, custom fields, revisions, plugins, themes, settings, search, and bulk operations via the WordPress REST API v2.",
  methods: Object.keys(WordpressFunctions),
  category: "cms",
};
