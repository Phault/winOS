import React, { useContext } from 'react';
import { UncontrolledWindow } from './UncontrolledWindow';
import { useObserver } from 'mobx-react-lite';
import { WindowContext } from './WindowManager';
import { OSContext } from '../App';
import { Rectangle } from '../misc/Rectangle';
import { WindowInstance } from './WindowInstance';
import './WindowRenderer.scss';
import { useDimensions } from '../misc/useDimensions';

export function WindowRenderer() {
  const { windowManager } = useContext(OSContext)!;
  const [screenRef, screenSize] = useDimensions();
  
  function saveWindowRect(window: WindowInstance, rect: Rectangle) {
    window.isMaximized = false;
    window.rect = rect;
  }

  const windows = useObserver(() => {
    const fullScreenRect: Rectangle = {
      left: 0,
      top: 0,
      width: screenSize.width,
      height: screenSize.height
    };

    const windows = windowManager.windows.map((w, i) => (
      <WindowContext.Provider value={w} key={w.id}>
        <UncontrolledWindow 
          title={w.title} 
          icon={w.icon} 
          active={windowManager.focused === w}
          onActivated={() => w.focus()}
          style={{ zIndex: i, display: w.isMinimized ? 'none' : undefined }}
          {...(w.isMaximized ? fullScreenRect : w.rect)} 
          minWidth={w.template.minSize && w.template.minSize.width || 1} 
          minHeight={w.template.minSize && w.template.minSize.height || 1}
          resizable={w.isResizable}
          onResize={rect => saveWindowRect(w, rect)}
          onMove={pos => saveWindowRect(w, {...w.rect, ...pos})}>
          {w.body}
        </UncontrolledWindow>
      </WindowContext.Provider>
    ));

    return windows.sort((a, b) => (a.key as number) - (b.key as number));
  });

  return (
    <div className="window-renderer" ref={screenRef}>
      {windows}
    </div>
  );
}
