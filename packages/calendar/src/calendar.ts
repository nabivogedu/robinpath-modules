import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

function toIcalDate(iso: string, allDay = false): string {
  const d = new Date(iso);
  if (allDay) return d.toISOString().slice(0, 10).replace(/-/g, "");
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function fromIcalDate(ical: string): string {
  if (ical.length === 8) return `${ical.slice(0, 4)}-${ical.slice(4, 6)}-${ical.slice(6, 8)}`;
  const m = ical.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
  if (!m) return ical;
  return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}${ical.endsWith("Z") ? "Z" : ""}`;
}

function escIcal(s: string): string { return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
function unescIcal(s: string): string { return s.replace(/\\n/g, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\"); }

function extractProp(block: string, prop: string): string | undefined {
  const re = new RegExp(`^${prop}[;:](.*)`, "mi");
  const m = block.match(re);
  if (!m) return undefined;
  let val = m[1]!;
  if (val.includes(":")) val = val.split(":").slice(-1)[0]!;
  return unescIcal(val.trim());
}

const createEvent: BuiltinHandler = (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  return {
    uid: opts.uid ? String(opts.uid) : randomUUID(),
    summary: String(opts.summary ?? ""),
    description: opts.description ? String(opts.description) : undefined,
    location: opts.location ? String(opts.location) : undefined,
    start: String(opts.start ?? new Date().toISOString()),
    end: opts.end ? String(opts.end) : undefined,
    allDay: opts.allDay === true,
    organizer: opts.organizer ? String(opts.organizer) : undefined,
    attendees: Array.isArray(opts.attendees) ? opts.attendees.map(String) : undefined,
    url: opts.url ? String(opts.url) : undefined,
  };
};

const createCalendar: BuiltinHandler = (args) => {
  const events = (Array.isArray(args[0]) ? args[0] : []) as Record<string, unknown>[];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//RobinPath//Calendar//EN`];
  if (opts.name) lines.push(`X-WR-CALNAME:${escIcal(String(opts.name))}`);
  if (opts.timezone) lines.push(`X-WR-TIMEZONE:${String(opts.timezone)}`);
  for (const ev of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${ev.uid ?? randomUUID()}`);
    lines.push(`SUMMARY:${escIcal(String(ev.summary ?? ""))}`);
    if (ev.description) lines.push(`DESCRIPTION:${escIcal(String(ev.description))}`);
    if (ev.location) lines.push(`LOCATION:${escIcal(String(ev.location))}`);
    const allDay = ev.allDay === true;
    lines.push(allDay ? `DTSTART;VALUE=DATE:${toIcalDate(String(ev.start), true)}` : `DTSTART:${toIcalDate(String(ev.start))}`);
    if (ev.end) lines.push(allDay ? `DTEND;VALUE=DATE:${toIcalDate(String(ev.end), true)}` : `DTEND:${toIcalDate(String(ev.end))}`);
    if (ev.organizer) lines.push(`ORGANIZER:mailto:${ev.organizer}`);
    if (Array.isArray(ev.attendees)) for (const a of ev.attendees) lines.push(`ATTENDEE:mailto:${a}`);
    if (ev.url) lines.push(`URL:${ev.url}`);
    lines.push(`DTSTAMP:${toIcalDate(new Date().toISOString())}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

const parse: BuiltinHandler = (args) => {
  const ics = String(args[0] ?? "");
  const nameMatch = ics.match(/X-WR-CALNAME:(.*)/i);
  const eventBlocks = ics.split(/BEGIN:VEVENT/i).slice(1);
  const events = eventBlocks.map((block: any) => {
    const endIdx = block.indexOf("END:VEVENT");
    const content = endIdx >= 0 ? block.substring(0, endIdx) : block;
    const dtstart = extractProp(content, "DTSTART");
    const dtend = extractProp(content, "DTEND");
    const allDay = content.includes("VALUE=DATE");
    const attendees: string[] = [];
    const attMatches = content.matchAll(/ATTENDEE[^:]*:(?:mailto:)?(.+)/gi);
    for (const m of attMatches) attendees.push(m[1]!.trim());
    return {
      uid: extractProp(content, "UID"), summary: extractProp(content, "SUMMARY"),
      description: extractProp(content, "DESCRIPTION"), location: extractProp(content, "LOCATION"),
      start: dtstart ? fromIcalDate(dtstart) : undefined, end: dtend ? fromIcalDate(dtend) : undefined,
      allDay, organizer: extractProp(content, "ORGANIZER")?.replace(/mailto:/i, ""),
      attendees: attendees.length ? attendees : undefined, url: extractProp(content, "URL"),
    };
  });
  return { name: nameMatch?.[1]?.trim() ?? null, events };
};

const parseFile: BuiltinHandler = (args) => parse([readFileSync(String(args[0] ?? ""), "utf-8")]);
const writeFile: BuiltinHandler = (args) => { writeFileSync(String(args[0] ?? ""), String(args[1] ?? "")); return true; };

const addEvent: BuiltinHandler = (args) => {
  const ics = String(args[0] ?? "");
  const ev = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const eventIcs = (createCalendar([[ev]]) as string).split("BEGIN:VEVENT")[1]!.split("END:VCALENDAR")[0]!;
  return ics.replace(/END:VCALENDAR/i, `BEGIN:VEVENT${eventIcs}END:VCALENDAR`);
};

const removeEvent: BuiltinHandler = (args) => {
  const ics = String(args[0] ?? "");
  const uid = String(args[1] ?? "");
  return ics.replace(new RegExp(`BEGIN:VEVENT[\\s\\S]*?UID:${uid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?END:VEVENT\\r?\\n?`, "i"), "");
};

const findEvents: BuiltinHandler = (args) => {
  const events = (Array.isArray(args[0]) ? args[0] : []) as Record<string, unknown>[];
  const start = new Date(String(args[1] ?? "")).getTime();
  const end = new Date(String(args[2] ?? "")).getTime();
  return events.filter((e: any) => { const t = new Date(String(e.start ?? "")).getTime(); return t >= start && t <= end; });
};

const today: BuiltinHandler = (args) => {
  const events = (Array.isArray(args[0]) ? args[0] : []) as Record<string, unknown>[];
  const now = new Date(); const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
  return findEvents([events, dayStart, dayEnd]);
};

const upcoming: BuiltinHandler = (args) => {
  const events = (Array.isArray(args[0]) ? args[0] : []) as Record<string, unknown>[];
  const days = Number(args[1] ?? 7);
  const now = new Date(); const end = new Date(now.getTime() + days * 86400000);
  return findEvents([events, now.toISOString(), end.toISOString()]);
};

const toJson: BuiltinHandler = (args) => parse(args);
const formatDate: BuiltinHandler = (args) => toIcalDate(String(args[0] ?? new Date().toISOString()));
const parseDate: BuiltinHandler = (args) => fromIcalDate(String(args[0] ?? ""));

export const CalendarFunctions: Record<string, BuiltinHandler> = { createEvent, createCalendar, parse, parseFile, writeFile, addEvent, removeEvent, findEvents, today, upcoming, toJson, formatDate, parseDate };

export const CalendarFunctionMetadata = {
  createEvent: { description: "Create an iCal event object", parameters: [{ name: "options", dataType: "object", description: "{summary, description, location, start, end, allDay, organizer, attendees, url, uid}", formInputType: "text", required: true }], returnType: "object", returnDescription: "Event object", example: 'calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}' },
  createCalendar: { description: "Create iCal string from events", parameters: [{ name: "events", dataType: "array", description: "Event objects", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{name, timezone}", formInputType: "text", required: false }], returnType: "string", returnDescription: "iCal string", example: 'calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}' },
  parse: { description: "Parse iCal string", parameters: [{ name: "icsString", dataType: "string", description: "iCal content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, events[]}", example: 'calendar.parse $icsContent' },
  parseFile: { description: "Parse .ics file", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, events[]}", example: 'calendar.parseFile "./events.ics"' },
  writeFile: { description: "Write iCal to file", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "icsString", dataType: "string", description: "iCal content", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'calendar.writeFile "./events.ics" $ics' },
  addEvent: { description: "Add event to iCal string", parameters: [{ name: "icsString", dataType: "string", description: "Existing iCal", formInputType: "text", required: true }, { name: "event", dataType: "object", description: "Event object", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated iCal", example: 'calendar.addEvent $ics $event' },
  removeEvent: { description: "Remove event by UID", parameters: [{ name: "icsString", dataType: "string", description: "Existing iCal", formInputType: "text", required: true }, { name: "uid", dataType: "string", description: "Event UID", formInputType: "text", required: true }], returnType: "string", returnDescription: "Updated iCal", example: 'calendar.removeEvent $ics "abc-123"' },
  findEvents: { description: "Find events in date range", parameters: [{ name: "events", dataType: "array", description: "Event array", formInputType: "text", required: true }, { name: "start", dataType: "string", description: "Start date ISO", formInputType: "text", required: true }, { name: "end", dataType: "string", description: "End date ISO", formInputType: "text", required: true }], returnType: "array", returnDescription: "Matching events", example: 'calendar.findEvents $events "2024-01-01" "2024-01-31"' },
  today: { description: "Get today's events", parameters: [{ name: "events", dataType: "array", description: "Event array", formInputType: "text", required: true }], returnType: "array", returnDescription: "Today's events", example: 'calendar.today $events' },
  upcoming: { description: "Get upcoming events", parameters: [{ name: "events", dataType: "array", description: "Event array", formInputType: "text", required: true }, { name: "days", dataType: "number", description: "Days ahead (default 7)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Upcoming events", example: 'calendar.upcoming $events 14' },
  toJson: { description: "Convert iCal to JSON", parameters: [{ name: "icsString", dataType: "string", description: "iCal content", formInputType: "text", required: true }], returnType: "object", returnDescription: "Parsed object", example: 'calendar.toJson $ics' },
  formatDate: { description: "Format ISO to iCal date", parameters: [{ name: "isoDate", dataType: "string", description: "ISO date", formInputType: "text", required: true }], returnType: "string", returnDescription: "iCal date", example: 'calendar.formatDate "2024-01-15T10:00:00Z"' },
  parseDate: { description: "Parse iCal date to ISO", parameters: [{ name: "icalDate", dataType: "string", description: "iCal date", formInputType: "text", required: true }], returnType: "string", returnDescription: "ISO date", example: 'calendar.parseDate "20240115T100000Z"' },
};

export const CalendarModuleMetadata = {
  description: "iCal (.ics) calendar parsing, generation, event management, and date range queries",
  methods: ["createEvent", "createCalendar", "parse", "parseFile", "writeFile", "addEvent", "removeEvent", "findEvents", "today", "upcoming", "toJson", "formatDate", "parseDate"],
};
