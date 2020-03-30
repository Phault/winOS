import { FSModule } from 'browserfs/dist/node/core/FS';
import { WatchableFS } from './WatchableFS';
import { FSWatcherShim } from './FSWatcherShim';

type Listener = (event: string, filename: string) => any;
type WatchOptions = {
  persistent?: boolean;
};

export function patchWatch(fs: FSModule) {
  const watchable = fs.getRootFS() as WatchableFS;
  fs.watch = function (
    filename: string,
    optionsOrListener?: WatchOptions | Listener,
    maybeListener?: Listener
  ) {
    const listener =
      typeof optionsOrListener === 'function'
        ? optionsOrListener
        : maybeListener;

    const watcher = new FSWatcherShim(filename, watchable);

    if (listener) watcher.on('any', p => listener('add', p));

    return watcher;
  };
}
