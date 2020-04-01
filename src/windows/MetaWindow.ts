import { Rectangle } from '../misc/Rectangle';
import { ReactNode } from 'react';
import { WindowTemplate } from './WindowTemplate';
import { observable, action } from 'mobx';
import { WindowManager } from './WindowManager';
import { Size } from '../misc/Size';

export class MetaWindow {
  id: Readonly<number>;
  manager: Readonly<WindowManager>;
  @observable title: string = 'Untitled';
  @observable icon?: string;
  @observable isMaximized: boolean = false;
  @observable isMinimized: boolean = false;
  @observable isResizable: boolean = true;
  @observable rect: Rectangle = { left: 0, top: 0, width: 1, height: 1 };
  @observable minSize: Size = { width: 1, height: 1 };
  @observable maxSize: Size = {
    width: Number.POSITIVE_INFINITY,
    height: Number.POSITIVE_INFINITY,
  };
  @observable body: ReactNode;

  constructor(id: number, manager: WindowManager, template?: WindowTemplate) {
    this.id = id;
    this.manager = manager;

    if (template) Object.assign(this, template);
  }

  @action
  focus() {
    this.manager.bringToFront(this);
  }

  @action
  destroy() {
    this.manager.destroy(this);
  }
}
