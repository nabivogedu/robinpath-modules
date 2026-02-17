import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";

type Value = string | number | boolean | null | object;

// ── Internal State ──────────────────────────────────────────────────

let accessToken = "";

const API_BASE = "https://api.linkedin.com";
const API_VERSION = "202401";

// ── Helper ──────────────────────────────────────────────────────────

function getHeaders(): Record<string, string> {
  if (!accessToken) {
    throw new Error("Access token not set. Call linkedin.setToken first.");
  }
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "LinkedIn-Version": API_VERSION,
    "X-Restli-Protocol-Version": "2.0.0",
  };
}

async function linkedinGet(path: string): Promise<Value> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LinkedIn API GET ${path} failed (${response.status}): ${errText}`);
  }

  return response.json() as Promise<Value>;
}

async function linkedinPost(path: string, body: unknown): Promise<Value> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LinkedIn API POST ${path} failed (${response.status}): ${errText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<Value>;
  }

  // Some endpoints return 201 with location header and no body
  return {
    ok: true,
    status: response.status,
    location: response.headers.get("x-restli-id") ?? response.headers.get("location") ?? null,
  };
}

async function linkedinDelete(path: string): Promise<Value> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LinkedIn API DELETE ${path} failed (${response.status}): ${errText}`);
  }

  return { ok: true, status: response.status };
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  if (!token) throw new Error("Access token is required");
  accessToken = token;
  return { ok: true };
};

const getProfile: BuiltinHandler = async (_args) => {
  const result = await linkedinGet("/v2/userinfo");
  return result as Value;
};

const getOrganization: BuiltinHandler = async (args) => {
  const organizationId = String(args[0] ?? "");
  if (!organizationId) throw new Error("Organization ID is required");

  const result = await linkedinGet(`/v2/organizations/${organizationId}`);
  return result as Value;
};

const createPost: BuiltinHandler = async (args) => {
  const authorUrn = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!authorUrn) throw new Error("Author URN is required (e.g. urn:li:person:{id})");
  if (!text) throw new Error("Post text is required");

  const visibility = String(opts.visibility ?? "PUBLIC");

  const body: Record<string, unknown> = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: String(opts.mediaCategory ?? "NONE"),
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": visibility,
    },
  };

  const result = await linkedinPost("/v2/ugcPosts", body);
  return result as Value;
};

const createArticlePost: BuiltinHandler = async (args) => {
  const authorUrn = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const articleUrl = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!authorUrn) throw new Error("Author URN is required");
  if (!text) throw new Error("Post text is required");
  if (!articleUrl) throw new Error("Article URL is required");

  const visibility = String(opts.visibility ?? "PUBLIC");

  const media: Record<string, unknown> = {
    status: "READY",
    originalUrl: articleUrl,
  };
  if (opts.title) media.title = { text: String(opts.title) };
  if (opts.description) media.description = { text: String(opts.description) };

  const body: Record<string, unknown> = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "ARTICLE",
        media: [media],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": visibility,
    },
  };

  const result = await linkedinPost("/v2/ugcPosts", body);
  return result as Value;
};

const createImagePost: BuiltinHandler = async (args) => {
  const authorUrn = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const imageUrn = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!authorUrn) throw new Error("Author URN is required");
  if (!text) throw new Error("Post text is required");
  if (!imageUrn) throw new Error("Image URN is required (from registerImageUpload)");

  const visibility = String(opts.visibility ?? "PUBLIC");

  const media: Record<string, unknown> = {
    status: "READY",
    media: imageUrn,
  };
  if (opts.title) media.title = { text: String(opts.title) };
  if (opts.description) media.description = { text: String(opts.description) };

  const body: Record<string, unknown> = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "IMAGE",
        media: [media],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": visibility,
    },
  };

  const result = await linkedinPost("/v2/ugcPosts", body);
  return result as Value;
};

const deletePost: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  if (!postUrn) throw new Error("Post URN is required");

  const encodedUrn = encodeURIComponent(postUrn);
  const result = await linkedinDelete(`/v2/ugcPosts/${encodedUrn}`);
  return result as Value;
};

const getPost: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  if (!postUrn) throw new Error("Post URN is required");

  const encodedUrn = encodeURIComponent(postUrn);
  const result = await linkedinGet(`/v2/ugcPosts/${encodedUrn}`);
  return result as Value;
};

const registerImageUpload: BuiltinHandler = async (args) => {
  const ownerUrn = String(args[0] ?? "");
  if (!ownerUrn) throw new Error("Owner URN is required (e.g. urn:li:person:{id})");

  const body = {
    registerUploadRequest: {
      recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
      owner: ownerUrn,
      serviceRelationships: [
        {
          relationshipType: "OWNER",
          identifier: "urn:li:userGeneratedContent",
        },
      ],
    },
  };

  const result = (await linkedinPost("/v2/assets?action=registerUpload", body)) as Record<string, unknown>;

  const uploadValue = (result.value ?? result) as Record<string, unknown>;
  const uploadMechanism = uploadValue.uploadMechanism as Record<string, unknown> | undefined;
  const mediaUpload = uploadMechanism?.["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"] as Record<string, unknown> | undefined;

  return {
    uploadUrl: mediaUpload?.uploadUrl ?? null,
    imageUrn: uploadValue.asset ?? null,
    mediaArtifact: uploadValue.mediaArtifact ?? null,
  };
};

const uploadImage: BuiltinHandler = async (args) => {
  const uploadUrl = String(args[0] ?? "");
  const imagePath = String(args[1] ?? "");

  if (!uploadUrl) throw new Error("Upload URL is required (from registerImageUpload)");
  if (!imagePath) throw new Error("Image file path is required");

  const fileData = readFileSync(imagePath);

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
    },
    body: fileData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Image upload failed (${response.status}): ${errText}`);
  }

  return { ok: true, status: response.status };
};

const addComment: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  const text = String(args[1] ?? "");

  if (!postUrn) throw new Error("Post URN is required");
  if (!text) throw new Error("Comment text is required");

  const encodedUrn = encodeURIComponent(postUrn);

  const body = {
    actor: postUrn.includes("urn:li:person") ? postUrn : undefined,
    message: { text },
  };

  const result = await linkedinPost(`/v2/socialActions/${encodedUrn}/comments`, body);
  return result as Value;
};

const getComments: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!postUrn) throw new Error("Post URN is required");

  const encodedUrn = encodeURIComponent(postUrn);
  const start = Number(opts.start ?? 0);
  const count = Number(opts.count ?? 10);

  const result = await linkedinGet(`/v2/socialActions/${encodedUrn}/comments?start=${start}&count=${count}`);
  return result as Value;
};

const deleteComment: BuiltinHandler = async (args) => {
  const commentUrn = String(args[0] ?? "");
  if (!commentUrn) throw new Error("Comment URN is required");

  const encodedUrn = encodeURIComponent(commentUrn);
  const result = await linkedinDelete(`/v2/socialActions/${encodedUrn}`);
  return result as Value;
};

const addReaction: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  const reactionType = String(args[1] ?? "");

  if (!postUrn) throw new Error("Post URN is required");
  if (!reactionType) throw new Error("Reaction type is required (LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION)");

  const validReactions = ["LIKE", "PRAISE", "EMPATHY", "INTEREST", "APPRECIATION"];
  const upperReaction = reactionType.toUpperCase();
  if (!validReactions.includes(upperReaction)) {
    throw new Error(`Invalid reaction type "${reactionType}". Must be one of: ${validReactions.join(", ")}`);
  }

  const encodedUrn = encodeURIComponent(postUrn);

  const body = {
    reactionType: upperReaction,
  };

  const result = await linkedinPost(`/v2/socialActions/${encodedUrn}/likes`, body);
  return result as Value;
};

const removeReaction: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  const reactionType = String(args[1] ?? "");

  if (!postUrn) throw new Error("Post URN is required");
  if (!reactionType) throw new Error("Reaction type is required");

  const encodedUrn = encodeURIComponent(postUrn);
  const result = await linkedinDelete(`/v2/socialActions/${encodedUrn}/likes/${reactionType.toUpperCase()}`);
  return result as Value;
};

const getReactions: BuiltinHandler = async (args) => {
  const postUrn = String(args[0] ?? "");
  if (!postUrn) throw new Error("Post URN is required");

  const encodedUrn = encodeURIComponent(postUrn);
  const result = await linkedinGet(`/v2/socialActions/${encodedUrn}/likes`);
  return result as Value;
};

const getFollowerCount: BuiltinHandler = async (args) => {
  const organizationUrn = String(args[0] ?? "");
  if (!organizationUrn) throw new Error("Organization URN is required");

  // Extract numeric ID from URN if provided as full URN
  const orgId = organizationUrn.includes("urn:li:organization:")
    ? organizationUrn.replace("urn:li:organization:", "")
    : organizationUrn;

  const result = (await linkedinGet(
    `/v2/networkSizes/${encodeURIComponent(`urn:li:organization:${orgId}`)}?edgeType=CompanyFollowedByMember`,
  )) as Record<string, unknown>;

  return {
    organizationId: orgId,
    followerCount: result.firstDegreeSize ?? 0,
  };
};

const getShareStatistics: BuiltinHandler = async (args) => {
  const ownerUrn = String(args[0] ?? "");
  const shareUrns = args[1];

  if (!ownerUrn) throw new Error("Owner URN is required");

  let path = `/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${encodeURIComponent(ownerUrn)}`;

  if (Array.isArray(shareUrns) && shareUrns.length > 0) {
    const sharesParam = shareUrns.map((s: any) => `shares=${encodeURIComponent(String(s))}`).join("&");
    path += `&${sharesParam}`;
  }

  const result = await linkedinGet(path);
  return result as Value;
};

const searchPeople: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!query) throw new Error("Search query is required");

  const start = Number(opts.start ?? 0);
  const count = Number(opts.count ?? 10);

  const result = await linkedinGet(
    `/v2/search/blended?q=people&keywords=${encodeURIComponent(query)}&start=${start}&count=${count}`,
  );
  return result as Value;
};

const getConnections: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const start = Number(opts.start ?? 0);
  const count = Number(opts.count ?? 10);

  const result = await linkedinGet(`/v2/connections?q=viewer&start=${start}&count=${count}`);
  return result as Value;
};

// ── Exports ─────────────────────────────────────────────────────────

export const LinkedinFunctions: Record<string, BuiltinHandler> = {
  setToken,
  getProfile,
  getOrganization,
  createPost,
  createArticlePost,
  createImagePost,
  deletePost,
  getPost,
  registerImageUpload,
  uploadImage,
  addComment,
  getComments,
  deleteComment,
  addReaction,
  removeReaction,
  getReactions,
  getFollowerCount,
  getShareStatistics,
  searchPeople,
  getConnections,
};

export const LinkedinFunctionMetadata = {
  setToken: {
    description: "Store an OAuth2 access token for LinkedIn API requests",
    parameters: [
      { name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'linkedin.setToken "your-access-token"',
  },
  getProfile: {
    description: "Get the authenticated user's profile using /v2/userinfo",
    parameters: [],
    returnType: "object",
    returnDescription: "User profile object with sub, name, email, picture, etc.",
    example: "linkedin.getProfile",
  },
  getOrganization: {
    description: "Get organization/company page information",
    parameters: [
      { name: "organizationId", dataType: "string", description: "Organization numeric ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Organization object with name, description, website, etc.",
    example: 'linkedin.getOrganization "12345678"',
  },
  createPost: {
    description: "Create a text post (share on feed)",
    parameters: [
      { name: "authorUrn", dataType: "string", description: "Author URN (e.g. urn:li:person:{id} or urn:li:organization:{id})", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Post text content", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{visibility?: 'PUBLIC'|'CONNECTIONS', mediaCategory?: string}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Created post object with id",
    example: 'linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}',
  },
  createArticlePost: {
    description: "Share an article with URL, title, and description",
    parameters: [
      { name: "authorUrn", dataType: "string", description: "Author URN", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Post commentary text", formInputType: "textarea", required: true },
      { name: "articleUrl", dataType: "string", description: "URL of the article to share", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{visibility?, title?, description?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Created post object with id",
    example: 'linkedin.createArticlePost "urn:li:person:abc123" "Great read!" "https://example.com/article" {"title": "Article Title"}',
  },
  createImagePost: {
    description: "Share an image post with text",
    parameters: [
      { name: "authorUrn", dataType: "string", description: "Author URN", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Post text content", formInputType: "textarea", required: true },
      { name: "imageUrn", dataType: "string", description: "Image URN from registerImageUpload", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{visibility?, title?, description?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Created post object with id",
    example: 'linkedin.createImagePost "urn:li:person:abc123" "Check this out!" "urn:li:digitalmediaAsset:abc" {"title": "Photo"}',
  },
  deletePost: {
    description: "Delete a post by its URN",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true, status}",
    example: 'linkedin.deletePost "urn:li:ugcPost:123456"',
  },
  getPost: {
    description: "Get post details by URN",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Post object with author, text, visibility, etc.",
    example: 'linkedin.getPost "urn:li:ugcPost:123456"',
  },
  registerImageUpload: {
    description: "Register an image upload and get the upload URL and image URN",
    parameters: [
      { name: "ownerUrn", dataType: "string", description: "Owner URN (e.g. urn:li:person:{id})", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{uploadUrl, imageUrn, mediaArtifact}",
    example: 'linkedin.registerImageUpload "urn:li:person:abc123"',
  },
  uploadImage: {
    description: "Upload an image binary to the URL from registerImageUpload",
    parameters: [
      { name: "uploadUrl", dataType: "string", description: "Upload URL from registerImageUpload", formInputType: "text", required: true },
      { name: "imagePath", dataType: "string", description: "Local path to the image file", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true, status}",
    example: 'linkedin.uploadImage "https://api.linkedin.com/mediaUpload/..." "./photo.jpg"',
  },
  addComment: {
    description: "Add a comment on a post",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post to comment on", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Comment text", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created comment object",
    example: 'linkedin.addComment "urn:li:ugcPost:123456" "Great post!"',
  },
  getComments: {
    description: "List comments on a post",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{start?: number, count?: number}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with elements array of comments",
    example: 'linkedin.getComments "urn:li:ugcPost:123456" {"count": 20}',
  },
  deleteComment: {
    description: "Delete a comment by its URN",
    parameters: [
      { name: "commentUrn", dataType: "string", description: "URN of the comment to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true, status}",
    example: 'linkedin.deleteComment "urn:li:comment:(ugcPost:123,456)"',
  },
  addReaction: {
    description: "React to a post (LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION)",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post to react to", formInputType: "text", required: true },
      { name: "reactionType", dataType: "string", description: "Reaction type: LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION", formInputType: "select", required: true },
    ],
    returnType: "object",
    returnDescription: "Reaction result object",
    example: 'linkedin.addReaction "urn:li:ugcPost:123456" "LIKE"',
  },
  removeReaction: {
    description: "Remove a reaction from a post",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post", formInputType: "text", required: true },
      { name: "reactionType", dataType: "string", description: "Reaction type to remove: LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION", formInputType: "select", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true, status}",
    example: 'linkedin.removeReaction "urn:li:ugcPost:123456" "LIKE"',
  },
  getReactions: {
    description: "Get all reactions on a post",
    parameters: [
      { name: "postUrn", dataType: "string", description: "URN of the post", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with elements array of reactions",
    example: 'linkedin.getReactions "urn:li:ugcPost:123456"',
  },
  getFollowerCount: {
    description: "Get the follower count for an organization",
    parameters: [
      { name: "organizationUrn", dataType: "string", description: "Organization URN or numeric ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{organizationId, followerCount}",
    example: 'linkedin.getFollowerCount "urn:li:organization:12345678"',
  },
  getShareStatistics: {
    description: "Get post/share analytics for an organization",
    parameters: [
      { name: "ownerUrn", dataType: "string", description: "Owner URN (organizational entity)", formInputType: "text", required: true },
      { name: "shareUrns", dataType: "array", description: "Optional array of share URNs to filter", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Share statistics with impressions, clicks, engagement, etc.",
    example: 'linkedin.getShareStatistics "urn:li:organization:12345678"',
  },
  searchPeople: {
    description: "Search for people on LinkedIn (limited access, requires special permissions)",
    parameters: [
      { name: "query", dataType: "string", description: "Search keywords", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{start?: number, count?: number}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results object with people array",
    example: 'linkedin.searchPeople "software engineer" {"count": 10}',
  },
  getConnections: {
    description: "Get first-degree connections of the authenticated user",
    parameters: [
      { name: "options", dataType: "object", description: "{start?: number, count?: number}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Connections list with elements array",
    example: 'linkedin.getConnections {"count": 20}',
  },
};

export const LinkedinModuleMetadata = {
  description: "LinkedIn API client for posts, comments, reactions, image uploads, organization management, and people search via Community Management and Marketing APIs",
  methods: Object.keys(LinkedinFunctions),
  category: "social",
};
