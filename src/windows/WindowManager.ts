import { observable, action, computed } from 'mobx';
import React from 'react';
import { MetaWindow } from './MetaWindow';
import { WindowTemplate } from './WindowTemplate';

export const WindowContext = React.createContext<MetaWindow | null>(null);

export class WindowManager {
  @observable windows: MetaWindow[] = [];

  private idToWindowMap = new Map<number, MetaWindow>();

  private nextId = 0;

  @computed
  public get focused() {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      const window = this.windows[i];

      if (!window.isMinimized) return window;
    }

    return null;
  }

  @action
  public create(template: WindowTemplate): MetaWindow {
    const id = this.getNextId();
    const instance = new MetaWindow(id, this, template);
    this.windows.push(instance);
    this.idToWindowMap.set(id, instance);

    return instance;
  }

  @action
  public destroy(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.idToWindowMap.delete(window!.id);
  }

  @action
  public minimize(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);

    if (window!.isMinimized) return;

    window!.isMinimized = true;
    this.sendBackwards(window!);
  }

  @action
  public restore(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);

    if (!window!.isMinimized) return;

    window!.isMinimized = false;
    this.bringToFront(instanceOrId);
  }

  @action
  public bringToFront(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.windows.push(window!);
  }

  @action
  public bringForwards(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    const targetIndex = Math.min(this.windows.length - 1, currentIndex + 1);
    this.windows[currentIndex] = this.windows[targetIndex];
    this.windows[targetIndex] = window!;
  }

  @action
  public sendToBack(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    this.windows.splice(currentIndex, 1);
    this.windows.unshift(window!);
  }

  @action
  public sendBackwards(instanceOrId: MetaWindow | number) {
    const window = this.getWindow(instanceOrId);
    const currentIndex = this.windows.indexOf(window!);
    const targetIndex = Math.max(0, currentIndex - 1);
    this.windows[currentIndex] = this.windows[targetIndex];
    this.windows[targetIndex] = window!;
  }

  private getNextId() {
    return this.nextId++;
  }

  private getWindow(instanceOrId: MetaWindow | number) {
    return instanceOrId instanceof MetaWindow
      ? instanceOrId
      : this.idToWindowMap.get(instanceOrId);
  }
}
