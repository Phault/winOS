import React from 'react';
import icon from './assets/icon.png';
import { Program } from '../../Program.interface';
import { Minesweeper } from './Minesweeper';

export const MinesweeperApp: Program = async function () {
  const windowSize = {
    width: Math.min(window.innerWidth, 300),
    height: Math.min(window.innerHeight, 200),
  };

  this.os.windowManager.create({
    title: MinesweeperApp.metadata.name,
    icon: MinesweeperApp.metadata.icon,
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
};

MinesweeperApp.metadata = {
  name: 'Minesweeper',
  icon,
};
