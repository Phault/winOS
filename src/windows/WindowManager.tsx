import { WindowState, WindowManagerContext } from '../App';
import { EventEmitter } from 'events';
import { Rectangle } from '../misc/Rectangle';
import { Size } from '../misc/Size';
import { Position } from '../misc/Position';
import { ReactNode, useContext } from 'react';
import { useObservable } from 'mobx-react-lite';
import { decorate, observable, action } from 'mobx';

class WindowInstance {
  id: Readonly<number>;
  
  title: string;
  icon?: string;
  state: WindowState;
  rect: Rectangle;
  body: ReactNode;

  template: Readonly<WindowTemplate>;

  constructor(id: number, template: WindowTemplate) {
    this.id = id;
    this.title = template.title;
    this.icon = template.icon;
    this.state = WindowState.Normal;
    this.rect = template.rect || {
      left: 0,
      top: 0,
      width: 1,
      height: 1
    };
    this.body = template.body;

    this.template = template;
  }
}

interface WindowTemplate {
  title: string;
  icon?: string;
  
  parentId?: number;
  
  rect?: Rectangle;
  minSize?: Size;
  maxSize?: Size;
  
  body: ReactNode;
}

class WindowManager {
  windows: WindowInstance[] = [];
  
  private idToWindowMap = new Map<number, WindowInstance>();

  private nextId = 0;

  public create(template: WindowTemplate): WindowInstance {
    const id = this.getNextId();
    const instance = new WindowInstance(id, template);
    this.windows.push(instance);
    this.idToWindowMap.set(id, instance);
    return instance;
  }

  public destroy(windowId: number) {
    // remove from windows...
    this.idToWindowMap.delete(windowId);
  }

  public minimize(windowId: number) {
  }

  public restore(windowId: number) { 
  }

  public bringToFront(windowId: number) {

  }

  public bringForwards(windowId: number) {
    
  }

  public sendToBack(windowId: number) {
  }

  public sendBackwards(windowId: number) {
  }

  private getNextId() {
    return this.nextId++;
  }
}

decorate(WindowManager, {
  windows: observable,
  create: action,
  destroy: action,
  minimize: action,
  restore: action,
  bringToFront: action,
  bringForwards: action,
  sendToBack: action,
  sendBackwards: action,
});

export { WindowManager };

// const WindowManagerTest: React.FC<{}> = ({children}) => {

//   const data = useObservable(new WindowManager());

//   return (
//     <WindowManagerContext.Provider value={data}>
//       {children}
//     </WindowManagerContext.Provider>
//   );
// }

// function WindowManagerRenderer() {

// }