import { Rectangle } from '../misc/Rectangle';
import { ReactNode } from 'react';
import { WindowTemplate } from './WindowTemplate';
import { observable, action } from 'mobx';
import { WindowManager } from './WindowManager';

export class MetaWindow {
  id: Readonly<number>;
  manager: Readonly<WindowManager>;
  @observable title: string;
  @observable icon?: string;
  @observable isMaximized: boolean = false;
  @observable isMinimized: boolean = false;
  @observable isResizable: boolean = true;
  @observable rect: Rectangle;
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
      height: 1,
    };
    this.isResizable =
      template.isResizable !== undefined ? template.isResizable : true;
    this.template = template;
    this.body = template.body(this);
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
