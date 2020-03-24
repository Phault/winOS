import { observable } from 'mobx';

export type CellContents = 'mine' | 'explosion' | number;

export enum CellMarker {
  None,
  Flag,
  Unknown,
}

export class Cell {
  @observable hidden = true;
  @observable contents: CellContents = 0;
  @observable marker = CellMarker.None;
}
