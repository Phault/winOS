import React, { useContext } from 'react';
import UncontrolledWindow from './UncontrolledWindow';
import { WindowManagerContext, WindowState } from '../App';
import { useObserver } from 'mobx-react-lite';
import { WindowContext } from './WindowManager';

export function WindowRenderer() {

  const windowManager = useContext(WindowManagerContext);

  const windows = useObserver(() => {
    const windows = windowManager.windows.map((w, i) => (
      <WindowContext.Provider value={w} key={w.id}>
        <UncontrolledWindow 
          title={w.title} 
          icon={w.icon} 
          active={windowManager.focused === w}
          onActivated={() => windowManager.bringToFront(w)}
          style={{ zIndex: i, display: w.state === WindowState.Minimized ? 'none' : undefined }}
          {...w.rect} 
          minWidth={w.template.minSize && w.template.minSize.width || 1} 
          minHeight={w.template.minSize && w.template.minSize.height || 1}>
          {w.body}
        </UncontrolledWindow>
      </WindowContext.Provider>
    ));

    return windows.sort((a, b) => (a.key as number) - (b.key as number));
  });

  return (
    <React.Fragment>
      {windows}
    </React.Fragment>
  );
}
