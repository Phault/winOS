import React from 'react';
import UncontrolledWindow from './UncontrolledWindow';
import { WindowManager } from './WindowManager';
export function WindowRenderer({ windowManager }: {
  windowManager: WindowManager;
}) {
  return (
    <React.Fragment>
      {Array.from(windowManager.getWindows()).map(([id, w]) => (
        <UncontrolledWindow key={id} title={w.title} icon={w.icon} {...w.rect} minWidth={w.minSize.width} minHeight={w.minSize.height}>
          {w.body}
        </UncontrolledWindow>
      ))}
    </React.Fragment>
  );
}
