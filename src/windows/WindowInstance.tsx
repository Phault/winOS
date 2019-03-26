import { WindowState } from '../App';
import { Rectangle } from '../misc/Rectangle';
import { ReactNode } from 'react';
import { WindowTemplate } from "./WindowTemplate";
import { decorate, observable } from 'mobx';

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
    this.template = template;
    this.body = template.body(this);
  }
}

decorate(WindowInstance, {
  title: observable,
  icon: observable,
  state: observable,
  rect: observable
});

export { WindowInstance };