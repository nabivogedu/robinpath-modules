declare module "screenshot-desktop" {
  interface ScreenshotOptions {
    format?: "png" | "jpg";
    screen?: number;
  }
  interface Display {
    id: number;
    name: string;
  }
  function screenshot(options?: ScreenshotOptions): Promise<Buffer>;
  namespace screenshot {
    function listDisplays(): Promise<Display[]>;
  }
  export = screenshot;
}
