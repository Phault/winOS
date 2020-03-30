import defaultIcon from '../../assets/icons/filetypes/default.png';
import folderIcon from '../../assets/icons/filetypes/folder.png';
import richTextIcon from '../../assets/icons/filetypes/rich-text.png';
import mediaIcon from '../../assets/icons/filetypes/media.png';
import compressedFolderIcon from '../../assets/icons/filetypes/folder-compressed.png';
import executableIcon from '../../assets/icons/filetypes/executable.png';
import dllIcon from '../../assets/icons/filetypes/dll.png';
import batchIcon from '../../assets/icons/filetypes/batch.png';
import configIcon from '../../assets/icons/filetypes/config.png';
import folderDocumentsIcon from '../../assets/icons/filetypes/folder-documents.png';
import folderPicturesIcon from '../../assets/icons/filetypes/folder-pictures.png';
import folderMusicIcon from '../../assets/icons/filetypes/folder-music.png';
import folderRecentIcon from '../../assets/icons/filetypes/folder-recent.png';
import folderFavoritesIcon from '../../assets/icons/filetypes/folder-favorites.png';
import * as nodePath from 'bfs-path';
import { FileInfo } from '../../widgets/folderview/FolderView';
import { FSModule } from 'browserfs/dist/node/core/FS';

export function getDefaultIcon({ path, stats }: FileInfo) {
  const ext = nodePath.extname(path);

  if (stats.isDirectory()) {
    switch (ext) {
      case '.zip':
        return compressedFolderIcon;
    }

    switch (nodePath.basename(path)) {
      case 'My Documents':
        return folderDocumentsIcon;
      case 'My Pictures':
        return folderPicturesIcon;
      case 'My Music':
        return folderMusicIcon;
      case 'Recent':
        return folderRecentIcon;
      case 'Favorites':
        return folderFavoritesIcon;
    }

    return folderIcon;
  }

  switch (ext) {
    case '.doc':
    case '.rtf':
      return richTextIcon;
    case '.mp3':
    case '.avi':
    case '.mpeg':
    case '.midi':
    case '.wmv':
    case '.asf':
    case '.mp2':
    case '.m3u':
    case '.wav':
      return mediaIcon;
    case '.exe':
      return executableIcon;
    case '.dll':
      return dllIcon;
    case '.bat':
      return batchIcon;
    case '.sys':
    case '.ini':
      return configIcon;
  }

  return defaultIcon;
}

export function createNewFolder(
  fs: FSModule,
  parentPath: string,
  folderName = 'New Folder'
) {
  const name = getNextFreeName(fs, parentPath, folderName);
  fs.mkdirSync(nodePath.join(parentPath, name));
  return name;
}

export function createNewFile(
  fs: FSModule,
  parentPath: string,
  fileName: string
) {
  const name = getNextFreeName(fs, parentPath, fileName);
  fs.writeFileSync(nodePath.join(parentPath, name), '');
  return name;
}

export function getNextFreeName(
  fs: FSModule,
  parentPath: string,
  fileName: string
) {
  const contents = new Set(fs.readdirSync(parentPath));

  if (!contents.has(fileName)) return fileName;

  const ext = nodePath.extname(fileName);
  const base = nodePath.basename(fileName, ext);

  for (let i = 2; ; i++) {
    const newName = `${base} (${i})${ext}`;

    if (!contents.has(newName)) return newName;
  }
}
