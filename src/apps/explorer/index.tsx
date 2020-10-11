import React from 'react';
import { Program } from '../../Program.interface';
import { Explorer } from './Explorer';
import icon from './icon.png';

export const ExplorerApp: Program = async function ExplorerApp(args) {
  const [initialDir = '/'] = args;

  const windowSize = {
    width: Math.min(window.innerWidth, 600),
    height: Math.min(window.innerHeight, 400),
  };

  this.os.windowManager.create({
    title: ExplorerApp.name,
    icon,
    rect: {
      left: (window.innerWidth - windowSize.width) / 2,
      top: (window.innerHeight - windowSize.height) / 2,
      ...windowSize,
    },
    minSize: {
      width: 120,
      height: 100,
    },
    body: <Explorer initialDir={initialDir} />,
  });
};

ExplorerApp.metadata = {
  name: 'File Explorer',
  icon,
};
