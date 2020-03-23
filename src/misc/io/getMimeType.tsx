import * as nodePath from 'bfs-path';

export function getMimeType(path: string) {
  const ext = nodePath.extname(path);

  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.png':
      return 'image/png';
    case '.bmp':
      return 'image/bmp';
    case '.tif':
    case '.tiff':
      return 'image/tiff';
    default:
      throw new Error('unknown mimetype');
  }
}
