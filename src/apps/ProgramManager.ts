import { Program } from "../Program.interface";
import { decorate, computed, action, observable } from 'mobx';

class ProgramManager {
  _installed: Program[] = [];

  get installed(): ReadonlyArray<Program> {
    return this._installed;
  }

  async install(installer: () => Promise<Program>): Promise<Program> {
    const result = await installer();
    this._installed.push(result);
    return result;
  }

  uninstall() {
  }

  getInstalledForExtension(extension: string): Program[] {
    return computed(() => this._installed.filter(p => p.fileExtensions && extension in p.fileExtensions)).get();
  }
}

decorate(ProgramManager, {
  _installed: observable,
  installed: computed,
  install: action,
  uninstall: action,
});

export { ProgramManager };