import { Program } from "../Program.interface";
import { decorate, computed, action, observable } from 'mobx';
import { FileInfo } from "../widgets/folderview/FolderView";
import * as nodePath from 'bfs-path';
import { getDefaultIcon } from "../misc/io/fileUtils";

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

  getFileIcon(file: FileInfo) {
      const ext = nodePath.extname(file.path);
      const programs = this.getInstalledForExtension(ext);

      if (programs.length > 0)
        return programs[0].fileExtensions![ext] || getDefaultIcon(file);

      return getDefaultIcon(file);
  }
}

decorate(ProgramManager, {
  _installed: observable,
  installed: computed,
  install: action,
  uninstall: action,
});

export { ProgramManager };