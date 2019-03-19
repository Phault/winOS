import { WinApp } from "./apps/framework/WinApp";
export class AppStore {
  getInstalledApps(): WinApp[] {
    return [];
  }
  async install(path: string): Promise<WinApp> {
    const result = await import(path);
    return result as WinApp;
  }
  uninstall(app: WinApp) {
  }
}
