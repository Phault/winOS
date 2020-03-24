import { action, observable } from 'mobx';

export type GridCallbackHandler<T, R = void> = (
  value: T,
  x: number,
  y: number,
  grid: Grid<T>
) => R;

export class Grid<T> {
  private items: T[];
  private _width: number;
  private _height: number;

  constructor(width: number, height: number, defaultValue: () => T | T) {
    this._width = width;
    this._height = height;
    this.items = observable(new Array(width * height));
    this.setAll(defaultValue);
  }

  get(x: number, y: number): T {
    return this.items[this.calcIndex(x, y)];
  }

  @action
  set(x: number, y: number, value: T) {
    this.items[this.calcIndex(x, y)] = value;
  }

  @action
  setAll(value: () => T | T) {
    if (typeof value !== 'function') {
      this.items.fill(value);
    } else {
      for (let i = 0; i < this.items.length; i++) this.items[i] = value();
    }
  }

  isInsideBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  private calcIndex(x: number, y: number) {
    return y * this.width + x;
  }

  map<A>(callbackfn: GridCallbackHandler<T, A>): A[] {
    return this.items.map((val, i) => {
      const x = i % this.width;
      const y = Math.floor(i / this.width);
      return callbackfn(val, x, y, this);
    });
  }

  forEach(callbackfn: GridCallbackHandler<T>) {
    return this.items.forEach((val, i) => {
      const x = i % this.width;
      const y = Math.floor(i / this.width);
      return callbackfn(val, x, y, this);
    });
  }

  forEachAdjacent(x: number, y: number, callbackfn: GridCallbackHandler<T>) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;

        const targetX = x + xOffset;
        const targetY = y + yOffset;

        if (!this.isInsideBounds(targetX, targetY)) continue;

        const cell = this.get(targetX, targetY);
        callbackfn(cell, targetX, targetY, this);
      }
    }
  }
}
