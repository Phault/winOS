import { decorate, observable, action, computed } from 'mobx';
import React from 'react';
import { WindowInstance } from './WindowInstance';
import { WindowTemplate } from './WindowTemplate';

export const WindowContext = React.createContext<WindowInstance | null>(null);

class WindowManager {
  windows: WindowInstance[] = [];

  private idToWindowMap = new Map<number, WindowInstance>();

  private nextId = 0;

  public get focused() {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      const window = this.windows[i];

      if (!window.isMinimized) return window;
    }

    return null;
  }

  public create(template: WindowTemplate): WindowInstance {
    const id = this.getNextId();
    const instance = new WindowInstance(id, this, template);
    this.windows.push(instance);
    this.idToWindowMap.set(id, instance);

    return instance;
  }

  public destroy(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.idToWindowMap.delete(window!.id);
  }

  public minimize(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);

    if (window!.isMinimized) return;

    window!.isMinimized = true;
    this.sendBackwards(window!);
  }

  public restore(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);

    if (!window!.isMinimized) return;

    window!.isMinimized = false;
    this.bringToFront(instanceOrId);
  }

  public bringToFront(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.windows.push(window!);
  }

  public bringForwards(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    const targetIndex = Math.min(this.windows.length - 1, currentIndex + 1);
    this.windows[currentIndex] = this.windows[targetIndex];
    this.windows[targetIndex] = window!;
  }

  public sendToBack(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.windows.unshift(window!);
  }

  public sendBackwards(instanceOrId: WindowInstance | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    const targetIndex = Math.max(0, currentIndex - 1);
    this.windows[currentIndex] = this.windows[targetIndex];
    this.windows[targetIndex] = window!;
  }

  private getNextId() {
    return this.nextId++;
  }

  private getWindow(instanceOrId: WindowInstance | number) {
    return instanceOrId instanceof WindowInstance
      ? instanceOrId
      : this.idToWindowMap.get(instanceOrId);
  }
}

decorate(WindowManager, {
  windows: observable,
  focused: computed,
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
