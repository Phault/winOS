import React, { useContext } from 'react';
import UncontrolledWindow from './UncontrolledWindow';
import { WindowManagerContext } from '../App';
import { useObserver } from 'mobx-react-lite';

export function WindowRenderer() {

  const windowManager = useContext(WindowManagerContext);

  return useObserver(() =>
    <React.Fragment>
      {windowManager.windows.map(w => (
        <UncontrolledWindow 
          key={w.id} 
          title={w.title} 
          icon={w.icon} 
          {...w.rect} 
          minWidth={w.template.minSize && w.template.minSize.width || 1} 
          minHeight={w.template.minSize && w.template.minSize.height || 1}>
          {w.body}
        </UncontrolledWindow>
      ))}
    </React.Fragment>
  );
}
