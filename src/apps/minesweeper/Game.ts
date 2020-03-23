import { Grid } from './utils/Grid';
import { decorate, observable, action, computed } from 'mobx';
import { Cell, CellMarker } from './Cell';

export enum GameState {
  Pregame,
  InProgress,
  Ended,
}

export class Game {
  state = GameState.Pregame;
  mineCount: number;
  minefield: Grid<Cell>;
  flagsPlaced = 0;
  cellsLeft: number;
  private startTime: number = 0;
  private endTime: number = 0;

  // onGameOver: () => void;

  constructor(width: number, height: number, mines: number) {
    this.minefield = new Grid<Cell>(width, height, () => new Cell());
    this.mineCount = mines;
    this.cellsLeft = width * height - this.mineCount;
  }

  get time() {
    if (this.state === GameState.InProgress)
      return new Date().getTime() - this.startTime;

    return this.endTime - this.startTime;
  }

  get width() {
    return this.minefield.width;
  }

  get height() {
    return this.minefield.height;
  }

  private start(x: number, y: number) {
    this.placeMines(x, y, this.mineCount);
    this.state = GameState.InProgress;
    this.startTime = new Date().getTime();
  }

  private end(lastCell: Cell) {
    if (lastCell.contents === 'mine') {
      lastCell.contents = 'explosion';
      this.revealMinesAndFlags(false);
    } else {
      this.revealMinesAndFlags(true);
    }

    this.endTime = new Date().getTime();
    this.state = GameState.Ended;
  }

  revealMinesAndFlags(flagAllMines: boolean) {
    this.minefield.forEach(cell => {
      if (cell.contents === 'mine' || cell.marker === CellMarker.Flag) {
        cell.hidden = false;

        if (flagAllMines) cell.marker = CellMarker.Flag;
      }
    });
  }

  revealCell(x: number, y: number) {
    const cell = this.minefield.get(x, y);

    if (!cell.hidden || cell.marker === CellMarker.Flag) return;

    if (this.state === GameState.Pregame) this.start(x, y);

    cell.hidden = false;

    if (typeof cell.contents === 'number') {
      this.cellsLeft--;

      if (this.cellsLeft <= 0) this.end(cell);
      else if (cell.contents === 0) this.revealAdjacentCells(x, y);
    } else if (cell.contents === 'mine') this.end(cell);
  }

  revealAdjacentCells(x: number, y: number) {
    this.minefield.forEachAdjacent(x, y, (cell, adjacentX, adjacentY, grid) => {
      this.revealCell(adjacentX, adjacentY);
    });
  }

  cycleMarker(cell: Cell, unknownMarkEnabled: boolean) {
    const lastMarker = unknownMarkEnabled
      ? CellMarker.Unknown
      : CellMarker.Flag;
    this.setMarker(cell, (cell.marker + 1) % (lastMarker + 1));
  }

  setMarker(cell: Cell, marker: CellMarker) {
    if (!cell.hidden) return;

    if (cell.marker === CellMarker.Flag) this.flagsPlaced--;

    cell.marker = marker;

    if (cell.marker === CellMarker.Flag) this.flagsPlaced++;
  }

  private placeMines(avoidX: number, avoidY: number, amount: number) {
    for (let minesPlaced = 0; minesPlaced < amount; ) {
      const x = Math.floor(Math.random() * this.minefield.width);
      const y = Math.floor(Math.random() * this.minefield.height);

      if (x === avoidX && y === avoidY) continue;

      if (this.minefield.get(x, y).contents === 'mine') continue;

      this.placeMine(x, y);
      minesPlaced++;
    }
  }

  private placeMine(x: number, y: number) {
    const cell = this.minefield.get(x, y);
    cell.contents = 'mine';
    this.incrementAdjacentCounters(x, y);
  }

  private incrementAdjacentCounters(x: number, y: number) {
    this.minefield.forEachAdjacent(x, y, cell => {
      if (cell.contents !== 'mine')
        cell.contents =
          typeof cell.contents === 'number' ? cell.contents + 1 : 0;
    });
  }
}

decorate(Game, {
  state: observable,
  cellsLeft: observable,
  flagsPlaced: observable,
  time: computed,
  revealCell: action,
  revealAdjacentCells: action,
  revealMinesAndFlags: action,
  setMarker: action,
  cycleMarker: action,
});
