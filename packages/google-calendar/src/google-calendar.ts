import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getToken(): string {
  const token = config.get("accessToken");
  if (!token) throw new Error('Google Calendar: token not configured. Call googleCalendar.setCredentials first.');
  return token;
}

async function calendarApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const token = getToken();
  const res = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Calendar API error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("googleCalendar.setCredentials requires an access token.");
  config.set("accessToken", accessToken);
  return "Google Calendar credentials configured.";
};

const listEvents: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.timeMin) params.set("timeMin", String(opts.timeMin));
  if (opts.timeMax) params.set("timeMax", String(opts.timeMax));
  if (opts.maxResults) params.set("maxResults", String(opts.maxResults));
  if (opts.q) params.set("q", String(opts.q));
  params.set("singleEvents", "true");
  params.set("orderBy", "startTime");
  return calendarApi(`/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`);
};

const getEvent: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const eventId = args[1] as string;
  if (!eventId) throw new Error("googleCalendar.getEvent requires an eventId.");
  return calendarApi(`/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`);
};

const createEvent: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const event = args[1] as Record<string, unknown>;
  if (!event) throw new Error("googleCalendar.createEvent requires an event object.");
  return calendarApi(`/calendars/${encodeURIComponent(calendarId)}/events`, "POST", event);
};

const updateEvent: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const eventId = args[1] as string;
  const event = args[2] as Record<string, unknown>;
  if (!eventId || !event) throw new Error("googleCalendar.updateEvent requires eventId and event object.");
  return calendarApi(`/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`, "PATCH", event);
};

const deleteEvent: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const eventId = args[1] as string;
  if (!eventId) throw new Error("googleCalendar.deleteEvent requires an eventId.");
  const token = getToken();
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Calendar delete error (${res.status}): ${text}`);
  }
  return "Event deleted.";
};

const listCalendars: BuiltinHandler = async () => {
  return calendarApi("/users/me/calendarList");
};

const createCalendar: BuiltinHandler = async (args) => {
  const summary = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!summary) throw new Error("googleCalendar.createCalendar requires a summary (name).");
  const payload: Record<string, unknown> = { summary };
  if (opts.description) payload.description = opts.description;
  if (opts.timeZone) payload.timeZone = opts.timeZone;
  return calendarApi("/calendars", "POST", payload);
};

const quickAdd: BuiltinHandler = async (args) => {
  const calendarId = (args[0] as string) ?? "primary";
  const text = args[1] as string;
  if (!text) throw new Error("googleCalendar.quickAdd requires text.");
  return calendarApi(`/calendars/${encodeURIComponent(calendarId)}/events/quickAdd?text=${encodeURIComponent(text)}`, "POST");
};

const freeBusy: BuiltinHandler = async (args) => {
  const timeMin = args[0] as string;
  const timeMax = args[1] as string;
  const calendars = (args[2] as string[]) ?? ["primary"];
  if (!timeMin || !timeMax) throw new Error("googleCalendar.freeBusy requires timeMin and timeMax.");
  return calendarApi("/freeBusy", "POST", {
    timeMin,
    timeMax,
    items: calendars.map((id) => ({ id })),
  });
};

export const GoogleCalendarFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  listCalendars,
  createCalendar,
  quickAdd,
  freeBusy,
};

export const GoogleCalendarFunctionMetadata: Record<string, object> = {
  setCredentials: {
    description: "Set the OAuth2 access token for Google Calendar API.",
    parameters: [
      { name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "password", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'googleCalendar.setCredentials "ya29.xxx"',
  },
  listEvents: {
    description: "List events from a calendar.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "Options: timeMin, timeMax (ISO 8601), maxResults, q (search)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with items array of event objects.",
    example: 'googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}',
  },
  getEvent: {
    description: "Get a single event by ID.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "eventId", dataType: "string", description: "Event ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Event object.",
    example: 'googleCalendar.getEvent "primary" "event-id"',
  },
  createEvent: {
    description: "Create a new calendar event.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "event", dataType: "object", description: "Event object (summary, start, end, description, location, attendees)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created event object.",
    example: 'googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}',
  },
  updateEvent: {
    description: "Update an existing event.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "eventId", dataType: "string", description: "Event ID", formInputType: "text", required: true },
      { name: "event", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated event object.",
    example: 'googleCalendar.updateEvent "primary" "event-id" {"summary":"Updated Meeting"}',
  },
  deleteEvent: {
    description: "Delete a calendar event.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "eventId", dataType: "string", description: "Event ID to delete", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'googleCalendar.deleteEvent "primary" "event-id"',
  },
  listCalendars: {
    description: "List all calendars for the authenticated user.",
    parameters: [],
    returnType: "object",
    returnDescription: "Object with items array of calendar objects.",
    example: "googleCalendar.listCalendars",
  },
  createCalendar: {
    description: "Create a new calendar.",
    parameters: [
      { name: "summary", dataType: "string", description: "Calendar name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: description, timeZone", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created calendar object.",
    example: 'googleCalendar.createCalendar "Work Events" {"timeZone":"America/New_York"}',
  },
  quickAdd: {
    description: "Create an event from a natural-language text string.",
    parameters: [
      { name: "calendarId", dataType: "string", description: "Calendar ID (default: 'primary')", formInputType: "text", required: false },
      { name: "text", dataType: "string", description: "Natural-language event description", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Created event object.",
    example: 'googleCalendar.quickAdd "primary" "Meeting with John at 3pm tomorrow"',
  },
  freeBusy: {
    description: "Check free/busy status for calendars.",
    parameters: [
      { name: "timeMin", dataType: "string", description: "Start of time range (ISO 8601)", formInputType: "text", required: true },
      { name: "timeMax", dataType: "string", description: "End of time range (ISO 8601)", formInputType: "text", required: true },
      { name: "calendars", dataType: "array", description: "Array of calendar IDs (default: ['primary'])", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Free/busy response with busy intervals.",
    example: 'googleCalendar.freeBusy "2025-06-01T00:00:00Z" "2025-06-02T00:00:00Z"',
  },
};

export const GoogleCalendarModuleMetadata = {
  name: "googleCalendar",
  description: "Create, read, update, and delete Google Calendar events, manage calendars, and check availability.",
  icon: "calendar",
  category: "productivity",
};
