import { EventEmitter } from 'events';
import { WatchEventType, WatchableFS } from './WatchableFS';
import { FSWatcher } from 'fs';
import * as nodePath from 'bfs-path';
import Stats from 'browserfs/dist/node/core/node_fs_stats';

interface FSWatcherOptions {
  persistent?: boolean;
  recursive?: boolean;
}

export class FSWatcherShim extends EventEmitter implements FSWatcher {
  path: string;
  stats: Stats;

  constructor(path: string, private fileSystem: WatchableFS) {
    super();

    this.path = nodePath.normalize(path);
    this.stats = fileSystem.statSync(this.path, false);

    fileSystem.on('any', this.fsListener);
  }

  close() {
    this.fileSystem.off('any', this.fsListener);
    this.emit('close');
    this.removeAllListeners();
  }

  private fsListener = (type: WatchEventType, path: string) => {
    if (this.coversPath(path)) {
      this.emit(type, type, path);
      this.emit('any', type, path);
    }
  };

  private coversPath(path: string): boolean {
    if (this.stats.isDirectory()) {
      // todo: handle end separator
      // todo: support limiting recursiveness
      // todo: also make sure it is not just a sibling with same name but with a suffix
      return (
        path.startsWith(this.path) &&
        !path.includes(nodePath.sep, this.path.length + 1)
      );
    }

    return this.path === path;
  }
}
