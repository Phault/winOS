import { BFSRequire } from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { WatchableFS } from './WatchableFS';
import { patchWatch } from './patchWatch';
import * as BrowserFS from 'browserfs';

BrowserFS.registerFileSystem(WatchableFS.Name, WatchableFS);

export function loadFileSystem(): Promise<FSModule> {
  return new Promise<FSModule>((resolve, reject) => {
    BrowserFS.configure(
      {
        fs: 'WatchableFS',
        options: {
          wrapped: {
            fs: 'MountableFileSystem',
            options: {
              '/C:': {
                fs: 'OverlayFS',
                options: {
                  readable: {
                    fs: 'XmlHttpRequest',
                    options: {
                      baseUrl: process.env.PUBLIC_URL + '/fs/',
                      index: process.env.PUBLIC_URL + '/filesystem.json',
                    },
                  },
                  writable: {
                    fs: 'LocalStorage',
                    options: {},
                  },
                },
              },
            },
          },
        },
      },
      e => {
        if (e) reject(e);

        const fs = BFSRequire('fs');
        patchWatch(fs);
        resolve(fs);
      }
    );
  });
}
