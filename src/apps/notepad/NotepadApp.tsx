import React from 'react';
import icon from './assets/notepad.png';
import textIcon from './assets/text.png';
import { Program } from '../../Program.interface';
import { BFSRequire } from 'browserfs';
import { NotepadWindow } from './NotepadWindow';

export const NotepadApp: Program = {
  name: 'Notepad',
  icon,
  fileExtensions: {
    '.txt': textIcon,
  },
  run: async (os, args) => {
    const path = args || '/C:/test.txt';
    const nodePath = BFSRequire('path');
    const fileName = nodePath.basename(path);

    const windowSize = {
      width: Math.min(window.innerWidth, 300),
      height: Math.min(window.innerHeight, 200),
    };

    os.windowManager.create({
      title: `${fileName || 'Untitled'} - ${NotepadApp.name}`,
      icon: NotepadApp.icon,
      rect: {
        left: Math.max(0, window.innerWidth * 0.2 - windowSize.width / 2),
        top: Math.max(0, window.innerHeight * 0.3 - windowSize.height / 2),
        ...windowSize,
      },
      minSize: {
        width: 120,
        height: 100,
      },
      body: <NotepadWindow path={path} />,
    });
  },
};
