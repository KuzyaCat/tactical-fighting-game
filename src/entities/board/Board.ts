import { unit, boardLocation } from '../types';

export class Board {
  private boardMatrix: Array<Array<unit>>;

  constructor(rowsCount: number, columnsCount: number) {
    const columns = Array<unit>(columnsCount).fill(null);
    this.boardMatrix = Array<Array<unit>>(rowsCount).fill(columns);
  }

  getBoardMatrix(): unit[][] {
    return this.boardMatrix;
  }

  setUnit(boardLocation: boardLocation, unit: unit): void {
    this.boardMatrix[boardLocation.rowIndex][boardLocation.columnIndex] = unit;
  }

  fillWithUnits(unitsMatrix: unit[][]): void {
    this.boardMatrix = [...unitsMatrix];
  }
}
