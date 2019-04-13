import { FSModule } from 'browserfs/dist/node/core/FS';
import * as nodePath from 'bfs-path';

type FolderTemplate = {[key: string]: FolderTemplate | string};

const DefaultFiles: FolderTemplate = {
  'Documents and Settings': {
    'Administrator': {
      'Desktop': {
        'Hello World.txt': 'How ya doing?'
      },
      'My Documents': {
        'Downloads': {},
        'My Pictures': {},
        'My Music': {
          'My Playlists': {},
          'Sample Music': {}
        }
      },
      'Recent': {},
      'Start Menu': {},
      'Favorites': {}
    }
  },
  'Program Files': {

  }
}

export function createFiles(fileSystem: FSModule, path: string, template: FolderTemplate) {
  for (const fileName in template) {
    const fullPath = nodePath.join(path, fileName);
    const contents = template[fileName];

    if (typeof contents === 'object') {
      try {
        fileSystem.mkdirSync(fullPath);
      } catch {}
      createFiles(fileSystem, fullPath, contents);
    }
    else {
      try {
        fileSystem.writeFileSync(fullPath, contents);
      } catch {}
    }
  }
}

export function installOS(fileSystem: FSModule) {
  createFiles(fileSystem, '/', DefaultFiles);
}