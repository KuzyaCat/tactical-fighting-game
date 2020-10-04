import { Unit } from '../units';
import { unit } from '../types';

export class Board {
  private boardMatrix: Array<Array<unit>>;

  constructor(rowsCount: number, columnsCount: number) {
    const columns = Array<unit>(columnsCount).fill(null);
    this.boardMatrix = Array<Array<unit>>(rowsCount).fill(columns);
  }

  getBoardMatrix(): unit[][] {
    return this.boardMatrix;
  }

  fillWithUnits(unitsMatrix: unit[][]): void {
    this.boardMatrix = [...unitsMatrix];
  }
}
