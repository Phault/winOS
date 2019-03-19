import { WindowInstance } from '../App';

export class WindowManager {
  private windows = new Map<number, WindowInstance>();
  private nextId = 0;

  public getWindows(): Map<number, WindowInstance> {
    return this.windows;
  }

  public create() {
  }

  public add(window: WindowInstance) {
    var id = this.getNextId();
    this.windows.set(id, window);
    return id;
  }

  public remove(windowId: number) {
    this.windows.delete(windowId);
  }

  public minimize(window: WindowInstance) {
  }

  public restore(window: WindowInstance) {
  }

  public bringToFront(window: WindowInstance) {
  }

  public bringForwards(window: WindowInstance) {
  }

  public sendToBack(window: WindowInstance) {
  }

  public sendBackwards(window: WindowInstance) {
  }

  private getNextId() {
    return this.nextId++;
  }
}
