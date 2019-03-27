import React, { useContext } from 'react';
import UncontrolledWindow from './UncontrolledWindow';
import { WindowManagerContext, WindowState } from '../App';
import { useObserver } from 'mobx-react-lite';
import { WindowContext } from './WindowManager';

export function WindowRenderer() {

  const windowManager = useContext(WindowManagerContext);

  return useObserver(() =>
    <React.Fragment>
      {windowManager.windows.filter(w => w.state !== WindowState.Minimized).map(w => (
        <WindowContext.Provider value={w} key={w.id}>
          <UncontrolledWindow 
            title={w.title} 
            icon={w.icon} 
            active={windowManager.focused === w}
            onActivated={() => windowManager.bringToFront(w)}
            {...w.rect} 
            minWidth={w.template.minSize && w.template.minSize.width || 1} 
            minHeight={w.template.minSize && w.template.minSize.height || 1}>
            {w.body}
          </UncontrolledWindow>
        </WindowContext.Provider>
      ))}
    </React.Fragment>
  );
}
