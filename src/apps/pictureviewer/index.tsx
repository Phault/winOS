import React from 'react';
import { Program } from '../../Program.interface';
import { PictureViewer } from './PictureViewer';
import * as filetypes from './assets/filetypes';
import icon from './icon.png';

export const PictureViewerApp: Program = async function (args) {
  const [initialPath] = args;

  this.os.windowManager.create({
    title: PictureViewerApp.metadata.name,
    icon: PictureViewerApp.metadata.icon,
    rect: {
      left: 100,
      top: 100,
      width: 500,
      height: 400,
    },
    minSize: {
      width: 100,
      height: 100,
    },
    body: <PictureViewer initialPath={initialPath} />,
  });
};

PictureViewerApp.metadata = {
  name: 'Windows Picture and Fax Viewer',
  icon,
  hidden: true,
  fileExtensions: {
    '.png': filetypes.image,
    '.jpg': filetypes.picture,
    '.jpeg': filetypes.picture,
    '.bmp': filetypes.bitmap,
    '.tiff': filetypes.fax,
    '.tif': filetypes.fax,
    '.gif': filetypes.fax,
  },
};
