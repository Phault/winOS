import { Program } from '../Program.interface';
import { computed, action, observable, runInAction } from 'mobx';
import { FileInfo } from '../widgets/folderview/FolderView';
import * as nodePath from 'bfs-path';
import { getDefaultIcon } from '../misc/io/fileUtils';

export class ProgramManager {
  @observable _installed: Program[] = [];

  @computed
  get installed(): ReadonlyArray<Program> {
    return this._installed;
  }

  @action
  async install(installer: () => Promise<Program>): Promise<Program> {
    const result = await installer();
    runInAction(() => {
      this._installed.push(result);
    });
    return result;
  }

  @action
  uninstall() {}

  getInstalledForExtension(extension: string): Program[] {
    return computed(() =>
      this._installed.filter(
        p => p.fileExtensions && extension in p.fileExtensions
      )
    ).get();
  }

  getFileIcon(file: FileInfo) {
    const ext = nodePath.extname(file.path);
    const programs = this.getInstalledForExtension(ext);

    if (programs.length > 0)
      return programs[0].fileExtensions![ext] || getDefaultIcon(file);

    return getDefaultIcon(file);
  }
}
