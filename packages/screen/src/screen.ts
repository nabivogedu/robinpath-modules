import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { writeFileSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";
import { execSync } from "node:child_process";

// Dynamic import for tesseract.js OCR
async function getWorker(): Promise<any> {
  const mod = await import("tesseract.js");
  const createWorker = (mod as any).createWorker || (mod as any).default?.createWorker;
  return createWorker;
}

// PowerShell-based screenshot (no native deps needed)
function psCapture(filePath: string): void {
  const psPath = filePath.replace(/\\/g, "\\\\").replace(/'/g, "''");
  const psScript = `Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $s = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; $b = New-Object System.Drawing.Bitmap($s.Width,$s.Height); $g = [System.Drawing.Graphics]::FromImage($b); $g.CopyFromScreen(0,0,0,0,$s.Size); $b.Save('${psPath}'); $g.Dispose(); $b.Dispose()`;
  execSync(`powershell -NoProfile -Command "${psScript}"`, { windowsHide: true });
}

// State
let ocrLanguage = "eng";

// ─── 1. capture ──────────────────────────────────────────────────────────────
const capture: BuiltinHandler = (args) => {
  const filePath = resolve(String(args[0] ?? "screenshot.png"));
  psCapture(filePath);
  const stat = statSync(filePath);
  return { path: filePath, size: stat.size };
};

// ─── 2. captureRegion ────────────────────────────────────────────────────────
const captureRegion: BuiltinHandler = async (args) => {
  const filePath = resolve(String(args[0] ?? "region.png"));
  const x = Number(args[1] ?? 0);
  const y = Number(args[2] ?? 0);
  const width = Number(args[3] ?? 300);
  const height = Number(args[4] ?? 300);

  // Escape backslashes for PowerShell string
  const psPath = filePath.replace(/'/g, "''");

  const psScript = [
    "Add-Type -AssemblyName System.Windows.Forms",
    "Add-Type -AssemblyName System.Drawing",
    `$b = New-Object System.Drawing.Bitmap(${width},${height})`,
    "$g = [System.Drawing.Graphics]::FromImage($b)",
    `$g.CopyFromScreen(${x},${y},0,0,[System.Drawing.Size]::new(${width},${height}))`,
    `$b.Save('${psPath}')`,
    "$g.Dispose()",
    "$b.Dispose()",
  ].join("; ");

  execSync(`powershell -Command "${psScript}"`, { windowsHide: true });

  const stat = statSync(filePath);
  return { path: filePath, size: stat.size, region: { x, y, width, height } };
};

// ─── 3. captureWindow ────────────────────────────────────────────────────────
const captureWindow: BuiltinHandler = async (args) => {
  const filePath = resolve(String(args[0] ?? "window.png"));
  const windowTitle = String(args[1] ?? "");

  const psPath = filePath.replace(/'/g, "''");
  const psTitle = windowTitle.replace(/'/g, "''");

  const psScript = `
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class WinAPI {
  [DllImport("user32.dll")] public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
}
'@
$hwnd = [WinAPI]::FindWindow([NullString]::Value, '${psTitle}')
if ($hwnd -eq [IntPtr]::Zero) {
  $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
  $b = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
  $g = [System.Drawing.Graphics]::FromImage($b)
  $g.CopyFromScreen(0, 0, 0, 0, $screen.Size)
  $b.Save('${psPath}')
  $g.Dispose()
  $b.Dispose()
  Write-Output "FALLBACK"
} else {
  $rect = New-Object WinAPI+RECT
  [WinAPI]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
  $w = $rect.Right - $rect.Left
  $h = $rect.Bottom - $rect.Top
  $b = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($b)
  $g.CopyFromScreen($rect.Left, $rect.Top, 0, 0, [System.Drawing.Size]::new($w, $h))
  $b.Save('${psPath}')
  $g.Dispose()
  $b.Dispose()
  Write-Output "OK"
}
`.trim().replace(/\r?\n/g, "\n");

  let result: string;
  try {
    result = execSync(`powershell -NoProfile -Command "${psScript.replace(/"/g, '\\"')}"`, {
      windowsHide: true,
      encoding: "utf-8",
    }).trim();
  } catch {
    // Fallback: full screen capture via PowerShell
    psCapture(filePath);
    result = "FALLBACK";
  }

  const stat = statSync(filePath);
  return {
    path: filePath,
    size: stat.size,
    window: windowTitle,
    fallback: result === "FALLBACK",
  };
};

// ─── 4. ocr ──────────────────────────────────────────────────────────────────
const ocr: BuiltinHandler = async (args) => {
  const imagePath = resolve(String(args[0] ?? ""));
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const language = String(opts.language ?? ocrLanguage);

  if (!existsSync(imagePath)) {
    return { error: `File not found: ${imagePath}` };
  }

  const createWorker = await getWorker();
  const worker = await createWorker(language);

  try {
    const { data } = await worker.recognize(imagePath);
    return {
      text: data.text,
      confidence: data.confidence,
      language,
    };
  } finally {
    await worker.terminate();
  }
};

// ─── 5. ocrRegion ────────────────────────────────────────────────────────────
const ocrRegion: BuiltinHandler = async (args) => {
  const imagePath = resolve(String(args[0] ?? ""));
  const x = Number(args[1] ?? 0);
  const y = Number(args[2] ?? 0);
  const width = Number(args[3] ?? 100);
  const height = Number(args[4] ?? 100);
  const opts = (typeof args[5] === "object" && args[5] !== null ? args[5] : {}) as Record<string, unknown>;
  const language = String(opts.language ?? ocrLanguage);

  if (!existsSync(imagePath)) {
    return { error: `File not found: ${imagePath}` };
  }

  const createWorker = await getWorker();
  const worker = await createWorker(language);

  try {
    const { data } = await worker.recognize(imagePath, {
      rectangle: { top: y, left: x, width, height },
    } as any);
    return {
      text: data.text,
      confidence: data.confidence,
      region: { x, y, width, height },
    };
  } finally {
    await worker.terminate();
  }
};

// ─── 6. setLanguage ──────────────────────────────────────────────────────────
const setLanguage: BuiltinHandler = (args) => {
  const language = String(args[0] ?? "eng");
  const previous = ocrLanguage;
  ocrLanguage = language;
  return { language, previous };
};

// ─── 7. listDisplays ────────────────────────────────────────────────────────
const listDisplays: BuiltinHandler = async (_args) => {
  try {
    const output = execSync(
      'powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens | ForEach-Object { $_ | Select-Object DeviceName, @{N=\\"Width\\";E={$_.Bounds.Width}}, @{N=\\"Height\\";E={$_.Bounds.Height}}, Primary } | ConvertTo-Json"',
      { windowsHide: true, encoding: "utf-8" },
    );
    const parsed = JSON.parse(output);
    const displays = Array.isArray(parsed) ? parsed : [parsed];
    return displays.map((d: any, i: number) => ({
      id: i,
      name: d.DeviceName ?? `Display ${i}`,
      width: d.Width ?? 0,
      height: d.Height ?? 0,
      primary: d.Primary ?? false,
    }));
  } catch {
    return { error: "Unable to list displays" };
  }
};

// ─── 8. compare ──────────────────────────────────────────────────────────────
const compare: BuiltinHandler = async (args) => {
  const image1Path = resolve(String(args[0] ?? ""));
  const image2Path = resolve(String(args[1] ?? ""));

  if (!existsSync(image1Path)) return { error: `File not found: ${image1Path}` };
  if (!existsSync(image2Path)) return { error: `File not found: ${image2Path}` };

  const buf1 = readFileSync(image1Path);
  const buf2 = readFileSync(image2Path);

  const size1 = buf1.length;
  const size2 = buf2.length;
  const sameSize = size1 === size2;
  let identical = false;

  if (sameSize) {
    identical = buf1.equals(buf2);
  }

  return {
    identical,
    image1Size: size1,
    image2Size: size2,
    sameSize,
  };
};

// ─── Exports ─────────────────────────────────────────────────────────────────
export const ScreenFunctions: Record<string, BuiltinHandler> = {
  capture,
  captureRegion,
  captureWindow,
  ocr,
  ocrRegion,
  setLanguage,
  listDisplays,
  compare,
};

export const ScreenFunctionMetadata: Record<string, FunctionMetadata> = {
  capture: {
    description: "Take a full screenshot and save to file",
    parameters: [
      { name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{format?: 'png'|'jpg'}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{path, size}",
    example: 'screen.capture "./screenshot.png"',
  },
  captureRegion: {
    description: "Capture a specific rectangular region of the screen",
    parameters: [
      { name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true },
      { name: "x", dataType: "number", description: "Left position in pixels", formInputType: "text", required: true },
      { name: "y", dataType: "number", description: "Top position in pixels", formInputType: "text", required: true },
      { name: "width", dataType: "number", description: "Region width in pixels", formInputType: "text", required: true },
      { name: "height", dataType: "number", description: "Region height in pixels", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{path, size, region: {x, y, width, height}}",
    example: 'screen.captureRegion "./region.png" 100 100 400 300',
  },
  captureWindow: {
    description: "Capture a specific window by its title (falls back to full screen if not found)",
    parameters: [
      { name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true },
      { name: "windowTitle", dataType: "string", description: "Exact window title to capture", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{path, size, window, fallback}",
    example: 'screen.captureWindow "./notepad.png" "Untitled - Notepad"',
  },
  ocr: {
    description: "Extract text from an image using OCR (tesseract.js)",
    parameters: [
      { name: "imagePath", dataType: "string", description: "Path to the image file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{language?: string} e.g. 'eng', 'rus', 'deu'", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{text, confidence, language}",
    example: 'screen.ocr "./screenshot.png"',
  },
  ocrRegion: {
    description: "Extract text from a rectangular region of an image",
    parameters: [
      { name: "imagePath", dataType: "string", description: "Path to the image file", formInputType: "text", required: true },
      { name: "x", dataType: "number", description: "Left position in pixels", formInputType: "text", required: true },
      { name: "y", dataType: "number", description: "Top position in pixels", formInputType: "text", required: true },
      { name: "width", dataType: "number", description: "Region width in pixels", formInputType: "text", required: true },
      { name: "height", dataType: "number", description: "Region height in pixels", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{language?: string}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{text, confidence, region: {x, y, width, height}}",
    example: 'screen.ocrRegion "./screenshot.png" 50 50 200 100',
  },
  setLanguage: {
    description: "Set the default OCR language (eng, rus, deu, fra, spa, chi_sim, jpn, kor, ron, etc.)",
    parameters: [
      { name: "language", dataType: "string", description: "Tesseract language code", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{language, previous}",
    example: 'screen.setLanguage "deu"',
  },
  listDisplays: {
    description: "List all available displays/monitors",
    parameters: [],
    returnType: "object",
    returnDescription: "Array of {id, name, width, height, primary}",
    example: "screen.listDisplays",
  },
  compare: {
    description: "Compare two images byte-by-byte to check if they are identical",
    parameters: [
      { name: "image1Path", dataType: "string", description: "Path to first image", formInputType: "text", required: true },
      { name: "image2Path", dataType: "string", description: "Path to second image", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{identical, image1Size, image2Size, sameSize}",
    example: 'screen.compare "./before.png" "./after.png"',
  },
};

export const ScreenModuleMetadata: ModuleMetadata = {
  description: "Screen capture and OCR: take screenshots (full, region, window), extract text from images with tesseract.js, list displays, and compare images",
  methods: ["capture", "captureRegion", "captureWindow", "ocr", "ocrRegion", "setLanguage", "listDisplays", "compare"],
};
