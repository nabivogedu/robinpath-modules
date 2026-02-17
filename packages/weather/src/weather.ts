import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Weather: "${key}" not configured. Call weather.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.openweathermap.org/data/2.5${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Weather API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("weather.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Weather credentials configured.";
};

const getCurrentWeather: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCurrentWeather/${id}` : `/getCurrentWeather`);
};

const getForecast: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getForecast/${id}` : `/getForecast`);
};

const get5DayForecast: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/get5DayForecast/${id}` : `/get5DayForecast`);
};

const getHourlyForecast: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getHourlyForecast/${id}` : `/getHourlyForecast`);
};

const getAirQuality: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAirQuality/${id}` : `/getAirQuality`);
};

const getUVIndex: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUVIndex/${id}` : `/getUVIndex`);
};

const getWeatherByZip: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWeatherByZip/${id}` : `/getWeatherByZip`);
};

const getHistoricalWeather: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getHistoricalWeather/${id}` : `/getHistoricalWeather`);
};

const getWeatherAlerts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWeatherAlerts/${id}` : `/getWeatherAlerts`);
};

const geocodeCity: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/geocodeCity${id ? `/${id}` : ""}`);
};

const reverseGeocode: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/reverseGeocode/${id}` : `/reverseGeocode`);
};

const getWeatherMap: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWeatherMap/${id}` : `/getWeatherMap`);
};

export const WeatherFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getCurrentWeather, getForecast, get5DayForecast, getHourlyForecast, getAirQuality, getUVIndex, getWeatherByZip, getHistoricalWeather, getWeatherAlerts, geocodeCity, reverseGeocode, getWeatherMap,
};

export const WeatherFunctionMetadata = {
  setCredentials: { description: "Configure weather credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getCurrentWeather: { description: "getCurrentWeather", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getForecast: { description: "getForecast", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  get5DayForecast: { description: "get5DayForecast", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHourlyForecast: { description: "getHourlyForecast", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAirQuality: { description: "getAirQuality", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUVIndex: { description: "getUVIndex", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWeatherByZip: { description: "getWeatherByZip", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHistoricalWeather: { description: "getHistoricalWeather", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWeatherAlerts: { description: "getWeatherAlerts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  geocodeCity: { description: "geocodeCity", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  reverseGeocode: { description: "reverseGeocode", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWeatherMap: { description: "getWeatherMap", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const WeatherModuleMetadata = {
  description: "Weather data via OpenWeatherMap — current conditions, forecasts, and alerts.",
  methods: Object.keys(WeatherFunctions),
  category: "utility",
};
