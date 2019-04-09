import { Rectangle } from '../misc/Rectangle';
import { ReactNode } from 'react';
import { WindowTemplate } from "./WindowTemplate";
import { decorate, observable, action } from 'mobx';
import { WindowManager } from './WindowManager';

class WindowInstance {
  id: Readonly<number>;
  manager: Readonly<WindowManager>;
  title: string;
  icon?: string;
  isMaximized: boolean = false;
  isMinimized: boolean = false;
  rect: Rectangle;
  body: ReactNode;
  template: Readonly<WindowTemplate>;

  constructor(id: number, manager: WindowManager, template: WindowTemplate) {
    this.id = id;
    this.manager = manager;
    this.title = template.title;
    this.icon = template.icon;
    this.rect = template.rect || {
      left: 0,
      top: 0,
      width: 1,
      height: 1
    };
    this.template = template;
    this.body = template.body(this);
  }

  focus() {
    this.manager.bringToFront(this);
  }

  destroy() {
    this.manager.destroy(this);
  }
}

decorate(WindowInstance, {
  title: observable,
  icon: observable,
  isMaximized: observable,
  isMinimized: observable,
  rect: observable,
  focus: action,
  destroy: action
});

export { WindowInstance };