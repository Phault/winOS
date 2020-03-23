import { decorate, observable } from 'mobx';

export type CellContents = 'mine' | 'explosion' | number;

export enum CellMarker {
  None,
  Flag,
  Unknown,
}

export class Cell {
  hidden = true;
  contents: CellContents = 0;
  marker = CellMarker.None;
}

decorate(Cell, {
  hidden: observable,
  contents: observable,
  marker: observable,
});
