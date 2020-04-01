import React from 'react';
import icon from './assets/icon.png';
import { Program } from '../../Program.interface';
import { Minesweeper } from './Minesweeper';

export const MinesweeperApp: Program = {
  name: 'Minesweeper',
  icon,
  run: async (os, args) => {
    const windowSize = {
      width: Math.min(window.innerWidth, 300),
      height: Math.min(window.innerHeight, 200),
    };

    os.windowManager.create({
      title: MinesweeperApp.name,
      icon: MinesweeperApp.icon,
      rect: {
        left: Math.max(0, window.innerWidth * 0.2 - windowSize.width / 2),
        top: Math.max(0, window.innerHeight * 0.3 - windowSize.height / 2),
        ...windowSize,
      },
      minSize: {
        width: 120,
        height: 100,
      },
      isResizable: false,
      body: <Minesweeper />,
    });
  },
};
