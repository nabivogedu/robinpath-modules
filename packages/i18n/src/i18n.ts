import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const translations = new Map<string, Record<string, string>>();
let defaultLocale = "en";
const rtlLocales = new Set(["ar", "he", "fa", "ur", "ps", "sd", "yi", "dv"]);

const setLocale: BuiltinHandler = (args) => { defaultLocale = String(args[0] ?? "en"); return defaultLocale; };
const getLocale: BuiltinHandler = () => defaultLocale;

const loadTranslations: BuiltinHandler = (args) => {
  const locale = String(args[0] ?? "en");
  const strings = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, string>;
  const existing = translations.get(locale) ?? {};
  translations.set(locale, { ...existing, ...strings });
  return { locale, keys: Object.keys(strings).length };
};

const t: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const locale = args[1] ? String(args[1]) : defaultLocale;
  const interp = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const strings = translations.get(locale) ?? translations.get(defaultLocale) ?? {};
  let result = strings[key] ?? key;
  for (const [k, v] of Object.entries(interp)) {
    result = result.replaceAll(`{{${k}}}`, String(v));
  }
  return result;
};

const formatNumber: BuiltinHandler = (args) => {
  const num = Number(args[0] ?? 0);
  const locale = args[1] ? String(args[1]) : defaultLocale;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Intl.NumberFormatOptions;
  return new Intl.NumberFormat(locale, opts).format(num);
};

const formatCurrency: BuiltinHandler = (args) => {
  const amount = Number(args[0] ?? 0);
  const currency = String(args[1] ?? "USD");
  const locale = args[2] ? String(args[2]) : defaultLocale;
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
};

const formatDate: BuiltinHandler = (args) => {
  const date = new Date(String(args[0] ?? new Date().toISOString()));
  const locale = args[1] ? String(args[1]) : defaultLocale;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : { dateStyle: "medium" }) as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat(locale, opts).format(date);
};

const formatRelativeTime: BuiltinHandler = (args) => {
  const value = Number(args[0] ?? 0);
  const unit = String(args[1] ?? "day") as Intl.RelativeTimeFormatUnit;
  const locale = args[2] ? String(args[2]) : defaultLocale;
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(value, unit);
};

const formatList: BuiltinHandler = (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []).map(String);
  const locale = args[1] ? String(args[1]) : defaultLocale;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : { type: "conjunction" }) as any;
  return new (Intl as any).ListFormat(locale, opts).format(items);
};

const pluralize: BuiltinHandler = (args) => {
  const count = Number(args[0] ?? 0);
  const singular = String(args[1] ?? "");
  const plural = String(args[2] ?? singular + "s");
  return count === 1 ? singular : plural;
};

const direction: BuiltinHandler = (args) => {
  const locale = String(args[0] ?? defaultLocale);
  const lang = locale.split("-")[0]!.toLowerCase();
  return rtlLocales.has(lang) ? "rtl" : "ltr";
};

const listLocales: BuiltinHandler = () => [...translations.keys()].sort();
const hasTranslation: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const locale = String(args[1] ?? defaultLocale);
  return !!(translations.get(locale)?.[key]);
};

const languageName: BuiltinHandler = (args) => {
  const locale = String(args[0] ?? "en");
  const displayLocale = args[1] ? String(args[1]) : defaultLocale;
  try { return new Intl.DisplayNames([displayLocale], { type: "language" }).of(locale) ?? locale; } catch { return locale; }
};

const regionName: BuiltinHandler = (args) => {
  const region = String(args[0] ?? "US");
  const locale = args[1] ? String(args[1]) : defaultLocale;
  try { return new Intl.DisplayNames([locale], { type: "region" }).of(region) ?? region; } catch { return region; }
};

export const I18nFunctions: Record<string, BuiltinHandler> = { setLocale, getLocale, loadTranslations, t, formatNumber, formatCurrency, formatDate, formatRelativeTime, formatList, pluralize, direction, listLocales, hasTranslation, languageName, regionName };

export const I18nFunctionMetadata = {
  setLocale: { description: "Set default locale", parameters: [{ name: "locale", dataType: "string", description: "Locale code", formInputType: "text", required: true }], returnType: "string", returnDescription: "Locale", example: 'i18n.setLocale "de-DE"' },
  getLocale: { description: "Get current locale", parameters: [], returnType: "string", returnDescription: "Current locale", example: "i18n.getLocale" },
  loadTranslations: { description: "Load translations for a locale", parameters: [{ name: "locale", dataType: "string", description: "Locale code", formInputType: "text", required: true }, { name: "strings", dataType: "object", description: "Key-value translations", formInputType: "text", required: true }], returnType: "object", returnDescription: "{locale, keys}", example: 'i18n.loadTranslations "es" {"hello": "Hola", "bye": "Adiós"}' },
  t: { description: "Translate a key", parameters: [{ name: "key", dataType: "string", description: "Translation key", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Override locale", formInputType: "text", required: false }, { name: "interpolation", dataType: "object", description: "Variables for {{var}}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Translated string", example: 'i18n.t "hello" "es"' },
  formatNumber: { description: "Format number for locale", parameters: [{ name: "number", dataType: "number", description: "Number", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "Intl.NumberFormat options", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted number", example: 'i18n.formatNumber 1234567.89 "de-DE"' },
  formatCurrency: { description: "Format currency", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "currency", dataType: "string", description: "Currency code", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted currency", example: 'i18n.formatCurrency 99.99 "EUR" "de-DE"' },
  formatDate: { description: "Format date for locale", parameters: [{ name: "date", dataType: "string", description: "ISO date string", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{dateStyle, timeStyle}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted date", example: 'i18n.formatDate "2024-01-15" "ja-JP"' },
  formatRelativeTime: { description: "Format relative time", parameters: [{ name: "value", dataType: "number", description: "Value (negative=past)", formInputType: "text", required: true }, { name: "unit", dataType: "string", description: "second|minute|hour|day|week|month|year", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }], returnType: "string", returnDescription: "Relative time string", example: 'i18n.formatRelativeTime -3 "day"' },
  formatList: { description: "Format list (A, B, and C)", parameters: [{ name: "items", dataType: "array", description: "Items", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{type: conjunction|disjunction|unit}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted list", example: 'i18n.formatList ["Alice", "Bob", "Charlie"]' },
  pluralize: { description: "Simple pluralization", parameters: [{ name: "count", dataType: "number", description: "Count", formInputType: "text", required: true }, { name: "singular", dataType: "string", description: "Singular form", formInputType: "text", required: true }, { name: "plural", dataType: "string", description: "Plural form", formInputType: "text", required: false }], returnType: "string", returnDescription: "Correct form", example: 'i18n.pluralize 5 "item" "items"' },
  direction: { description: "Get text direction for locale", parameters: [{ name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: true }], returnType: "string", returnDescription: "ltr or rtl", example: 'i18n.direction "ar"' },
  listLocales: { description: "List loaded translation locales", parameters: [], returnType: "array", returnDescription: "Locale codes", example: "i18n.listLocales" },
  hasTranslation: { description: "Check if key exists", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Locale", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if exists", example: 'i18n.hasTranslation "hello" "es"' },
  languageName: { description: "Get language display name", parameters: [{ name: "locale", dataType: "string", description: "Language locale", formInputType: "text", required: true }, { name: "displayLocale", dataType: "string", description: "Display in this locale", formInputType: "text", required: false }], returnType: "string", returnDescription: "Language name", example: 'i18n.languageName "de" "en"' },
  regionName: { description: "Get region display name", parameters: [{ name: "regionCode", dataType: "string", description: "Region code (US, GB, etc)", formInputType: "text", required: true }, { name: "locale", dataType: "string", description: "Display locale", formInputType: "text", required: false }], returnType: "string", returnDescription: "Region name", example: 'i18n.regionName "JP" "en"' },
};

export const I18nModuleMetadata = {
  description: "Internationalization: translations, number/currency/date formatting, relative time, pluralization, RTL detection",
  methods: ["setLocale", "getLocale", "loadTranslations", "t", "formatNumber", "formatCurrency", "formatDate", "formatRelativeTime", "formatList", "pluralize", "direction", "listLocales", "hasTranslation", "languageName", "regionName"],
};
