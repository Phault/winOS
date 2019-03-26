import { Program } from "./apps/framework/Program.interface";
export class AppStore {
  getInstalledApps(): Program[] {
    return [];
  }
  async install(path: string): Promise<Program> {
    const result = await import(path);
    return result as Program;
  }
  uninstall(app: Program) {
  }
}
