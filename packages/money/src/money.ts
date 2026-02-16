import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const currencies: Record<string, { symbol: string; name: string; decimals: number }> = {
  USD: { symbol: "$", name: "US Dollar", decimals: 2 }, EUR: { symbol: "€", name: "Euro", decimals: 2 },
  GBP: { symbol: "£", name: "British Pound", decimals: 2 }, JPY: { symbol: "¥", name: "Japanese Yen", decimals: 0 },
  CNY: { symbol: "¥", name: "Chinese Yuan", decimals: 2 }, CAD: { symbol: "C$", name: "Canadian Dollar", decimals: 2 },
  AUD: { symbol: "A$", name: "Australian Dollar", decimals: 2 }, CHF: { symbol: "Fr", name: "Swiss Franc", decimals: 2 },
  INR: { symbol: "₹", name: "Indian Rupee", decimals: 2 }, BRL: { symbol: "R$", name: "Brazilian Real", decimals: 2 },
  KRW: { symbol: "₩", name: "South Korean Won", decimals: 0 }, RUB: { symbol: "₽", name: "Russian Ruble", decimals: 2 },
  MXN: { symbol: "$", name: "Mexican Peso", decimals: 2 }, SEK: { symbol: "kr", name: "Swedish Krona", decimals: 2 },
  NOK: { symbol: "kr", name: "Norwegian Krone", decimals: 2 }, DKK: { symbol: "kr", name: "Danish Krone", decimals: 2 },
  PLN: { symbol: "zł", name: "Polish Zloty", decimals: 2 }, CZK: { symbol: "Kč", name: "Czech Koruna", decimals: 2 },
  HUF: { symbol: "Ft", name: "Hungarian Forint", decimals: 0 }, TRY: { symbol: "₺", name: "Turkish Lira", decimals: 2 },
  ZAR: { symbol: "R", name: "South African Rand", decimals: 2 }, SGD: { symbol: "S$", name: "Singapore Dollar", decimals: 2 },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar", decimals: 2 }, NZD: { symbol: "NZ$", name: "New Zealand Dollar", decimals: 2 },
  THB: { symbol: "฿", name: "Thai Baht", decimals: 2 }, TWD: { symbol: "NT$", name: "Taiwan Dollar", decimals: 0 },
  ILS: { symbol: "₪", name: "Israeli Shekel", decimals: 2 }, AED: { symbol: "د.إ", name: "UAE Dirham", decimals: 2 },
  SAR: { symbol: "﷼", name: "Saudi Riyal", decimals: 2 }, PHP: { symbol: "₱", name: "Philippine Peso", decimals: 2 },
};

function safeRound(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

const format: BuiltinHandler = (args) => {
  const amount = Number(args[0] ?? 0);
  const currency = String(args[1] ?? "USD").toUpperCase();
  const locale = String(args[2] ?? "en-US");
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    const info = currencies[currency];
    const dec = info?.decimals ?? 2;
    return `${info?.symbol ?? currency} ${amount.toFixed(dec)}`;
  }
};

const parse: BuiltinHandler = (args) => {
  const str = String(args[0] ?? "0");
  return Number(str.replace(/[^0-9.\-]/g, "")) || 0;
};

const add: BuiltinHandler = (args) => {
  const decimals = Number(args[2] ?? 2);
  const factor = 10 ** decimals;
  return Math.round(Number(args[0] ?? 0) * factor + Number(args[1] ?? 0) * factor) / factor;
};

const subtract: BuiltinHandler = (args) => {
  const decimals = Number(args[2] ?? 2);
  const factor = 10 ** decimals;
  return Math.round(Number(args[0] ?? 0) * factor - Number(args[1] ?? 0) * factor) / factor;
};

const multiply: BuiltinHandler = (args) => safeRound(Number(args[0] ?? 0) * Number(args[1] ?? 1), Number(args[2] ?? 2));
const divide: BuiltinHandler = (args) => { const d = Number(args[1] ?? 1); if (d === 0) throw new Error("Division by zero"); return safeRound(Number(args[0] ?? 0) / d, Number(args[2] ?? 2)); };
const round: BuiltinHandler = (args) => safeRound(Number(args[0] ?? 0), Number(args[1] ?? 2));

const convert: BuiltinHandler = (args) => {
  const amount = Number(args[0] ?? 0);
  const from = String(args[1] ?? "USD").toUpperCase();
  const to = String(args[2] ?? "EUR").toUpperCase();
  const rate = Number(args[3] ?? 1);
  const dec = currencies[to]?.decimals ?? 2;
  return { amount: safeRound(amount * rate, dec), currency: to, rate };
};

const fetchRate: BuiltinHandler = async (args) => {
  const from = String(args[0] ?? "USD").toUpperCase();
  const to = String(args[1] ?? "EUR").toUpperCase();
  const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await response.json() as Record<string, unknown>;
  const rates = data.rates as Record<string, number> | undefined;
  if (!rates || !rates[to]) throw new Error(`Rate not found for ${from} -> ${to}`);
  return { rate: rates[to], from, to, timestamp: data.time_last_update_utc };
};

const split: BuiltinHandler = (args) => {
  const amount = Number(args[0] ?? 0);
  const ways = Number(args[1] ?? 2);
  const decimals = Number(args[2] ?? 2);
  const factor = 10 ** decimals;
  const total = Math.round(amount * factor);
  const base = Math.floor(total / ways);
  const remainder = total - base * ways;
  const parts: number[] = [];
  for (let i = 0; i < ways; i++) parts.push((base + (i < remainder ? 1 : 0)) / factor);
  return parts;
};

const percentage: BuiltinHandler = (args) => safeRound(Number(args[0] ?? 0) * Number(args[1] ?? 0) / 100, 2);
const discount: BuiltinHandler = (args) => { const amount = Number(args[0] ?? 0); const pct = Number(args[1] ?? 0); const d = safeRound(amount * pct / 100, 2); return { original: amount, discount: d, final: safeRound(amount - d, 2) }; };
const tax: BuiltinHandler = (args) => { const amount = Number(args[0] ?? 0); const rate = Number(args[1] ?? 0); const t = safeRound(amount * rate / 100, 2); return { subtotal: amount, tax: t, total: safeRound(amount + t, 2) }; };

const currencyInfo: BuiltinHandler = (args) => {
  const code = String(args[0] ?? "USD").toUpperCase();
  const info = currencies[code];
  return info ? { ...info, code } : null;
};

const listCurrencies: BuiltinHandler = () => Object.keys(currencies).sort();
const isValidCode: BuiltinHandler = (args) => String(args[0] ?? "").toUpperCase() in currencies;

export const MoneyFunctions: Record<string, BuiltinHandler> = { format, parse, add, subtract, multiply, divide, round, convert, fetchRate, split, percentage, discount, tax, currencyInfo, listCurrencies, isValidCode };

export const MoneyFunctionMetadata: Record<string, FunctionMetadata> = {
  format: { description: "Format number as currency", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "currency", dataType: "string", description: "Currency code (default USD)", formInputType: "text", required: false }, { name: "locale", dataType: "string", description: "Locale (default en-US)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted string", example: 'money.format 1234.56 "USD"' },
  parse: { description: "Parse currency string to number", parameters: [{ name: "str", dataType: "string", description: "Currency string", formInputType: "text", required: true }], returnType: "number", returnDescription: "Numeric value", example: 'money.parse "$1,234.56"' },
  add: { description: "Safe addition", parameters: [{ name: "a", dataType: "number", description: "First value", formInputType: "text", required: true }, { name: "b", dataType: "number", description: "Second value", formInputType: "text", required: true }, { name: "decimals", dataType: "number", description: "Decimal places (default 2)", formInputType: "text", required: false }], returnType: "number", returnDescription: "Sum", example: "money.add 0.1 0.2" },
  subtract: { description: "Safe subtraction", parameters: [{ name: "a", dataType: "number", description: "First value", formInputType: "text", required: true }, { name: "b", dataType: "number", description: "Second value", formInputType: "text", required: true }, { name: "decimals", dataType: "number", description: "Decimal places", formInputType: "text", required: false }], returnType: "number", returnDescription: "Difference", example: "money.subtract 10.50 3.25" },
  multiply: { description: "Safe multiplication", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "multiplier", dataType: "number", description: "Multiplier", formInputType: "text", required: true }], returnType: "number", returnDescription: "Product", example: "money.multiply 19.99 3" },
  divide: { description: "Safe division", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "divisor", dataType: "number", description: "Divisor", formInputType: "text", required: true }], returnType: "number", returnDescription: "Quotient", example: "money.divide 100 3" },
  round: { description: "Round to currency precision", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "decimals", dataType: "number", description: "Decimal places (default 2)", formInputType: "text", required: false }], returnType: "number", returnDescription: "Rounded value", example: "money.round 10.456" },
  convert: { description: "Convert between currencies", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "from", dataType: "string", description: "Source currency", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "Target currency", formInputType: "text", required: true }, { name: "rate", dataType: "number", description: "Exchange rate", formInputType: "text", required: true }], returnType: "object", returnDescription: "{amount, currency, rate}", example: 'money.convert 100 "USD" "EUR" 0.85' },
  fetchRate: { description: "Fetch live exchange rate", parameters: [{ name: "from", dataType: "string", description: "Source currency", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "Target currency", formInputType: "text", required: true }], returnType: "object", returnDescription: "{rate, from, to, timestamp}", example: 'money.fetchRate "USD" "EUR"' },
  split: { description: "Split amount evenly", parameters: [{ name: "amount", dataType: "number", description: "Total amount", formInputType: "text", required: true }, { name: "ways", dataType: "number", description: "Number of splits", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of amounts summing to total", example: "money.split 100 3" },
  percentage: { description: "Calculate percentage", parameters: [{ name: "amount", dataType: "number", description: "Amount", formInputType: "text", required: true }, { name: "percent", dataType: "number", description: "Percentage", formInputType: "text", required: true }], returnType: "number", returnDescription: "Result", example: "money.percentage 200 15" },
  discount: { description: "Apply discount", parameters: [{ name: "amount", dataType: "number", description: "Original amount", formInputType: "text", required: true }, { name: "percent", dataType: "number", description: "Discount %", formInputType: "text", required: true }], returnType: "object", returnDescription: "{original, discount, final}", example: "money.discount 99.99 20" },
  tax: { description: "Add tax", parameters: [{ name: "amount", dataType: "number", description: "Subtotal", formInputType: "text", required: true }, { name: "rate", dataType: "number", description: "Tax rate %", formInputType: "text", required: true }], returnType: "object", returnDescription: "{subtotal, tax, total}", example: "money.tax 100 8.25" },
  currencyInfo: { description: "Get currency info", parameters: [{ name: "code", dataType: "string", description: "Currency code", formInputType: "text", required: true }], returnType: "object", returnDescription: "{symbol, name, decimals, code}", example: 'money.currencyInfo "EUR"' },
  listCurrencies: { description: "List all currency codes", parameters: [], returnType: "array", returnDescription: "Currency codes", example: "money.listCurrencies" },
  isValidCode: { description: "Check if currency code is valid", parameters: [{ name: "code", dataType: "string", description: "Currency code", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid", example: 'money.isValidCode "USD"' },
};

export const MoneyModuleMetadata: ModuleMetadata = {
  description: "Currency formatting, safe arithmetic, conversion, tax, discount, and exchange rates",
  methods: ["format", "parse", "add", "subtract", "multiply", "divide", "round", "convert", "fetchRate", "split", "percentage", "discount", "tax", "currencyInfo", "listCurrencies", "isValidCode"],
};
